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

const runHandler = (handler, req, res) =>
  new Promise((resolve, reject) => {
    let settled = false;
    Promise.resolve(handler(req, res, (err) => {
      settled = true;
      if (err) reject(err);
      else resolve();
    }))
      .then(() => {
        if (!settled) resolve();
      })
      .catch(reject);
  });

const getSessionCreateChain = () => {
  const router = loadWithMocks('../../src/routes/triviaRoutes', {
    '../controllers/triviaController': {
      restartSession: () => {},
      createSession: (req, res) => res.status(201).json({ success: true }),
      getSessionByCode: () => {},
      getSession: () => {},
      getUserSessions: () => {},
      getSessionResults: () => {},
      getUserHistory: () => {},
      getUserTriviaStats: () => {},
      getPlatformTriviaStats: () => {},
      deleteSession: () => {},
    },
    '../middleware/auth': {
      authenticateClerkUser: (req, _res, next) => {
        req.clerkUser = { id: 'user_1' };
        req.auth = { userId: 'user_1' };
        next();
      },
      requireActiveSubscription: (_req, _res, next) => next(),
    },
  });

  const layer = router.stack.find(
    (entry) => entry.route && entry.route.path === '/session' && entry.route.methods.post
  );

  return layer.route.stack.map((entry) => entry.handle);
};

const runSessionCreate = async (body) => {
  const handlers = getSessionCreateChain();
  const req = { body, headers: {} };
  const res = createMockRes();

  for (const handler of handlers) {
    await runHandler(handler, req, res);
    if (res.statusCode >= 400 && res.body) break;
  }

  return res;
};

test('trivia session creation rejects too many questions', async () => {
  const questions = Array.from({ length: 51 }, (_, index) => ({
    question: `Question ${index + 1}`,
    options: ['a', 'b', 'c', 'd'],
    correctAnswer: 1,
  }));

  const res = await runSessionCreate({
    title: 'Big Quiz',
    questions,
  });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /between 1 and 50 items/i);
});

test('trivia session creation rejects oversized payloads', async () => {
  const hugeText = 'x'.repeat(600);
  const res = await runSessionCreate({
    title: 'Huge Quiz',
    questions: [
      {
        question: hugeText,
        options: ['a', 'b', 'c', 'd'],
        correctAnswer: 1,
      },
    ],
  });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /between 5 and 500 characters/i);
});

test('trivia session creation rejects overlong option and explanation text', async () => {
  const res = await runSessionCreate({
    title: 'Verbose Quiz',
    questions: [
      {
        question: 'What is budgeting?',
        options: ['a'.repeat(201), 'b', 'c', 'd'],
        correctAnswer: 1,
        explanation: 'e'.repeat(1001),
      },
    ],
  });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /option text must be between 1 and 200 characters/i);
  assert.match(JSON.stringify(res.body.errors), /explanation must be 1000 characters or fewer/i);
});
