const Session = require('../models/Session');
const SessionResult = require('../models/SessionResult');
const User = require('../models/User');
const { AppError } = require('../utils/errorHandler');

/**
 * Trivia Game Controller
 * Handles all game logic and state management
 */
class TriviaGameController {
  constructor(io) {
    this.io = io;
    // Store active sessions in memory for quick access
    this.activeSessions = new Map(); // sessionId -> { hostSocketId, playerSockets: Set() }
  }

  /**
   * Create a new game session
   */
  async createSession(hostSocketId, hostUser, sessionData) {
    try {
      // Generate unique join code
      const joinCode = await Session.generateJoinCode();

      // Generate session ID
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create session in database
      const session = await Session.create({
        sessionId,
        joinCode,
        title: sessionData.title,
        hostId: hostUser.id,
        hostName: hostUser.fullName,
        hostSocketId,
        status: 'waiting',
        questions: sessionData.questions.map((q, index) => ({
          id: `q${index + 1}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctAnswer,
          timeLimit: q.timeLimit,
          points: 100,
          explanation: q.explanation,
        })),
        players: [],
        settings: sessionData.settings || {},
      });

      // Store in memory
      this.activeSessions.set(sessionId, {
        hostSocketId,
        playerSockets: new Set(),
      });

      console.log(`🎮 Session created: ${joinCode} (${sessionId})`);

      return {
        sessionId: session.sessionId,
        joinCode: session.joinCode,
        title: session.title,
        questionCount: session.questions.length,
      };
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  /**
   * Host joins their own session
   */
  async hostSession(socket, sessionId) {
    try {
      const session = await Session.findOne({ sessionId });

      if (!session) {
        throw new AppError('Session not found', 404);
      }

      // Verify user is the host
      if (session.hostId !== socket.user.id) {
        throw new AppError('Only the session host can access this', 403);
      }

      // Update host socket ID
      session.hostSocketId = socket.id;
      await session.save();

      // Update memory
      if (!this.activeSessions.has(sessionId)) {
        this.activeSessions.set(sessionId, {
          hostSocketId: socket.id,
          playerSockets: new Set(),
        });
      } else {
        this.activeSessions.get(sessionId).hostSocketId = socket.id;
      }

      // Join socket room
      socket.join(sessionId);

      console.log(`👨‍🏫 Host joined session: ${session.joinCode}`);

      return {
        session: {
          sessionId: session.sessionId,
          joinCode: session.joinCode,
          title: session.title,
          status: session.status,
          players: session.players.map((p) => ({
            userId: p.userId,
            name: p.name,
            isConnected: p.isConnected,
          })),
          questionCount: session.questions.length,
        },
      };
    } catch (error) {
      console.error('Error hosting session:', error);
      throw error;
    }
  }

  /**
   * Player joins a session
   */
  async joinSession(socket, joinCode) {
    try {
      // Find session by join code
      const session = await Session.findOne({
        joinCode: joinCode.toUpperCase(),
        status: { $in: ['waiting', 'active'] },
      });

      if (!session) {
        throw new AppError('Session not found or has ended', 404);
      }

      // Get user profile
      const user = await User.findOne({ clerkUserId: socket.user.id });

      if (!user) {
        throw new AppError('User profile not found', 404);
      }

      // Add player to session
      session.addPlayer({
        userId: socket.user.id,
        name: user.name,
        socketId: socket.id,
      });

      await session.save();

      // Update memory
      if (!this.activeSessions.has(session.sessionId)) {
        this.activeSessions.set(session.sessionId, {
          hostSocketId: session.hostSocketId,
          playerSockets: new Set(),
        });
      }
      this.activeSessions.get(session.sessionId).playerSockets.add(socket.id);

      // Join socket room
      socket.join(session.sessionId);

      console.log(`🎮 Player joined: ${user.name} → ${joinCode}`);

      // Notify host of new player
      if (session.hostSocketId) {
        this.io.to(session.hostSocketId).emit('player_joined', {
          userId: socket.user.id,
          name: user.name,
          playerCount: session.players.length,
        });
      }

      // Send waiting lobby info to player
      return {
        sessionId: session.sessionId,
        title: session.title,
        status: session.status,
        hostName: session.hostName,
        playerCount: session.players.length,
        questionCount: session.questions.length,
      };
    } catch (error) {
      console.error('Error joining session:', error);
      throw error;
    }
  }

  /**
   * Start the game
   */
  async startGame(socket, sessionId) {
    try {
      const session = await Session.findOne({ sessionId });

      if (!session) {
        throw new AppError('Session not found', 404);
      }

      // Verify user is the host
      if (session.hostId !== socket.user.id) {
        throw new AppError('Only the host can start the game', 403);
      }

      if (session.status !== 'waiting') {
        throw new AppError('Game already started or ended', 400);
      }

      if (session.players.length === 0) {
        throw new AppError('No players in session', 400);
      }

      // Start the game
      session.startGame();
      await session.save();

      console.log(`🚀 Game started: ${session.joinCode}`);

      // Broadcast game started to all players
      this.io.to(sessionId).emit('game_started', {
        message: 'Game is starting!',
        questionCount: session.questions.length,
      });

      // Send first question after 2 seconds
      setTimeout(() => {
        this.sendQuestion(sessionId);
      }, 2000);

      return { success: true };
    } catch (error) {
      console.error('Error starting game:', error);
      throw error;
    }
  }

  /**
   * Send current question to all players
   */
  async sendQuestion(sessionId) {
    try {
      const session = await Session.findOne({ sessionId });

      if (!session || session.status !== 'active') {
        return;
      }

      const question = session.questions[session.currentQuestionIndex];

      if (!question) {
        // No more questions, end game
        await this.endGame(sessionId);
        return;
      }

      console.log(
        `📝 Sending question ${session.currentQuestionIndex + 1}/${session.questions.length}`
      );

      // Broadcast question (without correct answer)
      this.io.to(sessionId).emit('new_question', {
        questionIndex: session.currentQuestionIndex,
        questionNumber: session.currentQuestionIndex + 1,
        totalQuestions: session.questions.length,
        question: {
          id: question.id,
          question: question.question,
          options: question.options,
          timeLimit: question.timeLimit,
          points: question.points,
        },
      });

      // Auto-advance after time limit (with 5 second buffer)
      const timeLimit = (question.timeLimit + 5) * 1000;
      setTimeout(async () => {
        const updatedSession = await Session.findOne({ sessionId });
        // Only advance if still on same question
        if (
          updatedSession &&
          updatedSession.currentQuestionIndex === session.currentQuestionIndex
        ) {
          await this.nextQuestion(null, sessionId);
        }
      }, timeLimit);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  }

  /**
   * Submit an answer
   */
  async submitAnswer(socket, answerData) {
    try {
      const { sessionId, questionId, selectedIndex, timeSpentMs } = answerData;

      const session = await Session.findOne({ sessionId });

      if (!session) {
        throw new AppError('Session not found', 404);
      }

      if (session.status !== 'active') {
        throw new AppError('Game not active', 400);
      }

      // Validate time spent
      const question = session.questions.find((q) => q.id === questionId);
      if (!question) {
        throw new AppError('Question not found', 404);
      }

      const maxTime = question.timeLimit * 1000;
      if (timeSpentMs > maxTime + 1000) {
        // Allow 1 second buffer for network latency
        throw new AppError('Answer submitted too late', 400);
      }

      // Submit answer
      const result = session.submitAnswer(socket.user.id, questionId, {
        selectedIndex,
        timeSpentMs,
      });

      await session.save();

      console.log(
        `📊 Answer submitted: ${socket.user.fullName} - ${result.isCorrect ? '✅' : '❌'} (+${result.pointsEarned}pts)`
      );

      // Send result back to player
      socket.emit('answer_result', {
        isCorrect: result.isCorrect,
        correctIndex: result.correctIndex,
        pointsEarned: result.pointsEarned,
        explanation: result.explanation,
      });

      // Get and broadcast updated leaderboard
      const leaderboard = session.getLeaderboard();
      this.io.to(sessionId).emit('leaderboard_update', {
        leaderboard,
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw error;
    }
  }

  /**
   * Advance to next question
   */
  async nextQuestion(socket, sessionId) {
    try {
      const session = await Session.findOne({ sessionId });

      if (!session) {
        throw new AppError('Session not found', 404);
      }

      // If socket provided, verify it's the host
      if (socket && session.hostId !== socket.user.id) {
        throw new AppError('Only the host can advance questions', 403);
      }

      // Try to advance to next question
      const nextQ = session.nextQuestion();
      await session.save();

      if (nextQ === null) {
        // Game over
        await this.endGame(sessionId);
      } else {
        // Send next question after 3 seconds
        setTimeout(() => {
          this.sendQuestion(sessionId);
        }, 3000);
      }

      return { success: true };
    } catch (error) {
      console.error('Error advancing question:', error);
      throw error;
    }
  }

  /**
   * End the game
   */
  async endGame(sessionId) {
    try {
      const session = await Session.findOne({ sessionId });

      if (!session) {
        return;
      }

      // End the game
      session.endGame();
      await session.save();

      console.log(`🏁 Game ended: ${session.joinCode}`);

      // Get final leaderboard
      const leaderboard = session.getLeaderboard();

      // Save results to database
      await SessionResult.createFromSession(session);

      // Update user stats for all players
      for (const player of session.players) {
        if (player.answeredQuestions > 0) {
          const user = await User.findOne({ clerkUserId: player.userId });
          if (user) {
            user.totalPoints += player.score;
            user.gamesPlayed += 1;
            user.updateStreak();
            await user.save();
          }
        }
      }

      // Broadcast game over
      this.io.to(sessionId).emit('game_over', {
        leaderboard,
        sessionId: session.sessionId,
        title: session.title,
      });

      // Clean up memory
      this.activeSessions.delete(sessionId);
    } catch (error) {
      console.error('Error ending game:', error);
    }
  }

  /**
   * Handle player disconnect
   */
  async handleDisconnect(socket) {
    try {
      // Find which session this socket belongs to
      for (const [sessionId, sessionData] of this.activeSessions.entries()) {
        if (sessionData.playerSockets.has(socket.id) || sessionData.hostSocketId === socket.id) {
          const session = await Session.findOne({ sessionId });

          if (session) {
            if (sessionData.hostSocketId === socket.id) {
              // Host disconnected
              console.log(`👨‍🏫 Host disconnected from ${session.joinCode}`);
              // Optionally end game or notify players
            } else {
              // Player disconnected
              session.removePlayer(socket.user.id);
              await session.save();

              sessionData.playerSockets.delete(socket.id);

              console.log(`👋 Player left: ${socket.user.fullName} from ${session.joinCode}`);

              // Notify host
              if (session.hostSocketId) {
                this.io.to(session.hostSocketId).emit('player_left', {
                  userId: socket.user.id,
                  name: socket.user.fullName,
                  playerCount: session.players.filter((p) => p.isConnected).length,
                });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  }
}

module.exports = TriviaGameController;
