// backend/src/seeds/learning/spendingWiselySeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Spending Wisely — Learning Modules
 * Category ID: spending-wisely
 *
 * Includes:
 * 1. Smart Shopping Basics
 * 2. Avoiding Scams & Traps
 * 3. Value for Money & Price Comparison
 * 4. Understanding Subscriptions
 * 5. Impulse Spending & Behaviour Psychology
 */

const spendingWiselyModules = [
  {
    title: "Smart Spending Basics",
    description: "Learn how to stretch your money, avoid impulse purchases, and prioritise what actually matters.",
    categoryId: "spending-wisely",
    topic: "smart-spending-basics",

    visual: {
      icon: "ShoppingCart",
      iconColor: "bg-blue-500",
      badge: "Spending Wisely",
      readTime: 3
    },

    contentSections: [
      /* ------------------------------------------------------------ */
      /* 1. What Does “Smart Spending” Mean? — Explanation(info)       */
      /* ------------------------------------------------------------ */
      {
        id: "what-is-smart-spending",
        type: "explanation",
        title: "What Is Smart Spending?",
        icon: "Target",
        metadata: {
          variant: "info",
          description: "Smart spending means making sure every pound you spend gives you value — not waste.",
          highlightTitle: "Key Idea",
          highlightText: "Every expense should either: improve your life, save time, or bring genuine joy."
        }
      },

      /* ------------------------------------------------------------ */
      /* 2. Needs vs Wants – Comparison (twoColumn)                    */
      /* ------------------------------------------------------------ */
      {
        id: "needs-vs-wants",
        type: "list",
        title: "Needs vs Wants",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Needs",
              color: "green",
              iconName: "CheckCircle",
              items: [
                "Food & groceries",
                "Transport to school or work",
                "School supplies",
                "Basic clothing",
                "Phone plan (reasonable)"
              ]
            },
            {
              title: "Wants",
              color: "purple",
              iconName: "Star",
              items: [
                "New trainers (when you already have some)",
                "Takeaways every day",
                "Latest phone upgrade",
                "Paid subscriptions you rarely use",
                "Impulse snacks at checkout"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 3. The “Pause Before You Buy” Trick — Tip(lightbulb)         */
      /* ------------------------------------------------------------ */
      {
        id: "pause-buying-trick",
        type: "tip",
        title: "The 24-Hour Rule",
        icon: "Timer",
        metadata: {
          tips: [
            "If you're about to buy something that isn't essential, wait 24 hours. If you still want it, consider buying. If not, you saved money."
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 4. Common Spending Mistakes — Warning(danger)                 */
      /* ------------------------------------------------------------ */
      {
        id: "spending-mistakes",
        type: "warning",
        title: "Common Spending Mistakes",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Buying because of discounts instead of need",
            "Not comparing prices before purchasing",
            "Impulse buying when stressed or bored",
            "Relying on credit for non-essential items"
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 5. Stretch Your Money Further — pastel(motivational list)     */
      /* ------------------------------------------------------------ */
      {
        id: "stretch-money-tips",
        type: "list",
        title: "Simple Ways to Stretch Your Money",
        metadata: {
          variant: "pastel",
          listItems: [
            "Plan purchases ahead",
            "Compare prices online",
            "Buy in bulk for items you use often",
            "Avoid branded products when the cheaper option is identical",
            "Set a monthly 'fun money' limit"
          ]
        }
      }
    ],

    /* ------------------------------------------------------------ */
    /* QUIZ                                                         */
    /* ------------------------------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "Which of the following is a NEED?",
          options: [
            "New running shoes even though you already have some",
            "A phone plan you use for school communication",
            "Ordering takeout every night",
            "A premium music subscription"
          ],
          correctAnswer: 1,
          explanation: "A phone plan you rely on for school/work communication is a need."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    /* RELATED LESSONS                                              */
    /* ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "recommended"
      },
      {
        moduleId: "avoid-impulse-spending",
        title: "Avoiding Impulse Spending",
        relationship: "next-step"
      }
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 1,
    isActive: true,
    createdBy: "system"
  },

  
];

// =====================================================
// Seed Function
// =====================================================
async function seedSpendingWisely() {
  try {
    for (const module of spendingWiselyModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });

      if (!exists) {
        await LearningModule.create(module);
        console.log(`🛒 Created Spending Wisely module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }

    console.log("🛒 Spending Wisely modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Spending Wisely:", error);
  }
}

module.exports = {
  spendingWiselyModules,
  seedSpendingWisely,
};
