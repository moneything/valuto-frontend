const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');

test('socketAuth rejects when token is missing', async () => {
  const socketAuth = loadWithMocks('../../src/middleware/socketAuth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({}) },
  });

  const socket = { handshake: { auth: {} } };
  let err = null;

  await socketAuth(socket, (e) => {
    err = e;
  });

  assert.ok(err instanceof Error);
  assert.match(err.message, /Authentication token required/);
});

test('socketAuth rejects when token verification fails', async () => {
  const socketAuth = loadWithMocks('../../src/middleware/socketAuth', {
    '@clerk/clerk-sdk-node': {
      verifyToken: async () => {
        throw new Error('bad token');
      },
    },
  });

  const socket = { handshake: { auth: { token: 'bad' } } };
  let err = null;
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    await socketAuth(socket, (e) => {
      err = e;
    });
  } finally {
    console.error = originalConsoleError;
  }

  assert.ok(err instanceof Error);
  assert.match(err.message, /Failed to verify authentication token/);
});

test('socketAuth rejects when payload has no subject', async () => {
  const socketAuth = loadWithMocks('../../src/middleware/socketAuth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => ({ email: 'x@test.com' }) },
  });

  const socket = { handshake: { auth: { token: 'ok' } } };
  let err = null;

  await socketAuth(socket, (e) => {
    err = e;
  });

  assert.ok(err instanceof Error);
  assert.match(err.message, /Invalid or expired session token/);
});

test('socketAuth attaches user and proceeds for valid token', async () => {
  const payload = {
    sub: 'user_123',
    email: 'jane@test.com',
    first_name: 'Jane',
    last_name: 'Doe',
  };
  const socketAuth = loadWithMocks('../../src/middleware/socketAuth', {
    '@clerk/clerk-sdk-node': { verifyToken: async () => payload },
  });

  const socket = { handshake: { auth: { token: 'ok' } } };
  let err = null;

  await socketAuth(socket, (e) => {
    err = e || null;
  });

  assert.equal(err, null);
  assert.equal(socket.user.id, 'user_123');
  assert.equal(socket.user.fullName, 'Jane Doe');
});

