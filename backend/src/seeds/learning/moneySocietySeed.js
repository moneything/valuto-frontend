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
  // =====================================================
  // 1. How Money Works in Society
  // =====================================================
  {
    title: "How Money Works in Society",
    description:
      "Understand the role of money in society, how it flows through the economy, and why it matters.",
    categoryId: "money-society",
    topic: "how-money-works",

    visual: {
      icon: "Globe",
      iconColor: "bg-pink-500",
      badge: "Foundational",
      readTime: 5,
    },

    contentSections: [
      {
        id: "role-of-money",
        type: "header",
        title: "What Is Money’s Role?",
        content:
          "Money allows people to trade goods and services easily. It acts as a medium of exchange, a store of value, and a unit of measurement.",
        icon: "Coins",
        colorScheme: "pink",
      },
      {
        id: "money-flow",
        type: "explanation",
        title: "How Money Flows Through Society",
        content:
          "Money moves between people, businesses, and governments. Each group affects how much money circulates and where it goes.",
        icon: "Repeat",
        colorScheme: "purple",
      },
      {
        id: "common-misunderstandings",
        type: "warning",
        title: "Common Misunderstandings About Money",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Money always equals wealth — (not true; wealth is what you *own*, not what you earn)",
            "Governments can print unlimited money — (leads to inflation)",
            "Money only benefits individuals — (it influences entire communities)",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is NOT a role of money?",
          options: [
            "Medium of exchange",
            "Store of value",
            "Unit of account",
            "Unlimited free resource",
          ],
          correctAnswer: 3,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "government-and-taxes", title: "Government & Taxes", relationship: "next-step" },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 1,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 2. Government & Taxes
  // =====================================================
  {
    title: "Government & Taxes",
    description:
      "Learn how taxes work, why governments collect them, and where public money is spent.",
    categoryId: "money-society",
    topic: "government-and-taxes",

    visual: {
      icon: "Building",
      iconColor: "bg-pink-600",
      badge: "Civic Knowledge",
      readTime: 6,
    },

    contentSections: [
      {
        id: "why-taxes-exist",
        type: "header",
        title: "Why Do Taxes Exist?",
        content:
          "Taxes fund public services like the NHS, schools, roads, emergency services, and social support programs.",
        icon: "Wallet",
        colorScheme: "pink",
      },
      {
        id: "types-of-taxes",
        type: "list",
        title: "Types of Taxes",
        content: "",
        icon: "ListChecks",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Income Tax — based on earnings",
            "National Insurance — funds state benefits",
            "VAT — added to goods and services",
            "Council Tax — helps fund local services",
          ],
        },
      },
      {
        id: "public-spending",
        type: "explanation",
        title: "How Tax Money Is Spent",
        content:
          "Governments distribute tax income across essential services, infrastructure, benefits, and public programs.",
        icon: "ChartPie",
        colorScheme: "purple",
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is VAT?",
          options: [
            "A tax on goods and services",
            "A type of bank account",
            "A pension contribution",
            "A government loan",
          ],
          correctAnswer: 0,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "how-money-works", title: "How Money Works in Society", relationship: "prerequisite" },
      { moduleId: "economy-explained", title: "The Economy Explained", relationship: "next-step" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. The Economy Explained
  // =====================================================
  {
    title: "The Economy Explained",
    description:
      "A clear, simple explanation of how the economy works and why it affects daily life.",
    categoryId: "money-society",
    topic: "economy-explained",

    visual: {
      icon: "LineChart",
      iconColor: "bg-pink-700",
      badge: "Economic Literacy",
      readTime: 7,
    },

    contentSections: [
      {
        id: "what-is-economy",
        type: "header",
        title: "What Is the Economy?",
        content:
          "The economy is the system of how money, goods, and services flow between people, businesses, and governments.",
        icon: "Globe",
        colorScheme: "pink",
      },
      {
        id: "supply-and-demand",
        type: "explanation",
        title: "Supply & Demand",
        content:
          "Prices rise when demand is high but supply is low. Prices fall when supply is high but demand is low.",
        icon: "TrendingUp",
        colorScheme: "yellow",
      },
      {
        id: "recessions",
        type: "warning",
        title: "What Causes Recessions?",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "High unemployment",
            "Reduced consumer spending",
            "Business closures",
            "High inflation or economic shocks",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What happens to prices when demand increases but supply stays low?",
          options: ["Prices fall", "Prices rise", "Prices stay the same", "Prices disappear"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "government-and-taxes", title: "Government & Taxes", relationship: "prerequisite" },
      { moduleId: "financial-inequality", title: "Inequality & Financial Systems", relationship: "next-step" },
    ],

    points: 140,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Inequality & Financial Systems
  // =====================================================
  {
    title: "Inequality & Financial Systems",
    description:
      "Learn how wealth, income, and opportunity differ between groups, and how systems shape financial outcomes.",
    categoryId: "money-society",
    topic: "financial-inequality",

    visual: {
      icon: "Scale",
      iconColor: "bg-pink-800",
      badge: "Social Insight",
      readTime: 7,
    },

    contentSections: [
      {
        id: "what-is-inequality",
        type: "header",
        title: "What Is Financial Inequality?",
        content:
          "Financial inequality is the uneven distribution of income, wealth, and opportunities among individuals or groups.",
        icon: "Scale",
        colorScheme: "yellow",
      },
      {
        id: "causes-inequality",
        type: "list",
        title: "Common Causes of Inequality",
        content: "",
        icon: "List",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Differences in education/access",
            "Pay gaps",
            "Unequal job opportunities",
            "Wealth passed down generations",
          ],
        },
      },
      {
        id: "impact-inequality",
        type: "warning",
        title: "Why Inequality Matters",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Reduced social mobility",
            "Higher debt levels",
            "Less economic stability",
            "Long-term social divides",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is a common cause of financial inequality?",
          options: ["Equal pay", "Random chance", "Differences in opportunity", "Universal income"],
          correctAnswer: 2,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "ethical-finance",
        title: "Ethical & Sustainable Finance",
        relationship: "next-step",
      },
    ],

    points: 150,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. Ethical & Sustainable Finance
  // =====================================================
  {
    title: "Ethical & Sustainable Finance",
    description:
      "Explore how money can be used to support ethical, sustainable, and socially responsible outcomes.",
    categoryId: "money-society",
    topic: "ethical-finance",

    visual: {
      icon: "Leaf",
      iconColor: "bg-pink-900",
      badge: "Responsible Finance",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-ethical-finance",
        type: "header",
        title: "What Is Ethical Finance?",
        content:
          "Ethical finance means choosing investments, banks, and companies that act responsibly toward people and the planet.",
        icon: "Leaf",
        colorScheme: "green",
      },
      {
        id: "esg",
        type: "explanation",
        title: "Understanding ESG",
        content:
          "ESG stands for Environmental, Social, and Governance — three factors used to judge how responsible a company is.",
        icon: "Globe",
        colorScheme: "blue",
      },
      {
        id: "ethical-actions",
        type: "list",
        title: "Ways to Be More Financially Ethical",
        content: "",
        icon: "Heart",
        colorScheme: "purple",
        metadata: {
          listItems: [
            "Use banks with sustainability commitments",
            "Invest in funds that exclude harmful industries",
            "Support companies with fair working conditions",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does ESG stand for?",
          options: [
            "Essential Savings Guide",
            "Environmental, Social, Governance",
            "Economic Standard Goals",
            "Enterprise Security Group",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "financial-inequality", title: "Inequality & Financial Systems", relationship: "prerequisite" },
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
