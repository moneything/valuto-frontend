const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateUserUpdate,
} = require('../../src/utils/validators');

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

const runChain = async (handlers, body) => {
  const req = { body };
  const res = createMockRes();

  for (const handler of handlers) {
    await runHandler(handler, req, res);
    if (res.statusCode >= 400 && res.body) break;
  }

  return res;
};

test('validateUserUpdate rejects invalid age values', async () => {
  const res = await runChain(validateUserUpdate, { age: 200 });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /age/i);
});

test('validateUserUpdate rejects overlong school and subject fields', async () => {
  const res = await runChain(validateUserUpdate, {
    school: 's'.repeat(201),
    subject: 'x'.repeat(101),
  });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /school/i);
  assert.match(JSON.stringify(res.body.errors), /subject/i);
});

test('validateUserUpdate rejects titles shorter than minimum length', async () => {
  const res = await runChain(validateUserUpdate, { title: 'A' });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(JSON.stringify(res.body.errors), /title must be between 2 and 20 characters/i);
});
