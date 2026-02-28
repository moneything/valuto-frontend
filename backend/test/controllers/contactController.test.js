const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');

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

const withMailEnv = async (fn) => {
  const previousEnv = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  };

  process.env.SMTP_HOST = 'smtp.example.com';
  process.env.SMTP_PORT = '587';
  process.env.SMTP_USER = 'mailer@example.com';
  process.env.SMTP_PASS = 'secret';
  process.env.CONTACT_TO_EMAIL = 'contact@example.com';
  process.env.CONTACT_FROM_EMAIL = 'no-reply@example.com';

  try {
    await fn();
  } finally {
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
};

test('sendContactEmail rejects missing required fields', async () => {
  await withMailEnv(async () => {
    const { sendContactEmail } = loadWithMocks('../../src/controllers/contactController', {
      nodemailer: {},
    });

    const req = { body: { name: '', email: '', subject: '', message: '' } };
    const res = createMockRes();
    let captured = null;

    await sendContactEmail(req, res, (err) => {
      captured = err;
    });

    assert.ok(captured);
    assert.equal(captured.statusCode, 400);
    assert.match(captured.message, /required/);
  });
});

test('sendContactEmail rejects invalid email addresses', async () => {
  await withMailEnv(async () => {
    const { sendContactEmail } = loadWithMocks('../../src/controllers/contactController', {
      nodemailer: {},
    });

    const req = {
      body: {
        name: 'Jane Doe',
        email: 'bad@@example',
        subject: 'Partnership',
        message: 'Hello this message is long enough.',
      },
    };
    const res = createMockRes();
    let captured = null;

    await sendContactEmail(req, res, (err) => {
      captured = err;
    });

    assert.ok(captured);
    assert.equal(captured.statusCode, 400);
    assert.match(captured.message, /valid email/i);
  });
});

test('sendContactEmail rejects unsupported name characters', async () => {
  await withMailEnv(async () => {
    const { sendContactEmail } = loadWithMocks('../../src/controllers/contactController', {
      nodemailer: {},
    });

    const req = {
      body: {
        name: 'Jane <script>',
        email: 'jane@example.com',
        subject: 'Partnership',
        message: 'Hello this message is long enough.',
      },
    };
    const res = createMockRes();
    let captured = null;

    await sendContactEmail(req, res, (err) => {
      captured = err;
    });

    assert.ok(captured);
    assert.equal(captured.statusCode, 400);
    assert.match(captured.message, /unsupported characters/i);
  });
});

test('sendContactEmail rejects angle brackets in subject and message', async () => {
  await withMailEnv(async () => {
    const { sendContactEmail } = loadWithMocks('../../src/controllers/contactController', {
      nodemailer: {},
    });

    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Hello <b>there</b>',
        message: 'Hello this message is long enough.',
      },
    };
    const res = createMockRes();
    let captured = null;

    await sendContactEmail(req, res, (err) => {
      captured = err;
    });

    assert.ok(captured);
    assert.equal(captured.statusCode, 400);
    assert.match(captured.message, /angle brackets/i);
  });
});

test('sendContactEmail sends sanitized payload through nodemailer', async () => {
  await withMailEnv(async () => {
    let transportConfig = null;
    let sentMail = null;
    const nodemailer = require('nodemailer');
    const originalCreateTransport = nodemailer.createTransport;

    nodemailer.createTransport = (config) => {
      transportConfig = config;
      return {
        sendMail: async (payload) => {
          sentMail = payload;
        },
      };
    };

    const { sendContactEmail } = loadWithMocks('../../src/controllers/contactController', {});

    try {
      const req = {
        body: {
          name: '  Jane   Doe  ',
          email: 'JANE@EXAMPLE.COM ',
          subject: '  Partnership Request ',
          message: 'Hello there, I would like to learn more about Valuto for our school.',
        },
      };
      const res = createMockRes();

      await sendContactEmail(req, res, () => {});

      assert.deepEqual(transportConfig, {
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mailer@example.com',
          pass: 'secret',
        },
      });
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.success, true);
      assert.equal(sentMail.replyTo, 'jane@example.com');
      assert.equal(sentMail.to, 'contact@example.com');
      assert.match(sentMail.subject, /\[Contact\] Partnership Request/);
      assert.match(sentMail.text, /Name: Jane Doe/);
    } finally {
      nodemailer.createTransport = originalCreateTransport;
    }
  });
});
