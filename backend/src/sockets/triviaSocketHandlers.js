const TriviaGameController = require('../controllers/triviaGameController');

/**
 * Trivia Socket Event Handlers
 * Registers all socket.io events for the trivia game
 */
const registerTriviaSocketHandlers = (io) => {
  // Initialize game controller
  const gameController = new TriviaGameController(io);

  io.on('connection', (socket) => {
    console.log(`🎮 Trivia socket connected: ${socket.user.fullName}`);

    /**
     * Create Session Event
     * Host creates a new trivia session
     */
    socket.on('create_session', async (data, callback) => {
      try {
        const result = await gameController.createSession(socket.id, socket.user, data);

        // Automatically join the host to their session
        socket.join(result.sessionId);

        callback({ success: true, data: result });
      } catch (error) {
        console.error('create_session error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to create session',
        });
      }
    });

    /**
     * Host Session Event
     * Host joins their created session
     */
    socket.on('host_session', async (data, callback) => {
      try {
        const result = await gameController.hostSession(socket, data.sessionId);

        callback({ success: true, data: result });
      } catch (error) {
        console.error('host_session error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to host session',
        });
      }
    });

    /**
     * Join Session Event
     * Player joins a session using join code
     */
    socket.on('join_session', async (data, callback) => {
      try {
        const result = await gameController.joinSession(socket, data.joinCode);

        // Send waiting lobby info
        socket.emit('waiting_lobby', result);

        callback({ success: true, data: result });
      } catch (error) {
        console.error('join_session error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to join session',
        });
      }
    });

    /**
     * Start Game Event
     * Host starts the game
     */
    socket.on('start_game', async (data, callback) => {
      try {
        await gameController.startGame(socket, data.sessionId);

        callback({ success: true });
      } catch (error) {
        console.error('start_game error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to start game',
        });
      }
    });

    /**
     * Submit Answer Event
     * Player submits an answer to a question
     */
    socket.on('submit_answer', async (data, callback) => {
      try {
        await gameController.submitAnswer(socket, data);

        callback({ success: true });
      } catch (error) {
        console.error('submit_answer error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to submit answer',
        });

        // Send error to socket
        socket.emit('answer_error', {
          message: error.message || 'Failed to submit answer',
        });
      }
    });

    /**
     * Next Question Event
     * Host manually advances to next question
     */
    socket.on('next_question', async (data, callback) => {
      try {
        await gameController.nextQuestion(socket, data.sessionId);

        callback({ success: true });
      } catch (error) {
        console.error('next_question error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to advance question',
        });
      }
    });

    /**
     * End Game Event
     * Host manually ends the game
     */
    socket.on('end_game', async (data, callback) => {
      try {
        await gameController.endGame(data.sessionId);

        callback({ success: true });
      } catch (error) {
        console.error('end_game error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to end game',
        });
      }
    });

    /**
     * Request Leaderboard Event
     * Get current leaderboard
     */
    socket.on('get_leaderboard', async (data, callback) => {
      try {
        const Session = require('../models/Session');
        const session = await Session.findOne({ sessionId: data.sessionId });

        if (!session) {
          return callback({
            success: false,
            error: 'Session not found',
          });
        }

        const leaderboard = session.getLeaderboard();

        callback({
          success: true,
          data: { leaderboard },
        });
      } catch (error) {
        console.error('get_leaderboard error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to get leaderboard',
        });
      }
    });

    /**
     * Disconnect Event
     * Handle player/host disconnection
     */
    socket.on('disconnect', async (reason) => {
      console.log(`❌ Trivia socket disconnected: ${socket.user.fullName} (${reason})`);

      await gameController.handleDisconnect(socket);
    });

    /**
     * Reconnect Event
     * Handle player reconnection
     */
    socket.on('reconnect_session', async (data, callback) => {
      try {
        const Session = require('../models/Session');
        const session = await Session.findOne({ sessionId: data.sessionId });

        if (!session) {
          return callback({
            success: false,
            error: 'Session not found',
          });
        }

        // Find player
        const player = session.players.find((p) => p.userId === socket.user.id);

        if (!player) {
          return callback({
            success: false,
            error: 'Player not in this session',
          });
        }

        // Update socket ID and reconnect status
        player.socketId = socket.id;
        player.isConnected = true;
        await session.save();

        // Rejoin room
        socket.join(session.sessionId);

        // Send current game state
        const currentState = {
          status: session.status,
          currentQuestionIndex: session.currentQuestionIndex,
          playerScore: player.score,
          leaderboard: session.getLeaderboard(),
        };

        callback({
          success: true,
          data: currentState,
        });

        console.log(`🔄 Player reconnected: ${socket.user.fullName}`);
      } catch (error) {
        console.error('reconnect_session error:', error);
        callback({
          success: false,
          error: error.message || 'Failed to reconnect',
        });
      }
    });
  });

  return gameController;
};

module.exports = { registerTriviaSocketHandlers };
