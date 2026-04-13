const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User');

async function run() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  const beforeCounts = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ]);

  const result = await User.updateMany(
    { role: { $ne: 'student' } },
    { $set: { role: 'student' } }
  );

  const afterCounts = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ]);

  console.log('Single-role migration complete');
  console.log('Before:', beforeCounts);
  console.log('Modified:', result.modifiedCount);
  console.log('After:', afterCounts);
}

run()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
