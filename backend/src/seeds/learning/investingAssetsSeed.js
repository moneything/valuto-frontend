// backend/src/seeds/learning/investingAssetsSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Investing & Assets — Learning Modules
 * Category ID: investing-assets
 *
 * Includes:
 * 1. Introduction to Investing
 * 2. Stocks & Shares Basics
 * 3. Bonds & Low-Risk Assets
 * 4. Diversification & Risk
 * 5. Compound Interest Explained
 */

const investingAssetsModules = [
  {
    title: "Introduction to Investing",
    description: "A beginner-friendly introduction to what investing is, why it matters, and how students can start safely.",
    categoryId: "investing-assets",
    topic: "intro-investing",

    visual: {
      icon: "TrendingUp",
      iconColor: "bg-purple-500",
      badge: "Beginner Friendly",
      readTime: 2
    },

    uiTree: [
      /* ----------------------------------------------
      * WHAT IS INVESTING?
      * ---------------------------------------------- */
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
                  { type: "Target", props: { className: "h-5 w-5" } },
                  "What Is Investing?"
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
                  "Investing means putting your money to work to grow over time instead of just letting it sit. It's like planting seeds today to harvest more tomorrow."
                ]
              },
              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Simple Example:"] },
                  {
                    type: "p",
                    children: [
                      "If you put £100 in a savings account earning 1% interest, after 10 years you'd have £110. ",
                      "If you invested that £100 and earned 7% on average, you'd have around £197!"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------
      * WHY STUDENTS SHOULD CARE
      * ---------------------------------------------- */
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
                  { type: "DollarSign", props: { className: "h-5 w-5" } },
                  "Why Should Students Care About Investing?"
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
                    props: { className: "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-700 dark:text-green-400 mb-2" }, children: ["Time Advantage"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: ["Starting young gives your money decades to grow thanks to compound interest — your returns earn returns."]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-blue-700 dark:text-blue-400 mb-2" }, children: ["Beat Inflation"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Inflation makes prices rise over time. Investing helps your money grow fast enough to keep up."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-purple-700 dark:text-purple-400 mb-2" }, children: ["Future Goals"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Whether you want to buy a house, start a business, or travel the world, investing helps get you there faster."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-orange-700 dark:text-orange-400 mb-2" }, children: ["Financial Freedom"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Growing wealth over time gives you more choices and more control over your future."
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

      /* ----------------------------------------------
      * BEFORE YOU START INVESTING
      * ---------------------------------------------- */
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
                  "Before You Start Investing"
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
                props: { className: "border-l-4 border-yellow-500 pl-4 bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Essential Steps First:"] },
                  {
                    type: "ul",
                    props: { className: "space-y-2 text-sm" },
                    children: [
                      { type: "li", children: ["✅ Build an emergency fund (3–6 months of expenses)"] },
                      { type: "li", children: ["✅ Pay off high-interest debt"] },
                      { type: "li", children: ["✅ Have stable income"] },
                      { type: "li", children: ["✅ Understand investing can go up and down"] }
                    ]
                  }
                ]
              },
              {
                type: "p",
                children: [
                  { type: "strong", children: ["Remember: "] },
                  "Only invest money you won’t need for at least 5 years. Investments can drop in value in the short term."
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------
      * TYPES OF INVESTMENTS
      * ---------------------------------------------- */
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
                  { type: "BookOpen", props: { className: "h-5 w-5" } },
                  "Types of Investments (Quick Overview)"
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
                props: { className: "grid gap-3" },
                children: [
                  {
                    type: "div",
                    props: { className: "p-3 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold" }, children: ["Stocks (Shares)"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: ["Own tiny parts of companies. Higher potential reward, higher risk."]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-3 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold" }, children: ["Bonds"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: ["Loans to governments/companies. Lower risk, lower reward."]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-3 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold" }, children: ["Funds (ETFs/Index Funds)"] },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: ["Baskets of many investments — perfect for beginners and diversification."]
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
      questions: [],
      passingScore: 0
    },

    relatedLessons: [],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 2,
    order: 1,
    createdBy: "system"
  },

  {
    title: "Traditional Assets",
    description: "A beginner-friendly guide to stocks, bonds, and funds.",
    categoryId: "investing-assets",
    topic: "traditional-assets",

    visual: {
      icon: "Building2",
      iconColor: "bg-purple-500",
      badge: "Beginner Friendly",
      readTime: 3
    },

    uiTree: [
      /* ----------------------------------------------------
      * STOCKS (SHARES)
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
                  { type: "Building2", props: { className: "h-5 w-5" } },
                  "Stocks (Shares)"
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
                  "When you buy a stock, you are purchasing a tiny ownership slice of a company. ",
                  "If the company performs well, your share value may rise — but it can also fall if the company struggles."
                ]
              },

              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* PROS */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "TrendingUp", props: { className: "h-4 w-4" } },
                          "Pros"
                        ]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• High potential long-term returns",
                          "• You own part of a real business",
                          "• Many pay dividends",
                          "• Easy to buy and sell"
                        ]
                      }
                    ]
                  },

                  /* CONS */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "AlertCircle", props: { className: "h-4 w-4" } },
                          "Cons"
                        ]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Can be very volatile",
                          "• Risk of losing money",
                          "• Individual companies can fail",
                          "• Requires research or luck"
                        ]
                      }
                    ]
                  }
                ]
              },

              /* EXAMPLE */
              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Example:"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Apple stock was around £150 in 2020 and over £170 in 2024, but fluctuated heavily along the way — showing both growth and volatility."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * BONDS
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
                  { type: "Landmark", props: { className: "h-5 w-5" } },
                  "Bonds"
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
                  "Bonds are loans you give to governments or companies. ",
                  "In return, they pay you interest and return your money after a set number of years."
                ]
              },

              {
                type: "div",
                props: { className: "grid gap-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold flex items-center gap-2 mb-2"
                        },
                        children: [
                          { type: "Shield", props: { className: "h-4 w-4 text-blue-500" } },
                          "Government Bonds (Gilts)"
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "Very safe, low returns (2–4%). Good for stability, not rapid growth."
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
                        props: {
                          className: "font-semibold flex items-center gap-2 mb-2"
                        },
                        children: [
                          { type: "Building2", props: { className: "h-4 w-4 text-green-500" } },
                          "Corporate Bonds"
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children: [
                          "Riskier than government bonds but offer better returns (4–8%)."
                        ]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Why Bonds Matter:"] },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "They stabilise your portfolio — often holding up when stocks fall."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * FUNDS
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
                  { type: "PieChart", props: { className: "h-5 w-5" } },
                  "Funds (The Beginner's Best Friend)"
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
                  "Funds let you buy a basket of investments at once. ",
                  "It’s like buying a mixed bag of sweets instead of choosing each one individually."
                ]
              },

              {
                type: "div",
                props: { className: "grid gap-4" },
                children: [
                  /* INDEX FUNDS */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg bg-primary/5" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Index Funds / ETFs"] },
                      {
                        type: "p",
                        props: { className: "text-sm mb-3" },
                        children: [
                          "Track market indexes like the FTSE 100 — owning tiny pieces of all companies inside."
                        ]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs text-muted-foreground space-y-1" },
                        children: [
                          "• Low fees",
                          "• Instant diversification",
                          "• Beginner-friendly",
                          "• Works well in ISAs"
                        ]
                      }
                    ]
                  },

                  /* ACTIVE FUNDS */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Active Funds"] },
                      {
                        type: "p",
                        props: { className: "text-sm mb-3" },
                        children: ["Managed by professionals trying to beat the market."]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs text-muted-foreground space-y-1" },
                        children: [
                          "• Higher fees",
                          "• Professional selection",
                          "• Most fail to outperform index funds long-term"
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
                      "A simple global index fund in a Stocks & Shares ISA is one of the easiest and safest ways to begin investing."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * RISK LADDER
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Risk vs Return Ladder"] }] },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "space-y-3" },
                children: [
                  {
                    type: "div",
                    props: {
                      className:
                        "flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800"
                    },
                    children: [
                      { type: "span", props: { className: "font-medium" }, children: ["Government Bonds"] },
                      {
                        type: "div",
                        props: { className: "text-right" },
                        children: [
                          { type: "div", props: { className: "text-sm text-green-600 dark:text-green-400" }, children: ["Low Risk"] },
                          { type: "div", props: { className: "text-xs text-muted-foreground" }, children: ["2–4% returns"] }
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: {
                      className:
                        "flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800"
                    },
                    children: [
                      { type: "span", props: { className: "font-medium" }, children: ["Corporate Bonds"] },
                      {
                        type: "div",
                        props: { className: "text-right" },
                        children: [
                          { type: "div", props: { className: "text-sm text-yellow-600 dark:text-yellow-400" }, children: ["Medium-Low Risk"] },
                          { type: "div", props: { className: "text-xs text-muted-foreground" }, children: ["4–7% returns"] }
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: {
                      className:
                        "flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800"
                    },
                    children: [
                      { type: "span", props: { className: "font-medium" }, children: ["Index Funds"] },
                      {
                        type: "div",
                        props: { className: "text-right" },
                        children: [
                          { type: "div", props: { className: "text-sm text-orange-600 dark:text-orange-400" }, children: ["Medium Risk"] },
                          { type: "div", props: { className: "text-xs text-muted-foreground" }, children: ["7–10% historical avg"] }
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: {
                      className:
                        "flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800"
                    },
                    children: [
                      { type: "span", props: { className: "font-medium" }, children: ["Individual Stocks"] },
                      {
                        type: "div",
                        props: { className: "text-right" },
                        children: [
                          { type: "div", props: { className: "text-sm text-red-600 dark:text-red-400" }, children: ["High Risk"] },
                          { type: "div", props: { className: "text-xs text-muted-foreground" }, children: ["Highly variable"] }
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
      questions: [],
      passingScore: 0
    },

    relatedLessons: [],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 2,
    createdBy: "system"
  },

  {
    title: "New Assets",
    description: "Crypto, NFTs, and other speculative assets explained for beginners.",
    categoryId: "investing-assets",
    topic: "new-assets",

    visual: {
      icon: "Coins",
      iconColor: "bg-purple-500",
      badge: "High Risk",
      readTime: 3
    },

    uiTree: [
      /* ----------------------------------------------------
      * MAIN WARNING BANNER
      * ---------------------------------------------------- */
      {
        type: "div",
        props: {
          className:
            "bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        },
        children: [
          {
            type: "div",
            props: { className: "flex items-start gap-3" },
            children: [
              {
                type: "AlertTriangle",
                props: {
                  className:
                    "h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0"
                }
              },
              {
                type: "div",
                children: [
                  {
                    type: "h3",
                    props: {
                      className: "font-semibold text-yellow-800 dark:text-yellow-300 mb-1"
                    },
                    children: ["Important Warning for Students"]
                  },
                  {
                    type: "p",
                    props: {
                      className: "text-sm text-yellow-700 dark:text-yellow-400"
                    },
                    children: [
                      "New assets like crypto and NFTs are extremely risky and speculative. Many people have lost significant money. Only invest what you can afford to lose completely, and only after building your traditional investment foundation."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * CRYPTOCURRENCY
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
                  { type: "Coins", props: { className: "h-5 w-5" } },
                  "Cryptocurrency"
                ]
              },
              {
                type: "CardDescription",
                children: ["Digital money that exists only online"]
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
                  "Cryptocurrency (crypto) is digital money not controlled by any government or bank. Popular examples include Bitcoin and Ethereum. It uses blockchain to verify ownership."
                ]
              },

              /* PROS + CONS GRID */
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* BENEFITS */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "TrendingUp", props: { className: "h-4 w-4" } },
                          "Potential Benefits"
                        ]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Can grow very quickly in value",
                          "• No government control",
                          "• Global and borderless",
                          "• 24/7 trading",
                          "• Some see it as 'digital gold'"
                        ]
                      }
                    ]
                  },

                  /* RISKS */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "TrendingDown", props: { className: "h-4 w-4" } },
                          "Major Risks"
                        ]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Extremely volatile (wild swings)",
                          "• Can lose 50%+ fast",
                          "• No consumer protection",
                          "• Environmental concerns",
                          "• Regulatory uncertainty"
                        ]
                      }
                    ]
                  }
                ]
              },

              /* BITCOIN VOLATILITY EXAMPLE */
              {
                type: "div",
                props: { className: "bg-accent/50 p-4 rounded-lg" },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Real Example – Bitcoin Volatility:"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "• 2021: nearly $65,000\n",
                      "• 2022: crashed to ~$16,000\n",
                      "• 2024: back above $40,000\n",
                      "Crypto can rise and collapse unpredictably."
                    ]
                  }
                ]
              },

              /* CRYPTO GUIDELINES */
              {
                type: "div",
                props: {
                  className:
                    "border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-orange-950/20 p-4 rounded"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["If You're Considering Crypto:"]
                  },
                  {
                    type: "ul",
                    props: { className: "text-sm space-y-1" },
                    children: [
                      "✅ Only invest 5–10% max",
                      "✅ Use reputable exchanges",
                      "✅ Avoid social media hype",
                      "✅ Assume it could go to zero",
                      "✅ NEVER invest borrowed money"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * NFT SECTION
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
                  { type: "Image", props: { className: "h-5 w-5" } },
                  "NFTs (Non-Fungible Tokens)"
                ]
              },
              {
                type: "CardDescription",
                children: ["Digital certificates of ownership"]
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
                  "NFTs are digital certificates proving ownership of a specific digital item — usually art, collectibles, or music. Anyone can still view the image online, but only you have the blockchain certificate."
                ]
              },

              /* HOW NFTs WORK */
              {
                type: "div",
                props: {
                  className: "p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["How NFTs Work:"]
                  },
                  {
                    type: "ol",
                    props: { className: "text-sm space-y-1 list-decimal list-inside" },
                    children: [
                      "Artist creates digital artwork",
                      "They mint it as an NFT",
                      "You buy the NFT itself (not the artwork)",
                      "You own the certificate—NOT exclusive access"
                    ]
                  }
                ]
              },

              /* PROS + REALITY CHECK */
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["Claimed Benefits:"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Support artists directly",
                          "• Provable digital ownership",
                          "• Potential collectible value",
                          "• Access to exclusive communities"
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-red-700 dark:text-red-400 mb-2"
                        },
                        children: ["Reality Check:"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Most NFTs have dropped 90%+ in value",
                          "• Anyone can still copy the image",
                          "• Environmental impact concerns",
                          "• Many NFT projects were scams"
                        ]
                      }
                    ]
                  }
                ]
              },

              /* STUDENT REALITY */
              {
                type: "div",
                props: {
                  className:
                    "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                },
                children: [
                  {
                    type: "h4",
                    props: {
                      className: "font-semibold text-red-700 dark:text-red-400 mb-2"
                    },
                    children: ["Student Reality:"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "The NFT market peaked in 2021–2022. Many NFTs bought for thousands are now worthless. This is a classic bubble driven by hype, not value."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * OTHER NEW HIGH-RISK ASSETS
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
                  { type: "Zap", props: { className: "h-5 w-5" } },
                  "Other \"New\" Investments to Watch Out For"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "grid gap-3" },
                children: [
                  /* MEME COINS */
                  {
                    type: "div",
                    props: { className: "p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: { className: "flex items-center gap-2 mb-2" },
                        children: [
                          { type: "span", props: { className: "font-semibold" }, children: ["Meme Coins"] },
                          {
                            type: "Badge",
                            props: { variant: "destructive", className: "text-xs" },
                            children: ["High Risk"]
                          }
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children:
                          "Cryptocurrencies based on jokes (Dogecoin, Shiba Inu). Extremely volatile and speculative."
                      }
                    ]
                  },

                  /* DEFI */
                  {
                    type: "div",
                    props: { className: "p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: { className: "flex items-center gap-2 mb-2" },
                        children: [
                          { type: "span", props: { className: "font-semibold" }, children: ["DeFi (Decentralized Finance)"] },
                          {
                            type: "Badge",
                            props: { variant: "destructive", className: "text-xs" },
                            children: ["Very High Risk"]
                          }
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children:
                          "Complex crypto lending/borrowing systems. Many collapsed and caused total losses."
                      }
                    ]
                  },

                  /* SOCIAL MEDIA TIPS */
                  {
                    type: "div",
                    props: { className: "p-3 border rounded-lg" },
                    children: [
                      {
                        type: "div",
                        props: { className: "flex items-center gap-2 mb-2" },
                        children: [
                          { type: "span", props: { className: "font-semibold" }, children: ["Social Media \"Tips\""] },
                          {
                            type: "Badge",
                            props: { variant: "destructive", className: "text-xs" },
                            children: ["Scam Alert"]
                          }
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground" },
                        children:
                          "Influencers promoting “the next big thing.” Often pump-and-dump scams designed to steal money."
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
      * SMART STUDENT STRATEGY
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
                  { type: "Shield", props: { className: "h-5 w-5" } },
                  "Smart Student Strategy"
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
                  /* FOUNDATION FIRST */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-green-700 dark:text-green-400 mb-2"
                        },
                        children: ["Build Your Foundation First"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Emergency fund (3–6 months)",
                          "• Pay off high-interest debt",
                          "• Start with index funds",
                          "• Learn traditional investing"
                        ]
                      }
                    ]
                  },

                  /* EXPERIMENT SAFELY */
                  {
                    type: "div",
                    props: {
                      className:
                        "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className:
                            "font-semibold text-blue-700 dark:text-blue-400 mb-2"
                        },
                        children: ["Then, If You Want to Experiment"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Only risk up to 5%",
                          "• Use money you can lose entirely",
                          "• Research thoroughly",
                          "• Avoid social media hype"
                        ]
                      }
                    ]
                  }
                ]
              },

              /* BUFFETT TIP */
              {
                type: "div",
                props: {
                  className:
                    "bg-accent/50 p-4 rounded-lg border-l-4 border-primary"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Remember:"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Warren Buffett avoids crypto entirely. Instead, he invests in simple, proven businesses that provide real value."
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
      questions: [],
      passingScore: 0
    },

    relatedLessons: [],

    points: 100,
    difficultyLevel: "intermediate",
    timeEstimate: 3,
    order: 3,
    createdBy: "system"
  },

  {
    title: "Diversification Explained",
    description: "Learn why spreading investments reduces risk and increases stability.",
    categoryId: "investing-assets",
    topic: "diversification",

    visual: {
      icon: "PieChart",
      iconColor: "bg-purple-500",
      readTime: 2
    },

    uiTree: [

      /* ----------------------------------------------------
      * WHAT IS DIVERSIFICATION?
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [

          /* HEADER */
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                props: { className: "flex items-center gap-2" },
                children: [
                  { type: "Shield", props: { className: "h-5 w-5" } },
                  "What Is Diversification?"
                ]
              }
            ]
          },

          /* CONTENT */
          {
            type: "CardContent",
            props: { className: "space-y-4" },

            children: [
              {
                type: "p",
                children: [
                  "Diversification is spreading your investments across different types of assets, companies, and markets to reduce risk. It’s the investment world's version of “don’t put all your eggs in one basket.”"
                ]
              },

              /* ANALOGY BANNER */
              {
                type: "div",
                props: {
                  className: "bg-accent/50 p-4 rounded-lg"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Simple Analogy:"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "Imagine you're growing vegetables. If you only plant tomatoes and a disease hits, you lose everything. If you plant tomatoes, carrots, lettuce, and peppers, you still have other crops. That’s diversification!"
                    ]
                  }
                ]
              },

              /* NOT DIVERSIFIED / WELL DIVERSIFIED */
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [

                  /* NOT diversified */
                  {
                    type: "div",
                    props: {
                      className: "p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-red-700 dark:text-red-400 mb-2" },
                        children: ["❌ Not Diversified"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• All money in one company stock",
                          "• Only tech stocks",
                          "• Only UK investments",
                          "• All money in crypto"
                        ]
                      }
                    ]
                  },

                  /* WELL diversified */
                  {
                    type: "div",
                    props: {
                      className: "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-green-700 dark:text-green-400 mb-2" },
                        children: ["✅ Well Diversified"]
                      },
                      {
                        type: "ul",
                        props: { className: "text-sm space-y-1" },
                        children: [
                          "• Mix of stocks, bonds, real estate",
                          "• Different industries and company sizes",
                          "• Global investments (UK, US, emerging markets)",
                          "• Multiple asset classes"
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
      * TYPES OF DIVERSIFICATION
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
                  { type: "Target", props: { className: "h-5 w-5" } },
                  "Types of Diversification"
                ]
              }
            ]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [

              /* LIST OF 3 TYPES */
              {
                type: "div",
                props: { className: "space-y-4" },
                children: [

                  /* ASSET CLASS */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "PieChart", props: { className: "h-4 w-4 text-blue-500" } },
                          "Asset Class Diversification"
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground mb-2" },
                        children: ["Spread across different types of investments:"]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          "• Stocks: 60–80% (growth)",
                          "• Bonds: 15–30% (stability)",
                          "• Real estate: 5–15% (property exposure)",
                          "• Commodities: 0–10% (inflation hedge)"
                        ]
                      }
                    ]
                  },

                  /* GEOGRAPHIC */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "Globe", props: { className: "h-4 w-4 text-green-500" } },
                          "Geographic Diversification"
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground mb-2" },
                        children: ["Don’t invest in only one country:"]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          "• UK: 25–40%",
                          "• US: 30–50%",
                          "• Europe: 10–20%",
                          "• Emerging markets: 5–15%"
                        ]
                      }
                    ]
                  },

                  /* SECTOR */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: {
                          className: "font-semibold mb-2 flex items-center gap-2"
                        },
                        children: [
                          { type: "TrendingUp", props: { className: "h-4 w-4 text-purple-500" } },
                          "Sector Diversification"
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm text-muted-foreground mb-2" },
                        children: [
                          "Different industries perform differently:"
                        ]
                      },
                      {
                        type: "div",
                        props: { className: "text-xs space-y-1" },
                        children: [
                          "• Technology • Healthcare • Finance • Consumer goods",
                          "• Energy • Real estate • Utilities • Materials"
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
      * WHY DIVERSIFICATION WORKS
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [{ type: "CardTitle", children: ["Why Diversification Works"] }]
          },

          {
            type: "CardContent",
            props: { className: "space-y-4" },
            children: [

              {
                type: "div",
                props: { className: "grid gap-4" },
                children: [

                  /* RISK REDUCTION */
                  {
                    type: "div",
                    props: { className: "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Risk Reduction"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "When one investment goes down, others might stay stable or rise. This smooths your overall performance and reduces big losses."
                        ]
                      }
                    ]
                  },

                  /* OPPORTUNITY CAPTURE */
                  {
                    type: "div",
                    props: { className: "p-4 bg-green-50 dark:bg-green-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Capture Opportunities"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Different markets rise at different times. Being diversified allows you to benefit from growth wherever it happens."
                        ]
                      }
                    ]
                  },

                  /* STRESS REDUCTION */
                  {
                    type: "div",
                    props: { className: "p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Sleep Better"] },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "If your portfolio doesn't depend on one risky bet, investing becomes less stressful and more sustainable."
                        ]
                      }
                    ]
                  }
                ]
              },

              /* REAL EXAMPLE */
              {
                type: "div",
                props: {
                  className: "bg-accent/50 p-4 rounded-lg border-l-4 border-primary"
                },
                children: [
                  {
                    type: "h4",
                    props: { className: "font-semibold mb-2" },
                    children: ["Real Example:"]
                  },
                  {
                    type: "p",
                    props: { className: "text-sm" },
                    children: [
                      "In 2022, tech stocks fell ~30% while energy stocks rose ~65%. Diversification helped offset losses and stabilize returns."
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ----------------------------------------------------
      * COMMON MISTAKES
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
                  "Common Diversification Mistakes"
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
                props: { className: "space-y-3" },
                children: [

                  {
                    type: "div",
                    props: {
                      className:
                        "p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-red-700 dark:text-red-400 mb-1" },
                        children: ["False Diversification"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Buying 10 tech stocks is NOT diversified — they all move together when tech falls."
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: {
                      className:
                        "p-3 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-orange-700 dark:text-orange-400 mb-1" },
                        children: ["Over-Diversification"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: ["Owning 100+ stocks is messy and unnecessary. Funds simplify everything."]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: {
                      className:
                        "p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800"
                    },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold text-yellow-700 dark:text-yellow-400 mb-1" },
                        children: ["Home Country Bias"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Only investing in the UK means missing global growth."
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
      * EASY DIVERSIFICATION FOR STUDENTS
      * ---------------------------------------------------- */
      {
        type: "Card",
        children: [

          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: ["Easy Diversification for Students"] },
              { type: "CardDescription", children: ["Simple ways to diversify effectively"] }
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

                  /* GLOBAL INDEX FUND */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg bg-primary/5" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["🌟 Best for Beginners: Global Index Fund"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm mb-2" },
                        children: [
                          "One fund that holds stocks from around the world. Instant diversification across:"
                        ]
                      },
                      {
                        type: "ul",
                        props: { className: "text-xs space-y-1 ml-4" },
                        children: [
                          "• Thousands of companies",
                          "• Multiple countries",
                          "• Different sectors",
                          "• Various company sizes"
                        ]
                      },
                      {
                        type: "p",
                        props: { className: "text-xs text-muted-foreground mt-2" },
                        children: [
                          "Examples: Vanguard All-World ETF, iShares MSCI World"
                        ]
                      }
                    ]
                  },

                  /* THREE FUND PORTFOLIO */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["📈 Next Level: Three-Fund Portfolio"]
                      },

                      {
                        type: "div",
                        props: { className: "space-y-2" },
                        children: [
                          {
                            type: "div",
                            props: {
                              className:
                                "flex justify-between items-center p-2 bg-accent/30 rounded"
                            },
                            children: [
                              { type: "span", props: { className: "text-sm" }, children: ["Global stocks fund"] },
                              { type: "Badge", props: { variant: "outline" }, children: ["70%"] }
                            ]
                          },

                          {
                            type: "div",
                            props: {
                              className:
                                "flex justify-between items-center p-2 bg-accent/30 rounded"
                            },
                            children: [
                              { type: "span", props: { className: "text-sm" }, children: ["Government bonds fund"] },
                              { type: "Badge", props: { variant: "outline" }, children: ["20%"] }
                            ]
                          },

                          {
                            type: "div",
                            props: {
                              className:
                                "flex justify-between items-center p-2 bg-accent/30 rounded"
                            },
                            children: [
                              { type: "span", props: { className: "text-sm" }, children: ["Property/REIT fund"] },
                              { type: "Badge", props: { variant: "outline" }, children: ["10%"] }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* TARGET DATE FUNDS */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      {
                        type: "h4",
                        props: { className: "font-semibold mb-2" },
                        children: ["💼 Advanced: Target Date Funds"]
                      },
                      {
                        type: "p",
                        props: { className: "text-sm" },
                        children: [
                          "Choose a fund based on your retirement year (e.g., 2060). It automatically shifts your diversification over time, becoming more stable as you age."
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
    difficultyLevel: "intermediate",
    timeEstimate: 2,
    order: 4,
    createdBy: "system"
  }
  
];

// =====================================================
// Seed Function
// =====================================================
async function seedInvestingAssets() {
  try {
    for (const module of investingAssetsModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
    }
    console.log("✅ Investing & Assets modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Investing & Assets:", error);
  }
}

module.exports = {
  investingAssetsModules,
  seedInvestingAssets,
};
