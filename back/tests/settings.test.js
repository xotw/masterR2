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

describe('GET /api/settings', () => {
  it('returns MCP tool states', async () => {
    const res = await request.get('/api/settings').expect(200);
    assert.ok(res.body.mcps);
    assert.equal(res.body.mcps.claude, true);
    assert.equal(res.body.mcps.canva, true);
    assert.equal(res.body.mcps.salesforce, false);
  });
});

describe('PUT /api/settings', () => {
  it('toggles MCP tools', async () => {
    const res = await request.put('/api/settings')
      .send({ mcps: { claude: false, salesforce: true } })
      .expect(200);

    assert.equal(res.body.mcps.claude, false);
    assert.equal(res.body.mcps.salesforce, true);
    assert.equal(res.body.mcps.canva, true); // unchanged
  });
});
