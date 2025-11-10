const TriviaGameController = require('../controllers/triviaGameController');

/**
 * Trivia Socket Event Handlers
 * Registers all socket.io events for the trivia game
 */
const registerTriviaSocketHandlers = (io) => {
  const gameController = new TriviaGameController(io);

  io.on('connection', (socket) => {
    console.log(`🎮 Trivia socket connected: ${socket.user.fullName}`);

    // 🟢 Create session
    socket.on('create_session', async (data, callback) => {
      try {
        const result = await gameController.createSession(socket.id, socket.user, data);
        socket.join(result.sessionId);
        if (typeof callback === "function") callback({ success: true, data: result });
      } catch (error) {
        console.error('create_session error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to create session' });
      }
    });

    // 🟢 Host session
    socket.on('host_session', async (data, callback) => {
      try {
        const result = await gameController.hostSession(socket, data.sessionId);
        if (typeof callback === "function") callback({ success: true, data: result });
      } catch (error) {
        console.error('host_session error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to host session' });
      }
    });

    // 🟢 Join session
    socket.on('join_session', async (data, callback) => {
      try {
        const result = await gameController.joinSession(socket, data.joinCode);
        socket.emit('waiting_lobby', result);
        if (typeof callback === "function") callback({ success: true, data: result });
      } catch (error) {
        console.error('join_session error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to join session' });
      }
    });

    // 🟢 Start game
    socket.on('start_game', async (data, callback) => {
      try {
        await gameController.startGame(socket, data.sessionId);
        if (typeof callback === "function") callback({ success: true });
      } catch (error) {
        console.error('start_game error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to start game' });
      }
    });

    // 🟢 Submit answer
    socket.on('submit_answer', async (data, callback) => {
      try {
        await gameController.submitAnswer(socket, data);
        if (typeof callback === "function") callback({ success: true });
      } catch (error) {
        console.error('submit_answer error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to submit answer' });
        socket.emit('answer_error', {
          message: error.message || 'Failed to submit answer',
        });
      }
    });

    // 🟢 Next question
    socket.on('next_question', async (data, callback) => {
      try {
        await gameController.nextQuestion(socket, data.sessionId);
        if (typeof callback === "function") callback({ success: true });
      } catch (error) {
        console.error('next_question error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to advance question' });
      }
    });

    // 🟢 End game
    socket.on('end_game', async (data, callback) => {
      try {
        await gameController.endGame(data.sessionId);
        if (typeof callback === "function") callback({ success: true });
      } catch (error) {
        console.error('end_game error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to end game' });
      }
    });

    // 🟢 Get leaderboard
    socket.on('get_leaderboard', async (data, callback) => {
      try {
        const Session = require('../models/Session');
        const session = await Session.findOne({ sessionId: data.sessionId });
        if (!session) {
          if (typeof callback === "function") callback({ success: false, error: 'Session not found' });
          return;
        }
        const leaderboard = session.getLeaderboard();
        if (typeof callback === "function") callback({ success: true, data: { leaderboard } });
      } catch (error) {
        console.error('get_leaderboard error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to get leaderboard' });
      }
    });

    // 🟢 Reconnect session
    socket.on('reconnect_session', async (data, callback) => {
      try {
        const Session = require('../models/Session');
        const session = await Session.findOne({ sessionId: data.sessionId });
        if (!session) {
          if (typeof callback === "function") callback({ success: false, error: 'Session not found' });
          return;
        }
        const player = session.players.find((p) => p.userId === socket.user.id);
        if (!player) {
          if (typeof callback === "function") callback({ success: false, error: 'Player not in this session' });
          return;
        }

        player.socketId = socket.id;
        player.isConnected = true;
        await session.save();

        socket.join(session.sessionId);

        const currentState = {
          status: session.status,
          currentQuestionIndex: session.currentQuestionIndex,
          playerScore: player.score,
          leaderboard: session.getLeaderboard(),
        };

        if (typeof callback === "function") callback({ success: true, data: currentState });
        console.log(`🔄 Player reconnected: ${socket.user.fullName}`);
      } catch (error) {
        console.error('reconnect_session error:', error);
        if (typeof callback === "function")
          callback({ success: false, error: error.message || 'Failed to reconnect' });
      }
    });

    // 🟢 Disconnect
    socket.on('disconnect', async (reason) => {
      console.log(`❌ Trivia socket disconnected: ${socket.user.fullName} (${reason})`);
      await gameController.handleDisconnect(socket);
    });
  });

  return gameController;
};

module.exports = { registerTriviaSocketHandlers };
