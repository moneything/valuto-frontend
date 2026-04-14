const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');

const createMockRes = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
});

test('getModules applies filters and transforms _id to id', async () => {
  let receivedFilters = null;
  const rows = [{ _id: { toString: () => 'm1' }, topic: 'budgeting' }];

  const { getModules } = loadWithMocks('../../src/controllers/learningModuleController', {
    '../models/LearningModule': {
      find: (filters) => {
        receivedFilters = filters;
        return {
          lean: async () => rows,
        };
      },
    },
    '../models/User': {},
  });

  const req = { query: { topic: 'budgeting', difficultyLevel: 'beginner', categoryId: 'core' } };
  const res = createMockRes();

  await getModules(req, res, () => {});

  assert.deepEqual(receivedFilters, {
    topic: 'budgeting',
    difficultyLevel: 'beginner',
    categoryId: 'core',
  });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data[0].id, 'm1');
});

test('getModule returns 403 for inactive module', async () => {
  const { getModule } = loadWithMocks('../../src/controllers/learningModuleController', {
    '../models/LearningModule': {
      findOne: () => ({
        lean: async () => ({ _id: { toString: () => 'm1' }, topic: 'budgeting', isActive: false }),
      }),
    },
    '../models/User': {},
  });

  const req = { params: { id: 'budgeting' } };
  const res = createMockRes();
  let captured = null;

  await getModule(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /inactive/i);
});

test('createModule is disabled for all users', async () => {
  const { createModule } = loadWithMocks('../../src/controllers/learningModuleController', {
    '../models/LearningModule': { create: async () => ({}) },
  });

  const req = { clerkUser: { id: 'clerk_1' }, body: { topic: 'budgeting' } };
  const res = createMockRes();
  let captured = null;

  await createModule(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /creation is disabled/i);
});

test('updateModule is disabled for all users', async () => {
  const { updateModule } = loadWithMocks('../../src/controllers/learningModuleController', {
    '../models/LearningModule': {},
  });

  const req = {
    clerkUser: { id: 'admin_1' },
    params: { id: 'm1' },
    body: { title: 'Updated Title' },
  };
  const res = createMockRes();
  let captured = null;

  await updateModule(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /updates are disabled/i);
});
