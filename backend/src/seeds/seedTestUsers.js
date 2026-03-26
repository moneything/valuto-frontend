const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../../.env' });
const User = require('../models/User');

const testUsers = [
  { clerkUserId: 'test_student_001', name: 'MoneyMaster', email: 'moneymaster@test.valuto.dev', totalPoints: 12840, gamesPlayed: 64, lessonsCompleted: 18, currentStreak: 14, longestStreak: 21, school: 'Valuto Academy', grade: 'Year 11' },
  { clerkUserId: 'test_student_002', name: 'FinanceQueen', email: 'financequeen@test.valuto.dev', totalPoints: 11200, gamesPlayed: 58, lessonsCompleted: 16, currentStreak: 9, longestStreak: 16, school: 'Valuto Academy', grade: 'Year 12' },
  { clerkUserId: 'test_student_003', name: 'InvestorX', email: 'investorx@test.valuto.dev', totalPoints: 10950, gamesPlayed: 52, lessonsCompleted: 15, currentStreak: 7, longestStreak: 11, school: 'Valuto Academy', grade: 'Year 12' },
  { clerkUserId: 'test_student_004', name: 'BudgetBoss', email: 'budgetboss@test.valuto.dev', totalPoints: 9800, gamesPlayed: 49, lessonsCompleted: 14, currentStreak: 5, longestStreak: 10, school: 'Valuto Academy', grade: 'Year 11' },
  { clerkUserId: 'test_student_005', name: 'CryptoKid', email: 'cryptokid@test.valuto.dev', totalPoints: 8750, gamesPlayed: 43, lessonsCompleted: 13, currentStreak: 4, longestStreak: 9, school: 'Valuto Academy', grade: 'Year 10' },
  { clerkUserId: 'test_student_006', name: 'SavvySaver', email: 'savvysaver@test.valuto.dev', totalPoints: 7600, gamesPlayed: 41, lessonsCompleted: 12, currentStreak: 3, longestStreak: 8, school: 'Valuto Academy', grade: 'Year 10' },
  { clerkUserId: 'test_student_007', name: 'WealthBuilder', email: 'wealthbuilder@test.valuto.dev', totalPoints: 6900, gamesPlayed: 36, lessonsCompleted: 10, currentStreak: 2, longestStreak: 7, school: 'Valuto Academy', grade: 'Year 9' },
  { clerkUserId: 'test_student_008', name: 'TaxHero', email: 'taxhero@test.valuto.dev', totalPoints: 5400, gamesPlayed: 29, lessonsCompleted: 9, currentStreak: 1, longestStreak: 5, school: 'Valuto Academy', grade: 'Year 9' },
  { clerkUserId: 'test_student_009', name: 'PennyPilot', email: 'pennypilot@test.valuto.dev', totalPoints: 4980, gamesPlayed: 27, lessonsCompleted: 8, currentStreak: 2, longestStreak: 4, school: 'Valuto Academy', grade: 'Year 8' },
  { clerkUserId: 'test_student_010', name: 'CashCompass', email: 'cashcompass@test.valuto.dev', totalPoints: 4520, gamesPlayed: 25, lessonsCompleted: 8, currentStreak: 0, longestStreak: 6, school: 'Valuto Academy', grade: 'Year 8' },
  { clerkUserId: 'test_student_011', name: 'FutureFund', email: 'futurefund@test.valuto.dev', totalPoints: 4110, gamesPlayed: 22, lessonsCompleted: 7, currentStreak: 1, longestStreak: 3, school: 'Valuto Academy', grade: 'Year 13' },
  { clerkUserId: 'test_student_012', name: 'CreditClimber', email: 'creditclimber@test.valuto.dev', totalPoints: 3890, gamesPlayed: 20, lessonsCompleted: 7, currentStreak: 0, longestStreak: 4, school: 'Valuto Academy', grade: 'Year 12' },
  { clerkUserId: 'test_student_013', name: 'AssetAce', email: 'assetace@test.valuto.dev', totalPoints: 3410, gamesPlayed: 18, lessonsCompleted: 6, currentStreak: 1, longestStreak: 2, school: 'Valuto Academy', grade: 'Year 11' },
  { clerkUserId: 'test_student_014', name: 'DebtDefender', email: 'debtdefender@test.valuto.dev', totalPoints: 2980, gamesPlayed: 17, lessonsCompleted: 5, currentStreak: 0, longestStreak: 2, school: 'Valuto Academy', grade: 'Year 10' },
  { clerkUserId: 'test_student_015', name: 'SavingsSpark', email: 'savingsspark@test.valuto.dev', totalPoints: 2540, gamesPlayed: 15, lessonsCompleted: 5, currentStreak: 1, longestStreak: 3, school: 'Valuto Academy', grade: 'Year 9' },
];

async function seedTestUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log('Connected.');

    for (const user of testUsers) {
      await User.updateOne(
        { email: user.email },
        {
          $set: {
            ...user,
            role: 'student',
            completedOnboarding: true,
            isActive: true,
            age: 16,
            subject: 'Financial Literacy',
            lastActiveDate: new Date(),
          },
        },
        { upsert: true }
      );
      console.log(`Upserted ${user.name}`);
    }

    console.log(`Seeded ${testUsers.length} test students.`);
  } catch (error) {
    console.error('Failed to seed test users:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

if (require.main === module) {
  seedTestUsers();
}

module.exports = { seedTestUsers, testUsers };
