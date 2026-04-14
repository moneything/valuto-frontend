const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');

const { AppError } = require('../../src/utils/errorHandler');
const { loadWithMocks } = require('../helpers/loadWithMocks');

const createEmptyRouter = () => express.Router();

const createServerApp = () => {
  delete require.cache[require.resolve('../../src/server')];

  return loadWithMocks('../../src/server', {
    './config/database': {
      connectDatabase: async () => {},
    },
    './config/socket': {
      initializeSocketIO: () => ({}),
    },
    './sockets/triviaSocketHandlers': {
      registerTriviaSocketHandlers: () => {},
    },
    './controllers/billingController': {
      handleStripeWebhook: (req, res) => res.status(200).json({ received: true }),
    },
    './routes/authRoutes': createEmptyRouter(),
    './routes/userRoutes': createEmptyRouter(),
    './routes/gameRoutes': createEmptyRouter(),
    './routes/leaderboardRoutes': createEmptyRouter(),
    './routes/learningRoutes': createEmptyRouter(),
    './routes/challengeRoutes': createEmptyRouter(),
    './routes/triviaRoutes': createEmptyRouter(),
    './routes/newsRoutes': createEmptyRouter(),
    './routes/categoryRoutes': createEmptyRouter(),
    './routes/billingRoutes': createEmptyRouter(),
    './routes/contactRoutes': createEmptyRouter(),
    './routes/webhookRoutes': createEmptyRouter(),
    './routes/aiRoutes': (() => {
      const router = express.Router();
      router.get('/boom', (req, res, next) => {
        next(new AppError('Boom', 418));
      });
      return router;
    })(),
  });
};

const withTestServer = async (app, run) => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    return await run(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
};

test('server root and health endpoints return expected payloads', async () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_APP_URL = 'http://test.local';

  try {
    const app = createServerApp();

    await withTestServer(app, async (baseUrl) => {
      const rootResponse = await fetch(`${baseUrl}/`, {
        headers: { Origin: 'http://test.local' },
      });
      const rootPayload = await rootResponse.json();

      assert.equal(rootResponse.status, 200);
      assert.equal(rootPayload.success, true);
      assert.match(rootPayload.message, /valuto backend api is running/i);

      const healthResponse = await fetch(`${baseUrl}/api/health`, {
        headers: { Origin: 'http://test.local' },
      });
      const healthPayload = await healthResponse.json();

      assert.equal(healthResponse.status, 200);
      assert.equal(healthPayload.success, true);
      assert.equal(healthPayload.database, 'connected');
    });
  } finally {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  }
});

test('server returns structured 404 responses through notFound handler', async () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  const originalConsoleError = console.error;
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_APP_URL = 'http://test.local';
  console.error = () => {};

  try {
    const app = createServerApp();

    await withTestServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/does-not-exist`, {
        headers: { Origin: 'http://test.local' },
      });
      const payload = await response.json();

      assert.equal(response.status, 404);
      assert.equal(payload.success, false);
      assert.match(payload.message, /route not found/i);
    });
  } finally {
    console.error = originalConsoleError;
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  }
});

test('server global error handler serializes AppError from mounted routes', async () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  const originalConsoleError = console.error;
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_APP_URL = 'http://test.local';
  console.error = () => {};

  try {
    const app = createServerApp();

    await withTestServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/ai/boom`, {
        headers: { Origin: 'http://test.local' },
      });
      const payload = await response.json();

      assert.equal(response.status, 418);
      assert.equal(payload.success, false);
      assert.equal(payload.message, 'Boom');
    });
  } finally {
    console.error = originalConsoleError;
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  }
});
