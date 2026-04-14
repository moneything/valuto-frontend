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

test('submitGameResult returns 404 when user profile is missing', async () => {
  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': { create: async () => ({}) },
    '../models/User': { findOne: async () => null },
    '../models/Challenge': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: {
      gameCode: 'abc123',
      gameTitle: 'Money Quiz',
      score: 20,
      maxPossibleScore: 100,
      questionsAnswered: 10,
      correctAnswers: 2,
    },
  };
  const res = createMockRes();
  let captured = null;

  await submitGameResult(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 404);
  assert.match(captured.message, /User profile not found/);
});

test('submitGameResult creates result from a verified finished session', async () => {
  let createdPayload = null;
  let saveCount = 0;
  const user = {
    _id: { toString: () => 'user_db_1' },
    totalPoints: 100,
    gamesPlayed: 3,
    updateStreak: () => {},
    save: async () => {
      saveCount += 1;
    },
  };

  const challenge = { completed: true };
  const session = {
    sessionId: 'session_1',
    joinCode: 'ABC123',
    title: 'Money Quiz',
    status: 'ended',
    settings: { pointsPerCorrect: 100 },
    questions: [
      { id: 'q1', question: 'Q1', correctIndex: 1, points: 100 },
      { id: 'q2', question: 'Q2', correctIndex: 2, points: 100 },
    ],
    players: [
      {
        userId: 'clerk_1',
        answeredQuestions: 2,
        correctAnswers: 1,
        score: 40,
        answers: [
          { questionId: 'q1', selectedIndex: 1, isCorrect: true, timeSpentMs: 5000, pointsEarned: 40 },
          { questionId: 'q2', selectedIndex: 0, isCorrect: false, timeSpentMs: 4000, pointsEarned: 0 },
        ],
      },
    ],
  };

  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {
      findOne: async () => null,
      create: async (payload) => {
        createdPayload = payload;
        return { _id: 'gr_1', ...payload };
      },
    },
    '../models/User': { findOne: async () => user },
    '../models/Session': {
      findOne: async () => session,
    },
    '../models/Challenge': {
      findOne: async () => challenge,
      createDailyChallenges: async () => {},
    },
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: {
      gameCode: 'abc123',
    },
  };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await submitGameResult(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(createdPayload.gameCode, 'ABC123');
  assert.equal(createdPayload.gameTitle, 'Money Quiz');
  assert.equal(createdPayload.score, 40);
  assert.equal(createdPayload.questionsAnswered, 2);
  assert.equal(user.totalPoints, 140);
  assert.equal(user.gamesPlayed, 4);
  assert.equal(saveCount, 1);
});

test('submitGameResult returns existing result without re-awarding points', async () => {
  let sessionLookups = 0;
  const existingResult = { _id: 'gr_existing', gameCode: 'ABC123', completed: true };
  const user = {
    _id: { toString: () => 'user_db_1' },
    totalPoints: 150,
    gamesPlayed: 4,
  };

  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {
      findOne: async () => existingResult,
    },
    '../models/User': { findOne: async () => user },
    '../models/Session': {
      findOne: async () => {
        sessionLookups += 1;
        return {
          joinCode: 'ABC123',
          status: 'ended',
          players: [{ userId: 'clerk_1', answeredQuestions: 1 }],
        };
      },
    },
    '../models/Challenge': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();

  await submitGameResult(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.gameResult, existingResult);
  assert.equal(res.body.data.updatedStats.totalPoints, 150);
  assert.equal(sessionLookups, 1);
});

test('submitGameResult returns existing session result when create hits duplicate key race', async () => {
  let saveCount = 0;
  const user = {
    _id: { toString: () => 'user_db_1' },
    totalPoints: 150,
    gamesPlayed: 4,
    updateStreak: () => {},
    save: async () => {
      saveCount += 1;
    },
  };
  const duplicateResult = {
    _id: 'gr_existing',
    sessionId: 'session_1',
    gameCode: 'ABC123',
    completed: true,
  };

  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
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
      findOne: async () => user,
    },
    '../models/Session': {
      findOne: async () => ({
        sessionId: 'session_1',
        joinCode: 'ABC123',
        title: 'Money Quiz',
        status: 'ended',
        settings: { pointsPerCorrect: 100 },
        questions: [
          { id: 'q1', question: 'Q1', correctIndex: 1, points: 100 },
        ],
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
    clerkUser: { id: 'clerk_1' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();

  await submitGameResult(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.gameResult, duplicateResult);
  assert.equal(res.body.data.updatedStats.totalPoints, 150);
  assert.equal(saveCount, 0);
});

test('submitGameResult rejects unfinished sessions', async () => {
  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {},
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_db_1' } }),
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
    clerkUser: { id: 'clerk_1' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();
  let captured = null;

  await submitGameResult(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 400);
  assert.match(captured.message, /must be finished/i);
});

test('submitGameResult rejects when verified session is missing', async () => {
  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {},
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_db_1' } }),
    },
    '../models/Session': {
      findOne: async () => null,
    },
    '../models/Challenge': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();
  let captured = null;

  await submitGameResult(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 404);
  assert.match(captured.message, /verified game session not found/i);
});

test('submitGameResult rejects users who are not in the verified session', async () => {
  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {},
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_db_1' } }),
    },
    '../models/Session': {
      findOne: async () => ({
        joinCode: 'ABC123',
        status: 'ended',
        players: [{ userId: 'other_user', answeredQuestions: 4 }],
      }),
    },
    '../models/Challenge': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();
  let captured = null;

  await submitGameResult(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /not eligible/i);
});

test('submitGameResult rejects players with no answered questions', async () => {
  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {},
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'user_db_1' } }),
    },
    '../models/Session': {
      findOne: async () => ({
        joinCode: 'ABC123',
        status: 'ended',
        players: [{ userId: 'clerk_1', answeredQuestions: 0 }],
      }),
    },
    '../models/Challenge': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: { gameCode: 'abc123' },
  };
  const res = createMockRes();
  let captured = null;

  await submitGameResult(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /not eligible/i);
});

test('getGameResult returns 403 when requesting another user result', async () => {
  const { getGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {
      findById: async () => ({ clerkUserId: 'other_user' }),
    },
    '../models/User': {},
    '../models/Challenge': {},
  });

  const req = {
    params: { id: 'gr_1' },
    clerkUser: { id: 'clerk_1' },
  };
  const res = createMockRes();
  let captured = null;

  await getGameResult(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Access denied/);
});
