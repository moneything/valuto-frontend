const test = require('node:test');
const assert = require('node:assert/strict');

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

const withEnv = async (vars, fn) => {
  const previous = {};
  for (const [key, value] of Object.entries(vars)) {
    previous[key] = process.env[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
};

test('createCheckoutSession yields AppError when Stripe is not configured', async () => {
  await withEnv(
    {
      STRIPE_SECRET_KEY: undefined,
      STRIPE_PRICE_ID: undefined,
      NEXT_PUBLIC_APP_URL: 'https://frontend.up.railway.app',
    },
    async () => {
      const UserMock = { findOne: async () => null };
      const { createCheckoutSession } = loadWithMocks(
        '../../src/controllers/billingController',
        { '../models/User': UserMock }
      );

      const req = { auth: { userId: 'u1', emailAddress: 'u@test.com' } };
      const res = createMockRes();
      let capturedError = null;

      await createCheckoutSession(req, res, (err) => {
        capturedError = err;
      });

      assert.ok(capturedError);
      assert.equal(capturedError.statusCode, 500);
      assert.match(capturedError.message, /Stripe is not configured/);
    }
  );
});

test('createCheckoutSession returns alreadyActive when subscription is active', async () => {
  await withEnv(
    {
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRICE_ID: 'price_123',
      NEXT_PUBLIC_APP_URL: 'https://frontend.up.railway.app',
    },
    async () => {
      class StripeMock {
        constructor() {
          this.checkout = {
            sessions: { create: async () => ({ url: 'https://stripe.test/checkout' }) },
          };
          this.billingPortal = {
            sessions: { create: async () => ({ url: 'https://stripe.test/portal' }) },
          };
          this.webhooks = { constructEvent: () => ({}) };
          this.subscriptions = { retrieve: async () => ({}) };
        }
      }

      const UserMock = {
        findOne: async () => ({ subscriptionStatus: 'active' }),
      };

      const { createCheckoutSession } = loadWithMocks(
        '../../src/controllers/billingController',
        {
          stripe: StripeMock,
          '../models/User': UserMock,
        }
      );

      const req = { auth: { userId: 'u1', emailAddress: 'u@test.com' } };
      const res = createMockRes();

      await createCheckoutSession(req, res, () => {});

      assert.equal(res.statusCode, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.alreadyActive, true);
    }
  );
});

test('createCheckoutSession creates Stripe session and returns URL', async () => {
  await withEnv(
    {
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRICE_ID: 'price_123',
      NEXT_PUBLIC_APP_URL: 'https://frontend.up.railway.app',
    },
    async () => {
      let checkoutPayload = null;

      class StripeMock {
        constructor() {
          this.checkout = {
            sessions: {
              create: async (payload) => {
                checkoutPayload = payload;
                return { url: 'https://stripe.test/checkout/session-1' };
              },
            },
          };
          this.billingPortal = {
            sessions: { create: async () => ({ url: 'https://stripe.test/portal' }) },
          };
          this.webhooks = { constructEvent: () => ({}) };
          this.subscriptions = { retrieve: async () => ({}) };
        }
      }

      const UserMock = {
        findOne: async () => ({
          clerkUserId: 'u1',
          email: 'u@test.com',
          subscriptionStatus: 'inactive',
          stripeCustomerId: null,
        }),
      };

      const { createCheckoutSession } = loadWithMocks(
        '../../src/controllers/billingController',
        {
          stripe: StripeMock,
          '../models/User': UserMock,
        }
      );

      const req = { auth: { userId: 'u1', emailAddress: 'u@test.com' } };
      const res = createMockRes();

      await createCheckoutSession(req, res, () => {});

      assert.equal(res.statusCode, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.url, 'https://stripe.test/checkout/session-1');
      assert.equal(checkoutPayload.success_url, 'https://frontend.up.railway.app/dashboard?checkout=success');
      assert.equal(checkoutPayload.cancel_url, 'https://frontend.up.railway.app/subscribe?checkout=cancelled');
      assert.equal(checkoutPayload.line_items[0].price, 'price_123');
    }
  );
});

test('handleStripeWebhook returns 500 when webhook is not configured', async () => {
  await withEnv(
    {
      STRIPE_SECRET_KEY: undefined,
      STRIPE_WEBHOOK_SECRET: undefined,
      NEXT_PUBLIC_APP_URL: 'https://frontend.up.railway.app',
    },
    async () => {
      const { handleStripeWebhook } = loadWithMocks(
        '../../src/controllers/billingController',
        { '../models/User': { findOneAndUpdate: async () => null } }
      );

      const req = { headers: {}, body: Buffer.from('{}') };
      const res = createMockRes();

      await handleStripeWebhook(req, res);

      assert.equal(res.statusCode, 500);
      assert.match(res.text, /Stripe webhook not configured/);
    }
  );
});
