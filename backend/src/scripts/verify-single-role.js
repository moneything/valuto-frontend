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

  const roleCounts = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const nonStudentUsers = await User.countDocuments({ role: { $ne: 'student' } });
  const usersWithoutSchool = await User.countDocuments({
    $or: [{ school: { $exists: false } }, { school: null }, { school: '' }],
  });
  const schoolBuckets = await User.aggregate([
    {
      $group: {
        _id: '$school',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  console.log('Single-role verification report');
  console.log('Role counts:', roleCounts);
  console.log('Non-student users:', nonStudentUsers);
  console.log('Users without school:', usersWithoutSchool);
  console.log('Top school buckets:', schoolBuckets);

  if (nonStudentUsers > 0) {
    throw new Error(`Verification failed: ${nonStudentUsers} users still have a non-student role`);
  }

  console.log('Verification passed: all users are student');
}

if (require.main === module) {
  run()
    .catch((error) => {
      console.error('Single-role verification failed:', error);
      process.exitCode = 1;
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
}

module.exports = { run };
