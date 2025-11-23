// backend/src/seeds/learning/moneySocietySeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Money & Society — Learning Modules
 * Category ID: money-society
 *
 * Includes:
 * 1. How Money Works in Society
 * 2. Government & Taxes
 * 3. The Economy Explained
 * 4. Inequality & Financial Systems
 * 5. Ethical & Sustainable Finance
 */

const moneySocietyModules = [
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedMoneySociety() {
  try {
    for (const module of moneySocietyModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Money & Society modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Money & Society:", error);
  }
}

module.exports = {
  moneySocietyModules,
  seedMoneySociety,
};
