const { describe, it, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const supertest = require('supertest');

// Force test env before loading app
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

describe('GET /api/bps', () => {
  it('returns all 4 seeded BPs', async () => {
    const res = await request.get('/api/bps').expect(200);
    assert.equal(res.body.length, 4);
    assert.equal(res.body[0].name, 'Jordan');
    assert.equal(res.body[3].name, 'Pierre-Arnaud');
  });

  it('returns camelCase fields', async () => {
    const res = await request.get('/api/bps').expect(200);
    const bp = res.body[0];
    assert.ok(bp.textColor, 'should have textColor');
    assert.ok(bp.photoUrl !== undefined, 'should have photoUrl');
    assert.ok(bp.createdAt, 'should have createdAt');
  });
});

describe('GET /api/bps/:id', () => {
  it('returns a single BP', async () => {
    const res = await request.get('/api/bps/1').expect(200);
    assert.equal(res.body.name, 'Jordan');
    assert.equal(res.body.role, 'Fondateur');
  });

  it('returns 404 for non-existent BP', async () => {
    await request.get('/api/bps/999').expect(404);
  });
});

describe('POST /api/bps', () => {
  it('creates a new BP', async () => {
    const res = await request.post('/api/bps')
      .send({ name: 'David', role: 'Business Partner', color: '#34D399' })
      .expect(201);

    assert.equal(res.body.name, 'David');
    assert.equal(res.body.role, 'Business Partner');
    assert.equal(res.body.color, '#34D399');
    assert.ok(res.body.id);
  });

  it('returns 400 if name is missing', async () => {
    await request.post('/api/bps')
      .send({ role: 'BP', color: '#fff' })
      .expect(400);
  });

  it('returns 409 for duplicate name', async () => {
    await request.post('/api/bps')
      .send({ name: 'Jordan', role: 'BP', color: '#fff' })
      .expect(409);
  });
});

describe('PUT /api/bps/:id', () => {
  it('updates a BP photo', async () => {
    const res = await request.put('/api/bps/1')
      .send({ photoUrl: 'https://example.com/new-photo.jpg' })
      .expect(200);

    assert.equal(res.body.photoUrl, 'https://example.com/new-photo.jpg');
    assert.equal(res.body.name, 'Jordan'); // unchanged
  });

  it('returns 404 for non-existent BP', async () => {
    await request.put('/api/bps/999')
      .send({ name: 'Ghost' })
      .expect(404);
  });
});

describe('DELETE /api/bps/:id', () => {
  it('deletes a BP with no presentations', async () => {
    // Create a BP to delete
    const { body } = await request.post('/api/bps')
      .send({ name: 'ToDelete', role: 'BP', color: '#000' });

    await request.delete(`/api/bps/${body.id}`).expect(204);

    // Confirm gone
    await request.get(`/api/bps/${body.id}`).expect(404);
  });

  it('returns 404 for non-existent BP', async () => {
    await request.delete('/api/bps/999').expect(404);
  });
});
