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

test('getGlobalLeaderboard returns ranked users with applied filters', async () => {
  let receivedOptions = null;
  const users = [{ _id: 'u1', name: 'A', totalPoints: 300 }, { _id: 'u2', name: 'B', totalPoints: 200 }];

  const {
    getGlobalLeaderboard,
  } = loadWithMocks('../../src/controllers/leaderboardController', {
    '../models/User': {
      getLeaderboard: async (opts) => {
        receivedOptions = opts;
        return users;
      },
    },
  });

  const req = { query: { limit: '2', role: 'student', school: 'Test School' } };
  const res = createMockRes();

  await getGlobalLeaderboard(req, res, () => {});

  assert.deepEqual(receivedOptions, { limit: 2, role: 'student', school: 'Test School' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.leaderboard[0].rank, 1);
  assert.equal(res.body.data.leaderboard[1].rank, 2);
});

test('getUserRank returns 404 when profile is missing', async () => {
  const { getUserRank } = loadWithMocks('../../src/controllers/leaderboardController', {
    '../models/User': {
      findOne: async () => null,
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();

  await getUserRank(req, res, () => {});

  assert.equal(res.statusCode, 404);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /User profile not found/);
});

test('getUserRank calculates global/school ranks and percentile', async () => {
  let countCall = 0;
  const { getUserRank } = loadWithMocks('../../src/controllers/leaderboardController', {
    '../models/User': {
      findOne: async () => ({
        role: 'student',
        school: 'Test School',
        totalPoints: 500,
      }),
      countDocuments: async () => {
        countCall += 1;
        if (countCall === 1) return 9; // users above globally
        if (countCall === 2) return 3; // users above in school
        return 100; // total users
      },
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();

  await getUserRank(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.globalRank, 10);
  assert.equal(res.body.data.schoolRank, 4);
  assert.equal(res.body.data.totalUsers, 100);
  assert.equal(res.body.data.percentile, 90);
});

