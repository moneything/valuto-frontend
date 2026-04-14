const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');

const clearMigrationCache = () => {
  delete require.cache[require.resolve('../../src/scripts/migrate-single-role')];
};

test('single-role migration requires MONGODB_URI', async () => {
  clearMigrationCache();

  const originalUri = process.env.MONGODB_URI;
  delete process.env.MONGODB_URI;

  const script = loadWithMocks('../../src/scripts/migrate-single-role', {
    dotenv: { config: () => ({}) },
    mongoose: {
      connect: async () => {
        throw new Error('should not connect without MONGODB_URI');
      },
      connection: { close: async () => {} },
    },
    '../models/User': {},
  });

  await assert.rejects(() => script.run(), /MONGODB_URI is required/);

  if (originalUri === undefined) {
    delete process.env.MONGODB_URI;
  } else {
    process.env.MONGODB_URI = originalUri;
  }
});

test('single-role migration updates non-student roles and reports counts', async () => {
  clearMigrationCache();

  const originalUri = process.env.MONGODB_URI;
  process.env.MONGODB_URI = 'mongodb://example.test/valuto';

  const aggregateCalls = [];
  const updateManyCalls = [];
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args);

  try {
    const script = loadWithMocks('../../src/scripts/migrate-single-role', {
      dotenv: { config: () => ({}) },
      mongoose: {
        connect: async (uri, options) => {
          assert.equal(uri, 'mongodb://example.test/valuto');
          assert.equal(options.serverSelectionTimeoutMS, 10000);
        },
        connection: { close: async () => {} },
      },
      '../models/User': {
        aggregate: async (pipeline) => {
          aggregateCalls.push(pipeline);
          return aggregateCalls.length === 1
            ? [
                { _id: 'student', count: 5 },
                { _id: 'teacher', count: 2 },
              ]
            : [{ _id: 'student', count: 7 }];
        },
        updateMany: async (filter, update) => {
          updateManyCalls.push({ filter, update });
          return { modifiedCount: 2 };
        },
      },
    });

    await script.run();
  } finally {
    console.log = originalLog;
    if (originalUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalUri;
    }
  }

  assert.equal(aggregateCalls.length, 2);
  assert.deepEqual(updateManyCalls, [
    {
      filter: { role: { $ne: 'student' } },
      update: { $set: { role: 'student' } },
    },
  ]);
  assert.match(logs[0][0], /single-role migration complete/i);
  assert.equal(logs[2][1], 2);
});
