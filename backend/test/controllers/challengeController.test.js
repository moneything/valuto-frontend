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

test('getDailyChallenges returns challenge list for authenticated users', async () => {
  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'c1' }],
      ensureDailyChallenges: async () => false,
      find: async () => [],
      findOne: async () => null,
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' }, role: 'student' }),
    },
    '../models/LearningProgress': {
      countDocuments: async () => 0,
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await getDailyChallenges(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.deepEqual(res.body.data, [{ id: 'c1' }]);
});

test('getDailyChallenges syncs daily lesson progress and awards points on first completion', async () => {
  let userSaveCount = 0;
  let challengeSaveCount = 0;
  const user = {
    _id: { toString: () => 'u1' },
    role: 'student',
    totalPoints: 125,
    updateStreak: () => {},
    save: async () => {
      userSaveCount += 1;
    },
  };
  const dailyLessonChallenge = {
    _id: { toString: () => 'daily_1' },
    challengeType: 'daily_lesson',
    currentProgress: 0,
    targetProgress: 1,
    completed: false,
    pointsEarned: 75,
    bonusMultiplier: 2,
    isModified() {
      return this.currentProgress === 1 || this.completed === true;
    },
    save: async function save() {
      challengeSaveCount += 1;
      return this;
    },
  };

  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'c1' }],
      ensureDailyChallenges: async () => false,
      find: async () => [],
      findOne: async (query) => {
        if (query.challengeType === 'daily_lesson') {
          return dailyLessonChallenge;
        }
        return null;
      },
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/LearningProgress': {
      countDocuments: async (query) => {
        if (query.status === 'completed') {
          return 1;
        }
        return 0;
      },
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await getDailyChallenges(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(dailyLessonChallenge.currentProgress, 1);
  assert.equal(dailyLessonChallenge.completed, true);
  assert.equal(challengeSaveCount, 1);
  assert.equal(user.totalPoints, 275);
  assert.equal(userSaveCount, 1);
});

test('getDailyChallenges does not re-award already completed daily lesson challenges', async () => {
  let userSaveCount = 0;
  let challengeSaveCount = 0;
  const user = {
    _id: { toString: () => 'u1' },
    role: 'student',
    totalPoints: 300,
    updateStreak: () => {},
    save: async () => {
      userSaveCount += 1;
    },
  };
  const dailyLessonChallenge = {
    _id: { toString: () => 'daily_1' },
    challengeType: 'daily_lesson',
    currentProgress: 1,
    targetProgress: 1,
    completed: true,
    pointsEarned: 75,
    bonusMultiplier: 2,
    isModified() {
      return false;
    },
    save: async function save() {
      challengeSaveCount += 1;
      return this;
    },
  };

  const { getDailyChallenges } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      getDailyChallenges: async () => [{ id: 'c1' }],
      ensureDailyChallenges: async () => false,
      find: async () => [],
      findOne: async (query) => {
        if (query.challengeType === 'daily_lesson') {
          return dailyLessonChallenge;
        }
        return null;
      },
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/LearningProgress': {
      countDocuments: async () => 1,
    },
  });

  const req = { clerkUser: { id: 'clerk_1' } };
  const res = createMockRes();
  const originalConsoleLog = console.log;
  console.log = () => {};

  try {
    await getDailyChallenges(req, res, () => {});
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(challengeSaveCount, 0);
  assert.equal(user.totalPoints, 300);
  assert.equal(userSaveCount, 0);
});

test('updateChallengeProgress awards points only on first completion', async () => {
  let userSaved = 0;
  const user = {
    _id: { toString: () => 'u1' },
    totalPoints: 100,
    updateStreak: () => {},
    save: async () => {
      userSaved += 1;
    },
  };

  const challenge = {
    challengeType: 'monthly_build_your_life',
    completed: false,
    pointsEarned: 50,
    bonusMultiplier: 2,
    updateProgress: async () => {
      challenge.completed = true;
    },
  };

  const { updateChallengeProgress } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => challenge,
    },
    '../models/User': {
      findOne: async () => user,
    },
    '../models/LearningProgress': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { challengeId: 'c1' },
    body: { increment: 1 },
  };
  const res = createMockRes();

  await updateChallengeProgress(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.pointsEarned, 50);
  assert.equal(user.totalPoints, 200);
  assert.equal(userSaved, 1);
});

test('updateChallengeProgress rejects non-positive increments', async () => {
  const { updateChallengeProgress } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => ({
        challengeType: 'monthly_build_your_business',
        completed: false,
      }),
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' } }),
    },
    '../models/LearningProgress': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { challengeId: 'c1' },
    body: { increment: 0 },
  };
  const res = createMockRes();
  let captured = null;

  await updateChallengeProgress(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 400);
  assert.match(captured.message, /increment must be a positive value/i);
});

test('updateChallengeProgress rejects direct updates for non-manual challenge types', async () => {
  const { updateChallengeProgress } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => ({
        challengeType: 'daily_trivia',
        completed: false,
      }),
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' } }),
    },
    '../models/LearningProgress': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { challengeId: 'c1' },
    body: { increment: 5 },
  };
  const res = createMockRes();
  let captured = null;

  await updateChallengeProgress(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /cannot be updated directly/i);
});

test('updateChallengeProgress caps manual progress updates to one step', async () => {
  let receivedIncrement = null;
  const challenge = {
    challengeType: 'monthly_investment_simulation',
    completed: false,
    pointsEarned: 20,
    bonusMultiplier: 1,
    updateProgress: async (increment) => {
      receivedIncrement = increment;
    },
  };

  const { updateChallengeProgress } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => challenge,
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' }, totalPoints: 0 }),
    },
    '../models/LearningProgress': {},
  });

  const req = {
    clerkUser: { id: 'clerk_1' },
    params: { challengeId: 'c1' },
    body: { increment: 999 },
  };
  const res = createMockRes();

  await updateChallengeProgress(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(receivedIncrement, 1);
});

test('completeChallenge returns 400 when challenge already completed', async () => {
  const { completeChallenge } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => ({ challengeType: 'monthly_build_your_business', completed: true }),
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' } }),
    },
    '../models/LearningProgress': {},
  });

  const req = { clerkUser: { id: 'clerk_1' }, params: { challengeId: 'c1' } };
  const res = createMockRes();

  await completeChallenge(req, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /already completed/i);
});

test('completeChallenge rejects direct completion for non-manual challenge types', async () => {
  const { completeChallenge } = loadWithMocks('../../src/controllers/challengeController', {
    '../models/Challenge': {
      findOne: async () => ({ challengeType: 'daily_lesson', completed: false }),
    },
    '../models/User': {
      findOne: async () => ({ _id: { toString: () => 'u1' } }),
    },
    '../models/LearningProgress': {},
  });

  const req = { clerkUser: { id: 'clerk_1' }, params: { challengeId: 'c1' } };
  const res = createMockRes();
  let captured = null;

  await completeChallenge(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /cannot be updated directly/i);
});
