// backend/src/seeds/learning/coreMoneySkillsSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Core Money Skills — Learning Modules
 * Category ID: core-money-skills
 *
 * This file currently seeds:
 * 1. Budgeting Basics
 *
 * You can later append Banking 101, Saving Strategies, etc.
 */

// ----------------------------------------------
// ----------------------------------------------

const coreMoneySkillsModules = [
  // Budgeting Basics
  {
    title: "Budgeting Basics",
    description:
      "Learn how to take control of your money with simple budgeting techniques like the 50/30/20 rule, identifying needs vs wants, and building lasting habits.",

    categoryId: "core-money-skills",
    topic: "budgeting-basics",

    visual: {
      icon: "Wallet",
      iconColor: "bg-blue-500",
      badge: "Core Money Skills",
      readTime: 2,
    },

    contentSections: [
      // -----------------------------------------------------------
      // 1) What is a Budget? (Matches EXACT original static UI)
      // -----------------------------------------------------------
      {
        id: "intro-what-is-budget",
        type: "explanation",
        title: "What is a Budget?",
        content:
          "A budget is simply a plan for your money. It helps you see where your money comes from and where it goes, so you can make sure you have enough for the things you need and want.",
        icon: "TrendingUp",
        colorScheme: "blue",
        metadata: {
          variant: "info",
          highlightTitle: "Think of it like this:",
          highlightText:
            "If your money was water, a budget would be like having different buckets to catch it – one for rent, one for food, one for fun, and one for saving!",
        },
      },

      // -----------------------------------------------------------
      // 2) Needs vs Wants — EXACT 2-column card
      // -----------------------------------------------------------
      {
        id: "needs-vs-wants",
        type: "list",
        title: "Needs vs Wants: The Foundation",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "✅ NEEDS (Must Have)",
              color: "green",
              iconName: "CheckCircle",
              items: [
                "Rent/Housing",
                "Food & Groceries",
                "Transport to work/uni",
                "Phone bill",
                "Essential clothing",
              ],
            },
            {
              title: "⚠️ WANTS (Nice to Have)",
              color: "orange",
              iconName: "AlertCircle",
              items: [
                "Netflix/Spotify subscriptions",
                "Eating out/takeaways",
                "Designer clothes",
                "Gaming/entertainment",
                "Holidays",
              ],
            },
          ],
        },
      },

      // -----------------------------------------------------------
      // 3) 50/30/20 Rule — IDENTICAL UI
      // -----------------------------------------------------------
      {
        id: "fifty-thirty-twenty",
        type: "comparison",
        title: "The 50/30/20 Rule (Perfect for Students!)",
        content: "The simplest way to budget your money",
        metadata: {
          variant: "gridCards",
          columns: [
            {
              title: "50%",
              subtitle: "NEEDS",
              description: "Rent, food, transport, phone",
              color: "green",
            },
            {
              title: "30%",
              subtitle: "WANTS",
              description: "Fun, eating out, entertainment",
              color: "blue",
            },
            {
              title: "20%",
              subtitle: "SAVINGS",
              description: "Emergency fund, future goals",
              color: "purple",
            },
          ],
          exampleTitle: "Example with £1000/month income:",
          exampleList: [
            "£500 for needs (rent, food, transport)",
            "£300 for wants (fun, eating out)",
            "£200 for savings",
          ],
        },
      },

      // -----------------------------------------------------------
      // 4) How to Start Budgeting — EXACT step UI
      // -----------------------------------------------------------
      {
        id: "start-budgeting-steps",
        type: "steps",
        title: "How to Start Budgeting (3 Easy Steps)",
        metadata: {
          steps: [
            {
              number: 1,
              text: "Track Your Income",
              description:
                "Add up all money coming in: part-time job, student loan, family support",
            },
            {
              number: 2,
              text: "List Your Expenses",
              description:
                "Write down everything you spend money on for a week",
            },
            {
              number: 3,
              text: "Apply the 50/30/20 Rule",
              description:
                "Split your income and adjust your spending to fit",
            },
          ],
        },
      },

      // -----------------------------------------------------------
      // 5) Quick Budgeting Tips — EXACT pastel card
      // -----------------------------------------------------------
      {
        id: "quick-tips",
        type: "list",
        title: "💡 Quick Budgeting Tips",
        metadata: {
          variant: "pastel",
          listItems: [
            "Use apps like Monzo or Starling Bank to track spending automatically",
            "Review your budget every month and adjust as needed",
            "If you overspend in one category, reduce another (don't touch savings!)",
            "Start small – even budgeting £100 builds good habits",
            "Remember: budgeting gives you MORE freedom, not less",
          ],
        },
      },
    ],

    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the 50/30/20 budgeting rule?",
          options: ["50/30/20", "60/20/20", "40/40/20", "50/25/25"],
          correctAnswer: 0,
          explanation:
            "The 50/30/20 rule means 50% needs, 30% wants, and 20% savings.",
        },
      ],
    },

    relatedLessons: [
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "next-step",
      },
      {
        moduleId: "banking-101",
        title: "Banking 101",
        relationship: "related",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 2,
    order: 1,
    isActive: true,

    createdBy: "system",
  },

  // Saving Strategies
  {
    title: "Saving Strategies",
    description:
      "Learn how to build an emergency fund, set SMART goals, and use simple tricks to save more without feeling deprived.",
    categoryId: "core-money-skills",
    topic: "saving-strategies",

    visual: {
      icon: "PiggyBank",
      iconColor: "bg-green-500",
      badge: "Core Money Skills",
      readTime: 3,
    },

    contentSections: [
      // Why Save Money?
      {
        id: "why-save-money",
        type: "explanation",
        title: "Why Save Money?",
        icon: "TrendingUp",
        colorScheme: "blue",
        content:
          "Saving money gives you freedom and peace of mind. It's not about being cheap – it's about being prepared for emergencies and opportunities.",
        metadata: {
          variant: "introThreeCards",
          cards: [
            {
              title: "Emergencies",
              emoji: "🚨",
              color: "blue",
              description: "Unexpected expenses won't stress you out.",
            },
            {
              title: "Goals",
              emoji: "🎯",
              color: "green",
              description: "Holidays, a car, or a future house deposit.",
            },
            {
              title: "Opportunities",
              emoji: "🌟",
              color: "purple",
              description:
                "Courses, starting a business, or saying yes to something big.",
            },
          ],
        },
      },

      // Pay Yourself First
      {
        id: "pay-yourself-first",
        type: "explanation",
        title: "Pay Yourself First (The Golden Rule)",
        icon: "Target",
        colorScheme: "green",
        metadata: {
          variant: "featureWithList",
          featureBox: {
            title: "The Secret: Save BEFORE You Spend",
            text: "As soon as money comes in, move your savings amount to a separate account. Treat it like a bill you MUST pay.",
          },
          listTitle: "How it works:",
          listItems: [
            "Get paid £500",
            "Immediately save £50 (10%)",
            "Live on the remaining £450",
            "Never touch the £50 savings",
          ],
          proTipTitle: "💡 Pro Tip:",
          proTipText:
            "Set up an automatic transfer on payday. If you don't see the money, you won't miss it!",
        },
      },

      // Emergency Fund
      {
        id: "emergency-fund",
        type: "explanation",
        title: "Emergency Fund: Your Financial Safety Net",
        icon: "Shield",
        colorScheme: "red",
        content:
          "An emergency fund is money saved specifically for unexpected expenses. It's not for holidays or shopping – it's for genuine emergencies.",
        metadata: {
          variant: "emergencyFund",
          emergencyTitle: "What counts as an emergency?",
          emergencyItems: [
            "Car breaks down",
            "Laptop dies during exams",
            "Unexpected medical expenses",
            "Lost job or reduced hours",
            "Urgent travel for a family emergency",
          ],
          amountBlocks: [
            {
              label: "Students / Part-time:",
              value: "£500–£1000",
              color: "green",
            },
            {
              label: "Full-time workers:",
              value: "3–6 months expenses",
              color: "blue",
            },
          ],
          whereTitle: "Where to keep it:",
          whereItems: [
            "✅ High-interest savings account",
            "✅ Easy access (not locked away)",
            "✅ Separate from spending money",
            "❌ Not invested (too risky)",
          ],
        },
      },

      // SMART Savings Goals
      {
        id: "smart-goals",
        type: "explanation",
        title: "Setting Savings Goals (SMART Method)",
        colorScheme: "blue",
        content:
          'Vague goals like "save more money" don\'t work. Use the SMART method for goals you\'ll actually achieve.',
        metadata: {
          variant: "smartGoals",
          smartTitle: "SMART Savings Goals:",
          smartItems: [
            {
              letter: "S",
              color: "blue",
              text: 'pecific – "Save for a holiday to Spain"',
            },
            {
              letter: "M",
              color: "green",
              text: 'easurable – "Need £800 total"',
            },
            {
              letter: "A",
              color: "orange",
              text: 'chievable – "Can save £100/month"',
            },
            {
              letter: "R",
              color: "red",
              text: 'elevant – "Really want this holiday"',
            },
            {
              letter: "T",
              color: "purple",
              text: 'ime-bound – "By next August (8 months)"',
            },
          ],
          horizonsTitle: "Types of savings goals:",
          horizons: [
            {
              title: "Short-term (1–12 months)",
              color: "green",
              text: "Holiday, laptop, course.",
            },
            {
              title: "Medium-term (1–5 years)",
              color: "blue",
              text: "Car, house deposit.",
            },
            {
              title: "Long-term (5+ years)",
              color: "purple",
              text: "Retirement, investment property.",
            },
          ],
        },
      },

      // Practical Saving Tips for Students
      {
        id: "practical-saving-tips",
        type: "list",
        title: "💡 Practical Saving Tips for Students",
        colorScheme: "green",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Easy Wins:",
              color: "green",
              items: [
                'Use the "52-week challenge" (save £1 week 1, £2 week 2, etc.)',
                "Save all £5 notes you receive",
                "Use student discounts (UNiDAYS, Student Beans)",
                "Cook at home more often",
                "Buy supermarket own-brand instead of big names",
              ],
            },
            {
              title: "Apps to Help:",
              color: "blue",
              items: [
                "Monzo / Starling: Round up spare change",
                "Plum: Automatically saves small amounts",
                "Chip: AI-powered saving",
                "YNAB: Budgeting app",
                "Honey: Finds discount codes online",
              ],
            },
          ],
        },
      },

      // Ready to Start Saving? (separate section before quiz CTA)
      {
        id: "ready-to-start-saving",
        type: "explanation",
        title: "Ready to Start Saving?",
        colorScheme: "blue",
        content:
          "Turn these ideas into action with a simple plan you can start today.",
        metadata: {
          variant: "actionPlan",
          boxTitle: "Your Action Plan:",
          steps: [
            "Set up a separate savings account.",
            "Decide on your emergency fund target (start with £500).",
            "Set up an automatic transfer for payday.",
            "Choose one SMART savings goal.",
            "Track your progress every month.",
          ],
        },
      },
    ],

    quiz: {
      passingScore: 1,
      questions: [
        {
          question:
            "How much should a full-time worker aim to have in their emergency fund?",
          options: [
            "1 month of expenses",
            "3–6 months of expenses",
            "1 year of expenses",
            "£100",
          ],
          correctAnswer: 1,
          explanation:
            "Most financial experts recommend saving 3–6 months of essential expenses in an emergency fund.",
        },
      ],
    },

    relatedLessons: [
      {
        moduleId: "banking-101",
        title: "Banking 101",
        relationship: "related",
      },
      {
        moduleId: "intro-investing",
        title: "Introduction to Investing",
        relationship: "next-step",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 2,
    isActive: true,
    createdBy: "system",
  },

  // BANKING 101
  {
    title: "Banking 101",
    description:
      "Understand different types of bank accounts, how interest works, and how to open your first account as a student.",

    categoryId: "core-money-skills",
    topic: "banking-101",

    visual: {
      icon: "Building2",
      iconColor: "bg-blue-500",
      badge: "Core Money Skills",
      readTime: 2,
    },

    contentSections: [
      // TYPES OF BANK ACCOUNTS – two big feature cards
      {
        id: "account-types",
        type: "comparison",
        title: "Types of Bank Accounts",
        content: "Understanding your options",
        icon: null,
        colorScheme: "blue",
        metadata: {
          variant: "twoFeatureCards",
          cards: [
            {
              title: "💳 Current Account",
              subtitle: "Your everyday spending account",
              color: "blue",
              bullets: [
                "Debit card for everyday spending",
                "Direct debits for bills and subscriptions",
                "Online and mobile banking access",
                "Usually no interest earned",
                "Perfect for daily expenses",
              ],
            },
            {
              title: "🏦 Savings Account",
              subtitle: "Where you grow your money",
              color: "green",
              bullets: [
                "Earns interest on your balance",
                "Sometimes limited withdrawals per month",
                "Often higher interest than current accounts",
                "Perfect for emergency funds and goals",
                "Money grows while you save",
              ],
            },
          ],
        },
      },

      // HOW INTEREST WORKS – reuse explanation variant, no new layout needed
      {
        id: "how-interest-works",
        type: "explanation",
        title: "How Interest Works",
        content:
          "When you save money in a bank, they pay you interest as a 'thank you' for letting them use your money. Over time, this interest can grow your savings — especially when you earn interest on your interest (compound interest).",
        icon: "Percent",
        colorScheme: "green",
        metadata: {
          variant: "info",
          description: "Why banks pay you to save money with them.",
          examples: [
            "Simple example: Save £1,000 at 5% per year → After 1 year you have £1,050.",
            "Compound interest: In year 2, you earn interest on £1,050, not just £1,000.",
            "Over several years, your interest starts earning its own interest.",
          ],
          highlightTitle: "💡 Pro Tip: Check the AER",
          highlightText:
            "Look for accounts with the highest AER (Annual Equivalent Rate). That’s the real interest rate you’ll get after compounding is taken into account.",
        },
      },

      // BEST STUDENT BANK ACCOUNTS – stacked cards
      {
        id: "student-accounts",
        type: "list",
        title: "Best Student Bank Accounts (Examples)",
        content:
          "Banks often compete for students with perks like 0% overdrafts and rewards. Here are example features you might see (always check the latest offers):",
        icon: "CreditCard",
        colorScheme: "blue",
        metadata: {
          variant: "cardsStack",
          cards: [
            {
              title: "🏦 Santander Student Account",
              color: "blue",
              items: [
                "FREE multi-year railcard or similar travel perk",
                "0% overdraft up to a set limit (e.g. £1,500)",
                "No monthly account fees",
              ],
            },
            {
              title: "🏦 HSBC Student Account",
              color: "green",
              items: [
                "0% overdraft up to a higher limit (e.g. £3,000)",
                "Welcome bonus or voucher when you open the account",
                "Modern mobile app and online banking",
              ],
            },
            {
              title: "🏦 NatWest Student Account",
              color: "purple",
              items: [
                "0% overdraft up to a set limit (e.g. £2,000)",
                "Cash reward or freebie when you switch",
                "Spending insights and budgeting tools in the app",
              ],
            },
          ],
        },
      },

      // OPENING YOUR FIRST ACCOUNT – two-column checklist
      {
        id: "opening-first-account",
        type: "list",
        title: "Opening Your First Bank Account",
        content: "What you'll need and what to expect at the appointment.",
        icon: null,
        colorScheme: "blue",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "📋 Documents Required",
              color: "blue",
              iconName: undefined,
              items: [
                "Photo ID (passport or driving licence)",
                "Proof of address (e.g. council tax or utility bill, bank statement)",
                "Student ID card or university acceptance letter",
                "Sometimes: birth certificate or extra proof if needed",
              ],
            },
            {
              title: "📝 What to Expect",
              color: "green",
              iconName: undefined,
              items: [
                "30–60 minute appointment (often can be done online now)",
                "Questions about your income and typical spending",
                "Debit card arriving by post in a few days",
                "Online and mobile banking set up on the spot",
              ],
            },
          ],
        },
      },

      // TOP TIPS – separate pastel tips section
      {
        id: "banking-top-tips",
        type: "list",
        title: "Top Tips When Choosing a Bank",
        content: "",
        icon: null,
        colorScheme: "yellow",
        metadata: {
          variant: "pastel",
          listItems: [
            "Compare several banks — don’t just pick the closest branch.",
            "Look at overdraft rules carefully (limit, fees, when interest starts).",
            "Check the quality of the mobile app and online banking.",
            "See what student-specific perks are available (railcards, cash bonuses, discounts).",
            "Set up mobile and online banking immediately so you can track spending.",
          ],
        },
      },

      // READY TO OPEN YOUR ACCOUNT? – action-style steps
      {
        id: "ready-to-open-account",
        type: "steps",
        title: "Ready to Open Your Account?",
        content:
          "Follow this simple action plan to get your first bank account up and running with confidence.",
        icon: null,
        colorScheme: "green",
        metadata: {
          variant: "default",
          steps: [
            {
              number: 1,
              text: "Pick your preferred bank",
              description:
                "Compare overdraft limits, perks, fees, and app quality. Choose the one that fits your needs best.",
            },
            {
              number: 2,
              text: "Gather your documents",
              description:
                "Make sure you have photo ID, proof of address, and your student ID or acceptance letter ready.",
            },
            {
              number: 3,
              text: "Book an appointment or apply online",
              description:
                "Most student accounts can be opened online. If you prefer in-person, book a branch appointment.",
            },
            {
              number: 4,
              text: "Set up mobile banking",
              description:
                "As soon as your account is open, download the app, enable notifications, and log in.",
            },
            {
              number: 5,
              text: "Link it to your budget",
              description:
                "Use your current account for day-to-day spending and your savings account for goals and emergency funds.",
            },
          ],
        },
      },
    ],

    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "Which type of account is best for everyday spending?",
          options: [
            "Current account",
            "Savings account",
            "Investment account",
            "Credit account",
          ],
          correctAnswer: 0,
          explanation:
            "Current accounts are designed for day-to-day spending with a debit card and easy access to your money. Savings accounts are better for building up money over time.",
        },
      ],
    },

    relatedLessons: [
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "prerequisite",
      },
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "next-step",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 2,
    order: 2,
    isActive: true,

    createdBy: "system",
  },

  // Understanding Credit Scores
  {
    title: "Understanding Credit Scores",
    description:
      "Learn what credit scores mean, how they are calculated, and how to build strong credit as a student.",

    categoryId: "core-money-skills",
    topic: "understanding-credit-scores",

    visual: {
      icon: "CreditCard",
      iconColor: "bg-blue-500",
      badge: "Core Money Skills",
      readTime: 3,
    },

    /* ========================= CONTENT SECTIONS ========================= */
    contentSections: [
      /* -------------------------------------------------------------
       * 1. What is a Credit Score?  (+ Score Range Grid)
       * ------------------------------------------------------------- */
      {
        id: "what-is-credit-score",
        type: "explanation",
        title: "What is a Credit Score?",
        content:
          "A credit score is like a financial report card that tells lenders how trustworthy you are with money. It's a number between 300-850 that affects your ability to borrow money.",
        metadata: { variant: "default" },
      },

      {
        id: "credit-score-ranges",
        type: "comparison",
        title: "Credit Score Ranges",
        metadata: {
          variant: "scoreRangeGrid",
          ranges: [
            {
              label: "Poor",
              range: "300–579",
              bgColor: "bg-red-100",
              textColor: "text-red-700",
            },
            {
              label: "Fair",
              range: "580–669",
              bgColor: "bg-orange-100",
              textColor: "text-orange-700",
            },
            {
              label: "Good",
              range: "670–739",
              bgColor: "bg-yellow-100",
              textColor: "text-yellow-700",
            },
            {
              label: "Very Good",
              range: "740–799",
              bgColor: "bg-blue-100",
              textColor: "text-blue-700",
            },
            {
              label: "Excellent",
              range: "800–850",
              bgColor: "bg-green-100",
              textColor: "text-green-700",
            },
          ],
        },
      },

      /* -------------------------------------------------------------
       * 2. Why Credit Scores Matter  (Two Columns + Impact Box)
       * ------------------------------------------------------------- */
      {
        id: "why-credit-scores-matter",
        type: "list",
        title: "Why Your Credit Score Matters",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Good Credit Score Gets You:",
              color: "green",
              items: [
                "Lower interest rates on loans",
                "Better credit card offers",
                "Easier mortgage approval",
                "Better mobile phone contracts",
                "Easier car finance",
                "Some rental agreements",
              ],
            },
            {
              title: "Poor Credit Score Means:",
              color: "red",
              items: [
                "Higher interest rates",
                "Loan applications rejected",
                "Larger deposits required",
                "Limited credit card options",
                "Difficulty renting properties",
                "More expensive insurance",
              ],
            },
          ],
        },
      },

      {
        id: "real-impact",
        type: "explanation",
        title: "💰 Real Impact Example",
        content:
          "On a £200,000 mortgage: Excellent credit (1.5% rate) vs Poor credit (4.5% rate) can be more than £3,000 difference per year in payments!",
        metadata: {
          variant: "info",
        },
      },

      /* -------------------------------------------------------------
       * 3. How Credit Scores Are Calculated  (Percent List Cards)
       * ------------------------------------------------------------- */
      {
        id: "score-calculation",
        type: "list",
        title: "How Credit Scores Are Calculated",
        metadata: {
          variant: "percentListCards",
          items: [
            {
              percent: "35%",
              title: "Payment History",
              description: "Do you pay bills on time?",
              bgColor: "bg-blue-100 text-blue-700",
            },
            {
              percent: "30%",
              title: "Credit Utilization",
              description: "How much of your available credit do you use?",
              bgColor: "bg-green-100 text-green-700",
            },
            {
              percent: "15%",
              title: "Length of Credit History",
              description: "How long have you had credit accounts?",
              bgColor: "bg-purple-100 text-purple-700",
            },
            {
              percent: "10%",
              title: "Credit Mix",
              description: "Variety of credit types (cards, loans, etc.)",
              bgColor: "bg-orange-100 text-orange-700",
            },
            {
              percent: "10%",
              title: "New Credit",
              description: "Recent credit applications and new accounts",
              bgColor: "bg-red-100 text-red-700",
            },
          ],
        },
      },

      /* -------------------------------------------------------------
       * 4. Building Credit as a Student (Warning + Columns)
       * ------------------------------------------------------------- */
      {
        id: "build-credit-vs-killers",
        type: "list",
        title: "Building Credit as a Student",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Smart Ways to Build Credit",
              color: "green",
              items: [
                "Get a student credit card",
                "Register to vote",
                "Pay all bills on time",
                "Keep credit utilization under 30%",
                "Don't close old accounts",
                "Check your score regularly (free)",
              ],
            },
            {
              title: "Credit Score Killers",
              color: "red",
              items: [
                "Missing payments",
                "Maxing out credit cards",
                "Applying for lots of credit quickly",
                "Only making minimum payments",
                "Not checking for errors",
                "Using payday loans",
              ],
            },
          ],
        },
      },
      
      {
        id: "starting-from-zero",
        type: "explanation",
        title: "⚠️ Starting From Zero",
        content: 
          "Most students have no credit history. This means 'no score' rather than a bad score — and that’s completely normal.",
        metadata: {
          variant: "info",
        },
      },

      /* -------------------------------------------------------------
       * 5. Free Credit Score Checks (Agency Grid)
       * ------------------------------------------------------------- */
      {
        id: "free-checks",
        type: "list",
        title: "Check Your Credit Score (FREE!)",
        metadata: {
          variant: "agencyGrid",
          agencies: [
            {
              name: "Experian",
              description: "Most comprehensive, used by most lenders",
              bgColor: "bg-blue-50",
              textColor: "text-blue-700",
            },
            {
              name: "Equifax",
              description: "Great for spotting errors",
              bgColor: "bg-green-50",
              textColor: "text-green-700",
            },
            {
              name: "TransUnion",
              description: "Growing in popularity, good insights",
              bgColor: "bg-purple-50",
              textColor: "text-purple-700",
            },
          ],
          tips: [
            "Check all three agencies (they can differ!)",
            "Checking your own score DOES NOT affect it",
            "Dispute mistakes as soon as you find them",
            "Monitor changes monthly",
          ],
        },
      },
    ],

    /* =============================== QUIZ =============================== */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the typical UK credit score range?",
          options: ["300-850", "0-1000", "1-10", "0-999"],
          correctAnswer: 0,
          explanation:
            "Credit scores usually range from 300 to 850. Higher scores indicate better creditworthiness.",
        },
      ],
    },

    /* =========================== RELATED LESSONS =========================== */
    relatedLessons: [
      {
        moduleId: "good-vs-bad-debt",
        title: "Learn About Debt",
        relationship: "next-step",
      },
      {
        moduleId: "credit-cards-safely",
        title: "Using Credit Cards Safely",
        relationship: "related",
      },
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,

    order: 4, // after budgeting, saving, banking
    isActive: true,
    createdBy: "system",
  },
];



// =====================================================
// Seed Function
// =====================================================
async function seedCoreMoneySkills() {
  try {
    for (const module of coreMoneySkillsModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
    }

    console.log("✅ Core Money Skills modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Core Money Skills:", error);
  }
}

module.exports = {
  coreMoneySkillsModules,
  seedCoreMoneySkills,
};
