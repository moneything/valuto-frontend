// backend/src/seeds/learning/borrowingDebtSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Borrowing & Debt — Learning Modules
 * Category ID: borrowing-debt
 *
 * Includes:
 * 1. Understanding Credit Scores
 * 2. Loans & APR Explained
 * 3. Credit Cards: How They Work
 * 4. Debt Repayment Strategies
 */

const borrowingDebtModules = [
  // =====================================================
  // 1. Understanding Credit Scores
  // =====================================================
  {
    title: "Understanding Credit Scores",
    description: "What credit scores are, why they matter, and how to improve yours.",
    categoryId: "borrowing-debt",
    topic: "understanding-credit-scores",

    visual: {
      icon: "BarChart",
      iconColor: "bg-yellow-500",
      badge: "Essential Knowledge",
      readTime: 5,
    },

    contentSections: [
      {
        id: "intro-credit-score",
        type: "header",
        title: "What Is a Credit Score?",
        content:
          "A credit score is a number that shows how reliable you are at borrowing money. Lenders use it to decide whether to offer you credit and at what interest rate.",
        icon: "BarChart",
        colorScheme: "yellow",
      },
      {
        id: "why-credit-matters",
        type: "explanation",
        title: "Why Credit Scores Matter",
        content:
          "Your credit score affects loan approvals, credit card limits, mobile contracts, and even renting a home.",
        icon: "AlertCircle",
        colorScheme: "blue",
        metadata: {
          examples: [
            "Better score = lower interest rates",
            "Bad score = higher borrowing costs",
            "Very low score = credit refusal",
          ],
        },
      },
      {
        id: "improving-credit",
        type: "list",
        title: "How to Improve Your Credit Score",
        content: "",
        icon: "ArrowUpCircle",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Pay bills on time",
            "Stay below 30% on credit card utilisation",
            "Register on the electoral roll",
            "Avoid applying for too much credit at once",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does a credit score show?",
          options: [
            "How much money you earn",
            "How trustworthy you are at borrowing",
            "Your savings balance",
            "Your employment history",
          ],
          correctAnswer: 1,
          explanation:
            "A credit score measures how reliably you borrow and repay money.",
        },
        {
          question: "Which action helps improve credit?",
          options: [
            "Missing payments",
            "Maxing out credit cards",
            "Paying bills on time",
            "Applying for lots of loans",
          ],
          correctAnswer: 2,
        },
      ],
      passingScore: 2,
    },

    relatedLessons: [
      {
        moduleId: "credit-cards-how-they-work",
        title: "Credit Cards: How They Work",
        relationship: "next-step",
      },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 1,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 2. Loans & APR Explained
  // =====================================================
  {
    title: "Loans & APR Explained",
    description:
      "Learn how loans work, what APR means, and how to compare borrowing options safely.",
    categoryId: "borrowing-debt",
    topic: "loans-and-apr-explained",

    visual: {
      icon: "Percent",
      iconColor: "bg-yellow-400",
      badge: "Core Concept",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-a-loan",
        type: "header",
        title: "What Is a Loan?",
        content:
          "A loan is when you borrow money and agree to repay it over time, usually with interest.",
        icon: "HandCoins",
        colorScheme: "yellow",
      },
      {
        id: "apr-explained",
        type: "explanation",
        title: "What Is APR?",
        content:
          "APR stands for Annual Percentage Rate and shows the true cost of borrowing, including interest and fees.",
        icon: "Percent",
        colorScheme: "purple",
        metadata: {
          examples: [
            "APR = interest + mandatory fees",
            "Lower APR = cheaper borrowing",
          ],
        },
      },
      {
        id: "loan-comparison",
        type: "comparison",
        title: "Fixed vs Variable Interest Rates",
        content:
          "Choosing between fixed and variable loan rates impacts the total cost.",
        icon: "Scale",
        colorScheme: "blue",
        metadata: {
          comparisonTable: [
            {
              label: "Fixed Rate",
              value: "Stays the same monthly; predictable payments",
            },
            {
              label: "Variable Rate",
              value: "Can change with the market; payments may increase or decrease",
            },
          ],
        },
      },
      {
        id: "loan-warnings",
        type: "warning",
        title: "Borrowing Risks",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Borrowing more than you can repay",
            "Not checking the APR",
            "Ignoring hidden fees",
            "Using payday loans",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does APR represent?",
          options: [
            "Your credit score",
            "The full annual cost of borrowing",
            "The amount you save yearly",
            "Your monthly loan payment",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "understanding-credit-scores",
        title: "Understanding Credit Scores",
        relationship: "prerequisite",
      },
      {
        moduleId: "debt-repayment-strategies",
        title: "Debt Repayment Strategies",
        relationship: "next-step",
      },
    ],

    points: 120,
    difficultyLevel: "intermediate",
    timeEstimate: 6,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Credit Cards: How They Work
  // =====================================================
  {
    title: "Credit Cards: How They Work",
    description:
      "Learn how credit cards charge interest, how minimum payments work, and how to avoid debt traps.",
    categoryId: "borrowing-debt",
    topic: "credit-cards-how-they-work",

    visual: {
      icon: "CreditCard",
      iconColor: "bg-yellow-600",
      badge: "Important",
      readTime: 6,
    },

    contentSections: [
      {
        id: "credit-card-basics",
        type: "header",
        title: "What Is a Credit Card?",
        content:
          "A credit card lets you borrow money to make purchases, repaying the balance at a later date.",
        icon: "CreditCard",
        colorScheme: "yellow",
      },
      {
        id: "interest-and-minimums",
        type: "explanation",
        title: "Interest & Minimum Payments",
        content:
          "Paying only the minimum keeps you in debt longer and increases the interest you pay.",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          examples: [
            "£1,000 balance at 25% APR could take years to repay on minimums",
          ],
        },
      },
      {
        id: "good-vs-bad-usage",
        type: "list",
        title: "Smart vs Risky Credit Card Use",
        content: "",
        icon: "CheckCircle",
        colorScheme: "green",
        metadata: {
          listItems: [
            "✓ Pay in full every month",
            "✓ Keep utilisation low (below 30%)",
            "✗ Avoid using it for cash withdrawals",
            "✗ Avoid carrying high balances",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What happens if you only make minimum payments?",
          options: [
            "You repay the debt faster",
            "You pay less interest",
            "The debt lasts longer and costs more",
            "Your balance goes to zero quickly",
          ],
          correctAnswer: 2,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "understanding-credit-scores",
        title: "Understanding Credit Scores",
        relationship: "related",
      },
      {
        moduleId: "debt-repayment-strategies",
        title: "Debt Repayment Strategies",
        relationship: "next-step",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Debt Repayment Strategies
  // =====================================================
  {
    title: "Debt Repayment Strategies",
    description:
      "Snowball vs avalanche, how to prioritise debts, and how to get debt-free faster.",
    categoryId: "borrowing-debt",
    topic: "debt-repayment-strategies",

    visual: {
      icon: "TrendingDown",
      iconColor: "bg-yellow-700",
      badge: "Debt Reduction",
      readTime: 7,
    },

    contentSections: [
      {
        id: "why-strategies-matter",
        type: "header",
        title: "Why Strategies Matter",
        content:
          "Without a plan, debt becomes overwhelming. Using a structured method helps you pay it down faster.",
        icon: "Target",
        colorScheme: "yellow",
      },
      {
        id: "snowball-method",
        type: "steps",
        title: "Snowball Method",
        content: "Pay off the smallest debt first to build momentum.",
        icon: "Snowflake",
        colorScheme: "blue",
        metadata: {
          steps: [
            { number: 1, text: "List debts from smallest to largest" },
            { number: 2, text: "Pay minimums on all debts" },
            { number: 3, text: "Put extra money toward the smallest debt" },
          ],
        },
      },
      {
        id: "avalanche-method",
        type: "steps",
        title: "Avalanche Method",
        content: "Pay the debt with the highest interest rate first.",
        icon: "ArrowDownCircle",
        colorScheme: "purple",
        metadata: {
          steps: [
            { number: 1, text: "List debts by highest interest rate" },
            { number: 2, text: "Target the costliest debt first" },
          ],
        },
      },
      {
        id: "repayment-warnings",
        type: "warning",
        title: "Avoid These Debt Mistakes",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Paying only minimums on all debts",
            "Taking payday loans",
            "Ignoring interest rates",
            "Not budgeting while repaying debt",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which method targets the highest-interest debt first?",
          options: ["Snowball", "Avalanche", "Random", "Minimums"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "loans-and-apr-explained",
        title: "Loans & APR Explained",
        relationship: "prerequisite",
      },
    ],

    points: 150,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 4,
    isActive: true,
    createdBy: "system",
  },
];

// =====================================================
// Seed Function
// =====================================================
async function seedBorrowingDebt() {
  try {
    for (const module of borrowingDebtModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Borrowing & Debt modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Borrowing & Debt:", error);
  }
}

module.exports = {
  borrowingDebtModules,
  seedBorrowingDebt,
};
