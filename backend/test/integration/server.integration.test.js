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
    './routes/webhookRoutes': (() => {
      const router = express.Router();
      router.post('/clerk', (req, res) => {
        res.status(200).json({ ok: true, route: 'webhook-clerk' });
      });
      return router;
    })(),
    './routes/aiRoutes': (() => {
      const router = express.Router();
      router.get('/boom', (req, res, next) => {
        next(new AppError('Boom', 418));
      });
      return router;
    })(),
  });
};

const runAppRequest = (app, { method = 'GET', url = '/', headers = {} } = {}) =>
  new Promise((resolve, reject) => {
    const req = {
      method,
      url,
      originalUrl: url,
      path: url,
      headers,
      socket: {},
      connection: {},
      get(name) {
        return this.headers[name.toLowerCase()];
      },
    };

    let body = '';
    const res = {
      statusCode: 200,
      headersSent: false,
      locals: {},
      _headers: {},
      setHeader(name, value) {
        this._headers[name.toLowerCase()] = value;
      },
      getHeader(name) {
        return this._headers[name.toLowerCase()];
      },
      removeHeader(name) {
        delete this._headers[name.toLowerCase()];
      },
      writeHead(statusCode, headers = {}) {
        this.statusCode = statusCode;
        Object.entries(headers).forEach(([name, value]) => {
          this.setHeader(name, value);
        });
      },
      write(chunk) {
        if (chunk) {
          body += chunk;
        }
      },
      end(chunk) {
        if (chunk) {
          body += chunk;
        }
        this.headersSent = true;
        let parsedBody = body;
        try {
          parsedBody = body ? JSON.parse(body) : null;
        } catch (error) {
          parsedBody = body;
        }
        resolve({
          statusCode: this.statusCode,
          headers: this._headers,
          body: parsedBody,
        });
      },
    };

    app.handle(req, res, reject);
  });

test('server root and health endpoints return expected payloads', async () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_APP_URL = 'http://test.local';

  try {
    const app = createServerApp();

    const rootResponse = await runAppRequest(app, {
      url: '/',
      headers: { origin: 'http://test.local' },
    });

    assert.equal(rootResponse.statusCode, 200);
    assert.equal(rootResponse.body.success, true);
    assert.match(rootResponse.body.message, /valuto backend api is running/i);
    assert.equal(rootResponse.headers['access-control-allow-origin'], 'http://test.local');
    assert.equal(rootResponse.headers['access-control-allow-credentials'], 'true');

    const healthResponse = await runAppRequest(app, {
      url: '/api/health',
      headers: { origin: 'http://test.local' },
    });

    assert.equal(healthResponse.statusCode, 200);
    assert.equal(healthResponse.body.success, true);
    assert.equal(healthResponse.body.database, 'connected');
  } finally {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  }
});

test('server rejects disallowed origins through CORS middleware', async () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  const originalConsoleError = console.error;
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_APP_URL = 'http://allowed.test';
  console.error = () => {};

  try {
    const app = createServerApp();

    const response = await runAppRequest(app, {
      url: '/',
      headers: { origin: 'http://blocked.test' },
    });

    assert.equal(response.statusCode, 500);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, 'Not allowed by CORS');
  } finally {
    console.error = originalConsoleError;
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

    const response = await runAppRequest(app, {
      url: '/does-not-exist',
      headers: { origin: 'http://test.local' },
    });

    assert.equal(response.statusCode, 404);
    assert.equal(response.body.success, false);
    assert.match(response.body.message, /route not found/i);
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

    const response = await runAppRequest(app, {
      url: '/api/ai/boom',
      headers: { origin: 'http://test.local' },
    });

    assert.equal(response.statusCode, 418);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, 'Boom');
  } finally {
    console.error = originalConsoleError;
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  }
});

test('server mounts /api/webhooks before notFound handling', async () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_APP_URL = 'http://test.local';

  try {
    const app = createServerApp();

    const response = await runAppRequest(app, {
      method: 'POST',
      url: '/api/webhooks/clerk',
      headers: { origin: 'http://test.local' },
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { ok: true, route: 'webhook-clerk' });
  } finally {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  }
});
