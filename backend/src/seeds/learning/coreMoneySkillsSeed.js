// backend/src/seeds/learning/coreMoneySkillsSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Core Money Skills — Learning Modules
 * Category ID: core-money-skills
 *
 * This file currently seeds:
 * 1. Budgeting Basics
 *
 * You can later append Banking 101, Saving Strategies, etc.
 */

const coreMoneySkillsModules = [
  // 1. BUDGETING BASICS
  {
    title: "Budgeting Basics",
    description:
      "Learn how to take control of your money with simple budgeting techniques like the 50/30/20 rule, identifying needs vs wants, and building lasting habits.",

    categoryId: "core-money-skills",
    topic: "budgeting-basics",

    // Header visual + badges
    visual: {
      icon: "Wallet",          // Lucide icon name
      iconColor: "bg-blue-500",
      badge: "Core Money Skills",
      readTime: 3,
    },

    // ---- CONTENT SECTIONS (cards in the UI) ----
    contentSections: [
      // 1) INTRO / WHAT IS A BUDGET?
      {
        id: "intro-what-is-budget",
        type: "explanation",
        title: "What is a Budget?",
        content:
          "A budget is simply a plan for your money. It helps you see where your money comes from and where it goes, so you can make sure you have enough for the things you need and want.",
        icon: "TrendingUp",
        colorScheme: "blue",
        metadata: {
          variant: "info", // special variant to render big text + highlight box
          highlightTitle: "Think of it like this:",
          highlightText:
            "If your money was water, a budget would be like having different buckets to catch it – one for rent, one for food, one for fun, and one for saving!",
        },
      },

      // 2) NEEDS VS WANTS (two-column split card)
      {
        id: "needs-vs-wants",
        type: "list",
        title: "Needs vs Wants: The Foundation",
        content: "",
        icon: undefined,
        colorScheme: undefined,
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "✅ NEEDS (Must Have)",
              color: "green",
              iconName: "CheckCircle",
              items: [
                "Rent/Housing",
                "Food & Groceries",
                "Transport to work/uni",
                "Phone bill",
                "Essential clothing",
              ],
            },
            {
              title: "⚠️ WANTS (Nice to Have)",
              color: "orange",
              iconName: "AlertCircle",
              items: [
                "Netflix/Spotify subscriptions",
                "Eating out/takeaways",
                "Designer clothes",
                "Gaming/entertainment",
                "Holidays",
              ],
            },
          ],
        },
      },

      // 3) 50/30/20 RULE (three coloured cards)
      {
        id: "fifty-thirty-twenty",
        type: "comparison",
        title: "The 50/30/20 Rule (Perfect for Students!)",
        content: "The simplest way to budget your money",
        icon: undefined,
        colorScheme: "blue",
        metadata: {
          variant: "gridCards",
          columns: [
            {
              title: "50%",
              subtitle: "NEEDS",
              description: "Rent, food, transport, phone",
              color: "green",
            },
            {
              title: "30%",
              subtitle: "WANTS",
              description: "Fun, eating out, entertainment",
              color: "blue",
            },
            {
              title: "20%",
              subtitle: "SAVINGS",
              description: "Emergency fund, future goals",
              color: "purple",
            },
          ],
          exampleTitle: "Example with £1000/month income:",
          exampleList: [
            "£500 for needs (rent, food, transport)",
            "£300 for wants (fun, eating out)",
            "£200 for savings",
          ],
        },
      },

      // 4) HOW TO START BUDGETING (3 steps)
      {
        id: "start-budgeting-steps",
        type: "steps",
        title: "How to Start Budgeting (3 Easy Steps)",
        content: "",
        icon: undefined,
        colorScheme: undefined,
        metadata: {
          steps: [
            {
              number: 1,
              text: "Track Your Income",
              description:
                "Add up all money coming in: part-time job, student loan, family support",
            },
            {
              number: 2,
              text: "List Your Expenses",
              description:
                "Write down everything you spend money on for a week",
            },
            {
              number: 3,
              text: "Apply the 50/30/20 Rule",
              description:
                "Split your income and adjust your spending to fit",
            },
          ],
        },
      },

      // 5) QUICK TIPS (gradient card with bullets)
      {
        id: "quick-tips",
        type: "list",
        title: "💡 Quick Budgeting Tips",
        content: "",
        icon: undefined,
        colorScheme: undefined,
        metadata: {
          variant: "pastel", // renders gradient card + bullet list
          listItems: [
            "Use apps like Monzo or Starling Bank to track spending automatically",
            "Review your budget every month and adjust as needed",
            "If you overspend in one category, reduce another (don't touch savings!)",
            "Start small – even budgeting £100 builds good habits",
            "Remember: budgeting gives you MORE freedom, not less",
          ],
        },
      },
    ],

    // ---- QUIZ ----
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the 50/30/20 budgeting rule?",
          options: [
            "50/30/20",
            "60/20/20",
            "40/40/20",
            "50/25/25",
          ],
          correctAnswer: 0,
          explanation:
            "The 50/30/20 rule means 50% needs, 30% wants, and 20% savings.",
        },
      ],
    },

    // ---- NEXT STEPS ----
    relatedLessons: [
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "next-step",
      },
      {
        moduleId: "banking-101",
        title: "Banking 101",
        relationship: "related",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 1,
    isActive: true,

    createdBy: "system",
  },
];

// =====================================================
// Seed Function
// =====================================================
async function seedCoreMoneySkills() {
  try {
    for (const module of coreMoneySkillsModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
    }

    console.log("✅ Core Money Skills modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Core Money Skills:", error);
  }
}

module.exports = {
  coreMoneySkillsModules,
  seedCoreMoneySkills,
};
