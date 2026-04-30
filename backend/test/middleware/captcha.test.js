const test = require('node:test');
const assert = require('node:assert/strict');

const { verifyTurnstile } = require('../../src/middleware/captcha');

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

test('verifyTurnstile bypasses missing secret outside production', async () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;
  const originalNodeEnv = process.env.NODE_ENV;
  delete process.env.TURNSTILE_SECRET_KEY;
  process.env.NODE_ENV = 'test';

  const req = { body: {}, headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await verifyTurnstile(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalSecret) process.env.TURNSTILE_SECRET_KEY = originalSecret;
    else delete process.env.TURNSTILE_SECRET_KEY;
    if (originalNodeEnv) process.env.NODE_ENV = originalNodeEnv;
    else delete process.env.NODE_ENV;
  }

  assert.equal(nextCalled, true);
});

test('verifyTurnstile requires server configuration in production', async () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;
  const originalNodeEnv = process.env.NODE_ENV;
  delete process.env.TURNSTILE_SECRET_KEY;
  process.env.NODE_ENV = 'production';

  const req = { body: {}, headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await verifyTurnstile(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalSecret) process.env.TURNSTILE_SECRET_KEY = originalSecret;
    else delete process.env.TURNSTILE_SECRET_KEY;
    if (originalNodeEnv) process.env.NODE_ENV = originalNodeEnv;
    else delete process.env.NODE_ENV;
  }

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 500);
  assert.match(res.body.message, /Captcha verification is not configured/);
});

test('verifyTurnstile rejects missing captcha tokens when configured', async () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;
  process.env.TURNSTILE_SECRET_KEY = 'secret';

  const req = { body: {}, headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  try {
    await verifyTurnstile(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalSecret) process.env.TURNSTILE_SECRET_KEY = originalSecret;
    else delete process.env.TURNSTILE_SECRET_KEY;
  }

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /Captcha verification is required/);
});
