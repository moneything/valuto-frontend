const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const User = require('../../src/models/User');
const Challenge = require('../../src/models/Challenge');
const GameResult = require('../../src/models/GameResult');
const Session = require('../../src/models/Session');
const { submitGameResult } = require('../../src/controllers/gameController');
const {
  updateChallengeProgress,
  completeChallenge,
} = require('../../src/controllers/challengeController');

const mongoUri = process.env.MONGODB_URI_TEST;
const hasRealMongo = Boolean(mongoUri);

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

const invokeController = async (controller, req) => {
  const res = createMockRes();
  let capturedError = null;

  await controller(req, res, (err) => {
    capturedError = err;
  });

  return { res, error: capturedError };
};

const clearCollections = async () => {
  await Promise.all([
    User.deleteMany({}),
    Challenge.deleteMany({}),
    GameResult.deleteMany({}),
    Session.deleteMany({}),
  ]);
};

test(
  'real Mongo: GameResult enforces unique clerkUserId/sessionId index',
  { skip: !hasRealMongo },
  async () => {
    await mongoose.connect(mongoUri, { dbName: 'valuto_real_mongo_tests' });
    try {
      await clearCollections();
      await GameResult.syncIndexes();

      await GameResult.create({
        userId: 'u1',
        clerkUserId: 'clerk_1',
        sessionId: 'session_unique_1',
        gameCode: 'ABC123',
        gameTitle: 'Trivia',
        gameType: 'trivia',
        score: 100,
        maxPossibleScore: 100,
        questionsAnswered: 1,
        correctAnswers: 1,
      });

      await assert.rejects(
        () =>
          GameResult.create({
            userId: 'u1',
            clerkUserId: 'clerk_1',
            sessionId: 'session_unique_1',
            gameCode: 'XYZ999',
            gameTitle: 'Trivia Duplicate',
            gameType: 'trivia',
            score: 50,
            maxPossibleScore: 100,
            questionsAnswered: 1,
            correctAnswers: 0,
          }),
        (error) => error?.code === 11000
      );
    } finally {
      await clearCollections();
      await mongoose.connection.close();
    }
  }
);

test(
  'real Mongo: challenge seeding persists correctly across day and month boundaries',
  { skip: !hasRealMongo },
  async () => {
    await mongoose.connect(mongoUri, { dbName: 'valuto_real_mongo_tests' });
    try {
      await clearCollections();

      const userId = 'user_seed_1';
      const clerkUserId = 'clerk_seed_1';
      const april14 = new Date('2026-04-14T12:00:00.000Z');
      const april20 = new Date('2026-04-20T09:00:00.000Z');
      const may2 = new Date('2026-05-02T12:00:00.000Z');

      await Challenge.ensureDailyChallenges(userId, clerkUserId, april14);
      const firstPass = await Challenge.find({ userId }).lean();
      assert.equal(firstPass.length, 10);

      await Challenge.ensureDailyChallenges(userId, clerkUserId, april20);
      const secondPass = await Challenge.find({ userId }).lean();
      assert.equal(secondPass.length, 17);
      assert.equal(
        secondPass.filter((challenge) => challenge.challengeType.startsWith('monthly_')).length,
        3
      );

      await Challenge.ensureDailyChallenges(userId, clerkUserId, may2);
      const thirdPass = await Challenge.find({ userId }).lean();
      assert.equal(
        thirdPass.filter((challenge) => challenge.challengeType.startsWith('monthly_')).length,
        6
      );
      assert.ok(thirdPass.some((challenge) => challenge.challengeId === 'monthly_build_your_life_2026_5'));
    } finally {
      await clearCollections();
      await mongoose.connection.close();
    }
  }
);

test(
  'real Mongo: concurrent submitGameResult calls award points only once',
  { skip: !hasRealMongo },
  async () => {
    await mongoose.connect(mongoUri, { dbName: 'valuto_real_mongo_tests' });
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    console.log = () => {};
    console.error = () => {};

    try {
      await clearCollections();
      await GameResult.syncIndexes();
      await Challenge.syncIndexes();

      const user = await User.create({
        clerkUserId: 'clerk_concurrent_1',
        name: 'Concurrent User',
        email: 'concurrent@test.com',
        school: 'Test School',
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await Challenge.create({
        userId: user._id.toString(),
        clerkUserId: 'clerk_concurrent_1',
        challengeId: `daily_trivia_existing_${today.getTime()}`,
        challengeType: 'daily_trivia',
        challengeName: 'Daily Trivia',
        pointsEarned: 50,
        targetProgress: 1,
        currentProgress: 1,
        completed: true,
        rewardGranted: true,
        challengeDate: today,
        expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      });

      await Session.create({
        sessionId: 'session_concurrent_1',
        joinCode: 'ABC123',
        title: 'Money Quiz',
        hostId: 'host_1',
        hostName: 'Host',
        status: 'ended',
        questions: [
          {
            id: 'q1',
            question: 'Question 1',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 1,
            timeLimit: 30,
            points: 100,
          },
        ],
        players: [
          {
            userId: 'clerk_concurrent_1',
            name: 'Concurrent User',
            score: 100,
            answeredQuestions: 1,
            correctAnswers: 1,
            answers: [
              {
                questionId: 'q1',
                selectedIndex: 1,
                isCorrect: true,
                timeSpentMs: 4000,
                pointsEarned: 100,
                answeredAt: new Date(),
              },
            ],
          },
        ],
      });

      const req = {
        clerkUser: { id: 'clerk_concurrent_1' },
        body: { gameCode: 'abc123' },
      };

      const [firstCall, secondCall] = await Promise.all([
        invokeController(submitGameResult, req),
        invokeController(submitGameResult, req),
      ]);

      assert.equal(firstCall.error, null);
      assert.equal(secondCall.error, null);

      const refreshedUser = await User.findOne({ clerkUserId: 'clerk_concurrent_1' }).lean();
      const results = await GameResult.find({ clerkUserId: 'clerk_concurrent_1' }).lean();

      assert.equal(results.length, 1);
      assert.equal(refreshedUser.totalPoints, 100);
      assert.equal(refreshedUser.gamesPlayed, 1);
      assert.ok([200, 201].includes(firstCall.res.statusCode));
      assert.ok([200, 201].includes(secondCall.res.statusCode));
    } finally {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      await clearCollections();
      await mongoose.connection.close();
    }
  }
);

test(
  'real Mongo: concurrent monthly challenge progress awards once and claims reward once',
  { skip: !hasRealMongo },
  async () => {
    await mongoose.connect(mongoUri, { dbName: 'valuto_real_mongo_tests' });
    try {
      await clearCollections();
      await Challenge.syncIndexes();

      const user = await User.create({
        clerkUserId: 'clerk_monthly_1',
        name: 'Monthly User',
        email: 'monthly@test.com',
        school: 'Test School',
      });

      const challenge = await Challenge.create({
        userId: user._id.toString(),
        clerkUserId: 'clerk_monthly_1',
        challengeId: 'monthly_build_your_life_2026_4',
        challengeType: 'monthly_build_your_life',
        challengeName: 'Monthly Build Your Life',
        pointsEarned: 250,
        bonusMultiplier: 1,
        targetProgress: 1,
        currentProgress: 0,
        completed: false,
        challengeDate: new Date('2026-04-01T00:00:00.000Z'),
        expiresAt: new Date('2026-05-01T00:00:00.000Z'),
      });

      const req = {
        clerkUser: { id: 'clerk_monthly_1' },
        params: { challengeId: challenge._id.toString() },
        body: { increment: 1 },
      };

      const [firstCall, secondCall] = await Promise.all([
        invokeController(updateChallengeProgress, req),
        invokeController(updateChallengeProgress, req),
      ]);

      assert.equal(firstCall.error, null);
      assert.equal(secondCall.error, null);

      const refreshedUser = await User.findOne({ clerkUserId: 'clerk_monthly_1' }).lean();
      const refreshedChallenge = await Challenge.findById(challenge._id).lean();

      assert.equal(refreshedUser.totalPoints, 250);
      assert.equal(refreshedChallenge.rewardGranted, true);
      assert.equal(refreshedChallenge.currentProgress, 1);
      assert.equal(refreshedChallenge.completed, true);
    } finally {
      await clearCollections();
      await mongoose.connection.close();
    }
  }
);

test(
  'real Mongo: concurrent monthly challenge completion awards once and claims reward once',
  { skip: !hasRealMongo },
  async () => {
    await mongoose.connect(mongoUri, { dbName: 'valuto_real_mongo_tests' });
    try {
      await clearCollections();
      await Challenge.syncIndexes();

      const user = await User.create({
        clerkUserId: 'clerk_monthly_complete_1',
        name: 'Monthly Complete User',
        email: 'monthly-complete@test.com',
        school: 'Test School',
      });

      const challenge = await Challenge.create({
        userId: user._id.toString(),
        clerkUserId: 'clerk_monthly_complete_1',
        challengeId: 'monthly_build_your_business_2026_4',
        challengeType: 'monthly_build_your_business',
        challengeName: 'Monthly Build Your Business',
        pointsEarned: 250,
        bonusMultiplier: 1,
        targetProgress: 1,
        currentProgress: 0,
        completed: false,
        challengeDate: new Date('2026-04-01T00:00:00.000Z'),
        expiresAt: new Date('2026-05-01T00:00:00.000Z'),
      });

      const req = {
        clerkUser: { id: 'clerk_monthly_complete_1' },
        params: { challengeId: challenge._id.toString() },
      };

      const [firstCall, secondCall] = await Promise.all([
        invokeController(completeChallenge, req),
        invokeController(completeChallenge, req),
      ]);

      assert.equal(firstCall.error, null);
      assert.equal(secondCall.error, null);

      const refreshedUser = await User.findOne({ clerkUserId: 'clerk_monthly_complete_1' }).lean();
      const refreshedChallenge = await Challenge.findById(challenge._id).lean();

      assert.equal(refreshedUser.totalPoints, 250);
      assert.equal(refreshedChallenge.rewardGranted, true);
      assert.equal(refreshedChallenge.completed, true);
      assert.equal(refreshedChallenge.currentProgress, 1);
    } finally {
      await clearCollections();
      await mongoose.connection.close();
    }
  }
);
