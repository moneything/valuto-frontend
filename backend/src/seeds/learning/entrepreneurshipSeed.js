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
  {
    title: "How to Start a Business",
    description:
      "Step by step in simple language",
    topic: "how-to-start-a-business",
    categoryId: "entrepreneurship",

    visual: {
      icon: "Briefcase",
      iconColor: "bg-red-500",
      badge: "Entrepreneurship",
      readTime: 3,
    },

    difficultyLevel: "beginner",
    points: 100,
    timeEstimate: 3,
    order: 1,
    isActive: true,
    createdBy: "system",

    uiTree: [
      {
        type: "div",
        children: [
          {
            type: "div",
            props: {
              className: "container mx-auto max-w-4xl",
            },
            children: [
              {
                type: "div",
                props: { className: "grid gap-6" },
                children: [
                  // Card 1: Reality Check
                  {
                    type: "Card",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "CardTitle",
                            children: [
                              {
                                type: "div",
                                props: {
                                  className: "flex items-center gap-2",
                                },
                                children: [
                                  {
                                    type: "Lightbulb",
                                    props: { className: "h-5 w-5" },
                                  },
                                  {
                                    type: "span",
                                    children: [
                                      "Before You Start: The Reality Check",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "CardContent",
                        props: { className: "space-y-4" },
                        children: [
                          {
                            type: "p",
                            children: [
                              "Starting a business is exciting, but it's not a get-rich-quick scheme. Most successful businesses take years to build, require hard work, and many fail. However, for the right person with the right idea, it can be incredibly rewarding both financially and personally.",
                            ],
                          },
                          {
                            type: "div",
                            props: {
                              className:
                                "bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4",
                            },
                            children: [
                              {
                                type: "h4",
                                props: { className: "font-semibold mb-2" },
                                children: ["Key Statistics:"],
                              },
                              {
                                type: "ul",
                                props: { className: "text-sm space-y-1" },
                                children: [
                                  {
                                    type: "li",
                                    children: [
                                      "• 60% of new businesses survive the first 3 years",
                                    ],
                                  },
                                  {
                                    type: "li",
                                    children: ["• 40% survive 5 years"],
                                  },
                                  {
                                    type: "li",
                                    children: [
                                      "• Only 25% make it to 15 years",
                                    ],
                                  },
                                  {
                                    type: "li",
                                    children: [
                                      "• Average startup takes 2–3 years to become profitable",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },

                  // Card 2: Step-by-step guide
                  {
                    type: "Card",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "CardTitle",
                            children: ["Step-by-Step Business Starting Guide"],
                          },
                        ],
                      },
                      {
                        type: "CardContent",
                        props: { className: "space-y-4" },
                        children: [
                          // Step 1
                          {
                            type: "div",
                            props: {
                              className:
                                "flex items-start gap-3 p-4 border rounded-lg",
                            },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className:
                                    "w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold",
                                },
                                children: ["1"],
                              },
                              {
                                type: "div",
                                props: { className: "flex-1" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold mb-2" },
                                    children: ["Validate Your Business Idea"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground mb-2",
                                    },
                                    children: [
                                      "Before investing time and money, make sure people actually want what you're selling.",
                                    ],
                                  },
                                  {
                                    type: "ul",
                                    props: {
                                      className: "text-xs space-y-1",
                                    },
                                    children: [
                                      {
                                        type: "li",
                                        children: [
                                          "• Talk to potential customers (at least 50 people)",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Research your competition online",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Create a simple landing page to test interest",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Try to get pre-orders or commitments",
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },

                          // Step 2
                          {
                            type: "div",
                            props: {
                              className:
                                "flex items-start gap-3 p-4 border rounded-lg",
                            },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className:
                                    "w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold",
                                },
                                children: ["2"],
                              },
                              {
                                type: "div",
                                props: { className: "flex-1" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold mb-2" },
                                    children: ["Write a Simple Business Plan"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground mb-2",
                                    },
                                    children: [
                                      "Don't overcomplicate it. One page is fine to start.",
                                    ],
                                  },
                                  {
                                    type: "ul",
                                    props: {
                                      className: "text-xs space-y-1",
                                    },
                                    children: [
                                      {
                                        type: "li",
                                        children: [
                                          "• What problem are you solving?",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Who is your target customer?",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• How will you make money?",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• What are your startup costs?",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• How much revenue do you need to survive?",
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },

                          // Step 3
                          {
                            type: "div",
                            props: {
                              className:
                                "flex items-start gap-3 p-4 border rounded-lg",
                            },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className:
                                    "w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold",
                                },
                                children: ["3"],
                              },
                              {
                                type: "div",
                                props: { className: "flex-1" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold mb-2" },
                                    children: [
                                      "Choose Your Business Structure",
                                    ],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground mb-2",
                                    },
                                    children: [
                                      "Start simple, you can always change later.",
                                    ],
                                  },
                                  {
                                    type: "div",
                                    props: {
                                      className:
                                        "grid md:grid-cols-2 gap-3 text-xs",
                                    },
                                    children: [
                                      {
                                        type: "div",
                                        props: {
                                          className:
                                            "p-2 bg-green-50 dark:bg-green-950/20 rounded",
                                        },
                                        children: [
                                          {
                                            type: "p",
                                            children: [
                                              {
                                                type: "strong",
                                                children: [
                                                  "Sole Trader (Simplest):",
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            type: "p",
                                            children: [
                                              "• Easy to set up (just register with HMRC)",
                                            ],
                                          },
                                          {
                                            type: "p",
                                            children: [
                                              "• You are personally liable",
                                            ],
                                          },
                                          {
                                            type: "p",
                                            children: [
                                              "• Pay income tax on profits",
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        type: "div",
                                        props: {
                                          className:
                                            "p-2 bg-blue-50 dark:bg-blue-950/20 rounded",
                                        },
                                        children: [
                                          {
                                            type: "p",
                                            children: [
                                              {
                                                type: "strong",
                                                children: ["Limited Company:"],
                                              },
                                            ],
                                          },
                                          {
                                            type: "p",
                                            children: [
                                              "• More protection, professional image",
                                            ],
                                          },
                                          {
                                            type: "p",
                                            children: [
                                              "• More paperwork and costs",
                                            ],
                                          },
                                          {
                                            type: "p",
                                            children: [
                                              "• Pay corporation tax",
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },

                          // Step 4
                          {
                            type: "div",
                            props: {
                              className:
                                "flex items-start gap-3 p-4 border rounded-lg",
                            },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className:
                                    "w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold",
                                },
                                children: ["4"],
                              },
                              {
                                type: "div",
                                props: { className: "flex-1" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold mb-2" },
                                    children: ["Sort Out the Legal Stuff"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground mb-2",
                                    },
                                    children: [
                                      "Don't skip this - it protects you and your customers.",
                                    ],
                                  },
                                  {
                                    type: "ul",
                                    props: {
                                      className: "text-xs space-y-1",
                                    },
                                    children: [
                                      {
                                        type: "li",
                                        children: ["• Register with HMRC for tax"],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Get business insurance if needed",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Check if you need special licenses/permits",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Open a business bank account",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Understand data protection rules (GDPR)",
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },

                          // Step 5
                          {
                            type: "div",
                            props: {
                              className:
                                "flex items-start gap-3 p-4 border rounded-lg",
                            },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className:
                                    "w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold",
                                },
                                children: ["5"],
                              },
                              {
                                type: "div",
                                props: { className: "flex-1" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold mb-2" },
                                    children: ["Start Small and Test"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground mb-2",
                                    },
                                    children: [
                                      "Don't quit your day job immediately. Test your business part-time first.",
                                    ],
                                  },
                                  {
                                    type: "ul",
                                    props: {
                                      className: "text-xs space-y-1",
                                    },
                                    children: [
                                      {
                                        type: "li",
                                        children: [
                                          "• Start with minimum viable product (MVP)",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Keep your current income while testing",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Get your first 10 customers",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Learn from their feedback",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: ["• Gradually scale up"],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },

                  // Card 3: Essential Tools
                  {
                    type: "Card",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "CardTitle",
                            children: [
                              {
                                type: "div",
                                props: {
                                  className: "flex items-center gap-2",
                                },
                                children: [
                                  {
                                    type: "FileText",
                                    props: { className: "h-5 w-5" },
                                  },
                                  {
                                    type: "span",
                                    children: [
                                      "Essential Tools for New Businesses",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "CardContent",
                        props: { className: "space-y-4" },
                        children: [
                          {
                            type: "div",
                            props: { className: "grid md:grid-cols-2 gap-4" },
                            children: [
                              {
                                type: "div",
                                props: { className: "space-y-3" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold" },
                                    children: ["Free/Cheap Tools:"],
                                  },
                                  {
                                    type: "ul",
                                    props: {
                                      className: "text-sm space-y-1",
                                    },
                                    children: [
                                      {
                                        type: "li",
                                        children: [
                                          "• ",
                                          {
                                            type: "strong",
                                            children: ["Website:"],
                                          },
                                          " WordPress, Wix, Squarespace",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• ",
                                          {
                                            type: "strong",
                                            children: ["Email:"],
                                          },
                                          " Gmail, Outlook",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• ",
                                          {
                                            type: "strong",
                                            children: ["Accounting:"],
                                          },
                                          " FreeAgent, Xero (cheap)",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• ",
                                          {
                                            type: "strong",
                                            children: ["Social Media:"],
                                          },
                                          " Instagram, LinkedIn, TikTok",
                                        ],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• ",
                                          {
                                            type: "strong",
                                            children: ["Communication:"],
                                          },
                                          " WhatsApp Business, Zoom",
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "div",
                                props: { className: "space-y-3" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold" },
                                    children: ["What You DON'T Need Initially:"],
                                  },
                                  {
                                    type: "ul",
                                    props: {
                                      className: "text-sm space-y-1",
                                    },
                                    children: [
                                      {
                                        type: "li",
                                        children: ["• Expensive office space"],
                                      },
                                      {
                                        type: "li",
                                        children: ["• Complex software systems"],
                                      },
                                      {
                                        type: "li",
                                        children: ["• Huge inventory"],
                                      },
                                      {
                                        type: "li",
                                        children: ["• Multiple employees"],
                                      },
                                      {
                                        type: "li",
                                        children: [
                                          "• Professional logo/branding (yet)",
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },

                  // Card 4: Common Beginner Mistakes
                  {
                    type: "Card",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "CardTitle",
                            children: ["Common Beginner Mistakes"],
                          },
                        ],
                      },
                      {
                        type: "CardContent",
                        props: { className: "space-y-4" },
                        children: [
                          {
                            type: "div",
                            props: { className: "space-y-3" },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className:
                                    "p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800",
                                },
                                children: [
                                  {
                                    type: "h4",
                                    props: {
                                      className:
                                        "font-semibold text-red-700 dark:text-red-400 mb-1",
                                    },
                                    children: ["❌ Perfectionism"],
                                  },
                                  {
                                    type: "p",
                                    props: { className: "text-sm" },
                                    children: [
                                      'Waiting for the "perfect" product, logo, or website. Start imperfect and improve.',
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "div",
                                props: {
                                  className:
                                    "p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800",
                                },
                                children: [
                                  {
                                    type: "h4",
                                    props: {
                                      className:
                                        "font-semibold text-red-700 dark:text-red-400 mb-1",
                                    },
                                    children: ["❌ No Market Research"],
                                  },
                                  {
                                    type: "p",
                                    props: { className: "text-sm" },
                                    children: [
                                      "Building something nobody wants. Talk to customers BEFORE building.",
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "div",
                                props: {
                                  className:
                                    "p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800",
                                },
                                children: [
                                  {
                                    type: "h4",
                                    props: {
                                      className:
                                        "font-semibold text-red-700 dark:text-red-400 mb-1",
                                    },
                                    children: ["❌ Overspending"],
                                  },
                                  {
                                    type: "p",
                                    props: { className: "text-sm" },
                                    children: [
                                      "Expensive equipment, offices, and tools before revenue. Bootstrap as much as possible.",
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "div",
                                props: {
                                  className:
                                    "p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800",
                                },
                                children: [
                                  {
                                    type: "h4",
                                    props: {
                                      className:
                                        "font-semibold text-red-700 dark:text-red-400 mb-1",
                                    },
                                    children: ["❌ Quitting Too Early"],
                                  },
                                  {
                                    type: "p",
                                    props: { className: "text-sm" },
                                    children: [
                                      "Giving up after a few rejections. Most successful businesses take years to build.",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },

                  // Card 5: Student-Friendly Business Ideas
                  {
                    type: "Card",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "CardTitle",
                            children: ["Student-Friendly Business Ideas"],
                          },
                        ],
                      },
                      {
                        type: "CardContent",
                        props: { className: "space-y-4" },
                        children: [
                          {
                            type: "div",
                            props: { className: "grid gap-3" },
                            children: [
                              {
                                type: "div",
                                props: { className: "p-3 border rounded-lg" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold" },
                                    children: ["Low-Cost Service Businesses:"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground",
                                    },
                                    children: [
                                      "Tutoring, social media management, content writing, graphic design, dog walking, cleaning services, photography",
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "div",
                                props: { className: "p-3 border rounded-lg" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold" },
                                    children: ["Online Businesses:"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground",
                                    },
                                    children: [
                                      "Dropshipping, affiliate marketing, online courses, YouTube channel, blog with ads, app development",
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "div",
                                props: { className: "p-3 border rounded-lg" },
                                children: [
                                  {
                                    type: "h4",
                                    props: { className: "font-semibold" },
                                    children: ["Skills-Based:"],
                                  },
                                  {
                                    type: "p",
                                    props: {
                                      className:
                                        "text-sm text-muted-foreground",
                                    },
                                    children: [
                                      "Web development, mobile apps, consulting in your field of study, language tutoring, music lessons",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "div",
                            props: {
                              className:
                                "bg-primary/10 p-4 rounded-lg border-l-4 border-primary",
                            },
                            children: [
                              {
                                type: "h4",
                                props: { className: "font-semibold mb-2" },
                                children: ["Student Advantage:"],
                              },
                              {
                                type: "p",
                                props: { className: "text-sm" },
                                children: [
                                  "You have time, energy, digital nativity, and low living costs. Plus university resources, networking opportunities, and less financial pressure than people with mortgages and families!",
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },

                ],
              },
            ],
          },
        ],
      },
    ],

    quiz: {
      passingScore: 2,
      questions: [
        {
          question: "What's the first step when starting a business?",
          options: [
            "Quit your job immediately",
            "Research your market and validate your idea",
            "Borrow as much money as possible",
            "Register a company name",
          ],
          correctAnswer: 1,
          explanation:
            "Before spending lots of time and money, you need to check that real customers actually want what you're planning to sell.",
        },
        {
          question: "What's the minimum you need to start a limited company in the UK?",
          options: ["£10,000", "£1,000", "£100", "£1"],
          correctAnswer: 3,
          explanation:
            "In the UK, you can register a limited company with as little as £1 share capital. The real costs are things like filing fees, accounting, and ongoing admin.",
        },
        {
          question: "Which business structure is simplest for most new entrepreneurs?",
          options: [
            "Limited company",
            "Partnership",
            "Sole trader",
            "Public limited company",
          ],
          correctAnswer: 2,
          explanation:
            "Sole trader is usually the simplest way to start: easy to register, less paperwork, and you can always switch to a limited company later.",
        },
      ],
    },

    relatedLessons: [
      {
        moduleId: "business-models",
        title: "Business Models",
        relationship: "next-step",
      },
      {
        moduleId: "risk-vs-reward",
        title: "Risk vs Reward",
        relationship: "related",
      },
      {
        moduleId: "real-stories-of-young-entrepreneurs",
        title: "Real Stories of Young Entrepreneurs",
        relationship: "related",
      },
    ],
  },

  {
    title: "Business Models",
    description: "Understand how businesses make money, from shops and online stores to subscription and service models.",
    categoryId: "entrepreneurship",
    topic: "business-models",
    visual: {
      icon: "Store",
      iconColor: "bg-red-500",
      badge: "Entrepreneurship",
      readTime: 2
    },
    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [
                { "type": "CardTitle", "children": ["What Is a Business Model?"] }
              ]},
              { "type": "CardContent", "props": { "className": "space-y-4" }, "children": [
                { "type": "p", "children": [
                  "A business model is simply how your business makes money. It's your plan for creating, delivering, and capturing value. Understanding different models helps you choose the best approach for your idea and situation."
                ]},
                {
                  "type": "div",
                  "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                  "children": [
                    { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Key Questions Every Business Model Answers:"] },
                    {
                      "type": "ul",
                      "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                      "children": [
                        { "type": "li", "children": ["Who are your customers?"] },
                        { "type": "li", "children": ["What value do you provide them?"] },
                        { "type": "li", "children": ["How do you reach customers?"] },
                        { "type": "li", "children": ["How do you make money?"] },
                        { "type": "li", "children": ["What are your main costs?"] }
                      ]
                    }
                  ]
                }
              ]}
            ]
          },

          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [
                {
                  "type": "CardTitle",
                  "props": { "className": "flex items-center gap-2" },
                  "children": [
                    { "type": "Store", "props": { "className": "h-5 w-5" } },
                    "Traditional Retail Models"
                  ]
                }
              ]},
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Physical Store"] },
                          {
                            "type": "p",
                            "props": { "className": "text-sm text-muted-foreground mb-2" },
                            "children": [
                              "Buy products, sell them in a physical location for a markup."
                            ]
                          },
                          {
                            "type": "div",
                            "props": { "className": "grid grid-cols-2 gap-2 text-xs" },
                            "children": [
                              { "type": "p", "children": [{ "type": "strong", "children": ["Pros:"] }, " Personal service, immediate gratification, local community"] },
                              { "type": "p", "children": [{ "type": "strong", "children": ["Cons:"] }, " High rent, limited hours, local customer base only"] }
                            ]
                          },
                          { "type": "p", "props": { "className": "text-xs mt-2" }, "children": [{ "type": "strong", "children": ["Examples:"] }, " Corner shop, boutique clothing store, local café"] }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["E-commerce Store"] },
                          {
                            "type": "p",
                            "props": { "className": "text-sm text-muted-foreground mb-2" },
                            "children": [
                              "Sell products online through your own website or platforms like Amazon."
                            ]
                          },
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-2 gap-2 text-xs" },
                            "children": [
                              { "type": "p", "children": [{ "type": "strong", "children": ["Pros:"] }, " Global reach, 24/7 sales, lower overhead than physical stores"] },
                              { "type": "p", "children": [{ "type": "strong", "children": ["Cons:"] }, " Competition, shipping logistics, no personal touch"] }
                            ]
                          },
                          { "type": "p", "props": { "className": "text-xs mt-2" }, "children": [{ "type": "strong", "children": ["Examples:"] }, " Shopify store, Amazon seller, Etsy shop"] }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg bg-green-50 dark:bg-green-950/20" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Dropshipping"] },
                          {
                            "type": "p",
                            "props": { "className": "text-sm text-muted-foreground mb-2" },
                            "children": [
                              "Sell products online without holding inventory. Supplier ships directly to customer."
                            ]
                          },
                          { "type": "div", "props": { "className": "grid md:grid-cols-2 gap-2 text-xs" }, "children": [
                            { "type": "p", "children": [{ "type": "strong", "children": ["Pros:"] }, " Low startup costs, no inventory risk, location independent"] },
                            { "type": "p", "children": [{ "type": "strong", "children": ["Cons:"] }, " Low margins, no quality control, shipping delays"] }
                          ]},
                          { "type": "p", "props": { "className": "text-xs text-green-700 mt-2" }, "children": [
                            { "type": "strong", "children": ["Student-Friendly:"] },
                            " Can start with under £100"
                          ] }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [
                {
                  "type": "CardTitle",
                  "props": { "className": "flex items-center gap-2" },
                  "children": [
                    { "type": "Users", "props": { "className": "h-5 w-5" } },
                    "Service-Based Models"
                  ]
                }
              ]},
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Freelancing / Consulting"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground mb-2" }, "children": ["Sell your skills and time to clients on a project or hourly basis."]},
                          { "type": "div", "props": { "className": "grid md:grid-cols-2 gap-2 text-xs" }, "children": [
                            { "type": "p", "children": [{ "type": "strong", "children": ["Pros:"] }, " No inventory, high margins, flexible schedule"] },
                            { "type": "p", "children": [{ "type": "strong", "children": ["Cons:"] }, " Trading time for money, income can be unpredictable"] }
                          ]},
                          { "type": "p", "props": { "className": "text-xs text-blue-700" }, "children": [
                            { "type": "strong", "children": ["Examples:"] },
                            " Graphic design, tutoring, web development"
                          ]}
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Subscription Services"] },
                          { "type": "p", "props": { "className": "text-sm mb-2 text-muted-foreground" }, "children": [
                            "Customers pay monthly or yearly for an ongoing service."
                          ]},
                          { "type": "div", "props": { "className": "grid md:grid-cols-2 gap-2 text-xs" }, "children": [
                            { "type": "p", "children": [{ "type": "strong", "children": ["Pros:"] }, " Predictable revenue, high customer lifetime value"] },
                            { "type": "p", "children": [{ "type": "strong", "children": ["Cons:"] }, " Need to constantly provide value, high churn risk"] }
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Examples:"] },
                            " Spotify, Netflix, meal kits"
                          ] }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Marketplace / Platform"] },
                          { "type": "p", "props": { "className": "text-sm mb-2 text-muted-foreground" }, "children": [
                            "Connect buyers and sellers, take a fee or commission."
                          ]},
                          { "type": "div", "props": { "className": "grid md:grid-cols-2 gap-2 text-xs" }, "children": [
                            { "type": "p", "children": [{ "type": "strong", "children": ["Pros:"] }, " Scalable, network effects, recurring revenue"] },
                            { "type": "p", "children": [{ "type": "strong", "children": ["Cons:"] }, " Chicken-and-egg problem, complex to build"] }
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Examples:"] },
                            " Uber, Airbnb, Etsy, Upwork"
                          ]}
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [
                {
                  "type": "CardTitle",
                  "props": { "className": "flex items-center gap-2" },
                  "children": [
                    { "type": "Laptop", "props": { "className": "h-5 w-5" } },
                    "Digital Business Models"
                  ]
                }
              ]},
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [
                          {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg bg-purple-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Content Creator"] },
                          { "type": "p", "props": { "className": "text-sm mb-2 text-muted-foreground" }, "children": ["Create content, monetize through ads, sponsorships, or product sales."] },
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Revenue streams:"] },
                            " YouTube ads, sponsored posts, affiliate marketing, course sales"
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Examples:"] },
                            " YouTuber, blogger, podcaster, social media influencer"
                          ]}
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Digital Products"] },
                          { "type": "p", "props": { "className": "text-sm mb-2 text-muted-foreground" }, "children": [
                            "Create once, sell many times with no physical inventory."
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Examples:"] },
                            " eBooks, templates, online courses"
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Benefits:"] },
                            " High margins, scalable, location independent"
                          ]}
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Software as a Service (SaaS)"] },
                          { "type": "p", "props": { "className": "text-sm mb-2 text-muted-foreground" }, "children": [
                            "Monthly subscription for access to software/app functionality."
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Examples:"] },
                            " Notion, Canva, project management tools"
                          ]},
                          { "type": "p", "props": { "className": "text-xs" }, "children": [
                            { "type": "strong", "children": ["Challenge:"] },
                            " HRequires technical skills but can be very profitable"
                          ]}
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [
                { "type": "CardTitle", "children": ["Choosing the Right Model for You"] }
              ]},
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "space-y-3" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Consider Your:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Available startup capital"] },
                              { "type": "li", "children": ["Skills and experience"] },
                              { "type": "li", "children": ["Time commitment available"] },
                              { "type": "li", "children": ["Risk tolerance"] },
                              { "type": "li", "children": ["Lifestyle preferences"] },
                              { "type": "li", "children": ["Technical abilities"] }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "space-y-3" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Student-Friendly Models:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Freelancing / consulting"] },
                              { "type": "li", "children": ["Dropshipping"] },
                              { "type": "li", "children": ["Digital products"] },
                              { "type": "li", "children": ["Content creation"] },
                              { "type": "li", "children": ["Service businesses"] },
                              { "type": "li", "children": ["Tutoring / teaching"] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-primary/10 p-4 rounded-lg border-l-4 border-primary" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Start Small, Think Big:"] },
                      {
                        "type": "p",
                        "props": { "className": "text-sm" },
                        "children": [
                          "You don't need to choose one model forever. Many successful businesses combine multiple models or evolve over time. Start with what you can manage now and expand later."
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What's the main advantage of a subscription business model?",
          options: [
            "One-time large payment",
            "Predictable recurring revenue",
            "No customer service needed",
            "Lower prices for customers"
          ],
          correctAnswer: 1,
          explanation: "Subscriptions provide stable, predictable monthly income."
        },
        {
          question: "Which business model requires the least upfront inventory?",
          options: [
            "Traditional retail store",
            "Manufacturing",
            "Dropshipping",
            "Restaurant"
          ],
          correctAnswer: 2,
          explanation: "Dropshipping doesn’t require you to buy or hold stock."
        },
        {
          question: "What's a marketplace business model?",
          options: [
            "Buying and selling your own products",
            "Connecting buyers and sellers for a fee",
            "Only selling services",
            "Renting physical space"
          ],
          correctAnswer: 1,
          explanation: "Marketplaces connect users and take a fee per transaction."
        }
      ],
      passingScore: 2
    },
    relatedLessons: [
      {
        moduleId: "risk-vs-reward",
        title: "Risk vs Reward",
        relationship: "next-step"
      },
      {
        moduleId: "how-to-start-a-business",
        title: "How to Start a Business",
        relationship: "related"
      },
      {
        moduleId: "real-stories-of-young-entrepreneurs",
        title: "Real Stories of Young Entrepreneurs",
        relationship: "related"
      }
    ],
    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 1,
    isActive: true,
    createdBy: "system"
  },

  {
    title: "Risk vs Reward in Business",
    description: "Understanding entrepreneurial risks",
    categoryId: "entrepreneurship",
    topic: "risk-vs-reward",
    visual: {
      icon: "Scale",
      iconColor: "bg-red-500",
      badge: "Entrepreneurship",
      readTime: 2
    },
    uiTree: 
      [
        {
          "type": "div",
          "props": { "className": "grid gap-6" },
          "children": [
            {
              "type": "Card",
              "props": {},
              "children": [
                {
                  "type": "CardHeader",
                  "children": [
                    {
                      "type": "CardTitle",
                      "props": { "className": "flex items-center gap-2" },
                      "children": [
                        { "type": "Scale", "props": { "className": "h-5 w-5" } },
                        "The Risk-Reward Relationship"
                      ]
                    }
                  ]
                },
                {
                  "type": "CardContent",
                  "props": { "className": "space-y-4" },
                  "children": [
                    {
                      "type": "p",
                      "children": [
                        "In business, risk and reward are closely linked. Generally, the possibility of higher rewards comes with higher risks. Understanding this relationship helps you make smarter decisions about which opportunities to pursue and how to pursue them."
                      ]
                    },
                    {
                      "type": "div",
                      "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                      "children": [
                        { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["The Golden Rule:"] },
                        {
                          "type": "p",
                          "props": { "className": "text-sm" },
                          "children": [
                            { "type": "strong", "children": ["Never risk more than you can afford to lose."] },
                            " This applies to money, time, relationships, and opportunities. Smart entrepreneurs manage risk while pursuing rewards."
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "props": { "className": "grid md:grid-cols-2 gap-4" },
                      "children": [
                        {
                          "type": "div",
                          "props": { "className": "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 " },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold text-green-700 dark:text-green-400 mb-2" }, "children": ["Potential Rewards"] },
                            {
                              "type": "ul",
                              "props": { "className": "text-sm list-disc pl-4" },
                              "children": [
                                { "type": "li", "children": ["Financial independence"] },
                                { "type": "li", "children": ["Flexible lifestyle"] },
                                { "type": "li", "children": ["Building something meaningful"] },
                                { "type": "li", "children": ["Learning and personal growth"] },
                                { "type": "li", "children": ["Unlimited earning potential"] },
                                { "type": "li", "children": ["Being your own boss"] }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "props": { "className": "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold text-red-700 dark:text-red-400 mb-2" }, "children": ["Potential Risks"] },
                            {
                              "type": "ul",
                              "props": { "className": "text-sm list-disc pl-4" },
                              "children": [
                                { "type": "li", "children": ["Financial loss"] },
                                { "type": "li", "children": ["Income uncertainty"] },
                                { "type": "li", "children": ["Stress and long hours"] },
                                { "type": "li", "children": ["Opportunity cost"] },
                                { "type": "li", "children": ["Relationship strain"] },
                                { "type": "li", "children": ["Career setbacks if it fails"] }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            {
              "type": "Card",
              "props": {},
              "children": [
                {
                  "type": "CardHeader",
                  "children": [
                    {
                      "type": "CardTitle",
                      "props": { "className": "flex items-center gap-2" },
                      "children": [
                        { "type": "AlertTriangle", "props": { "className": "h-5 w-5" } },
                        "Types of Business Risks"
                      ]
                    }
                  ]
                },
                {
                  "type": "CardContent",
                  "props": { "className": "space-y-4" },
                  "children": [
                    {
                      "type": "div",
                      "props": { "className": "space-y-4" },
                      "children": [
                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            {
                              "type": "h4",
                              "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                              "children": [
                                { "type": "div", "props": { "className": "w-3 h-3 bg-red-500 rounded-full" } },
                                "Financial Risk"
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": ["Risk of losing money you've invested in the business."]
                            },
                            {
                              "type": "div",
                              "props": { "className": "text-xs space-y-1 text-semibold" },
                              "children": [
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Examples:"] },
                                    " Startup costs, inventory, equipment, marketing spend"
                                  ]
                                },
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Management:"] },
                                    " Start lean, bootstrap where possible, separate personal/business finances"
                                  ]
                                }
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            {
                              "type": "h4",
                              "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                              "children": [
                                { "type": "div", "props": { "className": "w-3 h-3 bg-orange-500 rounded-full" } },
                                "Opportunity Risk"
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": ["What you give up to pursue your business (other jobs, education, experiences)."]
                            },
                            {
                              "type": "div",
                              "props": { "className": "text-xs space-y-1 text-sembibold" },
                              "children": [
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Examples:"] },
                                    " Salary from employment, career progression, study time"
                                  ]
                                },
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Management:"] },
                                    " Start part-time, don't burn bridges, have backup plans"
                                  ]
                                }
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            {
                              "type": "h4",
                              "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                              "children": [
                                { "type": "div", "props": { "className": "w-3 h-3 bg-yellow-500 rounded-full" } },
                                "Market Risk"
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": ["Risk that customers won't want your product or competitors will beat you."]
                            },
                            {
                              "type": "div",
                              "props": { "className": "text-xs space-y-1 text-semibold" },
                              "children": [
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Examples:"] },
                                    " No market demand, strong competition, economic downturn"
                                  ]
                                },
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Management:"] },
                                    " Validate early, research competition, focus on customer needs"
                                  ]
                                }
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            {
                              "type": "h4",
                              "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                              "children": [
                                { "type": "div", "props": { "className": "w-3 h-3 bg-blue-500 rounded-full" } },
                                "Personal Risk"
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": ["Impact on your health, relationships, and well-being."]
                            },
                            {
                              "type": "div",
                              "props": { "className": "text-xs space-y-1" },
                              "children": [
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Examples:"] },
                                    " Stress, burnout, damaged relationships, health issues"
                                  ]
                                },
                                {
                                  "type": "p",
                                  "children": [
                                    { "type": "strong", "children": ["Management:"] },
                                    " Set boundaries, maintain work-life balance, seek support"
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            {
              "type": "Card",
              "children": [
                {
                  "type": "CardHeader",
                  "children": [
                    {
                      "type": "CardTitle",
                      "props": { "className": "flex items-center gap-2" },
                      "children": [
                        { "type": "TrendingUp", "props": { "className": "h-5 w-5" } },
                        "Risk Levels by Business Type"
                      ]
                    }
                  ]
                },
                {
                  "type": "CardContent",
                  "props": { "className": "space-y-4" },
                  "children": [
                    {
                      "type": "div",
                      "props": { "className": "space-y-3" },
                      "children": [
                        {
                          "type": "div",
                          "props": { "className": "p-3 bg-green-50 rounded border border-green-200" },
                          "children": [
                            {
                              "type": "div",
                              "props": { "className": "flex justify-between items-center mb-2" },
                              "children": [
                                { "type": "h4", "props": { "className": "font-semibold text-green-700" }, "children": ["Lower Risk Options"] },
                                { "type": "strong", "props": { "className": "bg-green-500 text-white px-2 text-xs py-0.5 rounded-xl" }, "children": ["Beginner Friendly"] }
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                              "children": [
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Service businesses"] },
                                    ": Tutoring, consulting, freelancing"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Digital products"] },
                                    ": Online courses, eBooks, apps"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Dropshipping"] },
                                    ": Low inventory, test products easily"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Content creation"] },
                                    ": YouTube, blogging, social media"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-green-600 mt-2" },
                              "children": [
                                { "type": "strong", "children": ["Why lower risk"] },
                                ": Low startup costs, can start part-time, quick to pivot"
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-3 bg-yellow-50 rounded border border-yellow-200" },
                          "children": [
                            {
                              "type": "div",
                              "props": { "className": "flex justify-between items-center mb-2" },
                              "children": [
                                { "type": "h4", "props": { "className": "font-semibold text-yellow-700 dark:text-yellow-400" }, "children": ["Medium Risk Options"] },
                                { "type": "strong", "props": { "className": "text-black px-2 text-xs rounded-xl border border-2 border-gray-599" }, "children": ["Some Experience Needed"] }
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                              "children": [
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["E-commerce"] },
                                    ": Physical products, inventory management"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Franchises"] },
                                    ": Proven model but higher investment"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Software businesses"] },
                                    ": Higher development costs"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Local services"] },
                                    ": Cleaning, landscaping, delivery"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-yellow-600 dark:text-yellow-400 mt-2" },
                              "children": [
                                { "type": "strong", "children": ["Why medium risk"] },
                                ": Higher startup costs, more complexity, longer to break even"
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800" },
                          "children": [
                            {
                              "type": "div",
                              "props": { "className": "flex justify-between items-center mb-2" },
                              "children": [
                                { "type": "h4", "props": { "className": "font-semibold text-red-700 dark:text-red-400" }, "children": ["Higher Risk Options"] },
                                { "type": "strong", "props": { "className": "text-white px-2 text-xs py-0.5 rounded-xl bg-red-500" }, "children": ["High Investment"] }
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                              "children": [
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Restaurants"] },
                                    ": High failure rate, big upfront costs"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Manufacturing"] },
                                    ": Heavy machinery, complex supply chains"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Real estate"] },
                                    ": Large capital requirements"
                                  ]
                                },
                                {
                                  "type": "li",
                                  "children": [
                                    { "type": "strong", "children": ["Venture-funded startups"] },
                                    ": High growth pressure"
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-red-600 dark:text-red-400 mt-2" },
                              "children": [
                                { "type": "strong", "children": ["Why higher risk"] },
                                ": Large investments, long payback periods, high failure rates"
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            {
              "type": "Card",
              "children": [
                {
                  "type": "CardHeader",
                  "children": [
                    {
                      "type": "CardTitle",
                      "props": { "className": "flex items-center gap-2" },
                      "children": [
                        { "type": "Shield", "props": { "className": "h-5 w-5" } },
                        "Smart Risk Management Strategies"
                      ]
                    }
                  ]
                },
                {
                  "type": "CardContent",
                  "props": { "className": "space-y-4" },
                  "children": [
                    {
                      "type": "div",
                      "props": { "className": "grid gap-4" },
                      "children": [
                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg bg-primary/5" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Start Small, Scale Smart"] },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": [
                                "Begin with minimal investment to test your concept before committing big resources."
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                              "children": [
                                { "type": "li", "children": ["MVP (Minimum Viable Product) approach"] },
                                { "type": "li", "children": ["Test with friends and family first"] },
                                { "type": "li", "children": ["Gradually increase investment as you prove concept"] }
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Diversify Your Risks"] },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": [
                                "Don't put all your eggs in one basket - spread risk across different areas."
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                              "children": [
                                { "type": "li", "children": ["Multiple revenue streams"] },
                                { "type": "li", "children": ["Different customer segments"] },
                                { "type": "li", "children": ["Various marketing channels"] }
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Have Exit Strategies"] },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": [
                                "Know when and how you'll pivot or quit if things aren't working."
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                              "children": [
                                { "type": "li", "children": ["Set clear success/failure metrics"] },
                                { "type": "li", "children": ["Time-bound your experiments"] },
                                { "type": "li", "children": ["Keep other options open"] }
                              ]
                            }
                          ]
                        },

                        {
                          "type": "div",
                          "props": { "className": "p-4 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Student-Specific Advice"] },
                            {
                              "type": "p",
                              "props": { "className": "text-sm text-muted-foreground mb-2" },
                              "children": [
                                "You have unique advantages and constraints as a student entrepreneur."
                              ]
                            },
                            {
                              "type": "ul",
                              "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                              "children": [
                                {
                                  "type": "li",
                                  "children": ["Lower living costs = less financial pressure"]
                                },
                                {
                                  "type": "li",
                                  "children": ["Access to university resources and networks"]
                                },
                                {
                                  "type": "li",
                                  "children": ["Can afford to take bigger risks early in career"]
                                },
                                {
                                  "type": "li",
                                  "children": ["Don't mortgage your education for business"]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            {
              "type": "Card",
              "children": [
                {
                  "type": "CardHeader",
                  "children": [{ "type": "CardTitle", "children": ["Risk Assessment Framework"] }]
                },
                {
                  "type": "CardContent",
                  "props": { "className": "space-y-4" },
                  "children": [
                    {
                      "type": "p",
                      "props": { "className": "text-sm text-muted-foreground mb-4" },
                      "children": [
                        "Before starting any business venture, ask yourself these questions:"
                      ]
                    },
                    {
                      "type": "div",
                      "props": { "className": "space-y-3" },
                      "children": [
                        {
                          "type": "div",
                          "props": { "className": "p-3 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-1" }, "children": ["💰 Financial"] },
                            {
                              "type": "p",
                              "props": { "className": "text-xs" },
                              "children": [
                                "Can I afford to lose this money? Do I have emergency funds? How will I pay bills if this fails?"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "props": { "className": "p-3 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-1" }, "children": ["⏰ Time"] },
                            {
                              "type": "p",
                              "props": { "className": "text-xs" },
                              "children": [
                                "How much time can I realistically commit? Will this impact my studies/current job? What's my timeline?"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "props": { "className": "p-3 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-1" }, "children": ["🎯 Opportunity"] },
                            {
                              "type": "p",
                              "props": { "className": "text-xs" },
                              "children": [
                                "What am I giving up? Are there other opportunities I'm missing? Is the timing right?"
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "props": { "className": "p-3 border rounded-lg" },
                          "children": [
                            { "type": "h4", "props": { "className": "font-semibold mb-1" }, "children": ["👥 Personal"] },
                            {
                              "type": "p",
                              "props": { "className": "text-xs" },
                              "children": [
                                "How will this affect my relationships? Can I handle the stress? Do I have support systems?"
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "props": { "className": "bg-primary/10 p-4 rounded-lg border-l-4 border-primary mt-4" },
                      "children": [
                        { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Remember:"] },
                        {
                          "type": "p",
                          "props": { "className": "text-sm" },
                          "children": [
                            "The goal isn't to avoid all risk - that's impossible and would mean missing opportunities. The goal is to take calculated risks where the potential reward justifies the potential downside."
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    quiz: {
      questions: [
        {
          question: "What's the relationship between risk and potential reward in business?",
          options: [
            "Higher risk always means higher reward",
            "Higher risk generally offers higher potential reward",
            "Risk and reward are unrelated",
            "Lower risk always means higher reward"
          ],
          correctAnswer: 1,
          explanation: "Risk and reward generally move together — but high risk never guarantees high reward."
        },
        {
          question: "What's a good way to manage business risk?",
          options: [
            "Avoid all risks completely",
            "Take the biggest risks possible",
            "Start small and test before scaling",
            "Ignore risks and hope for the best"
          ],
          correctAnswer: 2,
          explanation: "Starting small reduces risk while allowing validation and learning."
        },
        {
          question: "Which represents the lowest financial risk for a student entrepreneur?",
          options: [
            "Quitting university to focus on business full-time",
            "Borrowing £50,000 to start a restaurant",
            "Starting a service business while still studying",
            "Investing all savings in cryptocurrency for the business"
          ],
          correctAnswer: 2,
          explanation: "Service businesses have minimal startup costs and low risk."
        }
      ],
      passingScore: 2
    },
    relatedLessons: [
      {
        moduleId: "real-stories-of-young-entrepreneurs",
        title: "Real Stories of Young Entrepreneurs",
        relationship: "next-step"
      },
      {
        moduleId: "how-to-start-a-business",
        title: "How to Start a Business",
        relationship: "related"
      },
      {
        moduleId: "business-models",
        title: "Business Models",
        relationship: "related"
      }
    ],
    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 2,
    isActive: true,
    createdBy: "system"
  },

  {
    title: "Real Stories of Young Entrepreneurs",
    description: "Inspiration from successful young people",
    categoryId: "entrepreneurship",
    topic: "real-stories-of-young-entrepreneurs",

    visual: {
      icon: "Star",
      iconColor: "bg-red-500",
      badge: "Inspiration",
      readTime: 3
    },

    uiTree: [
      /* --------------------------------------------------
      * WHY THESE STORIES MATTER
      * -------------------------------------------------- */
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Lightbulb", props: { className: "h-5 w-5" } },
                  "Why These Stories Matter"
                ]
              }
            ]
          },
          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                children: [
                  "Reading about successful young entrepreneurs isn't about copying their exact path - it's about understanding the mindset, principles, and strategies that helped them succeed. These stories show that age isn't a barrier to building something meaningful."
                ]
              },
              {
                type: "div",
                props: { className: "bg-primary/10 p-4 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Common Themes You'll Notice:"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm space-y-1 list-disc pl-4" },
                    children: [
                      { type: "li", children: ["Most started with simple solutions to real problems"] },
                      { type: "li", children: ["They learned by doing, not just planning"] },
                      { type: "li", children: ["Failure was a learning opportunity, not the end"] },
                      { type: "li", children: ["They focused on serving customers, not getting rich quick"] },
                      { type: "li", children: ["Many started part-time while studying or working"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* --------------------------------------------------
      * BRITISH SUCCESS STORIES
      * -------------------------------------------------- */
      {
        type: "Card",
        props: {className: "mt-5"},
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", props: {className: "flex flex-row gap-3 items-center"}, children: [
            {type:"Users", props: {className: "h-5 w-5"}},
            "British Success Stories"
          ] }] },
          {
            type: "CardContent",
            props: { className: "space-y-6" },
            children: [
              /* --- JAMAL EDWARDS --- */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20" },
                children: [
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 mb-3" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                        },
                        children: ["JR"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Jamal Edwards MBE (1990-2022)"] },
                          { type: "p", props: { className: "text-sm text-muted-foreground" }, children: ["Founded SBTV"] }
                        ]
                      }
                    ]
                  },
                  {
                    type: "ul",
                    props: { className: "space-y-1 text-sm list-disc pl-4" },
                    children: [
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Started:"] },
                          " Age 15 with a £20 camera from his mother"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["The idea:"] },
                          " Film grime music videos and upload to YouTube"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["The growth:"] },
                          " SBTV became the UK's largest youth broadcaster"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Key lesson:"] },
                          ' "Started with what I had, not what I wished I had. Helped launch careers of Ed Sheeran, Dave, and Stormzy."'
                        ]
                      }
                    ]
                  }
                ]
              },

              /* --- BEN TOWERS --- */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg bg-green-50 dark:bg-green-950/20" },
                children: [
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 mb-3" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                        },
                        children: ["BD"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Ben Towers"] },
                          { type: "p", props: { className: "text-sm text-muted-foreground" }, children: ["Started Towers Design"] }
                        ]
                      }
                    ]
                  },
                  {
                    type: "ul",
                    props: { className: "space-y-1 text-sm list-disc pl-4" },
                    children: [
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Started:"] },
                          " Age 13, designing websites in his bedroom"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["The idea:"] },
                          " Freelance web design for local businesses"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["The growth:"] },
                          " \u00a3100k+ revenue by age 16, speaking at conferences"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Key lesson:"] },
                          " \"Started local, learned on the job. Proved you don't need a degree to provide value.\""
                        ]
                      }
                    ]
                  }
                ]
              },

              /* --- NICK D’ALOISIO --- */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20" },
                children: [
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 mb-3" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold"
                        },
                        children: ["NS"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Nick D’Aloisio"] },
                          { type: "p", props: { className: "text-sm text-muted-foreground" }, children: ["Created Summly"] }
                        ]
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "space-y-2 text-sm" },
                    children: [
                      {
                        type: "ul",
                        props: { className: "space-y-1 text-sm list-disc pl-4" },
                        children: [
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Started:"] },
                              " Age 15, creating mobile apps"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["The idea:"] },
                              " AI-powered news summarization app"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["The exit:"] },
                              " Sold to Yahoo for $30 million at age 17"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Key lesson:"] },
                              ' "Focused on solving his own problem - too much news, too little time. Stayed in school throughout."'
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* --- AKSHAY RUPARELIA --- */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20" },
                children: [
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 mb-3" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold"
                        },
                        children: ["AH"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Akshay Ruparelia"] },
                          { type: "p", props: { className: "text-sm text-muted-foreground" }, children: ["Doorsteps.co.uk founder"] }
                        ]
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "space-y-2 text-sm" },
                    children: [
                      {
                        type: "ul",
                        props: { className: "space-y-1 text-sm list-disc pl-4" },
                        children: [
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Started:"] },
                              " Age 19 while studying at university"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["The idea:"] },
                              " Online estate agency with lower fees"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["The success:"] },
                              " \u00a312 million revenue, sold portion for \u00a325 million by age 22"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Key lesson:"] },
                              ' "Identified industry inefficiency, used technology to solve it. Bootstrapped initial growth."'
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* --------------------------------------------------
      * INTERNATIONAL ENTREPRENEURS
      * -------------------------------------------------- */
      {
        type: "Card",
        props: {className: "mt-5"},
        children: [
          {
            type: "CardHeader",
            children: [{ type: "CardTitle", children: ["International Young Entrepreneurs"] }]
          },
          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "p-3 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Mark Zuckerberg (Facebook) - Started age 19"] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "Created Facebook in his Harvard dorm room. Key insight: Started for university students, then expanded gradually. \"Move fast and break things\" mentality."
                    ]
                  }
                ]
              },
              {
                type: "div",
                props: { className: "p-3 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Evan Spiegel (Snapchat) - Started age 21"] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "Understood what young people wanted before adults did. Focused on disappearing messages when everyone thought it was crazy."
                    ]
                  }
                ]
              },
              {
                type: "div",
                props: { className: "p-3 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-1" }, children: ["David Karp (Tumblr) - Started age 20"] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "High school dropout who taught himself programming. Created Tumblr as a simple microblogging platform, sold to Yahoo for $1.1 billion."
                    ]
                  }
                ]
              },
              {
                type: "div",
                props: { className: "p-3 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-1" }, children: ["John Collison (Stripe) - Started age 19"] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "Irish entrepreneur who co-founded Stripe with his brother. Made online payments simple for developers when it was unnecessarily complex."
                    ]
                  }
                ]
              },
            ]
          }
        ]
      },

      /* --------------------------------------------------
      * WHAT MADE THEM SUCCESSFUL
      * -------------------------------------------------- */
      {
        type: "Card",
        props: {className: "mt-5"},
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [{ type: "Target", props: { className: "h-5 w-5" } }, "What Made Them Successful"]
              }
            ]
          },
          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "grid grid-cols-2 gap-4" },
                children: [
                  /* COLUMN 1 */
                  {
                    type: "div",
                    props: { className: "space-y-4" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className:
                            "p-3 bg-green-50 rounded border border-green-200 "
                        },
                        children: [
                          {
                            type: "h4",
                            props: {
                              className: "font-semibold text-green-700 mb-2"
                            },
                            children: ["Mindset Traits"]
                          },
                          {
                            type: "ul",
                            props: { className: "text-sm space-y-1 list-disc pl-4" },
                            children: [
                              {
                                type: "li",
                                children: [
                                  { type: "strong", children: ["Curiosity:"] },
                                  ' Always asking "why" and "what if"'
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "strong", children: ["Persistence:"] },
                                  " Kept going when others quit"
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  {
                                    type: "strong",
                                    children: ["Learning agility:"]
                                  },
                                  " Quick to adapt and improve"
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  {
                                    type: "strong",
                                    children: ["Customer focus:"]
                                  },
                                  " Solved real problems"
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* COLUMN 2 */
                  {
                    type: "div",
                    props: { className: "space-y-4" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className:
                            "p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800"
                        },
                        children: [
                          {
                            type: "h4",
                            props: {
                              className: "font-semibold text-blue-700 mb-2"
                            },
                            children: ["Strategic Choices"]
                          },
                          {
                            type: "ul",
                            props: { className: "text-sm space-y-1 list-disc pl-4" },
                            children: [
                              {
                                type: "li",
                                children: [
                                  { type: "strong", children: ["Timing: "] },
                                  "Spotted emerging trends early"
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "strong", children: ["Simplicity: "] },
                                  "Made complex things simple"
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "strong", children: ["Technology: "] },
                                  "Used tech as an enabler"
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "strong", children: ["Niche first: "] },
                                  "Dominated small markets first"
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* COLUMN 1 */
                  {
                    type: "div",
                    props: { className: "space-y-4" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className:
                            "p-3 bg-purple-50 rounded border border-purple-200 "
                        },
                        children: [
                          {
                            type: "h4",
                            props: {
                              className: "font-semibold text-purple-700 mb-2"
                            },
                            children: ["Practical Actions"]
                          },
                          {
                            type: "ul",
                            props: { className: "text-sm space-y-1 list-disc pl-4" },
                            children: [
                              { type: "li", children: ['Started small and simple'] },
                              { type: "li", children: ['Got feedback early and often'] },
                              { type: "li", children: ['Reinvested profits back into growth'] },
                              { type: "li", children: ['Built networks and learned from others'] },
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* COLUMN 2 */
                  {
                    type: "div",
                    props: { className: "space-y-4" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className:
                            "p-3 bg-orange-50 rounded border border-orange-200 "
                        },
                        children: [
                          {
                            type: "h4",
                            props: {
                              className: "font-semibold text-orange-700 mb-2"
                            },
                            children: ["Youth Advantages"]
                          },
                          {
                            type: "ul",
                            props: { className: "text-sm space-y-1 list-disc pl-4" },
                            children: [
                              { type: "li", children: ['Less fear of failure'] },
                              { type: "li", children: ['More time to recover from mistakes'] },
                              { type: "li", children: ['Native understanding of new technology'] },
                              { type: "li", children: ['Lower financial obligations'] },
                            ]
                          }
                        ]
                      }
                    ]
                  },

                ]
              }
            ]
          }
        ]
      },

      /* --------------------------------------------------
      * LESSONS FOR STUDENTS (YOUR FUTURE STORY)
      * -------------------------------------------------- */
      {
        type: "Card",
        props: {className: "mt-5"},
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Lessons for Today’s Students"] }] },
          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "p-4 border rounded-lg bg-primary/5" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["1. You Don’t Need Permission"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "None of these entrepreneurs waited for someone to give them permission to start. They saw problems and started solving them with whatever resources they had."
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["2. Start Where You Are"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Jamal Edwards started with a £20 camera. Ben Towers used free web tools. Your current resources are enough to begin."
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["3. Embrace Being Different"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Young entrepreneurs often succeed because they see things differently than adults. Your \"inexperience\" might actually be fresh perspective."
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["4. Failure Is Data"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: ["Every successful entrepreneur failed multiple times. The difference is they treated failures as learning experiences, not reasons to quit."]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["5. Focus on Value, Not Money"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "All these entrepreneurs focused on creating value for users first. The money followed as a result of solving real problems well."
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "bg-primary/10 p-4 rounded-lg border-l-4 border-primary" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Your Story Could Be Next:"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "These entrepreneurs started as students just like you. They weren't special or gifted - they just started, learned, and kept improving. What problem could you solve today?"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    quiz: {
      questions: [],
      passingScore: 0
    },

    relatedLessons: [],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 1,

    createdBy: "system"
  },

  
];

// =====================================================
// Seed Function
// =====================================================
async function seedEntrepreneurship() {
  try {
    for (const module of entrepreneurshipModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
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
