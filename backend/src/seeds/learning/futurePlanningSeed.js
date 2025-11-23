// backend/src/seeds/learning/futurePlanningSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Future Planning — Learning Modules
 * Category ID: future-planning
 *
 * Includes:
 * 1. Long-Term Planning
 * 2. Retirement Basics
 * 3. Insurance & Protection
 * 4. Understanding Inflation
 * 5. Wills & Estate Planning
 */

const futurePlanningModules = [
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedFuturePlanning() {
  try {
    for (const module of futurePlanningModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Future Planning modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Future Planning:", error);
  }
}

module.exports = {
  futurePlanningModules,
  seedFuturePlanning,
};
