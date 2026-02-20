const test = require('node:test');
const assert = require('node:assert/strict');

const Session = require('../../src/models/Session');

const createSession = () =>
  new Session({
    sessionId: 'session-1',
    joinCode: 'ABC123',
    title: 'Money Quiz',
    hostId: 'host-1',
    hostName: 'Teacher One',
    questions: [
      {
        id: 'q1',
        question: 'What is a budget?',
        options: ['Plan', 'Loan', 'Tax', 'Fee'],
        correctIndex: 0,
        timeLimit: 30,
        points: 100,
      },
    ],
    settings: {
      pointsPerCorrect: 100,
      speedBonusEnabled: true,
      maxSpeedBonus: 50,
    },
    players: [],
  });

test('addPlayer adds and reconnects existing players without duplicates', () => {
  const session = createSession();

  session.addPlayer({ userId: 'u1', name: 'Alice', socketId: 'socket-1' });
  session.addPlayer({ userId: 'u1', name: 'Alice', socketId: 'socket-2' });

  assert.equal(session.players.length, 1);
  assert.equal(session.players[0].socketId, 'socket-2');
  assert.equal(session.players[0].isConnected, true);
});

test('startGame sets active state and initializes first question pointer', () => {
  const session = createSession();

  session.startGame();

  assert.equal(session.status, 'active');
  assert.equal(session.currentQuestionIndex, 0);
  assert.ok(session.startedAt instanceof Date);
  assert.ok(session.questionStartTime instanceof Date);
});

test('startGame throws when there are no questions', () => {
  const session = createSession();
  session.questions = [];

  assert.throws(() => session.startGame(), /No questions in session/);
});

test('submitAnswer awards points + speed bonus and blocks duplicate answers', () => {
  const session = createSession();
  session.addPlayer({ userId: 'u1', name: 'Alice', socketId: 'socket-1' });

  const result = session.submitAnswer('u1', 'q1', {
    selectedIndex: 0,
    timeSpentMs: 5000,
  });

  assert.equal(result.isCorrect, true);
  assert.ok(result.pointsEarned > 100);
  assert.equal(session.players[0].answeredQuestions, 1);
  assert.equal(session.players[0].correctAnswers, 1);
  assert.equal(session.players[0].score, result.pointsEarned);

  assert.throws(
    () =>
      session.submitAnswer('u1', 'q1', {
        selectedIndex: 0,
        timeSpentMs: 2000,
      }),
    /Question already answered/
  );
});

test('getLeaderboard sorts by score and includes rank/accuracy', () => {
  const session = createSession();

  session.players.push(
    {
      userId: 'u1',
      name: 'Alice',
      score: 140,
      answeredQuestions: 2,
      correctAnswers: 2,
      isConnected: true,
      answers: [],
    },
    {
      userId: 'u2',
      name: 'Bob',
      score: 100,
      answeredQuestions: 2,
      correctAnswers: 1,
      isConnected: true,
      answers: [],
    }
  );

  const leaderboard = session.getLeaderboard();

  assert.equal(leaderboard.length, 2);
  assert.equal(leaderboard[0].name, 'Alice');
  assert.equal(leaderboard[0].rank, 1);
  assert.equal(leaderboard[0].accuracy, 100);
  assert.equal(leaderboard[1].name, 'Bob');
  assert.equal(leaderboard[1].rank, 2);
  assert.equal(leaderboard[1].accuracy, 50);
});
