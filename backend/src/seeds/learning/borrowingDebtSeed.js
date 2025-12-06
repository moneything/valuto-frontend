// backend/src/seeds/learning/borrowingDebtSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Borrowing & Debt — Learning Modules
 * Category ID: borrowing-debt
 *
 * Includes:
 * 1. Understanding Credit Scores
 * 2. Loans & APR Explained
 * 3. Credit Cards: How They Work
 * 4. Debt Repayment Strategies
 */

const borrowingDebtModules = [
  {
    "title": "Good Debt vs Bad Debt",
    "description": "Not all debt is created equal - learn the crucial difference",
    "categoryId": "borrowing-debt",
    "topic": "good-vs-bad-debt",

    "visual": {
      "icon": "CheckCircle",
      "iconColor": "bg-green-500",
      "readTime": 3
    },

    "uiTree": [
      /* ============================================================
      * HEADER BANNER (Green gradient card)
      * ============================================================ */
      {
        "type": "Card",
        "props": { "className": "gradient-primary text-primary-foreground" },
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "props": { "className": "text-3xl" }, "children": ["Good Debt vs Bad Debt"] },
              {
                "type": "CardDescription",
                "props": { "className": "text-primary-foreground/80 text-lg" },
                "children": ["Not all debt is created equal - learn the crucial difference"]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * WHAT IS GOOD DEBT?
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
                  { "type": "icon", "props": { "name": "CheckCircle", "className": "h-6 w-6 text-success" } },
                  "What is Good Debt?"
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
                  "Good debt helps you build wealth or improve your earning potential over time. It typically has:"
                ]
              },

              /* Bullet list */
              {
                "type": "ul",
                "props": { "className": "space-y-2" },
                "children": [
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "CheckCircle", "className": "h-5 w-5 text-success mt-0.5" } },
                      { "type": "span", "children": ["Lower interest rates - Usually under 10%"] }
                    ]
                  },
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "CheckCircle", "className": "h-5 w-5 text-success mt-0.5" } },
                      { "type": "span", "children": ["Tax benefits - Interest may be tax deductible"] }
                    ]
                  },
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "CheckCircle", "className": "h-5 w-5 text-success mt-0.5" } },
                      { "type": "span", "children": ["Asset backing - Secured by something valuable"] }
                    ]
                  },
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "CheckCircle", "className": "h-5 w-5 text-success mt-0.5" } },
                      { "type": "span", "children": ["Future value - Helps build wealth or income"] }
                    ]
                  }
                ]
              },

              /* Examples box */
              {
                "type": "div",
                "props": { "className": "mt-6 p-4 bg-success/10 rounded-lg" },
                "children": [
                  {
                    "type": "h4",
                    "props": { "className": "font-semibold text-success mb-2" },
                    "children": ["Examples of Good Debt:"]
                  },
                  {
                    "type": "ul",
                    "props": { "className": "space-y-1 text-sm" },
                    "children": [
                      { "type": "li", "children": ["• Mortgages - Property can appreciate in value"] },
                      { "type": "li", "children": ["• Student loans - Education increases earning potential"] },
                      { "type": "li", "children": ["• Business loans - Investment in income-generating assets"] },
                      { "type": "li", "children": ["• Investment property loans - Generate rental income"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * WHAT IS BAD DEBT?
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
                  { "type": "icon", "props": { "name": "XCircle", "className": "h-6 w-6 text-destructive" } },
                  "What is Bad Debt?"
                ]
              }
            ]
          },

          {
            "type": "CardContent",
            "props": { "className": "space-y-4" },
            "children": [
              { "type": "p", "props": { "className": "text-lg" }, "children": ["Bad debt costs you money without building wealth. It typically has:"] },

              /* List */
              {
                "type": "ul",
                "props": { "className": "space-y-2" },
                "children": [
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "XCircle", "className": "h-5 w-5 text-destructive mt-0.5" } },
                      { "type": "span", "children": ["High interest rates - Often 15-30% or more"] }
                    ]
                  },
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "XCircle", "className": "h-5 w-5 text-destructive mt-0.5" } },
                      { "type": "span", "children": ["No tax benefits - Interest is not deductible"] }
                    ]
                  },
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "XCircle", "className": "h-5 w-5 text-destructive mt-0.5" } },
                      { "type": "span", "children": ["Depreciating assets - Items lose value quickly"] }
                    ]
                  },
                  {
                    "type": "li",
                    "props": { "className": "flex items-start gap-2" },
                    "children": [
                      { "type": "icon", "props": { "name": "XCircle", "className": "h-5 w-5 text-destructive mt-0.5" } },
                      { "type": "span", "children": ["Consumption focused - For lifestyle expenses"] }
                    ]
                  }
                ]
              },

              /* Examples box */
              {
                "type": "div",
                "props": { "className": "mt-6 p-4 bg-destructive/10 rounded-lg" },
                "children": [
                  {
                    "type": "h4",
                    "props": { "className": "font-semibold text-destructive mb-2" },
                    "children": ["Examples of Bad Debt:"]
                  },
                  {
                    "type": "ul",
                    "props": { "className": "space-y-1 text-sm" },
                    "children": [
                      { "type": "li", "children": ["• Credit card debt - Especially for non-essentials"] },
                      { "type": "li", "children": ["• Payday loans - Extremely high interest rates"] },
                      { "type": "li", "children": ["• Car loans for luxury vehicles - Cars depreciate rapidly"] },
                      { "type": "li", "children": ["• Store credit cards - High rates, limited benefits"] },
                      { "type": "li", "children": ["• Personal loans for holidays - No lasting value"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * GRAY AREA
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
                  { "type": "icon", "props": { "name": "AlertTriangle", "className": "h-6 w-6 text-warning" } },
                  "The Gray Area"
                ]
              }
            ]
          },

          {
            "type": "CardContent",
            "props": { "className": "space-y-4" },
            "children": [
              { "type": "p", "props": { "className": "text-lg" }, "children": ["Some debt falls between good and bad - it depends on your situation:"] },

              {
                "type": "div",
                "props": { "className": "grid md:grid-cols-2 gap-4" },
                "children": [
                  /* Car loans */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Car Loans"] },
                      { "type": "p", "props": { "className": "text-sm text-muted-foreground mb-2" }, "children": ["Could be good if:"] },
                      {
                        "type": "ul",
                        "props": { "className": "text-sm space-y-1" },
                        "children": [
                          { "type": "li", "children": ["• Needed for work/income"] },
                          { "type": "li", "children": ["• Reliable, fuel-efficient vehicle"] },
                          { "type": "li", "children": ["• Low interest rate"] }
                        ]
                      }
                    ]
                  },

                  /* Home Equity Loans */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Home Equity Loans"] },
                      { "type": "p", "props": { "className": "text-sm text-muted-foreground mb-2" }, "children": ["Could be good if:"] },
                      {
                        "type": "ul",
                        "props": { "className": "text-sm space-y-1" },
                        "children": [
                          { "type": "li", "children": ["• Used for home improvements"] },
                          { "type": "li", "children": ["• Consolidating high-interest debt"] },
                          { "type": "li", "children": ["• Investment in education"] }
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
      * DEBT STRATEGY
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Your Debt Strategy"] }] },

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
                    "props": { "className": "p-4 bg-primary/5 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-primary mb-2" }, "children": ["1. Pay off bad debt first"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": ["Focus on high-interest debt like credit cards before investing."] }
                    ]
                  },

                  {
                    "type": "div",
                    "props": { "className": "p-4 bg-primary/5 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-primary mb-2" }, "children": ["2. Consider good debt carefully"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": ["Even good debt should fit your budget and financial goals."] }
                    ]
                  },

                  {
                    "type": "div",
                    "props": { "className": "p-4 bg-primary/5 rounded-lg" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-primary mb-2" }, "children": ["3. Have an emergency fund"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": ["Avoid taking on bad debt for unexpected expenses."] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * TEST YOUR KNOWLEDGE (start quiz only)
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [
            { "type": "CardTitle", "children": ["Test Your Knowledge"] },
            { "type": "CardDescription", "children": ["Take a quick quiz to check your understanding of good vs bad debt"] }
          ]},

          {
            "type": "CardContent",
            "children": [
              {
                "type": "Button",
                "props": { "className": "w-full" },
                "children": [
                  { "type": "icon", "props": { "name": "BookOpen", "className": "h-4 w-4 mr-2" } },
                  "Start Quiz"
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * NEXT STEPS
      * ============================================================ */
      {
        "type": "Card",
        "children": [
          { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Next Steps"] }] },

          {
            "type": "CardContent",
            "props": { "className": "space-y-4" },
            "children": [
              {
                "type": "div",
                "props": { "className": "grid md:grid-cols-2 gap-4" },
                "children": [
                  {
                    "type": "Button",
                    "props": { "variant": "outline", "className": "h-auto p-4 flex-col items-start" },
                    "children": [
                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Student Loans Explained"] },
                      { "type": "span", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Understand your student loan details"] }
                    ]
                  },
                  {
                    "type": "Button",
                    "props": { "variant": "outline", "className": "h-auto p-4 flex-col items-start" },
                    "children": [
                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["How to Get Out of Debt"] },
                      { "type": "span", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Strategies for becoming debt-free"] }
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
    * QUIZ SEED (Matches EXACT React questions + wording)
    * ============================================================ */
    "quiz": {
      "passingScore": 4,
      "questions": [
        {
          "question": "Which of these is typically considered 'good debt'?",
          "options": [
            "Credit card debt for holidays",
            "Student loan for education",
            "Payday loan",
            "Car loan for luxury vehicle"
          ],
          "correctAnswer": 1,
          "explanation": "Student loans can increase earning potential, making them a form of good debt."
        },
        {
          "question": "What makes debt 'good'?",
          "options": ["High interest rates", "Helps build wealth over time", "Easy to get", "No repayment needed"],
          "correctAnswer": 1,
          "explanation": "Good debt helps you build long-term wealth or future income."
        },
        {
          "question": "Which debt should you prioritize paying off first?",
          "options": ["Mortgage", "Student loan", "Credit card debt", "Investment loan"],
          "correctAnswer": 2,
          "explanation": "Credit card debt has extremely high interest rates and should be paid off first."
        },
        {
          "question": "What's a key characteristic of bad debt?",
          "options": ["Low interest rates", "Tax deductible", "High interest rates with no wealth building", "Secured by assets"],
          "correctAnswer": 2,
          "explanation": "Bad debt costs money without adding value and often has high interest."
        },
        {
          "question": "Why might a mortgage be considered good debt?",
          "options": [
            "Property can appreciate in value",
            "Interest rates are always low",
            "No down payment required",
            "Never needs to be repaid"
          ],
          "correctAnswer": 0,
          "explanation": "A home can grow in value over time, building wealth."
        }
      ]
    },

    "points": 120,
    "difficultyLevel": "beginner",
    "timeEstimate": 3,
    "order": 4,
    "createdBy": "system"
  }

];

// =====================================================
// Seed Function
// =====================================================
async function seedBorrowingDebt() {
  try {
    for (const module of borrowingDebtModules) {
      const exists = await LearningModule.findOne({ topic: module.topic });
      if (!exists) {
        await LearningModule.create(module);
        console.log(`✅ Created module: ${module.title}`);
      } else {
        console.log(`⏭️  Module already exists: ${module.title}`);
      }
    }
    console.log("✅ Borrowing & Debt modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Borrowing & Debt:", error);
  }
}

module.exports = {
  borrowingDebtModules,
  seedBorrowingDebt,
};
