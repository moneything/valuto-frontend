// backend/src/seeds/learning/earningIncomeSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Earning & Income — Learning Modules
 * Category ID: earning-income
 *
 * Includes:
 * 1. How Pay Works
 * 2. Different Types of Income
 * 3. Taxes 101
 * 4. Side Hustles & Freelancing
 * 5. Salary Negotiation Basics
 */

const earningIncomeModules = [
  // =====================================================
  // 1. How Pay Works
  // =====================================================
  {
    title: "How Pay Works",
    description: "Understand gross pay, net pay, payslips, deductions, and different types of pay structures.",
    categoryId: "earning-income",
    topic: "how-pay-works",

    visual: {
      icon: "TrendingUp",
      iconColor: "bg-green-500",
      badge: "Earning & Income",
      readTime: 3
    },

    contentSections: [
      /* ------------------------------------------------------------ */
      /* 1. GROSS VS NET PAY (twoColumn feature cards like Banking101) */
      /* ------------------------------------------------------------ */
      {
        id: "gross-vs-net",
        type: "list",
        title: "Gross vs Net Pay: The Big Difference",
        icon: "Calculator",
        metadata: {
          variant: "accountComparisonTwo",
          left: {
            title: "💰 Gross Pay",
            color: "green",
            subtitle: "Your pay BEFORE deductions",
            items: [
              "The amount advertised in job ads",
              "Your hourly rate × hours worked",
              "What you earn before anything is taken off",
              "Example: £10/hour × 20 hours = £200 gross"
            ]
          },
          right: {
            title: "💳 Net Pay",
            color: "blue",
            subtitle: "Your pay AFTER deductions",
            items: [
              "The money that actually hits your bank",
              "Gross pay minus taxes and deductions",
              "Also called 'take-home pay'",
              "Example: £200 gross - £15 tax = £185 net"
            ]
          }
        }
      },

      /* ------------------------------------------------------------ */
      /* 2. NET PAY INSIGHT TIP BOX                                    */
      /* ------------------------------------------------------------ */
      {
        id: "net-budget-tip",
        type: "tip",
        title: "Key Insight",
        icon: "Lightbulb",
        metadata: {
          variant: "lightbulb",
          tips: [
            "Always budget using your NET pay, not gross pay. That's the real money you can spend!"
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 3. PAYSLIP (payslip)                                          */
      /* ------------------------------------------------------------ */
      {
        id: "payslip-breakdown",
        type: "payslip",
        title: "Understanding Your Payslip",
        content: "Breaking down every section",
        icon: "FileText",
        metadata: {
          header: "📄 SAMPLE PAYSLIP",
          summaryRows: [
            { left: "Employee: Alex Johnson", right: "Pay Period: 01/01/24 - 31/01/24" }
          ],
          breakdown: [
            { left: "Basic Pay (£8.50 × 60 hours)", right: "£510.00" },
            { left: "Overtime (£12.75 × 5 hours)", right: "£63.75" },
            { left: "GROSS PAY", right: "£573.75", highlight: true }
          ],
          deductions: [
            { left: "Income Tax", right: "-£28.69" },
            { left: "National Insurance", right: "-£22.95" },
            { left: "Pension Contribution", right: "-£17.21" }
          ],
          netPay: {
            left: "NET PAY",
            right: "£504.90"
          }
        }
      },

      /* ------------------------------------------------------------ */
      /* 4. MINI INFO GRID (Income Tax, NI, Pension)                   */
      /* ------------------------------------------------------------ */
      {
        id: "payslip-mini-info",
        type: "miniInfoGrid",
        title: "Payslip Deductions Explained",
        metadata: {
          items: [
            {
              title: "Income Tax",
              description: "Tax on your earnings (starts at £12,570/year)",
              color: "blue"
            },
            {
              title: "National Insurance",
              description: "Contributes to NHS & pension (starts at £12,570)",
              color: "orange"
            },
            {
              title: "Pension",
              description: "Automatic retirement saving (3% minimum)",
              color: "purple"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 5. STUDENT TAX RULES (explanation + warning-style list)       */
      /* ------------------------------------------------------------ */
      {
        id: "student-tax-rules-info",
        type: "warning",
        title: "Special Rules for Student Jobs",
        colorScheme: "green",
        metadata: {
          warnings: [
            "If you earn under £12,570/year, you pay NO income tax",
            "If you earn under £12,570/year, you pay NO National Insurance",
            "Most part-time student jobs fall under these limits"
          ]
        }
      },

      {
        id: "student-tax-details",
        type: "list",
        title: "Annual Tax-Free Allowances (2024)",
        metadata: {
          listItems: [
            "Income Tax: £12,570",
            "National Insurance: £12,570",
            "Both calculated yearly, not monthly"
          ]
        }
      },

      {
        id: "weekly-meaning",
        type: "list",
        title: "What this means weekly",
        metadata: {
          listItems: [
            "£242/week tax-free",
            "About 30 hours at minimum wage",
            "Perfect for most student jobs!"
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 6. TYPES OF PAY STRUCTURE (stacked cards)                     */
      /* ------------------------------------------------------------ */
      {
        id: "pay-types",
        type: "payTypesStack",
        title: "Types of Pay Structure",
        metadata: {
          items: [
            {
              title: "💰 Hourly Pay",
              color: "blue",
              description: "Most common for students. Pay = hours × hourly rate",
              footer: "Example: 15 hours × £8.50 = £127.50"
            },
            {
              title: "📅 Salary",
              color: "green",
              description: "Fixed annual amount, paid monthly regardless of hours",
              footer: "Example: £25,000/year = £2,083/month"
            },
            {
              title: "📈 Commission",
              color: "purple",
              description: "Earn based on sales or performance",
              footer: "Example: £200 base + 5% of sales"
            },
            {
              title: "💪 Piece Rate",
              color: "orange",
              description: "Paid per item/task completed",
              footer: "Example: £2 per delivery completed"
            }
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
          question: "What is the term for your pay BEFORE any deductions?",
          options: ["Gross pay", "Net pay", "Take-home pay", "Basic pay"],
          correctAnswer: 0,
          explanation: "Gross pay is the amount you earn before any deductions."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    /* RELATED LESSONS                                              */
    /* ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "part-time-jobs",
        title: "Part-Time Jobs Guide",
        relationship: "next-step"
      },
      {
        moduleId: "tax-basics",
        title: "Tax Basics",
        relationship: "related"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting with Your Pay",
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
