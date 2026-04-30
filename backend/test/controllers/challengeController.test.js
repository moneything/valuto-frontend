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

test('getDailyChallenges returns challenge list for authenticated users', async () => {
  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'c1' }],
      ensureDailyChallenges: async () => false,
      find: async () => [],
      findOne: async () => null,
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' }, role: 'student' }),
    },
    '../models/LearningProgress': {
      countDocuments: async () => 0,
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await getDailyChallenges(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.deepEqual(res.body.data, [{ id: 'c1' }]);
});

test('getDailyChallenges syncs daily lesson progress and awards points on first completion', async () => {
  let userSaveCount = 0;
  let challengeSaveCount = 0;
  const user = {
    _id: { toString: () => 'u1' },
    role: 'student',
    totalPoints: 125,
    updateStreak: () => {},
    save: async () => {
      userSaveCount += 1;
    },
  };
  const dailyLessonChallenge = {
    _id: { toString: () => 'daily_1' },
    challengeType: 'daily_lesson',
    currentProgress: 0,
    targetProgress: 1,
    completed: false,
    pointsEarned: 75,
    bonusMultiplier: 2,
    isModified() {
      return this.currentProgress === 1 || this.completed === true;
    },
    save: async function save() {
      challengeSaveCount += 1;
      return this;
    },
  };

  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'c1' }],
      ensureDailyChallenges: async () => false,
      find: async () => [],
      findOneAndUpdate: async () => ({ _id: 'daily_1', rewardGranted: true }),
      findOne: async (query) => {
        if (query.challengeType === 'daily_lesson') {
          return dailyLessonChallenge;
        }
        return null;
      },
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/LearningProgress': {
      countDocuments: async (query) => {
        if (query.status === 'completed') {
          return 1;
        }
        return 0;
      },
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await getDailyChallenges(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(dailyLessonChallenge.currentProgress, 1);
  assert.equal(dailyLessonChallenge.completed, true);
  assert.equal(challengeSaveCount, 1);
  assert.equal(user.totalPoints, 275);
  assert.equal(userSaveCount, 1);
});

test('getDailyChallenges does not re-award already completed daily lesson challenges', async () => {
  let userSaveCount = 0;
  let challengeSaveCount = 0;
  const user = {
    _id: { toString: () => 'u1' },
    role: 'student',
    totalPoints: 300,
    updateStreak: () => {},
    save: async () => {
      userSaveCount += 1;
    },
  };
  const dailyLessonChallenge = {
    _id: { toString: () => 'daily_1' },
    challengeType: 'daily_lesson',
    currentProgress: 1,
    targetProgress: 1,
    completed: true,
    pointsEarned: 75,
    bonusMultiplier: 2,
    isModified() {
      return false;
    },
    save: async function save() {
      challengeSaveCount += 1;
      return this;
    },
  };

  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'c1' }],
      ensureDailyChallenges: async () => false,
      find: async () => [],
      findOne: async (query) => {
        if (query.challengeType === 'daily_lesson') {
          return dailyLessonChallenge;
        }
        return null;
      },
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/LearningProgress': {
      countDocuments: async () => 1,
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await getDailyChallenges(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(challengeSaveCount, 0);
  assert.equal(user.totalPoints, 300);
  assert.equal(userSaveCount, 0);
});

test('updateChallengeProgress is disabled for direct client mutation', async () => {
  const { updateChallengeProgress } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {},
    '../models/User': {},
    '../models/LearningProgress': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { challengeId: 'c1' },
    body: { increment: 1 },
  };
  const res = createMockRes();
  let captured = null;

  await updateChallengeProgress(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Direct challenge progress updates are disabled/i);
});

test('completeChallenge is disabled for direct client mutation', async () => {
  const { completeChallenge } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {},
    '../models/User': {},
    '../models/LearningProgress': {},
  });

  const req = { clerkUser: { id: 'clerk_1' }, params: { challengeId: 'c1' } };
  const res = createMockRes();
  let captured = null;

  await completeChallenge(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Direct challenge completion is disabled/i);
});
