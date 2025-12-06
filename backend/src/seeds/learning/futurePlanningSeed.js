// backend/src/seeds/learning/futurePlanningSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Future Planning — Learning Modules
 * Category ID: future-planning
 *
 * Includes:
 * 1. Long-Term Planning
 * 2. Retirement Basics
 * 3. Insurance & Protection
 * 4. Understanding Inflation
 * 5. Wills & Estate Planning
 */

const futurePlanningModules = [
  {
    title: "Setting Financial Goals",
    description: "Short, medium, and long-term planning for financial success",
    categoryId: "future-planning",
    topic: "setting-financial-goals",

    visual: {
      icon: "Target",
      iconColor: "bg-green-600",
      readTime: 6
    },

    uiTree: [
      /* ------------------------------------------------------------
      * HERO — EXACT GREEN GRADIENT
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: {
          className:
            "bg-gradient-to-r from-green-600 to-green-500 text-white mb-5"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl flex items-center gap-3" },
                children: [
                  { type: "Target", props: { className: "h-8 w-8 text-white" } },
                  "Setting Financial Goals"
                ]
              },
              {
                type: "CardDescription",
                props: { className: "text-white/90 text-lg" },
                children: [
                  "Short, medium, and long-term planning for financial success"
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * WHY SET FINANCIAL GOALS?
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Why Set Financial Goals?"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "Without clear goals, money tends to disappear on random purchases. Financial goals give your money purpose and help you make better decisions."
                ]
              },

              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* Benefits box */
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-600 mb-2" },
                        children: ["Benefits of Goal Setting"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          {type: "li", children:["Provides direction for your money",]},
                          {type: "li", children:["Motivates you to save and budget",]},
                          {type: "li", children:["Helps prioritize spending decisions",]},
                          {type: "li", children:["Builds discipline and good habits",]},
                          {type: "li", children:["Measures progress over time"]},
                        ]
                      }
                    ]
                  },

                  /* Common mistakes */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-600 mb-2" },
                        children: ["Common Mistakes"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          {type: "li", children:["Setting vague goals (“save more”)",]},
                          {type: "li", children:["Being unrealistic with timeframes",]},
                          {type: "li", children:["Not tracking progress",]},
                          {type: "li", children:["Having only long-term goals",]},
                          {type: "li", children:["Not adjusting goals when needed"]},
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

      /* ------------------------------------------------------------
      * SMART GOALS FRAMEWORK
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["The SMART Goals Framework"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "Make your financial goals SMART to increase your chances of success:"
                ]
              },

              ...[
                ["Specific", "Clearly define what you want to achieve. Instead of \"save money,\" say \"save £2,000 for a car deposit.\""],
                ["Measurable", "Include numbers so you can track progress. \"Save £100 per month\" is better than \"save regularly.\""],
                ["Achievable", "Be realistic about your income and expenses. If you earn £1,000/month, saving £800/month isn't achievable."],
                ["Relevant", "Make sure the goal matters to you personally. Don't set goals just because others expect you to."],
                ["Time-bound", "Set a deadline. \"Save £2,000 by December 2025\" creates urgency and helps you plan."]
              ].map(([label, text]) => ({
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: [
                      { type: "span", props: { className: "text-primary" }, children: [label[0]] },
                      label.slice(1)
                    ]
                  },
                  { type: "p", props: { className: "text-sm text-muted-foreground" }, children: [text] }
                ]
              }))
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * TIME FRAMES
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Calendar", props: { className: "h-6 w-6" } },
                  "Time Frames for Different Goals"
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
                props: { className: "grid md:grid-cols-3 gap-4" },
                children: [
                  /* Short-term */
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-600 mb-2" },
                        children: ["Short-term (0–1 year)"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          {type: "li", children:["Emergency fund (£500–1,000)",]},
                          {type: "li", children:["Holiday savings",]},
                          {type: "li", children:["New laptop/phone",]},
                          {type: "li", children:["Pay off small debt",]},
                          {type: "li", children:["Course or training fees"]},
                        ]
                      }
                    ]
                  },

                  /* Medium-term */
                  {
                    type: "div",
                    props: { className: "p-4 bg-yellow-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-yellow-600 mb-2" },
                        children: ["Medium-term (1–5 years)"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          {type: "li", children:["Car deposit",]},
                          {type: "li", children:["House deposit start",]},
                          {type: "li", children:["Wedding savings",]},
                          {type: "li", children:["Career change fund",]},
                          {type: "li", children:["Clear all debt"]},
                        ]
                      }
                    ]
                  },

                  /* Long-term */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-600 mb-2" },
                        children: ["Long-term (5+ years)"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          {type: "li", children:["Full house deposit",]},
                          {type: "li", children:["Retirement savings",]},
                          {type: "li", children:["Children’s education",]},
                          {type: "li", children:["Starting a business",]},
                          {type: "li", children:["Financial independence"]},
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

      /* ------------------------------------------------------------
      * GOAL EXAMPLES FOR STUDENTS
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [{ type: "CardTitle", children: ["Goal Examples for Students"] }]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              ...[
                {
                  title: "Example 1: Emergency Fund",
                  goal: "Save £1,000 emergency fund by end of academic year",
                  plan: "Save £100 per month from part-time job",
                  why: "Avoid debt when unexpected expenses arise"
                },
                {
                  title: "Example 2: Graduate Lifestyle",
                  goal: "Save £3,000 for post-graduation living expenses",
                  plan: "Save £75/month for 3 years",
                  why: "Financial cushion while finding first job"
                },
                {
                  title: "Example 3: Travel Fund",
                  goal: "Save £1,500 for Europe trip by March",
                  plan: "Save £150/month for 10 months",
                  why: "Travel without debt"
                }
              ].map(item => ({
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: [item.title] },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      {
                        type: "div",
                        children: [{ type: "strong", children: ["Goal: "] }, item.goal]
                      },
                      {
                        type: "div",
                        children: [{ type: "strong", children: ["Plan: "] }, item.plan]
                      },
                      {
                        type: "div",
                        children: [{ type: "strong", children: ["Why: "] }, item.why]
                      }
                    ]
                  }
                ]
              }))
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * ACTION PLAN
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "TrendingUp", props: { className: "h-6 w-6" } },
                  "Creating Your Action Plan"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              ...[
                {
                  title: "1. Assess Your Current Situation",
                  items: [
                    {type: "li", children:["Calculate monthly income",]},
                    {type: "li", children:["List monthly expenses",]},
                    {type: "li", children:["Identify how much you can save",]},
                    {type: "li", children:["Note any existing debts"]},
                  ]
                },
                {
                  title: "2. Prioritize Your Goals",
                  items: [
                    {type: "li", children:["Emergency fund usually comes first",]},
                    {type: "li", children:["High-interest debt second",]},
                    {type: "li", children:["Then goals by importance",]},
                    {type: "li", children:["Avoid trying to do everything at once"]},
                  ]
                },
                {
                  title: "3. Automate Your Savings",
                  items: [
                    {type: "li", children:["Set up automatic transfers",]},
                    {type: "li", children:["Separate accounts for each goal",]},
                    {type: "li", children:["Pay yourself first",]},
                    {type: "li", children:["Increase savings as income grows"]},
                  ]
                },
                {
                  title: "4. Track and Adjust",
                  items: [
                    {type: "li", children:["Review progress monthly",]},
                    {type: "li", children:["Celebrate milestones",]},
                    {type: "li", children:["Adjust if circumstances change",]},
                    {type: "li", children:["Don’t abandon goals after setbacks"]},
                  ]
                }
              ].map(section => ({
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-primary mb-2" },
                    children: [section.title]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm list-disc pl-4 space-y-1" },
                    children: section.items
                  }
                ]
              }))
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * STAYING MOTIVATED
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "CheckCircle", props: { className: "h-6 w-6 text-green-600" } },
                  "Staying Motivated"
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
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* Motivation */
                  {
                    type: "div",
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-600" },
                        children: ["Motivation Strategies"]
                      },
                    {
                      type: "ul",
                      props: { className: "text-sm space-y-2" },
                      children: [
                        {
                          type: "p",
                          props: { className: "flex items-center gap-2" },
                          children: [
                            { type: "CheckCircle", props: { className: "h-4 w-4 text-green-600" } },
                            "Visual reminders (photos of goals)"
                          ]
                        },
                        {
                          type: "p",
                          props: { className: "flex items-center gap-2" },
                          children: [
                            { type: "CheckCircle", props: { className: "h-4 w-4 text-green-600" } },
                            "Track progress visually"
                          ]
                        },
                        {
                          type: "p",
                          props: { className: "flex items-center gap-2" },
                          children: [
                            { type: "CheckCircle", props: { className: "h-4 w-4 text-green-600" } },
                            "Share goals with others"
                          ]
                        },
                        {
                          type: "p",
                          props: { className: "flex items-center gap-2" },
                          children: [
                            { type: "CheckCircle", props: { className: "h-4 w-4 text-green-600" } },
                            "Reward yourself for milestones"
                          ]
                        }
                      ]
                    }
                  ]
                },

                  /* When things go wrong */
                  {
                    type: "div",
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-yellow-500" },
                        children: ["When Things Go Wrong"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-2" },
                        children: [
                          {
                            type: "p",
                            props: { className: "flex items-center gap-2" },
                            children: [
                              {
                                type: "div",
                                props: { className: "w-4 h-4 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" }
                              },
                              "Unexpected expenses happen"
                            ]
                          },
                          {
                            type: "p",
                            props: { className: "flex items-center gap-2" },
                            children: [
                              {
                                type: "div",
                                props: { className: "w-4 h-4 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" }
                              },
                              "Adjust timelines, not goals"
                            ]
                          },
                          {
                            type: "p",
                            props: { className: "flex items-center gap-2" },
                            children: [
                              {
                                type: "div",
                                props: { className: "w-4 h-4 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" }
                              },
                              "Restart from where you are"
                            ]
                          },
                          {
                            type: "p",
                            props: { className: "flex items-center gap-2" },
                            children: [
                              {
                                type: "div",
                                props: { className: "w-4 h-4 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" }
                              },
                              "Learn from setbacks"
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

    /* ------------------------------------------------------------
    * QUIZ
    * ------------------------------------------------------------ */
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What makes a financial goal 'SMART'?",
          options: [
            "It's about money",
            "Specific, Measurable, Achievable, Relevant, Time-bound",
            "It's simple to understand",
            "It involves smart investments"
          ],
          correctAnswer: 1
        },
        {
          question: "Which is an example of a short-term financial goal?",
          options: [
            "Retiring at 65",
            "Buying a house in 10 years",
            "Saving £500 for a holiday",
            "Building a million-pound portfolio"
          ],
          correctAnswer: 2
        },
        {
          question: "What should you do first when setting financial goals?",
          options: [
            "Start investing immediately",
            "Understand your current financial situation",
            "Borrow money to invest",
            "Quit your job"
          ],
          correctAnswer: 1
        },
        {
          question: "How often should you review your financial goals?",
          options: [
            "Never, once set they're permanent",
            "Every 5 years",
            "At least annually",
            "Only when you fail to reach them"
          ],
          correctAnswer: 2
        },
        {
          question: "What's the benefit of having multiple time-frame goals?",
          options: [
            "It's confusing and unnecessary",
            "Keeps you motivated and builds good habits",
            "Only experts need multiple goals",
            "It guarantees success"
          ],
          correctAnswer: 1
        }
      ]
    },

    /* ------------------------------------------------------------
    * RELATED LESSONS
    * ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "retirement-basics",
        title: "Retirement Basics",
        relationship: "next-step"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 1,
    createdBy: "system"
  },

  {
    title: "Retirement Basics",
    description: "Pensions made simple for young people",
    categoryId: "future-planning",
    topic: "retirement-basics",

    visual: {
      icon: "PiggyBank",
      iconColor: "bg-green-600",
      readTime: 6
    },

    uiTree: [
      /* ------------------------------------------------------------
      * HERO — EXACT GREEN GRADIENT
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: {
          className:
            "bg-gradient-to-r from-green-600 to-green-500 text-white mb-5"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl flex items-center gap-3" },
                children: [
                  { type: "PiggyBank", props: { className: "h-8 w-8 text-white" } },
                  "Retirement Basics"
                ]
              },
              {
                type: "CardDescription",
                props: { className: "text-white/90 text-lg" },
                children: ["Pensions made simple for young people"]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * WHY THINK ABOUT RETIREMENT NOW?
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Why Think About Retirement Now?"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "You might think retirement is decades away, but starting early gives you a massive advantage thanks to compound interest."
                ]
              },

              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-700 mb-2" },
                    children: ["The Time Advantage"]
                  },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      "If you save £100/month from age 22 to 65 (43 years) at 5% growth:",
                      { type: "p", children: [{ type: "strong", children: ["Total saved:"] }, " £51,600"] },
                      { type: "p", children: [{ type: "strong", children: ["Final value:"] }, " Around £200,000"] },
                      {
                        type: "p",
                        props: { className: "mt-2 text-muted-foreground" },
                        children: ["Start at 35 instead? You’d need to save £250/month to get the same result!"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * THE UK PENSION SYSTEM
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["The UK Pension System"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* State Pension */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 mb-2" },
                        children: ["State Pension"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          {type: "li", children:["Basic government pension",]},
                          {type: "li", children:["Currently around £203/week",]},
                          {type: "li", children:["Need 35 years of National Insurance",]},
                          {type: "li", children:["Starting age rising to 67"]},
                        ]
                      }
                    ]
                  },

                  /* Workplace Pension */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 mb-2" },
                        children: ["Workplace Pension"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          {type: "li", children:["Auto-enrollment for most workers",]},
                          {type: "li", children:["Employer contributes at least 3%",]},
                          {type: "li", children:["You contribute minimum 5%",]},
                          {type: "li", children:["Government adds tax relief"]},
                        ]
                      }
                    ]
                  }
                ]
              },

              /* Personal Pensions */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Personal Pensions"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Private pensions you set up yourself — useful for self-employed people or to top up workplace pensions. Includes SIPPs (Self-Invested Personal Pensions)."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * HOW COMPOUND INTEREST WORKS
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "TrendingUp", props: { className: "h-6 w-6" } },
                  "How Compound Interest Works"
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
                props: { className: "text-lg" },
                children: [
                  "Compound interest is when your investment returns start earning returns themselves. It's like a snowball rolling downhill, getting bigger and faster."
                ]
              },

              /* Yellow example box */
              {
                type: "div",
                props: { className: "p-4 bg-yellow-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-yellow-700 mb-2" },
                    children: ["Simple Example"]
                  },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      { type: "div", children: [{ type: "strong", children: ["Year 1:"] }, " £1,000 grows 5% = £1,050"] },
                      { type: "div", children: [{ type: "strong", children: ["Year 2:"] }, " £2,050 grows 5% = £2,152.50"] },
                      { type: "div", children: [{ type: "strong", children: ["Year 3:"] }, " £3,152.50 grows 5% = £3,310"] },
                      {
                        type: "div",
                        props: { className: "text-muted-foreground mt-2" },
                        children: ["Notice how the growth gets bigger each year? That's compound interest!"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * AUTO-ENROLMENT
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Auto-Enrollment Explained"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "If you're employed and earn over £10,000 a year, you're automatically enrolled in your workplace pension."
                ]
              },

              /* The green “How it works” box */
              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-700 mb-2" },
                    children: ["How It Works"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm space-y-1 list-disc pl-4" },
                    children: [
                      { type: "li", children: ["You contribute 5% of your salary",]},
                      { type: "li", children: ["Your employer adds 3%",]},
                      { type: "li", children: ["Government adds tax relief (effectively 1%)",]},
                      { type: "li", children: ["Total: 9% of salary goes into your pension"]},
                    ]
                  }
                ]
              },

              /* Border example */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Example on £20,000 Salary"]
                  },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      "Your contribution: £1,000/year (but costs £800 after tax relief)",
                      { type: "p", props: {className: "mb-1 mt-1"}, children: ["Employer contribution: £600/year",]},
                      { type: "strong", children: ["Total going in: £1,600/year"] },
                      {
                        type: "div",
                        props: { className: "text-muted-foreground" },
                        children: ["That's £133 per month building your future!"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * SHOULD YOU OPT OUT?
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Should You Opt Out?"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              /* Red warning box */
              {
                type: "div",
                props: { className: "p-4 bg-red-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-red-700 mb-2" },
                    children: ["Generally, No!"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm" },
                    children: [
                      "Opting out means giving up free money from your employer and the government.",
                      {
                        type: "div",
                        props: {className: "list-disc pl-4 mt-1 space-y-1"},
                        children: [
                          { type: "li", children: ["You lose employer contributions (3% of salary)"]},
                          { type: "li", children: ["You lose tax relief from the government"]},
                          { type: "li", children: ["You lose decades of compound growth"]},
                        ]
                      }
                    ]
                  }
                ]
              },

              /* Yellow rare exceptions */
              {
                type: "div",
                props: { className: "p-4 bg-yellow-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-yellow-700 mb-2" },
                    children: ["Rare Exceptions"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Only consider opting out if you have high-interest debt (credit cards) that you need to clear first. Even then, opt back in as soon as possible."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    /* ------------------------------------------------------------
    * QUIZ
    * ------------------------------------------------------------ */
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What is the State Pension age currently rising to?",
          options: ["65", "66", "67", "68"],
          correctAnswer: 2
        },
        {
          question: "How many years of National Insurance are needed for full State Pension?",
          options: ["25 years", "30 years", "35 years", "40 years"],
          correctAnswer: 2
        },
        {
          question: "What does 'auto-enrollment' mean?",
          options: [
            "You choose your pension",
            "You're automatically enrolled into workplace pension",
            "You receive state pension automatically",
            "You must opt out of pensions"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the magic of compound interest?",
          options: [
            "Interest grows once",
            "Your returns earn returns over time",
            "Interest rates never change",
            "It works only for 10 years"
          ],
          correctAnswer: 1
        },
        {
          question: "When should you start thinking about pensions?",
          options: ["At age 50", "When you're 30", "As soon as you start working", "Only when wealthy"],
          correctAnswer: 2
        }
      ]
    },

    /* ------------------------------------------------------------
    * RELATED LESSONS
    * ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "insurance-explained",
        title: "Insurance Explained",
        relationship: "next-step"
      },
      {
        moduleId: "setting-financial-goals",
        title: "Setting Financial Goals",
        relationship: "related"
      },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 2,
    createdBy: "system"
  },

  {
    title: "Insurance Explained",
    description: "Health, car, and home insurance made simple",
    categoryId: "future-planning",
    topic: "insurance-explained",

    visual: {
      icon: "Shield",
      iconColor: "bg-green-600",
      readTime: 6
    },

    uiTree: [
      /* ------------------------------------------------------------
      * HERO — EXACT GREEN GRADIENT
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: {
          className:
            "bg-gradient-to-r from-green-600 to-green-500 text-white mb-5"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl flex items-center gap-3" },
                children: [
                  { type: "Shield", props: { className: "h-8 w-8 text-white" } },
                  "Insurance Explained"
                ]
              },
              {
                type: "CardDescription",
                props: { className: "text-white/90 text-lg" },
                children: ["Health, car, and home insurance made simple"]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * WHAT IS INSURANCE?
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["What is Insurance?"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "Insurance is protection against financial loss. You pay a small amount regularly (premium) so that if something bad happens, the insurance company pays for the big costs."
                ]
              },

              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-700 mb-2" },
                    children: ["Simple Example"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "You pay £30/month for car insurance. If you have an accident that costs £3,000 to repair, the insurance company pays (minus your excess). Without insurance, you’d pay the full £3,000."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * CAR INSURANCE
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Car", props: { className: "h-6 w-6" } },
                  "Car Insurance"
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
                props: { className: "grid md:grid-cols-3 gap-4" },
                children: [
                  /* Third Party Only */
                  {
                    type: "div",
                    props: { className: "p-4 bg-red-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-red-700 mb-2" },
                        children: ["Third Party Only"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Legally required minimum"] },
                          { type: "li", children: ["Covers damage to others"] },
                          { type: "li", children: ["Doesn’t cover your car"] },
                          { type: "li", children: ["Cheapest option"] }
                        ]
                      }
                    ]
                  },

                  /* Third Party, Fire & Theft */
                  {
                    type: "div",
                    props: { className: "p-4 bg-yellow-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-yellow-700 mb-2" },
                        children: ["Third Party, Fire & Theft"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Third party coverage"] },
                          { type: "li", children: ["Plus fire damage"] },
                          { type: "li", children: ["Plus theft protection"] },
                          { type: "li", children: ["Mid-range price"] }
                        ]
                      }
                    ]
                  },

                  /* Comprehensive */
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-700 mb-2" },
                        children: ["Comprehensive"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Everything above"] },
                          { type: "li", children: ["Plus accidental damage"] },
                          { type: "li", children: ["Vandalism coverage"] },
                          { type: "li", children: ["Often best value"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 bg-blue-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-blue-700 mb-2" },
                    children: ["Top Tips for Young Drivers"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm list-disc pl-4 space-y-1" },
                    children: [
                      { type: "li", children: ["Add experienced drivers as named drivers (can reduce cost)"] },
                      { type: "li", children: ["Consider black box/telematics insurance"] },
                      { type: "li", children: ["Shop around every year"] },
                      { type: "li", children: ["Higher excess = lower premium"] },
                      { type: "li", children: ["Pass Plus course can reduce costs"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * HEALTH INSURANCE
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Heart", props: { className: "h-6 w-6" } },
                  "Health Insurance"
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
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* NHS */
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-700 mb-2" },
                        children: ["NHS (Free Healthcare)"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Free at point of use"] },
                          { type: "li", children: ["Covers all essential treatment"] },
                          { type: "li", children: ["Emergency care included"] },
                          { type: "li", children: ["Prescription charges in England"] }
                        ]
                      }
                    ]
                  },

                  /* Private Health Insurance */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 mb-2" },
                        children: ["Private Health Insurance"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Faster access to specialists"] },
                          { type: "li", children: ["Private hospital rooms"] },
                          { type: "li", children: ["Choice of appointment times"] },
                          { type: "li", children: ["Can be expensive"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 bg-yellow-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-yellow-700 mb-2" },
                    children: ["For Students"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Most students don’t need private health insurance. The NHS provides excellent care. Focus on travel insurance if going abroad, and dental/optical coverage if needed."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * HOME INSURANCE
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Home", props: { className: "h-6 w-6" } },
                  "Home Insurance"
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
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* Contents Insurance */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 mb-2" },
                        children: ["Contents Insurance"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Covers your belongings"] },
                          { type: "li", children: ["Important for renters"] },
                          { type: "li", children: ["Includes laptop, clothes, etc."] },
                          { type: "li", children: ["Often cheaper than you think"] }
                        ]
                      }
                    ]
                  },

                  /* Buildings Insurance */
                  {
                    type: "div",
                    props: { className: "p-4 bg-yellow-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-yellow-700 mb-2" },
                        children: ["Buildings Insurance"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          { type: "li", children: ["Covers the property structure"] },
                          { type: "li", children: ["Landlord’s responsibility if you rent"] },
                          { type: "li", children: ["Required for mortgages"] },
                          { type: "li", children: ["Not needed if renting"] }
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
                    props: { className: "font-semibold text-green-700 mb-2" },
                    children: ["Student Tip"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Check if you’re covered under parents’ home insurance while at university. Many policies cover students’ belongings in halls or shared houses."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * KEY INSURANCE TERMS
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Key Insurance Terms"] }] },

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
                        type: "div",
                        props: { className: "p-3 border rounded-lg" },
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Premium"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["The amount you pay for insurance (monthly/yearly)"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: { className: "p-3 border rounded-lg" },
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Excess/Deductible"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Amount you pay before insurance kicks in"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: { className: "p-3 border rounded-lg" },
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Policy"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Your insurance contract document"]
                          }
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "space-y-3" },
                    children: [
                      {
                        type: "div",
                        props: { className: "p-3 border rounded-lg" },
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Claim"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Request for the insurance company to pay for damage"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: { className: "p-3 border rounded-lg" },
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-1" }, children: ["No Claims Bonus"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Discount you get for not making claims"]
                          }
                        ]
                      },
                      {
                        type: "div",
                        props: { className: "p-3 border rounded-lg" },
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-1" }, children: ["Underwriter"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Company that actually provides the insurance"]
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

      /* ------------------------------------------------------------
      * INSURANCE PRIORITIES
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Insurance Priorities for Young People"] }] },

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
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-700 mb-2" },
                        children: ["1. Contents Insurance (if renting)"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Protect your laptop, phone, and belongings. Often costs £5–15/month."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-yellow-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-yellow-700 mb-2" },
                        children: ["2. Car Insurance (if driving)"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Legally required. Shop around and consider telematics policies."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 mb-2" },
                        children: ["3. Travel Insurance"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Essential for holidays abroad. Can be annual or per-trip."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["Later: Life Insurance"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "Only needed when others depend on your income (mortgage, children, etc.)."
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

    /* ------------------------------------------------------------
    * QUIZ
    * ------------------------------------------------------------ */
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What is the main purpose of insurance?",
          options: [
            "To make money",
            "To protect against financial loss",
            "To avoid paying taxes",
            "To invest your money"
          ],
          correctAnswer: 1
        },
        {
          question: "Which insurance is legally required for driving?",
          options: [
            "Comprehensive car insurance",
            "Third party car insurance",
            "Health insurance",
            "Life insurance"
          ],
          correctAnswer: 1
        },
        {
          question: "What is an insurance premium?",
          options: [
            "The amount you claim",
            "The regular payment you make",
            "The insurance company's profit",
            "Your deductible"
          ],
          correctAnswer: 1
        },
        {
          question: "What is an excess/deductible?",
          options: [
            "Extra insurance coverage",
            "Amount you pay before insurance pays",
            "Insurance company's fee",
            "Annual bonus"
          ],
          correctAnswer: 1
        },
        {
          question: "Which insurance should young people generally prioritise?",
          options: [
            "Life insurance first",
            "Contents insurance if renting",
            "Expensive comprehensive policies",
            "Investment-linked insurance"
          ],
          correctAnswer: 1
        }
      ]
    },

    /* ------------------------------------------------------------
    * RELATED LESSONS
    * ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "financial-independence",
        title: "Financial Independence & Early Retirement",
        relationship: "next-step"
      },
      {
        moduleId: "setting-financial-goals",
        title: "Setting Financial Goals",
        relationship: "related"
      },
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 3,
    createdBy: "system"
  },

  {
    title: "Financial Independence & Early Retirement",
    description: "A deep dive into the FIRE movement and how young people can achieve financial freedom",
    categoryId: "future-planning",
    topic: "financial-independence",

    visual: {
      icon: "Zap",
      iconColor: "bg-orange-600",
      readTime: 6
    },

    uiTree: [
      /* ------------------------------------------------------------
      * HERO — EXACT ORANGE→RED GRADIENT
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: {
          className:
            "bg-gradient-to-br from-orange-500 to-red-600 text-white mb-5 border-0"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl flex items-center gap-3" },
                children: [
                  { type: "Zap", props: { className: "h-8 w-8 text-white" } },
                  "Financial Independence & Early Retirement"
                ]
              }
            ]
          },
          {
            type: "CardContent",
            children: [
              {
                type: "p",
                props: { className: "text-lg opacity-90" },
                children: [
                  "FIRE (Financial Independence, Retire Early) is a movement focused on saving and investing aggressively to achieve financial freedom much earlier than traditional retirement age."
                ]
              },
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * WHAT IS FIRE?
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Target", props: { className: "h-5 w-5 text-orange-500" } },
                  "What is FIRE?"
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
                  "FIRE stands for ",
                  { type: "strong", children: ["Financial Independence, Retire Early"] },
                  ". It's a lifestyle movement focused on extreme saving and investing to build enough wealth that you can live off your investments indefinitely."
                ]
              },
              {
                type: "p",
                children: [
                  "The goal isn't necessarily to stop working entirely—it's about having the ",
                  { type: "strong", children: ["freedom to choose"] },
                  " whether you work, what you work on, and when you work. Financial independence means your basic needs are covered by passive income from your investments."
                ]
              },
              {
                type: "div",
                props: { className: "bg-muted p-4 rounded-lg" },
                children: [
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      { type: "strong", children: ["Key Insight: "] },
                      "FIRE isn't about being lazy or avoiding work. Many FIRE followers continue working on passion projects, volunteering, or starting businesses—they just don'thave to work for money."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * THE 4% RULE EXPLAINED
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Calculator", props: { className: "h-5 w-5 text-blue-500" } },
                  "The 4% Rule Explained"
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
                  "The foundation of FIRE is the ",
                  { type: "strong", children: ["4% rule"] },
                  ", based on the Trinity Study. It suggests that if you withdraw 4% of your investment portfolio each year, your money should last at least 30 years (and likely indefinitely)."
                ]
              },

              /* Blue example box */
              {
                type: "div",
                props: { className: "p-4 bg-blue-50 rounded-lg space-y-3" },
                children: [
                  { type: "p", props: { className: "font-semibold" }, children: ["The Simple Formula:"] },
                  {
                    type: "div",
                    props: { className: "text-center py-4" },
                    children: [
                      {
                        type: "p",
                        props: { className: "text-2xl font-bold text-primary" },
                        children: ["Annual Expenses × 25 = FIRE Number"]
                      }
                    ]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "Example: If you spend £30,000/year, you need £750,000 invested to be financially independent."
                    ]
                  }
                ]
              },

              /* Two supporting explanation cards */
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "p", props: { className: "font-semibold mb-2" }, children: ["Why 25x?"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "Because 4% of 25 = 1 (your full annual expenses). Withdrawing 4% leaves enough for growth to keep up with inflation."
                        ]
                      }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "p", props: { className: "font-semibold mb-2" }, children: ["Is 4% Safe?"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "Some prefer 3.5% (28x expenses) for extra safety, especially for early retirees who may need funds for 50+ years."
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

      /* ------------------------------------------------------------
      * TYPES OF FIRE
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "TrendingUp", props: { className: "h-5 w-5 text-green-500" } },
                  "Types of FIRE"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "space-y-4" },
                children: [
                  /* Lean FIRE */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 border-l-4 border-green-500 bg-gray-50 rounded-r-lg"
                    },
                    children: [
                      { type: "p", props: { className: "font-semibold text-green-600" }, children: ["Lean FIRE"] },
                      {
                        type: "p",
                        props: { className: "text-sm mt-1" },
                        children: [
                          "Living on a minimal budget (typically £20-30k/year in the UK). Requires less savings but means a more frugal lifestyle."
                        ]
                      }
                    ]
                  },

                  /* Fat FIRE */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 border-l-4 border-blue-500 bg-gray-50 rounded-r-lg"
                    },
                    children: [
                      { type: "p", props: { className: "font-semibold text-blue-600" }, children: ["Fat FIRE"] },
                      {
                        type: "p",
                        props: { className: "text-sm mt-1" },
                        children: [
                          "Maintaining your current lifestyle or better (£50k+/year). Requires more savings but allows for comfortable living."
                        ]
                      }
                    ]
                  },

                  /* Barista FIRE */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 border-l-4 border-purple-500 bg-gray-50 rounded-r-lg"
                    },
                    children: [
                      { type: "p", props: { className: "font-semibold text-purple-600" }, children: ["Barista FIRE"] },
                      {
                        type: "p",
                        props: { className: "text-sm mt-1" },
                        children: [
                          "Having enough saved to cover most expenses, but working part-time for extra income and benefits (like healthcare)."
                        ]
                      }
                    ]
                  },

                  /* Coast FIRE */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 border-l-4 border-orange-500 bg-gray-50 rounded-r-lg"
                    },
                    children: [
                      { type: "p", props: { className: "font-semibold text-orange-600" }, children: ["Coast FIRE"] },
                      {
                        type: "p",
                        props: { className: "text-sm mt-1" },
                        children: [
                          "Having enough invested that compound growth alone will fund traditional retirement. You only need to cover current expenses."
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

      /* ------------------------------------------------------------
      * HOW TO ACHIEVE FIRE
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "PiggyBank", props: { className: "h-8 w-8 text-pink-500" } },
                  "How to Achieve FIRE"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "space-y-4" },
                children: [
                  /* Steps 1–5 */
                  ...[
                    ["Calculate Your FIRE Number", "Track your expenses, determine your target lifestyle, and multiply annual expenses by 25."],
                    ["Maximize Your Savings Rate", "Aim to save 50-70% of your income. The higher your savings rate, the faster you reach FIRE."],
                    ["Invest Consistently", "Put your savings into low-cost index funds. Use ISAs and pensions for tax efficiency."],
                    ["Increase Your Income", "Negotiate raises, develop skills, start side hustles. More income = faster FIRE."],
                    ["Reduce Major Expenses", "Housing, transport, and food are your biggest levers. Optimize these first."]
                  ].map(([title, desc], i) => ({
                    type: "div",
                    props: { className: "flex gap-4" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className:
                            "flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold"
                        },
                        children: [`${i + 1}`]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "p", props: { className: "font-semibold" }, children: [title] },
                          { type: "p", props: { className: "text-sm text-muted-foreground" }, children: [desc] }
                        ]
                      }
                    ]
                  }))
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * SAVINGS RATE TIMELINE
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Clock", props: { className: "h-5 w-5 text-indigo-500" } },
                  "How Savings Rate Affects Your Timeline"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "p",
                props: { className: "mb-4" },
                children: [
                  "Your savings rate is the most important factor in reaching FIRE. Here's how long it takes to reach financial independence at different savings rates (assuming 7% returns):"
                ]
              },

              /* Progress Bars */
              {
                type: "div",
                props: { className: "space-y-3" },
                children: [
                  ...[
                    ["10%", "51 years", "bg-red-500", "100%"],
                    ["25%", "32 years", "bg-orange-500", "65%"],
                    ["50%", "17 years", "bg-yellow-500", "35%"],
                    ["70%", "8.5 years", "bg-green-500", "18%"]
                  ].map(([rate, label, colour, width]) => ({
                    type: "div",
                    props: { className: "flex items-center gap-3" },
                    children: [
                      { type: "span", props: { className: "w-16 text-sm font-medium" }, children: [rate] },
                      {
                        type: "div",
                        props: {
                          className: "flex-1 bg-muted rounded-full h-6 overflow-hidden"
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              className: `${colour} h-full rounded-full flex items-center justify-end pr-2`,
                              style: { width }
                            },
                            children: [
                              {
                                type: "span",
                                props: { className: "text-xs text-white font-medium" },
                                children: [label]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }))
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * FIRE TIPS (UK)
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: {
          className:
            "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30 mb-5"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: {
                  className: "flex items-center gap-2 text-yellow-700 dark:text-yellow-400"
                },
                children: [
                  { type: "Lightbulb", props: { className: "h-5 w-5" } },
                  "FIRE Tips for UK Residents"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "ul",
                props: { className: "space-y-2" },
                children: [
                  ...[
                    "Max out your ISA allowance (£20,000/year) for tax-free growth",
                    "Contribute enough to get full employer pension matching",
                    "Consider a SIPP for additional tax-efficient retirement savings",
                    "Build a 6-12 month emergency fund before aggressive investing",
                    "Track your net worth monthly to stay motivated"
                  ].map(text => ({
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "CheckCircle", props: { className: "h-4 w-4 mt-1 text-yellow-600" } },
                      text
                    ]
                  }))
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------
      * WARNINGS
      * ------------------------------------------------------------ */
      {
        type: "Card",
        props: {
          className:
            "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 mb-5"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: {
                  className: "flex items-center gap-2 text-red-700 dark:text-red-400"
                },
                children: [
                  { type: "AlertTriangle", props: { className: "h-5 w-5" } },
                  "Things to Consider"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "ul",
                props: { className: "space-y-2 text-red-800 dark:text-red-200" },
                children: [
                  ...[
                    "Healthcare costs—the NHS helps, but consider private health insurance",
                    "Sequence of returns risk—market crashes early in retirement can be devastating",
                    "Lifestyle inflation—be careful your spending doesn't creep up with income",
                    "Don't sacrifice your health or relationships for a faster FIRE date",
                    "Have a plan for what you'll DO in retirement—purpose matters"
                  ].map(text => ({
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [{ type: "span", props: { className: "font-bold" }, children: ["•"] }, text]
                  }))
                ]
              }
            ]
          }
        ]
      },

    ],

    /* ------------------------------------------------------------
    * QUIZ
    * ------------------------------------------------------------ */
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What does FIRE stand for?",
          options: [
            "Financial Investment & Real Estate",
            "Financial Independence, Retire Early",
            "Fixed Income Retirement Earnings",
            "Future Investment & Retirement Equity"
          ],
          correctAnswer: 1
        },
        {
          question: "According to the 4% rule, how much do you need saved to retire?",
          options: [
            "10× expenses",
            "15× expenses",
            "25× expenses",
            "50× expenses"
          ],
          correctAnswer: 2
        },
        {
          question: "Which type of FIRE maintains your current lifestyle?",
          options: ["Lean FIRE", "Fat FIRE", "Barista FIRE", "Coast FIRE"],
          correctAnswer: 1
        },
        {
          question: "What savings rate do most FIRE followers aim for?",
          options: ["10–20%", "20–30%", "50–70%", "80–90%"],
          correctAnswer: 2
        }
      ]
    },

    /* ------------------------------------------------------------
    * RELATED LESSONS
    * ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "retirement-basics",
        title: "Retirement Basics",
        relationship: "related"
      },
      {
        moduleId: "intro-investing",
        title: "Intro to Investing",
        relationship: "related"
      }
    ],

    points: 150,
    difficultyLevel: "advanced",
    timeEstimate: 6,
    order: 4,
    createdBy: "system"
  },

];

// =====================================================
// Seed Function
// =====================================================
async function seedFuturePlanning() {
  try {
    for (const module of futurePlanningModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );
            
      console.log(`🔄 Upserted module: ${module.title}`);
    }
    console.log("✅ Future Planning modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Future Planning:", error);
  }
}

module.exports = {
  futurePlanningModules,
  seedFuturePlanning,
};
