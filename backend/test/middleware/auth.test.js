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

test('authenticateClerkUser returns 401 when Authorization header is missing', async () => {
  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const req = { headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  await authenticateClerkUser(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.match(res.body.message, /Authentication required/);
});

test('authenticateClerkUser sets req.auth and calls next on valid token', async () => {
  const payload = {
    sub: 'user_123',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
  };

  const { authenticateClerkUser } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => payload },
  });

  const req = { headers: { authorization: 'Bearer token_abc' } };
  const res = createMockRes();
  let nextCalled = false;

  await authenticateClerkUser(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.auth.userId, 'user_123');
  assert.equal(req.auth.emailAddress, 'test@example.com');
  assert.equal(req.clerkUser.id, 'user_123');
});

test('optionalAuth proceeds without auth header and sets clerkUser null', async () => {
  const { optionalAuth } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const req = { headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  await optionalAuth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.clerkUser, null);
});

test('requireRole returns 403 when user role is not allowed', async () => {
  const modelPath = require.resolve('../../src/models/User');
  const originalModelCache = require.cache[modelPath];
  require.cache[modelPath] = {
    id: modelPath,
    filename: modelPath,
    loaded: true,
    exports: { findOne: async () => ({ role: 'student' }) },
  };

  const { requireRole } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const middleware = requireRole('teacher');
  const req = { clerkUser: { id: 'user_1' } };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await middleware(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalModelCache) {
      require.cache[modelPath] = originalModelCache;
    } else {
      delete require.cache[modelPath];
    }
  }

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 403);
  assert.match(res.body.message, /Access denied/);
});

test('requireRole allows request and attaches req.user when role matches', async () => {
  const dbUser = { role: 'teacher', id: 'db_1' };
  const modelPath = require.resolve('../../src/models/User');
  const originalModelCache = require.cache[modelPath];
  require.cache[modelPath] = {
    id: modelPath,
    filename: modelPath,
    loaded: true,
    exports: { findOne: async () => dbUser },
  };

  const { requireRole } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const middleware = requireRole(['teacher', 'admin']);
  const req = { clerkUser: { id: 'user_1' } };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await middleware(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalModelCache) {
      require.cache[modelPath] = originalModelCache;
    } else {
      delete require.cache[modelPath];
    }
  }

  assert.equal(nextCalled, true);
  assert.equal(req.user, dbUser);
});

test('requireActiveSubscription returns 402 when subscription is inactive', async () => {
  const modelPath = require.resolve('../../src/models/User');
  const originalModelCache = require.cache[modelPath];
  require.cache[modelPath] = {
    id: modelPath,
    filename: modelPath,
    loaded: true,
    exports: {
      findOne: async () => ({
        completedOnboarding: true,
        subscriptionStatus: 'free',
      }),
    },
  };

  const { requireActiveSubscription } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const req = { clerkUser: { id: 'user_1' } };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await requireActiveSubscription(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalModelCache) {
      require.cache[modelPath] = originalModelCache;
    } else {
      delete require.cache[modelPath];
    }
  }

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 402);
  assert.match(res.body.message, /active subscription/i);
});

test('requireActiveSubscription allows active subscriptions and attaches req.user', async () => {
  const dbUser = {
    completedOnboarding: true,
    subscriptionStatus: 'active',
  };
  const modelPath = require.resolve('../../src/models/User');
  const originalModelCache = require.cache[modelPath];
  require.cache[modelPath] = {
    id: modelPath,
    filename: modelPath,
    loaded: true,
    exports: {
      findOne: async () => dbUser,
    },
  };

  const { requireActiveSubscription } = loadWithMocks('../../src/middleware/auth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const req = { clerkUser: { id: 'user_1' } };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await requireActiveSubscription(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalModelCache) {
      require.cache[modelPath] = originalModelCache;
    } else {
      delete require.cache[modelPath];
    }
  }

  assert.equal(nextCalled, true);
  assert.equal(req.user, dbUser);
});
