// backend/src/seeds/learning/propertyPurchasesSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Property & Big Purchases — Learning Modules
 * Category ID: property-purchases
 *
 * Includes:
 * 1. Renting vs Buying
 * 2. Understanding Mortgages
 * 3. Saving for a Deposit
 * 4. Hidden Costs of Property
 * 5. How House Prices Work
 */

const propertyPurchasesModules = [
  // =====================================================
  // 1. Renting vs Buying
  // =====================================================
  {
    title: "Renting vs Buying",
    description:
      "Understand the key differences, costs, pros, and cons of renting a home versus buying one.",
    categoryId: "property-purchases",
    topic: "renting-vs-buying",

    visual: {
      icon: "Home",
      iconColor: "bg-indigo-500",
      badge: "Essential Decision",
      readTime: 6,
    },

    contentSections: [
      {
        id: "renting-basics",
        type: "header",
        title: "What Does Renting Mean?",
        content:
          "Renting gives you flexibility: you pay monthly to live in a property owned by someone else. You don’t build ownership, but the upfront costs are lower.",
        icon: "Key",
        colorScheme: "blue",
      },
      {
        id: "buying-basics",
        type: "explanation",
        title: "What Does Buying Mean?",
        content:
          "Buying means you own the property (usually with a mortgage). It's a long-term investment but requires large upfront costs.",
        icon: "House",
        colorScheme: "indigo",
      },
      {
        id: "pros-cons",
        type: "comparison",
        title: "Pros & Cons",
        content: "",
        icon: "Scale",
        colorScheme: "purple",
        metadata: {
          comparisonTable: [
            { label: "Renting - Pros", value: "Low upfront cost, flexibility, landlord handles repairs" },
            { label: "Renting - Cons", value: "No equity, rent can increase, limited control" },
            { label: "Buying - Pros", value: "Builds equity, stable payments, more freedom" },
            { label: "Buying - Cons", value: "Large deposit needed, maintenance costs, long-term commitment" }
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is a benefit of RENTING?",
          options: ["Building equity", "Low upfront cost", "Full control of property", "Fixed long-term payments"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "understanding-mortgages",
        title: "Understanding Mortgages",
        relationship: "next-step",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 1,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 2. Understanding Mortgages
  // =====================================================
  {
    title: "Understanding Mortgages",
    description:
      "Mortgages explained simply — interest rates, repayments, terms, and how lenders assess you.",
    categoryId: "property-purchases",
    topic: "understanding-mortgages",

    visual: {
      icon: "Receipt",
      iconColor: "bg-indigo-600",
      badge: "Core Knowledge",
      readTime: 7,
    },

    contentSections: [
      {
        id: "what-is-mortgage",
        type: "header",
        title: "What Is a Mortgage?",
        content:
          "A mortgage is a long-term loan used to buy a property. You repay it over many years with interest.",
        icon: "FileText",
        colorScheme: "indigo",
      },
      {
        id: "interest-rates",
        type: "explanation",
        title: "Interest Rates Explained",
        content:
          "Interest is the price you pay to borrow money. Fixed-rate mortgages stay the same; variable rates can change.",
        icon: "Zap",
        colorScheme: "yellow",
      },
      {
        id: "affordability-checks",
        type: "list",
        title: "What Lenders Check",
        content: "",
        icon: "ListChecks",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Your income",
            "Your credit score",
            "Your existing debts",
            "Your spending habits",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "A fixed-rate mortgage means:",
          options: [
            "Your payments change weekly",
            "Your interest rate stays the same",
            "You never pay interest",
            "The government pays part of the loan",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "saving-for-deposit",
        title: "Saving for a Deposit",
        relationship: "next-step",
      },
    ],

    points: 140,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Saving for a Deposit
  // =====================================================
  {
    title: "Saving for a Deposit",
    description:
      "Learn how much deposit you need, strategies to save faster, and government schemes available.",
    categoryId: "property-purchases",
    topic: "saving-for-deposit",

    visual: {
      icon: "PiggyBank",
      iconColor: "bg-indigo-700",
      badge: "Beginner Friendly",
      readTime: 5,
    },

    contentSections: [
      {
        id: "how-much-deposit",
        type: "header",
        title: "How Much Is a Deposit?",
        content:
          "Most first-time buyers need a deposit between 5% and 20% of the property price.",
        icon: "Calculator",
        colorScheme: "blue",
      },
      {
        id: "saving-strategies",
        type: "list",
        title: "Smart Saving Strategies",
        content: "",
        icon: "Lightbulb",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Open a dedicated savings account",
            "Automate monthly savings",
            "Cut back on non-essential expenses",
            "Track your progress weekly",
          ],
        },
      },
      {
        id: "help-to-buy",
        type: "explanation",
        title: "Government Support Schemes",
        content:
          "Some schemes (like Lifetime ISAs in the UK) offer bonuses to help you build a deposit faster.",
        icon: "Gift",
        colorScheme: "purple",
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is a typical first-time buyer deposit?",
          options: ["1%–2%", "5%–20%", "50%", "100%"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "hidden-property-costs",
        title: "Hidden Costs of Property",
        relationship: "next-step",
      },
      {
        moduleId: "renting-vs-buying",
        title: "Renting vs Buying",
        relationship: "prerequisite",
      },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Hidden Costs of Property
  // =====================================================
  {
    title: "Hidden Costs of Property",
    description:
      "Buying a property comes with many extra costs — learn them so you’re never caught out.",
    categoryId: "property-purchases",
    topic: "hidden-property-costs",

    visual: {
      icon: "AlertTriangle",
      iconColor: "bg-indigo-800",
      badge: "Important",
      readTime: 6,
    },

    contentSections: [
      {
        id: "legal-fees",
        type: "list",
        title: "Upfront Costs",
        content: "",
        icon: "FileSignature",
        colorScheme: "yellow",
        metadata: {
          listItems: [
            "Solicitor fees",
            "Valuation fees",
            "Survey costs",
            "Mortgage arrangement fees",
          ],
        },
      },
      {
        id: "ongoing-costs",
        type: "list",
        title: "Ongoing Costs",
        content: "",
        icon: "Calendar",
        colorScheme: "purple",
        metadata: {
          listItems: [
            "Council tax",
            "Insurance",
            "Maintenance & repairs",
            "Utility bills",
          ],
        },
      },
      {
        id: "stamp-duty",
        type: "explanation",
        title: "Stamp Duty",
        content:
          "A tax paid when buying a property — the amount depends on the property's price and your buyer status (e.g., first-time buyer).",
        icon: "Receipt",
        colorScheme: "blue",
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of these is an ONGOING cost?",
          options: ["Survey", "Solicitor fees", "Council tax", "Stamp duty"],
          correctAnswer: 2,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "how-house-prices-work",
        title: "How House Prices Work",
        relationship: "next-step",
      },
    ],

    points: 130,
    difficultyLevel: "intermediate",
    timeEstimate: 6,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. How House Prices Work
  // =====================================================
  {
    title: "How House Prices Work",
    description:
      "A clear breakdown of what drives house prices — supply, demand, interest rates, and the wider economy.",
    categoryId: "property-purchases",
    topic: "how-house-prices-work",

    visual: {
      icon: "LineChart",
      iconColor: "bg-indigo-900",
      badge: "Market Insight",
      readTime: 7,
    },

    contentSections: [
      {
        id: "supply-demand",
        type: "header",
        title: "Supply & Demand",
        content:
          "Prices rise when more people want homes than there are available properties. Prices fall when supply is high but demand is low.",
        icon: "TrendingUp",
        colorScheme: "indigo",
      },
      {
        id: "interest-rates-impact",
        type: "explanation",
        title: "How Interest Rates Affect Prices",
        content:
          "Lower interest rates make borrowing cheaper, increasing demand for houses. Higher rates reduce demand.",
        icon: "Euro",
        colorScheme: "blue",
      },
      {
        id: "economy-impact",
        type: "warning",
        title: "Economic Factors",
        content: "",
        icon: "Activity",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Recessions reduce demand",
            "Wage growth influences affordability",
            "Inflation affects purchasing power",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What usually happens when interest rates fall?",
          options: [
            "House demand decreases",
            "Borrowing becomes cheaper",
            "Prices automatically fall",
            "The government sets prices",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "renting-vs-buying",
        title: "Renting vs Buying",
        relationship: "related",
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
async function seedPropertyPurchases() {
  try {
    for (const module of propertyPurchasesModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });

      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }

    console.log("🏡 Property & Big Purchases modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Property & Big Purchases:", error);
  }
}

module.exports = {
  propertyPurchasesModules,
  seedPropertyPurchases,
};
