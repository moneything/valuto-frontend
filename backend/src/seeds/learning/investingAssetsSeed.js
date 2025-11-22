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
  // =====================================================
  // 1. Introduction to Investing
  // =====================================================
  {
    title: "Introduction to Investing",
    description:
      "Understand what investing is, why it matters, and how beginners can start safely.",
    categoryId: "investing-assets",
    topic: "intro-to-investing",

    visual: {
      icon: "TrendingUp",
      iconColor: "bg-purple-500",
      badge: "Beginner Friendly",
      readTime: 5,
    },

    contentSections: [
      {
        id: "what-is-investing",
        type: "header",
        title: "What Is Investing?",
        content:
          "Investing means putting your money into assets that can grow in value over time — such as stocks, bonds, or property.",
        icon: "TrendingUp",
        colorScheme: "purple",
      },
      {
        id: "why-invest",
        type: "list",
        title: "Why Should You Invest?",
        content: "",
        icon: "ArrowUp",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Grow your money faster than inflation",
            "Achieve long-term goals (house, retirement)",
            "Make your money work for you",
          ],
        },
      },
      {
        id: "investment-myths",
        type: "warning",
        title: "Common Investment Myths",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Investing is only for rich people — false",
            "You need expert knowledge — false",
            "Investing is the same as gambling — false",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is the main purpose of investing?",
          options: [
            "To get rich quick",
            "To grow money over time",
            "To avoid paying taxes",
            "To replace savings",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "stocks-and-shares-basics",
        title: "Stocks & Shares Basics",
        relationship: "next-step",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 1,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 2. Stocks & Shares Basics
  // =====================================================
  {
    title: "Stocks & Shares Basics",
    description:
      "Learn what stocks are, how shareholder ownership works, and how stock markets operate.",
    categoryId: "investing-assets",
    topic: "stocks-and-shares-basics",

    visual: {
      icon: "CandlestickChart",
      iconColor: "bg-purple-600",
      badge: "Beginner",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-are-stocks",
        type: "header",
        title: "What Are Stocks?",
        content:
          "Stocks (or shares) represent partial ownership of a company. If the company grows, the value of your shares can increase.",
        icon: "PieChart",
        colorScheme: "purple",
      },
      {
        id: "how-stock-market-works",
        type: "explanation",
        title: "How the Stock Market Works",
        content:
          "The stock market is a marketplace where investors buy and sell shares. Prices change based on supply, demand, and company performance.",
        icon: "Landmark",
        colorScheme: "blue",
      },
      {
        id: "stock-risks",
        type: "warning",
        title: "Risks to Know",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Stock prices can fall quickly",
            "Short-term volatility",
            "You may not get back what you invest",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does owning a stock represent?",
          options: [
            "A loan to the company",
            "Partial ownership of the company",
            "A tax bill",
            "Guaranteed profit",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "intro-to-investing", title: "Introduction to Investing", relationship: "prerequisite" },
      { moduleId: "bonds-low-risk-assets", title: "Bonds & Low-Risk Assets", relationship: "next-step" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Bonds & Low-Risk Assets
  // =====================================================
  {
    title: "Bonds & Low-Risk Assets",
    description:
      "Understand bonds, government securities, and other safer investment options.",
    categoryId: "investing-assets",
    topic: "bonds-low-risk-assets",

    visual: {
      icon: "Shield",
      iconColor: "bg-purple-700",
      badge: "Low Risk",
      readTime: 5,
    },

    contentSections: [
      {
        id: "what-are-bonds",
        type: "header",
        title: "What Are Bonds?",
        content:
          "Bonds are loans you give to governments or companies. They repay you with interest over time.",
        icon: "Scroll",
        colorScheme: "yellow",
      },
      {
        id: "bond-types",
        type: "list",
        title: "Types of Bonds",
        content: "",
        icon: "List",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Government bonds",
            "Corporate bonds",
            "Index-linked bonds",
          ],
        },
      },
      {
        id: "risk-vs-return",
        type: "comparison",
        title: "Risk vs Return",
        content: "",
        icon: "Scale",
        colorScheme: "blue",
        metadata: {
          comparisonTable: [
            { label: "Stocks", value: "Higher potential returns, higher risk" },
            { label: "Bonds", value: "Lower returns, lower risk" },
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What are bonds?",
          options: ["Company ownership", "Loans to governments/companies", "High-risk investments", "Cryptocurrencies"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "stocks-and-shares-basics", title: "Stocks & Shares Basics", relationship: "prerequisite" },
      { moduleId: "diversification-and-risk", title: "Diversification & Risk", relationship: "next-step" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Diversification & Risk
  // =====================================================
  {
    title: "Diversification & Risk",
    description:
      "Learn how spreading your investments across different assets reduces risk.",
    categoryId: "investing-assets",
    topic: "diversification-and-risk",

    visual: {
      icon: "Layers",
      iconColor: "bg-purple-800",
      badge: "Investor Skill",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-diversification",
        type: "header",
        title: "What Is Diversification?",
        content:
          "Diversification means not putting all your money into one investment. If one performs poorly, others may perform better.",
        icon: "Layers",
        colorScheme: "purple",
      },
      {
        id: "types-of-diversification",
        type: "list",
        title: "Ways to Diversify",
        content: "",
        icon: "CheckCircle",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Different industries (tech, healthcare, retail)",
            "Different asset types (stocks, bonds, property)",
            "Different regions (UK, US, global)",
          ],
        },
      },
      {
        id: "risks",
        type: "warning",
        title: "Risks of Not Diversifying",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Portfolio heavily affected by one industry",
            "Higher volatility",
            "Greater chance of major losses",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is diversification?",
          options: [
            "Investing all money into one stock",
            "Spreading investments to reduce risk",
            "Avoiding the stock market",
            "Gambling",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "bonds-low-risk-assets",
        title: "Bonds & Low-Risk Assets",
        relationship: "prerequisite",
      },
      {
        moduleId: "compound-interest-explained",
        title: "Compound Interest Explained",
        relationship: "next-step",
      },
    ],

    points: 140,
    difficultyLevel: "intermediate",
    timeEstimate: 6,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. Compound Interest Explained
  // =====================================================
  {
    title: "Compound Interest Explained",
    description:
      "Learn how compound interest grows your money exponentially over time.",
    categoryId: "investing-assets",
    topic: "compound-interest-explained",

    visual: {
      icon: "Calculator",
      iconColor: "bg-purple-900",
      badge: "Growth Concept",
      readTime: 7,
    },

    contentSections: [
      {
        id: "what-is-compound-interest",
        type: "header",
        title: "What Is Compound Interest?",
        content:
          "Compound interest means earning interest on both your original money and the interest it has already earned.",
        icon: "Sigma",
        colorScheme: "yellow",
      },
      {
        id: "rule-of-72",
        type: "tip",
        title: "The Rule of 72",
        content:
          "Divide 72 by your interest rate to estimate how long it takes for your money to double.",
        icon: "Lightbulb",
        colorScheme: "blue",
      },
      {
        id: "growth-example",
        type: "example",
        title: "Example: £100 at 8% Interest",
        content:
          "Year 1: £108\nYear 5: £146.93\nYear 10: £215.89\nThis shows how growth accelerates over time.",
        icon: "TrendingUp",
        colorScheme: "green",
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does compound interest mean?",
          options: [
            "Interest only on your original money",
            "Interest on both your money and previous interest",
            "A type of tax",
            "Guaranteed profit",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "diversification-and-risk",
        title: "Diversification & Risk",
        relationship: "prerequisite",
      },
    ],

    points: 150,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 5,
    isActive: true,
    createdBy: "system",
  },
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
