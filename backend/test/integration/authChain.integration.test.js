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

const runMiddleware = (middleware, req, res) =>
  new Promise((resolve, reject) => {
    try {
      middleware(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    } catch (err) {
      reject(err);
    }
  });

test('auth chain blocks missing bearer token before protected handler', async () => {
  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const req = { headers: {} };
  const res = createMockRes();
  let handlerCalled = false;

  await authenticateClerkUser(req, res, () => {
    handlerCalled = true;
  });

  assert.equal(handlerCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.success, false);
});

test('auth chain allows valid token and reaches protected handler', async () => {
  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => ({
        sub: 'user_123',
        email: 'jane@test.com',
        first_name: 'Jane',
        last_name: 'Doe',
      }),
    },
  });

  const req = { headers: { authorization: 'Bearer valid-token' } };
  const res = createMockRes();
  let handlerResult = null;

  await runMiddleware(authenticateClerkUser, req, res);
  handlerResult = { success: true, userId: req.auth.userId };

  assert.equal(res.statusCode, 200);
  assert.deepEqual(handlerResult, { success: true, userId: 'user_123' });
});

test('auth + requireRole chain denies non-teacher and allows teacher', async () => {
  let requestedRole = 'student';
  const modelPath = require.resolve('../../src/models/User');
  const originalModelCache = require.cache[modelPath];
  require.cache[modelPath] = {
    id: modelPath,
    filename: modelPath,
    loaded: true,
    exports: {
      findOne: async () => ({ role: requestedRole, clerkUserId: 'user_123' }),
    },
  };

  const { authenticateClerkUser, requireRole } = loadWithMocks(
    '../../src/middleware/auth',
    {
      '@clerk/clerk-sdk-node': {
        verifyToken: async () => ({ sub: 'user_123', email: 'jane@test.com' }),
      },
    }
  );

  const gate = requireRole('teacher');

  try {
    const reqDenied = { headers: { authorization: 'Bearer valid-token' } };
    const resDenied = createMockRes();

    await runMiddleware(authenticateClerkUser, reqDenied, resDenied);
    await gate(reqDenied, resDenied, () => {});

    assert.equal(resDenied.statusCode, 403);
    assert.equal(resDenied.body.success, false);

    requestedRole = 'teacher';
    const reqAllowed = { headers: { authorization: 'Bearer valid-token' } };
    const resAllowed = createMockRes();
    let passed = false;

    await runMiddleware(authenticateClerkUser, reqAllowed, resAllowed);
    await gate(reqAllowed, resAllowed, () => {
      passed = true;
    });

    assert.equal(passed, true);
    assert.equal(reqAllowed.user.role, 'teacher');
  } finally {
    if (originalModelCache) {
      require.cache[modelPath] = originalModelCache;
    } else {
      delete require.cache[modelPath];
    }
  }
});

