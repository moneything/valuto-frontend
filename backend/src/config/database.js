const mongoose = require('mongoose');

/**
 * MongoDB Connection Configuration
 * Establishes connection to MongoDB database with proper error handling
 */
const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI or MONGODB_URI environment variable is not defined');
    }

    // Connection options
    const options = {
      // Use new URL parser
      useNewUrlParser: true,
      useUnifiedTopology: true,

      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 2,

      // Timeout settings
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,

      // Retry settings
      retryWrites: true,
      w: 'majority',
    };

    // Connect to MongoDB
    const connection = await mongoose.connect(mongoUri, options);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    console.log(`📊 Database: ${connection.connection.name}`);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Mongoose disconnected from MongoDB');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 Mongoose connection closed due to app termination');
      process.exit(0);
    });

    return connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Stack:', error.stack);

    // Exit process with failure
    process.exit(1);
  }
};

/**
 * Check if database is connected
 */
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Close database connection
 */
const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 Database connection closed successfully');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

module.exports = {
  connectDatabase,
  isDatabaseConnected,
  closeDatabaseConnection,
};
