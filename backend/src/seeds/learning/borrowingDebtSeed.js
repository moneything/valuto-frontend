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
    title: "Good Debt vs Bad Debt",
    description: "Not all debt is created equal - learn the crucial difference",
    categoryId: "borrowing-debt",
    topic: "good-vs-bad-debt",

    visual: {
      icon: "AlertTriangle",
      iconColor: "bg-yellow-500",
      readTime: 3
    },

    uiTree: [
      /* ============================================================
      * HERO CARD
      * ============================================================ */
      {
        type: "Card",
        props: { className: "bg-gradient-to-r from-green-600 to-green-500 text-primary-foreground mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl text-white" },
                children: ["Good Debt vs Bad Debt"]
              },
              {
                type: "CardDescription",
                props: { className: "text-white text-lg" },
                children: ["Not all debt is created equal - learn the crucial difference"]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * WHAT IS GOOD DEBT?
      * ============================================================ */
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
                  "What is Good Debt?"
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
                  "Good debt helps you build wealth or improve your earning potential over time. It typically has:"
                ]
              },

              {
                type: "ul",
                props: { className: "space-y-2" },
                children: [
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "CheckCircle", props: { className: "h-5 w-5 text-green-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["Lower interest rates"] },
                          " - Usually under 10%"
                        ]
                      }
                    ]
                  },
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "CheckCircle", props: { className: "h-5 w-5 text-green-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["Tax benefits"] },
                          " - Interest may be tax deductible"
                        ]
                      }
                    ]
                  },
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "CheckCircle", props: { className: "h-5 w-5 text-green-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["Asset backing"] },
                          " - Secured by something valuable"
                        ]
                      }
                    ]
                  },
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "CheckCircle", props: { className: "h-5 w-5 text-green-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["Future value"] },
                          " - Helps build wealth or income"
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: {
                  className: "mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-700 mb-2" },
                    children: ["Examples of Good Debt:"]
                  },
                  {
                    type: "ul",
                    props: { className: "space-y-1 text-sm list-disc pl-4" },
                    children: [
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Mortgages"] },
                          " - Property can appreciate in value"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Student loans"] },
                          " - Education increases earning potential"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Business loans"] },
                          " - Investment in income-generating assets"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Investment property loans"] },
                          " - Generate rental income"
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
      * WHAT IS BAD DEBT?
      * ============================================================ */
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
                  { type: "XCircle", props: { className: "h-6 w-6 text-red-600" } },
                  "What is Bad Debt?"
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
                  "Bad debt costs you money without building wealth. It typically has:"
                ]
              },

              {
                type: "ul",
                props: { className: "space-y-2" },
                children: [
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "XCircle", props: { className: "h-5 w-5 text-red-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["High interest rates"] },
                          " - Often 15-30% or more"
                        ]
                      }
                    ]
                  },
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "XCircle", props: { className: "h-5 w-5 text-red-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["No tax benefits"] },
                          " - Interest is not deductible"
                        ]
                      }
                    ]
                  },
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "XCircle", props: { className: "h-5 w-5 text-red-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["Depreciating assets"] },
                          " - Items lose value quickly"
                        ]
                      }
                    ]
                  },
                  {
                    type: "li",
                    props: { className: "flex items-start gap-2" },
                    children: [
                      { type: "XCircle", props: { className: "h-5 w-5 text-red-600 mt-0.5" } },
                      {
                        type: "span",
                        children: [
                          { type: "strong", children: ["Consumption focused"] },
                          " - For lifestyle expenses"
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: {
                  className: "mt-6 p-4 bg-red-50 rounded-lg border border-red-200"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-red-700 mb-2" },
                    children: ["Examples of Bad Debt:"]
                  },
                  {
                    type: "ul",
                    props: { className: "space-y-1 text-sm list-disc pl-4" },
                    children: [
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Credit card debt"] },
                          " - Especially for non-essentials"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Payday loans"] },
                          " - Extremely high interest rates"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Car loans for luxury vehicles"] },
                          " - Cars depreciate rapidly"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Store credit cards"] },
                          " - High rates, limited benefits"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Personal loans for holidays"] },
                          " - No lasting value"
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
      * THE GRAY AREA
      * ============================================================ */
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
                  { type: "AlertTriangle", props: { className: "h-6 w-6 text-yellow-600" } },
                  "The Gray Area"
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
                  "Some debt falls between good and bad - it depends on your situation:"
                ]
              },

              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["Car Loans"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground mb-2" },
                        children: ["Could be good if:"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          { type: "li", children: ["Needed for work/income"] },
                          { type: "li", children: ["Reliable, fuel-efficient vehicle"] },
                          { type: "li", children: ["Low interest rate"] }
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
                        children: ["Home Equity Loans"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground mb-2" },
                        children: ["Could be good if:"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          { type: "li", children: ["Used for home improvements"] },
                          { type: "li", children: ["Consolidating high-interest debt"] },
                          { type: "li", children: ["Investment in education"] }
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
      * YOUR DEBT STRATEGY
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [{ type: "CardTitle", children: ["Your Debt Strategy"] }]
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
                    props: { className: "p-4 bg-primary/5 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-primary mb-2" },
                        children: ["1. Pay off bad debt first"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Focus on high-interest debt like credit cards before investing."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-primary/5 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-primary mb-2" },
                        children: ["2. Consider good debt carefully"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Even good debt should fit your budget and financial goals."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-primary/5 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-primary mb-2" },
                        children: ["3. Have an emergency fund"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Avoid taking on bad debt for unexpected expenses."
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
    ],

    /* ============================================================
    * QUIZ (from quiz[] in the React component)
    * ============================================================ */
    quiz: {
      passingScore: 0, 
      questions: [
        {
          question: "Which of these is typically considered 'good debt'?",
          options: [
            "Credit card debt for holidays",
            "Student loan for education",
            "Payday loan",
            "Car loan for luxury vehicle"
          ],
          correctAnswer: 1
        },
        {
          question: "What makes debt 'good'?",
          options: [
            "High interest rates",
            "Helps build wealth over time",
            "Easy to get",
            "No repayment needed"
          ],
          correctAnswer: 1
        },
        {
          question: "Which debt should you prioritize paying off first?",
          options: [
            "Mortgage",
            "Student loan",
            "Credit card debt",
            "Investment loan"
          ],
          correctAnswer: 2
        },
        {
          question: "What's a key characteristic of bad debt?",
          options: [
            "Low interest rates",
            "Tax deductible",
            "High interest rates with no wealth building",
            "Secured by assets"
          ],
          correctAnswer: 2
        },
        {
          question: "Why might a mortgage be considered good debt?",
          options: [
            "Property can appreciate in value",
            "Interest rates are always low",
            "No down payment required",
            "Never needs to be repaid"
          ],
          correctAnswer: 0
        }
      ]
    },

    relatedLessons: [
      {
        moduleId: "student-loans",
        title: "Student Loans Explained",
        relationship: "next-step"
      },
      {
        moduleId: "get-out-debt",
        title: "How to Get Out of Debt",
        relationship: "related"
      }
    ],
    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 1,
    createdBy: "system"
  },

  {
    title: "Student Loans Explained",
    description: "Everything you need to know about your student loan",
    categoryId: "borrowing-debt",
    topic: "student-loans",

    visual: {
      icon: "GraduationCap",
      iconColor: "bg-green-600",
      readTime: 4
    },

    uiTree: [
      /* ============================================================
      * HERO SECTION
      * ============================================================ */
      {
        type: "Card",
        props: { className: "bg-green-600 text-white mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl flex items-center gap-3" },
                children: [
                  {type: "GraduationCap", props: {className: "h-9 w-9 text-white"}},
                  "Student Loans Explained"
                ]
              },
              {
                type: "CardDescription",
                props: { className: "text-white text-semibold text-lg" },
                children: ["Everything you need to know about your student loan"]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * WHAT IS A STUDENT LOAN?
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["What is a Student Loan?"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "A student loan helps you pay for university tuition fees and living costs. Unlike other loans, student loans have special terms that make them more manageable."
                ]
              },

              /* Tuition & Maintenance Loan Boxes */
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg border border-green-200" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-700 mb-2" }, children: ["Tuition Fee Loan"] },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          { type: "li", children: ["• Pays your university directly"] },
                          { type: "li", children: ["• Up to £9,250 per year in England"] },
                          { type: "li", children: ["• Available to all eligible students"] },
                          { type: "li", children: ["• Not means-tested"] }
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg border border-green-200" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-700 mb-2" }, children: ["Maintenance Loan"] },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          { type: "li", children: ["• Helps with living costs"] },
                          { type: "li", children: ["• Amount depends on family income"] },
                          { type: "li", children: ["• Higher if living away from home"] },
                          { type: "li", children: ["• Extra for studying in London"] }
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
      * HOW MUCH CAN YOU BORROW?
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", props: { className: "flex items-center gap-2" }, children: [
                {type: "Calculator", props: {className: "h-6 w-6 "}},
                "How Much Can You Borrow?"
              ] }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              /* Loan Amount Box */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-bold mb-2" }, children: ["Maintenance Loan Amounts (2024/25)"] },
                  {
                    type: "div",
                    props: { className: "grid grid-cols-3 gap-4 text-sm" },
                    children: [
                      { type: "div", children: [{ type: "span", props: { className: "font-bold" }, children: ["Living at home:"] }, { type: "p" }, "Up to £8,610"] },
                      { type: "div", children: [{ type: "span", props: { className: "font-bold" }, children: ["Away from home:"] }, { type: "p" }, "Up to £10,227"] },
                      { type: "div", children: [{ type: "span", props: { className: "font-bold" }, children: ["London students:"] }, { type: "p" }, "Up to £13,348"] }
                    ]
                  }
                ]
              },

              /* Important Note (yellow box) */
              {
                type: "div",
                props: {
                  className: "p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                },
                children: [
                  { type: "h4", props: { className: "font-semibold text-yellow-700 mb-2" }, children: ["Important Note"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "The maintenance loan amount depends on your family's household income. Higher family income = lower loan amount. But everyone gets at least the minimum amount (around £3,790)."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * REPAYMENT SECTION
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["When Do You Pay It Back?"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              /* Repayment Threshold — green box */
              {
                type: "div",
                props: { className: "p-4 bg-green-50 border border-green-200 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-green-700 mb-2" }, children: ["Repayment Threshold"] },
                  {
                    type: "p",
                    props: { className: "text-sm mb-2" },
                    children: ["You only start repaying when you earn over £27,295 per year (£2,274 per month)."]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      { type: "strong", children: ["Example:"] },
                      " If you earn £30,000 per year, you'll pay 9% of the amount above £27,295. That's 9% of £2,705 = £243 per year (£20 per month)."
                    ]
                  }
                ]
              },

              /* How it's collected + self-employed */
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* How it's collected */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["How It's Collected"] },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          { type: "li", children: ["• Automatically through PAYE"] },
                          { type: "li", children: ["• Taken from your salary like tax"] },
                          { type: "li", children: ["• No need to manage payments yourself"] }
                        ]
                      }
                    ]
                  },

                  /* Self-employed */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["If You're Self-Employed"] },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          { type: "li", children: ["• Pay through Self Assessment"] },
                          { type: "li", children: ["• Based on your annual profit"] },
                          { type: "li", children: ["• Same 9% rate applies"] }
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
      * INTEREST & WRITE-OFF
      * ============================================================ */
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
                  {type: "AlertTriangle", props: {className: "h-7 w-7 text-yellow-700"}},
                  "Interest and Write-Off"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              /* Interest (yellow) */
              {
                type: "div",
                props: { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-yellow-700 mb-2" }, children: [
                    "Interest Rates"
                  ] },
                  {
                    type: "p",
                    props: { className: "text-sm mb-2" },
                    children: [
                      "Interest is charged at the Retail Price Index (RPI) rate. This is usually around 1–7% depending on inflation."
                    ]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      { type: "span", props: { className: "font-semibold" }, children: ["While studying:"] },
                      " RPI + 3%",
                      { type: "p" },
                      { type: "span", props: { className: "font-semibold" }, children: ["After graduation:"] },
                      " RPI to RPI + 3% (based on income)"
                    ]
                  }
                ]
              },

              /* Write-Off (green) */
              {
                type: "div",
                props: { className: "p-4 bg-green-50 border border-green-200 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-green-700 mb-2" }, children: ["30-Year Write-Off"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Any remaining debt is completely written off 30 years after you first became eligible to repay. This means many people won't pay back the full amount."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * MYTHS DEBUNKED
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Common Myths Debunked"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["❌ \"It affects your credit score\""] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: ["Student loans don't appear on your credit file and don't affect your credit score."]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["❌ \"You must pay it all back\""] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "Most people won't repay the full amount due to the 30-year write-off."
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["❌ \"It's like normal debt\""] },
                  {
                    type: "p",
                    props: { className: "text-sm text-muted-foreground" },
                    children: [
                      "It's more like a graduate tax – you only pay when you can afford it."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

    ],

    /* ============================================================
    * QUIZ (converted exactly from your React structure)
    * ============================================================ */
    quiz: {
      passingScore: 0,
      questions: [
        {
          id: "sl-q1",
          type: "multiple-choice",
          question: "When do you typically start repaying student loans?",
          options: [
            "Immediately after taking the loan",
            "As soon as you start university",
            "After graduation when earning £27,295+",
            "Only if you get a job"
          ],
          correctAnswer: 2,
          explanation:
            "You only start repaying when your income passes the repayment threshold (£27,295)."
        },
        {
          id: "sl-q2",
          type: "multiple-choice",
          question: "What happens to student loan debt after 30 years?",
          options: [
            "Interest keeps growing",
            "You must pay it all back",
            "Any remaining debt is written off",
            "It transfers to your children"
          ],
          correctAnswer: 2,
          explanation:
            "Under current rules, any remaining balance is written off after 30 years."
        },
        {
          id: "sl-q3",
          type: "multiple-choice",
          question: "How much is the current tuition fee cap in England?",
          options: [
            "£6,000 per year",
            "£9,250 per year",
            "£12,000 per year",
            "£15,000 per year"
          ],
          correctAnswer: 1,
          explanation:
            "The tuition fee cap is currently £9,250 per year for UK students in England."
        },
        {
          id: "sl-q4",
          type: "multiple-choice",
          question: "What affects how much maintenance loan you get?",
          options: [
            "Your grades",
            "Your family's income",
            "Your university choice",
            "Your course type"
          ],
          correctAnswer: 1,
          explanation:
            "Maintenance loan amounts scale based on your household income."
        },
        {
          id: "sl-q5",
          type: "multiple-choice",
          question: "What's the interest rate on student loans?",
          options: [
            "0% (no interest)",
            "Fixed at 3%",
            "Linked to inflation (RPI)",
            "Same as credit cards"
          ],
          correctAnswer: 2,
          explanation:
            "Student loan interest is tied to the Retail Price Index (RPI)."
        }
      ]
    },

    relatedLessons: [
      {
        moduleId: "credit-cards-interest",
        title: "Credit Cards & Interest Rates",
        relationship: "next-step"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      }
    ],
    points: 100,
    difficultyLevel: "intermediate",
    timeEstimate: 4,
    order: 3,
    createdBy: "system"
  },

  {
    title: "Credit Cards & Interest Rates",
    topic: "credit-cards-interest",
    description: "How credit card interest works and how to avoid paying it",
    categoryId: "borrowing-debt",

    visual: {
      icon: "CreditCard",
      iconColor: "green",
      readTime: 5
    },

    difficultyLevel: "beginner",
    timeEstimate: 5,
    createdBy: "system",
    order: 1,
    isActive: true,

    uiTree: [
      /* ============================================================
      * 1) HEADER CARD — EXACT GREEN GRADIENT
      * ============================================================ */
      {
        type: "Card",
        props: {
          className: "bg-gradient-to-r from-green-600 to-green-500 text-white mb-5"
        },
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "text-3xl flex items-center gap-3" },
                children: [
                  { type: "CreditCard", props: { className: "h-8 w-8 text-white" } },
                  "Credit Cards & Interest Rates"
                ]
              },
              {
                type: "CardDescription",
                props: { className: "text-white/80 text-lg" },
                children: ["How credit card interest works and how to avoid paying it"]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * 2) The Good News: Grace Periods
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["The Good News: Grace Periods"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "Here's what many people don't know: ",
                  { type: "strong", children: ["you don't pay interest if you pay your full balance on time!"] }
                ]
              },

              /* Green box */
              {
                type: "div",
                props: { className: "p-4 bg-green-100 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-green-700 mb-2" }, children: ["Grace Period Explained"] },
                  {
                    type: "ul",
                    props: { className: "text-sm space-y-1 list-disc pl-4" },
                    children: [
                      { type: "li", children: ["Most cards give you 21–25 days from your statement date"] },
                      { type: "li", children: ["Pay the full balance = no interest charges"] },
                      { type: "li", children: ["This makes credit cards like an interest-free loan"] },
                      { type: "li", children: ["Grace period only applies to purchases, not cash advances"] }
                    ]
                  }
                ]
              },

              /* Timeline box */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Example Timeline:"] },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      { type: "p", children: [{ type: "strong", children: ["March 1"] }, ": You buy something for £100"] },
                      { type: "p", children: [{ type: "strong", children: ["March 31"] }, ": Statement generated"] },
                      { type: "p", children: [{ type: "strong", children: ["April 25"] }, ": Payment due date"] },
                      { type: "p", children: [{ type: "strong", children: ["Result"] }, ": Pay £100 by April 25 = no interest!"] },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * 3) When Interest Kicks In
      * ============================================================ */
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
                  { type: "AlertTriangle", props: { className: "h-6 w-6 text-yellow-600" } },
                  "When Interest Kicks In"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              { type: "p", props: { className: "text-lg" }, children: ["Interest starts accumulating when you don't pay the full balance by the due date."] },

              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* Red box */
                  {
                    type: "div",
                    props: { className: "p-4 bg-red-100 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-red-700 mb-2" }, children: ["What Triggers Interest"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-sm space-y-1" },
                        children: [
                          { type: "li", children: ["Paying less than the full balance"] },
                          { type: "li", children: ["Missing the payment due date"] },
                          { type: "li", children: ["Cash advances (immediate interest)"] },
                          { type: "li", children: ["Balance transfers (unless 0% offer)"] }
                        ]
                      }
                    ]
                  },

                  /* Yellow box */
                  {
                    type: "div",
                    props: { className: "p-4 bg-yellow-100 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-yellow-700 mb-2" }, children: ["Loss of Grace Period"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-sm space-y-1" },
                        children: [
                          { type: "li", children: ["Once you carry a balance, new purchases earn interest immediately"] },
                          { type: "li", children: ["Grace period returns only after paying full balance"] },
                          { type: "li", children: ["This is why debt can snowball quickly"] }
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
      * 4) How Interest is Calculated
      * ============================================================ */
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
                  { type: "Calculator", props: { className: "h-6 w-6" } },
                  "How Interest is Calculated"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              /* APR vs Daily Rate */
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-primary mb-2" }, children: ["APR vs Daily Rate"] },
                  { type: "p", props: { className: "text-sm mb-2" }, children: ["Credit cards show APR, but interest is calculated daily."] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: ["Example: 24% APR = 24% ÷ 365 = 0.066% per day"]
                  }
                ]
              },

              /* Real example */
              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Real Example Calculation"] },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      { type: "p", children: [{ type: "strong", children: ["Balance"] }, ": £1,000"] },
                      { type: "p", children: [{ type: "strong", children: ["APR"] }, ": 24%"] },
                      { type: "p", children: [{ type: "strong", children: ["Daily rate"] }, ": 0.066%"] },
                      { type: "p", children: [{ type: "strong", children: ["Daily interest"] }, ": £0.66"] },
                      { type: "p", children: [{ type: "strong", children: ["Monthly interest"] }, ": £19.80"] },
                    ]
                  }
                ]
              },

              /* Minimum Payment Trap */
              {
                type: "div",
                props: { className: "p-4 bg-red-100 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-red-700 mb-2" }, children: ["The Minimum Payment Trap"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Paying only the minimum means most of your payment goes to interest, not reducing the debt. ",
                      "A £1,000 balance could take 15+ years to pay off!"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * 5) Smart Strategies
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Smart Credit Card Strategies"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* DO */
                  {
                    type: "div",
                    props: { className: "space-y-3" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-600" }, children: ["✅ DO"] },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-2" },
                        children: [
                          {
                          type: "li",
                          children: [
                            { type: "div", props: { className: "w-2 h-2 bg-green-600 rounded-full inline-block mr-2" } },
                              "Pay the full balance every month"
                          ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "div", props: { className: "w-2 h-2 bg-green-600 rounded-full inline-block mr-2" } },
                              "Set up automatic payments"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "div", props: { className: "w-2 h-2 bg-green-600 rounded-full inline-block mr-2" } },
                              "Check statements regularly"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "div", props: { className: "w-2 h-2 bg-green-600 rounded-full inline-block mr-2" } },
                              "Use for planned purchases only"
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* DON'T */
                  {
                    type: "div",
                    props: { className: "space-y-3" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-red-600" }, children: ["❌ DON'T"] },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-2" },
                        children: [
                          {
                          type: "li",
                          children: [
                            { type: "div", props: { className: "w-2 h-2 bg-red-600 rounded-full inline-block mr-2" } },
                              "Use credit for things you can't afford"
                          ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "div", props: { className: "w-2 h-2 bg-red-600 rounded-full inline-block mr-2" } },
                              "Take cash advances (high fees + immediate interest)"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "div", props: { className: "w-2 h-2 bg-red-600 rounded-full inline-block mr-2" } },
                              "Max out your limit"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "div", props: { className: "w-2 h-2 bg-red-600 rounded-full inline-block mr-2" } },
                              "Pay only the minimum"
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
      * 6) If You're Already in Debt
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["If You're Already in Debt"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-primary mb-2" }, children: ["1. Stop using the card"] },
                  { type: "p", props: { className: "text-sm" }, children: ["Avoid adding to the debt while paying it off."] }
                ]
              },
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-primary mb-2" }, children: ["2. Pay more than the minimum"] },
                  { type: "p", props: { className: "text-sm" }, children: ["Even an extra £20/month cuts years off repayment time."] }
                ]
              },
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-primary mb-2" }, children: ["3. Consider a 0% balance transfer"] },
                  { type: "p", props: { className: "text-sm" }, children: ["Some cards offer 0% for 18–24 months."] }
                ]
              },
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-primary mb-2" }, children: ["4. Create a debt payment plan"] },
                  { type: "p", props: { className: "text-sm" }, children: ["Use avalanche or snowball method."] }
                ]
              }
            ]
          }
        ]
      }
    ],

    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "When do you pay interest on credit card purchases?",
          options: [
            "Immediately when you buy something",
            "Only if you don't pay the full balance",
            "Always, no matter what",
            "Only after 6 months"
          ],
          correctAnswer: 1,
          explanation: "You only pay interest if you carry a balance beyond the due date."
        },
        {
          question: "What's a typical credit card interest rate (APR)?",
          options: ["1–3%", "5–10%", "18–25%", "50%+"],
          correctAnswer: 2,
          explanation: "Most UK credit cards range between 18–25% APR."
        },
        {
          question: "If you only pay the minimum amount, what happens?",
          options: [
            "You avoid all interest",
            "Interest charges on remaining balance",
            "Your credit limit increases",
            "Nothing happens"
          ],
          correctAnswer: 1,
          explanation: "Minimum payments barely reduce balance, so interest continues."
        },
        {
          question: "What's the grace period on most credit cards?",
          options: ["7 days", "30 days", "21–25 days", "60 days"],
          correctAnswer: 2,
          explanation: "Most issuers provide 21–25 days after the statement date."
        },
        {
          question: "How is credit card interest typically calculated?",
          options: ["Once per year", "Monthly", "Daily", "Only when you miss payments"],
          correctAnswer: 2,
          explanation: "Interest accrues daily based on APR/365."
        }
      ]
    },

    relatedLessons: [
      { 
        moduleId: "get-out-debt",
        title: "How to Get Out of Debt", 
        relationship: "next-step"
      },
      { 
        moduleId: "credit-scores",
        title: "Understanding Credit Scores", 
        relationship: "related"
      },
    ]
  },

  {
    title: "How to Get Out of Debt",
    description: "Strategies for becoming debt-free and staying that way",
    categoryId: "borrowing-debt",
    topic: "get-out-debt",

    visual: {
      icon: "TrendingDown",
      iconColor: "bg-green-600",
      readTime: 6
    },

    uiTree: [
      /* ============================================================
      * HERO CARD — EXACT GREEN GRADIENT
      * ============================================================ */
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
                  { type: "TrendingDown", props: { className: "h-8 w-8 text-white" } },
                  "How to Get Out of Debt"
                ]
              },
              {
                type: "CardDescription",
                props: { className: "text-white/90 text-lg" },
                children: [
                  "Strategies for becoming debt-free and staying that way"
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * STEP 1: FACE THE REALITY
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [{ type: "CardTitle", children: ["Step 1: Face the Reality"] }]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "The first step is often the hardest — admitting you have a debt problem and taking stock of the situation."
                ]
              },

              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-primary mb-3" },
                    children: ["Create Your Debt List"]
                  },

                  {
                    type: "div",
                    props: { className: "grid grid-cols-2 gap-4 text-sm" },
                    children: [
                      {
                        type: "div",
                        children: [
                          { type: "strong", children: ["For each debt, write down:"] },
                          {
                            type: "ul",
                            props: { className: "mt-2 space-y-1 list-disc pl-4" },
                            children: [
                              {type: "li", children: ["Creditor name",]},
                              {type: "li", children: ["Total balance owed",]},
                              {type: "li", children: ["Interest rate (APR)",]},
                              {type: "li", children: ["Minimum monthly payment",]},
                              {type: "li", children: ["Due date"]},
                            ]
                          }
                        ]
                      },

                      {
                        type: "div",
                        children: [
                          { type: "strong", children: ["Example format:"] },
                          {
                            type: "div",
                            props: {
                              className:
                                "mt-2 text-xs bg-white p-2 rounded border"
                            },
                            children: [
                              {type: "p", children:["Credit Card A: £2,500",]},
                              {type: "p", children:["Rate: 24% APR",]},
                              {type: "p", children:["Min payment: £75",]},
                              {type: "p", children:["Due: 15th each month"]},
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
      * STEP 2: STOP ADDING TO THE DEBT
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Step 2: Stop Adding to the Debt"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "p-4 bg-yellow-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-yellow-600 mb-2" },
                    children: ["Cut Off the Credit Flow"]
                  },
                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      {type: "li", children: ["Remove credit cards from your wallet",]},
                      {type: "li", children: ["Delete saved payment methods from online stores",]},
                      {type: "li", children: ["Switch to cash or debit cards only",]},
                      {type: "li", children: ["Avoid Buy Now, Pay Later services"]},
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Emergency Fund Dilemma"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "While paying off debt, keep a small emergency fund (£500–£1,000). This prevents you from going deeper into debt when unexpected expenses arise."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * STEP 3: CHOOSE YOUR REPAYMENT STRATEGY
      * ============================================================ */
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
                  { type: "Calculator", props: { className: "h-6 w-6" } },
                  "Step 3: Choose Your Repayment Strategy"
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
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-600 mb-2" },
                        children: ["🏔️ Avalanche Method"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          {type: "li", children: ["Pay highest-interest debt first",]},
                          {type: "li", children: ["Saves the most money long-term",]},
                          {type: "li", children: ["May feel slow at first",]},
                          {type: "li", children: ["Best for disciplined people"]},
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
                        props: { className: "font-semibold text-green-600 mb-2" },
                        children: ["⛄ Snowball Method"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-1" },
                        children: [
                          {type: "li", children: ["Pay smallest balance first",]},
                          {type: "li", children: ["Quick wins boost motivation",]},
                          {type: "li", children: ["Costs slightly more in interest",]},
                          {type: "li", children: ["Great for psychological momentum"]},
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "p-4 border rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Example Comparison"] },
                  {
                    type: "div",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      {type: "strong", children: ["Your debts:"]},
                      {
                        type: "div",
                        props: { className: "text-sm space-y-1 list-disc pl-4" },
                        children: [
                          {type: "li", children: ["Card A: £500 at 18% (Snowball target)",]},
                          {type: "li", children: ["Card B: £2,000 at 24% (Avalanche target)",]},
                          {type: "li", children: ["Loan: £3,000 at 8%",]},
                          
                        ]
                      },
                      {
                        type: "span",
                        props: { className: "text-muted-foreground block mt-1" },
                        children: ["Both methods: pay minimums on all, extra money to your chosen target"]
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
      * STEP 4: FIND EXTRA MONEY
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          {
            type: "CardHeader",
            children: [{ type: "CardTitle", children: ["Step 4: Find Extra Money to Pay"] }]
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
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-600" }, children: ["💰 Increase Income"] },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-2" },
                        children: [
                          {type: "li", children: ["Pick up extra shifts",]},
                          {type: "li", children: ["Freelance work",]},
                          {type: "li", children: ["Sell items you don’t need",]},
                          {type: "li", children: ["Part-time side job",]},
                          {type: "li", children: ["Cashback and savings apps"]},
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    children: [
                      { type: "h4", props: { className: "font-semibold text-yellow-600" }, children: ["✂️ Cut Expenses"] },
                      {
                        type: "ul",
                        props: { className: "text-sm list-disc pl-4 space-y-2" },
                        children: [
                          {type: "li", children: ["Cancel unused subscriptions",]},
                          {type: "li", children: ["Cook more meals at home",]},
                          {type: "li", children: ["Find cheaper insurance/phone deals",]},
                          {type: "li", children: ["Use public transport",]},
                          {type: "li", children: ["Shop at discount stores"]},
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
      * STEP 5: CONSOLIDATION
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Step 5: Consider Debt Consolidation"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "p",
                props: { className: "text-lg" },
                children: [
                  "Consolidation can simplify payments and potentially reduce interest rates."
                ]
              },

              /* Balance Transfer */
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-primary mb-2" },
                    children: ["Balance Transfer Credit Card"]
                  },
                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      {type: "li", children: ["0% interest for 18–24 months",]},
                      {type: "li", children: ["3–5% transfer fee",]},
                      {type: "li", children: ["Must pay off before rate increases",]},
                      {type: "li", children: ["Best for credit card debt"]},
                    ]
                  }
                ]
              },

              /* Personal Loan */
              {
                type: "div",
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-primary mb-2" },
                    children: ["Personal Loan"]
                  },
                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      {type: "li", children: ["Fixed rate and payment",]},
                      {type: "li", children: ["Usually lower than credit cards",]},
                      {type: "li", children: ["Clear end date",]},
                      {type: "li", children: ["Good for multiple high-interest debts"]},
                    ]
                  }
                ]
              },

              /* Warning */
              {
                type: "div",
                props: { className: "p-4 bg-yellow-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-yellow-600 mb-2" },
                    children: ["⚠️ Consolidation Warning"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Consolidation only works if you avoid creating new debt afterwards. Many people consolidate but then run up their cards again."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * WHEN YOU’RE REALLY STRUGGLING
      * ============================================================ */
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
                  { type: "AlertTriangle", props: { className: "h-6 w-6 text-yellow-600" } },
                  "When You're Really Struggling"
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
                props: { className: "p-4 bg-primary/5 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-primary mb-2" },
                    children: ["Contact Your Creditors"]
                  },

                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      {type: "li", children: ["Temporary reduced payments",]},
                      {type: "li", children: ["Payment holidays",]},
                      {type: "li", children: ["Lower interest rates",]},
                      {type: "li", children: ["Longer repayment plans"]},
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
                    props: { className: "font-semibold text-green-600 mb-2" },
                    children: ["Free Debt Advice"]
                  },

                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      {type: "li", children: ["Citizens Advice Bureau",]},
                      {type: "li", children: ["StepChange Debt Charity",]},
                      {type: "li", children: ["National Debtline",]},
                      {type: "li", children: ["Christians Against Poverty"]},
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * STAYING DEBT-FREE
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mb-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Staying Debt-Free"] }] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [
              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-600 mb-2" },
                    children: ["1. Build an emergency fund"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: ["Save 3–6 months of expenses to avoid future debt."]
                  }
                ]
              },
              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-600 mb-2" },
                    children: ["2. Use credit responsibly"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: ["If using credit cards, pay the balance in full monthly."]
                  }
                ]
              },
              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-600 mb-2" },
                    children: ["3. Live below your means"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: ["Spend less than you earn and save the difference."]
                  }
                ]
              },
              {
                type: "div",
                props: { className: "p-4 bg-green-50 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold text-green-600 mb-2" },
                    children: ["4. Plan for large purchases"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: ["Save up for big expenses rather than financing them."]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    /* ============================================================
    * QUIZ — matches your structure
    * ============================================================ */
    quiz: {
      passingScore: 3,
      questions: [
        {
          question: "What's the first step to getting out of debt?",
          options: [
            "Start paying everything off immediately",
            "List all your debts and interest rates",
            "Cut up all credit cards",
            "Borrow money to pay off debt"
          ],
          correctAnswer: 1
        },
        {
          question: "Which debt repayment strategy pays off the highest-interest debt first?",
          options: [
            "Snowball method",
            "Avalanche method",
            "Minimum payment method",
            "Random method"
          ],
          correctAnswer: 1
        },
        {
          question: "What should you do while paying off debt?",
          options: [
            "Stop saving completely",
            "Keep a small emergency fund",
            "Take on more debt for emergencies",
            "Ignore your budget"
          ],
          correctAnswer: 1
        },
        {
          question: "If you're struggling with debt payments, what should you do?",
          options: [
            "Ignore the problem",
            "Take out more loans",
            "Contact your creditors to discuss options",
            "Move to another country"
          ],
          correctAnswer: 2
        },
        {
          question: "What's debt consolidation?",
          options: [
            "Ignoring all your debts",
            "Combining multiple debts into one payment",
            "Paying only minimum amounts",
            "Declaring bankruptcy"
          ],
          correctAnswer: 1
        }
      ]
    },

    /* ============================================================
    * RELATED LESSONS — consistent with your system
    * ============================================================ */
    relatedLessons: [
      {
        moduleId: "credit-cards-interest",
        title: "Credit Cards & Interest Rates",
        relationship: "related"
      },
      {
        moduleId: "good-vs-bad-debt",
        title: "Good Debt vs Bad Debt",
        relationship: "related"
      }
    ],

    points: 120,
    difficultyLevel: "beginner",
    timeEstimate: 6,
    order: 2,
    createdBy: "system"
  }

];

// =====================================================
// Seed Function
// =====================================================
async function seedBorrowingDebt() {
  try {
    for (const module of borrowingDebtModules) {
      await LearningModule.findOneAndUpdate(
              { topic: module.topic },
              module,
              { upsert: true, new: true }
            );
      
      console.log(`🔄 Upserted module: ${module.title}`);
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
