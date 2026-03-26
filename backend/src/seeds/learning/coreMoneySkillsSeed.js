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
    description: "How to make a simple budget, needs vs wants",
    categoryId: "core-money-skills",
    topic: "budgeting-basics",
    createdBy: "system",
  
    visual: {
      icon: "Wallet",
      iconColor: "bg-green-500",
      readTime: 3,
      badge: "Core Money Skills"
    },
  
    difficultyLevel: "beginner",
    timeEstimate: 8,
    points: 150,
    order: 1,
  
    uiTree: [
      {
        type: "div",
        props: { className: "grid gap-6 text-white" },
        children: [
  
          /* ------------------------------------------------
              CARD 1 — What is a Budget?
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className: "bg-[#232324] border border-white/10 text-white shadow-none"
            },
            children: [
              {
                type: "CardHeader",
                props: { className: "text-white" },
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "flex items-center gap-2 text-white" },
                    children: [
                      { type: "TrendingUp", props: { className: "h-7 w-7 text-green-400" } },
                      "What is a Budget?"
                    ]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "space-y-4 text-[#d7d7db]" },
                children: [
                  {
                    type: "p",
                    props: { className: "text-lg text-[#d7d7db]" },
                    children: [
                      "A budget is simply a plan for your money. It helps you understand where your money comes from and where it goes so you can make smarter decisions."
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      className: "bg-green-500/10 border border-green-500/30 p-4 rounded-lg"
                    },
                    children: [
                      {
                        type: "p",
                        props: { className: "font-semibold text-white" },
                        children: ["Think of it like this:"]
                      },
                      {
                        type: "p",
                        props: { className: "text-[#d7d7db]" },
                        children: [
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
            type: "Card",
            props: {
              className: "bg-[#232324] border border-white/10 text-white shadow-none"
            },
            children: [
              {
                type: "CardHeader",
                props: { className: "text-white" },
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-white" },
                    children: ["Needs vs Wants: The Foundation"]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "text-[#d7d7db]" },
                children: [
                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-2 gap-6" },
                    children: [
  
                      /* NEEDS */
                      {
                        type: "div",
                        props: {
                          className: "space-y-3 rounded-lg border border-white p-4"
                        },
                        children: [
                          {
                            type: "h3",
                            props: { className: "flex items-center gap-2 text-lg font-semibold text-green-400" },
                            children: [
                              {
                                type: "span",
                                props: { className: "inline-flex items-center gap-2" },
                                children: [
                                  { type: "GiShieldReflect", props: { className: "h-5 w-5 shrink-0" }, children: [] },
                                  { type: "span", children: ["NEEDS (Must Have)"] }
                                ]
                              }
                            ]
                          },
                          {
                            type: "ul",
                            props: { className: "space-y-2" },
                            children: [
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleCheckBig", props: { className: "text-green-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Rent/Housing"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleCheckBig", props: { className: "text-green-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Food & Groceries"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleCheckBig", props: { className: "text-green-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Transport to work/uni"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleCheckBig", props: { className: "text-green-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Phone bill"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleCheckBig", props: { className: "text-green-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Essential clothing"] }
                                ]
                              }
                            ]
                          }
                        ]
                      },
  
                      /* WANTS */
                      {
                        type: "div",
                        props: {
                          className: "space-y-3 rounded-lg border border-white p-4"
                        },
                        children: [
                          {
                            type: "h3",
                            props: { className: "flex items-center text-lg font-semibold text-orange-400" },
                            children: [
                              {
                                type: "span",
                                props: { className: "mr-2" },
                                children: [
                                  { type: "ShoppingBag", props: { className: "h-5 w-5" }, children: [] }
                                ]
                              },
                              { type: "span", children: ["WANTS (Nice to Have)"] }
                            ]
                          },
                          {
                            type: "ul",
                            props: { className: "space-y-2" },
                            children: [
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleAlert", props: { className: "text-orange-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Netflix/Spotify"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleAlert", props: { className: "text-orange-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Eating out & takeaways"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleAlert", props: { className: "text-orange-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Designer clothes"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleAlert", props: { className: "text-orange-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Gaming/entertainment"] }
                                ]
                              },
                              {
                                type: "li",
                                props: { className: "flex flex-row text-[#d7d7db]" },
                                children: [
                                  { type: "CircleAlert", props: { className: "text-orange-400 mr-2 h-5 w-5 self-center shrink-0" }, children: [] },
                                  { type: "span", children: ["Holidays"] }
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
              CARD 3 — 50/30/20 Rule
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className: "bg-[#232324] border border-white/10 text-white shadow-none"
            },
            children: [
              {
                type: "CardHeader",
                props: { className: "text-white" },
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-white" },
                    children: ["The 50/30/20 Rule (Perfect for Students!)"]
                  },
                  {
                    type: "CardDescription",
                    props: { className: "text-[#9a9a9d]" },
                    children: ["The simplest way to budget your money"]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "text-[#d7d7db]" },
                children: [
  
                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-3 gap-4" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "bg-green-500/10 border border-green-500/30 p-4 rounded-lg"
                        },
                        children: [
                          { type: "h3", props: { className: "text-xl font-bold text-green-400" }, children: ["50%"] },
                          { type: "h4", props: { className: "font-semibold text-green-300" }, children: ["NEEDS"] },
                          { type: "p", props: { className: "text-sm text-[#d7d7db]" }, children: ["Rent, food, transport, phone"] }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg"
                        },
                        children: [
                          { type: "h3", props: { className: "text-xl font-bold text-blue-400" }, children: ["30%"] },
                          { type: "h4", props: { className: "font-semibold text-blue-300" }, children: ["WANTS"] },
                          { type: "p", props: { className: "text-sm text-[#d7d7db]" }, children: ["Fun, eating out, entertainment"] }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg"
                        },
                        children: [
                          { type: "h3", props: { className: "text-xl font-bold text-violet-400" }, children: ["20%"] },
                          { type: "h4", props: { className: "font-semibold text-violet-300" }, children: ["SAVINGS"] },
                          { type: "p", props: { className: "text-sm text-[#d7d7db]" }, children: ["Emergency fund, future goals"] }
                        ]
                      }
                    ]
                  },
  
                  {
                    type: "div",
                    props: {
                      className: "mt-6 p-4 bg-white/[0.04] border border-white/10 rounded-lg"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2 text-white" },
                        children: ["Example with £1000/month income:"]
                      },
                      {
                        type: "ul",
                        props: { className: "space-y-1 text-sm pl-4 text-[#d7d7db]", style: { listStyleType: "disc" } },
                        children: [
                          { type: "li", children: ["£500 for needs (rent, food, transport)"] },
                          { type: "li", children: ["£300 for wants (fun, eating out)"] },
                          { type: "li", children: ["£200 for savings"] }
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
            type: "Card",
            props: {
              className: "bg-[#232324] border border-white/10 text-white shadow-none"
            },
            children: [
              {
                type: "CardHeader",
                props: { className: "text-white" },
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-white" },
                    children: ["How to Start Budgeting (3 Easy Steps)"]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "text-[#d7d7db]" },
                children: [
                  {
                    type: "div",
                    props: { className: "space-y-4" },
                    children: [
  
                      {
                        type: "div",
                        props: {
                          className: "flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4"
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              className: "bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0"
                            },
                            children: ["1"]
                          },
                          {
                            type: "div",
                            children: [
                              { type: "h4", props: { className: "font-semibold text-white" }, children: ["Track Your Income"] },
                              { type: "p", props: { className: "text-sm text-[#9a9a9d]" }, children: ["Add up all money coming in: part-time job, student loan, family support"] }
                            ]
                          }
                        ]
                      },
  
                      {
                        type: "div",
                        props: {
                          className: "flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4"
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              className: "bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0"
                            },
                            children: ["2"]
                          },
                          {
                            type: "div",
                            children: [
                              { type: "h4", props: { className: "font-semibold text-white" }, children: ["List Your Expenses"] },
                              { type: "p", props: { className: "text-sm text-[#9a9a9d]" }, children: ["Write down everything you spend money on for a week"] }
                            ]
                          }
                        ]
                      },
  
                      {
                        type: "div",
                        props: {
                          className: "flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4"
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              className: "bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0"
                            },
                            children: ["3"]
                          },
                          {
                            type: "div",
                            children: [
                              { type: "h4", props: { className: "font-semibold text-white" }, children: ["Apply the 50/30/20 Rule"] },
                              { type: "p", props: { className: "text-sm text-[#9a9a9d]" }, children: ["Split your income and adjust your spending to fit"] }
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
            type: "Card",
            props: {
              className: "bg-[#232324] border border-white/10 text-white shadow-none"
            },
            children: [
              {
                type: "CardHeader",
                props: { className: "text-white" },
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-white" },
                    children: ["💡 Quick Budgeting Tips"]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "text-[#d7d7db]" },
                children: [
                  {
                    type: "ul",
                    props: {
                      className: "space-y-2 pl-4 text-[#d7d7db]",
                      style: { listStyleType: "disc" }
                    },
                    children: [
                      { type: "li", children: ["Use Monzo or Starling Bank to auto-track spending"] },
                      { type: "li", children: ["Review your budget monthly"] },
                      { type: "li", children: ["If you overspend, reduce another category"] },
                      { type: "li", children: ["Start small — even budgeting £100 helps"] },
                      { type: "li", children: ["Budgeting gives you more freedom, not less"] }
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
    description: "Setting goals, emergency funds, paying yourself first",
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
        type: "div",
        props: { className: "grid gap-6 text-white" },
        children: [
  
          /* ------------------------------------------------
              CARD 1 — Why Save Money?
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "overflow-hidden rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "div",
                props: {
                  className: "bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-violet-500/10 p-6 pb-4"
                },
                children: [
                  {
                    type: "CardHeader",
                    props: { className: "p-0" },
                    children: [
                      {
                        type: "h3",
                        props: {
                          className: "flex flex-row items-center text-2xl font-bold leading-none tracking-tight text-white md:text-3xl"
                        },
                        children: [
                          {
                            type: "TrendingUp",
                            props: {
                              className: "mr-2 h-7 w-7 text-green-400",
                              style: { alignSelf: "center" }
                            }
                          },
                          "Why Save Money?"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type: "CardContent",
                props: { className: "p-6 pt-4" },
                children: [
                  {
                    type: "p",
                    props: { className: "mb-5 text-lg text-[#d7d7db]" },
                    children: [
                      "Saving money gives you freedom and peace of mind. It's not about being cheap — it's about being prepared for opportunities and emergencies."
                    ]
                  },
                  {
                    type: "div",
                    props: {
                      className: "grid gap-4 md:grid-cols-3"
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1.25rem] border border-blue-500/30 bg-blue-500/10 p-4 shadow-[0_0_25px_rgba(59,130,246,0.10)]"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-blue-400" },
                            children: ["🚨 Emergencies"]
                          },
                          {
                            type: "p",
                            props: { className: "mt-2 text-sm text-[#d7d7db]" },
                            children: ["Unexpected expenses won't stress you out"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1.25rem] border border-green-500/30 bg-green-500/10 p-4 shadow-[0_0_25px_rgba(34,197,94,0.10)]"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-green-400" },
                            children: ["🎯 Goals"]
                          },
                          {
                            type: "p",
                            props: { className: "mt-2 text-sm text-[#d7d7db]" },
                            children: ["Holiday, laptop, car deposit"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1.25rem] border border-violet-500/30 bg-violet-500/10 p-4 shadow-[0_0_25px_rgba(139,92,246,0.10)]"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-violet-400" },
                            children: ["🌟 Opportunities"]
                          },
                          {
                            type: "p",
                            props: { className: "mt-2 text-sm text-[#d7d7db]" },
                            children: ["Job course, starting a business"]
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
              CARD 2 — Pay Yourself First
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "my-5 overflow-hidden rounded-[2rem] border border-green-500/20 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "div",
                props: {
                  className: "bg-gradient-to-r from-blue-500/15 via-white/[0.02] to-green-500/15 p-6 pb-4"
                },
                children: [
                  {
                    type: "CardHeader",
                    props: { className: "p-0" },
                    children: [
                      {
                        type: "h3",
                        props: {
                          className: "flex flex-row items-center text-2xl font-bold leading-none tracking-tight text-white md:text-3xl"
                        },
                        children: [
                          {
                            type: "Target",
                            props: {
                              className: "mr-2 h-7 w-7 text-blue-400",
                              style: { alignSelf: "center" }
                            }
                          },
                          "Pay Yourself First (The Golden Rule)"
                        ]
                      }
                    ]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "p-6 pt-4" },
                children: [
                  {
                    type: "div",
                    props: {
                      className: "mb-5 rounded-[1rem] border border-blue-500/30 bg-blue-500/10 p-6 shadow-[0_0_30px_rgba(59,130,246,0.10)]"
                    },
                    children: [
                      {
                        type: "h3",
                        props: { className: "mb-2 text-xl font-bold text-white" },
                        children: ["The Secret: Save BEFORE You Spend"]
                      },
                      {
                        type: "p",
                        props: { className: "text-lg text-[#d7d7db]" },
                        children: [
                          "As soon as money arrives, move your savings amount into a separate account. Treat it like a bill you must pay."
                        ]
                      }
                    ]
                  },
  
                  {
                    type: "div",
                    children: [
                      {
                        type: "h4",
                        props: { className: "mb-3 font-semibold text-white" },
                        children: ["How it works:"]
                      },
                      {
                        type: "ol",
                        props: {
                          className: "space-y-3 pl-4 text-[#e5e5e7]",
                          style: { listStyleType: "decimal" }
                        },
                        children: [
                          { type: "li", children: ["Get paid £500"] },
                          { type: "li", children: ["Immediately save £50 (10%)"] },
                          { type: "li", children: ["Live on the remaining £450"] },
                          { type: "li", children: ["Repeat this each payday"] }
                        ]
                      }
                    ]
                  },
  
                  {
                    type: "div",
                    props: {
                      className: "mt-5 rounded-[1.25rem] border border-blue-500/30 bg-blue-500/10 p-4"
                    },
                    children: [
                      {
                        type: "p",
                        props: { className: "mb-1 font-semibold text-blue-400" },
                        children: ["💡 Pro Tip:"]
                      },
                      {
                        type: "p",
                        props: { className: "text-[#e5e5e7]" },
                        children: ["Set up an automatic transfer on payday so saving happens without effort."]
                      }
                    ]
                  }
                ]
              }
            ]
          },
  
          /* ------------------------------------------------
              CARD 3 — Emergency Fund
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "CardHeader",
                children: [
                  {
                    type: "h3",
                    props: {
                      className: "flex flex-row items-center text-2xl font-bold leading-none tracking-tight text-white md:text-3xl"
                    },
                    children: [
                      {
                        type: "Shield",
                        props: {
                          className: "mr-2 h-7 w-7 text-red-400",
                          style: { alignSelf: "center" }
                        }
                      },
                      "Emergency Fund: Your Financial Safety Net"
                    ]
                  }
                ]
              },
  
              {
                type: "CardContent",
                children: [
                  {
                    type: "p",
                    props: { className: "text-[#d7d7db]" },
                    children: [
                      "An emergency fund is money saved specifically for unexpected expenses. It's not for holidays or shopping — it's for genuine emergencies."
                    ]
                  },
  
                  {
                    type: "div",
                    props: {
                      className: "my-5 rounded-[1.25rem] border border-red-500/30 bg-red-500/10 p-5 shadow-[0_0_25px_rgba(239,68,68,0.10)]"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "mb-3 font-semibold text-red-400" },
                        children: ["What counts as an emergency?"]
                      },
                      {
                        type: "ul",
                        props: {
                          className: "pl-4 text-md text-[#e5e5e7] space-y-1",
                          style: { listStyleType: "disc" }
                        },
                        children: [
                          { type: "li", children: ["Car breakdown"] },
                          { type: "li", children: ["Laptop failure during exams"] },
                          { type: "li", children: ["Unexpected medical costs"] },
                          { type: "li", children: ["Reduced work hours"] },
                          { type: "li", children: ["Urgent family travel"] }
                        ]
                      }
                    ]
                  },
  
                  {
                    type: "div",
                    props: { className: "grid gap-4 md:grid-cols-2" },
                    children: [
                      {
                        type: "div",
                        children: [
                          {
                            type: "h4",
                            props: { className: "mb-3 font-semibold text-white" },
                            children: ["How much to save:"]
                          },
                          {
                            type: "div",
                            props: { className: "space-y-3" },
                            children: [
                              {
                                type: "div",
                                props: {
                                  className: "flex justify-between rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-[#e5e5e7]"
                                },
                                children: [
                                  { type: "p", children: ["Students / Part-time:"] },
                                  { type: "p", props: { className: "font-bold text-green-400" }, children: ["£500–£1000"] }
                                ]
                              },
                              {
                                type: "div",
                                props: {
                                  className: "flex justify-between rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-[#e5e5e7]"
                                },
                                children: [
                                  { type: "p", children: ["Full-time workers:"] },
                                  { type: "p", props: { className: "font-bold text-green-400" }, children: ["3–6 months of expenses"] }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        type: "div",
                        children: [
                          {
                            type: "h4",
                            props: { className: "mb-3 font-semibold text-white" },
                            children: ["Where to keep it:"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-2 text-sm text-[#e5e5e7]"
                            },
                            children: [
                              { type: "li", children: ["✅ High-interest savings account"] },
                              { type: "li", children: ["✅ Easy access account"] },
                              { type: "li", children: ["❌ Not invested (too risky)"] },
                              { type: "li", children: ["❌ Not your main spending account"] }
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
              CARD 4 — SMART Goals
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "mt-5 overflow-hidden rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "CardHeader",
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-2xl font-bold tracking-tight text-white md:text-3xl" },
                    children: ["Setting Savings Goals (SMART Method)"]
                  }
                ]
              },
              {
                type: "CardContent",
                children: [
                  {
                    type: "p",
                    props: { className: "text-[#d7d7db]" },
                    children: ["Vague goals like \"save more money\" don't work. Use the SMART method for goals you'll actually achieve."]
                  },
  
                  {
                    type: "div",
                    props: {
                      className: "my-5 rounded-[1rem] border border-violet-500/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-6"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "mb-4 text-lg font-bold text-white" },
                        children: ["SMART Savings Goals:"]
                      },
                      {
                        type: "div",
                        props: { className: "grid gap-3 text-md text-[#e5e5e7]" },
                        children: [
                          {
                            type: "p",
                            children: [
                              { type: "span", props: { className: "font-bold text-blue-400" }, children: ["S"] },
                              { type: "span", children: ["pecific: \"Save for a holiday to Spain\""] }
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "span", props: { className: "font-bold text-green-400" }, children: ["M"] },
                              { type: "span", children: ["easurable: \"Need £800 total\""] }
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "span", props: { className: "font-bold text-orange-400" }, children: ["A"] },
                              { type: "span", children: ["chievable: \"Save £100/month\""] }
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "span", props: { className: "font-bold text-red-400" }, children: ["R"] },
                              { type: "span", children: ["elevant: \"Helps my wellbeing\""] }
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "span", props: { className: "font-bold text-violet-400" }, children: ["T"] },
                              { type: "span", children: ["ime-bound: \"By next August\""] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
  
                  {
                    type: "div",
                    props: { className: "grid gap-4 md:grid-cols-3" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1.25rem] bg-green-500/10 border border-green-500/30 p-4 text-center"
                        },
                        children: [
                          {
                            type: "p",
                            props: { className: "text-md text-center font-bold text-green-400" },
                            children: ["Short-term (1–12 months)"]
                          },
                          {
                            type: "p",
                            props: { className: "mt-2 text-center text-[#d7d7db]" },
                            children: ["Holiday, laptop, course"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1.25rem] bg-blue-500/10 border border-blue-500/30 p-4 text-center"
                        },
                        children: [
                          {
                            type: "p",
                            props: { className: "text-md text-center font-bold text-blue-400" },
                            children: ["Medium-term (1–5 years)"]
                          },
                          {
                            type: "p",
                            props: { className: "mt-2 text-center text-[#d7d7db]" },
                            children: ["Car, house deposit"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1.25rem] bg-violet-500/10 border border-violet-500/30 p-4 text-center"
                        },
                        children: [
                          {
                            type: "p",
                            props: { className: "text-md text-center font-bold text-violet-400" },
                            children: ["Long-term (5+ years)"]
                          },
                          {
                            type: "p",
                            props: { className: "mt-2 text-center text-[#d7d7db]" },
                            children: ["Retirement, investment property"]
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
              CARD 5 — Practical Tips
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "mt-5 rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "CardHeader",
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-2xl font-bold tracking-tight text-white md:text-3xl" },
                    children: ["💡 Practical Saving Tips for Students"]
                  }
                ]
              },
              {
                type: "CardContent",
                children: [
                  {
                    type: "div",
                    props: { className: "grid gap-6 md:grid-cols-2" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1rem] border border-green-500/20 bg-green-500/10 p-5"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "mb-3 font-semibold text-green-400" },
                            children: ["Easy Wins:"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-2 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
                            },
                            children: [
                              { type: "li", children: ["52-week saving challenge"] },
                              { type: "li", children: ["Save all £5 notes you receive"] },
                              { type: "li", children: ["Use student discounts"] },
                              { type: "li", children: ["Cook at home more often"] },
                              { type: "li", children: ["Buy supermarket own brands"] }
                            ]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: {
                          className: "rounded-[1rem] border border-blue-500/20 bg-blue-500/10 p-5"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "mb-3 font-semibold text-blue-400" },
                            children: ["Apps to Help:"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-2 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
                            },
                            children: [
                              {
                                type: "li",
                                children: [
                                  { type: "span", props: { className: "font-bold text-white" }, children: ["Monzo/Starling"] },
                                  { type: "span", children: [" – round-ups"] }
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "span", props: { className: "font-bold text-white" }, children: ["Plum"] },
                                  { type: "span", children: [" – automatic savings"] }
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "span", props: { className: "font-bold text-white" }, children: ["Chip"] },
                                  { type: "span", children: [" – AI saving app"] }
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "span", props: { className: "font-bold text-white" }, children: ["YNAB"] },
                                  { type: "span", children: [" – budgeting app"] }
                                ]
                              },
                              {
                                type: "li",
                                children: [
                                  { type: "span", props: { className: "font-bold text-white" }, children: ["Honey"] },
                                  { type: "span", children: [" – discount codes"] }
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
              CARD 6 — Action Plan
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "mt-5 overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "div",
                props: {
                  className: "bg-gradient-to-r from-orange-500 via-white/[0.02] to-violet-500/10 p-6 pb-4"
                },
                children: [
                  {
                    type: "CardHeader",
                    props: { className: "p-0" },
                    children: [
                      {
                        type: "CardTitle",
                        props: { className: "text-2xl font-bold tracking-tight text-white md:text-3xl" },
                        children: ["Ready to Start Saving?"]
                      }
                    ]
                  }
                ]
              },
              {
                type: "CardContent",
                props: { className: "p-6 pt-4" },
                children: [
                  {
                    type: "div",
                    props: {
                      className: "rounded-[1rem] border border-violet-500/30 bg-violet-500/10 p-5 shadow-[0_0_25px_rgba(139,92,246,0.10)]"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "mb-3 font-semibold text-violet-400" },
                        children: ["Your Action Plan:"]
                      },
                      {
                        type: "ol",
                        props: {
                          className: "space-y-2 pl-4 text-sm text-[#e5e5e7]",
                          style: { listStyleType: "decimal" }
                        },
                        children: [
                          { type: "li", children: ["Set up a separate savings account"] },
                          { type: "li", children: ["Decide on your emergency fund target (start with £500)"] },
                          { type: "li", children: ["Set up automatic transfer for payday"] },
                          { type: "li", children: ["Choose one SMART savings goal"] },
                          { type: "li", children: ["Track your progress monthly"] }
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
    description: "Current accounts, savings accounts, interest explained",
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
        props: { className: "grid gap-6 text-white" },
        children: [
  
          /* ------------------------------------------------
              CARD 1 — Types of Bank Accounts
          ------------------------------------------------ */
          {
            type: "Card",
            props: {
              className:
                "rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "CardHeader",
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-2xl font-bold tracking-tight text-white md:text-3xl" },
                    children: ["Types of Bank Accounts"]
                  },
                  {
                    type: "CardDescription",
                    props: { className: "text-base text-[#9a9a9d]" },
                    children: ["Understanding your options"]
                  }
                ]
              },
  
              {
                type: "CardContent",
                children: [
                  {
                    type: "div",
                    props: { className: "grid gap-6 md:grid-cols-2" },
                    children: [
  
                      /* CURRENT ACCOUNT */
                      {
                        type: "div",
                        props: {
                          className:
                            "rounded-[1rem] border border-blue-500/30 bg-blue-500/10 p-6 shadow-[0_0_30px_rgba(59,130,246,0.10)]"
                        },
                        children: [
                          {
                            type: "h3",
                            props: { className: "mb-3 text-xl font-bold text-blue-400" },
                            children: ["💳 Current Account"]
                          },
                          {
                            type: "p",
                            props: { className: "mb-4 text-[#d7d7db]" },
                            children: ["Your everyday spending account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-2 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
                            },
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
                          className:
                            "rounded-[1rem] border border-green-500/30 bg-green-500/10 p-6 shadow-[0_0_30px_rgba(34,197,94,0.10)]"
                        },
                        children: [
                          {
                            type: "h3",
                            props: { className: "mb-3 text-xl font-bold text-green-400" },
                            children: ["🏦 Savings Account"]
                          },
                          {
                            type: "p",
                            props: { className: "mb-4 text-[#d7d7db]" },
                            children: ["Where you grow your money"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-2 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
                            },
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
            props: {
              className:
                "overflow-hidden rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "div",
                props: {
                  className: "bg-gradient-to-r from-green-500/15 via-blue-500/10 to-blue-500/15 p-6 pb-4"
                },
                children: [
                  {
                    type: "CardHeader",
                    props: { className: "p-0" },
                    children: [
                      {
                        type: "CardTitle",
                        props: { className: "flex items-center gap-2 text-2xl font-bold tracking-tight text-white md:text-3xl" },
                        children: [
                          { type: "Percent", props: { className: "h-6 w-6 text-blue-400" } },
                          "How Interest Works"
                        ]
                      }
                    ]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "space-y-4 p-6 pt-4" },
                children: [
                  {
                    type: "div",
                    props: {
                      className: "rounded-[1rem] border border-white/10 bg-white/[0.03] p-6"
                    },
                    children: [
                      {
                        type: "h3",
                        props: { className: "mb-3 text-xl font-bold text-white" },
                        children: ["Interest = Free Money!"]
                      },
                      {
                        type: "p",
                        props: { className: "mb-5 text-[#d7d7db]" },
                        children: [
                          "When you save money in a bank, they pay you interest as a \"thank you\" for letting them use your money."
                        ]
                      },
  
                      {
                        type: "div",
                        props: { className: "grid gap-4 md:grid-cols-2" },
                        children: [
  
                          /* SIMPLE */
                          {
                            type: "div",
                            props: {
                              className: "rounded-[1.25rem] border border-green-500/30 bg-green-500/10 p-5"
                            },
                            children: [
                              {
                                type: "h4",
                                props: { className: "mb-2 font-semibold text-green-400" },
                                children: ["Simple Example:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 pl-4 text-sm text-[#e5e5e7]",
                                  style: { listStyleType: "disc" }
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
                            props: {
                              className: "rounded-[1.25rem] border border-blue-500/30 bg-blue-500/10 p-5"
                            },
                            children: [
                              {
                                type: "h4",
                                props: { className: "mb-2 font-semibold text-blue-400" },
                                children: ["Compound Interest:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 pl-4 text-sm text-[#e5e5e7]",
                                  style: { listStyleType: "disc" }
                                },
                                children: [
                                  { type: "li", children: ["Year 2: £1,050 + 5% = £1,102.50"] },
                                  { type: "li", children: ["Year 3: £1,102.50 + 5% = £1,157.63"] },
                                  { type: "li", children: ["Year 4: £1,157.63 + 5% = £1,215.51"] },
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
                    props: {
                      className:
                        "rounded-[1.25rem] border border-green-500/30 bg-green-500/10 p-4 shadow-[0_0_25px_rgba(34,197,94,0.08)]"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "mb-2 font-semibold text-green-400" },
                        children: ["💡 Pro Tip:"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-[#e5e5e7]" },
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
            props: {
              className:
                "rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "CardHeader",
                children: [
                  {
                    type: "CardTitle",
                    props: { className: "text-2xl font-bold tracking-tight text-white md:text-3xl" },
                    children: ["Best Student Bank Accounts (2024)"]
                  }
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
                        props: {
                          className: "rounded-[1rem] border border-blue-500/30 bg-blue-500/10 p-5"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-blue-400" },
                            children: ["🏦 Santander Student Account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "mt-3 space-y-1 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
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
                        props: {
                          className: "rounded-[1rem] border border-green-500/30 bg-green-500/10 p-5"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-green-400" },
                            children: ["🏦 HSBC Student Account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "mt-3 space-y-1 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
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
                        props: {
                          className: "rounded-[1rem] border border-violet-500/30 bg-violet-500/10 p-5"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold text-violet-400" },
                            children: ["🏦 NatWest Student Account"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "mt-3 space-y-1 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
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
            props: {
              className:
                "overflow-hidden rounded-[2rem] border border-white/10 bg-[#232324] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            },
            children: [
              {
                type: "div",
                props: {
                  className: "bg-gradient-to-r from-blue-500/15 via-white/[0.02] to-green-500/15 p-6 pb-4"
                },
                children: [
                  {
                    type: "CardHeader",
                    props: { className: "p-0" },
                    children: [
                      {
                        type: "CardTitle",
                        props: { className: "text-2xl font-bold tracking-tight text-white md:text-3xl" },
                        children: ["Opening Your First Bank Account"]
                      }
                    ]
                  }
                ]
              },
  
              {
                type: "CardContent",
                props: { className: "p-6 pt-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "space-y-5" },
                    children: [
  
                      {
                        type: "h4",
                        props: { className: "text-lg font-semibold text-white" },
                        children: ["What You'll Need:"]
                      },
  
                      {
                        type: "div",
                        props: { className: "grid gap-4 md:grid-cols-2" },
                        children: [
  
                          /* DOCUMENTS REQUIRED */
                          {
                            type: "div",
                            props: {
                              className: "rounded-[1rem] border border-blue-500/30 bg-blue-500/10 p-5"
                            },
                            children: [
                              {
                                type: "h5",
                                props: { className: "mb-3 font-medium text-blue-400" },
                                children: ["📋 Documents Required:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 pl-4 text-sm text-[#e5e5e7]",
                                  style: { listStyleType: "disc" }
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
                            props: {
                              className: "rounded-[1rem] border border-green-500/30 bg-green-500/10 p-5"
                            },
                            children: [
                              {
                                type: "h5",
                                props: { className: "mb-3 font-medium text-green-400" },
                                children: ["📝 What to Expect:"]
                              },
                              {
                                type: "ul",
                                props: {
                                  className: "space-y-1 pl-4 text-sm text-[#e5e5e7]",
                                  style: { listStyleType: "disc" }
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
                        props: {
                          className:
                            "rounded-[1rem] border border-green-500/30 bg-green-500/10 p-5 shadow-[0_0_25px_rgba(34,197,94,0.08)]"
                        },
                        children: [
                          {
                            type: "h4",
                            props: { className: "mb-3 font-semibold text-green-400" },
                            children: ["💡 Top Tips:"]
                          },
                          {
                            type: "ul",
                            props: {
                              className: "space-y-1 pl-4 text-sm text-[#e5e5e7]",
                              style: { listStyleType: "disc" }
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
    description: "What they are and why they matter",
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


// Ensure passingScore matches number of quiz questions
function applyPassingScore(modules) {
  modules.forEach((mod) => {
    if (mod.quiz && Array.isArray(mod.quiz.questions)) {
      mod.quiz.passingScore = mod.quiz.questions.length;
    }
  });
}
applyPassingScore(coreMoneySkillsModules);


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
