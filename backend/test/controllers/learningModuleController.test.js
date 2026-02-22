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

test('createModule blocks non-teacher/non-admin users', async () => {
  const { createModule } = loadWithMocks('../../src/controllers/learningModuleController', {
    '../models/LearningModule': { create: async () => ({}) },
    '../models/User': {
      findOne: async () => ({ role: 'student' }),
    },
  });

  const req = { clerkUser: { id: 'clerk_1' }, body: { topic: 'budgeting' } };
  const res = createMockRes();
  let captured = null;

  await createModule(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Only teachers can create modules/);
});

test('updateModule allows admin to update any module', async () => {
  const moduleDoc = {
    createdBy: 'other_user',
    title: 'Old',
    saveCalled: false,
    save: async function save() {
      this.saveCalled = true;
    },
  };

  const { updateModule } = loadWithMocks('../../src/controllers/learningModuleController', {
    '../models/LearningModule': {
      findById: async () => moduleDoc,
    },
    '../models/User': {
      findOne: async () => ({ role: 'admin' }),
    },
  });

  const req = {
    clerkUser: { id: 'admin_1' },
    params: { id: 'm1' },
    body: { title: 'Updated Title' },
  };
  const res = createMockRes();

  await updateModule(req, res, () => {});

  assert.equal(moduleDoc.title, 'Updated Title');
  assert.equal(moduleDoc.saveCalled, true);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
});

