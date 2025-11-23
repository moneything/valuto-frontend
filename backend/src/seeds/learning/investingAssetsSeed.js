// backend/src/seeds/learning/investingAssetsSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Investing & Assets — Learning Modules
 * Category ID: investing-assets
 *
 * Includes:
 * 1. Introduction to Investing
 * 2. Stocks & Shares Basics
 * 3. Bonds & Low-Risk Assets
 * 4. Diversification & Risk
 * 5. Compound Interest Explained
 */

const investingAssetsModules = [
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedInvestingAssets() {
  try {
    for (const module of investingAssetsModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Investing & Assets modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Investing & Assets:", error);
  }
}

module.exports = {
  investingAssetsModules,
  seedInvestingAssets,
};
