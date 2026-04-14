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

const clearLeaderboardRouteCache = () => {
  delete require.cache[require.resolve('../../src/routes/leaderboardRoutes')];
  delete require.cache[require.resolve('../../src/controllers/leaderboardController')];
  delete require.cache[require.resolve('../../src/middleware/auth')];
};

const getLeaderboardHandlers = (path, method, mocks) => {
  clearLeaderboardRouteCache();
  const router = loadWithMocks('../../src/routes/leaderboardRoutes', mocks);
  return getRouteHandlers(router, path, method);
};

test('leaderboard route strips emails from public global responses', async () => {
  const handlers = getLeaderboardHandlers('/', 'get', {
    '../models/User': {
      getLeaderboard: async () => [
        { _id: 'u1', name: 'A', email: 'a@test.com', totalPoints: 300 },
      ],
    },
    '../middleware/auth': {
      authenticateClerkUser: () => {},
      optionalAuth: (_req, _res, next) => next(),
    },
  });

  const req = { query: { limit: '1' }, headers: {} };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal('email' in res.body.data.leaderboard[0], false);
});

test('leaderboard school route strips emails from public school responses', async () => {
  const handlers = getLeaderboardHandlers('/school/:schoolName', 'get', {
    '../models/User': {
      getLeaderboard: async () => [
        { _id: 'u1', name: 'A', email: 'a@test.com', totalPoints: 300 },
      ],
    },
    '../middleware/auth': {
      authenticateClerkUser: () => {},
      optionalAuth: (_req, _res, next) => next(),
    },
  });

  const req = { params: { schoolName: 'Test School' }, query: {}, headers: {} };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal('email' in res.body.data.leaderboard[0], false);
});

test('leaderboard top route strips emails from public hall of fame responses', async () => {
  const handlers = getLeaderboardHandlers('/top', 'get', {
    '../models/User': {
      find: () => ({
        select: () => ({
          sort: () => ({
            limit: () => ({
              lean: async () => [
                { name: 'A', email: 'a@test.com', totalPoints: 300, currentStreak: 4 },
              ],
            }),
          }),
        }),
      }),
    },
    '../middleware/auth': {
      authenticateClerkUser: () => {},
      optionalAuth: (_req, _res, next) => next(),
    },
  });

  const req = { query: {}, headers: {} };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal('email' in res.body.data[0], false);
});
