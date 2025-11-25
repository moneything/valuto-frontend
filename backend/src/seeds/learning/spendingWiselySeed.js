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
    description: "Learn how to compare prices, avoid value traps, and shop smarter using unit pricing, own-label comparisons, and smart tools.",
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
                      { "type": "Calculator", "props": { "className": "h-5 w-5" } },
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
                            "props": { "className": "mt-3 text-sm" },
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• Premium pricing for marketing",
                                  "• Often same ingredients as own-label",
                                  "• Better packaging and presentation",
                                  "• Sometimes genuinely better quality",
                                  "• Strong brand reputation"
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• 30–50% cheaper on average",
                                  "• Often made by same manufacturers",
                                  "• Basic but functional packaging",
                                  "• Quality controlled by supermarket",
                                  "• Great for everyday items"
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "bg-accent p-4 rounded-lg" },
                        "children": [
                          {
                            "type": "h4",
                            "props": { "className": "font-semibold mb-2" },
                            "children": ["💡 Smart Shopping Strategy:"]
                          },
                          {
                            "type": "ul",
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Try own-label first for basics (pasta, rice, cleaning products)",
                              "• Stick to brands for items where quality matters to you",
                              "• Check if products are made by the same manufacturer",
                              "• Look for supermarket premium ranges for middle ground"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Honey: Finds discount codes",
                              "• PriceGrabber: Compares prices",
                              "• ShopSavvy: Barcode scanning",
                              "• Store apps: Tesco, ASDA, Sainsbury’s promotions"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Yellow stickers: End-of-day reductions",
                              "• Seasonal sales: Christmas, Black Friday",
                              "• Weekly cycles: New deals Wed/Thu",
                              "• End of month: Furniture & car deals"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Delivery fees",
                              "• Membership costs (Amazon Prime, Costco)",
                              "• Overpriced insurance/warranties",
                              "• Installation fees"
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
                            "props": { "className": "space-y-2 text-sm" },
                            "children": [
                              "• Cheap shoes that fall apart",
                              "• Minimum-spend for 'free' delivery",
                              "• Bulk buying food that goes off",
                              "• Hidden fees in phone contracts",
                              "• Store credit cards with high APR"
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
                                "props": { "className": "space-y-1 text-sm" },
                                "children": [
                                  "• Good customer reviews",
                                  "• Warranty included",
                                  "• Low cost per use",
                                  "• Multi-purpose items",
                                  "• Durable materials"
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
                                "props": { "className": "space-y-1 text-sm" },
                                "children": [
                                  "• Pressure tactics",
                                  "• No return policy",
                                  "• Prices too good to be true",
                                  "• Hidden fees",
                                  "• Pushy sales behaviour"
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
    description: "Learn how to recognise online scams, protect yourself against fraud, and take action if you’ve been targeted.",
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
                          { "type": "div", "props": { "className": "text-xs text-red-600" }, "children": ["Reality: Legitimate loan forgiveness is free and never instant."] }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["💼 Fake Job Offers"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"Earn £500/week from home, no experience required!\""] },
                          { "type": "div", "props": { "className": "text-xs text-red-600" }, "children": ["Red flags: Upfront fees, vague roles, guaranteed high income."] }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["📱 Phone/Text Scams"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"Your bank account is compromised — click here now!\""] },
                          { "type": "div", "props": { "className": "text-xs text-red-600" }, "children": ["Truth: Banks never ask for passwords via text."] }
                        ]
                      },

                      {
                        "type": "div",
                        "props": { "className": "p-4 border-l-4 border-red-500 bg-red-50" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold text-red-700 mb-2" }, "children": ["🛒 Fake Shopping Sites"] },
                          { "type": "p", "props": { "className": "text-sm mb-2" }, "children": ["\"iPhone 15 for £200 — limited time!\""] },
                          { "type": "div", "props": { "className": "text-xs text-red-600" }, "children": ["Warning: If the price seems too good to be true, it probably is."] }
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
                            "props": { "className": "space-y-2 text-sm" },
                            "children": [
                              "• Requests money or personal info upfront",
                              "• Guaranteed returns or instant results",
                              "• Creates false urgency",
                              "• Poor grammar or unprofessional design",
                              "• No address or contact details",
                              "• Unusual payment methods (crypto, gift cards)",
                              "• Pressure to act quickly"
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
                            "props": { "className": "space-y-2 text-sm" },
                            "children": [
                              "• Clear contact information",
                              "• Secure website with https://",
                              "• Realistic claims",
                              "• Verified reviews",
                              "• Secure payment options",
                              "• Transparent T&Cs",
                              "• No pressure tactics"
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
                            "props": { "className": "space-y-1 text-sm" },
                            "children": [
                              "• Fake crypto investment schemes",
                              "• Worthless 'get rich' courses",
                              "• Pyramid schemes disguised as businesses",
                              "• Counterfeit designer goods"
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
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• Look for #ad/#sponsored tags",
                                  "• Verify they use the product",
                                  "• Watch out for too many random promotions",
                                  "• Check engagement, not just followers"
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
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• Search company + 'scam'",
                                  "• Check Trustpilot",
                                  "• Read Reddit discussions",
                                  "• Verify business registration"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Shop only on secure sites (https://)",
                              "• Prefer credit cards for protection",
                              "• Avoid saving card details",
                              "• Know the return policy",
                              "• Use PayPal or Apple Pay when possible"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Never click suspicious links",
                              "• Banks never ask for passwords",
                              "• Call companies directly",
                              "• Ignore unknown callers",
                              "• Avoid messages that create urgency"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Enable account alerts",
                              "• Check statements weekly",
                              "• Never share full card details",
                              "• Use different passwords",
                              "• Enable two-factor authentication"
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
                          "Contact your bank immediately",
                          "Report to Action Fraud (0300 123 2040)",
                          "Change compromised passwords",
                          "Take screenshots of evidence",
                          "Report scammer on the platform"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Action Fraud: 0300 123 2040",
                              "• Citizens Advice: 0808 223 1133",
                              "• Financial Ombudsman: 0300 123 9123",
                              "• Your bank’s fraud line"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Trust your instincts",
                              "• Research before purchases",
                              "• Never rush decisions",
                              "• Stay updated on scam trends"
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
    description: "Learn how to use BNPL services and credit cards responsibly to avoid debt and protect your financial future.",
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• No interest if you pay on time",
                                  "• Helps manage cash flow for planned purchases",
                                  "• Easier approval than credit cards",
                                  "• Can build payment history",
                                  "• Sometimes offers buyer protection"
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• Late fees (£6–£12 per missed payment)",
                                  "• Can damage credit score if missed",
                                  "• Easy to overspend",
                                  "• Multiple BNPL apps = debt spiral",
                                  "• No legal protection like credit cards"
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
                              "\"I bought clothes worth £300 across 3 BNPL apps. Payments were split, so I forgot some and paid £36 in late fees. It felt like free money until it wasn't.\""
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Only use for planned purchases",
                              "• Enable auto-payments",
                              "• Use ONE BNPL at a time",
                              "• Track all installment payments",
                              "• Never use BNPL for groceries or bills"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Essential items (e.g., uni laptop)",
                              "• Guaranteed income coming in",
                              "• Items you planned to buy anyway",
                              "• Fits your monthly budget"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Impulse purchases",
                              "• Things you can't afford",
                              "• Groceries and bills",
                              "• When you already owe other installments"
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• Section 75 protection (£100–£30,000 purchases)",
                                  "• Stronger fraud protection",
                                  "• Builds credit history",
                                  "• Cashback/rewards",
                                  "• Purchase protection on big items"
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• High interest (18–29% APR)",
                                  "• Minimum payment trap",
                                  "• Encourages overspending",
                                  "• Credit score damage if missed",
                                  "• Late fees, cash advance fees"
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
                              "If you can't afford to pay off your credit card in full each month, you can't afford what you're buying."
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "bg-white p-4 rounded border mt-4" },
                            "children": [
                              { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["Why Minimum Payments Are a Trap"] },
                              {
                                "type": "div",
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• Balance: £1,000",
                                  "• APR: 22%",
                                  "• Min payment: £25/mo",
                                  "• Time to clear: 4 years 6 months",
                                  "• Interest paid: £347"
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
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• Use only for planned expenses",
                                  "• Set direct debit for FULL amount",
                                  "• Track spending in your app",
                                  "• Avoid cash advances",
                                  "• Keep utilisation < 30%"
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
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• Start with low limit (£300–£500)",
                                  "• Choose no-fee cards",
                                  "• Use for expensive purchases",
                                  "• Pay before statement date",
                                  "• Never lend your card"
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
                            "props": { "className": "text-sm mt-2 space-y-1" },
                            "children": [
                              "• 25.9% APR",
                              "• No annual fee",
                              "• £1,200 typical limit",
                              "• Good for building credit"
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
                            "props": { "className": "text-sm mt-2 space-y-1" },
                            "children": [
                              "• No foreign transaction fees",
                              "• Good for travel",
                              "• 22.9% APR",
                              "• No annual fee"
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
                            "props": { "className": "text-sm mt-2 space-y-1" },
                            "children": [
                              "• Great for no credit history",
                              "• 34.9% APR (so pay in full!)",
                              "• Easier acceptance",
                              "• Good starter card"
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
    description: "Understand real UK student living costs and learn budgeting strategies.",
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
                                    "children": ["🏠 Rent & Bills", { "type": "span", "props": { "className": "font-bold text-red-600" }, "children": ["£400–600"] }]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": ["🍕 Food & Groceries", "£150–200"]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": ["🚌 Transport", "£50–80"]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": ["📚 Study Materials", "£30–50"]
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
                                    "children": ["👕 Clothes", "£30–60"]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": ["🎉 Social/Entertainment", "£80–120"]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-white rounded" },
                                    "children": ["📱 Phone & Internet", "£25–40"]
                                  },
                                  {
                                    "type": "div",
                                    "props": { "className": "flex justify-between items-center p-2 bg-green-100 rounded border border-green-500" },
                                    "children": ["💰 Total", { "type": "span", "props": { "className": "font-bold text-green-700" }, "children": ["£765–1,150"] }]
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
                                "type": "div",
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "London: £1,200–1,800/month",
                                  "Cambridge: £1,000–1,400/month",
                                  "Oxford: £1,000–1,400/month",
                                  "Brighton: £900–1,300/month"
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
                                "type": "div",
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "Manchester: £700–1,000/month",
                                  "Birmingham: £650–950/month",
                                  "Leeds: £600–900/month",
                                  "Bristol: £700–1,000/month"
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
                                "type": "div",
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "Hull: £500–750/month",
                                  "Stoke: £450–700/month",
                                  "Preston: £500–750/month",
                                  "Swansea: £550–800/month"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Smaller cities = lower living costs",
                              "• Consider transport cost when choosing accommodation",
                              "• Research local student discounts",
                              "• Compare job opportunities vs living costs"
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
                                  "Cost: £100–200/week",
                                  { "type": "h5", "props": { "className": "font-medium text-green-600 mt-2" }, "children": ["Pros:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1" },
                                    "children": [
                                      "• Bills included",
                                      "• Social atmosphere",
                                      "• Close to campus",
                                      "• No guarantor needed"
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
                                    "props": { "className": "text-xs space-y-1" },
                                    "children": [
                                      "• More expensive",
                                      "• Less privacy",
                                      "• Strict rules",
                                      "• Limited kitchen facilities"
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
                                  "Cost: £80–150/week",
                                  { "type": "h5", "props": { "className": "font-medium text-green-600 mt-2" }, "children": ["Pros:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1" },
                                    "children": [
                                      "• Cheaper",
                                      "• Independence",
                                      "• Choose housemates",
                                      "• Better kitchen"
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
                                    "props": { "className": "text-xs space-y-1" },
                                    "children": [
                                      "• Bills not included",
                                      "• Need deposit",
                                      "• Need guarantor",
                                      "• Maintenance responsibility"
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
                                  "Cost: £0–300/month",
                                  { "type": "h5", "props": { "className": "font-medium text-green-600 mt-2" }, "children": ["Pros:"] },
                                  {
                                    "type": "ul",
                                    "props": { "className": "text-xs space-y-1" },
                                    "children": [
                                      "• Cheapest",
                                      "• Home-cooked meals",
                                      "• Support system",
                                      "• No bills"
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
                                    "props": { "className": "text-xs space-y-1" },
                                    "children": [
                                      "• Commute time",
                                      "• Less independence",
                                      "• Harder to socialise",
                                      "• Travel expenses"
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
                                "props": { "className": "space-y-2 text-sm" },
                                "children": [
                                  "• Cook in bulk",
                                  "• Shop at Aldi/Lidl",
                                  "• Use yellow sticker deals",
                                  "• Frozen veg > fresh",
                                  "• Learn 5–10 cheap recipes",
                                  "• Share cooking",
                                  "• Use student discounts"
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
                                  "Groceries: £25–35",
                                  "Eating out: £10–15",
                                  "Snacks: £5–10",
                                  { "type": "strong", "children": ["Total: £40–60"] }
                                ]
                              }
                            ]
                          }
                        ]
                      },

                      /* Recommended staples */
                      {
                        "type": "div",
                        "props": { "className": "bg-accent p-4 rounded-lg" },
                        "children": [
                          { "type": "h4", "props": { "className": "font-semibold mb-2" }, "children": ["🍝 Student Meal Prep Heroes:"] },
                          {
                            "type": "div",
                            "props": { "className": "grid md:grid-cols-3 gap-4 text-sm" },
                            "children": [
                              "Pasta & Rice: Cheap, filling",
                              "Eggs: Protein & cheap",
                              "Beans & Lentils: Healthy & filling"
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
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• 30% student discount",
                                  "• Monthly passes save money",
                                  "• 16-25 Railcard = 1/3 off",
                                  "• Bus passes: £40–80/month"
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
                                "props": { "className": "text-sm space-y-1" },
                                "children": [
                                  "• £100–300 upfront",
                                  "• Free exercise",
                                  "• Bike-share in many cities",
                                  "• No fuel/insurance"
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
                            "props": { "className": "text-sm space-y-1" },
                            "children": [
                              "• Insurance: £800–2000/year",
                              "• Fuel: £100–200/month",
                              "• Parking: £50–150/month",
                              "• Repairs: £500+/year",
                              "• Total: £2000–4000/year"
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
