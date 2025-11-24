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
    topic: "how-to-spot-good-value",
    title: "How to Spot Good Value",
    description: "Learn how to use unit pricing, comparisons, and smart strategies to get the most value for your money.",
    categoryId: "spending-wisely",

    visual: {
      icon: "ShoppingCart",
      iconColor: "bg-orange-500",
      badge: "Spending Wisely",
      readTime: 2
    },

    difficultyLevel: "beginner",
    points: 70,
    timeEstimate: 2,
    order: 1,
    isActive: true,
    createdBy: "system",

    /* ---------------------------------------------------------
    * CONTENT SECTIONS
    * --------------------------------------------------------- */
    contentSections: [
      /* ------------------------- SECTION TITLE ------------------------- */
      {
        id: "unit-pricing-title",
        type: "section-title",
        icon: "Calculator",
        title: "Unit Pricing: Your Secret Weapon"
      },

      /* --------------------------- EXPLANATION -------------------------- */
      {
        id: "unit-pricing-explanation",
        type: "explanation",
        content:
          "Unit pricing tells you the cost per gram, liter, or item. It's the easiest and most accurate way to compare value between different product sizes and brands."
      },

      /* ----------------------------- EXAMPLE ---------------------------- */
      {
        id: "unit-pricing-example",
        type: "example",
        title: "Real Example: Pasta",
        content:
          "Brand A: 500g for £2.50 → £5.00/kg\n" +
          "Brand B: 750g for £3.00 → £4.00/kg ✓ Better value\n\n" +
          "Brand B is 20% cheaper per kg, even though it costs slightly more upfront."
      },

      /* ------------------------- BRANDS VS OWN LABEL -------------------- */
      {
        id: "brands-vs-own",
        type: "section-title",
        title: "Brands vs Own-Label"
      },
      {
        id: "brands-vs-own-comparison",
        type: "comparison",
        metadata: {
          leftTitle: "Branded Products",
          leftColor: "blue",
          leftPoints: [
            "Premium pricing due to marketing",
            "Often same ingredients as own-label",
            "Better packaging and reputation",
            "Sometimes higher quality"
          ],
          rightTitle: "Own-Label Products",
          rightColor: "green",
          rightPoints: [
            "30–50% cheaper on average",
            "Often made by same manufacturers",
            "Basic but functional packaging",
            "Quality controlled by supermarket"
          ]
        }
      },
      {
        id: "smart-shopping-tip",
        type: "tip",
        title: "Smart Shopping Strategy",
        content:
          "Try own-label first for everyday basics. Stick to brands only for items where quality truly matters to you. Check whether own-label and branded products come from the same manufacturer."
      },

      /* ------------------------- Comparison Shopping -------------------- */
      {
        id: "comparison-title",
        type: "section-title",
        title: "Smart Comparison Shopping"
      },

      {
        id: "apps-list",
        type: "list",
        title: "Useful Apps & Websites",
        items: [
          "Honey — finds discount codes automatically",
          "PriceGrabber — compares prices across stores",
          "ShopSavvy — barcode scanner for price checks",
          "Supermarket apps — Tesco, ASDA, Sainsbury’s"
        ]
      },

      {
        id: "timing-list",
        type: "list",
        title: "Timing Tips",
        items: [
          "Yellow sticker reductions near closing time",
          "Seasonal sales — Christmas, Black Friday",
          "Weekly deal cycles — often start midweek",
          "End-of-month deals for furniture & cars"
        ]
      },

      {
        id: "hidden-costs-list",
        type: "list",
        title: "Hidden Costs to Watch",
        items: [
          "Delivery fees",
          "Membership costs (Prime, Costco)",
          "Overpriced extended warranties",
          "Installation or setup fees"
        ]
      },

      /* ------------------------- Value Traps ---------------------------- */
      {
        id: "value-traps-title",
        type: "section-title",
        title: "Avoid Value Traps"
      },

      {
        id: "false-economy-warning",
        type: "warning",
        title: "False Economy Examples",
        content:
          "Buying low-quality items that break quickly, spending extra for 'free delivery', overbuying perishables, choosing misleadingly cheap phone contracts, or getting sucked into store card discounts with high interest rates."
      },

      {
        id: "true-value-list",
        type: "list",
        title: "True Value Indicators",
        items: [
          "Strong customer reviews",
          "Included warranty or guarantee",
          "Low cost per use",
          "Durable materials",
          "Multi-purpose functionality"
        ]
      },

      {
        id: "red-flags-list",
        type: "list",
        title: "Major Red Flags",
        items: [
          "Pressure-selling tactics",
          "No return policy",
          "Prices that seem too good to be true",
          "Hidden fees or unclear terms",
          "Pushy sales reps"
        ]
      },

      /* ------------------------- Next Steps (Action Plan) ---------------------------- */
      {
        id: "next-steps-title",
        type: "section-title",
        title: "Become a Smart Shopper"
      },

      {
        id: "action-plan-steps",
        type: "steps",
        steps: [
          { title: "Download comparison apps", description: "" },
          { title: "Try own-label alternatives", description: "" },
          { title: "Check unit prices for weekly essentials", description: "" },
          { title: "Set price alerts for big purchases", description: "" },
          { title: "Track your savings over a month", description: "" }
        ]
      }
    ],

    /* ---------------------------------------------------------
    * QUIZ
    * --------------------------------------------------------- */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question:
            "What's the most accurate way to compare value between products of different sizes?",
          options: [
            "Unit pricing",
            "Total price",
            "Brand reputation",
            "Package size"
          ],
          correctAnswer: 0,
          explanation:
            "Unit pricing shows the cost per gram/liter/item, making it the best comparison method."
        }
      ]
    },

    /* ---------------------------------------------------------
    * RELATED LESSONS
    * --------------------------------------------------------- */
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
    topic: "avoiding-scams",
    title: "Avoiding Scams & Fraud",
    description: "Learn how to identify scams, spot red flags, protect yourself online, and take action if you're targeted.",
    categoryId: "spending-wisely",

    visual: {
      icon: "Shield",
      iconColor: "bg-orange-500",
      badge: "Spending Wisely",
      readTime: 3
    },

    difficultyLevel: "beginner",
    points: 90,
    timeEstimate: 3,
    order: 2,
    isActive: true,
    createdBy: "system",

    /* ---------------------------------------------------------
    * CONTENT SECTIONS
    * --------------------------------------------------------- */
    contentSections: [
      /* ---------------------- Title: Common Scams ---------------------- */
      {
        id: "common-scams-title",
        type: "section-title",
        icon: "AlertTriangle",
        title: "Common Online Scams Targeting Students"
      },

      /* ---------------------- List: Common Scam Types ------------------ */
      {
        id: "common-scams-list",
        type: "list",
        title: "High-Risk Scams",
        items: [
          "Student loan scams promising instant forgiveness for a fee",
          "Fake job offers with guaranteed high pay and no experience",
          "Phone and text scams pretending to be banks",
          "Fake online shopping websites offering unrealistic prices"
        ]
      },

      /* -------------------- Explanation per Scam ----------------------- */
      {
        id: "scam-explanations",
        type: "explanation",
        content:
          "Scammers often target students with urgent messages, unrealistic promises, or requests for upfront payments. If something feels off, trust your instincts and pause before acting."
      },

      /* ---------------------- Spotting Scams --------------------------- */
      {
        id: "spotting-title",
        type: "section-title",
        title: "How to Spot a Scam"
      },

      {
        id: "red-flags",
        type: "list",
        title: "Major Red Flags",
        items: [
          "Requests for money or personal information upfront",
          "Guaranteed returns or instant success",
          "Spelling mistakes or unprofessional design",
          "No physical address or legitimate contact info",
          "Unusual payment methods (gift cards, crypto)",
          "Pressure to 'act now' or secrecy"
        ]
      },

      {
        id: "legit-signs",
        type: "list",
        title: "What Legitimate Companies Do",
        items: [
          "Provide clear contact information and physical address",
          "Use secure websites (HTTPS)",
          "Make realistic promises",
          "Provide accessible reviews and transparent policies",
          "Use secure payment methods and no pressure tactics"
        ]
      },

      /* ---------------------- Social Media Scams ----------------------- */
      {
        id: "social-title",
        type: "section-title",
        title: "Social Media & Influencer Scams"
      },

      {
        id: "social-scam-explanation",
        type: "explanation",
        content:
          "Scammers often use Instagram, TikTok, and influencers to push fake investment schemes, pyramid schemes, or overpriced 'courses' promising fast income."
      },

      {
        id: "social-scam-list",
        type: "list",
        title: "Common Social Media Scams",
        items: [
          "Fake crypto investment opportunities",
          "‘Get rich quick’ online courses",
          "Pyramid schemes disguised as business opportunities",
          "Fake designer goods sold at impossible prices"
        ]
      },

      {
        id: "influencer-check",
        type: "list",
        title: "How to Check Influencers",
        items: [
          "Look for #ad or #sponsored labels",
          "Check if they actually use the product",
          "Avoid those who promote too many unrelated products",
          "Look for real engagement, not just follower numbers"
        ]
      },

      {
        id: "research-before-buying",
        type: "list",
        title: "Do Your Research Before Buying",
        items: [
          "Search the company name with 'scam' or 'review'",
          "Check Trustpilot or Google Reviews",
          "Look for complaints on Reddit or student forums",
          "Verify business registration details"
        ]
      },

      /* ---------------------- Protection Strategies -------------------- */
      {
        id: "protection-title",
        type: "section-title",
        title: "Protect Yourself: Smart Strategies"
      },

      {
        id: "online-safety",
        type: "list",
        title: "Online Shopping Safety",
        items: [
          "Only shop on secure websites (look for HTTPS)",
          "Use credit cards — better fraud protection",
          "Avoid saving payment details on unknown sites",
          "Check return policies before buying",
          "Use PayPal or Apple Pay where possible"
        ]
      },

      {
        id: "email-phone-safety",
        type: "list",
        title: "Email & Phone Safety",
        items: [
          "Never click suspicious links",
          "Banks will never ask for passwords via text",
          "Always call the company directly if unsure",
          "Ignore calls from unknown numbers",
          "Be cautious of urgent or threatening messages"
        ]
      },

      {
        id: "financial-protection",
        type: "list",
        title: "Financial Protection",
        items: [
          "Enable alerts for all bank transactions",
          "Check your bank statements weekly",
          "Never give your full card details over phone",
          "Use different passwords for financial accounts",
          "Enable two-factor authentication everywhere possible"
        ]
      },

      /* ---------------------- What to do if scammed -------------------- */
      {
        id: "scammed-title",
        type: "section-title",
        title: "If You've Been Scammed: Act Fast!"
      },

      {
        id: "immediate-actions",
        type: "steps",
        steps: [
          { title: "Contact your bank immediately", description: "" },
          { title: "Report to Action Fraud (0300 123 2040)", description: "" },
          { title: "Change passwords to affected accounts", description: "" },
          { title: "Take screenshots and gather evidence", description: "" },
          { title: "Report the scammer to the platform", description: "" }
        ]
      },

      {
        id: "key-numbers",
        type: "list",
        title: "Important Contacts",
        items: [
          "Action Fraud: 0300 123 2040",
          "Citizens Advice: 0808 223 1133",
          "Financial Ombudsman: 0300 123 9123",
          "Your bank’s fraud hotline"
        ]
      },

      {
        id: "prevention-next-time",
        type: "tip",
        title: "Avoid Future Scams",
        content:
          "Trust your instincts. Research before buying, avoid rushed decisions, and stay updated on new scam techniques."
      },

      /* ---------------------- Security Checklist ----------------------- */
      {
        id: "checklist-title",
        type: "section-title",
        title: "Your Security Checklist"
      },

      {
        id: "security-checklist",
        type: "list",
        title: "Do These Regularly",
        items: [
          "Enable fraud alerts on all bank accounts",
          "Use two-factor authentication everywhere",
          "Use a separate email for online shopping",
          "Keep learning about scam trends",
          "Share scam awareness with friends & family"
        ]
      }
    ],

    /* ---------------------------------------------------------
    * QUIZ
    * --------------------------------------------------------- */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What's the biggest red flag when shopping online?",
          options: [
            "No contact information",
            "Prices too good to be true",
            "Poor website design",
            "Only accepts cash"
          ],
          correctAnswer: 1,
          explanation:
            "If prices seem too good to be true, they usually are — this is the strongest scam indicator."
        }
      ]
    },

    /* ---------------------------------------------------------
    * RELATED LESSONS
    * --------------------------------------------------------- */
    relatedLessons: [
      {
        moduleId: "good-value",
        title: "How to Spot Good Value",
        relationship: "next-step"
      },
      {
        moduleId: "credit-cards-safely",
        title: "Using Credit Cards Safely",
        relationship: "related"
      }
    ]
  },
  
  // Using Buy Now Pay Later & Credit Cards Safely
  {
    topic: "credit-cards-safely",
    title: "Using Buy Now Pay Later & Credit Cards Safely",
    description: "Understand how Buy Now Pay Later services and credit cards work, their risks and benefits, and how to use them without falling into debt.",
    categoryId: "spending-wisely",

    visual: {
      icon: "CreditCard",
      iconColor: "bg-orange-500",
      badge: "Spending Wisely",
      readTime: 3
    },

    difficultyLevel: "intermediate",
    points: 100,
    timeEstimate: 3,
    order: 3,
    isActive: true,
    createdBy: "system",

    /* ---------------------------------------------------------
    * CONTENT SECTIONS
    * --------------------------------------------------------- */
    contentSections: [
      /* -------------------- BNPL Overview -------------------- */
      {
        id: "bnpl-title",
        type: "section-title",
        icon: "ShoppingBag",
        title: "Buy Now Pay Later (BNPL): The Good and the Bad"
      },
      {
        id: "bnpl-explanation",
        type: "explanation",
        content:
          "Buy Now Pay Later (BNPL) services like Klarna, Clearpay, and PayPal Pay in 3 let you split purchases into instalments. They can be useful for managing short-term cash flow, but they are still a form of borrowing and can become dangerous if misused."
      },
      {
        id: "bnpl-benefits",
        type: "list",
        title: "BNPL Benefits",
        items: [
          "No interest if you pay on time",
          "Helps manage cash flow for planned purchases",
          "Often easier to get than a credit card",
          "Can help build a positive payment history",
          "Some platforms include buyer protection"
        ]
      },
      {
        id: "bnpl-risks",
        type: "list",
        title: "BNPL Risks",
        items: [
          "Late fees can be expensive (e.g. £6–£12 per missed payment)",
          "Missed payments can harm your credit score",
          "Easy to overspend and lose track of multiple instalments",
          "Using several BNPL apps at once can spiral into debt",
          "Less legal protection than a traditional credit card"
        ]
      },
      {
        id: "bnpl-student-example",
        type: "tip",
        title: "Real Student Example",
        content:
          "A student bought £300 worth of clothes across 3 different BNPL apps. Because payments were spread out, they forgot about some and got hit with multiple late fees. What seemed like 'free money' became extra cost and stress during exams."
      },

      /* -------------------- BNPL Best Practices -------------------- */
      {
        id: "bnpl-best-practices-title",
        type: "section-title",
        title: "BNPL Best Practices"
      },
      {
        id: "bnpl-smart-usage",
        type: "list",
        title: "Smart BNPL Usage Tips",
        items: [
          "Only use BNPL for planned purchases you can genuinely afford",
          "Set up automatic payments to avoid late fees",
          "Stick to ONE BNPL service at a time",
          "Track all upcoming instalments in your budget or calendar",
          "Avoid using BNPL for groceries, bills, or everyday living costs"
        ]
      },
      {
        id: "bnpl-good-uses",
        type: "list",
        title: "When BNPL Can Make Sense",
        items: [
          "Spreading the cost of essential items (like a laptop for university)",
          "When you have guaranteed income arriving soon",
          "For items you were already planning and saving for",
          "When the total instalments fit comfortably in your budget"
        ]
      },
      {
        id: "bnpl-avoid",
        type: "list",
        title: "When to Avoid BNPL",
        items: [
          "Impulse purchases you didn’t plan",
          "Items you couldn't afford even with instalments",
          "Everyday expenses like food, bills, or nights out",
          "When you already have other BNPL payments due"
        ]
      },

      /* -------------------- Credit Cards Basics -------------------- */
      {
        id: "credit-cards-title",
        type: "section-title",
        icon: "CreditCard",
        title: "Credit Cards: Use Them Right"
      },
      {
        id: "credit-cards-explanation",
        type: "explanation",
        content:
          "Credit cards are powerful tools. They can give you strong consumer protection and help build your credit score, but they also come with high interest rates if you carry a balance."
      },
      {
        id: "credit-card-benefits",
        type: "list",
        title: "Credit Card Benefits",
        items: [
          "Section 75 protection on purchases between £100 and £30,000",
          "Better fraud protection than most debit cards",
          "Helps build your credit history for future loans and mortgages",
          "Potential cashback, points, or rewards",
          "Extra purchase protection on big items"
        ]
      },
      {
        id: "credit-card-dangers",
        type: "list",
        title: "Credit Card Dangers",
        items: [
          "High interest rates (often 18–29% APR or more)",
          "Minimum payment trap can keep you in debt for years",
          "Easy to overspend because it doesn’t feel like cash",
          "Missed payments can damage your credit score",
          "Extra fees for late payments, cash withdrawals, or overseas use"
        ]
      },

      /* -------------------- Golden Rules -------------------- */
      {
        id: "golden-rules-title",
        type: "section-title",
        title: "Credit Card Golden Rules"
      },
      {
        id: "golden-rules-main",
        type: "explanation",
        content:
          "The most important rule: if you can't afford to pay off your credit card in full each month, you can't really afford the purchase. Treat your card like a tool for convenience and protection, not a source of extra money."
      },
      {
        id: "minimum-payment-trap",
        type: "explanation",
        content:
          "Example: You owe £1,000 at 22% APR and only pay the minimum £25 per month. It could take over 4 years to clear the debt and cost hundreds of pounds in interest. Minimum payments are designed to benefit the lender, not you."
      },
      {
        id: "smart-usage-list",
        type: "list",
        title: "Smart Credit Card Usage",
        items: [
          "Use your card for planned, budgeted expenses only",
          "Set up a direct debit to pay the full balance every month",
          "Track your spending in your banking app",
          "Avoid cash withdrawals (they often have extra fees and interest)",
          "Keep your balance under 30% of your credit limit for a healthy score"
        ]
      },
      {
        id: "pro-tips-list",
        type: "list",
        title: "Pro Tips for Students",
        items: [
          "Start with a low credit limit (around £300–£500)",
          "Choose cards with no annual fee",
          "Use your card for big purchases to get Section 75 protection",
          "Pay before the statement date to show low or zero utilisation",
          "Never lend your card or share your PIN with anyone"
        ]
      },

      /* -------------------- Student Card Examples -------------------- */
      {
        id: "student-cards-title",
        type: "section-title",
        title: "Examples of Student-Friendly Credit Cards"
      },
      {
        id: "barclaycard-forward",
        type: "list",
        title: "Barclaycard Forward",
        items: [
          "Designed for people with limited credit history",
          "No annual fee",
          "Representative APR around the mid-20% range",
          "Typical starting credit limits are relatively low to keep things manageable"
        ]
      },
      {
        id: "halifax-clarity",
        type: "list",
        title: "Halifax Clarity",
        items: [
          "Good for travel – often no foreign transaction fees",
          "No annual fee",
          "Representative APR in the low-20% range",
          "Useful if you study or travel abroad frequently"
        ]
      },
      {
        id: "aqua-classic",
        type: "list",
        title: "Aqua / 'Credit Builder' Style Cards",
        items: [
          "Designed for people with no or poor credit history",
          "Higher APR, so paying in full is essential",
          "Easier acceptance criteria",
          "Can be a stepping stone to better cards if used responsibly"
        ]
      },

      /* -------------------- Action Plan -------------------- */
      {
        id: "action-plan-title",
        type: "section-title",
        title: "Your Action Plan"
      },
      {
        id: "action-plan-steps",
        type: "steps",
        steps: [
          {
            title: "Limit your BNPL usage",
            description: "Use at most one BNPL provider and set up automatic payments."
          },
          {
            title: "Pick a student-friendly card",
            description: "Choose a credit card with no annual fee and a sensible limit."
          },
          {
            title: "Set up full payment direct debit",
            description: "Always pay the full balance each month, not the minimum."
          },
          {
            title: "Use credit for planned spending only",
            description: "Avoid impulse purchases on both BNPL and credit cards."
          },
          {
            title: "Monitor your credit score",
            description: "Use free apps or your bank to check your score monthly."
          }
        ]
      }
    ],

    /* ---------------------------------------------------------
    * QUIZ
    * --------------------------------------------------------- */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is the safest way to use a credit card?",
          options: [
            "Pay only the minimum amount each month",
            "Pay the full amount every month",
            "Use it for every purchase you make",
            "Keep a high balance to show the bank you use it"
          ],
          correctAnswer: 1,
          explanation:
            "Paying the full balance each month avoids interest charges and builds a strong credit history. Minimum payments and high balances keep you in debt."
        }
      ]
    },

    /* ---------------------------------------------------------
    * RELATED LESSONS
    * --------------------------------------------------------- */
    relatedLessons: [
      {
        moduleId: "credit-scores",
        title: "Understanding Credit Scores",
        relationship: "next-step"
      },
      {
        moduleId: "good-vs-bad-debt",
        title: "Good vs Bad Debt",
        relationship: "related"
      },
      {
        moduleId: "avoiding-scams",
        title: "Avoiding Scams & Fraud",
        relationship: "related"
      }
    ]
  },

  // Cost of Living: Student Perspective
  {
    topic: "cost-of-living",
    title: "Cost of Living: Student Perspective",
    description: "A complete breakdown of real student expenses, regional cost differences, housing choices, food budgeting, and how to manage rising living costs effectively.",
    categoryId: "spending-wisely",

    visual: {
      icon: "Home",
      iconColor: "bg-orange-500",
      badge: "Spending Wisely",
      readTime: 3
    },

    difficultyLevel: "beginner",
    points: 100,
    timeEstimate: 3,
    order: 4,
    isActive: true,
    createdBy: "system",

    /* ---------------------------------------------------------
    * CONTENT SECTIONS
    * --------------------------------------------------------- */
    contentSections: [
      /* -------------------- Student Cost Breakdown -------------------- */
      {
        id: "cost-breakdown-title",
        type: "section-title",
        title: "Real Student Living Costs (2024)",
        description: "Based on surveys of UK students"
      },
      {
        id: "average-budget",
        type: "explanation",
        content:
          "The rising cost of living affects students significantly. Rent, bills, groceries, and transport often take up a large portion of your student loan. Understanding the breakdown helps you plan realistically."
      },
      {
        id: "budget-breakdown-list",
        type: "list",
        title: "Average Monthly Student Budget",
        items: [
          "Rent & Bills: £400–600",
          "Food & Groceries: £150–200",
          "Transport: £50–80",
          "Study Materials: £30–50",
          "Clothes: £30–60",
          "Social/Entertainment: £80–120",
          "Phone & Internet: £25–40",
          "Total: £765–1,150"
        ]
      },

      /* -------------------- Regional Differences -------------------- */
      {
        id: "regional-differences-title",
        type: "section-title",
        icon: "MapPin",
        title: "Location Makes a Huge Difference"
      },
      {
        id: "most-expensive",
        type: "list",
        title: "Most Expensive Student Cities",
        items: [
          "London: £1,200–1,800 per month",
          "Cambridge: £1,000–1,400 per month",
          "Oxford: £1,000–1,400 per month",
          "Brighton: £900–1,300 per month"
        ]
      },
      {
        id: "moderate-cities",
        type: "list",
        title: "Moderate Cost Cities",
        items: [
          "Manchester: £700–1,000",
          "Birmingham: £650–950",
          "Leeds: £600–900",
          "Bristol: £700–1,000"
        ]
      },
      {
        id: "affordable-cities",
        type: "list",
        title: "Most Affordable Cities",
        items: [
          "Hull: £500–750",
          "Stoke: £450–700",
          "Preston: £500–750",
          "Swansea: £550–800"
        ]
      },
      {
        id: "location-tips",
        type: "list",
        title: "Money-Saving Location Tips",
        items: [
          "Consider smaller cities with lower costs but strong universities",
          "Factor in transport when comparing rent prices",
          "Research local student discounts",
          "Check graduate job rates vs living costs"
        ]
      },

      /* -------------------- Housing Options -------------------- */
      {
        id: "housing-title",
        type: "section-title",
        title: "Student Housing: Comparing Your Options"
      },
      {
        id: "halls",
        type: "list",
        title: "University Halls (Cost: £100–200/week)",
        items: [
          "Pros: Bills included, close to campus, social, no guarantor needed",
          "Cons: More expensive, less privacy, strict rules, small kitchens"
        ]
      },
      {
        id: "private-housing",
        type: "list",
        title: "Private Student Housing (Cost: £80–150/week)",
        items: [
          "Pros: Cheaper, independence, choose housemates, good kitchens",
          "Cons: Bills not included, need deposits, maintenance responsibility"
        ]
      },
      {
        id: "living-at-home",
        type: "list",
        title: "Living With Family (Cost: £0–300/month)",
        items: [
          "Pros: Cheapest option, home cooking, emotional support",
          "Cons: Commute costs, miss social life, less independence"
        ]
      },

      /* -------------------- Food Budgeting -------------------- */
      {
        id: "food-budget-title",
        type: "section-title",
        title: "Smart Food Budgeting"
      },
      {
        id: "food-tips",
        type: "list",
        title: "Budget-Friendly Food Tips",
        items: [
          "Cook in bulk and freeze portions",
          "Shop at Aldi/Lidl for basics",
          "Use yellow-sticker reductions",
          "Buy frozen veg (cheaper + nutritious)",
          "Learn 5–10 cheap recipes",
          "Share cooking with housemates",
          "Use student discounts when eating out"
        ]
      },
      {
        id: "weekly-food-budget",
        type: "list",
        title: "Weekly Food Cost Breakdown",
        items: [
          "Groceries: £25–35",
          "Eating out: £10–15",
          "Snacks/drinks: £5–10",
          "Total per week: £40–60"
        ]
      },
      {
        id: "meal-prep-heroes",
        type: "list",
        title: "Student Meal Prep Heroes",
        items: [
          "Pasta & Rice – cheap, filling, extremely versatile",
          "Eggs – high protein and low cost",
          "Beans & Lentils – nutritious and affordable"
        ]
      },

      /* -------------------- Transport -------------------- */
      {
        id: "transport-title",
        type: "section-title",
        title: "Getting Around on a Budget"
      },
      {
        id: "public-transport",
        type: "list",
        title: "Public Transport Tips",
        items: [
          "Student discounts typically 30% off",
          "Monthly passes save money",
          "16–25 Railcard saves 1/3 on trains",
          "Bus passes: usually £40–80/month"
        ]
      },
      {
        id: "cycling-tips",
        type: "list",
        title: "Cycling: Low-Cost Transport",
        items: [
          "Initial cost £100–300",
          "Free exercise + travel",
          "Bike-sharing schemes in many cities",
          "Consider cycle-to-work discounts"
        ]
      },
      {
        id: "car-costs",
        type: "list",
        title: "Cars Are Expensive for Students",
        items: [
          "Insurance: £800–2,000/year",
          "Fuel: £100–200/month",
          "Parking: £50–150/month",
          "Maintenance: £500+/year",
          "Total yearly cost: £2,000–4,000"
        ]
      }
    ],

    /* ---------------------------------------------------------
    * QUIZ
    * --------------------------------------------------------- */
    quiz: {
      passingScore: 1,
      questions: [
        {
          question: "What is typically the biggest expense in a student budget?",
          options: ["Rent", "Food", "Transport", "Entertainment"],
          correctAnswer: 0,
          explanation:
            "Rent and accommodation usually take up 40–60% of a student's monthly budget, making it the largest expense by far."
        }
      ]
    },

    /* ---------------------------------------------------------
    * RELATED LESSONS
    * --------------------------------------------------------- */
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
      },
      {
        moduleId: "good-value",
        title: "How to Spot Good Value",
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
