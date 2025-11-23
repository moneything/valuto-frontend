// backend/src/seeds/learning/propertyPurchasesSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Property & Big Purchases — Learning Modules
 * Category ID: property-purchases
 *
 * Includes:
 * 1. Renting vs Buying
 * 2. Understanding Mortgages
 * 3. Saving for a Deposit
 * 4. Hidden Costs of Property
 * 5. How House Prices Work
 */

const propertyPurchasesModules = [
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedPropertyPurchases() {
  try {
    for (const module of propertyPurchasesModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });

      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }

    console.log("🏡 Property & Big Purchases modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Property & Big Purchases:", error);
  }
}

module.exports = {
  propertyPurchasesModules,
  seedPropertyPurchases,
};
