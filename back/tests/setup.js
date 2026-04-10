const knex = require('knex');
const config = require('../knexfile');

// Force test environment
process.env.NODE_ENV = 'test';

let testDb;
let initialized = false;

async function setup() {
  if (initialized) return;

  testDb = knex(config.test);
  await testDb.migrate.latest();
  await testDb.seed.run();
  initialized = true;
}

async function teardown() {
  if (testDb) {
    await testDb.destroy();
    testDb = null;
  }
  // Destroy the app's db connection too
  try {
    const appDb = require('../src/db');
    await appDb.destroy();
  } catch (_) { /* already destroyed */ }
  initialized = false;
}

module.exports = { setup, teardown };
