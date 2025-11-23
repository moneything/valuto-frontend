// backend/src/seeds/learning/borrowingDebtSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Borrowing & Debt — Learning Modules
 * Category ID: borrowing-debt
 *
 * Includes:
 * 1. Understanding Credit Scores
 * 2. Loans & APR Explained
 * 3. Credit Cards: How They Work
 * 4. Debt Repayment Strategies
 */

const borrowingDebtModules = [
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedBorrowingDebt() {
  try {
    for (const module of borrowingDebtModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Borrowing & Debt modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Borrowing & Debt:", error);
  }
}

module.exports = {
  borrowingDebtModules,
  seedBorrowingDebt,
};
