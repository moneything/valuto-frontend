const test = require('node:test');
const assert = require('node:assert/strict');

const {
  AppError,
  errorHandler,
  asyncHandler,
  notFound,
} = require('../../src/utils/errorHandler');

const createMockRes = () => {
  const res = {
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
  };

  return res;
};

test('AppError stores status code and errors metadata', () => {
  const err = new AppError('bad request', 400, [{ field: 'email' }]);

  assert.equal(err.message, 'bad request');
  assert.equal(err.statusCode, 400);
  assert.deepEqual(err.errors, [{ field: 'email' }]);
  assert.equal(err.isOperational, true);
});

test('asyncHandler forwards rejected errors to next()', async () => {
  const boom = new Error('boom');
  let captured = null;
  const next = (err) => {
    captured = err;
  };

  const wrapped = asyncHandler(async () => {
    throw boom;
  });

  await wrapped({}, {}, next);

  assert.equal(captured, boom);
});

test('notFound passes a 404 AppError to next()', () => {
  let captured = null;
  notFound({ originalUrl: '/missing' }, {}, (err) => {
    captured = err;
  });

  assert.ok(captured instanceof AppError);
  assert.equal(captured.statusCode, 404);
  assert.match(captured.message, /Route not found: \/missing/);
});

test('errorHandler maps mongoose CastError to 400 invalid ID response', () => {
  const req = {};
  const res = createMockRes();
  const castError = { name: 'CastError', value: 'abc123' };
  const originalConsoleError = console.error;
  console.error = () => {};

  errorHandler(castError, req, res, () => {});
  console.error = originalConsoleError;

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /Invalid ID: abc123/);
});

test('errorHandler maps duplicate key errors to 400 with fields', () => {
  const req = {};
  const res = createMockRes();
  const duplicateError = {
    code: 11000,
    keyPattern: { email: 1, clerkUserId: 1 },
  };
  const originalConsoleError = console.error;
  console.error = () => {};

  errorHandler(duplicateError, req, res, () => {});
  console.error = originalConsoleError;

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /Duplicate value for: email, clerkUserId/);
  assert.deepEqual(res.body.errors, ['email', 'clerkUserId']);
});
