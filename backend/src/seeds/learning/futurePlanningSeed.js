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
                          "Provides direction for your money",
                          "Motivates you to save and budget",
                          "Helps prioritize spending decisions",
                          "Builds discipline and good habits",
                          "Measures progress over time"
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
                          "Setting vague goals (“save more”)",
                          "Being unrealistic with timeframes",
                          "Not tracking progress",
                          "Having only long-term goals",
                          "Not adjusting goals when needed"
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
                ["Specific", "Clearly define what you want to achieve. Instead of “save money,” say “save £2,000 for a car deposit.”"],
                ["Measurable", "Include numbers so you can track progress. “Save £100 per month” is easier than “save regularly.”"],
                ["Achievable", "Be realistic about income and expenses. Saving £800/month on a £1,000 income isn’t realistic."],
                ["Relevant", "Make sure the goal matters to YOU — not just what others expect you to set."],
                ["Time-bound", "Set a deadline such as “Save £2,000 by December 2025” to stay focused."]
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
                          "Emergency fund (£500–1,000)",
                          "Holiday savings",
                          "New laptop/phone",
                          "Pay off small debt",
                          "Course or training fees"
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
                          "Car deposit",
                          "House deposit start",
                          "Wedding savings",
                          "Career change fund",
                          "Clear all debt"
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
                          "Full house deposit",
                          "Retirement savings",
                          "Children’s education",
                          "Starting a business",
                          "Financial independence"
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
                      `Goal: ${item.goal}`,
                      `Plan: ${item.plan}`,
                      `Why: ${item.why}`
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
                    "Calculate monthly income",
                    "List monthly expenses",
                    "Identify how much you can save",
                    "Note any existing debts"
                  ]
                },
                {
                  title: "2. Prioritize Your Goals",
                  items: [
                    "Emergency fund usually comes first",
                    "High-interest debt second",
                    "Then goals by importance",
                    "Avoid trying to do everything at once"
                  ]
                },
                {
                  title: "3. Automate Your Savings",
                  items: [
                    "Set up automatic transfers",
                    "Separate accounts for each goal",
                    "Pay yourself first",
                    "Increase savings as income grows"
                  ]
                },
                {
                  title: "4. Track and Adjust",
                  items: [
                    "Review progress monthly",
                    "Celebrate milestones",
                    "Adjust if circumstances change",
                    "Don’t abandon goals after setbacks"
                  ]
                }
              ].map(section => ({
                type: "div",
                props: { className: "p-4 bg-blue-50 rounded-lg" },
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
                        props: { className: "text-sm space-y-2 list-disc pl-4" },
                        children: [
                          "Visual reminders (photos of goals)",
                          "Track progress visually",
                          "Share goals with others",
                          "Reward yourself for milestones"
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
                        props: { className: "font-semibold text-yellow-600" },
                        children: ["When Things Go Wrong"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-2 list-disc pl-4" },
                        children: [
                          "Unexpected expenses happen",
                          "Adjust timelines, not goals",
                          "Restart from where you are",
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
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      },
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "next-step"
      }
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 1,
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
