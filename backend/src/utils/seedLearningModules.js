/**
 * Seed Learning Modules
 * Populates the database with initial interactive learning modules
 * Run this script to add sample learning content to your production database
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const LearningModule = require('../models/LearningModule');

const sampleModules = [
  {
    title: "Understanding Compound Interest",
    description: "Learn how compound interest can grow your savings exponentially over time. Master the power of time and compounding!",
    topic: "Investing",
    lessonContent: `
# Understanding Compound Interest

Compound interest is when you earn interest on both your initial investment AND the interest you've already earned. It's one of the most powerful concepts in finance!

## The Power of Compounding

Einstein allegedly called compound interest "the eighth wonder of the world." Here's why:

- **Year 1**: You invest £1,000 at 5% → Earn £50
- **Year 2**: Now you have £1,050, earn 5% on that → Earn £52.50
- **Year 3**: Now you have £1,102.50, earn 5% on that → Earn £55.13

Each year, you're earning interest on a larger amount!

## The Formula

**A = P(1 + r/n)^(nt)**

Where:
- A = Final amount
- P = Principal (initial investment)
- r = Annual interest rate (decimal)
- n = Number of times interest compounds per year
- t = Number of years
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "You invest £1,000 at 5% annual interest compounded yearly. How much will you have after 2 years?",
          options: [
            "£1,050",
            "£1,100",
            "£1,102.50",
            "£1,105"
          ],
          correctAnswer: 2,
          explanation: "After year 1: £1,000 × 1.05 = £1,050. After year 2: £1,050 × 1.05 = £1,102.50",
          points: 100
        },
        {
          id: "q2",
          question: "What makes compound interest more powerful than simple interest?",
          options: [
            "Higher interest rates",
            "Earning interest on previously earned interest",
            "Lower principal amounts",
            "Shorter time periods"
          ],
          correctAnswer: 1,
          explanation: "Compound interest earns interest on both the principal AND previously earned interest, creating exponential growth.",
          points: 100
        },
        {
          id: "q3",
          question: "Which factor has the MOST impact on compound interest growth?",
          options: [
            "The interest rate",
            "The initial amount",
            "Time (length of investment)",
            "Your age"
          ],
          correctAnswer: 2,
          explanation: "Time is the most powerful factor. Even small amounts can grow significantly with enough time due to exponential growth.",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What is Compound Interest?",
        content: "Compound interest is interest calculated on the initial principal AND on accumulated interest from previous periods.",
        emoji: "💰",
        points: 25
      },
      {
        id: "step2",
        type: "example",
        title: "Simple vs Compound",
        content: "£1,000 at 10% for 5 years:\n\nSimple Interest: £1,500\nCompound Interest: £1,610.51\n\nThat's £110.51 extra just from compounding!",
        emoji: "📊",
        points: 25
      },
      {
        id: "step3",
        type: "interactive",
        title: "Try It Yourself",
        content: "Use our calculator to see how different amounts grow over time.",
        emoji: "🧮",
        points: 25
      }
    ],
    points: 300,
    difficultyLevel: "beginner",
    timeEstimate: 20,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Creating Your First Budget",
    description: "Master the art of budgeting with the 50/30/20 rule. Take control of your finances and achieve your savings goals!",
    topic: "Budgeting",
    lessonContent: `
# Creating Your First Budget

A budget is your financial roadmap. It helps you understand where your money goes and ensures you're working toward your goals.

## The 50/30/20 Rule

This simple framework divides your after-tax income into three categories:

### 50% - Needs
Essential expenses you can't avoid:
- Rent/mortgage
- Utilities
- Groceries
- Transportation
- Insurance
- Minimum debt payments

### 30% - Wants
Things that enhance your life but aren't essential:
- Dining out
- Entertainment
- Hobbies
- Subscriptions
- Shopping

### 20% - Savings & Debt
Building your future:
- Emergency fund
- Retirement savings
- Extra debt payments
- Investment accounts
    `,
    activityType: "simulation",
    activityData: {
      title: "Monthly Budget Simulator",
      description: "You just got your first job earning £2,000 per month after tax. Allocate your income wisely!",
      monthlyIncome: 2000,
      categories: [
        { name: "Rent", type: "need", suggested: 600, min: 400, max: 900 },
        { name: "Groceries", type: "need", suggested: 200, min: 150, max: 350 },
        { name: "Transportation", type: "need", suggested: 100, min: 50, max: 200 },
        { name: "Utilities", type: "need", suggested: 100, min: 80, max: 150 },
        { name: "Entertainment", type: "want", suggested: 200, min: 0, max: 400 },
        { name: "Dining Out", type: "want", suggested: 150, min: 0, max: 300 },
        { name: "Shopping", type: "want", suggested: 150, min: 0, max: 300 },
        { name: "Savings", type: "savings", suggested: 300, min: 100, max: 800 },
        { name: "Emergency Fund", type: "savings", suggested: 200, min: 0, max: 500 }
      ],
      targetRatios: {
        needs: 50,
        wants: 30,
        savings: 20
      }
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What is a Budget?",
        content: "A budget is simply a plan for your money. It helps you see where your money comes from and where it goes, so you can make sure you have enough for the things you need and want.\n\nThink of it like this:\nIf your money was water, a budget would be like having different buckets to catch it - one for rent, one for food, one for fun, and one for saving!",
        emoji: "🤔",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Needs vs Wants: The Foundation",
        content: "✅ NEEDS (Must Have)\nRent/Housing\nFood & Groceries\nTransport to work/uni\nPhone bill\nEssential clothing\n\n⚠️ WANTS (Nice to Have)\nNetflix/Spotify subscriptions\nEating out/takeaways\nDesigner clothes\nGaming/entertainment\nHolidays",
        emoji: "✅",
        points: 10
      },
      {
        id: "step3",
        type: "explanation",
        title: "The 50/30/20 Rule (Perfect for Students!)",
        content: "The simplest way to budget your money\n\n50% NEEDS\nRent, food, transport, phone\n\n30% WANTS\nFun, eating out, entertainment\n\n20% SAVINGS\nEmergency fund, future goals\n\nExample with £1000/month income:\n• £500 for needs (rent, food, transport)\n• £300 for wants (fun, eating out)\n• £200 for savings",
        emoji: "📊",
        points: 15
      },
      {
        id: "step4",
        type: "explanation",
        title: "How to Start Budgeting (3 Easy Steps)",
        content: "1. Track Your Income\nAdd up all money coming in: part-time job, student loan, family support\n\n2. List Your Expenses\nWrite down everything you spend money on for a week\n\n3. Apply the 50/30/20 Rule\nSplit your income and adjust your spending to fit",
        emoji: "🚀",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "💡 Quick Budgeting Tips",
        content: "• Use apps like Monzo or Starling Bank to track spending automatically\n• Review your budget every month and adjust as needed\n• If you overspend in one category, reduce another (don't touch savings!)\n• Start small - even budgeting £100 builds good habits\n• Remember: budgeting gives you MORE freedom, not less",
        emoji: "💡",
        points: 5
      }
    ],
    points: 400,
    difficultyLevel: "beginner",
    timeEstimate: 25,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Understanding Credit Scores",
    description: "Learn what credit scores are, why they matter, and how to build and maintain excellent credit throughout your life.",
    topic: "Credit",
    lessonContent: `
# Understanding Credit Scores

Your credit score is a three-digit number (300-850 in the UK) that represents your creditworthiness. It's like a financial report card!

## Why Credit Scores Matter

- **Lower interest rates** on loans and mortgages
- **Better credit card** offers and rewards
- **Easier apartment** rental approvals
- **Lower insurance** premiums
- **Employment** opportunities (some jobs check credit)

## What Affects Your Score

1. **Payment History (35%)** - Most important!
2. **Amount Owed (30%)** - Keep balances low
3. **Credit History Length (15%)** - Keep old accounts open
4. **New Credit (10%)** - Don't apply for too much at once
5. **Credit Mix (10%)** - Different types of credit

## Building Good Credit

- Pay all bills on time, every time
- Keep credit card balances below 30% of limit
- Don't close old credit cards
- Check your credit report regularly
- Be patient - good credit takes time!
    `,
    activityType: "scenario",
    activityData: {
      title: "Credit Decision Scenarios",
      description: "Make smart credit decisions in these real-world situations",
      scenarios: [
        {
          id: "scenario1",
          situation: "You have a £1,000 credit card limit and currently owe £800. You need to make a £200 purchase. What should you do?",
          choices: [
            {
              id: "a",
              text: "Charge it to the credit card - you're still under the limit",
              isOptimal: false,
              consequence: "This maxes out your card (100% utilization), which hurts your credit score significantly.",
              points: 0
            },
            {
              id: "b",
              text: "Pay down the card first, then make the purchase",
              isOptimal: true,
              consequence: "Great choice! This keeps your utilization below 30%, protecting your credit score.",
              points: 100
            },
            {
              id: "c",
              text: "Use cash or debit instead",
              isOptimal: true,
              consequence: "Perfect! This avoids adding to your debt and keeps utilization low.",
              points: 100
            }
          ],
          explanation: "Credit utilization above 30% can hurt your score. It's better to pay down debt or use another payment method."
        },
        {
          id: "scenario2",
          situation: "You just paid off your first credit card after 3 years. The card has no annual fee. What should you do?",
          choices: [
            {
              id: "a",
              text: "Close the account - you don't need it anymore",
              isOptimal: false,
              consequence: "This reduces your available credit and shortens your credit history, hurting your score.",
              points: 0
            },
            {
              id: "b",
              text: "Keep it open but don't use it",
              isOptimal: true,
              consequence: "Excellent! This maintains your credit history length and keeps your utilization low.",
              points: 100
            },
            {
              id: "c",
              text: "Use it occasionally for small purchases you can pay off immediately",
              isOptimal: true,
              consequence: "Perfect! This shows active, responsible credit use while maintaining history.",
              points: 100
            }
          ],
          explanation: "Keeping old accounts open helps your credit age and available credit, both good for your score."
        },
        {
          id: "scenario3",
          situation: "You need a car loan and three different lenders want to check your credit. What should you do?",
          choices: [
            {
              id: "a",
              text: "Apply to all three within 14-45 days",
              isOptimal: true,
              consequence: "Smart! Multiple inquiries for the same purpose within this window count as ONE inquiry.",
              points: 100
            },
            {
              id: "b",
              text: "Apply to one, wait 6 months, then try another",
              isOptimal: false,
              consequence: "This spreads out hard inquiries unnecessarily, each potentially lowering your score.",
              points: 0
            },
            {
              id: "c",
              text: "Don't apply - credit checks will ruin your score",
              isOptimal: false,
              consequence: "Rate shopping is expected and protected! You miss out on finding the best rate.",
              points: 0
            }
          ],
          explanation: "Credit bureaus understand rate shopping. Multiple inquiries for the same loan type within 14-45 days are treated as one."
        }
      ]
    },
    points: 350,
    difficultyLevel: "intermediate",
    timeEstimate: 30,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Introduction to Investing",
    description: "Take your first steps into the world of investing. Learn about stocks, bonds, mutual funds, and how to build wealth for your future.",
    topic: "Investing",
    lessonContent: `
# Introduction to Investing

Investing is using your money to buy assets that have the potential to grow in value over time. It's how you can make your money work for you!

## Why Invest?

- **Beat inflation** - Savings accounts often don't keep pace with rising prices
- **Build wealth** - Grow your money faster than traditional savings
- **Achieve goals** - Fund retirement, education, or major purchases
- **Generate income** - Some investments pay dividends or interest

## Types of Investments

### Stocks (Shares)
- Ownership in a company
- Value can go up or down
- Potential for high returns
- Higher risk

### Bonds
- Loans to companies or governments
- Fixed interest payments
- Generally lower risk than stocks
- Lower potential returns

### Mutual Funds / ETFs
- Baskets of stocks and/or bonds
- Instant diversification
- Professionally managed (mutual funds)
- Lower cost option for beginners

## Key Principles

1. **Start Early** - Time is your best friend
2. **Diversify** - Don't put all eggs in one basket
3. **Think Long-Term** - Don't panic over short-term drops
4. **Understand Risk** - Higher potential returns = higher risk
5. **Keep Learning** - Markets evolve, so should your knowledge
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What is the main difference between stocks and bonds?",
          options: [
            "Stocks are ownership, bonds are loans",
            "Bonds are ownership, stocks are loans",
            "They're the same thing with different names",
            "Stocks are safer than bonds"
          ],
          correctAnswer: 0,
          explanation: "When you buy stock, you own a piece of the company. When you buy bonds, you're lending money to the issuer.",
          points: 100
        },
        {
          id: "q2",
          question: "Why is diversification important in investing?",
          options: [
            "It guarantees you'll make money",
            "It spreads risk across different investments",
            "It makes investing more complicated",
            "It's only for professional investors"
          ],
          correctAnswer: 1,
          explanation: "Diversification reduces risk by spreading investments across different assets, sectors, or markets.",
          points: 100
        },
        {
          id: "q3",
          question: "You're 20 years old and want to start investing. What's the best approach?",
          options: [
            "Only invest in 'safe' bonds",
            "Wait until you're older and have more money",
            "Start now with whatever you can afford, even if small",
            "Invest everything in one hot stock"
          ],
          correctAnswer: 2,
          explanation: "Starting early, even with small amounts, takes advantage of compound growth over decades. Time is your biggest advantage at 20!",
          points: 100
        },
        {
          id: "q4",
          question: "The stock market drops 10% in one week. You have 30 years until retirement. What should you do?",
          options: [
            "Sell everything immediately to prevent more losses",
            "Do nothing - this is normal market volatility",
            "Invest more - stocks are now 'on sale'",
            "Check your account every hour"
          ],
          correctAnswer: 1,
          explanation: "With 30 years ahead, short-term drops are meaningless. Markets recover over time. Option C is also reasonable!",
          points: 100
        }
      ]
    },
    points: 400,
    difficultyLevel: "intermediate",
    timeEstimate: 35,
    prerequisites: ["Understanding Compound Interest"],
    isActive: true,
    createdBy: "system"
  }
];

async function seedModules() {
  try {
    console.log('🌱 Starting to seed learning modules...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/valuto');
    console.log('✅ Connected to MongoDB');

    // Clear existing modules (optional - comment out if you want to keep existing)
    // await LearningModule.deleteMany({});
    // console.log('🗑️  Cleared existing modules');

    // Insert sample modules
    const inserted = await LearningModule.insertMany(sampleModules);
    console.log(`✅ Successfully inserted ${inserted.length} learning modules`);

    // Display created modules
    console.log('\n📚 Created Modules:');
    inserted.forEach((module, index) => {
      console.log(`${index + 1}. ${module.title} (${module.difficultyLevel}) - ${module.activityType}`);
    });

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding modules:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedModules();
}

module.exports = { seedModules, sampleModules };

