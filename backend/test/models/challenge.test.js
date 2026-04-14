const test = require('node:test');
const assert = require('node:assert/strict');

const Challenge = require('../../src/models/Challenge');

const createChallenge = (overrides = {}) =>
  new Challenge({
    userId: 'user_1',
    clerkUserId: 'clerk_1',
    challengeId: 'daily_trivia_1',
    challengeType: 'daily_trivia',
    challengeName: 'Daily Trivia',
    challengeDescription: 'Play one trivia game today',
    pointsEarned: 50,
    targetProgress: 1,
    challengeDate: new Date('2026-04-14T00:00:00.000Z'),
    expiresAt: new Date('2026-04-15T00:00:00.000Z'),
    ...overrides,
  });

test('updateProgress completes challenge when target is reached', async () => {
  const challenge = createChallenge({
    targetProgress: 3,
    currentProgress: 1,
  });

  let saveCalled = 0;
  challenge.save = async function save() {
    saveCalled += 1;
    return this;
  };

  await challenge.updateProgress(2);

  assert.equal(challenge.currentProgress, 3);
  assert.equal(challenge.completed, true);
  assert.ok(challenge.completedAt instanceof Date);
  assert.equal(saveCalled, 1);
});

test('updateProgress accumulates progress without completing early', async () => {
  const challenge = createChallenge({
    targetProgress: 5,
    currentProgress: 1,
  });

  challenge.save = async function save() {
    return this;
  };

  await challenge.updateProgress(2);

  assert.equal(challenge.currentProgress, 3);
  assert.equal(challenge.completed, false);
  assert.equal(challenge.completedAt, undefined);
});

test('complete marks challenge complete and sets full progress', async () => {
  const challenge = createChallenge({
    targetProgress: 4,
    currentProgress: 2,
  });

  let saveCalled = 0;
  challenge.save = async function save() {
    saveCalled += 1;
    return this;
  };

  await challenge.complete();

  assert.equal(challenge.currentProgress, 4);
  assert.equal(challenge.completed, true);
  assert.ok(challenge.completedAt instanceof Date);
  assert.equal(saveCalled, 1);
});

test('buildMonthlyChallenges creates three featured-game monthly challenges', () => {
  const monthStart = new Date('2026-04-01T00:00:00.000Z');

  const templates = Challenge.buildMonthlyChallenges(monthStart, 'user_1', 'clerk_1');

  assert.equal(templates.length, 3);
  assert.deepEqual(
    templates.map((template) => template.challengeType),
    [
      'monthly_build_your_life',
      'monthly_build_your_business',
      'monthly_investment_simulation',
    ]
  );
  assert.ok(templates.every((template) => template.expiresAt > monthStart));
});

test('ensureDailyChallenges creates missing daily and monthly templates only once', async () => {
  const created = [];
  const date = new Date('2026-04-14T12:00:00.000Z');

  const MockChallenge = {
    buildDailyChallenges: Challenge.buildDailyChallenges,
    buildMonthlyChallenges: Challenge.buildMonthlyChallenges,
    findOne: async ({ challengeType }) => {
      if (challengeType === 'daily_trivia') {
        return { challengeType };
      }
      return null;
    },
    create: async (template) => {
      created.push(template.challengeType);
      return template;
    },
  };

  const createdAny = await Challenge.ensureDailyChallenges.call(
    MockChallenge,
    'user_1',
    'clerk_1',
    date
  );

  assert.equal(createdAny, true);
  assert.equal(created.includes('daily_trivia'), false);
  assert.ok(created.includes('daily_lesson'));
  assert.ok(created.includes('monthly_build_your_life'));
  assert.ok(created.includes('monthly_build_your_business'));
  assert.ok(created.includes('monthly_investment_simulation'));
});

test('getDailyChallenges queries active daily and monthly windows for the given day', async () => {
  let receivedQuery = null;

  const MockChallenge = {
    find: (query) => {
      receivedQuery = query;
      return {
        sort: () => ({
          lean: async () => [],
        }),
      };
    },
  };

  await Challenge.getDailyChallenges.call(MockChallenge, 'user_1', new Date('2026-04-14T12:00:00.000Z'));

  assert.equal(receivedQuery.userId, 'user_1');
  assert.ok(receivedQuery.challengeDate.$lte instanceof Date);
  assert.ok(Array.isArray(receivedQuery.$or));
  assert.equal(receivedQuery.$or.length, 3);
});
