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

const getChallengeHandlers = (path, method, options = {}) => {
  const { subscriptionStatus = 'active', mocks = {} } = options;
  clearChallengeRouteCache();
  const router = loadWithMocks('../../src/routes/challengeRoutes', {
    '../middleware/auth': {
      authenticateClerkUser: (req, _res, next) => {
        req.clerkUser = { id: 'clerk_1' };
        req.auth = { userId: 'clerk_1' };
        next();
      },
      requireActiveSubscription: (_req, res, next) => {
        if (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing') {
          return res.status(402).json({
            success: false,
            message: 'An active subscription is required to access this resource.',
          });
        }
        next();
      },
    },
    '../models/User': {
      findOne: async () => ({
        _id: { toString: () => 'user_1' },
        completedOnboarding: true,
        subscriptionStatus: 'active',
      }),
    },
    '../models/Challenge': {},
    '../models/LearningProgress': {},
    ...mocks,
  });
  return getRouteHandlers(router, path, method);
};

test('challenge progress route requires an active subscription', async () => {
  const handlers = getChallengeHandlers('/:challengeId/progress', 'put', {
    subscriptionStatus: 'free',
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    params: { challengeId: 'c1' },
    body: { increment: 1 },
  };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 402);
  assert.match(res.body.message, /active subscription/i);
});

test('challenge progress route blocks direct client mutation for subscribed users', async () => {
  const handlers = getChallengeHandlers('/:challengeId/progress', 'put');
  const req = {
    headers: { authorization: 'Bearer valid-token' },
    params: { challengeId: 'c1' },
    body: { increment: 1 },
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
  assert.match(captured.message, /Direct challenge progress updates are disabled/i);
});

test('challenge completion route blocks direct client mutation for subscribed users', async () => {
  const handlers = getChallengeHandlers('/:challengeId/complete', 'put');
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
  assert.match(captured.message, /Direct challenge completion is disabled/i);
});
