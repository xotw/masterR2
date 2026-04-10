const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const supertest = require('supertest');

process.env.NODE_ENV = 'test';

const { setup, teardown } = require('./setup');
const app = require('../src/app');

let request;

before(async () => {
  await setup();
  request = supertest(app);
});

after(async () => {
  await teardown();
});

describe('GET /api/presentations', () => {
  it('returns all 10 seeded presentations', async () => {
    const res = await request.get('/api/presentations').expect(200);
    assert.equal(res.body.length, 10);
  });

  it('filters by BP name', async () => {
    const res = await request.get('/api/presentations?bp=Jordan').expect(200);
    assert.equal(res.body.length, 3);
    for (const p of res.body) {
      assert.equal(p.bp.name, 'Jordan');
    }
  });

  it('filters by status', async () => {
    const res = await request.get('/api/presentations?status=en_cours').expect(200);
    for (const p of res.body) {
      assert.equal(p.status, 'en_cours');
    }
  });

  it('searches by client name (case insensitive)', async () => {
    const res = await request.get('/api/presentations?search=lotchi').expect(200);
    assert.equal(res.body.length, 1);
    assert.equal(res.body[0].clientName, 'Lotchi');
  });

  it('returns camelCase fields with nested BP', async () => {
    const res = await request.get('/api/presentations').expect(200);
    const p = res.body[0];
    assert.ok(p.clientName, 'should have clientName');
    assert.ok(p.bp, 'should have nested bp');
    assert.ok(p.bp.name, 'bp should have name');
    assert.ok(p.activeLevers, 'should have activeLevers');
  });
});

describe('GET /api/presentations/:id', () => {
  it('returns a single presentation with analyses', async () => {
    // Get first presentation
    const list = await request.get('/api/presentations').expect(200);
    const firstId = list.body[0].id;

    const res = await request.get(`/api/presentations/${firstId}`).expect(200);
    assert.ok(res.body.analyses, 'should have analyses');
    assert.ok(res.body.contextSummary, 'should have contextSummary');
    assert.ok(res.body.currentStep, 'should have currentStep');
  });

  it('analyses contain sousScores', async () => {
    const list = await request.get('/api/presentations?search=Lotchi').expect(200);
    const res = await request.get(`/api/presentations/${list.body[0].id}`).expect(200);

    assert.ok(res.body.analyses.SEO, 'should have SEO analysis');
    assert.ok(res.body.analyses.SEO.sousScores, 'SEO should have sousScores');
    assert.equal(res.body.analyses.SEO.sousScores.length, 5);
    assert.equal(typeof res.body.analyses.SEO.noteGlobale, 'number');
  });

  it('returns 404 for non-existent', async () => {
    await request.get('/api/presentations/99999').expect(404);
  });
});

describe('POST /api/presentations', () => {
  it('creates a new presentation', async () => {
    const res = await request.post('/api/presentations')
      .send({
        clientName: 'Test Client',
        bpId: 1,
        activeLevers: ['SEO'],
        contextSummary: { entreprise: 'Test Corp', enjeux: 'Growth', challenges: 'Competition' },
      })
      .expect(201);

    assert.ok(res.body.id);
    assert.ok(res.body.num);
  });

  it('returns 400 without clientName', async () => {
    await request.post('/api/presentations')
      .send({ bpId: 1 })
      .expect(400);
  });
});

describe('PUT /api/presentations/:id', () => {
  it('updates presentation fields', async () => {
    const list = await request.get('/api/presentations?search=Lotchi');
    const id = list.body[0].id;

    const res = await request.put(`/api/presentations/${id}`)
      .send({ pricing: '10 000 €', activeLevers: ['SEO', 'CRO', 'GEO'] })
      .expect(200);

    // Verify by fetching
    const updated = await request.get(`/api/presentations/${id}`);
    assert.equal(updated.body.pricing, '10 000 €');
    assert.ok(updated.body.activeLevers.includes('GEO'));
  });
});

describe('PATCH /api/presentations/:id/status', () => {
  it('updates status', async () => {
    const list = await request.get('/api/presentations?search=Lotchi');
    const id = list.body[0].id;

    const res = await request.patch(`/api/presentations/${id}/status`)
      .send({ status: 'en_cours' })
      .expect(200);

    assert.equal(res.body.status, 'en_cours');
  });

  it('rejects invalid status', async () => {
    const list = await request.get('/api/presentations?search=Lotchi');
    const id = list.body[0].id;

    await request.patch(`/api/presentations/${id}/status`)
      .send({ status: 'invalid' })
      .expect(400);
  });
});

describe('POST /api/presentations/:id/duplicate', () => {
  it('duplicates a presentation with analyses', async () => {
    const list = await request.get('/api/presentations?search=Lotchi');
    const id = list.body[0].id;

    const res = await request.post(`/api/presentations/${id}/duplicate`).expect(201);

    assert.ok(res.body.id !== id, 'should have new ID');
    assert.ok(res.body.num !== list.body[0].num, 'should have new num');

    // Verify the duplicate has analyses
    const dup = await request.get(`/api/presentations/${res.body.id}`);
    assert.ok(Object.keys(dup.body.analyses).length > 0, 'should have duplicated analyses');
    assert.equal(dup.body.status, 'brouillon', 'should reset to brouillon');
  });
});

describe('DELETE /api/presentations/:id', () => {
  it('deletes a presentation and cascades analyses', async () => {
    // Create one to delete
    const { body } = await request.post('/api/presentations')
      .send({ clientName: 'Delete Me', bpId: 1 });

    await request.delete(`/api/presentations/${body.id}`).expect(204);
    await request.get(`/api/presentations/${body.id}`).expect(404);
  });
});

describe('PUT /api/presentations/:id/analyses/:lever', () => {
  it('upserts an analysis with sub_scores', async () => {
    const list = await request.get('/api/presentations?search=Lotchi');
    const id = list.body[0].id;

    await request.put(`/api/presentations/${id}/analyses/GEO`)
      .send({
        noteGlobale: 8.5,
        lectureBusiness: 'Excellent GEO potential.',
        sousScores: [
          { nom: 'Presence IA', note: 9, description: 'Tres bien' },
          { nom: 'Citations', note: 7.5, description: 'Bon' },
        ],
      })
      .expect(200);

    // Verify
    const res = await request.get(`/api/presentations/${id}`);
    assert.ok(res.body.analyses.GEO);
    assert.equal(res.body.analyses.GEO.noteGlobale, 8.5);
    assert.equal(res.body.analyses.GEO.sousScores.length, 2);
  });

  it('updates an existing analysis', async () => {
    const list = await request.get('/api/presentations?search=Lotchi');
    const id = list.body[0].id;

    // Update existing SEO analysis
    await request.put(`/api/presentations/${id}/analyses/SEO`)
      .send({ noteGlobale: 9.0 })
      .expect(200);

    const res = await request.get(`/api/presentations/${id}`);
    assert.equal(res.body.analyses.SEO.noteGlobale, 9.0);
  });
});
