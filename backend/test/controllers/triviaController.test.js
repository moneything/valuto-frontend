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

test('getSessionByCode uppercases join code and returns 404 when not found', async () => {
  let receivedQuery = null;

  const sessionModelMock = {
    findOne: (query) => {
      receivedQuery = query;
      return {
        select: () => ({
          lean: async () => null,
        }),
      };
    },
  };

  const { getSessionByCode } = loadWithMocks('../../src/controllers/triviaController', {
    '../models/Session': sessionModelMock,
    '../models/SessionResult': {},
  });

  const req = { params: { joinCode: 'abc123' } };
  const res = createMockRes();
  let captured = null;

  await getSessionByCode(req, res, (err) => {
    captured = err;
  });

  assert.deepEqual(receivedQuery, { joinCode: 'ABC123' });
  assert.ok(captured);
  assert.equal(captured.statusCode, 404);
  assert.match(captured.message, /Session not found/);
});

test('createSession allows authenticated users to create trivia sessions', async () => {
  const userModelPath = require.resolve('../../src/models/User');
  const originalUserModelCache = require.cache[userModelPath];
  require.cache[userModelPath] = {
    id: userModelPath,
    filename: userModelPath,
    loaded: true,
    exports: {
      findOne: async () => ({ role: 'student', name: 'Learner One' }),
    },
  };

  let createdPayload = null;
  const { createSession } = loadWithMocks('../../src/controllers/triviaController', {
    '../models/Session': {
      generateJoinCode: async () => 'ABC123',
      create: async (payload) => {
        createdPayload = payload;
        return payload;
      },
    },
    '../models/SessionResult': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    body: {
      title: 'Finance Quiz',
      questions: [{ question: 'Q1', options: ['a', 'b', 'c', 'd'], correctAnswer: 1 }],
    },
  };
  const res = createMockRes();

  try {
    await createSession(req, res, () => {});
  } finally {
    if (originalUserModelCache) {
      require.cache[userModelPath] = originalUserModelCache;
    } else {
      delete require.cache[userModelPath];
    }
  }

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(createdPayload.hostName, 'Learner One');
  assert.equal(createdPayload.status, 'waiting');
});

test('createSession creates waiting session and returns summary payload', async () => {
  const userModelPath = require.resolve('../../src/models/User');
  const originalUserModelCache = require.cache[userModelPath];
  require.cache[userModelPath] = {
    id: userModelPath,
    filename: userModelPath,
    loaded: true,
    exports: {
      findOne: async () => ({ role: 'teacher', name: 'Teacher One' }),
    },
  };

  let createdPayload = null;

  const { createSession } = loadWithMocks('../../src/controllers/triviaController', {
    '../models/Session': {
      generateJoinCode: async () => 'ZXCVBN',
      create: async (payload) => {
        createdPayload = payload;
        return {
          sessionId: payload.sessionId,
          joinCode: payload.joinCode,
          title: payload.title,
          questions: payload.questions,
        };
      },
    },
    '../models/SessionResult': {},
  });

  const req = {
    clerkUser: { id: 'teacher_1' },
    body: {
      title: 'Finance Quiz',
      questions: [
        {
          question: 'What is saving?',
          options: ['a', 'b', 'c', 'd'],
          correctAnswer: 2,
          timeLimit: 20,
          explanation: 'It is setting money aside.',
        },
      ],
      settings: { speedBonusEnabled: true },
    },
  };
  const res = createMockRes();

  try {
    await createSession(req, res, () => {});
  } finally {
    if (originalUserModelCache) {
      require.cache[userModelPath] = originalUserModelCache;
    } else {
      delete require.cache[userModelPath];
    }
  }

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.joinCode, 'ZXCVBN');
  assert.equal(res.body.data.questionCount, 1);
  assert.equal(createdPayload.hostId, 'teacher_1');
  assert.equal(createdPayload.status, 'waiting');
  assert.equal(createdPayload.questions[0].correctIndex, 2);
});
