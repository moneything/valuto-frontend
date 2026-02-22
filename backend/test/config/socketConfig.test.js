const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');

const withEnv = async (vars, fn) => {
  const previous = {};
  for (const [key, value] of Object.entries(vars)) {
    previous[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
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

test('initializeSocketIO configures CORS with env origins and registers auth middleware', async () => {
  await withEnv(
    {
      NEXT_PUBLIC_APP_URL: 'https://frontend-a.up.railway.app',
      FRONTEND_URL: 'https://frontend-b.up.railway.app',
    },
    async () => {
      let capturedOptions = null;
      let usedMiddleware = null;
      const events = {};

      class ServerMock {
        constructor(_httpServer, options) {
          capturedOptions = options;
        }
        use(mw) {
          usedMiddleware = mw;
        }
        on(event, handler) {
          events[event] = handler;
        }
      }

      const socketAuthMock = () => {};
      const { initializeSocketIO } = loadWithMocks('../../src/config/socket', {
        'socket.io': { Server: ServerMock },
        '../middleware/socketAuth': socketAuthMock,
      });

      const io = initializeSocketIO({});

      assert.ok(io);
      assert.deepEqual(capturedOptions.cors.origin, [
        'https://frontend-a.up.railway.app',
        'https://frontend-b.up.railway.app',
      ]);
      assert.equal(capturedOptions.cors.credentials, true);
      assert.deepEqual(capturedOptions.transports, ['websocket', 'polling']);
      assert.equal(usedMiddleware, socketAuthMock);
      assert.equal(typeof events.connection, 'function');
    }
  );
});

