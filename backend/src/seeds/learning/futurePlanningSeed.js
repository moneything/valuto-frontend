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
  // =====================================================
  // 1. Long-Term Planning
  // =====================================================
  {
    title: "Long-Term Planning",
    description:
      "Understand how to plan for the long future — major goals, milestones, and financial life stages.",
    categoryId: "future-planning",
    topic: "long-term-planning",

    visual: {
      icon: "CalendarRange",
      iconColor: "bg-teal-500",
      badge: "Future Ready",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-longterm",
        type: "header",
        title: "What Is Long-Term Planning?",
        content:
          "Long-term planning is deciding what you want your future to look like and building a financial roadmap to get there.",
        icon: "Target",
        colorScheme: "teal",
      },
      {
        id: "life-stages",
        type: "list",
        title: "Financial Life Stages",
        content: "",
        icon: "Layers",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Early career — learning, earning, starting to save",
            "Mid-career — building wealth, buying a home, family planning",
            "Later career — preparing for retirement",
            "Retirement — managing and protecting assets",
          ],
        },
      },
      {
        id: "longterm-goals",
        type: "steps",
        title: "How to Set Long-Term Goals",
        content: "",
        icon: "CheckCircle",
        colorScheme: "green",
        metadata: {
          steps: [
            { number: 1, text: "Identify the goal" },
            { number: 2, text: "Estimate the cost" },
            { number: 3, text: "Set a target date" },
            { number: 4, text: "Create a savings/investment plan" },
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is a long-term goal?",
          options: ["Buying lunch", "Booking a trip next week", "Saving for retirement", "Monthly rent"],
          correctAnswer: 2,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "retirement-basics", title: "Retirement Basics", relationship: "next-step" },
      { moduleId: "setting-financial-goals", title: "Setting Financial Goals", relationship: "prerequisite" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 1,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 2. Retirement Basics
  // =====================================================
  {
    title: "Retirement Basics",
    description:
      "Learn the basics of pensions, workplace contributions, and how compound growth supports your future.",
    categoryId: "future-planning",
    topic: "retirement-basics",

    visual: {
      icon: "PiggyBank",
      iconColor: "bg-teal-600",
      badge: "Life Skill",
      readTime: 7,
    },

    contentSections: [
      {
        id: "why-retirement-matters",
        type: "header",
        title: "Why Retirement Planning Matters",
        content:
          "The earlier you start saving for retirement, the more time your money has to grow through compound returns.",
        icon: "PiggyBank",
        colorScheme: "yellow",
      },
      {
        id: "pension-types",
        type: "comparison",
        title: "Types of Pensions",
        content: "",
        icon: "AlignLeft",
        colorScheme: "blue",
        metadata: {
          comparisonTable: [
            { label: "Workplace Pension", value: "Employer contributes, you contribute, government adds tax relief." },
            { label: "Private Pension", value: "You save independently; good for the self-employed." },
            { label: "State Pension", value: "Government provides this if you’ve paid enough NI contributions." },
          ],
        },
      },
      {
        id: "early-start",
        type: "tip",
        title: "The Advantage of Starting Early",
        content: "Even small pension contributions can grow significantly over decades.",
        icon: "Clock",
        colorScheme: "green",
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which pension usually includes employer contributions?",
          options: ["Workplace pension", "Private pension", "State pension", "ISA"],
          correctAnswer: 0,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "understanding-inflation", title: "Understanding Inflation", relationship: "related" },
    ],

    points: 150,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Insurance & Protection
  // =====================================================
  {
    title: "Insurance & Protection",
    description:
      "Understand different types of insurance, how they work, and why they protect your financial future.",
    categoryId: "future-planning",
    topic: "insurance-and-protection",

    visual: {
      icon: "ShieldCheck",
      iconColor: "bg-teal-700",
      badge: "Safety",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-insurance",
        type: "header",
        title: "What Is Insurance?",
        content:
          "Insurance protects you financially by sharing risk across many people. You pay a premium, and the provider covers specific losses.",
        icon: "Shield",
        colorScheme: "teal",
      },
      {
        id: "insurance-types",
        type: "list",
        title: "Common Types of Insurance",
        content: "",
        icon: "ListChecks",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Car insurance",
            "Home or renters insurance",
            "Life insurance",
            "Income protection",
            "Travel insurance",
          ],
        },
      },
      {
        id: "insurance-mistakes",
        type: "warning",
        title: "Common Mistakes",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Choosing the cheapest policy without checking what’s covered",
            "Not reading exclusions",
            "Not updating your policy when life changes",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does insurance primarily do?",
          options: [
            "Guarantees investment returns",
            "Protects against financial loss",
            "Makes you money",
            "Prevents accidents",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "retirement-basics", title: "Retirement Basics", relationship: "related" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Understanding Inflation
  // =====================================================
  {
    title: "Understanding Inflation",
    description:
      "Learn what inflation is, why prices rise, and how inflation affects your savings and future wealth.",
    categoryId: "future-planning",
    topic: "understanding-inflation",

    visual: {
      icon: "TrendingUp",
      iconColor: "bg-teal-800",
      badge: "Economics",
      readTime: 5,
    },

    contentSections: [
      {
        id: "what-is-inflation",
        type: "header",
        title: "What Is Inflation?",
        content:
          "Inflation is the rise in prices over time, meaning your money buys less in the future.",
        icon: "TrendingUp",
        colorScheme: "yellow",
      },
      {
        id: "causes",
        type: "explanation",
        title: "What Causes Inflation?",
        content:
          "Inflation can be caused by increased demand, higher production costs, or supply shortages.",
        icon: "Factory",
        colorScheme: "blue",
      },
      {
        id: "impact",
        type: "warning",
        title: "How Inflation Impacts You",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Savings lose value over time",
            "Purchasing power decreases",
            "Long-term goals become more expensive",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is inflation?",
          options: [
            "Prices decreasing over time",
            "Prices increasing over time",
            "Your income rising",
            "A type of tax",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "long-term-planning", title: "Long-Term Planning", relationship: "prerequisite" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. Wills & Estate Planning
  // =====================================================
  {
    title: "Wills & Estate Planning",
    description:
      "Learn why making a will matters, what it covers, and how estate planning protects your loved ones.",
    categoryId: "future-planning",
    topic: "estate-planning-basics",

    visual: {
      icon: "Scroll",
      iconColor: "bg-teal-900",
      badge: "Life Planning",
      readTime: 6,
    },

    contentSections: [
      {
        id: "why-wills-matter",
        type: "header",
        title: "Why Wills Matter",
        content:
          "A will ensures your belongings go to the right people and helps avoid legal issues for loved ones.",
        icon: "Scroll",
        colorScheme: "blue",
      },
      {
        id: "what-wills-cover",
        type: "list",
        title: "What a Will Typically Covers",
        content: "",
        icon: "List",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Who receives your assets",
            "Guardianship for children",
            "Who manages your estate",
            "Specific gifts and instructions",
          ],
        },
      },
      {
        id: "common-will-mistakes",
        type: "warning",
        title: "Common Mistakes",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Not updating the will after major life changes",
            "Not storing it safely",
            "Not making a will at all",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is the purpose of a will?",
          options: [
            "Reduce income tax",
            "Decide who receives your assets",
            "Increase investment returns",
            "Set pension contributions",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "insurance-and-protection", title: "Insurance & Protection", relationship: "related" },
    ],

    points: 130,
    difficultyLevel: "intermediate",
    timeEstimate: 6,
    order: 5,
    isActive: true,
    createdBy: "system",
  },
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
