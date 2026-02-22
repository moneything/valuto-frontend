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

test('getDailyChallenges returns empty list for teacher role', async () => {
  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'unused' }],
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' }, role: 'teacher' }),
    },
    '../models/LearningProgress': {},
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
  assert.deepEqual(res.body.data, []);
});

test('updateChallengeProgress awards points only on first completion', async () => {
  let userSaved = 0;
  const user = {
    _id: { toString: () => 'u1' },
    totalPoints: 100,
    updateStreak: () => {},
    save: async () => {
      userSaved += 1;
    },
  };

  const challenge = {
    completed: false,
    pointsEarned: 50,
    bonusMultiplier: 2,
    updateProgress: async () => {
      challenge.completed = true;
    },
  };

  const { updateChallengeProgress } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => challenge,
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/LearningProgress': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { challengeId: 'c1' },
    body: { increment: 1 },
  };
  const res = createMockRes();

  await updateChallengeProgress(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.pointsEarned, 50);
  assert.equal(user.totalPoints, 200);
  assert.equal(userSaved, 1);
});

test('completeChallenge returns 400 when challenge already completed', async () => {
  const { completeChallenge } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => ({ completed: true }),
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' } }),
    },
    '../models/LearningProgress': {},
  });

  const req = { clerkUser: { id: 'clerk_1' }, params: { challengeId: 'c1' } };
  const res = createMockRes();

  await completeChallenge(req, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /already completed/i);
});
