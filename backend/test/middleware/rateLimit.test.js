const test = require('node:test');
const assert = require('node:assert/strict');

const { rateLimit } = require('../../src/middleware/rateLimit');

const createMockRes = () => ({
  statusCode: 200,
  body: null,
  headers: {},
  setHeader(key, value) {
    this.headers[key] = value;
  },
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
});

test('rateLimit blocks requests after the configured maximum', async () => {
  const middleware = rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: 'Slow down.',
  });
  const req = {
    method: 'POST',
    originalUrl: '/api/contact',
    headers: { 'x-forwarded-for': '203.0.113.10' },
  };
  const firstRes = createMockRes();
  const secondRes = createMockRes();
  let nextCount = 0;

  middleware(req, firstRes, () => {
    nextCount += 1;
  });
  middleware(req, secondRes, () => {
    nextCount += 1;
  });

  assert.equal(nextCount, 1);
  assert.equal(secondRes.statusCode, 429);
  assert.equal(secondRes.body.message, 'Slow down.');
  assert.ok(secondRes.headers['Retry-After']);
});
