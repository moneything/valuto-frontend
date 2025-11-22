// backend/src/seeds/learning/earningIncomeSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Earning & Income — Learning Modules
 * Category ID: earning-income
 *
 * Includes:
 * 1. Understanding Payslips
 * 2. Different Types of Income
 * 3. Taxes 101
 * 4. Side Hustles & Freelancing
 * 5. Salary Negotiation Basics
 */

const earningIncomeModules = [
  // =====================================================
  // 1. Understanding Payslips
  // =====================================================
  {
    title: "Understanding Payslips",
    description:
      "Learn how to read your payslip and understand deductions like tax, NI, and pensions.",
    categoryId: "earning-income",
    topic: "understanding-payslips",

    visual: {
      icon: "FileText",
      iconColor: "bg-green-400",
      badge: "Practical Skill",
      readTime: 5,
    },

    contentSections: [
      {
        id: "gross-vs-net",
        type: "comparison",
        title: "Gross Pay vs Net Pay",
        content: "",
        icon: "Scale",
        colorScheme: "green",
        metadata: {
          comparisonTable: [
            { label: "Gross Pay", value: "Your pay before any deductions" },
            { label: "Net Pay", value: "Your take-home pay after deductions" },
          ],
        },
      },
      {
        id: "deductions",
        type: "list",
        title: "Common Payslip Deductions",
        content: "",
        icon: "Receipt",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Income Tax",
            "National Insurance (NI)",
            "Pension Contributions",
            "Student Loan Repayments (if applicable)",
          ],
        },
      },
      {
        id: "tax-codes",
        type: "explanation",
        title: "What Is a Tax Code?",
        content:
          "Your tax code determines how much tax you pay. A common one is 1257L, meaning you're entitled to the standard personal tax-free allowance.",
        icon: "Hash",
        colorScheme: "purple",
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is your take-home pay?",
          options: ["Gross Pay", "Net Pay", "Bonus Pay", "Holiday Pay"],
          correctAnswer: 1,
        },
        {
          question: "What does NI stand for?",
          options: ["National Insurance", "Net Income", "New Income", "Normal Interest"],
          correctAnswer: 0,
        },
      ],
      passingScore: 2,
    },

    relatedLessons: [
      {
        moduleId: "income-streams",
        title: "Different Types of Income",
        relationship: "next-step",
      },
      {
        moduleId: "taxes-101",
        title: "Taxes 101",
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

  // =====================================================
  // 2. Different Types of Income
  // =====================================================
  {
    title: "Different Types of Income",
    description:
      "Earned, passive, and portfolio income — understand the differences and why they matter.",
    categoryId: "earning-income",
    topic: "income-streams",

    visual: {
      icon: "TrendingUp",
      iconColor: "bg-green-500",
      badge: "Income Essentials",
      readTime: 4,
    },

    contentSections: [
      {
        id: "three-types-income",
        type: "list",
        title: "The 3 Types of Income",
        content: "",
        icon: "List",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Earned Income — wages, salary",
            "Passive Income — rent, royalties",
            "Portfolio Income — investments, dividends",
          ],
        },
      },
      {
        id: "income-diversification",
        type: "tip",
        title: "Why Income Diversification Helps",
        content: "Multiple income streams create financial stability and reduce risk.",
        icon: "Layers",
        colorScheme: "blue",
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of these is passive income?",
          options: ["Salary", "Rent from a property", "Bonus", "Tips"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "understanding-payslips",
        title: "Understanding Payslips",
        relationship: "prerequisite",
      },
      {
        moduleId: "side-hustles-and-freelancing",
        title: "Side Hustles & Freelancing",
        relationship: "next-step",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 4,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Taxes 101
  // =====================================================
  {
    title: "Taxes 101",
    description:
      "Understand how income tax works, what NI is, and how your tax-free allowance affects take-home pay.",
    categoryId: "earning-income",
    topic: "taxes-101",

    visual: {
      icon: "Calculator",
      iconColor: "bg-green-600",
      badge: "Essential Knowledge",
      readTime: 6,
    },

    contentSections: [
      {
        id: "tax-free-allowance",
        type: "explanation",
        title: "Your Tax-Free Allowance",
        content:
          "Most people in the UK can earn a certain amount tax-free each year — this is called your Personal Allowance.",
        icon: "Ticket",
        colorScheme: "yellow",
      },
      {
        id: "income-tax-how",
        type: "steps",
        title: "How Income Tax Works",
        content: "",
        icon: "ArrowRight",
        colorScheme: "blue",
        metadata: {
          steps: [
            { number: 1, text: "You earn income" },
            { number: 2, text: "Tax is calculated based on tax bands" },
            { number: 3, text: "Your employer deducts it automatically" },
          ],
        },
      },
      {
        id: "ni-explained",
        type: "explanation",
        title: "What Is National Insurance (NI)?",
        content:
          "NI helps fund the NHS, state pension, maternity allowance, and other benefits.",
        icon: "HeartPulse",
        colorScheme: "pink",
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does NI fund?",
          options: ["Your personal savings", "Public services", "Employer bonuses", "Student loans"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "understanding-payslips", title: "Understanding Payslips", relationship: "related" },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Side Hustles & Freelancing
  // =====================================================
  {
    title: "Side Hustles & Freelancing",
    description:
      "Learn how to earn extra income, find freelance work, and handle taxes as a self-employed worker.",
    categoryId: "earning-income",
    topic: "side-hustles-and-freelancing",

    visual: {
      icon: "Briefcase",
      iconColor: "bg-green-700",
      badge: "Income Booster",
      readTime: 7,
    },

    contentSections: [
      {
        id: "what-is-freelancing",
        type: "header",
        title: "What Is Freelancing?",
        content:
          "Freelancing means working for yourself, offering skills or services directly to clients.",
        icon: "UserCheck",
        colorScheme: "green",
      },
      {
        id: "finding-work",
        type: "list",
        title: "Where to Find Freelance Work",
        content: "",
        icon: "Search",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Upwork",
            "Fiverr",
            "PeoplePerHour",
            "Local businesses",
            "Social media outreach",
          ],
        },
      },
      {
        id: "self-employed-tax",
        type: "warning",
        title: "Your Tax Responsibilities",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Registering as self-employed",
            "Keeping track of income & expenses",
            "Submitting a yearly tax return",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of these platforms is used for freelancing?",
          options: ["Spotify", "Upwork", "Netflix", "JustEat"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "income-streams", title: "Different Types of Income", relationship: "prerequisite" },
      { moduleId: "salary-negotiation-basics", title: "Salary Negotiation Basics", relationship: "next-step" },
    ],

    points: 120,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. Salary Negotiation Basics
  // =====================================================
  {
    title: "Salary Negotiation Basics",
    description:
      "Learn how to confidently ask for a raise or negotiate your starting salary.",
    categoryId: "earning-income",
    topic: "salary-negotiation-basics",

    visual: {
      icon: "Handshake",
      iconColor: "bg-green-800",
      badge: "Career Skill",
      readTime: 6,
    },

    contentSections: [
      {
        id: "why-negotiate",
        type: "header",
        title: "Why Negotiation Matters",
        content:
          "Negotiating your salary can increase your lifetime earnings by thousands of pounds.",
        icon: "TrendingUp",
        colorScheme: "green",
      },
      {
        id: "negotiation-steps",
        type: "steps",
        title: "How to Negotiate Effectively",
        content: "",
        icon: "CheckCircle",
        colorScheme: "purple",
        metadata: {
          steps: [
            { number: 1, text: "Research market rates" },
            { number: 2, text: "Highlight your achievements" },
            { number: 3, text: "Practice your pitch" },
            { number: 4, text: "Be confident but polite" },
          ],
        },
      },
      {
        id: "negotiation-mistakes",
        type: "warning",
        title: "Common Mistakes",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Accepting the first offer immediately",
            "Not asking at all",
            "Using ultimatums",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What should you always do before negotiating salary?",
          options: [
            "Threaten to quit",
            "Research market pay",
            "Ask coworkers",
            "Avoid preparing",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "side-hustles-and-freelancing", title: "Side Hustles & Freelancing", relationship: "related" },
    ],

    points: 120,
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
async function seedEarningIncome() {
  try {
    for (const module of earningIncomeModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Earning & Income modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Earning & Income:", error);
  }
}

module.exports = {
  earningIncomeModules,
  seedEarningIncome,
};
