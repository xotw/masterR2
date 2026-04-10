const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/bps — list all BPs
router.get('/', async (_req, res, next) => {
  try {
    const rows = await db('bps').select('*').orderBy('id');
    res.json(rows.map(formatBp));
  } catch (err) { next(err); }
});

// GET /api/bps/:id
router.get('/:id', async (req, res, next) => {
  try {
    const row = await db('bps').where('id', req.params.id).first();
    if (!row) return res.status(404).json({ error: 'BP not found' });
    res.json(formatBp(row));
  } catch (err) { next(err); }
});

// POST /api/bps — create a BP
router.post('/', async (req, res, next) => {
  try {
    const { name, role, color, textColor, photoUrl } = req.body;
    if (!name || !role || !color) {
      return res.status(400).json({ error: 'name, role, and color are required' });
    }
    const [row] = await db('bps').insert({
      name, role, color,
      text_color: textColor || '#000',
      photo_url: photoUrl || null,
    }).returning('*');
    res.status(201).json(formatBp(row));
  } catch (err) { next(err); }
});

// PUT /api/bps/:id — update a BP
router.put('/:id', async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.role !== undefined) updates.role = req.body.role;
    if (req.body.color !== undefined) updates.color = req.body.color;
    if (req.body.textColor !== undefined) updates.text_color = req.body.textColor;
    if (req.body.photoUrl !== undefined) updates.photo_url = req.body.photoUrl;

    const [row] = await db('bps').where('id', req.params.id).update(updates).returning('*');
    if (!row) return res.status(404).json({ error: 'BP not found' });
    res.json(formatBp(row));
  } catch (err) { next(err); }
});

// DELETE /api/bps/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await db('bps').where('id', req.params.id).del();
    if (!deleted) return res.status(404).json({ error: 'BP not found' });
    res.status(204).end();
  } catch (err) { next(err); }
});

function formatBp(row) {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    color: row.color,
    textColor: row.text_color,
    photoUrl: row.photo_url,
    createdAt: row.created_at,
  };
}

module.exports = router;
