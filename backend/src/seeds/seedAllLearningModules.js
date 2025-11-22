// backend/src/seeds/seedAllLearningModules.js

const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../../.env" });

// === Individual Category Seeders ===
const { seedCoreMoneySkills } = require("./learning/coreMoneySkillsSeed");
const { seedEarningIncome } = require("./learning/earningIncomeSeed");
const { seedBorrowingDebt } = require("./learning/borrowingDebtSeed");
const { seedEntrepreneurship } = require("./learning/entrepreneurshipSeed");
const { seedFuturePlanning } = require("./learning/futurePlanningSeed");
const { seedInvestingAssets } = require("./learning/investingAssetsSeed");
const { seedMoneySociety } = require("./learning/moneySocietySeed");
const { seedPropertyPurchases } = require("./learning/propertyPurchasesSeed");
const { seedSpendingWisely } = require("./learning/spendingWiselySeed");

async function seedAllLearningModules() {
  console.log("🔄 Starting: Learning Modules Seeding...\n");

  try {
    // 1. Connect to MongoDB
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
    });
    console.log("✅ Connected to database!\n");

    // 2. Run all category seeds in order
    await seedCoreMoneySkills();
    await seedEarningIncome();
    await seedBorrowingDebt();
    await seedEntrepreneurship();
    await seedFuturePlanning();
    await seedInvestingAssets();
    await seedMoneySociety();
    await seedPropertyPurchases();
    await seedSpendingWisely();

    console.log("\n🎉 ALL Learning Modules have been seeded successfully!");

  } catch (error) {
    console.error("❌ ERROR seeding learning modules:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
  }
}

// Run if executed directly
if (require.main === module) {
  seedAllLearningModules();
}

module.exports = { seedAllLearningModules };

