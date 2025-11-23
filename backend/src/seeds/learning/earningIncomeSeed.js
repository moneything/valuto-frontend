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
          variant: "accountFeatureCards",
          cards: [
            {
              title: "💰 Gross Pay",
              subtitle: "Your pay BEFORE deductions",
              color: "green",
              items: [
                "The amount advertised in job ads",
                "Your hourly rate × hours worked",
                "What you earn before anything is taken off",
                "Example: £10/hour × 20 hours = £200 gross"
              ]
            },
            {
              title: "💳 Net Pay",
              subtitle: "Your pay AFTER deductions",
              color: "blue",
              items: [
                "The money that actually hits your bank",
                "Gross pay minus taxes and deductions",
                "Also called 'take-home pay'",
                "Example: £200 gross - £15 tax = £185 net"
              ]
            }
          ]
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
        icon: "none",
        title: "✅ Special Rules for Student Jobs",
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
        title: "Budgeting Basics",
        relationship: "related"
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
  // 2. Part-Time Jobs & Apprenticeships
  // =====================================================
  {
    title: "Part-Time Jobs & Apprenticeships",
    description:
      "Learn when you can start working, the best student-friendly jobs, how apprenticeships work, and how to land your very first role.",
    categoryId: "earning-income",
    topic: "part-time-jobs",

    visual: {
      icon: "Building",
      iconColor: "bg-green-500",
      badge: "Earning & Income",
      readTime: 3, // 3 min read
    },

    contentSections: [
      // 1) Age & Legal Requirements — 3 coloured boxes + legal note
      {
        id: "age-legal-requirements",
        type: "comparison",
        title: "When Can You Start Working?",
        content: "",
        icon: null,
        colorScheme: null,
        metadata: {
          // Reuse the credit-score style multi-box layout
          variant: "scoreRangeGrid",
          ranges: [
            {
              label: "13–14",
              score: "Very limited work",
              bgColor: "bg-red-50",
              textColor: "text-red-600",
              description:
                "Paper rounds, light agricultural work, usually with a work permit.",
            },
            {
              label: "15",
              score: "More options",
              bgColor: "bg-orange-50",
              textColor: "text-orange-600",
              description:
                "Retail and restaurant roles (outside school hours), max ~8 hours/week.",
            },
            {
              label: "16+",
              score: "Most part-time jobs",
              bgColor: "bg-green-50",
              textColor: "text-green-600",
              description:
                "Evening & weekend work in most sectors, plus apprenticeships.",
            },
          ],
          note: {
            title: "Important Legal Limits",
            items: [
              "School days: Max 2 hours (typically after 7pm)",
              "Saturdays: Max 8 hours",
              "Sundays: Max 2 hours",
              "School holidays: Up to 8 hours/day, 35 hours/week (13–14), 40 hours/week (15+)",
            ],
          },
        },
      },

      // 2) Best Part-Time Jobs — stacked cards
      {
        id: "best-student-jobs",
        type: "list",
        title: "Best Part-Time Jobs for Students",
        content: "Jobs that work around your school or uni schedule.",
        icon: null,
        colorScheme: null,
        metadata: {
          variant: "cardsStack",
          cards: [
            {
              title: "🛒 Retail Assistant",
              color: "blue",
              items: [
                "Pay: £6.40–£8.50 per hour",
                "Hours: Evenings and weekends",
                "Skills: Customer service, teamwork, communication",
              ],
            },
            {
              title: "🍟 Food Service",
              color: "green",
              items: [
                "Pay: £6.40–£9.00 per hour",
                "Hours: Split shifts and weekends",
                "Skills: Fast-paced work, resilience, people skills",
              ],
            },
            {
              title: "📚 Tutoring",
              color: "purple",
              items: [
                "Pay: £8–£15 per hour",
                "Hours: After school and weekends",
                "Skills: Teaching, patience, strong subject knowledge",
              ],
            },
            {
              title: "🚗 Delivery Driver",
              color: "yellow", // maps to orange-ish in your UI
              items: [
                "Pay: £7–£12 per hour plus tips",
                "Hours: Flexible, mostly evenings",
                "Skills: Navigation, time management, reliability",
              ],
            },
          ],
          tip: {
            title: "Hot Tip: Seasonal Work",
            content:
              "Christmas retail, summer festivals, and holiday resorts often pay more and are perfect for short bursts of work.",
          },
        },
      },

      // 3) Apprenticeships — gradient two-column knowledge box
      {
        id: "apprenticeships-intro",
        type: "explanation",
        title: "Apprenticeships: Learn While You Earn",
        content:
          "Apprenticeships let you work, earn a salary, and study towards a qualification at the same time.",
        icon: null,
        colorScheme: null,
        metadata: {
          variant: "gradientInfoTwoColumn",
          heading: "What is an Apprenticeship?",
          description:
            "A real job with training and a salary. You typically work 4 days and study 1 day.",
          columns: [
            {
              title: "Benefits",
              color: "green",
              items: [
                "No student debt",
                "Earn while you learn",
                "Real work experience",
                "Guaranteed job at the end",
                "Industry-recognised qualifications",
              ],
            },
            {
              title: "The Numbers",
              color: "blue",
              items: [
                "Minimum pay £6.40/hour",
                "Duration: 1–4 years",
                "Age: 16+",
                "600+ apprenticeship routes",
              ],
            },
          ],
        }
      },

      // 4) Apprenticeship Sectors — mini 3-card grid
      {
        id: "apprenticeship-sectors",
        type: "miniInfoGrid",
        title: "Popular Apprenticeship Areas",
        content: "",
        icon: null,
        colorScheme: null,
        metadata: {
          items: [
            {
              title: "💻 Tech & Digital",
              description: "Software development, cybersecurity, IT support, digital marketing.",
              color: "blue"
            },
            {
              title: "🏥 Healthcare",
              description: "Nursing, dental, pharmacy, healthcare assistant, veterinary roles.",
              color: "green"
            },
            {
              title: "💼 Business",
              description: "Accounting, HR, project management, sales, business admin.",
              color: "purple"
            }
          ]
        },
      },

      // 5) Landing Your First Job — CV vs Interview tips
      {
        id: "cv-and-interview-tips",
        type: "list",
        title: "Landing Your First Job",
        content: "",
        icon: null,
        colorScheme: null,
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Writing Your CV",
              color: "green",
              iconName: "Check",
              items: [
                "Keep it to 1 page maximum.",
                "Include school achievements, sports, and volunteering.",
                "List subjects and topics you’re strongest in.",
                "Mention hobbies that show responsibility and teamwork.",
              ],
            },
            {
              title: "Interview Tips",
              color: "blue",
              iconName: "MoveRight",
              items: [
                "Arrive around 10 minutes early.",
                "Dress smartly, even for casual roles.",
                "Bring printed copies of your CV.",
                "Prepare 1–2 questions about the role or company.",
              ],
            },
          ],
        },
      },

      // 6) Job scams & red flags — warning block
      {
        id: "job-red-flags",
        type: "warning",
        title: "⚠️ Watch Out For:",
        content: "",
        icon: "none",
        colorScheme: "yellow",
        metadata: {
          warnings: [
            "Jobs asking you to pay money upfront (often scams).",
            "“Too good to be true” pay rates for very little work.",
            "Pyramid schemes disguised as “business opportunities”.",
            "Work hours that clash heavily with school or exam revision.",
          ],
        },
      },

      // 7) Next steps / action plan — reusing StepsSection
      {
        id: "next-steps-job-hunting",
        type: "steps",
        title: "Ready to Start Job Hunting?",
        content:
          "Follow this simple plan to get your first job or apprenticeship interview.",
        icon: null,
        colorScheme: null,
        metadata: {
          variant: "default",
          steps: [
            {
              number: 1,
              text: "Check the age requirements",
              description:
                "Make sure you meet the minimum age for the jobs you’re targeting.",
            },
            {
              number: 2,
              text: "Write or update your CV",
              description:
                "Ask a teacher, careers adviser, or friend to read it over.",
            },
            {
              number: 3,
              text: "Search for roles",
              description:
                "Look on Indeed, local job boards, company websites, and apprenticeship sites.",
            },
            {
              number: 4,
              text: "Apply to 5–10 roles",
              description:
                "Don’t pin everything on just one job — give yourself options.",
            },
            {
              number: 5,
              text: "Prepare for interviews",
              description:
                "Practice answers out loud and plan your outfit and travel ahead of time.",
            },
          ],
        },
      },
    ],

    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "At what age can you do most part-time jobs?",
          options: ["13", "14", "15", "16"],
          correctAnswer: 3, // index of "16"
          explanation:
            "Most part-time job opportunities fully open up at age 16, including evening and weekend roles.",
        },
      ],
    },

    relatedLessons: [
      {
        moduleId: "side-hustles",
        title: "Side Hustles",
        relationship: "next-step",
      },
      {
        moduleId: "how-pay-works",
        title: "How Pay Works",
        relationship: "related",
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 5,
    order: 2,
    isActive: true,

    createdBy: "system",
  },

  // =====================================================
  // 3. Side Hustles & Freelancing
  // =====================================================
  {
    title: "Side Hustles & Freelancing",
    description:
      "Flexible ways for students to earn money online or locally, build skills, and grow income at their own pace.",
    categoryId: "earning-income",
    topic: "side-hustles",

    visual: {
      icon: "Lightbulb",
      iconColor: "bg-green-500",
      badge: "Earning & Income",
      readTime: 2
    },

    contentSections: [
      /* ------------------------------------------------------------ */
      /* 1. WHAT IS A SIDE HUSTLE? (intro three cards)                 */
      /* ------------------------------------------------------------ */
      {
        id: "what-is-side-hustle",
        type: "explanation",
        title: "What is a Side Hustle?",
        content:
          "Side hustles are flexible earning opportunities you can do alongside school or university.",
        metadata: {
          variant: "introThreeCards",
          cards: [
            {
              title: "Flexible",
              emoji: "💪",
              description: "Work around your own schedule",
              color: "blue"
            },
            {
              title: "Scalable",
              emoji: "🚀",
              description: "Grow your earnings steadily",
              color: "green"
            },
            {
              title: "Skill Building",
              emoji: "🎯",
              description: "Gain experience employers love",
              color: "purple"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 2. ONLINE SIDE HUSTLES (hustleCardGrid)                       */
      /* ------------------------------------------------------------ */
      {
        id: "online-hustles",
        type: "list",
        title: "Online Side Hustles",
        content: "Work from anywhere with an internet connection.",
        metadata: {
          variant: "hustleCardGrid",
          hustles: [
            {
              title: "Online Tutoring",
              emoji: "📚",
              color: "blue",
              description: "Teach subjects you're strong in over video call.",
              platformsLabel: "Platforms",
              platforms: "Tutor.com, Preply, Wyzant",
              pay: "£10–20/hour",
              requirements: "Good subject knowledge, patience"
            },
            {
              title: "Freelance Writing",
              emoji: "✍️",
              color: "green",
              description:
                "Write blog posts, articles, and social media content.",
              platformsLabel: "Platforms",
              platforms: "Upwork, Fiverr, Contently",
              pay: "£0.05–0.50 per word",
              requirements: "Strong English, creativity"
            },
            {
              title: "Graphic Design",
              emoji: "🎨",
              color: "purple",
              description: "Create logos, posters, and social content.",
              platformsLabel: "Platforms",
              platforms: "Fiverr, 99designs, Dribbble",
              pay: "£5–100/design",
              requirements: "Design skills, Canva or Figma"
            },
            {
              title: "Social Media Management",
              emoji: "📱",
              color: "orange",
              description:
                "Run social accounts for small businesses or creators.",
              platformsLabel: "Find clients",
              platforms: "Local businesses, Instagram, Upwork",
              pay: "£100–500/month per client",
              requirements: "Social media knowledge"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 3. LOCAL HUSTLES (hustleCardGrid)                             */
      /* ------------------------------------------------------------ */
      {
        id: "local-hustles",
        type: "list",
        title: "Local & Physical Side Hustles",
        metadata: {
          variant: "hustleCardGrid",
          hustles: [
            {
              title: "Dog Walking & Pet Sitting",
              emoji: "🐕",
              color: "blue",
              description: "Walk dogs or care for pets when owners are away.",
              platformsLabel: "Apps",
              platforms: "Rover, Wag",
              pay: "£10–20/walk, £20–40/night",
              requirements: "Reliability, love animals"
            },
            {
              title: "Food Delivery",
              emoji: "🚗",
              color: "green",
              description:
                "Deliver food using a bike, scooter, or car (17+).",
              platformsLabel: "Apps",
              platforms: "Deliveroo, Just Eat, Uber Eats",
              pay: "£8–15/hour + tips",
              requirements: "Transport, smartphone"
            },
            {
              title: "House Sitting",
              emoji: "🏠",
              color: "purple",
              description: "Look after someone’s home while they're away.",
              platformsLabel: "Platforms",
              platforms: "TrustedHousesitters",
              pay: "£20–50/night",
              requirements: "Trustworthy, responsible"
            },
            {
              title: "Cleaning",
              emoji: "🧽",
              color: "orange",
              description:
                "Clean student accommodation, houses, or local offices.",
              platformsLabel: "Find work",
              platforms: "Local ads, community groups",
              pay: "£10–15/hour",
              requirements: "Attention to detail"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 4. SELLING & TRADING (cardsStack)                             */
      /* ------------------------------------------------------------ */
      {
        id: "selling-and-trading",
        type: "list",
        title: "Selling & Trading",
        metadata: {
          variant: "cardsStack",
          cards: [
            {
              title: "👕 Reselling Clothes",
              color: "blue",
              items: [
                "Buy and sell popular fashion items.",
                "Platforms: Vinted, Depop, eBay.",
                "Potential: £50–500/month."
              ]
            },
            {
              title: "📚 Selling Course Materials",
              color: "green",
              items: [
                "Sell textbooks, notes, or revision guides.",
                "Where: Facebook groups, uni circles.",
                "Potential: £20–200/term."
              ]
            },
            {
              title: "🎮 Gaming Items",
              color: "purple",
              items: [
                "Sell in-game items or offer coaching.",
                "Examples: FIFA coins, Fortnite coaching.",
                "Potential: £10–100/month."
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 5. TIPS — twoColumn                                           */
      /* ------------------------------------------------------------ */
      {
        id: "side-hustle-tips",
        type: "list",
        title: "Side Hustle Success Tips",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Do This",
              color: "green",
              items: [
                "Start with skills you already have.",
                "Track earnings and time.",
                "Build reviews and reliability.",
                "Set realistic weekly limits."
              ]
            },
            {
              title: "Avoid This",
              color: "red",
              items: [
                "Letting it affect your studies.",
                "Taking on too many clients.",
                "Working for free “for exposure”.",
                "Ignoring tax responsibilities."
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 6. PRO TIP (info box)                                         */
      /* ------------------------------------------------------------ */
      {
        id: "side-hustle-pro-tip",
        type: "tip",
        icon: "Lightbulb",
        title: "Pro Tip",
        metadata: {
          variant: "lightbulb",
          tips: [
            "It’s better to earn £200/month consistently from ONE hustle than juggle five unstable ones."
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 7. ACTION PLAN (steps)                                        */
      /* ------------------------------------------------------------ */
      {
        id: "side-hustle-action-plan",
        type: "steps",
        title: "Ready to Start Your Side Hustle?",
        metadata: {
          steps: [
            { number: 1, text: "Choose 1–2 side hustles that match your skills" },
            { number: 2, text: "Set up profiles on relevant platforms" },
            { number: 3, text: "Start with small jobs to build reviews" },
            { number: 4, text: "Track time and earnings consistently" },
            { number: 5, text: "Scale up once you're confident" }
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
          question: "Which side hustle typically offers the highest hourly pay?",
          options: ["Dog walking", "Food delivery", "Tutoring", "Cleaning"],
          correctAnswer: 2,
          explanation:
            "Tutoring often pays £10–20/hour due to the skill required."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    /* RELATED LESSONS                                              */
    /* ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "tax-basics",
        title: "Tax Basics",
        relationship: "next-step"
      },
      {
        moduleId: "how-pay-works",
        title: "How Pay Works",
        relationship: "related"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      }
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 2,
    order: 3,
    isActive: true,
    createdBy: "system"
  },

  // =====================================================
  // 4. Tax Basics
  // =====================================================
  {
    title: "Tax Basics",
    description:
      "Learn how income tax, National Insurance, VAT, tax codes, and PAYE work as a student.",
    categoryId: "earning-income",
    topic: "tax-basics",

    visual: {
      icon: "Calculator",
      iconColor: "bg-green-500",
      badge: "Earning & Income",
      readTime: 3
    },

    contentSections: [
      /* ------------------------------------------------------------ */
      /* 1. WHAT IS TAX?  (mini 3 card grid)                          */
      /* ------------------------------------------------------------ */
      {
        id: "what-is-tax",
        type: "miniInfoGrid",
        title: "What is Tax and Why Do We Pay It?",
        content: 
          "Tax is money the government takes from your earnings to pay for public services like schools, hospitals, roads, and police. Think of it as everyone chipping in for things we all use!",
        metadata: {
          items: [
            {
              title: "🏥 Healthcare",
              description: "NHS hospitals and public health services",
              color: "blue"
            },
            {
              title: "🏫 Education",
              description: "Schools, colleges, and universities",
              color: "green"
            },
            {
              title: "🛣️ Infrastructure",
              description: "Roads, transport, police, and public safety",
              color: "purple"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 2. MAIN TAX TYPES  (cardsStack)                               */
      /* ------------------------------------------------------------ */
      {
        id: "main-tax-types",
        type: "list",
        title: "Main Types of Tax You'll Pay",
        metadata: {
          variant: "cardsStack",
          cards: [
            {
              title: "💰 Income Tax",
              color: "blue",
              items: [
                "Tax on money you earn from jobs",
                "Personal Allowance (2024): £12,570",
                "20% basic rate on earnings above allowance",
                "Most student jobs fall BELOW the tax threshold"
              ]
            },
            {
              title: "🏥 National Insurance",
              color: "green",
              items: [
                "Funds NHS, pensions, and benefits",
                "Threshold (2024): £12,570/year",
                "12% rate above threshold",
                "Most part-time students pay £0"
              ]
            },
            {
              title: "🛒 VAT",
              color: "purple",
              items: [
                "Tax on goods you buy",
                "Standard rate: 20%",
                "Examples: clothes, electronics, restaurants",
                "Most food & children’s clothes are VAT-free"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 3. REAL STUDENT TAX EXAMPLES (twoFeatureCards)                */
      /* ------------------------------------------------------------ */
      {
        id: "student-tax-examples",
        type: "comparison",
        title: "Real Student Tax Examples",
        metadata: {
          variant: "twoFeatureCards",
          cards: [
            {
              title: "Scenario 1: No Tax",
              subtitle: "Typical student part-time job",
              color: "green",
              bullets: [
                "Job: Retail assistant",
                "Hours: 15 hours/week",
                "Pay: £8.50/hour",
                "Annual earnings: £6,630",
                "Tax owed: £0 (under £12,570)"
              ]
            },
            {
              title: "Scenario 2: Some Tax",
              subtitle: "Full-time summer work",
              color: "yellow",
              bullets: [
                "Salary: £15,000/year",
                "Taxable income: £2,430",
                "Income tax: £486",
                "National Insurance: £292",
                "Total tax: £778/year"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 4. NEW — Key Insight (standalone info section)                */
      /* ------------------------------------------------------------ */
      {
        id: "student-tax-key-insight",
        type: "explanation",
        title: "Key Insight",
        icon: "Lightbulb",
        metadata: {
          variant: "info",
          highlightTitle: "💡 Key Insight:",
          highlightText:
            "If you work part-time (under ~25 hours/week at minimum wage), you will likely pay NO income tax or National Insurance."
        }
      },

      /* ------------------------------------------------------------ */
      /* 5. PAYE OVERVIEW (ONLY the blue box)                          */
      /* ------------------------------------------------------------ */
      {
        id: "paye-overview",
        type: "explanation",
        title: "PAYE: Pay As You Earn",
        content:
          "PAYE is the UK system where tax is automatically taken from your paycheck before you receive it.",
        icon: "Receipt",
        metadata: {
          variant: "featureWithList",
          listTitle: "How PAYE Works:",
          listItems: [
            "Employer calculates gross pay",
            "Income Tax & NI deducted automatically",
            "Employer sends tax to HMRC",
            "You receive net pay",
            "Everything is shown clearly on your payslip",
          ],
        }
      },

      /* ------------------------------------------------------------ */
      /* 6. NEW — Two column section (split from PAYE)                 */
      /* ------------------------------------------------------------ */
      {
        id: "paye-benefits-responsibilities",
        type: "list",
        title: "PAYE Benefits & Responsibilities",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Benefits of PAYE",
              color: "green",
              items: [
                "Automatic tax calculation",
                "No tax returns needed for most people",
                "Tax spread throughout the year",
                "Employer handles everything"
              ]
            },
            {
              title: "Your Responsibilities",
              color: "blue",
              items: [
                "Provide correct personal details",
                "Keep your P45/P60 documents",
                "Check your payslips for errors",
                "Tell HMRC if you have side income"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 7. TAX CODES (miniInfoGrid)                                   */
      /* ------------------------------------------------------------ */
      {
        id: "tax-codes",
        type: "miniInfoGrid",
        title: "Understanding Tax Codes",
        metadata: {
          items: [
            {
              title: "1257L — Most Common",
              description: "Standard tax code (2024): £12,570 tax-free allowance",
              color: "green"
            },
            {
              title: "BR — Basic Rate",
              description:
                "Used for second jobs; all income taxed at 20% with no allowance",
              color: "blue"
            },
            {
              title: "0T — Emergency Tax",
              description:
                "Used when HMRC lacks your details; often leads to overpayment",
              color: "orange"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 8. ACTION PLAN (steps)                                        */
      /* ------------------------------------------------------------ */
      {
        id: "tax-action-plan",
        type: "steps",
        title: "Tax Action Plan for Students",
        metadata: {
          steps: [
            { number: 1, text: "Keep all payslips & P60 documents" },
            { number: 2, text: "Check your tax code (usually 1257L)" },
            { number: 3, text: "Register with HMRC if side income > £1,000/year" },
            { number: 4, text: "Claim tax refunds if you overpay" },
            { number: 5, text: "Learn to read your payslip properly" }
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
          question: "What is the personal allowance for income tax in 2024?",
          options: ["£11,850", "£12,570", "£13,500", "£10,000"],
          correctAnswer: 1,
          explanation:
            "The personal allowance is £12,570, meaning you pay no income tax on this amount."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    /* RELATED LESSONS                                              */
    /* ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "how-pay-works",
        title: "How Pay Works",
        relationship: "related"
      },
      {
        moduleId: "side-hustles",
        title: "Side Hustles",
        relationship: "next-step"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      }
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 3,
    isActive: true,
    createdBy: "system"
  }

];

// =====================================================
// Seed Function
// =====================================================
async function seedEarningIncome() {
  try {
    for (const module of earningIncomeModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
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
