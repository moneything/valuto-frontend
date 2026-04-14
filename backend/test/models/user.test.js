const test = require('node:test');
const assert = require('node:assert/strict');

const User = require('../../src/models/User');

const createUser = (overrides = {}) =>
  new User({
    clerkUserId: 'clerk_123',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'student',
    ...overrides,
  });

test('averageScore virtual returns rounded value', () => {
  const user = createUser({ totalPoints: 250, gamesPlayed: 3 });
  assert.equal(user.averageScore, 83.33);
});

test('averageScore virtual returns 0 when no games played', () => {
  const user = createUser({ totalPoints: 250, gamesPlayed: 0 });
  assert.equal(user.averageScore, 0);
});

test('addAchievement prevents duplicate achievement IDs', () => {
  const user = createUser();

  user.addAchievement('first-win');
  user.addAchievement('first-win');

  assert.equal(user.achievements.length, 1);
  assert.equal(user.achievements[0].achievementId, 'first-win');
});

test('updateStreak increments for consecutive day and updates longest streak', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const user = createUser({
    currentStreak: 2,
    longestStreak: 2,
    lastActiveDate: yesterday,
  });

  const streak = user.updateStreak();

  assert.equal(streak, 3);
  assert.equal(user.currentStreak, 3);
  assert.equal(user.longestStreak, 3);
});

test('updateStreak keeps same streak if already active today', () => {
  const user = createUser({
    currentStreak: 4,
    longestStreak: 6,
    lastActiveDate: new Date(),
  });

  const streak = user.updateStreak();

  assert.equal(streak, 4);
  assert.equal(user.currentStreak, 4);
  assert.equal(user.longestStreak, 6);
});

test('updateStreak starts streak at one on first meaningful activity', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const user = createUser({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: yesterday,
  });

  const streak = user.updateStreak();

  assert.equal(streak, 1);
  assert.equal(user.currentStreak, 1);
  assert.equal(user.longestStreak, 1);
});
