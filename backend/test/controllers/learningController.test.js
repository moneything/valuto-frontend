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

test('updateTimeSpent returns 400 for invalid time value', async () => {
  const { updateTimeSpent } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {},
    '../models/LearningModule': {},
    '../models/User': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { moduleId: 'budgeting' },
    body: { timeSpent: -5 },
  };
  const res = createMockRes();
  let captured = null;

  await updateTimeSpent(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 400);
  assert.match(captured.message, /Invalid time spent value/);
});

test('updateTimeSpent returns 404 when user profile is missing', async () => {
  const { updateTimeSpent } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {},
    '../models/LearningModule': {},
    '../models/User': { findOne: async () => null },
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { moduleId: 'budgeting' },
    body: { timeSpent: 30 },
  };
  const res = createMockRes();
  let captured = null;

  await updateTimeSpent(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 404);
  assert.match(captured.message, /User profile not found/);
});

test('updateTimeSpent updates progress and returns totals', async () => {
  const progress = {
    timeSpent: 120,
    addTimeSpent: async (seconds) => {
      progress.timeSpent += seconds;
    },
  };

  const { updateTimeSpent } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {
      findOne: async () => progress,
    },
    '../models/LearningModule': {},
    '../models/User': {
      findOne: async () => ({ _id: 'user_db_1' }),
    },
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { moduleId: 'budgeting' },
    body: { timeSpent: 30 },
  };
  const res = createMockRes();

  await updateTimeSpent(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.addedTime, 30);
  assert.equal(res.body.data.totalTimeSpent, 150);
});

test('getLearningStats computes completion and score aggregates', async () => {
  const progressRows = [
    { status: 'completed', timeSpent: 60, quizScore: 80 },
    { status: 'in_progress', timeSpent: 30, quizScore: null },
    { status: 'completed', timeSpent: 90, quizScore: 100 },
  ];

  const { getLearningStats } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {
      find: async () => progressRows,
    },
    '../models/LearningModule': {},
    '../models/User': {
      findOne: async () => ({ _id: 'user_db_1' }),
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();

  await getLearningStats(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.totalModules, 3);
  assert.equal(res.body.data.completedModules, 2);
  assert.equal(res.body.data.inProgressModules, 1);
  assert.equal(res.body.data.totalTimeSpent, 180);
  assert.equal(res.body.data.averageQuizScore, 90);
});

