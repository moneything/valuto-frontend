/**
 * Valuto Backend API Server
 * Production-ready Express + MongoDB + Socket.IO backend with Clerk authentication
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDatabase } = require('./config/database');
const { errorHandler, notFound } = require('./utils/errorHandler');
const { initializeSocketIO } = require('./config/socket');
const { registerTriviaSocketHandlers } = require('./sockets/triviaSocketHandlers');

// Initialize Express app
const app = express();

// Create HTTP server
const httpServer = http.createServer(app);

// ==================== MIDDLEWARE ====================

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', // Allow alternate port
  'https://valuto-frontend-test.vercel.app', // Test frontend
  'https://www.valuto.co.uk', // Live production frontend
  'https://valuto.co.uk', // Live production frontend (without www)
];

// Add FRONTEND_URL from environment if set
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ==================== ROUTES ====================

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Valuto Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    database: 'connected',
    timestamp: new Date().toISOString(),
  });
});

// Import and mount route modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const learningRoutes = require('./routes/learningRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const triviaRoutes = require('./routes/triviaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/trivia', triviaRoutes);

// ==================== ERROR HANDLING ====================

// 404 handler - must be after all other routes
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

// ==================== SERVER STARTUP ====================

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Initialize Socket.IO
    const io = initializeSocketIO(httpServer);

    // Register trivia socket handlers
    registerTriviaSocketHandlers(io);

    // Start HTTP server (with Socket.IO attached)
    const server = httpServer.listen(PORT, () => {
      console.log('');
      console.log('='.repeat(60));
      console.log(`🚀 Valuto Backend Server Running`);
      console.log('='.repeat(60));
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🎮 WebSocket: enabled (Socket.IO)`);
      console.log('='.repeat(60));
      console.log('');
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal) => {
      console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);

      // Close server first
      server.close(async () => {
        console.log('🛑 HTTP server closed');

        // Close database connection
        const mongoose = require('mongoose');
        try {
          await mongoose.connection.close();
          console.log('🛑 Database connection closed');
          console.log('✅ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('⏱️ Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('Unhandled Rejection');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      gracefulShutdown('Uncaught Exception');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Export app for testing
module.exports = app;
