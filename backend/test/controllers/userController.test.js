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

test('addPoints rejects invalid points', async () => {
  const { addPoints } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {},
  });

  const req = { auth: { userId: 'clerk_1' }, body: { points: -10 } };
  const res = createMockRes();
  let captured = null;

  await addPoints(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 400);
  assert.match(captured.message, /Invalid points value/);
});

test('createOrUpdateUser creates user when missing', async () => {
  const createdUser = { _id: 'u1', name: 'Jane', role: 'student' };

  const { createOrUpdateUser } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {
      findOne: async () => null,
      create: async (payload) => ({ ...createdUser, ...payload }),
    },
  });

  const req = {
    auth: { userId: 'clerk_1' },
    body: { name: 'Jane', email: 'jane@test.com' },
  };
  const res = createMockRes();

  await createOrUpdateUser(req, res, () => {});

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.match(res.body.message, /created successfully/i);
  assert.equal(res.body.data.clerkUserId, 'clerk_1');
});

test('createOrUpdateUser updates existing user', async () => {
  const existingUser = {
    name: 'Old Name',
    title: null,
    email: 'old@test.com',
    role: 'student',
    updateStreak: () => {},
    save: async () => {},
  };

  const { createOrUpdateUser } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {
      findOne: async () => existingUser,
      create: async () => {
        throw new Error('should not create existing user');
      },
    },
  });

  const req = {
    auth: { userId: 'clerk_1' },
    body: { name: 'New Name', title: 'Ms', school: 'Test School' },
  };
  const res = createMockRes();

  await createOrUpdateUser(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.match(res.body.message, /updated successfully/i);
  assert.equal(existingUser.name, 'New Name');
  assert.equal(existingUser.title, 'Ms');
  assert.equal(existingUser.school, 'Test School');
});

test('getUserStatsById blocks cross-school access', async () => {
  const { getUserStatsById } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {
      findOne: async () => ({ school: 'School A' }),
      findById: async () => ({ school: 'School B' }),
    },
  });

  const req = {
    params: { id: 'targetUserId' },
    clerkUser: { id: 'clerk_1' },
  };
  const res = createMockRes();
  let captured = null;

  await getUserStatsById(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /users in your school/);
});

test('getUserStatsById returns stats for same-school access', async () => {
  const gameResultPath = require.resolve('../../src/models/GameResult');
  const learningProgressPath = require.resolve('../../src/models/LearningProgress');
  const challengePath = require.resolve('../../src/models/Challenge');
  const originalGameResult = require.cache[gameResultPath];
  const originalLearningProgress = require.cache[learningProgressPath];
  const originalChallenge = require.cache[challengePath];

  require.cache[gameResultPath] = {
    id: gameResultPath,
    filename: gameResultPath,
    loaded: true,
    exports: {
      getUserStats: async () => ({ totalQuestions: 10, totalCorrect: 8, totalGames: 2, avgAccuracy: 80 }),
    },
  };
  require.cache[learningProgressPath] = {
    id: learningProgressPath,
    filename: learningProgressPath,
    loaded: true,
    exports: {
      getUserProgress: async () => [],
    },
  };
  require.cache[challengePath] = {
    id: challengePath,
    filename: challengePath,
    loaded: true,
    exports: {
      getUserChallengeStats: async () => ({ totalCompleted: 4 }),
    },
  };

  const targetUser = {
    _id: { toString: () => 'target_1' },
    name: 'Target User',
    title: 'Mx',
    email: 'target@test.com',
    role: 'student',
    school: 'School A',
    grade: 'Year 9',
    totalPoints: 320,
    gamesPlayed: 6,
    lessonsCompleted: 5,
    currentStreak: 3,
    longestStreak: 7,
  };

  const { getUserStatsById } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {
      findOne: async () => ({ school: 'School A' }),
      findById: async () => targetUser,
      countDocuments: async () => 2,
    },
  });

  const req = {
    params: { id: 'targetUserId' },
    clerkUser: { id: 'clerk_1' },
  };
  const res = createMockRes();

  try {
    await getUserStatsById(req, res, () => {});

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.user.name, 'Target User');
    assert.equal(res.body.data.user.school, 'School A');
    assert.equal(res.body.data.rank, 3);
  } finally {
    if (originalGameResult) require.cache[gameResultPath] = originalGameResult;
    else delete require.cache[gameResultPath];
    if (originalLearningProgress) require.cache[learningProgressPath] = originalLearningProgress;
    else delete require.cache[learningProgressPath];
    if (originalChallenge) require.cache[challengePath] = originalChallenge;
    else delete require.cache[challengePath];
  }
});
