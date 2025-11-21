const mongoose = require('mongoose');

/**
 * Establish a connection to MongoDB (Production Ready)
 */
async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('❌ MONGO_URI or MONGODB_URI is not defined in environment variables');
  }

  const options = {
    maxPoolSize: 10,   // tune for your workload
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    w: 'majority',
  };

  try {
    const connection = await mongoose.connect(mongoUri, options);

    console.log(`✅ MongoDB Connected`);
    console.log(`   📡 Host: ${connection.connection.host}`);
    console.log(`   📊 Database: ${connection.connection.name}`);

    return connection;
  } catch (err) {
    console.error('❌ MongoDB initial connection failure:');
    console.error(err);
    throw err; // <-- Let the caller decide whether to exit
  }
}

/**
 * Graceful shutdown handler
 */
async function disconnectDatabase() {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed gracefully');
}

/**
 * Attach signal listeners (SIGINT, SIGTERM, SIGQUIT)
 * Best practice for Docker/Kubernetes/Cloud deployments
 */
function setupGracefulShutdown() {
  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  signals.forEach((signal) => {
    process.on(signal, async () => {
      console.log(`⚠️  Received ${signal}. Closing MongoDB connection...`);
      await disconnectDatabase();
      process.exit(0);
    });
  });
}

/**
 * Check connection state
 */
function isDatabaseConnected() {
  return mongoose.connection.readyState === 1; // 1 = connected
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  isDatabaseConnected,
  setupGracefulShutdown,
};
