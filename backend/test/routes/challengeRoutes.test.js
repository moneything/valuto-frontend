const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');
const { getRouteHandlers, runRouteHandlers } = require('../helpers/runRoute');

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

const clearChallengeRouteCache = () => {
  delete require.cache[require.resolve('../../src/routes/challengeRoutes')];
  delete require.cache[require.resolve('../../src/controllers/challengeController')];
  delete require.cache[require.resolve('../../src/middleware/auth')];
};

const getChallengeHandlers = (path, method, mocks) => {
  clearChallengeRouteCache();
  const router = loadWithMocks('../../src/routes/challengeRoutes', mocks);
  return getRouteHandlers(router, path, method);
};

test('challenge progress route blocks direct updates for normal challenge types', async () => {
  const handlers = getChallengeHandlers('/:challengeId/progress', 'put', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_1' } }),
    },
    '../models/Challenge': {
      findOne: async () => ({ challengeType: 'daily_trivia', userId: 'user_1' }),
    },
    '../models/LearningProgress': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    params: { challengeId: 'c1' },
    body: { increment: 3 },
  };
  const res = createMockRes();
  let captured = null;

  try {
    await runRouteHandlers(handlers, req, res);
  } catch (err) {
    captured = err;
  }

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /cannot be updated directly/i);
});

test('challenge progress route allows monthly challenge updates but caps to one step', async () => {
  let receivedIncrement = null;
  const handlers = getChallengeHandlers('/:challengeId/progress', 'put', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/User': {
      findOne: async () => ({
        _id: { toString: () => 'user_1' },
        totalPoints: 0,
      }),
    },
    '../models/Challenge': {
      findOne: async () => ({
        challengeType: 'monthly_build_your_life',
        completed: false,
        pointsEarned: 20,
        bonusMultiplier: 1,
        updateProgress: async (increment) => {
          receivedIncrement = increment;
        },
      }),
    },
    '../models/LearningProgress': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    params: { challengeId: 'c1' },
    body: { increment: 50 },
  };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(receivedIncrement, 1);
});

test('challenge completion route blocks direct completion for normal challenge types', async () => {
  const handlers = getChallengeHandlers('/:challengeId/complete', 'put', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_1' } }),
    },
    '../models/Challenge': {
      findOne: async () => ({ challengeType: 'daily_lesson', completed: false }),
    },
    '../models/LearningProgress': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    params: { challengeId: 'c1' },
  };
  const res = createMockRes();
  let captured = null;

  try {
    await runRouteHandlers(handlers, req, res);
  } catch (err) {
    captured = err;
  }

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /cannot be updated directly/i);
});

test('challenge completion route awards points once for allowed monthly challenge types', async () => {
  let saveCount = 0;
  const user = {
    _id: { toString: () => 'user_1' },
    totalPoints: 100,
    updateStreak: () => {},
    save: async () => {
      saveCount += 1;
    },
  };
  const challenge = {
    challengeType: 'monthly_investment_simulation',
    completed: false,
    targetProgress: 3,
    currentProgress: 1,
    pointsEarned: 40,
    bonusMultiplier: 2,
    updateProgress: async () => {
      challenge.completed = true;
      challenge.currentProgress = 3;
    },
  };

  const handlers = getChallengeHandlers('/:challengeId/complete', 'put', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/Challenge': {
      findOne: async () => challenge,
    },
    '../models/LearningProgress': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    params: { challengeId: 'c1' },
  };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(user.totalPoints, 180);
  assert.equal(saveCount, 1);
});
