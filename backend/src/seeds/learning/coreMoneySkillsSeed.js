// backend/src/seeds/learning/coreMoneySkillsSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Core Money Skills — Learning Modules
 * Category ID: core-money-skills
 *
 * Includes:
 * 1. Budgeting Basics
 * 2. Banking 101
 * 3. Saving Strategies
 * 4. Setting Financial Goals
 * 5. Emergency Funds 101
 */

const coreMoneySkillsModules = [
  // 1. BUDGETING BASICS
  {
    "title": "Budgeting Basics",
    "description": "Learn what a budget is, how to manage needs vs wants, and how to use the 50/30/20 rule to build strong money habits.",
    "categoryId": "saving-and-budgeting",
    "topic": "budgeting-basics",

    "visual": {
      "icon": "Wallet",
      "iconColor": "bg-blue-500",
      "badge": "Core Money Skills",
      "readTime": 3
    },

    "difficultyLevel": "beginner",
    "points": 50,
    "timeEstimate": 3,
    "order": 1,
    "isActive": true,
    "createdBy": "system",

    "contentSections": [
      {
        "id": "what-is-budget",
        "type": "header",
        "title": "What is a Budget?",
        "icon": "TrendingUp",
        "colorScheme": "blue",
        "content": "A budget is simply a plan for your money. It helps you see where your money comes from and where it goes, so you can make sure you have enough for the things you need and want.",
        "metadata": {
          "examples": [
            "Think of it like this: If your money was water, a budget would be like having different buckets—one for rent, one for food, one for fun, and one for saving!"
          ]
        }
      },

      {
        "id": "needs-vs-wants",
        "type": "comparison",
        "title": "Needs vs Wants: The Foundation",
        "icon": "CheckCircle",
        "colorScheme": "green",
        "metadata": {
          "comparisonTable": [
            {
              "label": "NEEDS (Must Have)",
              "value": "Rent or housing • Food & groceries • Transport to work/uni • Phone bill • Essential clothing"
            },
            {
              "label": "WANTS (Nice to Have)",
              "value": "Netflix/Spotify • Eating out/takeaways • Designer clothing • Gaming/entertainment • Holidays"
            }
          ]
        }
      },

      {
        "id": "fifty-rule",
        "type": "explanation",
        "title": "The 50/30/20 Rule (Perfect for Students!)",
        "icon": "PieChart",
        "colorScheme": "purple",
        "content": "The simplest way to budget your money.",
        "metadata": {
          "examples": [
            "50% — Needs (rent, food, transport, phone)",
            "30% — Wants (fun, eating out)",
            "20% — Savings (emergency fund, future goals)",
            "Example with £1000/month → £500 needs, £300 wants, £200 savings"
          ]
        }
      },

      {
        "id": "how-to-start",
        "type": "steps",
        "title": "How to Start Budgeting (3 Easy Steps)",
        "icon": "ListChecks",
        "colorScheme": "teal",
        "metadata": {
          "steps": [
            {
              "number": 1,
              "text": "Track Your Income",
              "description": "Add up all money coming in: part-time job, student loan, family support."
            },
            {
              "number": 2,
              "text": "List Your Expenses",
              "description": "Write down everything you spend money on for a week."
            },
            {
              "number": 3,
              "text": "Apply the 50/30/20 Rule",
              "description": "Split your income and adjust your spending to fit."
            }
          ]
        }
      },

      {
        "id": "tips",
        "type": "tip",
        "title": "Quick Budgeting Tips",
        "icon": "Lightbulb",
        "colorScheme": "yellow",
        "metadata": {
          "tips": [
            "Use apps like Monzo or Starling to track spending automatically.",
            "Review your budget every month and adjust if needed.",
            "If you overspend in one category, reduce another—never remove savings.",
            "Start small: even budgeting £100 builds strong financial habits.",
            "Remember: budgeting gives you *more* freedom, not less."
          ]
        }
      }
    ],

    "quiz": {
      "passingScore": 1,
      "questions": [
        {
          "question": "What is the 50/30/20 budgeting rule?",
          "options": [
            "50/30/20 (Needs/Wants/Savings)",
            "60/20/20",
            "40/40/20",
            "50/25/25"
          ],
          "correctAnswer": 0,
          "explanation": "The correct rule is 50% needs, 30% wants, 20% savings."
        }
      ]
    },

    "relatedLessons": [
      {
        "moduleId": "saving-strategies",
        "title": "Saving Strategies",
        "relationship": "next-step"
      },
      {
        "moduleId": "banking-101",
        "title": "Banking 101",
        "relationship": "related"
      }
    ]
  }



// 2. SAVING STRATEGIES
{
  id: "saving-strategies",
  title: "Saving Strategies",
  description: "Learn how to build savings, create SMART goals, and prepare for emergencies.",
  categoryId: "core-money-skills",
  icon: "PiggyBank",
  colorScheme: "green",
  timeEstimate: 3,
  points: 120,

  contentSections: [
    /* -------------------------------
     * 1. WHY SAVE MONEY?
     * ------------------------------- */
    {
      id: "why-save-money",
      type: "header",
      title: "Why Save Money?",
      icon: "TrendingUp",
      colorScheme: "green",
      content: "Saving money gives you freedom and peace of mind. It's not about being cheap — it's about being prepared for opportunities and emergencies."
    },
    {
      id: "why-save-grid",
      type: "comparison",
      title: "The Three Reasons People Save",
      colorScheme: "green",
      metadata: {
        comparisonTable: [
          { label: "🚨 Emergencies", value: "Unexpected expenses won't stress you out" },
          { label: "🎯 Goals", value: "Holiday, car, house deposit" },
          { label: "🌟 Opportunities", value: "Courses, certifications, starting a business" }
        ]
      }
    },

    /* -------------------------------
     * 2. PAY YOURSELF FIRST
     * ------------------------------- */
    {
      id: "pay-yourself-first-header",
      type: "header",
      title: "Pay Yourself First (The Golden Rule)",
      icon: "Target",
      colorScheme: "green",
      content: "Save BEFORE you spend. Treat saving like a bill you must pay."
    },
    {
      id: "pay-yourself-explanation",
      type: "explanation",
      title: "The Secret Strategy",
      colorScheme: "green",
      content:
        "As soon as money comes in, immediately move your savings amount to a separate account. Treat it like a non-negotiable expense.",
      metadata: {
        examples: [
          "Get paid £500 → Save £50 (10%) instantly → Spend only the remaining £450"
        ]
      }
    },
    {
      id: "pay-yourself-steps",
      type: "steps",
      title: "How It Works",
      icon: "Target",
      colorScheme: "green",
      metadata: {
        steps: [
          { number: 1, text: "Get paid £500" },
          { number: 2, text: "Immediately save £50 (10%)" },
          { number: 3, text: "Live on the remaining £450" },
          { number: 4, text: "Never touch the £50 savings" }
        ]
      }
    },
    {
      id: "pay-yourself-tip",
      type: "tip",
      title: "Pro Tip",
      icon: "Lightbulb",
      colorScheme: "yellow",
      content: "Set up an automatic transfer on payday — if you don't see the money, you won't miss it!"
    },

    /* -------------------------------
     * 3. EMERGENCY FUND
     * ------------------------------- */
    {
      id: "emergency-header",
      type: "header",
      title: "Emergency Fund: Your Financial Safety Net",
      icon: "Shield",
      colorScheme: "red",
      content: "An emergency fund protects you from unexpected costs like repairs, medical bills, or loss of income."
    },
    {
      id: "emergency-warning",
      type: "warning",
      title: "What Counts as an Emergency?",
      colorScheme: "red",
      metadata: {
        warnings: [
          "Car breaks down",
          "Laptop dies during exams",
          "Unexpected medical expenses",
          "Lost job or reduced hours",
          "Urgent family travel"
        ]
      }
    },
    {
      id: "emergency-list-1",
      type: "list",
      title: "How Much to Save",
      colorScheme: "green",
      metadata: {
        listItems: [
          "Students/Part-time: £500–£1000",
          "Full-time workers: 3–6 months of expenses"
        ]
      }
    },
    {
      id: "emergency-list-2",
      type: "list",
      title: "Where to Keep It",
      colorScheme: "blue",
      metadata: {
        listItems: [
          "High-interest savings account",
          "Easy access (not locked away)",
          "Separate from spending money",
          "Not invested — too risky"
        ]
      }
    },

    /* -------------------------------
     * 4. SMART SAVING GOALS
     * ------------------------------- */
    {
      id: "smart-header",
      type: "header",
      title: "Setting Savings Goals (SMART Method)",
      icon: "Target",
      colorScheme: "purple"
    },
    {
      id: "smart-explanation",
      type: "explanation",
      title: "Why SMART Goals?",
      content: "Vague goals like 'save more money' rarely work. SMART goals increase success.",
      colorScheme: "purple"
    },
    {
      id: "smart-table",
      type: "comparison",
      title: "SMART Breakdown",
      colorScheme: "purple",
      metadata: {
        comparisonTable: [
          { label: "Specific", value: "Save for a holiday to Spain" },
          { label: "Measurable", value: "Need £800 total" },
          { label: "Achievable", value: "Can save £100/month" },
          { label: "Relevant", value: "Really want this holiday" },
          { label: "Time-bound", value: "By next August (8 months)" }
        ]
      }
    },
    {
      id: "goal-types",
      type: "comparison",
      title: "Types of Savings Goals",
      colorScheme: "green",
      metadata: {
        comparisonTable: [
          { label: "Short-term (1–12 months)", value: "Holiday, laptop, training course" },
          { label: "Medium-term (1–5 years)", value: "Car, house deposit" },
          { label: "Long-term (5+ years)", value: "Retirement, investments" }
        ]
      }
    },

    /* -------------------------------
     * 5. PRACTICAL SAVING TIPS
     * ------------------------------- */
    {
      id: "tips-header",
      type: "header",
      title: "Practical Saving Tips for Students",
      icon: "Lightbulb",
      colorScheme: "yellow"
    },
    {
      id: "tips-list-easy",
      type: "list",
      title: "Easy Wins",
      colorScheme: "green",
      metadata: {
        listItems: [
          "Do the 52-week challenge",
          "Save every £5 note you get",
          "Use student discounts (UNiDAYS, Student Beans)",
          "Cook at home",
          "Buy supermarket brands"
        ]
      }
    },
    {
      id: "tips-apps",
      type: "list",
      title: "Apps That Make Saving Easier",
      colorScheme: "blue",
      metadata: {
        listItems: [
          "Monzo/Starling – Round-ups",
          "Plum – Automated saving",
          "Chip – AI-powered saving",
          "YNAB – Budgeting",
          "Honey – Discount finder"
        ]
      }
    },

    /* -------------------------------
     * QUIZ
     * ------------------------------- */
  ],

  quiz: {
    questions: [
      {
        id: "q1",
        question: "How much should a full-time worker save in their emergency fund?",
        options: [
          "1 month expenses",
          "3-6 months expenses",
          "1 year expenses",
          "£100"
        ],
        correctAnswer: "3-6 months expenses"
      }
    ]
  }
}


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
