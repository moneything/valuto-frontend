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

const clearGameRouteCache = () => {
  delete require.cache[require.resolve('../../src/routes/gameRoutes')];
  delete require.cache[require.resolve('../../src/controllers/gameController')];
  delete require.cache[require.resolve('../../src/middleware/auth')];
};

const getGameResultHandlers = (mocks) => {
  clearGameRouteCache();
  const router = loadWithMocks('../../src/routes/gameRoutes', mocks);
  return getRouteHandlers(router, '/result', 'post');
};

test('game result route rejects missing sessionId and gameCode', async () => {
  const handlers = getGameResultHandlers({
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/GameResult': {},
    '../models/User': {},
    '../models/Challenge': {},
    '../models/Session': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: {},
  };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /sessionId or gameCode is required/i);
});

test('game result route returns existing verified result without re-awarding points', async () => {
  let saveCalled = false;
  const handlers = getGameResultHandlers({
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/GameResult': {
      findOne: async () => ({ _id: 'gr_existing', gameCode: 'ABC123', completed: true }),
    },
    '../models/User': {
      findOne: async () => ({
        _id: { toString: () => 'user_1' },
        totalPoints: 150,
        gamesPlayed: 4,
        save: async () => {
          saveCalled = true;
        },
      }),
    },
    '../models/Session': {
      findOne: async () => ({
        joinCode: 'ABC123',
        status: 'ended',
        players: [{ userId: 'clerk_1', answeredQuestions: 2 }],
      }),
    },
    '../models/Challenge': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.updatedStats.totalPoints, 150);
  assert.equal(saveCalled, false);
});

test('game result route returns existing session result when create hits duplicate key race', async () => {
  let saveCalled = false;
  const duplicateResult = { _id: 'gr_existing', sessionId: 'session_1', gameCode: 'ABC123', completed: true };
  const handlers = getGameResultHandlers({
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/GameResult': {
      findOne: async (query) => {
        if (query.sessionId === 'session_1') {
          return duplicateResult;
        }
        return null;
      },
      create: async () => {
        const error = new Error('duplicate key');
        error.code = 11000;
        throw error;
      },
    },
    '../models/User': {
      findOne: async () => ({
        _id: { toString: () => 'user_1' },
        totalPoints: 150,
        gamesPlayed: 4,
        updateStreak: () => {},
        save: async () => {
          saveCalled = true;
        },
      }),
    },
    '../models/Session': {
      findOne: async () => ({
        sessionId: 'session_1',
        joinCode: 'ABC123',
        title: 'Money Quiz',
        status: 'ended',
        settings: { pointsPerCorrect: 100 },
        questions: [{ id: 'q1', question: 'Q1', correctIndex: 1, points: 100 }],
        players: [
          {
            userId: 'clerk_1',
            answeredQuestions: 1,
            correctAnswers: 1,
            score: 100,
            answers: [
              { questionId: 'q1', selectedIndex: 1, isCorrect: true, timeSpentMs: 5000, pointsEarned: 100 },
            ],
          },
        ],
      }),
    },
    '../models/Challenge': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();

  await runRouteHandlers(handlers, req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.gameResult, duplicateResult);
  assert.equal(res.body.data.updatedStats.totalPoints, 150);
  assert.equal(saveCalled, false);
});

test('game result route rejects unfinished verified sessions end-to-end', async () => {
  const handlers = getGameResultHandlers({
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/GameResult': {},
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_1' } }),
    },
    '../models/Session': {
      findOne: async () => ({
        joinCode: 'ABC123',
        status: 'active',
      }),
    },
    '../models/Challenge': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();
  let captured = null;

  try {
    await runRouteHandlers(handlers, req, res);
  } catch (err) {
    captured = err;
  }

  assert.ok(captured);
  assert.equal(captured.statusCode, 400);
  assert.match(captured.message, /must be finished/i);
});

test('game result route rejects non-participants end-to-end', async () => {
  const handlers = getGameResultHandlers({
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({ sub: 'clerk_1', email: 'user@test.com' }),
      clerkClient: {},
    },
    '../models/GameResult': {},
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_1' } }),
    },
    '../models/Session': {
      findOne: async () => ({
        joinCode: 'ABC123',
        status: 'ended',
        players: [{ userId: 'other_user', answeredQuestions: 2 }],
      }),
    },
    '../models/Challenge': {},
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: { gameCode: 'abc123' },
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
  assert.match(captured.message, /not eligible/i);
});
