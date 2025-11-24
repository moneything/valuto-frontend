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
    "title": "Budgeting Basics",
    "topic": "budgeting-basics",
    "categoryId": "core-money-skills",

    "visual": {
      "icon": "Wallet",
      "iconColor": "bg-blue-500",
      "badge": "Core Money Skills",
      "readTime": 3
    },

    "difficultyLevel": "beginner",
    "points": 100,
    "timeEstimate": 3,
    "order": 1,
    "isActive": true,

    "uiTree": [
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
                  { "type": "Icon", "props": { "name": "TrendingUp", "className": "h-5 w-5" } },
                  "What is a Budget?"
                ]
              }
            ]
          },
          {
            "type": "CardContent",
            "props": { "className": "space-y-4" },
            "children": [
              {
                "type": "Text",
                "props": { "className": "text-lg" },
                "children": [
                  "A budget is simply a plan for your money. It helps you see where your money comes from and where it goes, so you can make sure you have enough for the things you need and want."
                ]
              },
              {
                "type": "Box",
                "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold" }, "children": ["Think of it like this:"] },
                  {
                    "type": "Text",
                    "children": [
                      "If your money was water, a budget would be like having different buckets to catch it – one for rent, one for food, one for fun, and one for saving!"
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
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Needs vs Wants: The Foundation"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "columns": 2, "gap": 6 },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "space-y-3" },
                    "children": [
                      {
                        "type": "Text",
                        "props": { "className": "text-lg font-semibold text-green-600" },
                        "children": ["✅ NEEDS (Must Have)"]
                      },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "icon": "CheckCircle", "iconColor": "text-green-500", "children": ["Rent/Housing"] },
                          { "type": "ListItem", "icon": "CheckCircle", "iconColor": "text-green-500", "children": ["Food & Groceries"] },
                          { "type": "ListItem", "icon": "CheckCircle", "iconColor": "text-green-500", "children": ["Transport to work/uni"] },
                          { "type": "ListItem", "icon": "CheckCircle", "iconColor": "text-green-500", "children": ["Phone bill"] },
                          { "type": "ListItem", "icon": "CheckCircle", "iconColor": "text-green-500", "children": ["Essential clothing"] }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Box",
                    "props": { "className": "space-y-3" },
                    "children": [
                      {
                        "type": "Text",
                        "props": { "className": "text-lg font-semibold text-orange-600" },
                        "children": ["⚠️ WANTS (Nice to Have)"]
                      },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "icon": "AlertCircle", "iconColor": "text-orange-500", "children": ["Netflix/Spotify subscriptions"] },
                          { "type": "ListItem", "icon": "AlertCircle", "iconColor": "text-orange-500", "children": ["Eating out/takeaways"] },
                          { "type": "ListItem", "icon": "AlertCircle", "iconColor": "text-orange-500", "children": ["Designer clothes"] },
                          { "type": "ListItem", "icon": "AlertCircle", "iconColor": "text-orange-500", "children": ["Gaming/entertainment"] },
                          { "type": "ListItem", "icon": "AlertCircle", "iconColor": "text-orange-500", "children": ["Holidays"] }
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
              { "type": "CardTitle", "children": ["The 50/30/20 Rule (Perfect for Students!)"] },
              { "type": "CardDescription", "children": ["The simplest way to budget your money"] }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "columns": 3, "gap": 4 },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "bg-green-50 p-4 rounded-lg border border-green-200" },
                    "children": [
                      { "type": "Text", "props": { "className": "text-xl font-bold text-green-700" }, "children": ["50%"] },
                      { "type": "Text", "props": { "className": "font-semibold text-green-600" }, "children": ["NEEDS"] },
                      { "type": "Text", "props": { "className": "text-sm" }, "children": ["Rent, food, transport, phone"] }
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "bg-blue-50 p-4 rounded-lg border border-blue-200" },
                    "children": [
                      { "type": "Text", "props": { "className": "text-xl font-bold text-blue-700" }, "children": ["30%"] },
                      { "type": "Text", "props": { "className": "font-semibold text-blue-600" }, "children": ["WANTS"] },
                      { "type": "Text", "props": { "className": "text-sm" }, "children": ["Fun, eating out, entertainment"] }
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "bg-purple-50 p-4 rounded-lg border border-purple-200" },
                    "children": [
                      { "type": "Text", "props": { "className": "text-xl font-bold text-purple-700" }, "children": ["20%"] },
                      { "type": "Text", "props": { "className": "font-semibold text-purple-600" }, "children": ["SAVINGS"] },
                      { "type": "Text", "props": { "className": "text-sm" }, "children": ["Emergency fund, future goals"] }
                    ]
                  }
                ]
              },

              {
                "type": "Box",
                "props": { "className": "mt-6 p-4 bg-accent rounded-lg" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold mb-2" }, "children": ["Example with £1000/month income:"] },
                  {
                    "type": "List",
                    "children": [
                      { "type": "ListItem", "children": ["• £500 for needs (rent, food, transport)"] },
                      { "type": "ListItem", "children": ["• £300 for wants (fun, eating out)"] },
                      { "type": "ListItem", "children": ["• £200 for savings"] }
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
            "children": [{ "type": "CardTitle", "children": ["How to Start Budgeting (3 Easy Steps)"] }]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "List",
                "children": [
                  {
                    "type": "ListItem",
                    "title": "Track Your Income",
                    "description": "Add up all money coming in: part-time job, student loan, family support",
                    "numbered": 1
                  },
                  {
                    "type": "ListItem",
                    "title": "List Your Expenses",
                    "description": "Write down everything you spend money on for a week",
                    "numbered": 2
                  },
                  {
                    "type": "ListItem",
                    "title": "Apply the 50/30/20 Rule",
                    "description": "Split your income and adjust your spending to fit",
                    "numbered": 3
                  }
                ]
              }
            ]
          }
        ]
      },

      {
        "type": "Card",
        "props": { "className": "bg-gradient-to-r from-primary/10 to-secondary/10" },
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["💡 Quick Budgeting Tips"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "List",
                "children": [
                  { "type": "ListItem", "children": ["Use apps like Monzo or Starling to track spending"] },
                  { "type": "ListItem", "children": ["Review your budget monthly"] },
                  { "type": "ListItem", "children": ["If overspending, reduce another category"] },
                  { "type": "ListItem", "children": ["Start with £100 – build the habit"] },
                  { "type": "ListItem", "children": ["Budgeting gives freedom, not restriction"] }
                ]
              }
            ]
          }
        ]
      }
    ],

    "quiz": {
      "passingScore": 1,
      "questions": [
        {
          "question": "What is the 50/30/20 budgeting rule?",
          "options": ["50/30/20", "60/20/20", "40/40/20", "50/25/25"],
          "correctAnswer": 0,
          "explanation": "50% needs, 30% wants, 20% savings."
        }
      ]
    },

    "relatedLessons": [
      { "moduleId": "saving-strategies", "title": "Saving Strategies", "relationship": "next-step" },
      { "moduleId": "banking-101", "title": "Banking 101", "relationship": "next-step" }
    ]
  },

  // Saving Strategies
  {
    "title": "Saving Strategies",
    "topic": "saving-strategies",
    "categoryId": "core-money-skills",

    "visual": {
      "icon": "PiggyBank",
      "iconColor": "bg-green-500",
      "badge": "Core Money Skills",
      "readTime": 3
    },

    "difficultyLevel": "beginner",
    "points": 100,
    "timeEstimate": 3,
    "order": 2,
    "isActive": true,

    "uiTree": [
      /* ============================================================
      * INTRO: WHY SAVE MONEY?
      * ============================================================ */
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
                  { "type": "Icon", "props": { "name": "TrendingUp", "className": "h-5 w-5" } },
                  "Why Save Money?"
                ]
              }
            ]
          },
          {
            "type": "CardContent",
            "props": { "className": "space-y-4" },
            "children": [
              {
                "type": "Text",
                "props": { "className": "text-lg" },
                "children": [
                  "Saving money gives you freedom and peace of mind. It's not about being cheap – it's about being prepared for opportunities and emergencies."
                ]
              },

              {
                "type": "Grid",
                "props": { "columns": 3, "gap": 4 },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "bg-blue-50 p-4 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-blue-700" }, "children": ["🚨 Emergencies"] },
                      { "type": "Text", "props": { "className": "text-sm" }, "children": ["Unexpected expenses won't stress you out"] }
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "bg-green-50 p-4 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-green-700" }, "children": ["🎯 Goals"] },
                      { "type": "Text", "props": { "className": "text-sm" }, "children": ["Holiday, car, house deposit"] }
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "bg-purple-50 p-4 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-purple-700" }, "children": ["🌟 Opportunities"] },
                      { "type": "Text", "props": { "className": "text-sm" }, "children": ["Job course, starting a business"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * PAY YOURSELF FIRST
      * ============================================================ */
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
                  { "type": "Icon", "props": { "name": "Target", "className": "h-5 w-5" } },
                  "Pay Yourself First (The Golden Rule)"
                ]
              }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Box",
                "props": { "className": "bg-primary/10 p-6 rounded-lg mb-4" },
                "children": [
                  { "type": "Text", "props": { "className": "text-xl font-bold mb-2" }, "children": ["The Secret: Save BEFORE You Spend"] },
                  {
                    "type": "Text",
                    "props": { "className": "text-lg" },
                    "children": [
                      "As soon as money comes in, immediately move your savings amount to a separate account. Treat it like a bill you MUST pay."
                    ]
                  }
                ]
              },

              {
                "type": "Box",
                "props": { "className": "space-y-3" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold" }, "children": ["How it works:"] },
                  {
                    "type": "List",
                    "props": { "ordered": true },
                    "children": [
                      { "type": "ListItem", "children": ["Get paid £500"] },
                      { "type": "ListItem", "children": ["Immediately save £50 (10%)"] },
                      { "type": "ListItem", "children": ["Live on the remaining £450"] },
                      { "type": "ListItem", "children": ["Never touch the £50 savings"] }
                    ]
                  }
                ]
              },

              {
                "type": "Box",
                "props": { "className": "mt-4 p-4 bg-accent rounded-lg" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold" }, "children": ["💡 Pro Tip:"] },
                  {
                    "type": "Text",
                    "children": [
                      "Set up an automatic transfer on payday. If you don't see the money, you won't miss it!"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * EMERGENCY FUND
      * ============================================================ */
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
                  { "type": "Icon", "props": { "name": "Shield", "className": "h-5 w-5" } },
                  "Emergency Fund: Your Financial Safety Net"
                ]
              }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Box",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "Text",
                    "children": [
                      "An emergency fund is money saved specifically for unexpected expenses. It's not for holidays or shopping – it's for genuine emergencies."
                    ]
                  },

                  {
                    "type": "Box",
                    "props": { "className": "bg-red-50 border-l-4 border-red-400 p-4" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-red-700" }, "children": ["What counts as an emergency?"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• Car breaks down"] },
                          { "type": "ListItem", "children": ["• Laptop dies during exams"] },
                          { "type": "ListItem", "children": ["• Unexpected medical expenses"] },
                          { "type": "ListItem", "children": ["• Lost job/reduced hours"] },
                          { "type": "ListItem", "children": ["• Urgent travel for family emergency"] }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Grid",
                    "props": { "columns": 2, "gap": 4 },
                    "children": [
                      {
                        "type": "Box",
                        "props": { "className": "space-y-3" },
                        "children": [
                          { "type": "Text", "props": { "className": "font-semibold" }, "children": ["How much to save:"] },
                          {
                            "type": "List",
                            "children": [
                              {
                                "type": "ListItem",
                                "children": ["Students/Part-time: ", { "type": "Strong", "children": ["£500–£1000"] }]
                              },
                              {
                                "type": "ListItem",
                                "children": ["Full-time workers: ", { "type": "Strong", "children": ["3–6 months expenses"] }]
                              }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "Box",
                        "props": { "className": "space-y-3" },
                        "children": [
                          { "type": "Text", "props": { "className": "font-semibold" }, "children": ["Where to keep it:"] },
                          {
                            "type": "List",
                            "children": [
                              { "type": "ListItem", "children": ["✅ High-interest savings account"] },
                              { "type": "ListItem", "children": ["✅ Easy access (not locked away)"] },
                              { "type": "ListItem", "children": ["✅ Separate from spending money"] },
                              { "type": "ListItem", "children": ["❌ Not invested (too risky)"] }
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

      /* ============================================================
      * SMART SAVINGS GOALS
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Setting Savings Goals (SMART Method)"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Text",
                "children": [
                  "Vague goals like 'save more money' don't work. Use the SMART method for goals you'll actually achieve."
                ]
              },

              {
                "type": "Box",
                "props": { "className": "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mt-4" },
                "children": [
                  { "type": "Text", "props": { "className": "font-bold text-lg mb-3" }, "children": ["SMART Savings Goals:"] },
                  {
                    "type": "List",
                    "children": [
                      { "type": "ListItem", "children": ["S — Specific: \"Save for a holiday to Spain\""] },
                      { "type": "ListItem", "children": ["M — Measurable: \"Need £800 total\""] },
                      { "type": "ListItem", "children": ["A — Achievable: \"Can save £100/month\""] },
                      { "type": "ListItem", "children": ["R — Relevant: \"Really want this holiday\""] },
                      { "type": "ListItem", "children": ["T — Time-bound: \"By next August (8 months)\""] }
                    ]
                  }
                ]
              },

              {
                "type": "Grid",
                "props": { "columns": 3, "gap": 4, "className": "mt-6" },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "text-center p-4 bg-green-50 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-green-700" }, "children": ["Short-term (1–12 months)"] },
                      { "type": "Text", "props": { "className": "text-sm mt-1" }, "children": ["Holiday, laptop, course"] }
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "text-center p-4 bg-blue-50 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-blue-700" }, "children": ["Medium-term (1–5 years)"] },
                      { "type": "Text", "props": { "className": "text-sm mt-1" }, "children": ["Car, house deposit"] }
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "text-center p-4 bg-purple-50 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-purple-700" }, "children": ["Long-term (5+ years)"] },
                      { "type": "Text", "props": { "className": "text-sm mt-1" }, "children": ["Retirement, investment property"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * PRACTICAL SAVING TIPS
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["💡 Practical Saving Tips for Students"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "columns": 2, "gap": 6 },
                "children": [
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold mb-3" }, "children": ["Easy Wins:"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• 52-week challenge (save £1 week 1, £2 week 2, etc.)"] },
                          { "type": "ListItem", "children": ["• Save all £5 notes you receive"] },
                          { "type": "ListItem", "children": ["• Use student discounts (UNiDAYS, Student Beans)"] },
                          { "type": "ListItem", "children": ["• Cook at home more often"] },
                          { "type": "ListItem", "children": ["• Buy generic instead of big-name brands"] }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold mb-3" }, "children": ["Apps to Help:"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• Monzo/Starling: Round up spare change"] },
                          { "type": "ListItem", "children": ["• Plum: Automatically saves small amounts"] },
                          { "type": "ListItem", "children": ["• Chip: AI-powered saving"] },
                          { "type": "ListItem", "children": ["• YNAB: Budgeting app"] },
                          { "type": "ListItem", "children": ["• Honey: Finds discount codes"] }
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

    /* ============================================================
    * QUIZ
    * ============================================================ */
    "quiz": {
      "passingScore": 1,
      "questions": [
        {
          "question": "How much should a full-time worker have in their emergency fund?",
          "options": ["1 month expenses", "3-6 months expenses", "1 year expenses", "£100"],
          "correctAnswer": 1,
          "explanation": "Financial experts recommend 3–6 months of expenses saved."
        }
      ]
    },

    /* ============================================================
    * RELATED LESSONS
    * ============================================================ */
    "relatedLessons": [
      { "moduleId": "banking-101", "title": "Banking 101", "relationship": "next-step" },
      { "moduleId": "intro-investing", "title": "Introduction to Investing", "relationship": "next-step" }
    ]
  },


  // BANKING 101
  {
    "title": "Banking 101",
    "topic": "banking-101",
    "categoryId": "core-money-skills",

    "visual": {
      "icon": "Building2",
      "iconColor": "bg-blue-500",
      "badge": "Core Money Skills",
      "readTime": 2
    },

    "difficultyLevel": "beginner",
    "points": 100,
    "timeEstimate": 2,
    "order": 3,
    "isActive": true,

    "uiTree": [
      /* ============================================================
      * TYPES OF BANK ACCOUNTS
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["Types of Bank Accounts"] },
              { "type": "CardDescription", "children": ["Understanding your options"] }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "columns": 2, "gap": 6 },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "bg-blue-50 p-6 rounded-lg border border-blue-200" },
                    "children": [
                      { "type": "Text", "props": { "className": "text-xl font-bold text-blue-700 mb-3" }, "children": ["💳 Current Account"] },
                      { "type": "Text", "props": { "className": "text-blue-600 mb-3" }, "children": ["Your everyday spending account"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• Debit card for spending"] },
                          { "type": "ListItem", "children": ["• Direct debits for bills"] },
                          { "type": "ListItem", "children": ["• Online banking access"] },
                          { "type": "ListItem", "children": ["• Usually no interest earned"] },
                          { "type": "ListItem", "children": ["• Perfect for daily expenses"] }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Box",
                    "props": { "className": "bg-green-50 p-6 rounded-lg border border-green-200" },
                    "children": [
                      { "type": "Text", "props": { "className": "text-xl font-bold text-green-700 mb-3" }, "children": ["🏦 Savings Account"] },
                      { "type": "Text", "props": { "className": "text-green-600 mb-3" }, "children": ["Where you grow your money"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• Earns interest on your balance"] },
                          { "type": "ListItem", "children": ["• Limited withdrawals per month"] },
                          { "type": "ListItem", "children": ["• Higher interest than current accounts"] },
                          { "type": "ListItem", "children": ["• Perfect for emergency funds"] },
                          { "type": "ListItem", "children": ["• Money grows while you save"] }
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

      /* ============================================================
      * HOW INTEREST WORKS
      * ============================================================ */
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
                  { "type": "Icon", "props": { "name": "Percent", "className": "h-5 w-5" } },
                  "How Interest Works"
                ]
              }
            ]
          },

          {
            "type": "CardContent",
            "children": [
              {
                "type": "Box",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "text-xl font-bold mb-3" }, "children": ["Interest = Free Money!"] },
                      {
                        "type": "Text",
                        "props": { "className": "mb-4" },
                        "children": [
                          "When you save money in a bank, they pay you interest as a 'thank you' for letting them use your money."
                        ]
                      },

                      {
                        "type": "Grid",
                        "props": { "columns": 2, "gap": 4 },
                        "children": [
                          {
                            "type": "Box",
                            "children": [
                              { "type": "Text", "props": { "className": "font-semibold text-green-600 mb-2" }, "children": ["Simple Example:"] },
                              {
                                "type": "List",
                                "children": [
                                  { "type": "ListItem", "children": ["• You save: £1,000"] },
                                  { "type": "ListItem", "children": ["• Interest rate: 5% per year"] },
                                  { "type": "ListItem", "children": ["• After 1 year: £1,050"] },
                                  { "type": "ListItem", "children": ["• You earned: £50 for free!"] }
                                ]
                              }
                            ]
                          },

                          {
                            "type": "Box",
                            "children": [
                              { "type": "Text", "props": { "className": "font-semibold text-blue-600 mb-2" }, "children": ["Compound Interest:"] },
                              {
                                "type": "List",
                                "children": [
                                  { "type": "ListItem", "children": ["• Year 2: £1,050 + 5% = £1,102.50"] },
                                  { "type": "ListItem", "children": ["• Year 3: £1,102.50 + 5% = £1,157.63"] },
                                  { "type": "ListItem", "children": ["• Your interest earns interest!"] }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Box",
                    "props": { "className": "p-4 bg-accent rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold mb-2" }, "children": ["💡 Pro Tip:"] },
                      {
                        "type": "Text",
                        "props": { "className": "text-sm" },
                        "children": [
                          "Look for accounts with the highest AER (Annual Equivalent Rate) – that's the real interest rate you'll get!"
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

      /* ============================================================
      * BEST STUDENT ACCOUNTS
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Best Student Bank Accounts (2024)"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "gap": 4 },
                "children": [
                  {
                    "type": "Box",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-blue-600" }, "children": ["🏦 Santander Student Account"] },
                      {
                        "type": "List",
                        "props": { "className": "text-sm mt-2 space-y-1" },
                        "children": [
                          { "type": "ListItem", "children": ["• FREE 4-year 16–25 Railcard"] },
                          { "type": "ListItem", "children": ["• 0% overdraft up to £1,500"] },
                          { "type": "ListItem", "children": ["• No monthly fees"] }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Box",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-green-600" }, "children": ["🏦 HSBC Student Account"] },
                      {
                        "type": "List",
                        "props": { "className": "text-sm mt-2 space-y-1" },
                        "children": [
                          { "type": "ListItem", "children": ["• 0% overdraft up to £3,000"] },
                          { "type": "ListItem", "children": ["• £80 Amazon voucher"] },
                          { "type": "ListItem", "children": ["• Great mobile app"] }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Box",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-purple-600" }, "children": ["🏦 NatWest Student Account"] },
                      {
                        "type": "List",
                        "props": { "className": "text-sm mt-2 space-y-1" },
                        "children": [
                          { "type": "ListItem", "children": ["• 0% overdraft up to £2,000"] },
                          { "type": "ListItem", "children": ["• £100 cash when you switch"] },
                          { "type": "ListItem", "children": ["• Spending insights + budgeting tools"] }
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

      /* ============================================================
      * OPENING YOUR FIRST ACCOUNT
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Opening Your First Bank Account"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Text",
                "props": { "className": "font-semibold" },
                "children": ["What You'll Need:"]
              },

              {
                "type": "Grid",
                "props": { "columns": 2, "gap": 4 },
                "children": [
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-medium text-blue-600 mb-2" }, "children": ["📋 Documents Required:"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• Photo ID (passport/driver’s license)"] },
                          { "type": "ListItem", "children": ["• Proof of address"] },
                          { "type": "ListItem", "children": ["• Student ID or uni acceptance letter"] },
                          { "type": "ListItem", "children": ["• Sometimes: birth certificate"] }
                        ]
                      }
                    ]
                  },

                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-medium text-green-600 mb-2" }, "children": ["📝 What to Expect:"] },
                      {
                        "type": "List",
                        "children": [
                          { "type": "ListItem", "children": ["• 30–60 minute appointment"] },
                          { "type": "ListItem", "children": ["• Income/expenses questions"] },
                          { "type": "ListItem", "children": ["• Debit card in 3–5 days"] },
                          { "type": "ListItem", "children": ["• Online banking setup on the spot"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                "type": "Box",
                "props": { "className": "bg-primary/10 p-4 rounded-lg mt-4" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold mb-2" }, "children": ["💡 Top Tips:"] },
                  {
                    "type": "List",
                    "children": [
                      { "type": "ListItem", "children": ["• Shop around for perks"] },
                      { "type": "ListItem", "children": ["• Don't pick the closest branch by default"] },
                      { "type": "ListItem", "children": ["• Read overdraft terms carefully"] },
                      { "type": "ListItem", "children": ["• Set up mobile banking immediately"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    /* ============================================================
    * QUIZ
    * ============================================================ */
    "quiz": {
      "passingScore": 1,
      "questions": [
        {
          "question": "Which type of account is best for everyday spending?",
          "options": [
            "Current account",
            "Savings account",
            "Investment account",
            "Credit account"
          ],
          "correctAnswer": 0,
          "explanation": "Current accounts are made for day-to-day spending with a debit card."
        }
      ]
    },

    /* ============================================================
    * RELATED LESSONS
    * ============================================================ */
    "relatedLessons": [
      { "moduleId": "budgeting-basics", "title": "Budgeting Basics", "relationship": "next-step" },
      { "moduleId": "saving-strategies", "title": "Saving Strategies", "relationship": "next-step" }
    ]
  },


  // Understanding Credit Scores
  {
    "title": "Understanding Credit Scores",
    "topic": "credit-scores",
    "categoryId": "core-money-skills",

    "visual": {
      "icon": "CreditCard",
      "iconColor": "bg-blue-500",
      "badge": "Core Money Skills",
      "readTime": 2
    },

    "difficultyLevel": "beginner",
    "points": 100,
    "timeEstimate": 2,
    "order": 4,
    "isActive": true,

    "uiTree": [

      /* ============================================================
      * WHAT IS A CREDIT SCORE?
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["What is a Credit Score?"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Box",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "Text",
                    "props": { "className": "text-lg" },
                    "children": [
                      "A credit score is like a financial report card that tells lenders how trustworthy you are with money. It's a number between 300-850 that affects your ability to borrow money."
                    ]
                  },
                  {
                    "type": "Box",
                    "props": { "className": "bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 p-6 rounded-lg" },
                    "children": [
                      { "type": "Text", "props": { "className": "font-bold text-lg mb-4" }, "children": ["Credit Score Ranges:"] },
                      {
                        "type": "Grid",
                        "props": { "columns": 5, "gap": 2, "className": "text-center text-sm" },
                        "children": [
                          { "type": "Box", "props": { "className": "bg-red-100 p-3 rounded" }, "children": [{ "type": "Text", "props": { "className": "font-bold text-red-700" }, "children": ["Poor"] }, "300-579"] },
                          { "type": "Box", "props": { "className": "bg-orange-100 p-3 rounded" }, "children": [{ "type": "Text", "props": { "className": "font-bold text-orange-700" }, "children": ["Fair"] }, "580-669"] },
                          { "type": "Box", "props": { "className": "bg-yellow-100 p-3 rounded" }, "children": [{ "type": "Text", "props": { "className": "font-bold text-yellow-700" }, "children": ["Good"] }, "670-739"] },
                          { "type": "Box", "props": { "className": "bg-blue-100 p-3 rounded" }, "children": [{ "type": "Text", "props": { "className": "font-bold text-blue-700" }, "children": ["Very Good"] }, "740-799"] },
                          { "type": "Box", "props": { "className": "bg-green-100 p-3 rounded" }, "children": [{ "type": "Text", "props": { "className": "font-bold text-green-700" }, "children": ["Excellent"] }, "800-850"] }
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

      /* ============================================================
      * WHY CREDIT SCORES MATTER
      * ============================================================ */
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
                  { "type": "Icon", "props": { "name": "TrendingUp", "className": "h-5 w-5" } },
                  "Why Your Credit Score Matters"
                ]
              }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "columns": 2, "gap": 6 },
                "children": [
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-green-600 mb-3" }, "children": ["✅ Good Credit Score Gets You:"] },
                      {
                        "type": "List",
                        "children": [
                          "• Lower interest rates",
                          "• Better credit card offers",
                          "• Easier mortgage approval",
                          "• Better mobile phone contracts",
                          "• Easier car finance",
                          "• Some rental agreements"
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-red-600 mb-3" }, "children": ["❌ Poor Credit Score Means:"] },
                      {
                        "type": "List",
                        "children": [
                          "• Higher interest rates",
                          "• Loan rejections",
                          "• Larger deposits",
                          "• Limited credit cards",
                          "• Difficulty renting",
                          "• More expensive insurance"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Box",
                "props": { "className": "mt-6 p-4 bg-primary/10 rounded-lg" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold mb-2" }, "children": ["💰 Real Impact Example:"] },
                  { "type": "Text", "props": { "className": "text-sm" }, "children": ["On a £200,000 mortgage: 1.5% vs 4.5% = £3,000+ annual difference!"] }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * HOW CREDIT SCORES ARE CALCULATED
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["How Credit Scores Are Calculated"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "gap": 4 },
                "children": [
                  { "type": "FactorItem", "props": { "percent": "35%", "color": "blue", "title": "Payment History", "desc": "Do you pay bills on time?" } },
                  { "type": "FactorItem", "props": { "percent": "30%", "color": "green", "title": "Credit Utilization", "desc": "How much credit you use vs available" } },
                  { "type": "FactorItem", "props": { "percent": "15%", "color": "purple", "title": "Length of History", "desc": "How long accounts have existed" } },
                  { "type": "FactorItem", "props": { "percent": "10%", "color": "orange", "title": "Credit Mix", "desc": "Loans, cards, etc." } },
                  { "type": "FactorItem", "props": { "percent": "10%", "color": "red", "title": "New Credit", "desc": "Recent applications & accounts" } }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * BUILDING CREDIT AS A STUDENT
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Building Credit as a Student"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Box",
                "props": { "className": "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold text-yellow-700 mb-2" }, "children": ["⚠️ Starting From Zero"] },
                  { "type": "Text", "props": { "className": "text-sm" }, "children": ["Students usually have no credit history — this is normal!"] }
                ]
              },

              {
                "type": "Grid",
                "props": { "columns": 2, "gap": 4 },
                "children": [
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-green-600 mb-3" }, "children": ["✅ Smart Ways to Build Credit:"] },
                      {
                        "type": "List",
                        "children": [
                          "• Student credit card",
                          "• Register to vote",
                          "• Pay bills on time",
                          "• Keep credit usage < 30%",
                          "• Don’t close old accounts",
                          "• Monitor score monthly"
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Box",
                    "children": [
                      { "type": "Text", "props": { "className": "font-semibold text-red-600 mb-3" }, "children": ["❌ Credit Score Killers:"] },
                      {
                        "type": "List",
                        "children": [
                          "• Missing payments",
                          "• Maxing credit cards",
                          "• Applying for lots of credit",
                          "• Only minimum payments",
                          "• Not checking for errors",
                          "• Payday loans"
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

      /* ============================================================
      * FREE CREDIT SCORE CHECK
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Check Your Credit Score (FREE!)"] }] },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "Grid",
                "props": { "columns": 3, "gap": 4 },
                "children": [
                  { "type": "AgencyCard", "props": { "color": "blue", "title": "Experian", "desc": "Most widely used" } },
                  { "type": "AgencyCard", "props": { "color": "green", "title": "Equifax", "desc": "Great for error-checking" } },
                  { "type": "AgencyCard", "props": { "color": "purple", "title": "TransUnion", "desc": "Good insights" } }
                ]
              },
              {
                "type": "Box",
                "props": { "className": "mt-4 p-4 bg-accent rounded-lg" },
                "children": [
                  { "type": "Text", "props": { "className": "font-semibold mb-2" }, "children": ["💡 Pro Tips:"] },
                  {
                    "type": "List",
                    "children": [
                      "• Check all three agencies",
                      "• Checking your score does NOT hurt it",
                      "• Dispute errors",
                      "• Track changes monthly"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    /* ============================================================
    * QUIZ
    * ============================================================ */
    "quiz": {
      "passingScore": 1,
      "questions": [
        {
          "question": "What is the range for credit scores in the UK?",
          "options": ["300-850", "0-1000", "1-10", "0-999"],
          "correctAnswer": 0,
          "explanation": "Credit scores typically range from 300 (poor) to 850 (excellent)."
        }
      ]
    },

    /* ============================================================
    * RELATED LESSONS
    * ============================================================ */
    "relatedLessons": [
      { "moduleId": "good-vs-bad-debt", "title": "Learn About Debt", "relationship": "next-step" },
      { "moduleId": "credit-cards-safely", "title": "Using Credit Cards Safely", "relationship": "next-step" }
    ]
  }

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
