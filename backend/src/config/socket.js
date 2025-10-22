const { Server } = require('socket.io');
const socketAuthMiddleware = require('../middleware/socketAuth');

/**
 * Socket.IO Server Configuration
 * Sets up WebSocket server with CORS and authentication
 */
const initializeSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'http://localhost:3000',
        'http://localhost:3001', // Allow alternate port
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // Connection settings
    pingTimeout: 60000,
    pingInterval: 25000,
    // Upgrade settings
    transports: ['websocket', 'polling'],
  });

  // Apply authentication middleware to all connections
  io.use(socketAuthMiddleware);

  // Connection event
  io.on('connection', (socket) => {
    console.log(`✅ Socket connected: ${socket.id} (User: ${socket.user.fullName})`);

    // Disconnect event
    socket.on('disconnect', (reason) => {
      console.log(`❌ Socket disconnected: ${socket.id} (Reason: ${reason})`);
    });

    // Error event
    socket.on('error', (error) => {
      console.error(`⚠️ Socket error (${socket.id}):`, error);
    });
  });

  return io;
};

module.exports = { initializeSocketIO };
