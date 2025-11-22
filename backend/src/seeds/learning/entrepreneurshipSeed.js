// backend/src/seeds/learning/entrepreneurshipSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Entrepreneurship — Learning Modules
 * Category ID: entrepreneurship
 *
 * Includes:
 * 1. Introduction to Entrepreneurship
 * 2. Starting a Business: Step-by-Step
 * 3. Pricing Your Products & Services
 * 4. Cash Flow Management
 * 5. Marketing Basics for Beginners
 */

const entrepreneurshipModules = [
  // =====================================================
  // 1. Introduction to Entrepreneurship
  // =====================================================
  {
    title: "Introduction to Entrepreneurship",
    description: "Learn what entrepreneurship is and what it takes to start a successful venture.",
    categoryId: "entrepreneurship",
    topic: "intro-to-entrepreneurship",

    visual: {
      icon: "Briefcase",
      iconColor: "bg-red-500",
      badge: "Starter Module",
      readTime: 5,
    },

    contentSections: [
      {
        id: "what-is-entrepreneurship",
        type: "header",
        title: "What Is Entrepreneurship?",
        content:
          "Entrepreneurship means creating value by turning ideas into products or services that people want or need.",
        icon: "Lightbulb",
        colorScheme: "red",
      },
      {
        id: "traits-of-entrepreneurs",
        type: "list",
        title: "Traits of Successful Entrepreneurs",
        content: "",
        icon: "UserCheck",
        colorScheme: "orange",
        metadata: {
          listItems: [
            "Self-motivation",
            "Creativity",
            "Resilience",
            "Willingness to take calculated risks",
            "Problem-solving mindset",
          ],
        },
      },
      {
        id: "myths",
        type: "warning",
        title: "Common Myths About Entrepreneurship",
        content: "",
        icon: "AlertCircle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "You need a lot of money to start — false",
            "You must quit your job — false",
            "It’s all about having a ‘big idea’ — false",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of these is a common entrepreneurial trait?",
          options: ["Fear of failure", "Resilience", "Avoiding risk at all costs", "Never asking for help"],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "startup-step-by-step", title: "Starting a Business Step-by-Step", relationship: "next-step" },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 1,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 2. Starting a Business: Step-by-Step
  // =====================================================
  {
    title: "Starting a Business: Step-by-Step",
    description: "A clear roadmap to turning your idea into a real business.",
    categoryId: "entrepreneurship",
    topic: "startup-step-by-step",

    visual: {
      icon: "ClipboardList",
      iconColor: "bg-red-600",
      badge: "Roadmap",
      readTime: 7,
    },

    contentSections: [
      {
        id: "idea-validation",
        type: "steps",
        title: "Step 1: Validate Your Idea",
        content: "Before building anything, ensure people actually want it.",
        icon: "CheckCircle",
        colorScheme: "green",
        metadata: {
          steps: [
            { number: 1, text: "Identify a problem worth solving" },
            { number: 2, text: "Find your target customer" },
            { number: 3, text: "Talk to real people and gather feedback" },
          ],
        },
      },
      {
        id: "legal-setup",
        type: "list",
        title: "Step 2: Legal Setup",
        content: "",
        icon: "FileText",
        colorScheme: "blue",
        metadata: {
          listItems: [
            "Register your business",
            "Understand tax responsibilities",
            "Choose a business structure (sole trader, LTD, etc.)",
          ],
        },
      },
      {
        id: "minimal-product",
        type: "header",
        title: "Step 3: Build an MVP",
        content:
          "Create a Minimum Viable Product — the simplest version of your idea that solves the problem.",
        icon: "Layers",
        colorScheme: "purple",
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is the purpose of an MVP?",
          options: [
            "Build the full product immediately",
            "Test the simplest version of your idea quickly",
            "Raise investor money",
            "Eliminate all risks",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "pricing-basics", title: "Pricing Your Products", relationship: "next-step" },
      { moduleId: "intro-to-entrepreneurship", title: "Introduction to Entrepreneurship", relationship: "prerequisite" },
    ],

    points: 120,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 3. Pricing Your Products & Services
  // =====================================================
  {
    title: "Pricing Your Products & Services",
    description:
      "Learn how to set prices that cover costs, deliver value, and generate profit.",
    categoryId: "entrepreneurship",
    topic: "pricing-basics",

    visual: {
      icon: "PoundSterling",
      iconColor: "bg-red-700",
      badge: "Core Skill",
      readTime: 6,
    },

    contentSections: [
      {
        id: "cost-based-pricing",
        type: "explanation",
        title: "Cost-Based Pricing",
        content:
          "Start by knowing your costs — materials, time, fees — then add a profit margin.",
        icon: "Calculator",
        colorScheme: "green",
      },
      {
        id: "value-based-pricing",
        type: "explanation",
        title: "Value-Based Pricing",
        content:
          "Price based on the value your product/service provides — not just what it costs to make.",
        icon: "TrendingUp",
        colorScheme: "yellow",
      },
      {
        id: "pricing-mistakes",
        type: "warning",
        title: "Common Pricing Mistakes",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Underpricing to attract customers",
            "Ignoring your time as a cost",
            "No profit margin",
            "Copying competitors blindly",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What is value-based pricing?",
          options: ["Pricing based on cost", "Pricing based on competitor prices", "Pricing based on customer value", "Guessing a price"],
          correctAnswer: 2,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "startup-step-by-step", title: "Starting a Business Step-by-Step", relationship: "prerequisite" },
      { moduleId: "cashflow-management", title: "Cash Flow Management", relationship: "next-step" },
    ],

    points: 120,
    difficultyLevel: "intermediate",
    timeEstimate: 6,
    order: 3,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 4. Cash Flow Management
  // =====================================================
  {
    title: "Cash Flow Management",
    description:
      "Cash flow is the lifeblood of any business — learn how to manage it effectively.",
    categoryId: "entrepreneurship",
    topic: "cashflow-management",

    visual: {
      icon: "ArrowLeftRight",
      iconColor: "bg-red-800",
      badge: "Financial Skill",
      readTime: 7,
    },

    contentSections: [
      {
        id: "what-is-cashflow",
        type: "header",
        title: "What Is Cash Flow?",
        content:
          "Cash flow is the movement of money in and out of your business. Positive cash flow means more money coming in than going out.",
        icon: "Coins",
        colorScheme: "yellow",
      },
      {
        id: "cashflow-tips",
        type: "list",
        title: "Improve Cash Flow",
        content: "",
        icon: "CheckCircle",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Invoice clients quickly",
            "Set clear payment terms",
            "Avoid unnecessary expenses",
            "Keep a cash buffer",
          ],
        },
      },
      {
        id: "cashflow-risks",
        type: "warning",
        title: "Cash Flow Risks",
        content: "",
        icon: "AlertTriangle",
        colorScheme: "red",
        metadata: {
          warnings: [
            "Relying on one client",
            "Not tracking expenses",
            "Late invoicing",
            "Overtrading (growing too fast)",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "What does positive cash flow mean?",
          options: [
            "More money going out than coming in",
            "More money coming in than going out",
            "No transactions happening",
            "All money is profit",
          ],
          correctAnswer: 1,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "pricing-basics", title: "Pricing Your Products", relationship: "prerequisite" },
      { moduleId: "marketing-basics", title: "Marketing Basics", relationship: "next-step" },
    ],

    points: 120,
    difficultyLevel: "intermediate",
    timeEstimate: 7,
    order: 4,
    isActive: true,
    createdBy: "system",
  },

  // =====================================================
  // 5. Marketing Basics for Beginners
  // =====================================================
  {
    title: "Marketing Basics for Beginners",
    description:
      "Learn how to promote your business, attract customers, and build trust without big budgets.",
    categoryId: "entrepreneurship",
    topic: "marketing-basics",

    visual: {
      icon: "Megaphone",
      iconColor: "bg-red-900",
      badge: "Growth Skill",
      readTime: 6,
    },

    contentSections: [
      {
        id: "what-is-marketing",
        type: "header",
        title: "What Is Marketing?",
        content:
          "Marketing is how you communicate the value of your product or service to the right people.",
        icon: "Megaphone",
        colorScheme: "yellow",
      },
      {
        id: "4ps",
        type: "steps",
        title: "The 4 Ps of Marketing",
        content: "",
        icon: "Layers",
        colorScheme: "blue",
        metadata: {
          steps: [
            { number: 1, text: "Product — What you're offering" },
            { number: 2, text: "Price — What it costs" },
            { number: 3, text: "Place — Where it's sold" },
            { number: 4, text: "Promotion — How customers hear about it" },
          ],
        },
      },
      {
        id: "low-budget-marketing",
        type: "list",
        title: "Low-Budget Marketing Ideas",
        content: "",
        icon: "Sparkles",
        colorScheme: "green",
        metadata: {
          listItems: [
            "Social media content",
            "Referrals and word-of-mouth",
            "Local community events",
            "Collaborations with other small businesses",
          ],
        },
      },
    ],

    quiz: {
      questions: [
        {
          question: "Which of the 4 Ps refers to how customers find out about your product?",
          options: ["Price", "Product", "Promotion", "Place"],
          correctAnswer: 2,
        },
      ],
      passingScore: 1,
    },

    relatedLessons: [
      { moduleId: "cashflow-management", title: "Cash Flow Management", relationship: "prerequisite" },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 5,
    isActive: true,
    createdBy: "system",
  },
];

// =====================================================
// Seed Function
// =====================================================
async function seedEntrepreneurship() {
  try {
    for (const module of entrepreneurshipModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Entrepreneurship modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Entrepreneurship:", error);
  }
}

module.exports = {
  entrepreneurshipModules,
  seedEntrepreneurship,
};
