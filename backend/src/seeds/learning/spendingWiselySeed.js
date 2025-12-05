// backend/src/seeds/learning/spendingWiselySeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Spending Wisely — Learning Modules
 * Category ID: spending-wisely
 *
 * Currently seeds:
 * 1. How to Spot Good Value
 * 2. Avoiding Scams & Fraud
 * 3. Using Buy Now Pay Later & Credit Cards Safely
 * 4. Cost of Living: Student Perspective
 */

const spendingWiselyModules = [
  // How to Spot Good Value
  {
    title: "How to Spot Good Value",
    description: "Unit pricing, brands vs own-label",
    categoryId: "spending-wisely",
    topic: "how-to-spot-good-value",
    createdBy: "system",

    visual: {
      icon: "ShoppingCart",
      iconColor: "bg-orange-500",
      badge: "Beginner Friendly",
      readTime: 2
    },

    difficultyLevel: "beginner",
    timeEstimate: 5,
    points: 120,
    order: 1,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [
          /* ------------------------------------
            CARD 1 — Unit Pricing
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
                      { "type": "Calculator", "props": { "className": "h-7 w-7" } },
                      "Unit Pricing: Your Secret Weapon"
                    ]
                  }
                ]
              },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "p",
                        "props": { "className": "text-lg" },
                        "children": [
                          "Unit pricing tells you the cost per gram, liter, or item. It's the easiest way to compare value between different brands and sizes."
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "bg-primary/10 p-6 rounded-lg" },
                        "children": [
                          {
                            "type": "h3",
                            "props": { "className": "text-xl font-bold mb-3" },
                            "children": ["Real Example: Pasta"]
                          },
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-2 gap-4" },
                            "children": [
                              {
                                "type": "div",
                                "props": { "className": "bg-white p-4 rounded border" },
                                "children": [
                                  {
                                    "type": "h4",
                                    "props": { "className": "font-semibold text-blue-600" },
                                    "children": ["Brand A Pasta"]
                                  },
                                  "500g for £2.50",
                                  {
                                    "type": "p",
                                    "props": { "className": "text-sm text-muted-foreground" },
                                    "children": ["Unit price: £5.00 per kg"]
                                  }
                                ]
                              },
                              {
                                "type": "div",
                                "props": { "className": "bg-white p-4 rounded border border-green-500" },
                                "children": [
                                  {
                                    "type": "h4",
                                    "props": { "className": "font-semibold text-green-600" },
                                    "children": ["Brand B Pasta"]
                                  },
                                  "750g for £3.00",
                                  {
                                    "type": "p",
                                    "props": { "className": "text-sm text-green-600 font-medium" },
                                    "children": ["Unit price: £4.00 per kg ✓ BETTER VALUE"]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "type": "p",
                            "props": { "className": "mt-3 text-sm text-black" },
                            "children": ["Brand B is 20% cheaper per kg, even though it costs more upfront!"]
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
            CARD 2 — Brands vs Own Label
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Brands vs Own-Label: The Truth"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-6" },
                        "children": [
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "h4",
                                "props": { "className": "font-semibold text-blue-600 mb-3" },
                                "children": ["🏷️ Branded Products"]
                              },
                              {
                                "type": "ul",
                                "props": {
                                  "className": "space-y-2 text-sm pl-4",
                                  "style": { "list-style": "disc" }
                                },
                                "children": [
                                  { "type": "li", "children": ["Premium pricing for marketing"] },
                                  { "type": "li", "children": ["Often same ingredients as own-label"] },
                                  { "type": "li", "children": ["Better packaging and presentation"] },
                                  { "type": "li", "children": ["Sometimes genuinely better quality"] },
                                  { "type": "li", "children": ["Strong brand reputation"] }
                                ]
                              }
                            ]
                          },
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "h4",
                                "props": { "className": "font-semibold text-green-600 mb-3" },
                                "children": ["🏪 Own-Label Products"]
                              },
                              {
                                "type": "ul",
                                "props": {
                                  "className": "space-y-2 text-sm pl-4",
                                  "style": { "list-style": "disc" }
                                },
                                "children": [
                                  { "type": "li", "children": ["30–50% cheaper on average"] },
                                  { "type": "li", "children": ["Often made by same manufacturers"] },
                                  { "type": "li", "children": ["Basic but functional packaging"] },
                                  { "type": "li", "children": ["Quality controlled by supermarket"] },
                                  { "type": "li", "children": ["Great for everyday items"] }
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
                            "children": ["💡 Smart Shopping Strategy:"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4", "style": { "list-style": "disc" } },
                            "children": [
                              { "type": "li", "children": ["Try own-label first for basics (pasta, rice, cleaning products)"] },
                              { "type": "li", "children": ["Stick to brands for items where quality matters to you"] },
                              { "type": "li", "children": ["Check if products are made by the same manufacturer"] },
                              { "type": "li", "children": ["Look for supermarket premium ranges for middle ground"] }
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
            CARD 3 — Comparison Shopping
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Smart Comparison Shopping"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold text-blue-600 mb-2" },
                            "children": ["📱 Use Apps & Websites"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4", "style": { "listStyle": "disc" } },
                            "children": [
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Honey:"] },
                                  " Finds discount codes"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["PriceGrabber:"] },
                                  " Compares prices"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["ShopSavvy:"] },
                                  " Barcode scanning"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Store apps:"] },
                                  " Tesco, ASDA, Sainsbury’s promotions"
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold text-green-600 mb-2" },
                            "children": ["🕒 Timing is Everything"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4", "style": { "listStyle": "disc" } },
                            "children": [
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Yellow stickers:"] },
                                  " End-of-day reductions"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Seasonal sales:"] },
                                  " Christmas, Black Friday"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Weekly cycles:"] },
                                  " New deals Wed/Thu"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["End of month:"] },
                                  " Furniture & car deals"
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold text-purple-600 mb-2" },
                            "children": ["🔍 Hidden Costs to Watch"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4", "style": { "listStyle": "disc" } },
                            "children": [
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Delivery fees:"] },
                                  " Adds up quickly at checkout"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Membership costs:"] },
                                  " Amazon Prime, Costco"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Overpriced insurance/warranties:"] },
                                  " Often unnecessary extras"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Installation fees:"] },
                                  " Ask if DIY is an option"
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
            CARD 4 — Value Traps
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Avoid These \"Value\" Traps"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "bg-red-50 border-l-4 border-red-400 p-4" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold text-red-700 mb-2" },
                            "children": ["❌ False Economy Examples:"]
                          },
                          {
                            "type": "ul",
                            "props": {
                              "className": "space-y-2 text-sm list-disc pl-4"
                            },
                            "children": [
                              { "type": "li", "children": ["Buying cheap shoes that fall apart in 3 months"] },
                              { "type": "li", "children": ["\"Free\" delivery that requires minimum spend you don't need"] },
                              { "type": "li", "children": ["Bulk buying perishables that go off before you use them"] },
                              { "type": "li", "children": ["Choosing cheapest phone contract with hidden charges"] },
                              { "type": "li", "children": ["Store credit cards with high interest rates for \"instant discount\""] }
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
                              {
                                "type": "h4",
                                "props": { "className": "font-semibold text-green-600 mb-2" },
                                "children": ["✅ True Value Indicators"]
                              },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-1 text-sm list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Good reviews from real customers"] },
                                  { "type": "li", "children": ["Warranty/guarantee included"] },
                                  { "type": "li", "children": ["Low cost per use over time"] },
                                  { "type": "li", "children": ["Serves multiple purposes"] },
                                  { "type": "li", "children": ["Durable materials and construction"] }
                                ]
                              }
                            ]
                          },
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "h4",
                                "props": { "className": "font-semibold text-orange-600 mb-2" },
                                "children": ["⚠️ Red Flags"]
                              },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-1 text-sm list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["\"Limited time\" pressure tactics"] },
                                  { "type": "li", "children": ["No clear return policy"] },
                                  { "type": "li", "children": ["Prices seem too good to be true"] },
                                  { "type": "li", "children": ["Hidden fees in small print"] },
                                  { "type": "li", "children": ["Pushy sales tactics"] }
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
            CARD 5 — Action Plan
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Become a Smart Shopper"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "bg-green-50 p-6 rounded-lg border border-green-100" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-lg mb-3" }, "children": ["Action Plan:"] },
                      {
                        "type": "ol",
                        "props": { "className": "list-decimal list-inside space-y-2 text-base" },
                        "children": [
                          { "type": "li", "children": ["Download price comparison apps"] },
                          { "type": "li", "children": ["Try own-label alternatives for your regular shopping"] },
                          { "type": "li", "children": ["Calculate unit prices for your weekly shop"] },
                          { "type": "li", "children": ["Set price alerts for expensive items you want"] },
                          { "type": "li", "children": ["Track your savings over a month"] }
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

    /* ------------------------------------
      QUIZ (converted from your Mini Quiz)
    ------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What’s the best way to compare value between different sized products?",
          options: [
            "Unit pricing",
            "Total price",
            "Brand reputation",
            "Package size"
          ],
          correctAnswer: 0,
          explanation: "Unit pricing tells you cost per gram/litre/item and is the most accurate comparison method."
        }
      ]
    },

    /* ------------------------------------
      RELATED LESSONS
    ------------------------------------ */
    relatedLessons: [
      {
        moduleId: "avoiding-scams",
        title: "Avoiding Scams",
        relationship: "next-step"
      },
      {
        moduleId: "cost-of-living",
        title: "Cost of Living Guide",
        relationship: "related"
      }
    ]
  },

  // Avoiding Scams & Fraud
  {
    title: "Avoiding Scams & Fraud",
    description: "Protecting yourself from financial fraud",
    categoryId: "spending-wisely",
    topic: "avoiding-scams",
    createdBy: "system",

    visual: {
      icon: "Shield",
      iconColor: "bg-orange-500",
      badge: "Beginner Friendly",
      readTime: 3
    },

    difficultyLevel: "beginner",
    timeEstimate: 7,
    points: 150,
    order: 2,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [

          /* ------------------------------------
              CARD 1 — Common Online Scams
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
                      { "type": "AlertTriangle", "props": { "className": "h-5 w-5" } },
                      "Common Online Scams Targeting Students"
                    ]
                  }
                ]
              },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["🎓 Student Loan Scams"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"Get your student loan forgiven instantly for just £99!\""] },
                          {
                            "type": "div",
                            "props": { "className": "text-xs text-red-600" },
                            "children": [
                              { "type": "span", "props": { "className": "font-semibold" }, "children": ["Reality"] },
                              ": Legitimate loan forgiveness is free and takes time. No quick fixes exist."
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["💼 Fake Job Offers"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"Work from home, earn £500/week, no experience needed!\""] },
                          {
                            "type": "div",
                            "props": { "className": "text-xs text-red-600" },
                            
                            "children": [
                              { "type": "span", "props": { "className": "font-semibold" }, "children": ["Red flags"] },
                              ": Asking for money upfront, vague job descriptions, guaranteed high pay."
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["📱 Phone/Text Scams"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"Your bank account is compromised. Click here to secure it now!\""] },
                          { "type": "div", "props": { "className": "text-xs text-red-600" }, "children": [
                            { "type": "span", "props": { "className": "font-semibold" }, "children": ["Truth"] },
                             ": Banks never ask for passwords via text. Always call them directly."
                            ] 
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["🛒 Fake Shopping Sites"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"Brand new iPhone for just £200 - limited time offer!\""] },
                          { "type": "div", "props": { "className": "text-xs text-red-600" }, "children": [
                            { "type": "span", "props": { "className": "font-semibold" }, "children": ["Warning"] }, 
                            ": If prices seem too good to be true, they usually are."
                          ] }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },


          /* ------------------------------------
              CARD 2 — How to Spot a Scam
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["How to Spot a Scam"] }] },

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
                          { "type": "h4", "props": { "className": "font-semibold text-red-600 mb-3" }, "children": ["🚨 Major Red Flags:"] },
                          {
                            "type": "ul",
                            "props": { "className": "space-y-2 text-sm pl-4 list-disc" },
                            "children": [
                              { "type": "li", "children": ["Asks for money or personal info upfront"] },
                              { "type": "li", "children": ["Promises guaranteed returns or instant results"] },
                              { "type": "li", "children": ["Creates false urgency (\"limited time only!\")"] },
                              { "type": "li", "children": ["Poor spelling, grammar, or unprofessional design"] },
                              { "type": "li", "children": ["No physical address or contact information"] },
                              { "type": "li", "children": ["Pressure to \"act now\" or \"don't tell anyone\""] },
                              { "type": "li", "children": ["Requests unusual payment methods (gift cards, crypto)"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-green-600 mb-3" }, "children": ["✅ Legitimate Signs:"] },
                          {
                            "type": "ul",
                            "props": { "className": "space-y-2 text-sm pl-4 list-disc" },
                            "children": [
                              { "type": "li", "children": ["Clear contact information and address"] },
                              { "type": "li", "children": ["Professional website with proper security"] },
                              { "type": "li", "children": ["Realistic promises and expectations"] },
                              { "type": "li", "children": ["Good reviews from multiple sources"] },
                              { "type": "li", "children": ["Accepts secure payment methods"] },
                              { "type": "li", "children": ["Clear terms and conditions"] },
                              { "type": "li", "children": ["No pressure to decide immediately"] }
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
              CARD 3 — Social Media Scams
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Social Media & Influencer Scams"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "bg-yellow-50 border-l-4 border-yellow-400 p-4" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-yellow-700 mb-2" }, "children": ["⚠️ Instagram/TikTok Scams"] },
                          {
                            "type": "ul",
                            "props": { "className": "space-y-1 text-sm pl-4 list-disc" },
                            "children": [
                              { "type": "li", "children": ["Fake crypto investment schemes promoted by influencers"] },
                              { "type": "li", "children": ["\"Get rich quick\" courses that teach nothing useful"] },
                              { "type": "li", "children": ["Pyramid schemes disguised as business opportunities"] },
                              { "type": "li", "children": ["Fake designer goods at \"wholesale prices\""] }
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
                            "props": { "className": "p-4 bg-blue-50 rounded" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-blue-700 mb-2" }, "children": ["📸 How to Check Influencers:"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Look for #ad or #sponsored tags"] },
                                  { "type": "li", "children": ["Check if they actually use the product"] },
                                  { "type": "li", "children": ["See if they promote too many random products"] },
                                  { "type": "li", "children": ["Look for genuine engagement, not just follower count"] }
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-purple-50 rounded" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-purple-700 mb-2" }, "children": ["🔍 Research Before Buying:"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Google the company + \"scam\" or \"review\""] },
                                  { "type": "li", "children": ["Check Trustpilot and Google Reviews"] },
                                  { "type": "li", "children": ["Look for complaints on Reddit or forums"] },
                                  { "type": "li", "children": ["Verify business registration details"] }
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
              CARD 4 — Protection Strategies
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Protect Yourself: Smart Strategies"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-green-600 mb-2" }, "children": ["🛡️ Online Shopping Safety"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Only shop on secure sites (look for padlock icon and https://)"] },
                              { "type": "li", "children": ["Use credit cards instead of debit cards (better fraud protection)"] },
                              { "type": "li", "children": ["Never save payment details on unknown websites"] },
                              { "type": "li", "children": ["Check return policy before buying"] },
                              { "type": "li", "children": ["Use PayPal or Apple Pay when possible"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-blue-600 mb-2" }, "children": ["📧 Email & Phone Safety"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4 list-disc" },
                            "children": [
                              { "type": "li", "children": ["Never click links in suspicious emails"] },
                              { "type": "li", "children": ["Banks never ask for passwords via email or text"] },
                              { "type": "li", "children": ["When unsure, call the company directly"] },
                              { "type": "li", "children": ["Don't answer calls from unknown numbers"] },
                              { "type": "li", "children": ["Be wary of messages that try to create urgency"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-purple-600 mb-2" }, "children": ["💳 Financial Protection"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4 list-disc" },
                            "children": [
                              { "type": "li", "children": ["Set up account alerts for all transactions"] },
                              { "type": "li", "children": ["Check bank statements weekly"] },
                              { "type": "li", "children": ["Never give out your full card details over phone"] },
                              { "type": "li", "children": ["Use different passwords for financial accounts"] },
                              { "type": "li", "children": ["Enable two-factor authentication"] }
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
              CARD 5 — What to Do if Scammed
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Been Scammed? Act Fast!"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "bg-red-50 p-4 rounded-lg mb-4" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["🚨 Immediate Actions (First 24 Hours):"] },
                      {
                        "type": "ol",
                        "props": { "className": "space-y-1 text-sm list-decimal list-inside" },
                        "children": [
                          { "type": "li", "children": ["Contact your bank/credit card company immediately"] },
                          { "type": "li", "children": ["Report to Action Fraud (0300 123 2040)"] },
                          { "type": "li", "children": ["Change passwords on affected accounts"] },
                          { "type": "li", "children": ["Take screenshots of everything"] },
                          { "type": "li", "children": ["Report to the platform where you found the scammer"] }
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
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["📞 Key Numbers:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4 list-disc" },
                            "children": [
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Action Fraud"] },
                                  ": 0300 123 2040"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Citizens Advice"] },
                                  ": 0808 223 1133"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Financial Ombudsman"] },
                                  ": 0300 123 9123"
                                ]
                              },
                              {
                                "type": "li",
                                "children": [
                                  { "type": "strong", "children": ["Your bank's fraud line"] },
                                  ": usually 24/7"
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["💡 Prevention for Next Time:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 pl-4 list-disc" },
                            "children": [
                              { "type": "li", "children": ["Trust your instincts - if it feels wrong, it probably is"] },
                              { "type": "li", "children": ["Research before buying anything expensive"] },
                              { "type": "li", "children": ["Never rush financial decisions"] },
                              { "type": "li", "children": ["Keep learning about new scam techniques"] }
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
              CARD 6 — Stay Safe Online
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Stay Safe Online"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "bg-green-50 border border-green-100 p-6 rounded-xl" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-lg mb-4" }, "children": ["Your Security Checklist:"] },
                      {
                        "type": "ul",
                        "props": { "className": "list-disc space-y-3 text-base text-gray-900 pl-4" },
                        "children": [
                          {
                            "type": "li",
                            "children": ["Set up fraud alerts on all bank accounts"]
                          },
                          {
                            "type": "li",
                            "children": ["Enable two-factor authentication on important accounts"]
                          },
                          {
                            "type": "li",
                            "children": ["Create a separate email for online shopping"]
                          },
                          {
                            "type": "li",
                            "children": ["Learn about the latest scam techniques"]
                          },
                          {
                            "type": "li",
                            "children": ["Share this knowledge with friends and family"]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },


        ]
      }
    ],

    /* ------------------------------------
      QUIZ (converted from your React quiz)
    ------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What’s the biggest red flag when shopping online?",
          options: [
            "No contact information",
            "Prices too good to be true",
            "Poor website design",
            "Only accepts cash"
          ],
          correctAnswer: 1,
          explanation: "Prices that are too good to be true are the strongest indicator of a scam."
        }
      ]
    },

    /* ------------------------------------
      RELATED LESSONS
    ------------------------------------ */
    relatedLessons: [
      {
        moduleId: "good-value",
        title: "How to Spot Good Value",
        relationship: "related"
      },
      {
        moduleId: "credit-cards-safely",
        title: "Using Credit Cards Safely",
        relationship: "next-step"
      }
    ]
  },
  
  // Using Buy Now Pay Later & Credit Cards Safely
  {
    title: "Using Buy Now Pay Later & Credit Cards Safely",
    description: "Benefits and risks explained",
    categoryId: "spending-wisely",
    topic: "credit-cards-safely",
    createdBy: "system",

    visual: {
      icon: "CreditCard",
      iconColor: "bg-orange-500",
      badge: "Beginner Friendly",
      readTime: 3
    },

    difficultyLevel: "beginner",
    timeEstimate: 8,
    points: 150,
    order: 3,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [

          /* -------------------------------
              CARD 1 — Buy Now Pay Later
          ------------------------------- */
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
                      { "type": "ShoppingBag", "props": { "className": "h-5 w-5" }},
                      "Buy Now Pay Later (BNPL): The Good and Bad"
                    ]
                  }
                ]
              },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "p",
                        "props": { "className": "text-lg" },
                        "children": [
                          "BNPL services like Klarna, Clearpay, and PayPal Pay in 3 let you split purchases into installments. They can be helpful, but they're not risk-free."
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-6" },
                        "children": [
                          {
                            "type": "div",
                            "props": { "className": "bg-green-50 p-4 rounded-lg border border-green-200" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-green-700 mb-3" }, "children": ["✅ Benefits:"] },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-2 text-sm list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["No interest if you pay on time"] },
                                  { "type": "li", "children": ["Helps manage cash flow for planned purchases"] },
                                  { "type": "li", "children": ["Easier approval than credit cards"] },
                                  { "type": "li", "children": ["Can build payment history"] },
                                  { "type": "li", "children": ["Sometimes offers buyer protection"] }
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "bg-red-50 p-4 rounded-lg border border-red-200" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-3" }, "children": ["❌ Risks:"] },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-2 text-sm list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Late fees can be expensive (£6-12 per missed payment)"] },
                                  { "type": "li", "children": ["Can hurt your credit score if you miss payments"] },
                                  { "type": "li", "children": ["Easy to overspend and lose track"] },
                                  { "type": "li", "children": ["Multiple BNPL apps can lead to debt spiral"] },
                                  { "type": "li", "children": ["No legal protection like credit cards"] }
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "bg-yellow-50 border-l-4 border-yellow-400 p-4" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-yellow-700 mb-2" }, "children": ["⚠️ Real Student Example:"] },
                          {
                            "type": "p",
                            "props": { "className": "text-sm" },
                            "children": [
                              "\"I bought clothes worth £300 across 3 different BNPL apps. With payments spread out, I forgot about some and got hit with £36 in late fees. What seemed like 'free money' ended up costing me extra and stressing me out during exams!\""
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


          /* -------------------------------
              CARD 2 — BNPL Best Practices
          ------------------------------- */
          {
            "type": "Card",
            "children": [
              {
                "type": "CardHeader",
                "children": [{ "type": "CardTitle", "children": ["BNPL Best Practices"] }]
              },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-blue-600 mb-2" }, "children": ["📱 Smart Usage Tips:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Only use for planned purchases you can afford"] },
                              { "type": "li", "children": ["Set up automatic payments to avoid late fees"] },
                              { "type": "li", "children": ["Use only ONE BNPL service at a time"] },
                              { "type": "li", "children": ["Keep a budget tracker for all your payments"] },
                              { "type": "li", "children": ["Never use BNPL for groceries or bills"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-green-600 mb-2" }, "children": ["💡 When BNPL Makes Sense:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Essential items (e.g., uni laptop)"] },
                              { "type": "li", "children": ["Guaranteed income coming in"] },
                              { "type": "li", "children": ["Items you planned to buy anyway"] },
                              { "type": "li", "children": ["Fits your monthly budget"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-600 mb-2" }, "children": ["🚫 Avoid BNPL For:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Impulse purchases"] },
                              { "type": "li", "children": ["Items you can't afford even in installments"] },
                              { "type": "li", "children": ["Groceries, bills, or everyday expenses"] },
                              { "type": "li", "children": ["When you already have other BNPL payments due"] }
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


          /* -------------------------------
              CARD 3 — Credit Cards
          ------------------------------- */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Credit Cards: Use Them Right"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "p",
                        "children": [
                          "Credit cards can be powerful financial tools when used correctly. They offer better protection than debit cards and can help build your credit score."
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-6" },
                        "children": [

                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-green-600 mb-3" }, "children": ["✅ Credit Card Benefits:"] },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-2 text-sm list-disc pl-4" },
                                "children": [
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Section 75 protection:"] },
                                      " Bank liable for purchases £100-£30,000"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Fraud protection:"] },
                                      " Better than debit cards"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Build credit history:"] },
                                      " Helps future loans/mortgages"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Cashback/rewards:"] },
                                      " Earn while you spend"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Purchase protection:"] },
                                      " Insurance on big purchases"
                                    ]
                                  }
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-red-600 mb-3" }, "children": ["❌ Credit Card Dangers:"] },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-2 text-sm list-disc pl-4" },
                                "children": [
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["High interest:"] },
                                      " Often 18-29% APR"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Minimum payment trap:"] },
                                      " Takes decades to clear debt"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Easy overspending:"] },
                                      " Doesn't feel like real money"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Credit score damage:"] },
                                      " If you miss payments"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "strong", "children": ["Fees:"] },
                                      " Late payments, cash advances, overseas"
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
            ]
          },


          /* -------------------------------
              CARD 4 — Credit Card Golden Rules
          ------------------------------- */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Credit Card Golden Rules"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [

                      {
                        "type": "div",
                        "props": { "className": "bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-xl font-bold mb-4" }, "children": ["The #1 Rule: Pay in Full Every Month"] },
                          {
                            "type": "p",
                            "children": [
                              "If you can't afford to pay off your credit card in full each month, you can't afford what you're buying.",
                              "Period"
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "bg-white p-4 rounded border mt-4" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Example: Why Minimum Payments Are a Trap"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Credit card debt: £1,000"] },
                                  { "type": "li", "children": ["Interest rate: 22% APR"] },
                                  { "type": "li", "children": ["Minimum payment: £25/month"] },
                                  { "type": "li", "props": { "className": "text-red-600" }, "children": ["Time to pay off: 4 years 6 months"] },
                                  { "type": "li", "props": { "className": "text-red-600" }, "children": ["Total interest paid: £347"] }
                                ]
                              }
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
                            "props": { "className": "p-4 bg-blue-50 rounded" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-blue-700 mb-2" }, "children": ["💳 Smart Usage:"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Use for planned expenses only"] },
                                  { "type": "li", "children": ["Set up direct debit for full amount"] },
                                  { "type": "li", "children": ["Track spending with bank app"] },
                                  { "type": "li", "children": ["Never use for cash advances"] },
                                  { "type": "li", "children": ["Keep utilization under 30% of limit"] }
                                ]
                              }
                            ]
                          },
                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-green-50 rounded" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-green-700 mb-2" }, "children": ["🏆 Pro Tips:"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Start with a low limit (£300-500)"] },
                                  { "type": "li", "children": ["Choose cards with no annual fee"] },
                                  { "type": "li", "children": ["Use for big purchases for Section 75 protection"] },
                                  { "type": "li", "children": ["Pay before statement date to show 0% utilization"] },
                                  { "type": "li", "children": ["Never lend your card to anyone"] }
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


          /* -------------------------------
              CARD 5 — Student Credit Cards
          ------------------------------- */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Best Student Credit Cards (2024)"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-blue-600" }, "children": ["🏦 Barclaycard Forward"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm mt-2 space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["25.9% APR (representative)"] },
                              { "type": "li", "children": ["No annual fee"] },
                              { "type": "li", "children": ["£1,200 typical initial limit"] },
                              { "type": "li", "children": ["Good for building credit history"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-green-600" }, "children": ["🏦 Halifax Clarity"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm mt-2 space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["No foreign transaction fees"] },
                              { "type": "li", "children": ["Great for travel"] },
                              { "type": "li", "children": ["22.9% APR (representative)"] },
                              { "type": "li", "children": ["No annual fee"] }
                            ]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-purple-600" }, "children": ["🏦 Aqua Classic"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm mt-2 space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Designed for limited credit history"] },
                              { "type": "li", "children": ["34.9% APR (high, so pay in full!)"] },
                              { "type": "li", "children": ["Easier acceptance criteria"] },
                              { "type": "li", "children": ["Good stepping stone card"] }
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
            CARD 6 — Action Plan
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Your Action Plan"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "bg-green-50 p-6 rounded-lg border border-green-100" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-lg mb-3" }, "children": ["Smart Credit Steps:"] },
                      {
                        "type": "ol",
                        "props": { "className": "list-decimal list-inside space-y-2 text-base" },
                        "children": [
                          { "type": "li", "children": ["If using BNPL, limit to ONE service and set up auto-payments"] },
                          { "type": "li", "children": ["Research student credit cards and apply for one with no annual fee"] },
                          { "type": "li", "children": ["Set up direct debit for FULL amount (not minimum)"] },
                          { "type": "li", "children": ["Use credit card for planned purchases only"] },
                          { "type": "li", "children": ["Monitor your credit score monthly (free apps available)"] }
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

    /* -------------------------------
        QUIZ
    ------------------------------- */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What’s the best way to use a credit card?",
          options: [
            "Pay the minimum amount",
            "Pay the full amount every month",
            "Use it for everything",
            "Keep a high balance"
          ],
          correctAnswer: 1,
          explanation: "Paying in full every month avoids interest and builds strong credit history."
        }
      ]
    },

    /* -------------------------------
        RELATED LESSONS
    ------------------------------- */
    relatedLessons: [
      {
        moduleId: "credit-scores",
        title: "Understanding Credit Scores",
        relationship: "next-step"
      },
      {
        moduleId: "good-value",
        title: "How to Spot Good Value",
        relationship: "related"
      },
      {
        moduleId: "good-vs-bad-debt",
        title: "Good vs Bad Debt",
        relationship: "related"
      }
    ]
  },

  // Cost of Living: Student Perspective
  {
    title: "Cost of Living: Student Perspective",
    description: "Rent, food, transport and budgeting",
    categoryId: "spending-wisely",
    topic: "cost-of-living",
    createdBy: "system",

    visual: {
      icon: "Home",
      iconColor: "bg-orange-500",
      readTime: 3,
      badge: "Beginner Friendly"
    },

    difficultyLevel: "beginner",
    timeEstimate: 10,
    points: 180,
    order: 4,

    uiTree: [
      {
        "type": "div",
        "props": { "className": "grid gap-6" },
        "children": [

          /* ------------------------------------------------
              CARD 1 — Student Cost Breakdown
          ------------------------------------------------ */
          {
            "type": "Card",
            "children": [
              {
                "type": "CardHeader",
                "children": [
                  { "type": "CardTitle", "children": ["Real Student Living Costs (2024)"] },
                  { "type": "CardDescription", "children": ["Based on surveys of UK students"] }
                ]
              },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": { "className": "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg" },
                        "children": [
                          { "type": "h3", "props": { "className": "text-xl font-bold mb-4" }, "children": ["Average Monthly Student Budget"] },
                          
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-2 gap-6" },
                            "children": [

                              /* Left column */
                              {
                                "type": "div",
                                "props": { "className": "space-y-3" },
                                "children": [
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["🏠 Rent & Bills"] },
                                      { "type": "span", "props": { "className": "font-bold text-red-600" }, "children": ["£400–600"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["🍕 Food & Groceries"] },
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["£150–200"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["🚌 Transport"] },
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["£50–80"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["📚 Study Materials"] },
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["£30–50"] }
                                    ]
                                  }
                                ]
                              },

                              /* Right column */
                              {
                                "type": "div",
                                "props": { "className": "space-y-3" },
                                "children": [
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["👕 Clothes"] },
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["£30–60"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["🎉 Social/Entertainment"] },
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["£80–120"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["📱 Phone & Internet"] },
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["£25–40"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-green-100 rounded border border-green-500" },
                                    "children": [
                                      { "type": "span", "props": { "className": "font-bold" }, "children": ["💰 Total"] },
                                      { "type": "span", "props": { "className": "font-bold text-green-700" }, "children": ["£765–1,150"] }
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
            ]
          },


          /* ------------------------------------------------
              CARD 2 — Regional Differences
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
                      { "type": "MapPin", "props": { "className": "h-5 w-5" }},
                      "Location Makes a Huge Difference"
                    ]
                  }
                ]
              },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [

                      /* Three columns: expensive / moderate / affordable */
                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-3 gap-4" },
                        "children": [

                          /* Expensive */
                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-red-50 rounded-lg border border-red-200" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["💸 Most Expensive"] },
                              {
                                "type": "ul",
                                "props": { "className": "list-inside space-y-1 text-sm" },
                                "children": [
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["London"] },
                                      ": £1,200–1,800/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Cambridge"] },
                                      ": £1,000–1,400/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Oxford"] },
                                      ": £1,000–1,400/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Brighton"] },
                                      ": £900–1,300/month"
                                    ]
                                  }
                                ]
                              }
                            ]
                          },

                          /* Moderate */
                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-yellow-50 rounded-lg border border-yellow-200" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-yellow-700 mb-2" }, "children": ["💰 Moderate"] },
                              {
                                "type": "ul",
                                "props": { "className": "pl-5 space-y-1 text-sm" },
                                "children": [
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Manchester"] },
                                      ": £700–1,000/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Birmingham"] },
                                      ": £650–950/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Leeds"] },
                                      ": £600–900/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Bristol"] },
                                      ": £700–1,000/month"
                                    ]
                                  }
                                ]
                              }
                            ]
                          },

                          /* Affordable */
                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-green-50 rounded-lg border border-green-200" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-green-700 mb-2" }, "children": ["💚 Most Affordable"] },
                              {
                                "type": "ul",
                                "props": { "className": "list-inside space-y-1 text-sm" },
                                "children": [
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Hull"] },
                                      ": £500–750/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Stoke"] },
                                      ": £450–700/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Preston"] },
                                      ": £500–750/month"
                                    ]
                                  },
                                  {
                                    "type": "li",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Swansea"] },
                                      ": £550–800/month"
                                    ]
                                  }
                                ]
                              }
                            ]
                          }

                        ]
                      },

                      /* Money-saving tips */
                      {
                        "type": "div",
                        "props": { "className": "bg-blue-50 p-4 rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-blue-700 mb-2" }, "children": ["💡 Money-Saving Location Tips:"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc list-inside" },
                            "children": [
                              { "type": "li", "children": ["Consider universities in smaller cities – same quality education, lower costs"] },
                              { "type": "li", "children": ["Factor in transport costs when choosing where to live"] },
                              { "type": "li", "children": ["Research local student discounts and deals"] },
                              { "type": "li", "children": ["Look at graduate employment rates vs living costs"] }
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
              CARD 3 — Housing Options
          ------------------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Student Housing: Comparing Your Options"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [

                      /* University Halls */
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-blue-600 mb-2" }, "children": ["🏫 University Halls"] },
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-2 gap-4" },
                            "children": [
                              {
                                "type": "div",
                                "children": [
                                  {
                                    "type": "p",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Cost: "] },
                                      "£100-200/week (£400-800/month)"
                                    ]
                                  },
                                  { "type": "h5", "props": { "className": "font-medium text-green-600 mt-2" }, "children": ["Pros:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                                    "children": [
                                      { "type": "li", "children": ["Bills included (electricity, internet, cleaning)"] },
                                      { "type": "li", "children": ["Easy to make friends"] },
                                      { "type": "li", "children": ["Close to campus"] },
                                      { "type": "li", "children": ["No deposits or guarantors needed"] }
                                    ]
                                  }
                                ]
                              },
                              {
                                "type": "div",
                                "children": [
                                  { "type": "h5", "props": { "className": "font-medium text-red-600" }, "children": ["Cons:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                                    "children": [
                                      { "type": "li", "children": ["More expensive"] },
                                      { "type": "li", "children": ["Less privacy"] },
                                      { "type": "li", "children": ["Strict rules"] },
                                      { "type": "li", "children": ["Limited kitchen facilities"] }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      /* Private Housing */
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-green-600 mb-2" }, "children": ["🏠 Private Student Housing"] },
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-2 gap-4" },
                            "children": [
                              {
                                "type": "div",
                                "children": [
                                  {
                                    "type": "p",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Cost: "] },
                                      "£80-150/week (£320-600/month)"
                                    ]
                                  },
                                  { "type": "h5", "props": { "className": "font-medium text-green-600 mt-2" }, "children": ["Pros:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                                    "children": [
                                      { "type": "li", "children": ["Often cheaper than halls"] },
                                      { "type": "li", "children": ["More independence"] },
                                      { "type": "li", "children": ["Choose your housemates"] },
                                      { "type": "li", "children": ["Better cooking facilities"] }
                                    ]
                                  }
                                ]
                              },

                              {
                                "type": "div",
                                "children": [
                                  { "type": "h5", "props": { "className": "font-medium text-red-600" }, "children": ["Cons:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                                    "children": [
                                      { "type": "li", "children": ["Bills on top of rent"] },
                                      { "type": "li", "children": ["Need deposit (usually 1-2 months rent)"] },
                                      { "type": "li", "children": ["May need guarantor"] },
                                      { "type": "li", "children": ["Responsible for maintenance issues"] }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      /* Living at Home */
                      {
                        "type": "div",
                        "props": { "className": "p-4 border rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-purple-600 mb-2" }, "children": ["🏡 Home/Family"] },
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-2 gap-4" },
                            "children": [
                              {
                                "type": "div",
                                "children": [
                                  {
                                    "type": "p",
                                    "children": [
                                      { "type": "span", "props": { "className": "font-semibold" }, "children": ["Cost: "] },
                                      "£0-300/month (if paying keep)"
                                    ]
                                  },
                                  { "type": "h5", "props": { "className": "font-medium text-green-600 mt-2" }, "children": ["Pros:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                                    "children": [
                                      { "type": "li", "children": ["Cheapest option"] },
                                      { "type": "li", "children": ["Home-cooked meals"] },
                                      { "type": "li", "children": ["Emotional support"] },
                                      { "type": "li", "children": ["No bills to worry about"] }
                                    ]
                                  }
                                ]
                              },
                              {
                                "type": "div",
                                "children": [
                                  { "type": "h5", "props": { "className": "font-medium text-red-600" }, "children": ["Cons:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1 list-disc pl-4" },
                                    "children": [
                                      { "type": "li", "children": ["Commute costs and time"] },
                                      { "type": "li", "children": ["Miss out on uni social life"] },
                                      { "type": "li", "children": ["Less independence"] },
                                      { "type": "li", "children": ["Harder to join activities"] }
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

            ]
          },


          /* ------------------------------------------------
              CARD 4 — Food Budget
          ------------------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Smart Food Budgeting"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "space-y-4" },
                    "children": [

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-6" },
                        "children": [

                          /* Cheap food tips */
                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-green-600 mb-3" }, "children": ["🥗 Budget-Friendly Food Tips:"] },
                              {
                                "type": "ul",
                                "props": { "className": "space-y-2 text-sm list-disc list-inside" },
                                "children": [
                                  { "type": "li", "children": ["Cook in bulk and freeze portions"] },
                                  { "type": "li", "children": ["Shop at Aldi/Lidl for basics"] },
                                  { "type": "li", "children": ["Use yellow sticker reductions"] },
                                  { "type": "li", "children": ["Buy frozen vegetables (often healthier than fresh)"] },
                                  { "type": "li", "children": ["Learn 5-10 cheap, healthy recipes"] },
                                  { "type": "li", "children": ["Share cooking with housemates"] },
                                  { "type": "li", "children": ["Use student discounts at restaurants"] }
                                ]
                              }
                            ]
                          },

                          /* Weekly breakdown */
                          {
                            "type": "div",
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-orange-600 mb-3" }, "children": ["📊 Weekly Food Budget Breakdown:"] },
                              {
                                "type": "div",
                                "props": { "className": "space-y-2" },
                                "children": [
                                  {
                                    "type": "div",
                                    "props": { "className": "flex items-center justify-between" },
                                    "children": [
                                      { "type": "span", "children": ["Groceries (cooking at home)"] },
                                      { "type": "span", "children": ["£25–35"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex items-center justify-between" },
                                    "children": [
                                      { "type": "span", "children": ["Eating out/takeaways"] },
                                      { "type": "span", "children": ["£10–15"] }
                                    ]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex items-center justify-between" },
                                    "children": [
                                      { "type": "span", "children": ["Snacks/drinks"] },
                                      { "type": "span", "children": ["£5–10"] }
                                    ]
                                  },
                                  { "type": "div", "children": [""], "props": { "className": "border-top-2 border border-black h-1" }, },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex items-center justify-between font-semibold" },
                                    "children": [
                                      { "type": "strong", "children": ["Total per week"] },
                                      { "type": "strong", "children": ["£40–60"] }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      /* Recommended staples */
                      {
                        "type": "div",
                        "props": { "className": "bg-primary/30 p-4 rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["🍝 Student Meal Prep Heroes:"] },
                          {
                            "type": "div",
                            "props": { "className": "grid grid-cols-3 gap-4" },
                            "children": [
                              {
                                "type": "div",
                                "children": [
                                  { "type": "strong", "children": ["Pasta & Rice"] },
                                  ": Buy in bulk, endless possibilities, filling and cheap"
                                ]
                              },
                              {
                                "type": "div",
                                "children": [
                                  { "type": "strong", "children": ["Eggs"] },
                                  ": Protein-packed, versatile, under £2 for a dozen"
                                ]
                              },
                              {
                                "type": "div",
                                "children": [
                                  { "type": "strong", "children": ["Beans & Lentils"] },
                                  ": Cheap protein, filling, healthy"
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
              CARD 5 — Transport
          ------------------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Getting Around on a Budget"] }] },

              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "grid gap-4" },
                    "children": [

                      /* Public transport & cycling */
                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-4" },
                        "children": [

                          /* Public transport */
                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-blue-50 rounded" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-blue-700 mb-2" }, "children": ["🚌 Public Transport"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["Student discounts: Usually 30% off"] },
                                  { "type": "li", "children": ["Monthly passes often better value"] },
                                  { "type": "li", "children": ["16-25 Railcard: 1/3 off train travel"] },
                                  { "type": "li", "children": ["Bus passes: £40-80/month typically"] }
                                ]
                              }
                            ]
                          },

                          /* Cycling */
                          {
                            "type": "div",
                            "props": { "className": "p-4 bg-green-50 rounded" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold text-green-700 mb-2" }, "children": ["🚲 Cycling"] },
                              {
                                "type": "ul",
                                "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                                "children": [
                                  { "type": "li", "children": ["One-time cost: £100-300 for decent bike"] },
                                  { "type": "li", "children": ["Free exercise and transport"] },
                                  { "type": "li", "children": ["Many cities have bike-sharing schemes"] },
                                  { "type": "li", "children": ["Consider cycle-to-work scheme"] }
                                ]
                              }
                            ]
                          }

                        ]
                      },

                      /* Cars cost breakdown */
                      {
                        "type": "div",
                        "props": { "className": "p-4 bg-yellow-50 rounded" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-yellow-700 mb-2" }, "children": ["🚗 Cars: Calculate the True Cost"] },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1 list-disc pl-4" },
                            "children": [
                              { "type": "li", "children": ["Insurance: £800-2000/year for young drivers"] },
                              { "type": "li", "children": ["Fuel: £100-200/month"] },
                              { "type": "li", "children": ["Parking: £50-150/month near campus"] },
                              { "type": "li", "children": ["MOT, service, repairs: £500+/year"] },
                              { "type": "li", "children": ["Total: Often £2000-4000/year!"] }
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
            CARD 6 — Action Plan
          ------------------------------------ */
          {
            "type": "Card",
            "children": [
              { "type": "CardHeader", "children": [{ "type": "CardTitle", "children": ["Master Your Student Budget"] }] },
              {
                "type": "CardContent",
                "children": [
                  {
                    "type": "div",
                    "props": { "className": "bg-green-50 p-6 rounded-lg border border-green-100" },
                    "children": [
                      { "type": "h4", "props": { "className": "font-semibold text-lg mb-3" }, "children": ["Your Budget Action Plan:"] },
                      {
                        "type": "ol",
                        "props": { "className": "list-decimal list-inside space-y-2 text-base" },
                        "children": [
                          { "type": "li", "children": ["Calculate your total income (loan, grants, part-time work)"] },
                          { "type": "li", "children": ["Research accommodation costs in your university city"] },
                          { "type": "li", "children": ["Plan a realistic monthly budget using the 50/30/20 rule"] },
                          { "type": "li", "children": ["Open a student bank account with good perks"] },
                          { "type": "li", "children": ["Apply for relevant railcards and student discounts"] }
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

    /* ------------------------------------------------
        QUIZ
    ------------------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What’s typically the biggest expense in a student budget?",
          options: ["Rent", "Food", "Transport", "Entertainment"],
          correctAnswer: 0,
          explanation:
            "Rent usually makes up 40–60% of a student's total monthly expenses, making it the largest cost."
        }
      ]
    },

    /* ------------------------------------------------
        RELATED LESSONS
    ------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "next-step"
      },
      {
        moduleId: "saving-strategies",
        title: "Saving Strategies",
        relationship: "related"
      }
    ]
  }


];

// =====================================================
// Seed Function
// =====================================================
async function seedSpendingWisely() {
  try {
    for (const module of spendingWiselyModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
    }

    console.log("✅ Spending Wisely modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Spending Wisely:", error);
  }
}

module.exports = {
  spendingWiselyModules,
  seedSpendingWisely,
};
