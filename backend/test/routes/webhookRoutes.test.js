const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');

const { loadWithMocks } = require('../helpers/loadWithMocks');

const createMockRes = () => ({
  statusCode: 200,
  body: null,
  text: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
  send(payload) {
    this.text = payload;
    return this;
  },
});

function signedRequestBody(payload, secretValue = 'test_clerk_secret') {
  const rawBody = Buffer.from(JSON.stringify(payload));
  const secret = `whsec_${Buffer.from(secretValue).toString('base64')}`;
  const svixId = 'msg_test_123';
  const svixTimestamp = String(Math.floor(Date.now() / 1000));
  const signature = crypto
    .createHmac('sha256', Buffer.from(secretValue))
    .update(`${svixId}.${svixTimestamp}.${rawBody.toString('utf8')}`)
    .digest('base64');

  return {
    rawBody,
    secret,
    headers: {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': `v1,${signature}`,
    },
  };
}

function loadWebhookRoutes(userMock = {}) {
  delete require.cache[require.resolve('../../src/routes/webhookRoutes')];
  return loadWithMocks('../../src/routes/webhookRoutes', {
    '../models/User': userMock,
  });
}

test('verifyClerkWebhook rejects requests when webhook secret is missing', async () => {
  const originalSecret = process.env.CLERK_WEBHOOK_SECRET;
  delete process.env.CLERK_WEBHOOK_SECRET;

  const { verifyClerkWebhook } = loadWebhookRoutes();
  const req = { body: Buffer.from('{}'), headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  try {
    verifyClerkWebhook(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalSecret) process.env.CLERK_WEBHOOK_SECRET = originalSecret;
    else delete process.env.CLERK_WEBHOOK_SECRET;
  }

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 500);
  assert.match(res.body.message, /not configured/i);
});

test('verifyClerkWebhook rejects invalid signatures', async () => {
  const originalSecret = process.env.CLERK_WEBHOOK_SECRET;
  const payload = { type: 'user.created', data: { id: 'clerk_1' } };
  const signed = signedRequestBody(payload);
  process.env.CLERK_WEBHOOK_SECRET = signed.secret;

  const { verifyClerkWebhook } = loadWebhookRoutes();
  const req = {
    body: signed.rawBody,
    headers: {
      ...signed.headers,
      'svix-signature': 'v1,invalid',
    },
  };
  const res = createMockRes();
  let nextCalled = false;

  try {
    verifyClerkWebhook(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalSecret) process.env.CLERK_WEBHOOK_SECRET = originalSecret;
    else delete process.env.CLERK_WEBHOOK_SECRET;
  }

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /Invalid Clerk webhook signature/);
});

test('verifyClerkWebhook accepts valid Svix signatures and parses payload', async () => {
  const originalSecret = process.env.CLERK_WEBHOOK_SECRET;
  const payload = { type: 'user.created', data: { id: 'clerk_1' } };
  const signed = signedRequestBody(payload);
  process.env.CLERK_WEBHOOK_SECRET = signed.secret;

  const { verifyClerkWebhook } = loadWebhookRoutes();
  const req = { body: signed.rawBody, headers: signed.headers };
  const res = createMockRes();
  let nextCalled = false;

  try {
    verifyClerkWebhook(req, res, () => {
      nextCalled = true;
    });
  } finally {
    if (originalSecret) process.env.CLERK_WEBHOOK_SECRET = originalSecret;
    else delete process.env.CLERK_WEBHOOK_SECRET;
  }

  assert.equal(nextCalled, true);
  assert.deepEqual(req.clerkEvent, payload);
});

test('handleClerkWebhook upserts users only after verified payload parsing', async () => {
  let receivedQuery = null;
  let receivedUpdate = null;
  const UserMock = {
    findOneAndUpdate: async (query, update) => {
      receivedQuery = query;
      receivedUpdate = update;
    },
  };

  const { handleClerkWebhook } = loadWebhookRoutes(UserMock);
  const req = {
    clerkEvent: {
      type: 'user.created',
      data: {
        id: 'clerk_1',
        email_addresses: [{ email_address: 'student@example.com' }],
        first_name: 'Ada',
        last_name: 'Lovelace',
      },
    },
  };
  const res = createMockRes();

  await handleClerkWebhook(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.text, 'OK');
  assert.deepEqual(receivedQuery, { clerkUserId: 'clerk_1' });
  assert.equal(receivedUpdate.email, 'student@example.com');
  assert.equal(receivedUpdate.name, 'Ada Lovelace');
});
