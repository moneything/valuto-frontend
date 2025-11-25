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
    description: "Learn the foundations of budgeting, needs vs wants, 50/30/20 rule, and how to build your first budget.",
    categoryId: "core-money-skills",
    topic: "budgeting-basics",
    createdBy: "system",

    visual: {
      icon: "Wallet",
      iconColor: "bg-blue-500",
      readTime: 3,
      badge: "Core Money Skills"
    },

    difficultyLevel: "beginner",
    timeEstimate: 8,
    points: 150,
    order: 1,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [

          /* ------------------------------------------------
              CARD 1 — What is a Budget?
          ------------------------------------------------ */
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
                      { "type": "TrendingUp", "props": { "className": "h-7 w-7" }},
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
                    "type": "p",
                    "props": { "className": "text-lg" },
                    "children": [
                      "A budget is simply a plan for your money. It helps you understand where your money comes from and where it goes so you can make smarter decisions."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                    "children": [
                      { "type": "p", "props": { "className": "font-semibold" }, "children": ["Think of it like this:"] },
                      {
                        "type": "p",
                        "children": [
                          "If your money was water, a budget would be different buckets for rent, food, fun, and savings!"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          /* ------------------------------------------------
              CARD 2 — Needs vs Wants
          ------------------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Needs vs Wants: The Foundation"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-6" },
                    "children": [

                      /* NEEDS */
                      {
                        "type": "div",
                        "props": { "className": "space-y-3" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-lg font-semibold text-green-600" }, "children": ["✅ NEEDS (Must Have)"] },
                          {
                            "type": "ul",
                            "props": { "className": "space-y-2 P-4" },
                            "children": [
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleCheckBig", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Rent/Housing"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleCheckBig", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Food & Groceries"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleCheckBig", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Transport to work/uni"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleCheckBig", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Phone bill"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleCheckBig", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Essential clothing"]},
                              ],},
                            ]
                          }
                        ]
                      },

                      /* WANTS */
                      {
                        "type": "div",
                        "props": { "className": "space-y-3" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-lg font-semibold text-orange-600" }, "children": ["⚠️ WANTS (Nice to Have)"] },
                                                    {
                            "type": "ul",
                            "props": { "className": "space-y-2 P-4" },
                            "children": [
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleAlert", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Netflix/Spotify"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleAlert", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Eating out & takeaways"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleAlert", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Designer clothes"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleAlert", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Gaming/entertainment"]},
                              ],},
                              {"type": "li", "props": {"className": "flex flex-row"}, "children" : [
                                {"type": "CircleAlert", "props": {"className": "text-green-500 mr-2 h-5 w-5 self-center"}, "children":[]},
                                {"type": "span", "children":["Holidays"]},
                              ],},
                            ]
                          },
                        ]
                      }

                    ]
                  }
                ]
              }
            ]
          },

          /* ------------------------------------------------
              CARD 3 — 50/30/20 Rule
          ------------------------------------------------ */
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

                  /* Three blocks (Needs/Wants/Savings) */
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-3 gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "bg-green-50 p-4 rounded-lg border border-green-200" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-xl font-bold text-green-700" }, "children": ["50%"] },
                          { "type": "h4", "props": { "className": "font-semibold text-green-600" }, "children": ["NEEDS"] },
                          { "type": "p", "props": { "className": "text-sm" }, "children": ["Rent, food, transport, phone"] }
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "bg-blue-50 p-4 rounded-lg border border-blue-200" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-xl font-bold text-blue-700" }, "children": ["30%"] },
                          { "type": "h4", "props": { "className": "font-semibold text-blue-600" }, "children": ["WANTS"] },
                          { "type": "p", "props": { "className": "text-sm" }, "children": ["Fun, eating out, entertainment"] }
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "bg-purple-50 p-4 rounded-lg border border-purple-200" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-xl font-bold text-purple-700" }, "children": ["20%"] },
                          { "type": "h4", "props": { "className": "font-semibold text-purple-600" }, "children": ["SAVINGS"] },
                          { "type": "p", "props": { "className": "text-sm" }, "children": ["Emergency fund, future goals"] }
                        ]
                      }
                    ]
                  },

                  /* Example breakdown */
                  {
                    "type": "div",
                    "props": { "className": "mt-6 p-4 bg-primary/10 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2", }, "children": ["Example with £1000/month income:"] },
                      {
                        "type": "ul",
                        "props": { "className": "space-y-1 text-sm pl-4" , "style": {"list-style": "disc"} },
                        "children": [
                          {"type": "li", "children" : ["£500 for needs (rent, food, transport)"]},
                          {"type": "li", "children" : ["£300 for wants (fun, eating out)"]},
                          {"type": "li", "children" : ["£200 for savings"]},
                        ]
                      }
                    ]
                  }

                ]
              }
            ]
          },

          /* ------------------------------------------------
              CARD 4 — How to Start Budgeting
          ------------------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["How to Start Budgeting (3 Easy Steps)"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [

                      /* Step 1 */
                      {
                        "type": "div",
                        "props": { "className": "flex gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "props": { "className": "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold" },
                            "children": ["1"]
                          },
                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Track Your Income"] },
                              { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Add up all money coming in: part-time job, student loan, family support"] }
                            ]
                          }
                        ]
                      },

                      /* Step 2 */
                      {
                        "type": "div",
                        "props": { "className": "flex gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "props": { "className": "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold" },
                            "children": ["2"]
                          },
                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold" }, "children": ["List Your Expenses"] },
                              { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Write down everything you spend money on for a week"] }
                            ]
                          }
                        ]
                      },

                      /* Step 3 */
                      {
                        "type": "div",
                        "props": { "className": "flex gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "props": { "className": "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold" },
                            "children": ["3"]
                          },
                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Apply the 50/30/20 Rule"] },
                              { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Split your income and adjust your spending to fit"] }
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

          /* ------------------------------------------------
              CARD 5 — Quick Tips
          ------------------------------------------------ */
          {
            "type": "Card",
            "props": { "className": "bg-gradient-to-r from-primary/10 to-secondary/10" },
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["💡 Quick Budgeting Tips"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "ul",
                    "props": { "className": "space-y-2 pl-4", "style": {"list-style": "disc"}, },
                    "children": [
                      {"type": "li", "children" : ["Use Monzo or Starling Bank to auto-track spending"]},
                      {"type": "li", "children" : ["Review your budget monthly"]},
                      {"type": "li", "children" : ["If you overspend, reduce another category"]},
                      {"type": "li", "children" : ["Start small — even budgeting £100 helps"]},
                      {"type": "li", "children" : ["Budgeting gives you more freedom, not less"]},
                    ]
                  }
                ]
              }
            ]
          }

        ]
      }
    ],

    /* ------------------------------------------------
        QUIZ
    ------------------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the 50/30/20 budgeting rule?",
          options: [
            "50% needs, 30% wants, 20% savings",
            "60% needs, 20% wants, 20% savings",
            "40% needs, 40% wants, 20% savings",
            "50% needs, 25% wants, 25% savings"
          ],
          correctAnswer: 0,
          explanation: "The 50/30/20 rule splits your income into needs (50%), wants (30%), and savings (20%)."
        }
      ]
    },

    /* ------------------------------------------------
        RELATED LESSONS
    ------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "next-step"
      },
      {
        moduleId: "banking-101",
        title: "Banking 101",
        relationship: "related"
      }
    ]
  },

  // Saving Strategies
  {
    title: "Saving Strategies",
    description: "Learn smart saving techniques, emergency funds, and goal-setting methods for financial stability.",
    categoryId: "core-money-skills",
    topic: "saving-strategies",

    visual: {
      icon: "PiggyBank",
      iconColor: "bg-green-500",
      badge: "Core Money Skills",
      readTime: 3
    },

    uiTree: [
      {
        "type": "Card",
        "children": [
          {
            "type": "CardHeader",
            "children": [
              {
                "type": "h3",
                "props": {"className": "flex flex-row text-2xl font-semibold leading-none tracking-tight"},
                "children": [
                  { "type": "TrendingUp", "props": { "className": "h-7 w-7 mr-2 text-black", "style": {"align-self": "anchor-center"} } },
                  "Why Save Money?"
                ]
              }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "p",
                "props": { "className": "text-lg mb-4" },
                "children": [
                  "Saving money gives you freedom and peace of mind. It's not about being cheap — it's about being prepared for opportunities and emergencies."
                ]
              },
              {
                "type": "div",
                "props": {
                  "className": "grid md:grid-cols-3 gap-4"
                },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "bg-blue-50 p-4 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-blue-700" }, "children": ["🚨 Emergencies"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": ["Unexpected expenses won't stress you out"] }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-green-50 p-4 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-green-700" }, "children": ["🎯 Goals"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": ["Holiday, laptop, car deposit"] }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-purple-50 p-4 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-purple-700" }, "children": ["🌟 Opportunities"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": ["Job course, starting a business"] }
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
        "props" : {"className": "mt-5 mb-5"},
        "children": [
          {
            "type": "CardHeader",
            "children": [
              {
                "type": "h3",
                "props": {"className": "flex flex-row text-2xl font-semibold leading-none tracking-tight"},
                "children": [
                  { "type": "Target", "props": { "className": "h-7 w-7 mr-2 text-black", "style": {"align-self": "anchor-center"} } },
                  "Pay Yourself First (The Golden Rule)"
                ]
              }
            ]
          },

          {
            "type": "CardContent",
            "children": [
              {
                "type": "div",
                "props": { "className": "bg-primary/10 p-6 rounded-lg mb-4" },
                "children": [
                  { "type": "h3", "props": { "className": "text-xl font-bold mb-2" }, "children": ["The Secret: Save BEFORE You Spend"] },
                  { "type": "p", "props": { "className": "text-lg" }, "children": [
                    "As soon as money arrives, move your savings amount into a separate account. Treat it like a bill you must pay."
                  ]}
                ]
              },

              {
                "type": "div",
                "children": [
                  { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["How it works:"] },
                  {
                    "type": "ol",
                    "props": { "className": "space-y-2 list-decimal list-inside" },
                    "children": [
                      {"type": "li", "children" : ["Get paid £500"],},
                      {"type": "li", "children" : ["Immediately save £50 (10%)"],},
                      {"type": "li", "children" : ["Live on the remaining £450"],},
                      {"type": "li", "children" : ["Get paid £500"],},
                      
                    ]
                  }
                ]
              },

              {
                "type": "div",
                "props": { "className": "mt-4 p-4 bg-primary/10 rounded-lg" },
                "children": [
                  { "type": "p", "props": { "className": "font-semibold mb-1" }, "children": ["💡 Pro Tip:"] },
                  { "type": "p", "children": ["Set up an automatic transfer on payday so saving happens without effort."] }
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
                "type": "h3",
                "props": {"className": "flex flex-row text-2xl font-semibold leading-none tracking-tight"},
                "children": [
                  { "type": "Shield", "props": { "className": "h-7 w-7 mr-2 text-black anchor-center", "style": {"align-self": "anchor-center"} } },
                  "Emergency Fund: Your Financial Safety Net"
                ]
              }
            ],
          },

          {
            "type": "CardContent",
            "children": [
              {
                "type": "p",
                "children": [
                  "An emergency fund is money saved specifically for unexpected expenses. It's not for holidays or shopping — it's for genuine emergencies."
                ]
              },

              {
                "type": "div",
                "props": { "className": "bg-red-50 border-l-4 border-red-400 p-4 my-4" },
                "children": [
                  { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["What counts as an emergency?"] },
                  {
                    "type": "ul",
                    "props": { 
                      "className": "text-md pl-4",
                      "style": {"list-style": "disc"},
                    },
                    "children": [
                      { "type": "li", "children": ["Car breakdown"] },
                      { "type": "li", "children": ["Laptop failure during exams"] },
                      { "type": "li", "children": ["Unexpected medical costs"] },
                      { "type": "li", "children": ["Reduced work hours"] },
                      { "type": "li", "children": ["Urgent family travel"] },
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
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["How much to save:"] },
                      {
                        "type": "div",
                        "props": { "className": "space-y-2" },
                        "children": [
                          {
                            "type": "div",
                            "props": { "className": "flex justify-between p-2 bg-green-50 rounded" },
                            "children": [
                              {
                                "type": "p", 
                                "children": ["Students / Part-time:"]
                              }, 
                              {
                                "type": "p", 
                                "props": {"className": "font-bold"}, 
                                "children": ["£500–£1000"]
                              },
                            ]
                          },
                          {
                            "type": "div",
                            "props": { "className": "flex justify-between p-2 bg-green-50 rounded" },
                            "children": [
                              {
                                "type": "p", 
                                "children": ["Full-time workers:"]
                              }, 
                              {
                                "type": "p", 
                                "props": {"className": "font-bold"}, 
                                "children": ["3–6 months of expenses"]
                              },
                            ]
                          },
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Where to keep it:"] },
                      {
                        "type": "ul",
                        "props": { "className": "space-y-1 text-sm" },
                        "children": [
                          { "type": "li", "children": ["✅ High-interest savings account"] },
                          { "type": "li", "children": ["✅ Easy access account"] },
                          { "type": "li", "children": ["❌ Not invested (too risky)"] },
                          { "type": "li", "children": ["❌ Not your main spending account"] },
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
        "props": {"className": "mt-5"},
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["Setting Savings Goals (SMART Method)"] }
            ],
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "p",
                "children": ["Vague goals like \"save more money\" don't work. Use the SMART method for goals you'll actually achieve."]
              },

              {
                "type": "div",
                "props": { "className": "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg my-4" },
                "children": [
                  { "type": "h4", "props": { "className": "font-bold text-lg mb-3" }, "children": ["SMART Savings Goals:"] },
                  {
                    "type": "div",
                    "props": { "className": "grid gap-3 text-md" },
                    "children": [
                      { 
                        "type": "p", 
                        "children": [
                          {"type": "span", "props": {"className": "text-blue-500 font-bold"}, "children": ["S"]},
                          {"type": "span", "children": ["pecific: \"Save for a holiday to Spain\""]},
                        ] 
                      },
                      { 
                        "type": "p", 
                        "children": [
                          {"type": "span", "props": {"className": "text-green-500 font-bold"}, "children": ["M"]},
                          {"type": "span", "children": ["easurable: \"Need £800 total\""]},
                        ] 
                      },
                      { 
                        "type": "p", 
                        "children": [
                          {"type": "span", "props": {"className": "text-orange-500 font-bold"}, "children": ["A"]},
                          {"type": "span", "children": ["chievable: \"Save £100/month\""]},
                        ] 
                      },
                      { 
                        "type": "p", 
                        "children": [
                          {"type": "span", "props": {"className": "text-red-500 font-bold"}, "children": ["R"]},
                          {"type": "span", "children": ["elevant: \"Helps my wellbeing\""]},
                        ] 
                      },
                      { 
                        "type": "p", 
                        "children": [
                          {"type": "span", "props": {"className": "text-purple-500 font-bold"}, "children": ["T"]},
                          {"type": "span", "children": ["ime-bound: \"By next August\""]},
                        ] 
                      },
                    ]
                  }
                ]
              },

              {
                "type": "div",
                "props": { "className": "grid md:grid-cols-3 gap-4" },
                "children": [
                  { 
                    "type": "div", 
                    "props": { "className": "text-center text-sm p-4 bg-green-50 rounded-lg" }, 
                    "children": [
                      {
                        "type": "p",
                        "props": {"className": "text-md text-center font-bold text-green-700"},
                        "children": ["Short-term (1–12 months)"] 
                      },
                      {
                        "type": "p",
                        "props": {"className": "text-center text-black"},
                        "children": ["Holiday, laptop, course"] 
                      },
                    ] 
                  },
                  { 
                    "type": "div", 
                    "props": { "className": "text-center  text-sm p-4 bg-blue-50 rounded-lg" }, 
                    "children": [
                      {
                        "type": "p",
                        "props": {"className": "text-md text-center font-bold text-blue-700"},
                        "children": ["Medium-term (1–5 years)"] 
                      },
                      {
                        "type": "p",
                        "props": {"className": "text-center text-black"},
                        "children": ["Car, house deposit"] 
                      },
                    ] 
                  },
                  { 
                    "type": "div", 
                    "props": { "className": "text-center text-sm p-4 bg-purple-50 rounded-lg" }, 
                    "children": [
                      {
                        "type": "p",
                        "props": {"className": "text-md text-center font-bold text-purple-700"},
                        "children": ["Long-term (5+ years)"] 
                      },
                      {
                        "type": "p",
                        "props": {"className": "text-center text-black"},
                        "children": ["Retirement, investment property"] 
                      },
                    ] 
                  },
                ]
              }
            ]
          }
        ]
      },

      {
        "type": "Card",
        "props": {"className": "mt-5"},
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["💡 Practical Saving Tips for Students"] }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "div",
                "props": { "className": "grid md:grid-cols-2 gap-6" },
                "children": [
                  {
                    "type": "div",
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-3" }, "children": ["Easy Wins:"] },
                      {
                        "type": "ul",
                        "props": { "className": "space-y-2 text-sm pl-4", "style": {"list-style": "disc"} },
                        "children": [
                          { "type": "li", "children": ["52-week saving challenge"] },
                          { "type": "li", "children": ["Save all £5 notes you receive"] },
                          { "type": "li", "children": ["Use student discounts"] },
                          { "type": "li", "children": ["Cook at home more often"] },
                          { "type": "li", "children": ["Buy supermarket own brands"] },
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-3" }, "children": ["Apps to Help:"] },
                      {
                        "type": "ul",
                        "props": { "className": "space-y-2 text-sm pl-4", "style": {"list-style": "disc"} },
                        "children": [
                          { 
                            "type": "li", 
                            "children": [
                              {
                                "type": "span",
                                "props": {"className": "font-bold"},
                                "children": ["Monzo/Starling"]
                              },
                              {
                                "type": "span",
                                "props": {"className": ""},
                                "children": [" – round-ups"]
                              },

                            ] 
                          },
                          { 
                            "type": "li", 
                            "children": [
                              {
                                "type": "span",
                                "props": {"className": "font-bold"},
                                "children": ["Plum"]
                              },
                              {
                                "type": "span",
                                "props": {"className": ""},
                                "children": [" - automatic savings"]
                              },

                            ] 
                          },
                          { 
                            "type": "li", 
                            "children": [
                              {
                                "type": "span",
                                "props": {"className": "font-bold"},
                                "children": ["Chip"]
                              },
                              {
                                "type": "span",
                                "props": {"className": ""},
                                "children": [" - AI saving app"]
                              },

                            ] 
                          },
                          { 
                            "type": "li", 
                            "children": [
                              {
                                "type": "span",
                                "props": {"className": "font-bold"},
                                "children": ["YNAB"]
                              },
                              {
                                "type": "span",
                                "props": {"className": ""},
                                "children": [" – budgeting app"]
                              },

                            ] 
                          },
                          { 
                            "type": "li", 
                            "children": [
                              {
                                "type": "span",
                                "props": {"className": "font-bold"},
                                "children": ["Honey"]
                              },
                              {
                                "type": "span",
                                "props": {"className": ""},
                                "children": [" – discount codes"]
                              },
                            ] 
                          },
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
        "props": {"className": "mt-5"},
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["Ready to Start Saving?"] }
            ]
          },
          {
            "type": "CardContent",
            "children": [
              {
                "type": "div",
                "props": { "className": "" },
                "children": [
                  {
                    "type": "div",
                    "children": [
                      {
                        "type": "div",
                        "props": {"className": "bg-primary/10 rounded-xl p-4 "},
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-3" }, "children": ["Your Action Plan:"] },
                          {
                            "type": "ol",
                            "props": { "className": "space-y-2 text-sm pl-4", "style": {"list-style": "numbered"}},
                            "children": [
                              { "type": "li", "children": ["Set up a separate savings account"] },
                              { "type": "li", "children": ["Decide on your emergency fund target (start with £500)"] },
                              { "type": "li", "children": ["Set up automatic transfer for payday"] },
                              { "type": "li", "children": ["Choose one SMART savings goal"] },
                              { "type": "li", "children": ["Track your progress monthly"] },
                            ]
                          }
                        ],
                      },
                    ],
                  }
                ]
              }
            ]
          }
        ]
      },

    ],

    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "How much should a full-time worker keep in an emergency fund?",
          options: [
            "1 month of expenses",
            "3–6 months of expenses",
            "£100",
            "1 full year of expenses"
          ],
          correctAnswer: 1,
          explanation: "Financial experts recommend at least 3–6 months of living expenses for emergencies."
        }
      ]
    },

    relatedLessons: [
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "prerequisite"
      },
      {
        moduleId: "banking-101",
        title: "Banking 101",
        relationship: "next-step"
      }
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 2,
    isActive: true,
    createdBy: "system"
  },

  // BANKING 101
  {
    title: "Banking 101",
    description: "Learn the basics of bank accounts, interest, student account perks, and how to open your first bank account.",
    categoryId: "core-money-skills",
    topic: "banking-101",
    createdBy: "system",

    visual: {
      icon: "Building2",
      iconColor: "bg-blue-500",
      readTime: 2,
      badge: "Core Money Skills"
    },

    difficultyLevel: "beginner",
    timeEstimate: 7,
    points: 120,
    order: 2,

    /* --------------------------
        UI TREE
    -------------------------- */
    uiTree: [
      {
        type: "div",
        props: { className: "grid gap-6" },
        children: [

          /* ------------------------------------------------
              CARD 1 — Types of Bank Accounts
          ------------------------------------------------ */
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", children: ["Types of Bank Accounts"] },
                  { type: "CardDescription", children: ["Understanding your options"] }
                ]
              },

              {
                type: "CardContent",
                children: [
                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-2 gap-6" },
                    children: [

                      /* CURRENT ACCOUNT */
                      {
                        type: "div",
                        props: {
                          className: "bg-blue-50 p-6 rounded-lg border border-blue-200"
                        },
                        children: [
                          {
                            type: "h3",
                            props: { className: "text-xl font-bold text-blue-700 mb-3" },
                            children: ["💳 Current Account"]
                          },
                          {
                            type: "p",
                            props: { className: "text-blue-600 mb-3" },
                            children: ["Your everyday spending account"]
                          },
                          {
                            type: "ul",
                            props: { className: "space-y-2 text-sm pl-4", style: { "list-style": "disc" } },
                            children: [
                              { type: "li", children: ["Debit card for spending"] },
                              { type: "li", children: ["Direct debits for bills"] },
                              { type: "li", children: ["Online banking access"] },
                              { type: "li", children: ["Usually no interest earned"] },
                              { type: "li", children: ["Perfect for daily expenses"] }
                            ]
                          }
                        ]
                      },

                      /* SAVINGS ACCOUNT */
                      {
                        type: "div",
                        props: {
                          className: "bg-green-50 p-6 rounded-lg border border-green-200"
                        },
                        children: [
                          {
                            type: "h3",
                            props: { className: "text-xl font-bold text-green-700 mb-3" },
                            children: ["🏦 Savings Account"]
                          },
                          {
                            type: "p",
                            props: { className: "text-green-600 mb-3" },
                            children: ["Where you grow your money"]
                          },
                          {
                            type: "ul",
                            props: { className: "space-y-2 text-sm pl-4", style: { "list-style": "disc" } },
                            children: [
                              { type: "li", children: ["Earns interest on your balance"] },
                              { type: "li", children: ["Limited withdrawals per month"] },
                              { type: "li", children: ["Higher interest rates than current accounts"] },
                              { type: "li", children: ["Perfect for emergency funds"] },
                              { type: "li", children: ["Money grows while you save"] }
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

          /* ------------------------------------------------
              CARD 2 — How Interest Works
          ------------------------------------------------ */
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
                      { type: "Percent", props: { className: "h-5 w-5" } },
                      "How Interest Works"
                    ]
                  }
                ]
              },

              {
                type: "CardContent",
                props: { className: "space-y-4" },
                children: [

                  {
                    type: "div",
                    props: { className: "bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg" },
                    children: [
                      {
                        type: "h3",
                        props: { className: "text-xl font-bold mb-3" },
                        children: ["Interest = Free Money!"]
                      },
                      {
                        type: "p",
                        props: { className: "mb-4" },
                        children: [
                          "When you save money in a bank, they pay you interest as a \"thank you\" for letting them use your money."
                        ]
                      },

                      /* SIMPLE & COMPOUND INTEREST BLOCKS */
                      {
                        type: "div",
                        props: { className: "grid md:grid-cols-2 gap-4" },
                        children: [

                          /* SIMPLE */
                          {
                            type: "div",
                            children: [
                              {
                                type: "h4",
                                props: { className: "font-semibold text-green-600 mb-2" },
                                children: ["Simple Example:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 text-sm pl-4",
                                  style: { "list-style": "disc" }
                                },
                                children: [
                                  { type: "li", children: ["You save: £1,000"] },
                                  { type: "li", children: ["Interest rate: 5% per year"] },
                                  { type: "li", children: ["After 1 year: £1,050"] },
                                  { type: "li", children: ["You earned: £50 for free!"] }
                                ]
                              }
                            ]
                          },

                          /* COMPOUND */
                          {
                            type: "div",
                            children: [
                              {
                                type: "h4",
                                props: { className: "font-semibold text-blue-600 mb-2" },
                                children: ["Compound Interest:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 text-sm pl-4",
                                  style: { "list-style": "disc" }
                                },
                                children: [
                                  { type: "li", children: ["Year 2: £1,050 + 5% = £1,102.50"] },
                                  { type: "li", children: ["Year 3: £1,102.50 + 5% = £1,157.63"] },
                                  { type: "li", children: ["Your interest earns interest!"] }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["💡 Pro Tip:"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Look for accounts with the highest AER (Annual Equivalent Rate) - that's the real interest rate you'll get!"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          /* ------------------------------------------------
              CARD 3 — Best Student Bank Accounts
          ------------------------------------------------ */
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", children: ["Best Student Bank Accounts (2024)"] }
                ]
              },

              {
                type: "CardContent",
                children: [
                  {
                    type: "div",
                    props: { className: "grid gap-4" },
                    children: [

                      /* SANTANDER */
                      {
                        type: "div",
                        props: { className: "p-4 border rounded-lg" },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-blue-600" },
                            children: ["🏦 Santander Student Account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "text-sm mt-2 space-y-1 pl-4",
                              style: { "list-style": "disc" }
                            },
                            children: [
                              { type: "li", children: ["FREE 4-year 16-25 Railcard (worth £120)"] },
                              { type: "li", children: ["0% overdraft up to £1,500"] },
                              { type: "li", children: ["No monthly fees"] }
                            ]
                          }
                        ]
                      },

                      /* HSBC */
                      {
                        type: "div",
                        props: { className: "p-4 border rounded-lg" },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-green-600" },
                            children: ["🏦 HSBC Student Account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "text-sm mt-2 space-y-1 pl-4",
                              style: { "list-style": "disc" }
                            },
                            children: [
                              { type: "li", children: ["0% overdraft up to £3,000"] },
                              { type: "li", children: ["£80 Amazon voucher when you open"] },
                              { type: "li", children: ["Great mobile app"] }
                            ]
                          }
                        ]
                      },

                      /* NATWEST */
                      {
                        type: "div",
                        props: { className: "p-4 border rounded-lg" },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-purple-600" },
                            children: ["🏦 NatWest Student Account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "text-sm mt-2 space-y-1 pl-4",
                              style: { "list-style": "disc" }
                            },
                            children: [
                              { type: "li", children: ["0% overdraft up to £2,000"] },
                              { type: "li", children: ["£100 cash when you switch"] },
                              { type: "li", children: ["Spending insights and budgeting tools"] }
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

          /* ------------------------------------------------
              CARD 4 — Opening Your First Bank Account
          ------------------------------------------------ */
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", children: ["Opening Your First Bank Account"] }
                ]
              },

              {
                type: "CardContent",
                children: [
                  {
                    type: "div",
                    props: { className: "space-y-4" },
                    children: [

                      {
                        type: "h4",
                        props: { className: "font-semibold" },
                        children: ["What You'll Need:"]
                      },

                      {
                        type: "div",
                        props: { className: "grid md:grid-cols-2 gap-4" },
                        children: [

                          /* DOCUMENTS REQUIRED */
                          {
                            type: "div",
                            children: [
                              {
                                type: "h5",
                                props: { className: "font-medium text-blue-600 mb-2" },
                                children: ["📋 Documents Required:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 text-sm pl-4",
                                  style: { "list-style": "disc" }
                                },
                                children: [
                                  { type: "li", children: ["Photo ID (passport/driving license)"] },
                                  { type: "li", children: ["Proof of address (council tax/utility bill)"] },
                                  { type: "li", children: ["Student ID or uni acceptance letter"] },
                                  { type: "li", children: ["Sometimes: birth certificate"] }
                                ]
                              }
                            ]
                          },

                          /* WHAT TO EXPECT */
                          {
                            type: "div",
                            children: [
                              {
                                type: "h5",
                                props: { className: "font-medium text-green-600 mb-2" },
                                children: ["📝 What to Expect:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 text-sm pl-4",
                                  style: { "list-style": "disc" }
                                },
                                children: [
                                  { type: "li", children: ["30-60 minute appointment"] },
                                  { type: "li", children: ["Questions about income/expenses"] },
                                  { type: "li", children: ["Debit card arrives in 3-5 days"] },
                                  { type: "li", children: ["Online banking setup on the spot"] }
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      /* TOP TIPS */
                      {
                        type: "div",
                        props: { className: "bg-primary/10 p-4 rounded-lg" },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold mb-2" },
                            children: ["💡 Top Tips:"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-1 text-sm pl-4",
                              style: { "list-style": "disc" }
                            },
                            children: [
                              { type: "li", children: ["Shop around - different banks offer different perks"] },
                              { type: "li", children: ["Don't just pick the closest branch"] },
                              { type: "li", children: ["Read the terms carefully (especially overdraft fees)"] },
                              { type: "li", children: ["Set up mobile banking immediately"] }
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
      }
    ],

    /* --------------------------
        QUIZ
    -------------------------- */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "Which type of account is best for everyday spending?",
          options: [
            "Current account",
            "Savings account",
            "Investment account",
            "Credit account"
          ],
          correctAnswer: 0,
          explanation:
            "Current accounts are designed for everyday spending with debit cards and easy access."
        }
      ]
    },

    /* --------------------------
        RELATED LESSONS
    -------------------------- */
    relatedLessons: [
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      },
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "next-step"
      }
    ]
  },


  // Understanding Credit Scores
{
  title: "Understanding Credit Scores",
  description: "Learn what credit scores mean, how they affect your financial life, and how to build good credit as a student.",
  categoryId: "core-money-skills",
  topic: "credit-scores",
  createdBy: "system",

  visual: {
    icon: "CreditCard",
    iconColor: "bg-blue-500",
    readTime: 2,
    badge: "Core Money Skills"
  },

  difficultyLevel: "beginner",
  timeEstimate: 7,
  points: 130,
  order: 3,

  /* --------------------------
      UI TREE
  -------------------------- */
  uiTree: [
    {
      type: "div",
      props: { className: "grid gap-6" },
      children: [

        /* ------------------------------------------------
            CARD 1 — What is a Credit Score?
        ------------------------------------------------ */
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                {
                  type: "CardTitle",
                  children: ["What is a Credit Score?"]
                }
              ]
            },

            {
              type: "CardContent",
              props: { className: "space-y-4" },
              children: [
                {
                  type: "p",
                  props: { className: "text-lg" },
                  children: [
                    "A credit score is like a financial report card that tells lenders how trustworthy you are with money. It's a number between 300-850 that affects your ability to borrow money."
                  ]
                },

                {
                  type: "div",
                  props: {
                    className:
                      "bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 p-6 rounded-lg"
                  },
                  children: [
                    {
                      type: "h3",
                      props: { className: "font-bold text-lg mb-4" },
                      children: ["Credit Score Ranges:"]
                    },

                    {
                      type: "div",
                      props: { className: "grid grid-cols-5 gap-2 text-center text-sm" },
                      children: [
                        {
                          type: "div",
                          props: { className: "bg-red-100 p-3 rounded" },
                          children: [
                            {
                              type: "div",
                              props: { className: "font-bold text-red-700" },
                              children: ["Poor"]
                            },
                            "300-579"
                          ]
                        },
                        {
                          type: "div",
                          props: { className: "bg-orange-100 p-3 rounded" },
                          children: [
                            {
                              type: "div",
                              props: { className: "font-bold text-orange-700" },
                              children: ["Fair"]
                            },
                            "580-669"
                          ]
                        },
                        {
                          type: "div",
                          props: { className: "bg-yellow-100 p-3 rounded" },
                          children: [
                            {
                              type: "div",
                              props: { className: "font-bold text-yellow-700" },
                              children: ["Good"]
                            },
                            "670-739"
                          ]
                        },
                        {
                          type: "div",
                          props: { className: "bg-blue-100 p-3 rounded" },
                          children: [
                            {
                              type: "div",
                              props: { className: "font-bold text-blue-700" },
                              children: ["Very Good"]
                            },
                            "740-799"
                          ]
                        },
                        {
                          type: "div",
                          props: { className: "bg-green-100 p-3 rounded" },
                          children: [
                            {
                              type: "div",
                              props: { className: "font-bold text-green-700" },
                              children: ["Excellent"]
                            },
                            "800-850"
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

        /* ------------------------------------------------
            CARD 2 — Why Credit Scores Matter
        ------------------------------------------------ */
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
                    { type: "TrendingUp", props: { className: "h-5 w-5" } },
                    "Why Your Credit Score Matters"
                  ]
                }
              ]
            },

            {
              type: "CardContent",
              children: [
                {
                  type: "div",
                  props: { className: "grid md:grid-cols-2 gap-6" },
                  children: [

                    /* GOOD CREDIT */
                    {
                      type: "div",
                      children: [
                        {
                          type: "h4",
                          props: {
                            className: "font-semibold text-green-600 mb-3"
                          },
                          children: ["✅ Good Credit Score Gets You:"]
                        },
                        {
                          type: "ul",
                          props: {
                            className: "space-y-2 text-sm pl-4",
                            style: { "list-style": "disc" }
                          },
                          children: [
                            { type: "li", children: ["Lower interest rates on loans"] },
                            { type: "li", children: ["Better credit card offers"] },
                            { type: "li", children: ["Easier mortgage approval"] },
                            { type: "li", children: ["Better mobile phone contracts"] },
                            { type: "li", children: ["Easier car finance"] },
                            { type: "li", children: ["Some rental agreements"] }
                          ]
                        }
                      ]
                    },

                    /* BAD CREDIT */
                    {
                      type: "div",
                      children: [
                        {
                          type: "h4",
                          props: {
                            className: "font-semibold text-red-600 mb-3"
                          },
                          children: ["❌ Poor Credit Score Means:"]
                        },
                        {
                          type: "ul",
                          props: {
                            className: "space-y-2 text-sm pl-4",
                            style: { "list-style": "disc" }
                          },
                          children: [
                            { type: "li", children: ["Higher interest rates"] },
                            { type: "li", children: ["Loan applications rejected"] },
                            { type: "li", children: ["Larger deposits required"] },
                            { type: "li", children: ["Limited credit card options"] },
                            { type: "li", children: ["Difficulty renting properties"] },
                            { type: "li", children: ["More expensive insurance"] }
                          ]
                        }
                      ]
                    }
                  ]
                },

                {
                  type: "div",
                  props: { className: "mt-6 p-4 bg-primary/10 rounded-lg" },
                  children: [
                    {
                      type: "h4",
                      props: { className: "font-semibold mb-2" },
                      children: ["💰 Real Impact Example:"]
                    },
                    {
                      type: "p",
                      props: { className: "text-sm" },
                      children: [
                        "On a £200,000 mortgage: Excellent credit (1.5% rate) vs Poor credit (4.5% rate) = £3,000+ difference per year in payments!"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },

        /* ------------------------------------------------
            CARD 3 — How Credit Scores Are Calculated
        ------------------------------------------------ */
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: ["How Credit Scores Are Calculated"] }
              ]
            },

            {
              type: "CardContent",
              props: { className: "space-y-4" },
              children: [

                {
                  type: "div",
                  props: { className: "grid gap-4" },
                  children: [

                    /* PAYMENT HISTORY */
                    {
                      type: "div",
                      props: {
                        className: "flex items-center gap-4 p-4 border rounded-lg"
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            className:
                              "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700"
                          },
                          children: ["35%"]
                        },
                        {
                          type: "div",
                          children: [
                            { type: "h4", props: { className: "font-semibold" }, children: ["Payment History"] },
                            {
                              type: "p",
                              props: { className: "text-sm text-muted-foreground" },
                              children: ["Do you pay bills on time?"]
                            }
                          ]
                        }
                      ]
                    },

                    /* UTILIZATION */
                    {
                      type: "div",
                      props: {
                        className: "flex items-center gap-4 p-4 border rounded-lg"
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            className:
                              "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700"
                          },
                          children: ["30%"]
                        },
                        {
                          type: "div",
                          children: [
                            { type: "h4", props: { className: "font-semibold" }, children: ["Credit Utilization"] },
                            {
                              type: "p",
                              props: { className: "text-sm text-muted-foreground" },
                              children: ["How much of your available credit do you use?"]
                            }
                          ]
                        }
                      ]
                    },

                    /* HISTORY LENGTH */
                    {
                      type: "div",
                      props: {
                        className: "flex items-center gap-4 p-4 border rounded-lg"
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            className:
                              "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700"
                          },
                          children: ["15%"]
                        },
                        {
                          type: "div",
                          children: [
                            { type: "h4", props: { className: "font-semibold" }, children: ["Length of Credit History"] },
                            {
                              type: "p",
                              props: { className: "text-sm text-muted-foreground" },
                              children: ["How long have you had credit accounts?"]
                            }
                          ]
                        }
                      ]
                    },

                    /* CREDIT MIX */
                    {
                      type: "div",
                      props: {
                        className: "flex items-center gap-4 p-4 border rounded-lg"
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            className:
                              "w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700"
                          },
                          children: ["10%"]
                        },
                        {
                          type: "div",
                          children: [
                            { type: "h4", props: { className: "font-semibold" }, children: ["Credit Mix"] },
                            {
                              type: "p",
                              props: { className: "text-sm text-muted-foreground" },
                              children: ["Variety of credit types (cards, loans, etc.)"]
                            }
                          ]
                        }
                      ]
                    },

                    /* NEW CREDIT */
                    {
                      type: "div",
                      props: {
                        className: "flex items-center gap-4 p-4 border rounded-lg"
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            className:
                              "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700"
                          },
                          children: ["10%"]
                        },
                        {
                          type: "div",
                          children: [
                            { type: "h4", props: { className: "font-semibold" }, children: ["New Credit"] },
                            {
                              type: "p",
                              props: { className: "text-sm text-muted-foreground" },
                              children: ["Recent credit applications and new accounts"]
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

        /* ------------------------------------------------
            CARD 4 — Building Credit as a Student
        ------------------------------------------------ */
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: ["Building Credit as a Student"] }
              ]
            },

            {
              type: "CardContent",
              children: [
                {
                  type: "div",
                  props: { className: "space-y-4" },
                  children: [

                    {
                      type: "div",
                      props: { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4" },
                      children: [
                        {
                          type: "h4",
                          props: { className: "font-semibold text-yellow-700 mb-2" },
                          children: ["⚠️ Starting From Zero"]
                        },
                        {
                          type: "p",
                          props: { className: "text-sm" },
                          children: [
                            "Most students have no credit history, which means \"no score\" rather than a bad score. This is normal!"
                          ]
                        }
                      ]
                    },

                    {
                      type: "div",
                      props: { className: "grid md:grid-cols-2 gap-4" },
                      children: [

                        /* SMART WAYS */
                        {
                          type: "div",
                          children: [
                            {
                              type: "h4",
                              props: { className: "font-semibold text-green-600 mb-3" },
                              children: ["✅ Smart Ways to Build Credit:"]
                            },
                            {
                              type: "ul",
                              props: {
                                className: "space-y-2 text-sm pl-4",
                                style: { "list-style": "disc" }
                              },
                              children: [
                                { type: "li", children: ["Get a student credit card"] },
                                { type: "li", children: ["Register to vote"] },
                                { type: "li", children: ["Pay all bills on time"] },
                                { type: "li", children: ["Keep credit utilization under 30%"] },
                                { type: "li", children: ["Don't close old accounts"] },
                                { type: "li", children: ["Check your score regularly (free)"] }
                              ]
                            }
                          ]
                        },

                        /* CREDIT SCORE KILLERS */
                        {
                          type: "div",
                          children: [
                            {
                              type: "h4",
                              props: { className: "font-semibold text-red-600 mb-3" },
                              children: ["❌ Credit Score Killers:"]
                            },
                            {
                              type: "ul",
                              props: {
                                className: "space-y-2 text-sm pl-4",
                                style: { "list-style": "disc" }
                              },
                              children: [
                                { type: "li", children: ["Missing payments"] },
                                { type: "li", children: ["Maxing out credit cards"] },
                                { type: "li", children: ["Applying for lots of credit quickly"] },
                                { type: "li", children: ["Only making minimum payments"] },
                                { type: "li", children: ["Not checking for errors"] },
                                { type: "li", children: ["Using payday loans"] }
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

        /* ------------------------------------------------
            CARD 5 — Free Credit Score Checks
        ------------------------------------------------ */
        {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: ["Check Your Credit Score (FREE!)"] }
              ]
            },

            {
              type: "CardContent",
              children: [

                {
                  type: "div",
                  props: { className: "grid md:grid-cols-3 gap-4" },
                  children: [
                    {
                      type: "div",
                      props: { className: "text-center p-4 bg-blue-50 rounded-lg" },
                      children: [
                        {
                          type: "h4",
                          props: { className: "font-semibold text-blue-700" },
                          children: ["Experian"]
                        },
                        {
                          type: "p",
                          props: { className: "text-sm mt-1" },
                          children: ["Most comprehensive, used by most lenders"]
                        }
                      ]
                    },

                    {
                      type: "div",
                      props: { className: "text-center p-4 bg-green-50 rounded-lg" },
                      children: [
                        {
                          type: "h4",
                          props: { className: "font-semibold text-green-700" },
                          children: ["Equifax"]
                        },
                        {
                          type: "p",
                          props: { className: "text-sm mt-1" },
                          children: ["Good for spotting errors, different scoring"]
                        }
                      ]
                    },

                    {
                      type: "div",
                      props: { className: "text-center p-4 bg-purple-50 rounded-lg" },
                      children: [
                        {
                          type: "h4",
                          props: { className: "font-semibold text-purple-700" },
                          children: ["TransUnion"]
                        },
                        {
                          type: "p",
                          props: { className: "text-sm mt-1" },
                          children: ["Growing in popularity, good insights"]
                        }
                      ]
                    }
                  ]
                },

                {
                  type: "div",
                  props: { className: "mt-4 p-4 bg-primary/10 rounded-lg" },
                  children: [
                    {
                      type: "h4",
                      props: { className: "font-semibold bg-primary/10 mb-2" },
                      children: ["💡 Pro Tips:"]
                    },

                    {
                      type: "ul",
                      props: {
                        className: "text-sm space-y-1 pl-4",
                        style: { "list-style": "disc" }
                      },
                      children: [
                        { type: "li", children: ["Check all three agencies (they can be different!)"] },
                        { type: "li", children: ["Checking your own score doesn't hurt it"] },
                        { type: "li", children: ["Look for errors and dispute them"] },
                        { type: "li", children: ["Monitor changes monthly"] }
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

  /* --------------------------
      QUIZ
  -------------------------- */
  quiz: {
    passingScore: 1,
    questions: [
      {
        question: "What is the range for credit scores in the UK?",
        options: ["300-850", "0-1000", "1-10", "0-999"],
        correctAnswer: 0,
        explanation:
          "The UK credit score range is typically between 300–850, where higher scores indicate better creditworthiness."
      }
    ]
  },

  /* --------------------------
      RELATED LESSONS
  -------------------------- */
  relatedLessons: [
    {
      moduleId: "good-vs-bad-debt",
      title: "Good vs Bad Debt",
      relationship: "next-step"
    },
    {
      moduleId: "credit-cards-safely",
      title: "Using Credit Cards Safely",
      relationship: "related"
    }
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
