const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/presentations — list with optional filters
router.get('/', async (req, res, next) => {
  try {
    let query = db('presentations as p')
      .join('bps as b', 'p.bp_id', 'b.id')
      .select(
        'p.*',
        'b.name as bp_name', 'b.color as bp_color',
        'b.text_color as bp_text_color', 'b.photo_url as bp_photo_url',
        'b.role as bp_role'
      )
      .orderBy('p.created_at', 'desc');

    if (req.query.bp) {
      query = query.where('b.name', req.query.bp);
    }
    if (req.query.status) {
      query = query.where('p.status', req.query.status);
    }
    if (req.query.search) {
      query = query.whereRaw(
        'p.client_name ILIKE ?', [`%${req.query.search}%`]
      );
    }

    const rows = await query;
    res.json(rows.map(formatPresentationList));
  } catch (err) { next(err); }
});

// GET /api/presentations/:id — single with nested analyses
router.get('/:id', async (req, res, next) => {
  try {
    const row = await db('presentations as p')
      .join('bps as b', 'p.bp_id', 'b.id')
      .select(
        'p.*',
        'b.name as bp_name', 'b.color as bp_color',
        'b.text_color as bp_text_color', 'b.photo_url as bp_photo_url',
        'b.role as bp_role'
      )
      .where('p.id', req.params.id)
      .first();

    if (!row) return res.status(404).json({ error: 'Presentation not found' });

    // Fetch analyses with sub_scores
    const analyses = await db('lever_analyses')
      .where('presentation_id', row.id)
      .orderBy('id');

    const analysisIds = analyses.map(a => a.id);
    const subScores = analysisIds.length
      ? await db('sub_scores').whereIn('analysis_id', analysisIds).orderBy('id')
      : [];

    const subScoresByAnalysis = {};
    for (const s of subScores) {
      if (!subScoresByAnalysis[s.analysis_id]) subScoresByAnalysis[s.analysis_id] = [];
      subScoresByAnalysis[s.analysis_id].push({
        nom: s.nom,
        note: parseFloat(s.note),
        description: s.description,
      });
    }

    const analysesObj = {};
    for (const a of analyses) {
      analysesObj[a.lever] = {
        noteGlobale: parseFloat(a.note_globale),
        lectureBusiness: a.lecture_business,
        sousScores: subScoresByAnalysis[a.id] || [],
      };
    }

    res.json({
      ...formatPresentationList(row),
      contextSummary: {
        entreprise: row.context_entreprise,
        enjeux: row.context_enjeux,
        challenges: row.context_challenges,
      },
      currentStep: row.current_step,
      analyses: analysesObj,
    });
  } catch (err) { next(err); }
});

// POST /api/presentations — create
router.post('/', async (req, res, next) => {
  try {
    const b = req.body;
    if (!b.clientName || !b.bpId) {
      return res.status(400).json({ error: 'clientName and bpId are required' });
    }

    // Auto-generate next num
    const last = await db('presentations').max('id as max').first();
    const nextNum = `R2-${String((last?.max || 0) + 1).padStart(3, '0')}`;

    const [row] = await db('presentations').insert({
      num: b.num || nextNum,
      bp_id: b.bpId,
      client_name: b.clientName,
      client_website_url: b.clientWebsiteUrl || null,
      canva_url: b.canvaUrl || null,
      claap_url: b.claapUrl || null,
      pre_audit_url: b.preAuditUrl || null,
      active_levers: b.activeLevers
        ? `{${b.activeLevers.map(l => `"${l}"`).join(',')}}`
        : '{}',
      pricing: b.pricing || null,
      date_r1: b.dateR1 || null,
      date_r2: b.dateR2 || null,
      status: b.status || 'brouillon',
      context_entreprise: b.contextSummary?.entreprise || null,
      context_enjeux: b.contextSummary?.enjeux || null,
      context_challenges: b.contextSummary?.challenges || null,
      current_step: b.currentStep || 1,
    }).returning('*');

    res.status(201).json({ id: row.id, num: row.num });
  } catch (err) { next(err); }
});

// PUT /api/presentations/:id — update
router.put('/:id', async (req, res, next) => {
  try {
    const b = req.body;
    const updates = {};

    if (b.clientName !== undefined) updates.client_name = b.clientName;
    if (b.clientWebsiteUrl !== undefined) updates.client_website_url = b.clientWebsiteUrl;
    if (b.canvaUrl !== undefined) updates.canva_url = b.canvaUrl;
    if (b.claapUrl !== undefined) updates.claap_url = b.claapUrl;
    if (b.preAuditUrl !== undefined) updates.pre_audit_url = b.preAuditUrl;
    if (b.activeLevers !== undefined) {
      updates.active_levers = `{${b.activeLevers.map(l => `"${l}"`).join(',')}}`;
    }
    if (b.pricing !== undefined) updates.pricing = b.pricing;
    if (b.dateR1 !== undefined) updates.date_r1 = b.dateR1;
    if (b.dateR2 !== undefined) updates.date_r2 = b.dateR2;
    if (b.status !== undefined) updates.status = b.status;
    if (b.currentStep !== undefined) updates.current_step = b.currentStep;
    if (b.bpId !== undefined) updates.bp_id = b.bpId;

    if (b.contextSummary) {
      if (b.contextSummary.entreprise !== undefined) updates.context_entreprise = b.contextSummary.entreprise;
      if (b.contextSummary.enjeux !== undefined) updates.context_enjeux = b.contextSummary.enjeux;
      if (b.contextSummary.challenges !== undefined) updates.context_challenges = b.contextSummary.challenges;
    }

    updates.updated_at = db.fn.now();

    const [row] = await db('presentations').where('id', req.params.id).update(updates).returning('*');
    if (!row) return res.status(404).json({ error: 'Presentation not found' });
    res.json({ id: row.id, num: row.num });
  } catch (err) { next(err); }
});

// PATCH /api/presentations/:id/status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['brouillon', 'en_cours', 'terminee'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const [row] = await db('presentations')
      .where('id', req.params.id)
      .update({ status, updated_at: db.fn.now() })
      .returning('*');
    if (!row) return res.status(404).json({ error: 'Presentation not found' });
    res.json({ id: row.id, status: row.status });
  } catch (err) { next(err); }
});

// POST /api/presentations/:id/duplicate
router.post('/:id/duplicate', async (req, res, next) => {
  try {
    const original = await db('presentations').where('id', req.params.id).first();
    if (!original) return res.status(404).json({ error: 'Presentation not found' });

    const last = await db('presentations').max('id as max').first();
    const nextNum = `R2-${String((last?.max || 0) + 1).padStart(3, '0')}`;

    const { id, num, created_at, updated_at, ...rest } = original;
    const [newRow] = await db('presentations').insert({
      ...rest,
      num: nextNum,
      status: 'brouillon',
      current_step: 1,
    }).returning('*');

    // Duplicate analyses
    const analyses = await db('lever_analyses').where('presentation_id', id);
    for (const a of analyses) {
      const [newAnalysis] = await db('lever_analyses').insert({
        presentation_id: newRow.id,
        lever: a.lever,
        note_globale: a.note_globale,
        lecture_business: a.lecture_business,
      }).returning('*');

      const scores = await db('sub_scores').where('analysis_id', a.id);
      if (scores.length) {
        await db('sub_scores').insert(
          scores.map(s => ({
            analysis_id: newAnalysis.id,
            nom: s.nom,
            note: s.note,
            description: s.description,
          }))
        );
      }
    }

    res.status(201).json({ id: newRow.id, num: newRow.num });
  } catch (err) { next(err); }
});

// DELETE /api/presentations/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await db('presentations').where('id', req.params.id).del();
    if (!deleted) return res.status(404).json({ error: 'Presentation not found' });
    res.status(204).end();
  } catch (err) { next(err); }
});

// PUT /api/presentations/:id/analyses/:lever — upsert analysis
router.put('/:id/analyses/:lever', async (req, res, next) => {
  try {
    const { id, lever } = req.params;
    const { noteGlobale, lectureBusiness, sousScores } = req.body;

    // Check presentation exists
    const pres = await db('presentations').where('id', id).first();
    if (!pres) return res.status(404).json({ error: 'Presentation not found' });

    await db.transaction(async (trx) => {
      // Upsert analysis
      let analysis = await trx('lever_analyses')
        .where({ presentation_id: id, lever })
        .first();

      if (analysis) {
        await trx('lever_analyses').where('id', analysis.id).update({
          note_globale: noteGlobale ?? analysis.note_globale,
          lecture_business: lectureBusiness ?? analysis.lecture_business,
        });
      } else {
        [analysis] = await trx('lever_analyses').insert({
          presentation_id: id,
          lever,
          note_globale: noteGlobale ?? 7.0,
          lecture_business: lectureBusiness ?? '',
        }).returning('*');
      }

      // Replace sub_scores
      if (sousScores) {
        await trx('sub_scores').where('analysis_id', analysis.id).del();
        if (sousScores.length) {
          await trx('sub_scores').insert(
            sousScores.map(s => ({
              analysis_id: analysis.id,
              nom: s.nom,
              note: s.note,
              description: s.description || '',
            }))
          );
        }
      }
    });

    res.json({ ok: true });
  } catch (err) { next(err); }
});

function formatPresentationList(row) {
  return {
    id: row.id,
    num: row.num,
    bp: {
      id: row.bp_id,
      name: row.bp_name,
      color: row.bp_color,
      textColor: row.bp_text_color,
      photoUrl: row.bp_photo_url,
      role: row.bp_role,
    },
    clientName: row.client_name,
    clientWebsiteUrl: row.client_website_url,
    canvaUrl: row.canva_url,
    claapUrl: row.claap_url,
    preAuditUrl: row.pre_audit_url,
    activeLevers: row.active_levers,
    pricing: row.pricing,
    dateR1: row.date_r1,
    dateR2: row.date_r2,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

module.exports = router;
