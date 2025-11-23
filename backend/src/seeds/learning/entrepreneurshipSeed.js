// backend/src/seeds/learning/entrepreneurshipSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Entrepreneurship — Learning Modules
 * Category ID: entrepreneurship
 *
 * Includes:
 * 1. Introduction to Entrepreneurship
 * 2. Starting a Business: Step-by-Step
 * 3. Pricing Your Products & Services
 * 4. Cash Flow Management
 * 5. Marketing Basics for Beginners
 */

const entrepreneurshipModules = [
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedEntrepreneurship() {
  try {
    for (const module of entrepreneurshipModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Entrepreneurship modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Entrepreneurship:", error);
  }
}

module.exports = {
  entrepreneurshipModules,
  seedEntrepreneurship,
};
