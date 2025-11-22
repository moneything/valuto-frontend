// backend/src/seeds/seedsCategories.js
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../../.env" });
const Category = require('../models/Category');

const categories = [
  {
    id: "core-money-skills",
    title: "Core Money Skills",
    description: "Essential basics everyone should know",
    icon: "Wallet",
    color: "bg-blue-500",
    order: 1,
    isActive: true
  },
  {
    id: "earning-income",
    title: "Earning & Income",
    description: "Everything about making money",
    icon: "TrendingUp",
    color: "bg-green-500",
    order: 2,
    isActive: true
  },
  {
    id: "spending-wisely",
    title: "Spending Wisely",
    description: "Smart shopping and avoiding traps",
    icon: "CreditCard",
    color: "bg-orange-500",
    order: 3,
    isActive: true
  },
  {
    id: "investing-assets",
    title: "Investing & Assets",
    description: "Growing your money over time",
    icon: "TrendingUp",
    color: "bg-purple-500",
    order: 4,
    isActive: true
  },
  {
    id: "property-purchases",
    title: "Property & Big Purchases",
    description: "Major financial decisions",
    icon: "Home",
    color: "bg-indigo-500",
    order: 5,
    isActive: true
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    description: "Starting your own business",
    icon: "Briefcase",
    color: "bg-red-500",
    order: 6,
    isActive: true
  },
  {
    id: "borrowing-debt",
    title: "Borrowing & Debt",
    description: "Understanding credit and debt",
    icon: "CreditCard",
    color: "bg-yellow-500",
    order: 7,
    isActive: true
  },
  {
    id: "future-planning",
    title: "Future Planning",
    description: "Long-term financial security",
    icon: "Target",
    color: "bg-teal-500",
    order: 8,
    isActive: true
  },
  {
    id: "money-society",
    title: "Money & Society",
    description: "How money affects the world",
    icon: "Globe",
    color: "bg-pink-500",
    order: 9,
    isActive: true
  }
];

// ✅ Idempotent seed function
async function seedCategories() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected!");

    for (const category of categories) {
      const existing = await Category.findOne({ id: category.id });

      if (!existing) {
        await Category.create(category);
        console.log(`✅ Created: ${category.title}`);
      } else {
        console.log(`⏭️ Already exists: ${category.title}`);
      }
    }

    console.log("🎉 Categories seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 DB connection closed");
  }
}

// Auto-run when called directly
if (require.main === module) {
  seedCategories();
}

module.exports = { seedCategories };
