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
        props: { className: "mb-5" },
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
                props: { className: "bg-primary/10 p-4 rounded-lg" },
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
        props: { className: "mb-5" },
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
        props: { className: "mb-5" },
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
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Build equity:"] },
                              " Monthly payments increase your ownership"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Stability:"] },
                              " No landlord, no forced moves"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Control:"] },
                              " Renovate and modify as you wish"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Potential appreciation:"] },
                              " Property might increase in value"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Tax benefits:"] },
                              " Mortgage interest relief"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Fixed payments:"] },
                              " Mortgage stays the same (if fixed rate)"
                            ]
                          }
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
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["High upfront costs:"] },
                              " Deposit, fees, surveys"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Maintenance costs:"] },
                              " You pay for all repairs"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Less flexibility:"] },
                              " Harder to move quickly"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Market risk:"] },
                              " Property values can fall"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Additional costs:"] },
                              " Insurance, taxes, maintenance"
                            ]
                          },
                          {
                            type: "li",
                            children: [
                              { type: "strong", children: ["Interest payments:"] },
                              " Pay interest to the bank"
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
      * FINANCIAL COMPARISON
      * ---------------------------------------------------- */
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
                props: { className: "bg-primary/10 p-4 rounded-lg" },
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
                              { type: "li", children: ["Rent: £1,200/month"] },
                              { type: "li", children: ["Utilities: £150/month"] },
                              { type: "li", props: { className: "font-semibold" }, children: ["Total: £1,350/month"] },
                              { type: "li", children: ["Upfront: £2,400 (deposit + first month)"] }
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
                              { type: "li", children: ["Mortgage: £1,100/month"] },
                              { type: "li", children: ["Insurance/taxes: £200/month"] },
                              { type: "li", children: ["Maintenance: £100/month"] },
                              { type: "li", children: [{ type: "strong", children: ["Total: £1,400/month"] }] },
                              { type: "li", children: ["Upfront: £25,000+ (10% deposit + fees)"] }
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
                      "A rough guide: if annual rent is less than 5% of the property's purchase price, renting might be better financially. If it's more than 5%, buying could be better (assuming you'll stay for 5+ years)."
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
        props: { className: "mb-5" },
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
                          { type: "li", children: [{ type: "p", children: ["✅ You plan to stay 5+ years"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ You have 10-20% deposit saved"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ Your income is stable"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ You want to customize your space"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ Local property prices are reasonable"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ You're comfortable with maintenance responsibility"] }] }
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
                          { type: "li", children: [{ type: "p", children: ["✅ You might move within 3-5 years"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ You don't have a large deposit"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ Your career/income is uncertain"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ You prefer flexibility"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ Local property prices are very high"] }] },
                          { type: "li", children: [{ type: "p", children: ["✅ You don't want maintenance hassles"] }] }
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
      passingScore: 2,
      questions: [
        {
          question: "What's typically the main advantage of renting?",
          options: [
            "Building equity over time",
            "More flexibility to move",
            "Lower total housing costs",
            "Complete control over the property"
          ],
          correctAnswer: 1
        },
        {
          question: "What should you consider before buying your first home?",
          options: [
            "Only the monthly mortgage payment",
            "Just the deposit amount",
            "All costs including maintenance, insurance, and taxes",
            "Only the interest rate"
          ],
          correctAnswer: 2
        },
        {
          question: "When might renting be better than buying?",
          options: [
            "When you plan to live somewhere for 10+ years",
            "When you have a large deposit saved",
            "When you might move within 3-5 years",
            "When house prices are falling"
          ],
          correctAnswer: 2
        }
      ]
    },

    relatedLessons: [
      {
        moduleId: "mortgages-101",
        title: "Mortgages 101",
        relationship: "next-step"
      },
      {
        moduleId: "wealth-through-property",
        title: "Long-term Wealth Through Property",
        relationship: "related"
      },
      {
        moduleId: "car-finance",
        title: "Car Finance Explained",
        relationship: "related"
      }
    ],
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
        props: { className: "mb-5" },
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
                  "A mortgage is a loan specifically designed to help you buy property. The property itself serves as security for the loan - if you can't repay, the lender can take the property to recover their money."
                ]
              },

              {
                type: "div",
                props: { className: "bg-primary/10 p-4 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Simple Breakdown:"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm space-y-1 list-disc pl-4" },
                    children: [
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["You want"] },
                          ": A £200,000 house"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["You have"] },
                          ": £20,000 deposit (10%)"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["Bank lends"] },
                          ": £180,000 (90%)"
                        ]
                      },
                      {
                        type: "li",
                        children: [
                          { type: "strong", children: ["You pay back"] },
                          ": £180,000 + interest over 25-30 years"
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
      * KEY MORTGAGE TERMS
      * ---------------------------------------------------- */
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
                          "The upfront payment you make. First-time buyers typically need 5-10% minimum, but larger deposits (15-20%) get better interest rates."
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
                          "How long you take to repay (usually 25-30 years). Longer terms = lower monthly payments but more interest overall."
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
        props: { className: "mb-5" },
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
                        children: ["Interest rate stays the same for a set period (2-10 years)."]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          {
                            type: "p",
                            children: [
                              { type: "strong", children: ["Pros:"] },
                              " Predictable payments, protection from rate rises"
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "strong", children: ["Cons:"] },
                              " Often higher initial rates, can't benefit from rate falls"
                            ]
                          }
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
                          {
                            type: "p",
                            children: [
                              { type: "strong", children: ["Pros:"] },
                              " Often lower initial rates, benefit from rate cuts"
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "strong", children: ["Cons:"] },
                              " Payments can increase, harder to budget"
                            ]
                          }
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
                          {
                            type: "p",
                            children: [
                              { type: "strong", children: ["Help to Buy:"] },
                              " Government loan for new builds"
                            ]
                          },
                          {
                            type: "p",
                            children: [
                              { type: "strong", children: ["Shared Ownership:"] },
                              " Buy a share (25–75%), rent the rest"
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
      * MORTGAGE APPLICATION PROCESS
      * ---------------------------------------------------- */
      {
        type: "Card",
        props: { className: "mb-5" },
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
        props: { className: "mb-5" },
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
                          {
                            type: "div",
                            children: [
                              "• ",
                              { type: "strong", children: ["Stamp Duty"] },
                              ": Government tax on property purchases"
                            ]
                          },
                          {
                            type: "div",
                            children: [
                              "• ",
                              { type: "strong", children: ["Survey"] },
                              ": £400–£1,500 to check property condition"
                            ]
                          },
                          {
                            type: "div",
                            children: [
                              "• ",
                              { type: "strong", children: ["Legal fees"] },
                              ": £800–£2,000"
                            ]
                          }
                        ]
                      },
                      {
                        type: "div",
                        children: [
                          {
                            type: "div",
                            children: [
                              "• ",
                              { type: "strong", children: ["Mortgage fees"] },
                              ": £500–£2,000 arrangement fees"
                            ]
                          },
                          {
                            type: "div",
                            children: [
                              "• ",
                              { type: "strong", children: ["Moving costs"] },
                              ": £500–£2,000"
                            ]
                          },
                          {
                            type: "div",
                            children: [
                              "• ",
                              { type: "strong", children: ["Buildings insurance"] },
                              ": Required by lender"
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
                props: { className: "bg-primary/20 p-4 rounded-lg border-l-4 border-primary" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Student Tip:"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Don't just save for the deposit - budget for all these extra costs too! Many first-time buyers are caught off guard by how much they add up."
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
      passingScore: 2,
      questions: [
        {
          question: "What is a mortgage?",
          options: [
            "A type of savings account",
            "A loan to buy property",
            "Property insurance",
            "A government benefit"
          ],
          correctAnswer: 1
        },
        {
          question: "What's typically the minimum deposit for a first-time buyer?",
          options: [
            "50% of property value",
            "25% of property value",
            "5-10% of property value",
            "No deposit needed"
          ],
          correctAnswer: 2
        },
        {
          question: "What does LTV stand for?",
          options: [
            "Long Term Value",
            "Loan to Value",
            "Living Term Variable",
            "Legal Title Verification"
          ],
          correctAnswer: 1
        }
      ]
    },

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
                    "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Quick Overview:"]
                      },
                      {
                        "type": "ul",
                        "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                        "children": [
                          {
                            "type": "li",
                            "children": [
                              { "type": "strong", "children": ["Buy outright:"] },
                              " Pay full price, own it immediately"
                            ]
                          },
                          {
                            "type": "li",
                            "children": [
                              { "type": "strong", "children": ["Hire Purchase (HP):"] },
                              " Monthly payments, own it at the end"
                            ]
                          },
                          {
                            "type": "li",
                            "children": [
                              { "type": "strong", "children": ["PCP:"] },
                              " Lower payments, flexible at the end"
                            ]
                          },
                          {
                            "type": "li",
                            "children": [
                              { "type": "strong", "children": ["Leasing:"] },
                              " Rent the car, return it at the end"
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["You will own the car"] },
                              { "type": "li", "children": ["Fixed monthly payments"] },
                              { "type": "li", "children": ["No mileage restrictions"] },
                              { "type": "li", "children": ["Can modify the car"] },
                              { "type": "li", "children": ["Simpler than PCP"] }
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              {
                                "type": "li",
                                "children": ["Higher monthly payments than PCP"]
                              },
                              {
                                "type": "li",
                                "children": ["You're responsible for depreciation"]
                              },
                              {
                                "type": "li",
                                "children": ["No flexibility at the end"]
                              },
                              {
                                "type": "li",
                                "children": ["Car loses value quickly"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-primary/10 p-4 rounded-lg" },
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
                        "props": { "className": "text-sm space-y-1 list-decimal pl-4" },
                        "children": [
                          {
                            "type": "li",
                            "children": ["Pay a deposit (usually 10% of car value)"]
                          },
                          {
                            "type": "li",
                            "children": ["Make lower monthly payments for 2-4 years"]
                          },
                          {
                            "type": "li",
                            "children": [
                              "At the end, choose one of three options:",
                              {
                                "type": "ul",
                                "props": {
                                  "className": "mt-2 ml-4 space-y-1 text-sm list-disc pl-4"
                                },
                                "children": [
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Return:"] },
                                      " Give the car back, walk away"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Buy:"] },
                                      " Pay the balloon payment to own it"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Exchange:"] },
                                      " Trade it for a new PCP deal"
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "props": {}, "children": ["Lower monthly payments"] },
                              { "type": "li", "props": {}, "children": ["Flexibility at the end"] },
                              { "type": "li", "props": {}, "children": ["Always driving newer cars"] },
                              {
                                "type": "li",
                                "props": {},
                                "children": ["Warranty usually covers repairs"]
                              },
                              { "type": "li", "props": {}, "children": ["Fixed future value"] }
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              {
                                "type": "li",
                                "children": ["Mileage restrictions (usually 8-12k/year)"]
                              },
                              {
                                "type": "li",
                                "children": ["Charges for damage/wear"]
                              },
                              {
                                "type": "li",
                                "children": ["Expensive if you want to keep the car"]
                              },
                              {
                                "type": "li",
                                "children": ["Never-ending car payments"]
                              },
                              {
                                "type": "li",
                                "children": ["More complex terms"]
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
                      "Like renting a car for 2-4 years. You never own it, just use it. Popular with businesses, increasingly common for personal use."
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              {
                                "type": "li",
                                "children": ["Lowest monthly payments"]
                              },
                              {
                                "type": "li",
                                "children": ["Always driving new cars"]
                              },
                              {
                                "type": "li",
                                "children": ["Warranty covers everything"]
                              },
                              {
                                "type": "li",
                                "children": ["No depreciation worries"]
                              },
                              {
                                "type": "li",
                                "children": ["Predictable costs"]
                              }
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              {
                                "type": "li",
                                "children": ["You never own anything"]
                              },
                              {
                                "type": "li",
                                "children": ["Strict mileage limits"]
                              },
                              {
                                "type": "li",
                                "children": ["Expensive early termination"]
                              },
                              {
                                "type": "li",
                                "children": ["Perpetual monthly payments"]
                              },
                              {
                                "type": "li",
                                "children": ["No modifications allowed"]
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["No monthly payments"] },
                              { "type": "li", "children": ["Complete ownership and control"] },
                              { "type": "li", "children": ["No interest charges"] },
                              { "type": "li", "children": ["Can sell anytime"] },
                              { "type": "li", "children": ["No mileage restrictions"] }
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
                              { "type": "li", "children": ["Large upfront cost"] },
                              { "type": "li", "children": ["Money tied up"] },
                              { "type": "li", "children": ["You bear depreciation risk"] },
                              { "type": "li", "children": ["Repair costs after warranty"] },
                              { "type": "li", "children": ["Need to handle selling"] }
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
                    "props": { "className": "bg-primary/10 p-4 rounded-lg" },
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
                                  { "type": "p", "children": ["Upfront: £20,000"] },
                                  { "type": "p", "children": ["Monthly: £0"] },
                                  { "type": "p", "children": ["Value after 3yr: £12,000"] },
                                  { "type": "p", "props": { "className": "font-semibold" }, "children": ["Total cost: £8,000"] }
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
                                  { "type": "p", "children": ["Deposit: £2,000"] },
                                  { "type": "p", "children": ["Monthly: £520"] },
                                  { "type": "p", "children": ["Total paid: £20,720"] },
                                  { "type": "p", "props": { "className": "font-semibold" }, "children": ["Own car worth £12k"] }
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
                                  { "type": "p", "children": ["Deposit: £2,000"] },
                                  { "type": "p", "children": ["Monthly: £299"] },
                                  { "type": "p", "children": ["Total paid: £12,764"] },
                                  { "type": "p", "props": { "className": "font-semibold" }, "children": ["Return or pay £11k"] }
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
                                  { "type": "p", "children": ["Deposit: £1,000"] },
                                  { "type": "p", "children": ["Monthly: £250"] },
                                  { "type": "p", "children": ["Total paid: £10,000"] },
                                  { "type": "p", "props": { "className": "font-semibold" }, "children": ["Return car, own nothing"] }
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
                            "p-4 bg-yellow-50 rounded-lg border border-yellow-200 dark:border-yellow-800"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2" },
                            "children": ["Think Twice About:"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              {
                                "type": "li",
                                "children": ["Getting a car before you really need one"]
                              },
                              {
                                "type": "li",
                                "children": ["Choosing a car that's too expensive for your income"]
                              },
                              {
                                "type": "li",
                                "children": [
                                  "Ignoring insurance, fuel, and maintenance costs"
                                ]
                              },
                              {
                                "type": "li",
                                "children": ["PCP if you're likely to exceed mileage limits"]
                              },
                              {
                                "type": "li",
                                "children": ["Finance deals without checking total costs"]
                              }
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
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              {
                                "type": "li",
                                "children": ["Buy a reliable used car outright (£3-8k)"]
                              },
                              {
                                "type": "li",
                                "children": [
                                  "Consider if you actually need a car (public transport, cycling)"
                                ]
                              },
                              {
                                "type": "li",
                                "children": ["Car sharing schemes in cities"]
                              },
                              {
                                "type": "li",
                                "children": ["Family help with purchase rather than finance"]
                              },
                              {
                                "type": "li",
                                "children": ["HP on a sensible used car"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": {
                      "className": "bg-primary/10 p-4 rounded-lg border-l-4 border-primary"
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
                          "A car is usually a depreciating asset, not an investment. Focus on reliable, affordable transport rather than the newest or flashiest model. Your future self will thank you!"
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
        moduleId: "wealth-through-property",
        title: "Long-Term Wealth Through Property",
        relationship: "next-step"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      },
      {
        moduleId: "mortgages-101",
        title: "Mortgages 101",
        relationship: "related"
      },
    ]
  },

  /* ================================================================
     4. Long-Term Wealth Through Property
  ================================================================= */
  {
    title: "Long-Term Wealth Through Property",
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
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Capital appreciation"] },
                                  ": Property values rise over time"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Rental income"] },
                                  ": Tenants pay your mortgage"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Leverage"] },
                                  ": Control £200k with £20k deposit"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Inflation hedge"] },
                                  ": Property prices rise with inflation"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Tax benefits"] },
                                  ": Mortgage interest, depreciation"
                                ]
                              }
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
                              {
                                "type": "li",
                                "children": ["Average annual growth: 7-8% since 1950s"]
                              },
                              {
                                "type": "li",
                                "children": ["House prices doubled every 10-15 years"]
                              },
                              {
                                "type": "li",
                                "children": ["London: Higher growth but more volatile"]
                              },
                              {
                                "type": "li",
                                "children": ["Regional variations significant"]
                              },
                              {
                                "type": "li",
                                "children": ["Recent years: Slower growth expected"]
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
                    "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Leverage Example:"]
                      },
                      {
                        "type": "ul",
                        "props": { "className": "space-y-2 text-sm" },
                        "children": [
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Scenario"] },
                              ": £200,000 house, £20,000 deposit (10% down)"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Year 1"] },
                              ": House worth £200,000"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Year 5"] },
                              ": House worth £250,000 (5% annual growth)"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Your gain"] },
                              ": £50,000 on your £20,000 investment"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Return"] },
                              ": 250% over 5 years (vs 25% if you'd bought without leverage)"
                            ]
                          },
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
                          "Leverage amplifies both gains AND losses. If the property value falls, you still owe the full mortgage amount. This is why property investment is considered medium-to-high risk."
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
                            "children": ["Buy property specifically to rent out for income and growth."]
                          },
                          {
                            "type": "div",
                            "props": { "className": "text-xs space-y-1" },
                            "children": [
                              {
                                "type": "ul",
                                "props": { "className": "space-y-1" },
                                "children": [
                                  {
                                    "type": "p",
                                    "children": [
                                      { "type": "strong", "children": ["Pros:"] },
                                      " Regular rental income, potential appreciation, tax benefits"
                                    ]
                                  },
                                  {
                                    "type": "p",
                                    "children": [
                                      { "type": "strong", "children": ["Cons:"] },
                                      " Landlord responsibilities, void periods, maintenance costs"
                                    ]
                                  },
                                  {
                                    "type": "p",
                                    "children": [
                                      { "type": "strong", "children": ["Typical yield:"] },
                                      " 4-8% rental yield in UK"
                                    ]
                                  }
                                ]
                              }
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
                            "children": ["Live in your property while it appreciates, then move up the ladder."]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-xs space-y-1" },
                            "children": [
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Pros:"] },
                                  " No capital gains tax, lower deposit requirements, stable housing"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Cons:"] },
                                  " Tied to one location, all eggs in one basket"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Strategy:"] },
                                  " Buy, improve, remortgage, repeat"
                                ]
                              }
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
                            "children": ["Invest in property through funds rather than buying directly."]
                          },
                          {
                            "type": "div",
                            "props": { "className": "text-xs space-y-1" },
                            "children": [
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Pros:"] },
                                  " Lower entry cost, professional management, diversification"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Cons:"] },
                                  " No direct control, fees, market volatility"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Examples:"] },
                                  " Property unit trusts, REITs on stock market"
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
                      "A classic UK wealth-building approach: start small, build equity, then use that equity to move up to better properties."
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
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["£150k flat/house, £15k deposit, focus on good location and growth potential"] }
                        ]}
                      ]},
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["2"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Build Equity (5–7 years)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Pay down mortgage, property appreciates to £200k, you now have £65k equity"] }
                        ]}
                      ]},
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["3"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Move Up (Age 32–37)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Use £50k equity for deposit on £300k family home, keep or sell first property"] }
                        ]}
                      ]},
                      { "type": "div", "props": { "className": "flex items-start gap-3 p-3 border rounded-lg" }, "children": [
                        { "type": "div", "props": { "className": "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold" }, "children": ["4"] },
                        { "type": "div", "children": [
                          { "type": "h4", "props": { "className": "font-semibold" }, "children": ["Portfolio Building (Age 40+)"] },
                          { "type": "p", "props": { "className": "text-sm text-muted-foreground" }, "children": ["Multiple properties, significant equity, considering early retirement"] }
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
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Property values can fall (2008 crash: -20%)"] },
                              { "type": "li", "children": ["High transaction costs (5-7% total)"] },
                              { "type": "li", "children": ["Illiquidity - can't sell quickly"] },
                              { "type": "li", "children": ["Maintenance and void periods"] },
                              { "type": "li", "children": ["Interest rate rises increase costs"] },
                              { "type": "li", "children": ["All wealth in one asset class"] }
                            ]
                          }
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
                          { "type": "ul", "props": { "className": "text-sm space-y-1 list-disc pl-4" }, "children": [
                            { "type": "li", "children": ["Don't rush into property buying"] },
                            { "type": "li", "children": ["Build strong financial foundation first"] },
                            { "type": "li", "children": ["Consider your career mobility needs"] },
                            { "type": "li", "children": ["Understand all costs involved"] },
                            { "type": "li", "children": ["Location, location, location matters"] },
                            { "type": "li", "children": ["Property isn't the only wealth builder"] }
                          ] }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "div",
                    "props": { "className": "bg-primary/10 p-4 rounded-lg border-l-4 border-primary" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Balanced Approach:"] },
                      { "type": "p", "props": { "className": "text-sm" }, "children": [
                        "Property can be excellent for wealth building, but don't put all your eggs in one basket. A balanced portfolio might include property (40%), stocks (40%), bonds (15%), and cash (5%). Start with index funds in your 20s, add property when you're ready to settle down."
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
