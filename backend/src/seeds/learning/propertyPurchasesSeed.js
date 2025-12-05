// backend/src/seeds/learning/propertyPurchasesSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Property & Big Purchases — Learning Modules
 * Category ID: property-purchases
 *
 * Includes:
 * 1. Renting vs Buying
 * 2. Understanding Mortgages
 * 3. Saving for a Deposit
 * 4. Hidden Costs of Property
 * 5. How House Prices Work
 */

const propertyPurchasesModules = [
  /* ================================================================
     1. RENTING VS BUYING
  ================================================================= */
  {
    title: "Renting vs Buying Property",
    description: "Understanding the trade-offs",
    categoryId: "property-purchases",
    topic: "renting-vs-buying",

    visual: {
      icon: "Home",
      iconColor: "bg-indigo-500",
      readTime: 3
    },

    uiTree: [

      /* ----------------------------------------------------
      * THE BIG DECISION
      * ---------------------------------------------------- */
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
                  { type: "Scale", props: { className: "h-5 w-5" } },
                  "The Big Decision"
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
                  "Choosing between renting and buying is one of the biggest financial decisions you'll make. Both have advantages and disadvantages, and the right choice depends on your personal situation, goals, and local market conditions."
                ]
              },

              /* Info banner */
              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Key Insight:"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "There's no universally \"right\" answer. The best choice depends on your lifestyle, finances, and how long you plan to stay in one place."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * RENTING — PROS AND CONS
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [

          { 
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: ["Renting: The Pros and Cons"] }
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

                  /* Renting Advantages */
                  {
                    type: "div",
                    props: {
                      className: "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold text-green-700 dark:text-green-400 mb-2"
                        },
                        children: ["✅ Advantages"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Flexibility:"] },
                              " Easier to move for work or life changes"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Lower upfront costs:"] },
                              " Just deposit and first month's rent"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["No maintenance costs:"] },
                              " Landlord handles repairs"
                            ]
                          },
                          { type: "li", children: ["Predictable monthly costs"] },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Access to amenities:"] },
                              " Gyms, pools in some rentals"
                            ]
                          },
                          { type: "li", children: [{ type: "strong", children: ["No property taxes or insurance to worry about"] },] }
                        ]
                      }
                    ]
                  },

                  /* Renting Disadvantages */
                  {
                    type: "div",
                    props: {
                      className: "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold text-red-700 dark:text-red-400 mb-2"
                        },
                        children: ["❌ Disadvantages"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["No equity building:"] },
                              " Monthly payments don't build ownership"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Rent increases:"] },
                              " Landlord can raise rent annually"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["No control:"] },
                              " Can't modify or renovate"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Potential displacement:"] },
                              " Landlord might sell"
                            ]
                          },
                          { type: "li", children: [{ type: "strong", children: ["No tax benefits"] },] },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Long-term:"] },
                              " Often more expensive"
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

      /* ----------------------------------------------------
      * BUYING — PROS AND CONS
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [

          { 
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: ["Buying: The Pros and Cons"] }
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

                  /* Buying Advantages */
                  {
                    type: "div",
                    props: {
                      className: "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold text-green-700 dark:text-green-400 mb-2"
                        },
                        children: ["✅ Advantages"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          //todo: make words before ":" bold and use li and replace with 
// • Build equity: Monthly payments increase your ownership
// • Stability: No landlord, no forced moves
// • Control: Renovate and modify as you wish
// • Potential appreciation: Property might increase in value
// • Tax benefits: Mortgage interest relief
// • Fixed payments: Mortgage stays the same (if fixed rate)
                          "• Build equity",
                          "• Stability & long-term security",
                          "• Renovation freedom",
                          "• Potential price appreciation",
                          "• Tax benefits",
                          "• Fixed mortgage payments"
                        ]
                      }
                    ]
                  },

                  /* Buying Disadvantages */
                  {
                    type: "div",
                    props: {
                      className: "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold text-red-700 dark:text-red-400 mb-2"
                        },
                        children: ["❌ Disadvantages"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          //todo: make words before ":" bold and use li and replace with 
// • High upfront costs: Deposit, fees, surveys
// • Maintenance costs: You pay for all repairs
// • Less flexibility: Harder to move quickly
// • Market risk: Property values can fall
// • Additional costs: Insurance, taxes, maintenance
// • Interest payments: Pay interest to the bank
                          "• High upfront costs",
                          "• Full maintenance responsibility",
                          "• Less flexibility",
                          "• Market downturn risk",
                          "• Extra costs: taxes, insurance, upkeep",
                          "• Interest payments"
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

      /* ----------------------------------------------------
      * FINANCIAL COMPARISON
      * ---------------------------------------------------- */
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
                  { type: "Calculator", props: { className: "h-5 w-5" } },
                  "Financial Comparison"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [

              /* Example block */
              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Example: £1,200/month budget"]
                  },

                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-2 gap-4 mt-3" },
                    children: [

                      /* Renting costs */
                      {
                        type: "div",
                        props: { className: "p-3 border rounded" },
                        children: [
                          { type: "h5", props: { className: "font-medium mb-2" }, children: ["Renting"] },
                          {
                            type: "ul",
                            props: { className: "text-sm space-y-1" },
                            children: [
                              "• Rent: £1,200/month",
                              "• Utilities: £150/month",
                              "• Total: £1,350/month",
                              "• Upfront: £2,400"
                            ]
                          }
                        ]
                      },

                      /* Buying costs */
                      {
                        type: "div",
                        props: { className: "p-3 border rounded" },
                        children: [
                          { type: "h5", props: { className: "font-medium mb-2" }, children: ["Buying (£250k house)"] },
                          {
                            type: "ul",
                            props: { className: "text-sm space-y-1" },
                            children: [
                              "• Mortgage: £1,100/month",
                              "• Insurance/taxes: £200/month",
                              "• Maintenance: £100/month",
                              "• Total: £1,400/month",
                              "• Upfront: £25,000+"
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* 5% rule */
              {
                type: "div",
                props: { className: "border-l-4 border-primary pl-4 bg-primary/5 p-4 rounded" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["The 5% Rule:"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "If annual rent is less than 5% of the property's price, renting may be better. Above 5%, buying may be better if staying 5+ years."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * DECISION FRAMEWORK
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [

          { type: "CardHeader", children: [ { type: "CardTitle", children: ["Decision Framework"] } ] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [

              {
                type: "div",
                props: { className: "space-y-4" },
                children: [

                  /* Buying conditions */
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-700 dark:text-green-400 mb-2" },
                        children: ["Consider Buying If:"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• You plan to stay 5+ years",
                          "• You have a 10–20% deposit",
                          "• Income is stable",
                          "• Want customization freedom",
                          "• Prices are reasonable",
                          "• Comfortable with maintenance"
                        ]
                      }
                    ]
                  },

                  /* Renting conditions */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 dark:text-blue-400 mb-2" },
                        children: ["Consider Renting If:"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• You might move within 3–5 years",
                          "• You don’t have a big deposit",
                          "• Income is uncertain",
                          "• You want flexibility",
                          "• Local prices are too high",
                          "• You prefer avoiding maintenance"
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

    quiz: { questions: [], passingScore: 0 },
    relatedLessons: [],
    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 1,
    createdBy: "system"
  },

  /* ================================================================
     2. MORTGAGES 101
  ================================================================= */
  {
    title: "Mortgages 101",
    description: "What they are, deposits, repayments",
    categoryId: "property-purchases",
    topic: "mortgages-101",

    visual: {
      icon: "Home",
      iconColor: "bg-indigo-500",
      readTime: 3
    },

    uiTree: [

      /* ----------------------------------------------------
      * WHAT IS A MORTGAGE?
      * ---------------------------------------------------- */
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
                  { type: "Home", props: { className: "h-5 w-5" } },
                  "What Is a Mortgage?"
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
                  "A mortgage is a loan specifically designed to help you buy property. The property itself serves as security for the loan — if you can't repay, the lender can take the property to recover their money."
                ]
              },

              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Simple Breakdown:"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      "• You want: A £200,000 house",
                      "• You have: £20,000 deposit (10%)",
                      "• Bank lends: £180,000 (90%)",
                      "• You pay back: £180,000 + interest over 25–30 years"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * KEY MORTGAGE TERMS
      * ---------------------------------------------------- */
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
                  { type: "Calculator", props: { className: "h-5 w-5" } },
                  "Key Mortgage Terms"
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
                props: { className: "grid gap-4" },

                children: [

                  /* Deposit */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Deposit"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "The upfront payment you make. First-time buyers typically need 5–10% minimum, but larger deposits (15–20%) get better interest rates."
                        ]
                      }
                    ]
                  },

                  /* LTV */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["LTV (Loan-to-Value)"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "The percentage of the property value you're borrowing. 90% LTV means you're borrowing 90%, so you need a 10% deposit."
                        ]
                      }
                    ]
                  },

                  /* Interest Rate */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Interest Rate"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "What the bank charges for lending you money. Can be fixed (stays the same) or variable (changes with market rates)."
                        ]
                      }
                    ]
                  },

                  /* Term */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Term"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "How long you take to repay (usually 25–30 years). Longer terms = lower monthly payments but more interest overall."
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

      /* ----------------------------------------------------
      * TYPES OF MORTGAGES
      * ---------------------------------------------------- */
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
                  "Types of Mortgages"
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
                props: { className: "space-y-4" },
                children: [

                  /* Fixed Rate */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-700 dark:text-green-400 mb-2" },
                        children: ["Fixed Rate"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm mb-2" },
                        children: ["Interest rate stays the same for a set period (2–10 years)."]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          "Pros: Predictable payments, protection from rate rises",
                          "Cons: Often higher initial rates, can't benefit from rate falls"
                        ]
                      }
                    ]
                  },

                  /* Variable Rate */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-blue-700 dark:text-blue-400 mb-2" },
                        children: ["Variable Rate"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm mb-2" },
                        children: ["Interest rate can change based on Bank of England base rate."]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          "Pros: Often lower initial rates, benefit from rate cuts",
                          "Cons: Payments can increase, harder to budget"
                        ]
                      }
                    ]
                  },

                  /* Shared Ownership / Help to Buy */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-purple-700 dark:text-purple-400 mb-2" },
                        children: ["Help to Buy / Shared Ownership"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm mb-2" },
                        children: ["Government schemes to help first-time buyers with smaller deposits."]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          "Help to Buy: Government loan for new builds",
                          "Shared Ownership: Buy a share (25–75%), rent the rest"
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

      /* ----------------------------------------------------
      * MORTGAGE APPLICATION PROCESS
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [

          { type: "CardHeader", children: [ { type: "CardTitle", children: ["Mortgage Application Process"] } ] },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [

              {
                type: "div",
                props: { className: "space-y-3" },
                children: [

                  /* Step 1 */
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                        },
                        children: ["1"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Check Your Credit Score"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Use free services like Experian or Credit Karma"]
                          }
                        ]
                      }
                    ]
                  },

                  /* Step 2 */
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                        },
                        children: ["2"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Save Your Deposit"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Plus extra for fees, surveys, and moving costs"]
                          }
                        ]
                      }
                    ]
                  },

                  /* Step 3 */
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                        },
                        children: ["3"]
                      },
                      {
                        type: "div",
                        children: [
                          {
                            type: "h4",
                            props: { className: "font-semibold" },
                            children: ["Get Agreement in Principle"]
                          },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Shows sellers you're a serious buyer"]
                          }
                        ]
                      }
                    ]
                  },

                  /* Step 4 */
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                        },
                        children: ["4"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Find a Property"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Within your budget, including all costs"]
                          }
                        ]
                      }
                    ]
                  },

                  /* Step 5 */
                  {
                    type: "div",
                    props: { className: "flex items-start gap-3 p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: {
                          className: "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                        },
                        children: ["5"]
                      },
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold" }, children: ["Full Mortgage Application"] },
                          {
                            type: "p",
                            props: { className: "text-sm text-muted-foreground" },
                            children: ["Provide payslips, bank statements, etc."]
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

      /* ----------------------------------------------------
      * HIDDEN COSTS
      * ---------------------------------------------------- */
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
                  { type: "AlertTriangle", props: { className: "h-5 w-5" } },
                  "Hidden Costs to Consider"
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
                props: {
                  className:
                    "bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-3" },
                    children: ["Additional Costs (Budget 3–5% of property value):"]
                  },

                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-2 gap-3 text-sm" },
                    children: [
                      {
                        type: "div",
                        children: [
                          "• Stamp Duty: Government tax on property purchases",
                          "• Survey: £400–£1,500 to check property condition",
                          "• Legal fees: £800–£2,000"
                        ]
                      },
                      {
                        type: "div",
                        children: [
                          "• Mortgage fees: £500–£2,000 arrangement fees",
                          "• Moving costs: £500–£2,000",
                          "• Buildings insurance: Required by lender"
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg border-l-4 border-primary" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Student Tip:"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Don't just save for the deposit — budget for all these extra costs too! Many first-time buyers are caught off guard by how much they add up."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    quiz: { questions: [], passingScore: 0 },
    relatedLessons: [],
    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 1,
    createdBy: "system"
  },

  /* ================================================================
     3. CAR FINANCE EXPLAINED
  ================================================================= */
  {
    title: "Car Finance Explained",
    description: "HP, PCP, leasing vs buying",
    categoryId: "property-purchases",
    topic: "car-finance",
    createdBy: "system",

    visual: {
      icon: "Car",
      iconColor: "bg-indigo-500",
      badge: "Beginner",
      readTime: 3
    },

    difficultyLevel: "beginner",
    timeEstimate: 5,
    points: 120,
    order: 3,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [
          /* --------------------------
            CARD 1: Overview
          -------------------------- */
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
                      { "type": "Car", "props": { "className": "h-5 w-5" } },
                      "Car Buying Options Overview"
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
                      "There are several ways to get a car, each with different costs, commitments, and benefits. Understanding these options helps you choose what's best for your situation and budget."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-accent/50 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Quick Overview:"]
                      },
                      {
                        "type": "ul",
                        "props": { "className": "text-sm space-y-1" },
                        "children": [
                          "• ",
                          { "type": "strong", "children": ["Buy outright:"] },
                          " Pay full price, own it immediately",
                          "• ",
                          { "type": "strong", "children": ["Hire Purchase (HP):"] },
                          " Monthly payments, own it at the end",
                          "• ",
                          { "type": "strong", "children": ["PCP:"] },
                          " Lower payments, flexible at the end",
                          "• ",
                          { "type": "strong", "children": ["Leasing:"] },
                          " Rent the car, return it at the end"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          /* --------------------------
            CARD 2: Hire Purchase
          -------------------------- */
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
                      { "type": "CreditCard", "props": { "className": "h-5 w-5" } },
                      "Hire Purchase (HP)"
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
                      "You pay a deposit, then fixed monthly payments. Once you've made all payments, you own the car. Simple and straightforward."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-green-700 dark:text-green-400 mb-2"
                            },
                            "children": ["✅ Pros"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• You will own the car",
                              "• Fixed monthly payments",
                              "• No mileage restrictions",
                              "• Can modify the car",
                              "• Simpler than PCP"
                            ]
                          }
                        ]
                      },
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-red-700 dark:text-red-400 mb-2"
                            },
                            "children": ["❌ Cons"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Higher monthly payments than PCP",
                              "• You're responsible for depreciation",
                              "• No flexibility at the end",
                              "• Car loses value quickly"
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-accent/50 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Example:"]
                      },
                      {
                        "type": "p",
                        "props": { "className": "text-sm" },
                        "children": [
                          "£15,000 car, £3,000 deposit, 4 years = £300/month. After 4 years, you own a car worth maybe £6,000."
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          /* --------------------------
            CARD 3: PCP
          -------------------------- */
          {
            "type": "Card",
            "children": [
              {
                "type": "CardHeader",
                "children": [{ "type": "CardTitle", "children": ["Personal Contract Purchase (PCP)"] }]
              },
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "p",
                    "children": [
                      "Lower monthly payments because you're only paying for the car's depreciation, not its full value. At the end, you choose what to do."
                    ]
                  },
                  {
                    "type": "div",
                    "props": {
                      "className": "p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20"
                    },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["How PCP Works:"]
                      },
                      {
                        "type": "ol",
                        "props": { "className": "text-sm space-y-1 list-decimal list-inside" },
                        "children": [
                          "Pay a deposit (usually 10% of car value)",
                          "Make lower monthly payments for 2-4 years",
                          "At the end, choose one of three options:"
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "mt-2 ml-4 space-y-1 text-sm" },
                        "children": [
                          "• Return — give the car back, walk away",
                          "• Buy — pay balloon payment to own it",
                          "• Exchange — trade for new PCP deal"
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
                        "props": {
                          "className":
                            "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-green-700 dark:text-green-400 mb-2"
                            },
                            "children": ["✅ Pros"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Lower monthly payments",
                              "• Flexibility at the end",
                              "• Always driving newer cars",
                              "• Warranty usually covers repairs",
                              "• Fixed future value"
                            ]
                          }
                        ]
                      },
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-red-700 dark:text-red-400 mb-2"
                            },
                            "children": ["❌ Cons"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Mileage restrictions",
                              "• Charges for damage/wear",
                              "• Expensive if keeping car",
                              "• Never-ending payments",
                              "• More complex terms"
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

          /* --------------------------
            CARD 4: Leasing
          -------------------------- */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Leasing"] }] },
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "p",
                    "children": [
                      "Like renting a car for 2-4 years. You never own it, just use it. Popular with businesses and increasingly common personally."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-4" },
                    "children": [
                      /* Pros */
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-green-700 dark:text-green-400 mb-2"
                            },
                            "children": ["✅ Pros"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Lowest monthly payments",
                              "• Always driving new cars",
                              "• Warranty covers everything",
                              "• No depreciation worries",
                              "• Predictable costs"
                            ]
                          }
                        ]
                      },
                      /* Cons */
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-red-700 dark:text-red-400 mb-2"
                            },
                            "children": ["❌ Cons"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• You never own anything",
                              "• Strict mileage limits",
                              "• Expensive early termination",
                              "• Perpetual monthly payments",
                              "• No modifications allowed"
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

          /* --------------------------
            CARD 5: Buying Outright
          -------------------------- */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Buying Outright"] }] },
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "p",
                    "children": [
                      "Pay full price upfront (cash or bank loan). You own the car immediately with no monthly payments or restrictions."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-4" },
                    "children": [
                      /* Pros */
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-green-700 dark:text-green-400 mb-2"
                            },
                            "children": ["✅ Pros"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• No monthly payments",
                              "• Complete ownership",
                              "• No interest charges",
                              "• Freedom to sell anytime",
                              "• No mileage restrictions"
                            ]
                          }
                        ]
                      },
                      /* Cons */
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className":
                                "font-semibold text-red-700 dark:text-red-400 mb-2"
                            },
                            "children": ["❌ Cons"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Large upfront cost",
                              "• Money tied up",
                              "• You bear depreciation risk",
                              "• Repair costs after warranty",
                              "• Must handle selling"
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

          /* --------------------------
            CARD 6: Cost Comparison
          -------------------------- */
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
                      { "type": "Calculator", "props": { "className": "h-5 w-5" } },
                      "Cost Comparison Example"
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
                    "props": { "className": "bg-accent/50 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-3" },
                        "children": ["£20,000 New Car — 3 Year Comparison:"]
                      },
                      {
                        "type": "div",
                        "props": {
                          "className": "grid md:grid-cols-2 lg:grid-cols-4 gap-3"
                        },
                        "children": [
                          /* Box 1 */
                          {
                            "type": "div",
                            "props": { "className": "p-3 border rounded bg-white dark:bg-gray-800" },
                            "children": [
                              { "type": "h5", "props": { "className": "font-medium mb-2" }, "children": ["Buy Outright"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "Upfront: £20,000",
                                  "Monthly: £0",
                                  "Value after 3yr: £12,000",
                                  "Total cost: £8,000"
                                ]
                              }
                            ]
                          },
                          /* Box 2 */
                          {
                            "type": "div",
                            "props": { "className": "p-3 border rounded bg-white dark:bg-gray-800" },
                            "children": [
                              { "type": "h5", "props": { "className": "font-medium mb-2" }, "children": ["Hire Purchase"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "Deposit: £2,000",
                                  "Monthly: £520",
                                  "Total paid: £20,720",
                                  "Own car worth ~£12k"
                                ]
                              }
                            ]
                          },
                          /* Box 3 */
                          {
                            "type": "div",
                            "props": { "className": "p-3 border rounded bg-white dark:bg-gray-800" },
                            "children": [
                              { "type": "h5", "props": { "className": "font-medium mb-2" }, "children": ["PCP"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "Deposit: £2,000",
                                  "Monthly: £299",
                                  "Total paid: £12,764",
                                  "Return or pay £11k"
                                ]
                              }
                            ]
                          },
                          /* Box 4 */
                          {
                            "type": "div",
                            "props": { "className": "p-3 border rounded bg-white dark:bg-gray-800" },
                            "children": [
                              { "type": "h5", "props": { "className": "font-medium mb-2" }, "children": ["Lease"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "Deposit: £1,000",
                                  "Monthly: £250",
                                  "Total paid: £10,000",
                                  "Return car, own nothing"
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

          /* --------------------------
            CARD 7: Student Considerations
          -------------------------- */
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
                      { "type": "AlertTriangle", "props": { "className": "h-5 w-5" } },
                      "Student Considerations"
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
                      /* Think Twice */
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2" },
                            "children": ["Think Twice About:"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Getting a car before you really need one",
                              "• Choosing a car that's too expensive",
                              "• Ignoring insurance, fuel, maintenance",
                              "• PCP if likely to exceed mileage",
                              "• Finance without checking total cost"
                            ]
                          }
                        ]
                      },
                      /* Student-Friendly */
                      {
                        "type": "div",
                        "props": {
                          "className":
                            "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2" },
                            "children": ["Student-Friendly Options:"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Buy a reliable used car outright (£3-8k)",
                              "• Consider if you actually need a car",
                              "• Car-sharing schemes",
                              "• Family help instead of finance",
                              "• HP on a sensible used car"
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": {
                      "className": "bg-accent/50 p-4 rounded-lg border-l-4 border-primary"
                    },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Reality Check:"]
                      },
                      {
                        "type": "p",
                        "props": { "className": "text-sm" },
                        "children": [
                          "A car is a depreciating asset, not an investment. Focus on reliable, affordable transport rather than the newest model."
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

    /* ----------------------------------
      QUIZ
    ---------------------------------- */
    quiz: {
      questions: [
        {
          question: "What happens at the end of a PCP deal?",
          options: [
            "You automatically own the car",
            "You choose to return, buy, or exchange the car",
            "You must buy the car",
            "The car is repossessed"
          ],
          correctAnswer: 1,
          explanation: "PCP gives you three end-of-term options."
        },
        {
          question: "What's the main advantage of leasing a car?",
          options: [
            "You own the car at the end",
            "Lower monthly payments for newer cars",
            "No mileage restrictions",
            "You can modify the car"
          ],
          correctAnswer: 1,
          explanation: "Leasing offers low monthly payments for new cars."
        },
        {
          question: "When does buying a car outright make most sense?",
          options: [
            "When you have no savings",
            "When interest rates are very high",
            "When you want the newest model",
            "When you plan to keep it for many years"
          ],
          correctAnswer: 3,
          explanation: "Buying outright is best for long-term ownership."
        }
      ],
      passingScore: 2
    },

    /* ----------------------------------
      NEXT STEPS (relatedLessons)
    ---------------------------------- */
    relatedLessons: [
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      },
      {
        moduleId: "good-vs-bad-debt",
        title: "Good vs Bad Debt",
        relationship: "related"
      },
      {
        moduleId: "mortgages-101",
        title: "Mortgages 101",
        relationship: "next-step"
      }
    ]
  },

  /* ================================================================
     4. Long-Term Wealth Through Property
  ================================================================= */
  {
    title: "Wealth Through Property",
    description: "Building wealth with real estate",
    categoryId: "property-purchases",
    topic: "wealth-through-property",
    createdBy: "system",

    visual: {
      icon: "Building",
      iconColor: "bg-indigo-500",
      badge: "Intermediate",
      readTime: 2
    },

    difficultyLevel: "intermediate",
    timeEstimate: 8,
    points: 160,
    order: 4,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [
          /* ------------------------------------
            CARD 1 — Why Property Builds Wealth
          ------------------------------------ */
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
                      "Why Property for Wealth Building?"
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
                      "Property has historically been one of the most effective ways to build long-term wealth. Unlike other assets, property provides both capital growth and income generation, plus you can live in it while it appreciates."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-4" },
                    "children": [
                      /* Benefits */
                      {
                        "type": "div",
                        "props": {
                          "className": "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold text-green-700 dark:text-green-400 mb-2" },
                            "children": ["Wealth Building Benefits"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Capital appreciation over time",
                              "• Rental income from tenants",
                              "• Leverage: control large assets with smaller deposits",
                              "• Inflation hedge",
                              "• Tax benefits such as mortgage interest relief"
                            ]
                          }
                        ]
                      },
                      /* UK Performance */
                      {
                        "type": "div",
                        "props": {
                          "className": "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold text-blue-700 dark:text-blue-400 mb-2" },
                            "children": ["UK Historical Performance"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Average growth: ~7–8% yearly since 1950s",
                              "• Prices doubled every 10–15 years historically",
                              "• London has higher growth but more volatility",
                              "• Strong regional variations",
                              "• Slower growth expected in coming years"
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

          /* ------------------------------------
            CARD 2 — Power of Leverage
          ------------------------------------ */
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
                      { "type": "Home", "props": { "className": "h-5 w-5" } },
                      "The Power of Leverage"
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
                      "Leverage is using borrowed money to increase your potential return. With property, you can control a £200,000 asset with just a £20,000 deposit."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-accent/50 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Leverage Example:"]
                      },
                      {
                        "type": "div",
                        "props": { "className": "space-y-2 text-sm" },
                        "children": [
                          "• £200,000 house, £20,000 deposit (10%)",
                          "• Year 5 value: £250,000 (5% annual growth)",
                          "• Gain: £50,000 on a £20,000 investment",
                          "• Return: 250% over 5 years"
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "border-l-4 border-yellow-500 pl-4 bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["⚠️ Leverage Risk:"]
                      },
                      {
                        "type": "p",
                        "props": { "className": "text-sm" },
                        "children": [
                          "Leverage amplifies both gains AND losses. If the property value falls, you still owe the full mortgage amount."
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },

          /* ------------------------------------
            CARD 3 — Property Investment Strategies
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Property Investment Strategies"] }] },
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      /* Buy-to-Let */
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                            "children": [
                              { "type": "Home", "props": { "className": "h-4 w-4 text-green-500" } },
                              "Buy-to-Let Investment"
                            ]
                          },
                          {
                            "type": "p",
                            "props": { "className": "text-sm text-muted-foreground mb-2" },
                            "children": ["Buy property specifically to rent out for income and long-term growth."]
                          },
                          {
                            "type": "div",
                            "props": { "className": "text-xs space-y-1" },
                            "children": [
                              "• Pros: rental income, appreciation, tax benefits",
                              "• Cons: landlord duties, maintenance, void periods",
                              "• Typical yield: 4–8% in the UK"
                            ]
                          }
                        ]
                      },
                      /* Owner-occupier */
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                            "children": [
                              { "type": "Building", "props": { "className": "h-4 w-4 text-blue-500" } },
                              "Owner-Occupier Strategy"
                            ]
                          },
                          {
                            "type": "p",
                            "props": { "className": "text-sm text-muted-foreground mb-2" },
                            "children": ["Live in your property while it appreciates, then move up the property ladder."]
                          },
                          {
                            "type": "div",
                            "props": { "className": "text-xs space-y-1" },
                            "children": [
                              "• Pros: no CGT, smaller deposits, stable housing",
                              "• Cons: tied to location, concentrated risk",
                              "• Strategy: buy → improve → remortgage → repeat"
                            ]
                          }
                        ]
                      },
                      /* REITs */
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2 flex items-center gap-2" },
                            "children": [
                              { "type": "Target", "props": { "className": "h-4 w-4 text-purple-500" } },
                              "Property REITs & Funds"
                            ]
                          },
                          {
                            "type": "p",
                            "props": { "className": "text-sm text-muted-foreground mb-2" },
                            "children": ["Invest in property without buying a physical building."]
                          },
                          {
                            "type": "div",
                            "props": { "className": "text-xs space-y-1" },
                            "children": [
                              "• Pros: lower entry cost, diversification, liquid",
                              "• Cons: fees, market volatility, no direct control",
                              "• Examples: property unit trusts, REITs"
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

          /* ------------------------------------
            CARD 4 — Property Ladder Strategy
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["The Property Ladder Strategy"] }] },
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "p",
                    "children": [
                      "A classic UK wealth-building method: start with a smaller home, build equity, move up, and eventually build a portfolio."
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "space-y-3" },
                    "children": [
                      /* Steps */
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["1"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["First Home (Age 25–30)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["£150k starter home, £15k deposit"] }
                        ]}
                      ]},
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["2"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Build Equity (5–7 years)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["£150k → £200k growth, plus mortgage repayments"] }
                        ]}
                      ]},
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["3"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Move Up (Age 32–37)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Use equity for deposit on £300k home"] }
                        ]}
                      ]},
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["4"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Portfolio Building (Age 40+)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Multiple properties, early retirement potential"] }
                        ]}
                      ]}
                    ]
                  }
                ]
              }
            ]
          },

          /* ------------------------------------
            CARD 5 — Risks & Considerations
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Risks and Considerations"] }] },
              {
                "type": "CardContent",
                "props": { "className": "space-y-4" },
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-2 gap-4" },
                    "children": [
                      /* Key Risks */
                      {
                        "type": "div",
                        "props": {
                          "className": "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                        },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 dark:text-red-400 mb-2" }, "children": ["Key Risks"] },
                          { "type": "ul", "props": { "className": "text-sm space-y-1" }, "children": [
                            "• Property values can fall",
                            "• High transaction costs",
                            "• Illiquid asset — slow to sell",
                            "• Maintenance and tenant issues",
                            "• Interest rate risks",
                            "• Overexposure to one asset class"
                          ] }
                        ]
                      },
                      /* Student-Specific */
                      {
                        "type": "div",
                        "props": {
                          "className": "p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                        },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-yellow-700 dark:text-yellow-400 mb-2" }, "children": ["For Students"] },
                          { "type": "ul", "props": { "className": "text-sm space-y-1" }, "children": [
                            "• Don’t rush into buying property",
                            "• Build emergency fund first",
                            "• Consider career mobility",
                            "• Understand all long-term costs",
                            "• Location matters massively",
                            "• Property isn’t the only path to wealth"
                          ] }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-accent/50 p-4 rounded-lg border-l-4 border-primary" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Balanced Approach:"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": [
                        "Property can be excellent for wealth building, but diversification matters. A balanced approach might include property, stocks, bonds, and cash."
                      ]}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    /* ------------------------------------
      QUIZ
    ------------------------------------ */
    quiz: {
      questions: [
        {
          question: "What's the main way property builds wealth over time?",
          options: [
            "Property never loses value",
            "Capital appreciation and rental income",
            "Government guarantees",
            "Property maintenance increases value"
          ],
          correctAnswer: 1,
          explanation: "Property wealth comes from rental income plus long-term appreciation."
        },
        {
          question: "What is leverage in property investment?",
          options: [
            "Using tools to fix properties",
            "Buying property with borrowed money",
            "Selling property quickly",
            "Renting out rooms"
          ],
          correctAnswer: 1,
          explanation: "Leverage allows you to control large assets with smaller deposits."
        },
        {
          question: "What's a key risk of property investment?",
          options: [
            "Properties always increase in value",
            "No maintenance required",
            "Markets can fall and properties need maintenance",
            "Guaranteed rental income"
          ],
          correctAnswer: 2,
          explanation: "Property values can drop and repairs can be expensive."
        }
      ],
      passingScore: 2
    },

    /* ------------------------------------
      RELATED LESSONS
    ------------------------------------ */
    relatedLessons: [
      {
        moduleId: "renting-vs-buying",
        title: "Renting vs Buying",
        relationship: "related"
      },
      {
        moduleId: "mortgages-101",
        title: "Mortgages 101",
        relationship: "next-step"
      },
      {
        moduleId: "diversification",
        title: "Diversification",
        relationship: "related"
      }
    ]
  }

];

// =====================================================
// Seed Function
// =====================================================
async function seedPropertyPurchases() {
  try {
    for (const module of propertyPurchasesModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
    }

    console.log("🏡 Property & Big Purchases modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Property & Big Purchases:", error);
  }
}

module.exports = {
  propertyPurchasesModules,
  seedPropertyPurchases,
};
