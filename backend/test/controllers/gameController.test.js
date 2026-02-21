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

test('submitGameResult creates result and updates user stats for student flow', async () => {
  let createdPayload = null;
  let saveCount = 0;
  const user = {
    _id: { toString: () => 'user_db_1' },
    role: 'student',
    totalPoints: 100,
    gamesPlayed: 3,
    updateStreak: () => {},
    save: async () => {
      saveCount += 1;
    },
  };

  const challenge = { completed: true };

  const { submitGameResult } = loadWithMocks('../../src/controllers/gameController', {
    '../models/GameResult': {
      create: async (payload) => {
        createdPayload = payload;
        return { _id: 'gr_1', ...payload };
      },
    },
    '../models/User': { findOne: async () => user },
    '../models/Challenge': {
      findOne: async () => challenge,
      createDailyChallenges: async () => {},
    },
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: {
      gameCode: 'abc123',
      gameTitle: 'Money Quiz',
      gameType: 'trivia',
      score: 40,
      maxPossibleScore: 100,
      questionsAnswered: 10,
      correctAnswers: 4,
      timeTaken: 60,
      questionResults: [],
    },
  };
  const res = createMockRes();

  await submitGameResult(req, res, () => {});

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(createdPayload.gameCode, 'ABC123');
  assert.equal(user.totalPoints, 140);
  assert.equal(user.gamesPlayed, 4);
  assert.equal(saveCount, 1);
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

