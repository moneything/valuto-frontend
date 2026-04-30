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

test('saveProgress does not accept client-supplied completed status', async () => {
  let savedUser = 0;
  let createdPayload = null;

  const { saveProgress } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {
      findOne: async () => null,
      create: async (payload) => {
        createdPayload = payload;
        return payload;
      },
    },
    '../models/LearningModule': {
      findOne: async () => ({
        topic: 'budgeting',
        title: 'Budgeting Basics',
        points: 100,
      }),
    },
    '../models/User': {
      findOne: async () => ({
        _id: { toString: () => 'user_db_1' },
        totalPoints: 0,
        lessonsCompleted: 0,
        updateStreak: () => {},
        save: async () => {
          savedUser += 1;
        },
      }),
    },
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: {
      moduleId: 'budgeting',
      status: 'completed',
    },
  };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  const originalConsoleDir = console.dir;
  const originalConsoleError = console.error;
  console.log = () => {};
  console.dir = () => {};
  console.error = () => {};

  try {
    await saveProgress(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
    console.dir = originalConsoleDir;
    console.error = originalConsoleError;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(createdPayload.status, 'in_progress');
  assert.equal(res.body.pointsEarned, 0);
  assert.equal(res.body.lessonsCompleted, 0);
  assert.equal(savedUser, 0);
});

test('saveProgress scores quiz responses from the module answer key', async () => {
  let savedUser = 0;
  let createdPayload = null;

  const { saveProgress } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {
      findOne: async () => null,
      create: async (payload) => {
        createdPayload = payload;
        return payload;
      },
    },
    '../models/LearningModule': {
      findOne: async () => ({
        topic: 'budgeting',
        title: 'Budgeting Basics',
        points: 100,
        quiz: {
          questions: [
            {
              question: 'What should you do first?',
              correctAnswer: 1,
            },
          ],
        },
      }),
    },
    '../models/User': {
      findOne: async () => ({
        _id: { toString: () => 'user_db_1' },
        totalPoints: 0,
        lessonsCompleted: 0,
        updateStreak: () => {},
        save: async () => {
          savedUser += 1;
        },
      }),
    },
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: {
      moduleId: 'budgeting',
      status: 'completed',
      quizScore: 100,
      responses: [
        {
          question: 'What should you do first?',
          selectedAnswer: 0,
          isCorrect: true,
        },
      ],
    },
  };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  const originalConsoleDir = console.dir;
  const originalConsoleError = console.error;
  console.log = () => {};
  console.dir = () => {};
  console.error = () => {};

  try {
    await saveProgress(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
    console.dir = originalConsoleDir;
    console.error = originalConsoleError;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(createdPayload.status, 'in_progress');
  assert.equal(createdPayload.quizScore, 0);
  assert.equal(createdPayload.quizPassed, false);
  assert.equal(createdPayload.quizAnswers[0].isCorrect, false);
  assert.equal(res.body.pointsEarned, 0);
  assert.equal(res.body.lessonsCompleted, 0);
  assert.equal(savedUser, 0);
});

test('getModuleLeaderboard maps aggregated _id back to user records', async () => {
  const { getModuleLeaderboard } = loadWithMocks('../../src/controllers/learningController', {
    '../models/LearningProgress': {
      getModuleLeaderboard: async () => [
        {
          _id: '507f1f77bcf86cd799439011',
          avgQuizScore: 92,
          totalTimeSpent: 180,
          completedAt: '2026-04-15T10:00:00.000Z',
        },
      ],
    },
    '../models/LearningModule': {},
    '../models/User': {
      findById: (id) => ({
        select: async () => ({
          _id: id,
          name: 'Ada Lovelace',
          school: 'Valuto Academy',
        }),
      }),
    },
  });

  const req = {
    params: { moduleId: 'budgeting' },
    query: {},
  };
  const res = createMockRes();

  await getModuleLeaderboard(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.leaderboard[0].userId, '507f1f77bcf86cd799439011');
  assert.equal(res.body.data.leaderboard[0].name, 'Ada Lovelace');
  assert.equal(res.body.data.leaderboard[0].school, 'Valuto Academy');
});
