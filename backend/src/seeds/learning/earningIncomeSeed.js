// backend/src/seeds/learning/earningIncomeSeed.js
const LearningModule = require("../../models/LearningModule");

/**
 * Earning & Income — Learning Modules
 * Category ID: earning-income
 *
 * Includes:
 * 1. How Pay Works
 * 2. Different Types of Income
 * 3. Taxes 101
 * 4. Side Hustles & Freelancing
 * 5. Salary Negotiation Basics
 */

const earningIncomeModules = [
  // =====================================================
  // 1. How Pay Works
  // =====================================================
  {
    title: "How Pay Works",
    description: "Gross vs net pay, payslips explained",
    categoryId: "earning-income",
    topic: "how-pay-works",

    visual: {
      icon: "TrendingUp",
      iconColor: "bg-green-500",
      readTime: 3
    },

    uiTree: [
      /* ============================================================
      * 1) GROSS VS NET PAY
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
                  { type: "Calculator", props: { className: "h-5 w-5" } },
                  "Gross vs Net Pay: The Big Difference"
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
                  {
                    type: "div",
                    props: { className: "bg-green-50 p-6 rounded-lg border border-green-200" },
                    children: [
                      { type: "h3", props: { className: "text-xl font-bold text-green-700 mb-3" }, children: ["💰 Gross Pay"] },
                      { type: "p", props: { className: "text-green-600 mb-3" }, children: ["Your pay BEFORE deductions"] },
                      {
                        type: "ul",
                        props: { className: "space-y-2 text-sm list-disc pl-4" },
                        children: [
                          { type: "li", children: ["The amount advertised in job ads"] },
                          { type: "li", children: ["Your hourly rate × hours worked"] },
                          { type: "li", children: ["What you earn before anything is taken off"] },
                          { type: "li", children: ["Example: £10/hour × 20 hours = £200 gross"] },
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "bg-blue-50 p-6 rounded-lg border border-blue-200" },
                    children: [
                      { type: "h3", props: { className: "text-xl font-bold text-blue-700 mb-3" }, children: ["💳 Net Pay"] },
                      { type: "p", props: { className: "text-blue-600 mb-3" }, children: ["Your pay AFTER deductions"] },
                      {
                        type: "ul",
                        props: { className: "space-y-2 text-sm list-disc pl-4" },
                        children: [
                          { type: "li", children: ["The money that actually hits your bank"] },
                          { type: "li", children: ["Gross pay minus taxes and deductions"] },
                          { type: "li", children: ["Also called 'take-home pay'"] },
                          { type: "li", children: ["Example: £200 gross - £15 tax = £185 net"] },
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
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["💡 Key Insight:"] },
                  { type: "p", props: { className: "text-sm" }, children: ["Always budget using your NET pay, not gross pay. That's the real money you can spend!"] }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * 2) UNDERSTANDING YOUR PAYSLIP
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
                  { type: "FileText", props: { className: "h-5 w-5" } },
                  "Understanding Your Payslip"
                ]
              },
              {
                type: "CardDescription",
                children: ["Breaking down every section"]
              }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4" },
                children: [
                  { type: "h4", props: { className: "font-bold text-center mb-4" }, children: ["📄 SAMPLE PAYSLIP"] },

                  {
                    type: "div",
                    props: { className: "space-y-3 text-sm" },
                    children: [
                      {
                        type: "div",
                        props: { className: "flex justify-between" },
                        children: [
                          "Employee: Alex Johnson",
                          "Pay Period: 01/01/24 - 31/01/24"
                        ]
                      },

                      /* Replace <hr> */
                      { type: "div", props: { className: "border-t my-2" } },

                      {
                        type: "div",
                        props: { className: "space-y-2" },
                        children: [
                          {
                            type: "div",
                            props: { className: "flex justify-between font-semibold" },
                            children: ["Basic Pay (£8.50 × 60 hours)", "£510.00"]
                          },
                          {
                            type: "div",
                            props: { className: "flex justify-between" },
                            children: ["Overtime (£12.75 × 5 hours)", "£63.75"]
                          },
                          {
                            type: "div",
                            props: { className: "flex justify-between font-bold text-green-600" },
                            children: ["GROSS PAY", "£573.75"]
                          }
                        ]
                      },

                      { type: "div", props: { className: "border-t my-2" } },

                      {
                        type: "div",
                        props: { className: "space-y-2" },
                        children: [
                          { type: "div", props: { className: "flex justify-between text-red-600" }, children: ["Income Tax", "-£28.69"] },
                          { type: "div", props: { className: "flex justify-between text-red-600" }, children: ["National Insurance", "-£22.95"] },
                          { type: "div", props: { className: "flex justify-between text-red-600" }, children: ["Pension Contribution", "-£17.21"] }
                        ]
                      },

                      { type: "div", props: { className: "border-t my-2" } },

                      {
                        type: "div",
                        props: { className: "flex justify-between font-bold text-blue-600 text-lg" },
                        children: ["NET PAY", "£504.90"]
                      }
                    ]
                  }
                ]
              },

              {
                type: "div",
                props: { className: "grid md:grid-cols-3 gap-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-primary/10 rounded-lg" },
                    children: [
                      { type: "h5", props: { className: "font-semibold text-primary" }, children: ["Income Tax"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Tax on your earnings (starts at £12,570/year)"] }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-purple-50 rounded-lg" },
                    children: [
                      { type: "h5", props: { className: "font-semibold" }, children: ["National Insurance"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Contributes to NHS, state pension (starts at £12,570/year)"] }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-yellow-50 rounded-lg" },
                    children: [
                      { type: "h5", props: { className: "font-semibold" }, children: ["Pension"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Automatic saving for retirement (3% minimum)"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * 3) SPECIAL STUDENT RULES
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mt-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Special Rules for Student Jobs"] }] },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "space-y-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "bg-green-50 border-l-4 border-green-400 p-4" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-700 mb-2" }, children: ["✅ Good News for Students!"] },
                      {
                        type: "ul",
                        props: { className: "space-y-1 text-sm list-disc pl-4" },
                        children: [
                          { type: "li", children: ["If you earn under £12,570/year, you pay NO income tax"] },
                          { type: "li", children: ["If you earn under £12,570/year, you pay NO National Insurance"] },
                          { type: "li", children: ["Most part-time student jobs fall under these limits"] },
                        ]
                      }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-2 gap-4" },
                    children: [
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Annual Tax-Free Allowances (2024):"] },
                          {
                            type: "ul",
                            props: { className: "space-y-1 text-sm list-disc pl-4" },
                            children: [
                              { type: "li", children: ["Income Tax: £12,570"] },
                              { type: "li", children: ["National Insurance: £12,570"] },
                              { type: "li", children: ["Both calculated yearly, not monthly"] },
                            ]
                          }
                        ]
                      },

                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold mb-2" }, children: ["What this means weekly:"] },
                          {
                            type: "ul",
                            props: { className: "space-y-1 text-sm list-disc pl-4" },
                            children: [
                              { type: "li", children: ["£242/week tax-free"] },
                              { type: "li", children: ["About 30 hours at minimum wage"] },
                              { type: "li", children: ["Perfect for most student jobs!"] },
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
      * 4) TYPES OF PAY STRUCTURE
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mt-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Types of Pay Structure"] }] },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "grid gap-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-blue-600" }, children: ["💰 Hourly Pay"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Most common for students. Pay = hours worked × hourly rate"] },
                      { type: "p", props: { className: "text-xs text-muted-foreground" }, children: ["Example: 15 hours × £8.50 = £127.50"] }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-600" }, children: ["📅 Salary"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Fixed annual amount, paid monthly regardless of hours"] },
                      { type: "p", props: { className: "text-xs text-muted-foreground" }, children: ["Example: £25,000/year = £2,083/month"] }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-purple-600" }, children: ["📈 Commission"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Earn based on sales or performance"] },
                      { type: "p", props: { className: "text-xs text-muted-foreground" }, children: ["Example: £200 base + 5% of sales"] }
                    ]
                  },

                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-orange-600" }, children: ["💪 Piece Rate"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Paid per item/task completed"] },
                      { type: "p", props: { className: "text-xs text-muted-foreground" }, children: ["Example: £2 per delivery completed"] }
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
    * QUIZ — properly formatted
    * ============================================================ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the term for your pay BEFORE any deductions?",
          options: [
            "Gross pay",
            "Net pay",
            "Take-home pay",
            "Basic pay"
          ],
          correctAnswer: 0,
          explanation: "Gross pay is the amount you earn before any tax or deductions are taken off."
        }
      ]
    },

    /* ============================================================
    * Meta
    * ============================================================ */
    relatedLessons: [],
    points: 90,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 1,
    createdBy: "system"
  },
  
  // =====================================================
  // 2. Part-Time Jobs & Apprenticeships
  // =====================================================
  {
    title: "Part-Time Jobs & Apprenticeships",
    description: "Getting started in the workforce",
    categoryId: "earning-income",
    topic: "part-time-jobs",

    visual: {
      icon: "Building",
      iconColor: "bg-green-500",
      readTime: 3
    },

    uiTree: [
      /* ============================================================
      * AGE & LEGAL REQUIREMENTS
      * ============================================================ */
      {
        type: "Card",
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["When Can You Start Working?"] }] },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "grid md:grid-cols-3 gap-4" },
                children: [
                  /* 13-14 */
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-red-50 rounded-lg border border-red-200" },
                    children: [
                      { type: "h3", props: { className: "text-2xl font-bold text-red-600" }, children: ["13-14"] },
                      { type: "p", props: { className: "text-sm font-semibold" }, children: ["Very Limited Work"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs mt-2 space-y-1 text-left" },
                        children: [
                          { type: "li", children: ["Paper rounds"] },
                          { type: "li", children: ["Light agricultural work"] },
                          { type: "li", children: ["Requires work permit"] }
                        ]
                      }
                    ]
                  },

                  /* 15 */
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-orange-50 rounded-lg border border-orange-200" },
                    children: [
                      { type: "h3", props: { className: "text-2xl font-bold text-orange-600" }, children: ["15"] },
                      { type: "p", props: { className: "text-sm font-semibold" }, children: ["More Options"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs mt-2 space-y-1 text-left" },
                        children: [
                          { type: "li", children: ["Retail (not during school)"] },
                          { type: "li", children: ["Restaurants (light duties)"] },
                          { type: "li", children: ["Max 8 hours/week"] }
                        ]
                      }
                    ]
                  },

                  /* 16+ */
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-green-50 rounded-lg border border-green-200" },
                    children: [
                      { type: "h3", props: { className: "text-2xl font-bold text-green-600" }, children: ["16+"] },
                      { type: "p", props: { className: "text-sm font-semibold" }, children: ["Full Part-Time Work"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs mt-2 space-y-1 text-left" },
                        children: [
                          { type: "li", children: ["Most jobs available"] },
                          { type: "li", children: ["Evening & weekend work"] },
                          { type: "li", children: ["Apprenticeships available"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* Legal limits */
              {
                type: "div",
                props: { className: "mt-4 p-4 bg-primary/10 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["⚖️ Important Legal Limits:"] },
                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      { type: "li", children: ["School days: Max 2 hours (after 7pm)"] },
                      { type: "li", children: ["Saturdays: Max 8 hours"] },
                      { type: "li", children: ["Sundays: Max 2 hours"] },
                      { type: "li", children: ["School holidays: Maximum 8 hours/day, 35 hours/week (13-14), 40 hours/week (15+)"] },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * BEST STUDENT JOBS
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mt-5" },
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: ["Best Part-Time Jobs for Students"] },
              { type: "CardDescription", children: ["Jobs that work around school schedules"] }
            ]
          },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-4" },
                children: [
                  /* Retail */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-blue-600 mb-2" }, children: ["🛒 Retail Assistant"] },
                      { type: "p", props: { className: "text-sm mb-2" }, children: ["Working in shops, supermarkets, or department stores"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs space-y-1" },
                        children: [
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Pay"]},": £6.40–£8.50/hour"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Hours"]},": Evenings/weekends"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Skills"]},": Customer service, teamwork"] }
                        ]
                      }
                    ]
                  },

                  /* Food service */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-green-600 mb-2" }, children: ["🍟 Food Service"] },
                      { type: "p", props: { className: "text-sm mb-2" }, children: ["Restaurants, cafes, fast food"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs space-y-1" },
                        children: [
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Pay"]},": £6.40–£9.00/hour"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Hours"]},": Split shifts, weekends"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Skills"]},": Fast-paced work, communication"] }
                        ]
                      }
                    ]
                  },

                  /* Tutoring */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-purple-600 mb-2" }, children: ["📚 Tutoring"] },
                      { type: "p", props: { className: "text-sm mb-2" }, children: ["Help younger students succeed in subjects you're good at"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs space-y-1" },
                        children: [
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Pay"]},": £8–£15/hour"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Hours"]},": After school/weekends"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Skills"]},": Teaching, patience, subject knowledge"] }
                        ]
                      }
                    ]
                  },

                  /* Delivery */
                  {
                    type: "div",
                    props: { className: "p-4 border rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold text-orange-600 mb-2" }, children: ["🚗 Delivery Driver"] },
                      { type: "p", props: { className: "text-sm mb-2" }, children: ["Food delivery (17+ with license) or cycling delivery"] },
                      {
                        type: "ul",
                        props: { className: "list-disc pl-4 text-xs space-y-1" },
                        children: [
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Pay"]},": £7–£12/hour + tips"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Hours"]},": Flexible, evenings"] },
                          { type: "li", children: [{type: "span", props: {className: "font-bold"}, children: ["Skills"]},": Navigation, time management"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* Seasonal work tip */
              {
                type: "div",
                props: { className: "bg-primary/10 p-4 rounded-lg mt-4" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["💡 Hot Tip: Seasonal Jobs"] },
                  { type: "p", props: { className: "text-sm" }, children: ["Christmas retail, summer festivals, and holiday resorts offer great temporary work with often higher pay rates!"] }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * APPRENTICESHIPS
      * ============================================================ */
      {
        type: "Card",
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Apprenticeships: Learn While You Earn"] }] },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg space-y-4" },
                children: [
                  { type: "h3", props: { className: "text-xl font-bold" }, children: ["What is an Apprenticeship?"] },
                  { type: "p", children: ["A real job with training, qualifications, and a salary. You work 4 days, study 1 day."] },

                  {
                    type: "div",
                    props: { className: "grid md:grid-cols-2 gap-4" },
                    children: [
                      /* Benefits */
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold text-green-600" }, children: ["Benefits"] },
                          {
                            type: "ul",
                            props: { className: "list-disc pl-4 text-sm space-y-1 mt-1" },
                            children: [
                              { type: "li", children: ["No student debt"] },
                              { type: "li", children: ["Earn while you learn"] },
                              { type: "li", children: ["Guaranteed job at the end"] },
                              { type: "li", children: ["Real work experience"] },
                              { type: "li", children: ["Industry-recognized qualifications"] },
                            ]
                          }
                        ]
                      },

                      /* Numbers */
                      {
                        type: "div",
                        children: [
                          { type: "h4", props: { className: "font-semibold text-blue-600" }, children: ["The Numbers"] },
                          {
                            type: "ul",
                            props: { className: "list-disc pl-4 text-sm space-y-1 mt-1" },
                            children: [
                              { type: "li", children: ["Minimum pay: £6.40/hour"] },
                              { type: "li", children: ["Duration: 1–4 years"] },
                              { type: "li", children: ["Age: 16+ (no upper limit)"] },
                              { type: "li", children: ["600+ apprenticeships"] }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* Apprenticeship categories */
              {
                type: "div",
                props: { className: "grid md:grid-cols-3 gap-4 mt-4" },
                children: [
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-blue-50 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold" }, children: ["💻 Tech & Digital"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Software development, cybersecurity, digital marketing"] }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-green-50 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold" }, children: ["🏥 Healthcare"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Nursing, dental, pharmacy, veterinary"] }
                    ]
                  },
                  {
                    type: "div",
                    props: { className: "text-center p-4 bg-yellow-50 rounded-lg" },
                    children: [
                      { type: "h4", props: { className: "font-semibold" }, children: ["💼 Business"] },
                      { type: "p", props: { className: "text-sm mt-1" }, children: ["Accounting, HR, project management, sales"] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ============================================================
      * JOB APPLICATION TIPS
      * ============================================================ */
      {
        type: "Card",
        props: { className: "mt-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Landing Your First Job"] }] },
          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "grid md:grid-cols-2 gap-6" },
                children: [
                  /* CV Tips */
                  {
                    type: "div",
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-3" }, children: ["📝 Writing Your CV"] },
                      {
                        type: "ul",
                        props: { className: "space-y-2 text-sm" },
                        children: [
                          { type: "li", props: {className: "flex"}, children: [{type: "Check", props: { className: "h-5 w-5 mr-2 text-green-500" } }, "Keep it to 1 page maximum"] },
                          { type: "li", props: {className: "flex"}, children: [{type: "Check", props: { className: "h-5 w-5 mr-2 text-green-500" } }, "Include school achievements, sports, volunteering"] },
                          { type: "li", props: {className: "flex"}, children: [{type: "Check", props: { className: "h-5 w-5 mr-2 text-green-500" } }, "List subjects you're good at"] },
                          { type: "li", props: {className: "flex"}, children: [{type: "Check", props: { className: "h-5 w-5 mr-2 text-green-500" } }, "Add hobbies that show responsibility"] }
                        ]
                      }
                    ]
                  },

                  /* Interview Tips */
                  {
                    type: "div",
                    children: [
                      { type: "h4", props: { className: "font-semibold mb-3" }, children: ["🎯 Interview Tips"] },
                      {
                        type: "ul",
                        props: { className: "list-disc space-y-2 text-sm" },
                        children: [
                          { type: "li", props: {className: "flex"}, children: [{type: "ArrowRight", props: { className: "h-5 w-5 mr-2 text-blue-500" } }, "Arrive 10 minutes early"] },
                          { type: "li", props: {className: "flex"}, children: [{type: "ArrowRight", props: { className: "h-5 w-5 mr-2 text-blue-500" } }, "Dress smartly (even for casual jobs)"] },
                          { type: "li", props: {className: "flex"}, children: [{type: "ArrowRight", props: { className: "h-5 w-5 mr-2 text-blue-500" } }, "Bring copies of your CV"] },
                          { type: "li", props: {className: "flex"}, children: [{type: "ArrowRight", props: { className: "h-5 w-5 mr-2 text-blue-500" } }, "Ask questions about the role"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* Watch Out For */
              {
                type: "div",
                props: { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" },
                children: [
                  { type: "h4", props: { className: "font-semibold text-yellow-700 mb-2" }, children: ["⚠️ Watch Out For:"] },
                  {
                    type: "ul",
                    props: { className: "list-disc pl-4 text-sm space-y-1" },
                    children: [
                      { type: "li", children: ["Jobs asking for money upfront (usually scams)"] },
                      { type: "li", children: ["\"Too good to be true\" pay rates"] },
                      { type: "li", children: ["Pyramid schemes disguised as jobs"] },
                      { type: "li", children: ["Work that interferes with school"] }
                    ]
                  }
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
        type: "Card",
        props: { className: "mt-5" },
        children: [
          { type: "CardHeader", children: [{ type: "CardTitle", children: ["Ready to Start Job Hunting?"] }] },

          {
            type: "CardContent",
            children: [
              {
                type: "div",
                props: { className: "bg-primary/10 p-4 rounded-lg" },
                children: [
                  { type: "h4", props: { className: "font-semibold mb-2" }, children: ["Your Action Plan"] },
                  {
                    type: "ol",
                    props: { className: "list-decimal list-inside space-y-1 text-sm" },
                    children: [
                      { type: "li", children: ["Check you meet age requirements"] },
                      { type: "li", children: ["Write your first CV"] },
                      { type: "li", children: ["Search on Indeed or company sites"] },
                      { type: "li", children: ["Apply to 5–10 suitable roles"] },
                      { type: "li", children: ["Prepare for interviews"] }
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
    * QUIZ (MIGRATED EXACTLY)
    * ============================================================ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          id: "ptjobs-q1",
          type: "multiple-choice",
          question: "At what age can you do most part-time jobs?",
          options: ["13", "14", "15", "16"],
          correctAnswer: "16",
          explanation:
            "Most part-time roles open at age 16, including evening and weekend work."
        }
      ]
    },

    relatedLessons: [],
    points: 90,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 2,
    createdBy: "system"
  },

  // =====================================================
  // 3. Side Hustles & Freelancing
  // =====================================================
  {
    title: "Side Hustles & Freelancing",
    description:
      "Creative ways to earn extra money",
    categoryId: "earning-income",
    topic: "side-hustles",

    visual: {
      icon: "Lightbulb",
      iconColor: "bg-green-500",
      badge: "Earning & Income",
      readTime: 2
    },

    uiTree: [
      /* ------------------------------------------------------------ */
      /* 1. WHAT IS A SIDE HUSTLE? (intro three cards)                 */
      /* ------------------------------------------------------------ */
      {
        "type": "Card",
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["What is a Side Hustle?"] }
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
                      "A side hustle is flexible work you do alongside studying to earn extra money. Unlike traditional part-time jobs, side hustles let you work when YOU want!"
                    ]
                  },

                  {
                    "type": "div",
                    "props": { "className": "grid md:grid-cols-3 gap-4" },
                    "children": [
                      {
                        "type": "div",
                        "props": {
                          "className": "text-center p-4 bg-blue-50 rounded-lg"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className": "font-semibold text-blue-700"
                            },
                            "children": ["💪 Flexible"]
                          },
                          {
                            "type": "p",
                            "props": { "className": "text-sm mt-1" },
                            "children": ["Work around your schedule"]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": {
                          "className": "text-center p-4 bg-green-50 rounded-lg"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className": "font-semibold text-green-700"
                            },
                            "children": ["🚀 Scalable"]
                          },
                          {
                            "type": "p",
                            "props": { "className": "text-sm mt-1" },
                            "children": ["Grow your earnings over time"]
                          }
                        ]
                      },

                      {
                        "type": "div",
                        "props": {
                          "className": "text-center p-4 bg-purple-50 rounded-lg"
                        },
                        "children": [
                          {
                            "type": "h4",
                            "props": {
                              "className": "font-semibold text-purple-700"
                            },
                            "children": ["🎯 Skill Building"]
                          },
                          {
                            "type": "p",
                            "props": { "className": "text-sm mt-1" },
                            "children": ["Develop valuable experience"]
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

      /* ------------------------------------------------------------ */
      /* 2. ONLINE SIDE HUSTLES (hustleCardGrid)                       */
      /* ------------------------------------------------------------ */
      {
        "type": "Card",
        props: { className: "mt-5" },
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["Online Side Hustles"] },
              {
                "type": "CardDescription",
                "children": ["Work from anywhere with an internet connection"]
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
                  /* ============================================================
                  * 📚 Online Tutoring
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-blue-600 mb-2" },
                        "children": ["📚 Online Tutoring"]
                      },

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "p",
                                "props": { "className": "text-sm mb-2" },
                                "children": [
                                  "Teach subjects you're good at via video call"
                                ]
                              },
                              {
                                "type": "p",
                                "props": { "className": "text-xs" },
                                "children": [
                                  { "type": "strong", "children": ["Platforms:"] },
                                  " Tutor.com, Preply, Wyzant"
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "text-sm" },
                            "children": [
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Pay:"] },
                                  " £10-20/hour"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Requirements:"] },
                                  " Good grades, patience"
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* ============================================================
                  * ✍️ Freelance Writing
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-green-600 mb-2" },
                        "children": ["✍️ Freelance Writing"]
                      },

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "p",
                                "props": { "className": "text-sm mb-2" },
                                "children": [
                                  "Write articles, blog posts, social media content"
                                ]
                              },
                              {
                                "type": "p",
                                "props": { "className": "text-xs" },
                                "children": [
                                  { "type": "strong", "children": ["Platforms:"] },
                                  " Upwork, Fiverr, Contently"
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "text-sm" },
                            "children": [
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Pay:"] },
                                  " £0.05-0.50/word"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Requirements:"] },
                                  " Good English, creativity"
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* ============================================================
                  * 🎨 Graphic Design
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-purple-600 mb-2" },
                        "children": ["🎨 Graphic Design"]
                      },

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "p",
                                "props": { "className": "text-sm mb-2" },
                                "children": [
                                  "Create logos, posters, social media graphics"
                                ]
                              },
                              {
                                "type": "p",
                                "props": { "className": "text-xs" },
                                "children": [
                                  { "type": "strong", "children": ["Platforms:"] },
                                  " 99designs, Fiverr, Dribbble"
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "text-sm" },
                            "children": [
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Pay:"] },
                                  " £5-100/design"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Requirements:"] },
                                  " Design skills, software"
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* ============================================================
                  * 📱 Social Media Management
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-orange-600 mb-2" },
                        "children": ["📱 Social Media Management"]
                      },

                      {
                        "type": "div",
                        "props": { "className": "grid md:grid-cols-2 gap-4" },
                        "children": [
                          {
                            "type": "div",
                            "children": [
                              {
                                "type": "p",
                                "props": { "className": "text-sm mb-2" },
                                "children": [
                                  "Manage social accounts for small businesses"
                                ]
                              },
                              {
                                "type": "p",
                                "props": { "className": "text-xs" },
                                "children": [
                                  { "type": "strong", "children": ["Find clients:"] },
                                  " Local businesses, Upwork"
                                ]
                              }
                            ]
                          },

                          {
                            "type": "div",
                            "props": { "className": "text-sm" },
                            "children": [
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Pay:"] },
                                  " £100-500/month per client"
                                ]
                              },
                              {
                                "type": "p",
                                "children": [
                                  { "type": "strong", "children": ["Requirements:"] },
                                  " Social media savvy"
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

      /* ------------------------------------------------------------ */
      /* 3. LOCAL HUSTLES (hustleCardGrid)                             */
      /* ------------------------------------------------------------ */
      {
        id: "local-hustles",
        type: "list",
        title: "Local & Physical Side Hustles",
        metadata: {
          variant: "hustleCardGrid",
          hustles: [
            {
              title: "Dog Walking & Pet Sitting",
              emoji: "🐕",
              color: "blue",
              description: "Walk dogs or care for pets when owners are away.",
              platformsLabel: "Apps",
              platforms: "Rover, Wag",
              pay: "£10–20/walk, £20–40/night",
              requirements: "Reliability, love animals"
            },
            {
              title: "Food Delivery",
              emoji: "🚗",
              color: "green",
              description:
                "Deliver food using a bike, scooter, or car (17+).",
              platformsLabel: "Apps",
              platforms: "Deliveroo, Just Eat, Uber Eats",
              pay: "£8–15/hour + tips",
              requirements: "Transport, smartphone"
            },
            {
              title: "House Sitting",
              emoji: "🏠",
              color: "purple",
              description: "Look after someone’s home while they're away.",
              platformsLabel: "Platforms",
              platforms: "TrustedHousesitters",
              pay: "£20–50/night",
              requirements: "Trustworthy, responsible"
            },
            {
              title: "Cleaning",
              emoji: "🧽",
              color: "orange",
              description:
                "Clean student accommodation, houses, or local offices.",
              platformsLabel: "Find work",
              platforms: "Local ads, community groups",
              pay: "£10–15/hour",
              requirements: "Attention to detail"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 4. SELLING & TRADING (cardsStack)                             */
      /* ------------------------------------------------------------ */
      {
        "type": "Card",
        props: { className: "mt-5" },
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["Selling & Trading"] }
            ]
          },

          {
            "type": "CardContent",
            "children": [
              {
                "type": "div",
                "props": { "className": "grid gap-4" },
                "children": [
                  /* ============================================================
                  * 👕 Reselling Clothes
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-blue-600 mb-2" },
                        "children": ["👕 Reselling Clothes"]
                      },
                      {
                        "type": "p",
                        "props": { "className": "text-sm mb-2" },
                        "children": [
                          "Buy and sell trendy clothes, vintage items, or sneakers"
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "text-xs" },
                        "children": [
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Platforms:"] },
                              " Depop, Vinted, eBay, Facebook Marketplace"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Potential:"] },
                              " £50-500/month"
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* ============================================================
                  * 📚 Sell Course Materials
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-green-600 mb-2" },
                        "children": ["📚 Sell Course Materials"]
                      },
                      {
                        "type": "p",
                        "props": { "className": "text-sm mb-2" },
                        "children": [
                          "Sell textbooks, notes, study guides to other students"
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "text-xs" },
                        "children": [
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Where:"] },
                              " Facebook groups, uni notice boards, Amazon"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Potential:"] },
                              " £20-200/semester"
                            ]
                          }
                        ]
                      }
                    ]
                  },

                  /* ============================================================
                  * 🎮 Gaming Items
                  * ============================================================ */
                  {
                    "type": "div",
                    "props": { "className": "p-4 border rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-purple-600 mb-2" },
                        "children": ["🎮 Gaming Items"]
                      },
                      {
                        "type": "p",
                        "props": { "className": "text-sm mb-2" },
                        "children": [
                          "Sell in-game items, accounts, or gaming coaching"
                        ]
                      },
                      {
                        "type": "div",
                        "props": { "className": "text-xs" },
                        "children": [
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Popular:"] },
                              " FIFA coins, Fortnite coaching, rare skins"
                            ]
                          },
                          {
                            "type": "p",
                            "children": [
                              { "type": "strong", "children": ["Potential:"] },
                              " £10-100/month"
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

      /* ------------------------------------------------------------ */
      /* 5. TIPS — twoColumn                                           */
      /* ------------------------------------------------------------ */
      {
        id: "side-hustle-tips",
        type: "list",
        title: "Side Hustle Success Tips",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Do This",
              color: "green",
              items: [
                "Start with skills you already have.",
                "Track earnings and time.",
                "Build reviews and reliability.",
                "Set realistic weekly limits."
              ]
            },
            {
              title: "Avoid This",
              color: "red",
              items: [
                "Letting it affect your studies.",
                "Taking on too many clients.",
                "Working for free “for exposure”.",
                "Ignoring tax responsibilities."
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 6. PRO TIP (info box)                                         */
      /* ------------------------------------------------------------ */
      {
        "type": "Card",
        props: { className: "mt-5" },
        "children": [
          {
            "type": "CardHeader",
            "children": [
              { "type": "CardTitle", "children": ["Side Hustle Success Tips"] }
            ]
          },

          {
            "type": "CardContent",
            "children": [
              {
                "type": "div",
                "props": { "className": "grid md:grid-cols-2 gap-6" },
                "children": [
                  /* ============================================================
                  * ✅ Do This
                  * ============================================================ */
                  {
                    "type": "div",
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-green-600 mb-3" },
                        "children": ["✅ Do This:"]
                      },

                      {
                        "type": "ul",
                        "props": { "className": "space-y-2 text-sm" },
                        "children": [
                          { "type": "li", "children": ["• Start with skills you already have"] },
                          { "type": "li", "children": ["• Set realistic time limits"] },
                          { "type": "li", "children": ["• Track your earnings and time"] },
                          { "type": "li", "children": ["• Build good reviews/ratings"] },
                          { "type": "li", "children": ["• Save money for taxes"] },
                          { "type": "li", "children": ["• Network and ask for referrals"] }
                        ]
                      }
                    ]
                  },

                  /* ============================================================
                  * ❌ Avoid This
                  * ============================================================ */
                  {
                    "type": "div",
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold text-red-600 mb-3" },
                        "children": ["❌ Avoid This:"]
                      },

                      {
                        "type": "ul",
                        "props": { "className": "space-y-2 text-sm" },
                        "children": [
                          { "type": "li", "children": ["• Letting it affect your studies"] },
                          { "type": "li", "children": ["• Taking on too much at once"] },
                          { "type": "li", "children": ["• Forgetting about tax obligations"] },
                          { "type": "li", "children": ["• Working for free \"for exposure\""] },
                          { "type": "li", "children": ["• Unreliable communication"] },
                          { "type": "li", "children": ["• Not setting boundaries"] }
                        ]
                      }
                    ]
                  }
                ]
              },

              /* ============================================================
              * 💡 Pro Tip Box
              * ============================================================ */
              {
                "type": "div",
                "props": { "className": "mt-6 p-4 bg-primary/10 rounded-lg" },
                "children": [
                  {
                    "type": "h4",
                    "props": { "className": "font-semibold mb-2" },
                    "children": ["💡 Pro Tip:"]
                  },
                  {
                    "type": "p",
                    "props": { "className": "text-sm" },
                    "children": [
                      "Start with one side hustle and master it before adding more. ",
                      "It's better to earn £200/month consistently than to juggle 5 hustles earning £20 each!"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------ */
      /* 7. ACTION PLAN (steps)                                        */
      /* ------------------------------------------------------------ */
      {
        "type": "Card",
        props: { className: "mt-5" },
        "children": [
          {
            "type": "CardHeader",
            "children": [
              {
                "type": "CardTitle",
                "children": ["Ready to Start Your Side Hustle?"]
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
                    "type": "div",
                    "props": { "className": "bg-primary/10 p-4 rounded-lg" },
                    "children": [
                      {
                        "type": "h4",
                        "props": { "className": "font-semibold mb-2" },
                        "children": ["Your Action Plan:"]
                      },
                      {
                        "type": "ol",
                        "props": {
                          "className": "space-y-1 text-sm list-decimal list-inside"
                        },
                        "children": [
                          { "type": "li", "children": ["Choose 1-2 side hustles that match your skills"] },
                          { "type": "li", "children": ["Set up profiles on relevant platforms"] },
                          { "type": "li", "children": ["Start with small projects to build reviews"] },
                          { "type": "li", "children": ["Track your time and earnings"] },
                          { "type": "li", "children": ["Scale up once you're comfortable"] }
                        ]
                      }
                    ]
                  },

                ]
              }
            ]
          }
        ]
      },
    ],

    /* ------------------------------------------------------------ */
    /* QUIZ                                                         */
    /* ------------------------------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "Which side hustle typically pays the highest hourly rate?",
          options: [
            "Tutoring",
            "Food delivery",
            "Dog walking",
            "Cleaning"
          ],
          correctAnswer: 0,
          explanation: "Tutoring typically pays £10–20/hour because it requires subject knowledge and specialised skills."
        }
      ]
    },


    /* ------------------------------------------------------------ */
    /* RELATED LESSONS                                              */
    /* ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "tax-basics",
        title: "Tax Basics",
        relationship: "next-step"
      },
      {
        moduleId: "how-pay-works",
        title: "How Pay Works",
        relationship: "related"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      }
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 2,
    order: 3,
    isActive: true,
    createdBy: "system"
  },

  // =====================================================
  // 4. Tax Basics
  // =====================================================
  {
    title: "Tax Basics",
    description:
      "PAYE, National Insurance, student jobs & tax",
    categoryId: "earning-income",
    topic: "tax-basics",

    visual: {
      icon: "Calculator",
      iconColor: "bg-green-500",
      badge: "Earning & Income",
      readTime: 3
    },

    contentSections: [
      /* ------------------------------------------------------------ */
      /* 1. WHAT IS TAX?  (mini 3 card grid)                          */
      /* ------------------------------------------------------------ */
      {
        id: "what-is-tax",
        type: "miniInfoGrid",
        title: "What is Tax and Why Do We Pay It?",
        content: 
          "Tax is money the government takes from your earnings to pay for public services like schools, hospitals, roads, and police. Think of it as everyone chipping in for things we all use!",
        metadata: {
          items: [
            {
              title: "🏥 Healthcare",
              description: "NHS hospitals and public health services",
              color: "blue"
            },
            {
              title: "🏫 Education",
              description: "Schools, colleges, and universities",
              color: "green"
            },
            {
              title: "🛣️ Infrastructure",
              description: "Roads, transport, police, and public safety",
              color: "purple"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 2. MAIN TAX TYPES  (cardsStack)                               */
      /* ------------------------------------------------------------ */
      {
        id: "main-tax-types",
        type: "list",
        title: "Main Types of Tax You'll Pay",
        metadata: {
          variant: "cardsStack",
          cards: [
            {
              title: "💰 Income Tax",
              color: "blue",
              items: [
                "Tax on money you earn from jobs",
                "Personal Allowance (2024): £12,570",
                "20% basic rate on earnings above allowance",
                "Most student jobs fall BELOW the tax threshold"
              ]
            },
            {
              title: "🏥 National Insurance",
              color: "green",
              items: [
                "Funds NHS, pensions, and benefits",
                "Threshold (2024): £12,570/year",
                "12% rate above threshold",
                "Most part-time students pay £0"
              ]
            },
            {
              title: "🛒 VAT",
              color: "purple",
              items: [
                "Tax on goods you buy",
                "Standard rate: 20%",
                "Examples: clothes, electronics, restaurants",
                "Most food & children’s clothes are VAT-free"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 3. REAL STUDENT TAX EXAMPLES (twoFeatureCards)                */
      /* ------------------------------------------------------------ */
      {
        id: "student-tax-examples",
        type: "comparison",
        title: "Real Student Tax Examples",
        metadata: {
          variant: "twoFeatureCards",
          cards: [
            {
              title: "Scenario 1: No Tax",
              subtitle: "Typical student part-time job",
              color: "green",
              bullets: [
                "Job: Retail assistant",
                "Hours: 15 hours/week",
                "Pay: £8.50/hour",
                "Annual earnings: £6,630",
                "Tax owed: £0 (under £12,570)"
              ]
            },
            {
              title: "Scenario 2: Some Tax",
              subtitle: "Full-time summer work",
              color: "yellow",
              bullets: [
                "Salary: £15,000/year",
                "Taxable income: £2,430",
                "Income tax: £486",
                "National Insurance: £292",
                "Total tax: £778/year"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 4. NEW — Key Insight (standalone info section)                */
      /* ------------------------------------------------------------ */
      {
        id: "student-tax-key-insight",
        type: "explanation",
        title: "Key Insight",
        icon: "Lightbulb",
        metadata: {
          variant: "info",
          highlightTitle: "💡 Key Insight:",
          highlightText:
            "If you work part-time (under ~25 hours/week at minimum wage), you will likely pay NO income tax or National Insurance."
        }
      },

      /* ------------------------------------------------------------ */
      /* 5. PAYE OVERVIEW (ONLY the blue box)                          */
      /* ------------------------------------------------------------ */
      {
        id: "paye-overview",
        type: "explanation",
        title: "PAYE: Pay As You Earn",
        content:
          "PAYE is the UK system where tax is automatically taken from your paycheck before you receive it.",
        icon: "Receipt",
        metadata: {
          variant: "featureWithList",
          listTitle: "How PAYE Works:",
          listItems: [
            "Employer calculates gross pay",
            "Income Tax & NI deducted automatically",
            "Employer sends tax to HMRC",
            "You receive net pay",
            "Everything is shown clearly on your payslip",
          ],
        }
      },

      /* ------------------------------------------------------------ */
      /* 6. NEW — Two column section (split from PAYE)                 */
      /* ------------------------------------------------------------ */
      {
        id: "paye-benefits-responsibilities",
        type: "list",
        title: "PAYE Benefits & Responsibilities",
        metadata: {
          variant: "twoColumn",
          columns: [
            {
              title: "Benefits of PAYE",
              color: "green",
              items: [
                "Automatic tax calculation",
                "No tax returns needed for most people",
                "Tax spread throughout the year",
                "Employer handles everything"
              ]
            },
            {
              title: "Your Responsibilities",
              color: "blue",
              items: [
                "Provide correct personal details",
                "Keep your P45/P60 documents",
                "Check your payslips for errors",
                "Tell HMRC if you have side income"
              ]
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 7. TAX CODES (miniInfoGrid)                                   */
      /* ------------------------------------------------------------ */
      {
        id: "tax-codes",
        type: "miniInfoGrid",
        title: "Understanding Tax Codes",
        metadata: {
          items: [
            {
              title: "1257L — Most Common",
              description: "Standard tax code (2024): £12,570 tax-free allowance",
              color: "green"
            },
            {
              title: "BR — Basic Rate",
              description:
                "Used for second jobs; all income taxed at 20% with no allowance",
              color: "blue"
            },
            {
              title: "0T — Emergency Tax",
              description:
                "Used when HMRC lacks your details; often leads to overpayment",
              color: "orange"
            }
          ]
        }
      },

      /* ------------------------------------------------------------ */
      /* 8. ACTION PLAN (steps)                                        */
      /* ------------------------------------------------------------ */
      {
        id: "tax-action-plan",
        type: "steps",
        title: "Tax Action Plan for Students",
        metadata: {
          steps: [
            { number: 1, text: "Keep all payslips & P60 documents" },
            { number: 2, text: "Check your tax code (usually 1257L)" },
            { number: 3, text: "Register with HMRC if side income > £1,000/year" },
            { number: 4, text: "Claim tax refunds if you overpay" },
            { number: 5, text: "Learn to read your payslip properly" }
          ]
        }
      }
    ],


    /* ------------------------------------------------------------ */
    /* QUIZ                                                         */
    /* ------------------------------------------------------------ */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the personal allowance for income tax in 2024?",
          options: ["£11,850", "£12,570", "£13,500", "£10,000"],
          correctAnswer: 1,
          explanation:
            "The personal allowance is £12,570, meaning you pay no income tax on this amount."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    /* RELATED LESSONS                                              */
    /* ------------------------------------------------------------ */
    relatedLessons: [
      {
        moduleId: "how-pay-works",
        title: "How Pay Works",
        relationship: "related"
      },
      {
        moduleId: "side-hustles",
        title: "Side Hustles",
        relationship: "next-step"
      },
      {
        moduleId: "budgeting-basics",
        title: "Budgeting Basics",
        relationship: "related"
      }
    ],

    points: 100,
    difficultyLevel: "beginner",
    timeEstimate: 3,
    order: 3,
    isActive: true,
    createdBy: "system"
  }

];

// =====================================================
// Seed Function
// =====================================================
async function seedEarningIncome() {
  try {
    for (const module of earningIncomeModules) {
      await LearningModule.findOneAndUpdate(
        { topic: module.topic },
        module,
        { upsert: true, new: true }
      );

      console.log(`🔄 Upserted module: ${module.title}`);
    }
    console.log("✅ Earning & Income modules seeded!");
  } catch (error) {
    console.error("❌ Error seeding Earning & Income:", error);
  }
}


module.exports = {
  earningIncomeModules,
  seedEarningIncome,
};
