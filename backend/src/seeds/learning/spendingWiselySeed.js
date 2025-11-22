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
  // =====================================================
  // 1. Smart Shopping Basics
  // =====================================================
  {
    title: "Smart Shopping Basics",
    description:
      "Learn how to find good deals, avoid overspending, and make confident shopping decisions.",
    categoryId: "spending-wisely",
    topic: "smart-shopping-basics",

    visual: {
      icon: "ShoppingCart",
      iconColor: "bg-orange-500",
      badge: "Beginner Friendly",
      readTime: 5,
    },

    contentSections: [
      {
        id: "what-is-smart-shopping",
        type: "header",
        title: "What Does Smart Shopping Mean?",
        content:
          "Smart shopping means buying intentionally — choosing quality, avoiding traps, and making your money go further.",
        icon: "ShoppingBag",
        colorScheme: "orange",
      },
      {
        id: "shop-like-pro",
        type: "list",
        title: "How to Shop Smart",
        content: "",
        icon: "ListChecks",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Compare prices before buying",
            "Check product reviews",
            "Avoid shopping when stressed or hungry",
            "Use cashback and discount apps",
          ],
        },
      },
      {
        id: "common-mistakes",
        type: "warning",
        title: "Common Shopping Mistakes",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Buying because something is 'on sale'",
            "Not checking return policies",
            "Not comparing similar products",
            "Falling for flashy marketing",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of these is a smart shopping habit?",
          options: [
            "Buying the first thing you see",
            "Checking product reviews",
            "Shopping when stressed",
            "Ignoring return policies",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "price-comparison-basics",
        title: "Value for Money & Price Comparison",
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
  // 2. Avoiding Scams & Traps
  // =====================================================
  {
    title: "Avoiding Scams & Traps",
    description:
      "Learn how to spot scams, avoid online traps, and protect your money.",
    categoryId: "spending-wisely",
    topic: "avoiding-scams",

    visual: {
      icon: "ShieldAlert",
      iconColor: "bg-orange-600",
      badge: "Be Safe",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-scam",
        type: "header",
        title: "What Is a Scam?",
        content:
          "A scam is a dishonest scheme designed to trick you into giving away money or personal information.",
        icon: "Shield",
        colorScheme: "orange",
      },
      {
        id: "common-scams",
        type: "list",
        title: "Common Modern Scams",
        content: "",
        icon: "AlertOctagon",
        colorScheme: "red",
        metadata: {
          listItems: [
            "Fake delivery texts",
            "Phishing emails",
            "Social media investment scams",
            "Fake charity appeals",
          ],
        },
      },
      {
        id: "how-to-protect",
        type: "tip",
        title: "How to Protect Yourself",
        content: "",
        icon: "Lock",
        colorScheme: "green",
        metadata: {
          tips: [
            "Never click unknown links",
            "Check website addresses carefully",
            "Avoid sending bank details by text",
            "Use two-factor authentication",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is a sign of a possible scam?",
          options: [
            "A well-known brand",
            "A message urging immediate action",
            "Clear grammar and spelling",
            "Contacting customer service directly",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "smart-shopping-basics",
        title: "Smart Shopping Basics",
        relationship: "prerequisite",
      },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Value for Money & Price Comparison
  // =====================================================
  {
    title: "Value for Money & Price Comparison",
    description:
      "Learn how to compare prices properly, judge quality, and avoid paying more than you should.",
    categoryId: "spending-wisely",
    topic: "price-comparison-basics",

    visual: {
      icon: "Tags",
      iconColor: "bg-orange-700",
      badge: "Money Saver",
      readTime: 6,
    },

    contentSections: [
      {
        id: "value-vs-price",
        type: "header",
        title: "Price vs Value",
        content:
          "Price is what you pay. Value is what you get. A cheaper item isn’t always better — and expensive isn’t always higher quality.",
        icon: "Scale",
        colorScheme: "yellow",
      },
      {
        id: "comparison-methods",
        type: "steps",
        title: "How to Compare Prices Effectively",
        content: "",
        icon: "CheckCircle",
        colorScheme: "green",
        metadata: {
          steps: [
            { number: 1, text: "Search multiple retailers" },
            { number: 2, text: "Check unit prices" },
            { number: 3, text: "Read recent customer reviews" },
            { number: 4, text: "Consider delivery and return costs" },
          ],
        },
      },
      {
        id: "price-traps",
        type: "warning",
        title: "Price Comparison Traps",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "'Was £999, now £499' fake discounts",
            "Subscription upsells",
            "Hidden delivery or restocking fees",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which is the BEST way to compare products?",
          options: [
            "Look at the brand logo",
            "Check unit price and reviews",
            "Only pick the cheapest item",
            "Choose the most expensive for quality",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "smart-shopping-basics",
        title: "Smart Shopping Basics",
        relationship: "prerequisite",
      },
      {
        moduleId: "understanding-subscriptions",
        title: "Understanding Subscriptions",
        relationship: "next-step",
      },
    ],

    points: 130,
    difficultyLevel: "intermediate",
    timeEstimate: 6,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Understanding Subscriptions
  // =====================================================
  {
    title: "Understanding Subscriptions",
    description:
      "Learn how subscription services work, how to avoid being overcharged, and how to track recurring costs.",
    categoryId: "spending-wisely",
    topic: "understanding-subscriptions",

    visual: {
      icon: "Repeat",
      iconColor: "bg-orange-800",
      badge: "Ongoing Spending",
      readTime: 5,
    },

    contentSections: [
      {
        id: "what-is-subscription",
        type: "header",
        title: "What Counts as a Subscription?",
        content:
          "Subscriptions include anything paid regularly — Netflix, gym memberships, phone contracts, cloud storage, and more.",
        icon: "CreditCard",
        colorScheme: "purple",
      },
      {
        id: "common-traps",
        type: "warning",
        title: "Subscription Traps",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Free trials that auto-renew",
            "Hard-to-cancel memberships",
            "Price increases without notification",
          ],
        },
      },
      {
        id: "manage-costs",
        type: "tip",
        title: "How to Manage Subscriptions",
        content: "",
        icon: "CheckCircle",
        colorScheme: "green",
        metadata: {
          tips: [
            "Review subscriptions once per month",
            "Cancel anything unused for 30+ days",
            "Use apps that track recurring bills",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of these is a subscription?",
          options: ["An Uber ride", "Netflix", "A one-time purchase", "Buying a laptop"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      {
        moduleId: "impulse-spending",
        title: "Impulse Spending & Behaviour Psychology",
        relationship: "next-step",
      },
    ],

    points: 110,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. Impulse Spending & Behaviour Psychology
  // =====================================================
  {
    title: "Impulse Spending & Behaviour Psychology",
    description:
      "Understand why we make impulse purchases, the psychology behind spending, and how to stay in control.",
    categoryId: "spending-wisely",
    topic: "impulse-spending",

    visual: {
      icon: "Brain",
      iconColor: "bg-orange-900",
      badge: "Mindset Insight",
      readTime: 7,
    },

    contentSections: [
      {
        id: "why-we-overspend",
        type: "header",
        title: "Why Do We Overspend?",
        content:
          "Marketing, emotions, stress, and social pressure can all trigger impulse buying — often without us realising.",
        icon: "Bolt",
        colorScheme: "yellow",
      },
      {
        id: "psych-factors",
        type: "list",
        title: "Psychological Triggers",
        content: "",
        icon: "Sparkles",
        colorScheme: "purple",
        metadata: {
          listItems: [
            "Sales and discounts",
            "Fear of missing out (FOMO)",
            "Stress or boredom",
            "Social media influence",
          ],
        },
      },
      {
        id: "control-spending",
        type: "tip",
        title: "How to Take Control",
        content: "",
        icon: "Hand",
        colorScheme: "green",
        metadata: {
          tips: [
            "Wait 24 hours before purchasing",
            "Use a shopping list",
            "Avoid browsing when emotional",
            "Set automatic spending alerts",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does FOMO stand for?",
          options: [
            "Full Option Money Offer",
            "Fear Of Missing Out",
            "Fast Online Market Order",
            "Free Or Monthly Option",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "smart-shopping-basics", title: "Smart Shopping Basics", relationship: "prerequisite" },
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
