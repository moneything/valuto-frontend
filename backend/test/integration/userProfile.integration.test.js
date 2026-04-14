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

const runChain = async (handlers, req, res) => {
  for (const handler of handlers) {
    await runHandler(handler, req, res);
    if (res.statusCode >= 400 && res.body) break;
  }
};

test('profile update chain ignores submitted school changes and updates allowed fields', async () => {
  const user = {
    clerkUserId: 'user_123',
    name: 'Jane Doe',
    title: 'Ms',
    age: 13,
    school: 'Alpha School',
    grade: 'Year 8',
    subject: 'Finance',
    save: async () => {},
  };

  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({
        sub: 'user_123',
        email: 'jane@test.com',
        first_name: 'Jane',
        last_name: 'Doe',
      }),
      clerkClient: {},
    },
  });
  const { validateUserUpdate } = require('../../src/utils/validators');
  const { updateUserProfile } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {
      findOne: async () => user,
    },
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: {
      name: 'Janet Doe',
      grade: 'Year 9',
      school: 'Other School',
    },
  };
  const res = createMockRes();

  await runChain([authenticateClerkUser, ...validateUserUpdate, updateUserProfile], req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(user.name, 'Janet Doe');
  assert.equal(user.grade, 'Year 9');
  assert.equal(user.school, 'Alpha School');
});

test('generic profile sync blocks changing school after it has been set', async () => {
  const user = {
    clerkUserId: 'user_123',
    name: 'Jane Doe',
    title: 'Ms',
    email: 'jane@test.com',
    role: 'student',
    school: 'Alpha School',
    save: async () => {},
  };

  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({
        sub: 'user_123',
        email: 'jane@test.com',
        first_name: 'Jane',
        last_name: 'Doe',
      }),
      clerkClient: {},
    },
  });
  const { validateUserCreation } = require('../../src/utils/validators');
  const { createOrUpdateUser } = loadWithMocks('../../src/controllers/userController', {
    '../models/User': {
      findOne: async () => user,
      create: async () => {
        throw new Error('should not create existing user');
      },
    },
  });

  const req = {
    headers: { authorization: 'Bearer valid-token' },
    body: {
      clerkUserId: 'user_123',
      name: 'Jane Doe',
      email: 'jane@test.com',
      school: 'Other School',
    },
  };
  const res = createMockRes();
  let captured = null;

  try {
    await runChain([authenticateClerkUser, ...validateUserCreation, createOrUpdateUser], req, res);
  } catch (err) {
    captured = err;
  }

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /cannot be changed after it has been set/i);
});

test('same-school stats route allows access and cross-school stats route denies access', async () => {
  const gameResultPath = require.resolve('../../src/models/GameResult');
  const learningProgressPath = require.resolve('../../src/models/LearningProgress');
  const challengePath = require.resolve('../../src/models/Challenge');
  const originalGameResult = require.cache[gameResultPath];
  const originalLearningProgress = require.cache[learningProgressPath];
  const originalChallenge = require.cache[challengePath];

  require.cache[gameResultPath] = {
    id: gameResultPath,
    filename: gameResultPath,
    loaded: true,
    exports: {
      getUserStats: async () => ({ totalQuestions: 10, totalCorrect: 8, totalGames: 2, avgAccuracy: 80 }),
    },
  };
  require.cache[learningProgressPath] = {
    id: learningProgressPath,
    filename: learningProgressPath,
    loaded: true,
    exports: {
      getUserProgress: async () => [],
    },
  };
  require.cache[challengePath] = {
    id: challengePath,
    filename: challengePath,
    loaded: true,
    exports: {
      getUserChallengeStats: async () => ({ totalCompleted: 3 }),
    },
  };

  const requester = { school: 'Alpha School' };
  const targetSameSchool = {
    _id: { toString: () => 'target_1' },
    name: 'Target User',
    title: 'Mx',
    email: 'target@test.com',
    role: 'student',
    school: 'Alpha School',
    grade: 'Year 8',
    totalPoints: 250,
    gamesPlayed: 5,
    lessonsCompleted: 4,
    currentStreak: 2,
    longestStreak: 5,
  };

  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({
        sub: 'user_123',
        email: 'jane@test.com',
      }),
      clerkClient: {},
    },
  });

  try {
    const sameSchoolController = loadWithMocks('../../src/controllers/userController', {
      '../models/User': {
        findOne: async () => requester,
        findById: async () => targetSameSchool,
        countDocuments: async () => 4,
      },
    }).getUserStatsById;

    const sameReq = {
      headers: { authorization: 'Bearer valid-token' },
      params: { id: 'target_1' },
    };
    const sameRes = createMockRes();

    await runChain([authenticateClerkUser, sameSchoolController], sameReq, sameRes);

    assert.equal(sameRes.statusCode, 200);
    assert.equal(sameRes.body.success, true);
    assert.equal(sameRes.body.data.user.school, 'Alpha School');

    const crossSchoolController = loadWithMocks('../../src/controllers/userController', {
      '../models/User': {
        findOne: async () => requester,
        findById: async () => ({ school: 'Beta School' }),
      },
    }).getUserStatsById;

    const crossReq = {
      headers: { authorization: 'Bearer valid-token' },
      params: { id: 'target_2' },
    };
    const crossRes = createMockRes();
    let captured = null;

    try {
      await runChain([authenticateClerkUser, crossSchoolController], crossReq, crossRes);
    } catch (err) {
      captured = err;
    }

    assert.ok(captured);
    assert.equal(captured.statusCode, 403);
    assert.match(captured.message, /users in your school/i);
  } finally {
    if (originalGameResult) require.cache[gameResultPath] = originalGameResult;
    else delete require.cache[gameResultPath];
    if (originalLearningProgress) require.cache[learningProgressPath] = originalLearningProgress;
    else delete require.cache[learningProgressPath];
    if (originalChallenge) require.cache[challengePath] = originalChallenge;
    else delete require.cache[challengePath];
  }
});
