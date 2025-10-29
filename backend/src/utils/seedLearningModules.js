/**
 * Seed Learning Modules
 * Populates the database with initial interactive learning modules
 * Run this script to add sample learning content to your production database
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');

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
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "Using the 50/30/20 rule, how much should you allocate to 'Needs' if you earn £1,000 per month after tax?",
          options: [
            "£500",
            "£300",
            "£200",
            "£100"
          ],
          correctAnswer: 0,
          explanation: "According to the 50/30/20 rule, 50% of your income should go to needs. £1,000 × 0.50 = £500.",
          points: 100
        },
        {
          id: "q2",
          question: "Which of the following is considered a 'Need' according to budgeting principles?",
          options: [
            "Netflix subscription",
            "Restaurant meals",
            "Rent/Housing",
            "Designer clothing"
          ],
          correctAnswer: 2,
          explanation: "Rent/Housing is a basic necessity and falls under 'Needs'. The others are wants or nice-to-haves.",
          points: 100
        },
        {
          id: "q3",
          question: "If you earn £1,500 per month and follow the 50/30/20 rule, how much should you save each month?",
          options: [
            "£150",
            "£300",
            "£450",
            "£750"
          ],
          correctAnswer: 1,
          explanation: "According to the 50/30/20 rule, 20% should go to savings and debt. £1,500 × 0.20 = £300.",
          points: 100
        },
        {
          id: "q4",
          question: "What should you do if you consistently overspend in one category of your budget?",
          options: [
            "Give up budgeting entirely",
            "Use money from your savings allocation",
            "Reduce spending in another category",
            "Ignore the problem"
          ],
          correctAnswer: 2,
          explanation: "The best approach is to reduce spending in another category (preferably from 'Wants') to balance your budget. Never touch your savings allocation!",
          points: 100
        }
      ]
    },
    // ---- START: This section was added ----
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
    // ---- END: This section was added ----
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
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What percentage of your credit score is determined by payment history?",
          options: [
            "15%",
            "25%",
            "35%",
            "50%"
          ],
          correctAnswer: 2,
          explanation: "Payment history makes up 35% of your credit score - the largest single factor. Always pay your bills on time!",
          points: 100
        },
        {
          id: "q2",
          question: "What is the recommended credit card utilization rate to maintain a good score?",
          options: [
            "Below 30%",
            "Below 50%",
            "Below 70%",
            "Below 90%"
          ],
          correctAnswer: 0,
          explanation: "Keep your credit card balances below 30% of your credit limit to maintain a healthy credit score.",
          points: 100
        },
        {
          id: "q3",
          question: "You have a credit card with a £2,000 limit. What's the maximum amount you should owe to maintain good credit?",
          options: [
            "£600",
            "£1,000",
            "£1,400",
            "£1,800"
          ],
          correctAnswer: 0,
          explanation: "To stay below 30% utilization, you should owe no more than £2,000 × 0.30 = £600.",
          points: 100
        },
        {
          id: "q4",
          question: "What happens when you close an old credit card account?",
          options: [
            "Nothing, it has no effect on your score",
            "It improves your credit mix",
            "It shortens your credit history and reduces available credit",
            "It immediately increases your score"
          ],
          correctAnswer: 2,
          explanation: "Closing old accounts reduces your total available credit and shortens your credit history length, both of which can lower your score.",
          points: 100
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
  },
  {
    title: "Understanding Student Loans & Debt",
    description: "Master the art of managing student loans effectively. Learn about repayment plans, interest rates, and how to minimize debt burden.",
    topic: "Debt Management",
    lessonContent: `
# Understanding Student Loans & Debt

Student loans are a common reality for many UK students. Understanding how they work is crucial for your financial future.

## Types of Student Loans (UK)

### 1. Tuition Fee Loans
- Currently up to £9,250 per year for UK students
- Paid directly to your university
- Covers the full cost of your course

### 2. Maintenance Loans
- Help with living costs
- Based on household income
- Typically £3,000 - £12,000 per year

## How Repayment Works

You only start repaying once you earn above the threshold:
- **Plan 2**: £27,295 per year
- **Plan 4**: £31,395 per year (Scotland)
- You pay 9% of earnings above this threshold
- Written off after 30 years (or when you turn 60)

## Interest Rates

- While studying: RPI (inflation rate) + 3%
- After graduation: Based on income (RPI + 0% to 3%)
- Average around 5-6%

## Key Takeaways

- Student loans are more like a tax than traditional debt
- You only repay what you can afford
- It gets written off eventually
- Focus on earning potential over loan amount
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "At what income threshold do UK graduates start repaying Plan 2 student loans?",
          options: [
            "£20,000 per year",
            "£25,000 per year",
            "£27,295 per year",
            "£30,000 per year"
          ],
          correctAnswer: 2,
          explanation: "Plan 2 student loan repayments start when you earn £27,295 per year. You pay 9% of earnings above this threshold.",
          points: 100
        },
        {
          id: "q2",
          question: "What percentage of income above the threshold do you repay on UK student loans?",
          options: [
            "5%",
            "9%",
            "12%",
            "15%"
          ],
          correctAnswer: 1,
          explanation: "You repay 9% of earnings above the repayment threshold (currently £27,295 for Plan 2 loans).",
          points: 100
        },
        {
          id: "q3",
          question: "What happens to your student loan if you don't repay it all within 30 years?",
          options: [
            "You must continue paying indefinitely",
            "It gets passed to your family",
            "It gets written off (cancelled)",
            "Interest keeps compounding forever"
          ],
          correctAnswer: 2,
          explanation: "Student loans are written off after 30 years (or when you turn 60), regardless of how much you've repaid. This makes them different from regular debt.",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Types of Student Loans",
        content: "In the UK, there are two main types of student loans:\n\n💰 TUITION FEE LOANS\n• Up to £9,250 per year\n• Covers your course fees\n• Paid directly to your university\n\n🏠 MAINTENANCE LOANS\n• Helps with living costs\n• Based on household income\n• Typically £3,000-£12,000 per year\n\nBoth types work similarly in repayment terms.",
        emoji: "🎓",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "How Repayment Actually Works",
        content: "📊 KEY FACTS:\n\n💰 You only repay when you earn above the threshold (£27,295/year for Plan 2)\n\n📈 You pay 9% of earnings ABOVE this threshold\n\n📅 Example: If you earn £35,000/year, you repay: (£35,000 - £27,295) × 0.09 = £693/year (£58/month)\n\n⏰ Loan is written off after 30 years\n\n💡 It's more like a tax than traditional debt!",
        emoji: "📊",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "Interest Rates Explained",
        content: "Interest rates vary based on your situation:\n\n📚 WHILE STUDYING\nRPI (inflation) + 3%\nCurrent: ~8-9%\n\n💼 AFTER GRADUATION\nBased on income:\n• Under threshold: RPI + 0%\n• £27,295-£49,130: Up to RPI + 3%\n• Over £49,130: RPI + 3%\n\n💡 Don't panic about interest - if you earn less, you pay less (or nothing)!",
        emoji: "💹",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Should You Worry About Student Debt?",
        content: "✅ DON'T WORRY if:\n• You're on Plan 2 (after 2012)\n• You're earning under £40k\n• You understand how the system works\n\n⚠️ CONSIDER if:\n• You're a high earner (£50k+)\n• You plan to pay off in full\n• You want to reduce lifetime costs\n\n💡 Remember: It's written off after 30 years!",
        emoji: "🤔",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Smart Student Loan Strategy",
        content: "💡 FOCUS ON EARNING, NOT OWED\nYour earning potential matters more than the loan amount\n\n🎯 DON'T OVERPAY TOO EARLY\nMoney spent overpaying could be invested instead\n\n📈 WAIT AND SEE\nHigher earners may benefit from overpaying; most won't\n\n💰 BUILD EMERGENCY FUND FIRST\nAlways prioritise emergency savings over student loan overpayments\n\n💼 MAXIMISE YOUR INCOME\nFocus on career development to increase earnings",
        emoji: "💡",
        points: 5
      }
    ],
    points: 350,
    difficultyLevel: "beginner",
    timeEstimate: 20,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Emergency Fund Essentials",
    description: "Learn why emergency funds are crucial and how to build one. Discover the right amount to save and where to keep it safe.",
    topic: "Savings",
    lessonContent: `
# Emergency Fund Essentials

An emergency fund is money set aside to cover unexpected expenses. It's your financial safety net!

## Why You Need One

Life is full of surprises:
- Car repairs
- Medical emergencies
- Job loss
- Broken appliances
- Unexpected bills

Without an emergency fund, you might:
- Go into debt
- Raid your savings
- Lose financial peace of mind

## How Much Should You Save?

**Beginner Level: £500-£1,000**
- Covers small emergencies
- Good starting point
- Build confidence

**Intermediate Level: 3-6 months of expenses**
- Covers major emergencies
- Job loss buffer
- Recommended standard

**Advanced Level: 6-12 months**
- High security
- For variable income
- Career flexibility

## Where to Keep It

### High-Yield Savings Account
- Separate from your main account
- Easy to access
- FDIC insured
- Earns interest

### What NOT to Do
- ❌ Invest it in stocks
- ❌ Lock it up in CDs
- ❌ Mix it with spending money
- ❌ Keep it all as cash

## Building Your Fund

1. **Start Small** - Aim for £500 first
2. **Automate** - Set up automatic transfers
3. **Save Windfalls** - Tax refunds, bonuses, gifts
4. **Cut Expenses** - Find easy ways to save
5. **Be Patient** - It takes time!

## Key Principles

- **Accessibility** - Available when needed
- **Separate** - Don't mix with spending money
- **Replenish** - If you use it, build it back
- **Peace of Mind** - Your financial safety net
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What is the recommended minimum amount for an emergency fund?",
          options: [
            "£100",
            "£500-£1,000",
            "£5,000",
            "£10,000"
          ],
          correctAnswer: 1,
          explanation: "Start with £500-£1,000 for small emergencies. Once you have this, work towards 3-6 months of expenses.",
          points: 100
        },
        {
          id: "q2",
          question: "Where should you keep your emergency fund?",
          options: [
            "Invested in the stock market",
            "Locked in a 5-year CD",
            "In a high-yield savings account",
            "In your regular checking account"
          ],
          correctAnswer: 2,
          explanation: "Keep it in a separate high-yield savings account that's easily accessible but earns interest. Don't invest it or lock it away!",
          points: 100
        },
        {
          id: "q3",
          question: "If your monthly expenses are £1,500, how much should your emergency fund be for optimal coverage?",
          options: [
            "£1,500",
            "£4,500-£9,000",
            "£15,000",
            "£30,000"
          ],
          correctAnswer: 1,
          explanation: "For £1,500/month expenses, save £4,500-£9,000 (3-6 months). This gives you a solid buffer for job loss or major emergencies.",
          points: 100
        },
        {
          id: "q4",
          question: "What should you do if you use money from your emergency fund?",
          options: [
            "Forget about it - it's gone",
            "Only rebuild it if it's a big amount",
            "Immediately start rebuilding it back to your target",
            "Borrow money to refill it"
          ],
          correctAnswer: 2,
          explanation: "Always rebuild your emergency fund after using it. This maintains your financial safety net for future emergencies.",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What is an Emergency Fund?",
        content: "An emergency fund is money you set aside to cover unexpected expenses or financial emergencies.\n\n🛡️ YOUR FINANCIAL SAFETY NET\nPrevents you from going into debt when surprises happen\n\n💡 EXAMPLES OF EMERGENCIES\n• Car repairs or breakdowns\n• Medical bills\n• Job loss\n• Emergency home repairs\n• Unexpected travel\n• Major appliance replacement\n\n💰 IT'S SEPARATE FROM: Regular savings, investments, or spending money\n\n🎯 GOAL: Peace of mind and financial security",
        emoji: "🏦",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Why It's Absolutely Essential",
        content: "Without an emergency fund:\n\n❌ You'll likely go into debt\n❌ Raid your retirement savings\n❌ Stress about unexpected bills\n❌ Feel financially insecure\n❌ Make poor financial decisions\n\nWith an emergency fund:\n\n✅ You handle emergencies without stress\n✅ No need to borrow money\n✅ Peace of mind\n✅ Financial security\n✅ Freedom to take calculated risks\n\n💡 ONE EMERGENCY can derail your finances without this safety net!",
        emoji: "⚠️",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "How Much Should You Save?",
        content: "Start small and build up:\n\n🥉 BEGINNER: £500-£1,000\nCovers small emergencies\nGets you started\n\n🥈 INTERMEDIATE: 3-6 months expenses\nCovers job loss\nMajor emergencies\n🎯 RECOMMENDED TARGET\n\n🥇 ADVANCED: 6-12 months\nMaximum security\nVariable income\nCareer flexibility\n\n💡 EXAMPLE: If you spend £1,500/month, save £4,500-£9,000\n\n💭 Start with £500, then build to 3-6 months worth!",
        emoji: "💰",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Where to Keep Your Emergency Fund",
        content: "✅ DO:\n• High-yield savings account\n• Separate from main account\n• Easy access (1-2 days)\n• FDIC/insured bank\n• Can earn interest\n\n❌ DON'T:\n• Invest in stocks/bonds\n• Lock in CDs\n• Keep as cash (home)\n• Mix with spending money\n• Make it hard to access\n\n🏦 BEST OPTIONS:\n• Online savings accounts\n• High-yield checking\n• Money market accounts\n\n💡 Keep it liquid but separate!",
        emoji: "🏪",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Building Your Emergency Fund: 5 Steps",
        content: "1️⃣ START SMALL\nSet your first goal at £500\n\n2️⃣ AUTOMATE SAVINGS\nSet up automatic transfers\nMake it effortless\n\n3️⃣ SAVE WINDFALLS\nTax refunds, bonuses, gifts\nDirect to emergency fund\n\n4️⃣ CUT ONE EXPENSE\nCancel unused subscription\nSave that money instead\n\n5️⃣ BE PATIENT\nBuild over 6-12 months\nDon't rush the process\n\n💡 Every £10-20 adds up quickly!",
        emoji: "🚀",
        points: 5
      }
    ],
    points: 400,
    difficultyLevel: "beginner",
    timeEstimate: 20,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Understanding ISAs and Tax-Efficient Savings",
    description: "Master Individual Savings Accounts (ISAs) and learn how to save money tax-free. Discover Cash ISAs, Stocks & Shares ISAs, and Lifetime ISAs.",
    topic: "Savings",
    lessonContent: `
# Understanding ISAs and Tax-Efficient Savings

ISAs (Individual Savings Accounts) are UK tax-efficient savings and investment accounts. You can save up to £20,000 per year completely tax-free!

## What is an ISA?

An ISA is a tax-free savings or investment account available to UK residents aged 16+.

### Key Benefits:
- **Tax-Free Interest** - No tax on interest earned
- **Tax-Free Dividends** - No dividend tax
- **No Capital Gains Tax** - Sell investments tax-free
- **£20,000 Annual Allowance** - Save up to this amount per tax year

## Types of ISAs

### 1. Cash ISA
- Savings account version
- Safe and easy access
- Low risk, low returns
- Good for emergency funds

### 2. Stocks & Shares ISA
- Invest in stocks, bonds, funds
- Higher potential returns
- Higher risk
- Best for long-term growth

### 3. Lifetime ISA (LISA)
- For first-time home buyers (under 40)
- Government adds 25% bonus
- Up to £4,000 per year
- Must buy home under £450k or wait until 60

### 4. Innovative Finance ISA
- For peer-to-peer lending
- Higher returns, higher risk
- Less common

## ISA Rules

- **One of Each Type** - Can have one Cash, one Stocks & Shares, etc.
- **Annual Limit** - Max £20,000 across all ISAs combined
- **Tax Year** - 6 April to 5 April
- **No Carry Over** - Unused allowance doesn't roll to next year
- **Free Transfers** - Can move money between providers

## When to Use ISAs

**Use Cash ISA for:**
- Emergency fund
- Short-term savings (<5 years)
- Low risk tolerance

**Use Stocks & Shares ISA for:**
- Long-term goals (>5 years)
- Higher growth potential
- Retirement savings
- Risk tolerance

**Use Lifetime ISA for:**
- First-time home buyers under 40
- Those comfortable waiting until 60
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What is the maximum amount you can save in ISAs per tax year?",
          options: [
            "£10,000",
            "£15,000",
            "£20,000",
            "£50,000"
          ],
          correctAnswer: 2,
          explanation: "The ISA allowance is £20,000 per tax year (6 April to 5 April). You can split this across different types of ISAs.",
          points: 100
        },
        {
          id: "q2",
          question: "Which ISA type gets a 25% government bonus?",
          options: [
            "Cash ISA",
            "Stocks & Shares ISA",
            "Lifetime ISA",
            "Innovative Finance ISA"
          ],
          correctAnswer: 2,
          explanation: "The Lifetime ISA (LISA) gets a 25% government bonus on contributions up to £4,000 per year, giving you up to £1,000 free money annually.",
          points: 100
        },
        {
          id: "q3",
          question: "Why should you use a Stocks & Shares ISA instead of a regular investment account?",
          options: [
            "Lower fees",
            "Higher returns guaranteed",
            "No tax on dividends or capital gains",
            "No minimum investment"
          ],
          correctAnswer: 2,
          explanation: "Stocks & Shares ISAs are completely tax-free - no tax on dividends, interest, or capital gains. This can save thousands in taxes over the years.",
          points: 100
        },
        {
          id: "q4",
          question: "What happens to your ISA allowance if you don't use it all in a tax year?",
          options: [
            "It rolls over to next year",
            "It's lost forever",
            "You can use it anytime in the future",
            "It doubles the next year"
          ],
          correctAnswer: 1,
          explanation: "ISA allowances don't carry forward. If you don't use your £20,000 allowance by 5 April, you lose it. Use it or lose it!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What is an ISA?",
        content: "An ISA (Individual Savings Account) is a UK tax-free savings and investment account.\n\n💰 KEY BENEFITS:\n✅ NO TAX on interest earned\n✅ NO TAX on dividends\n✅ NO CAPITAL GAINS TAX when you sell\n✅ £20,000 per year allowance\n✅ Available to anyone 16+\n\n🎯 THINK OF IT AS:\nA special tax-free wrapper for your savings and investments\n\n💡 EXAMPLE:\nIf you earn £100 interest outside an ISA, you might pay £20 tax. In an ISA, you keep all £100!\n\n🏦 TYPES: Cash ISA, Stocks & Shares ISA, Lifetime ISA",
        emoji: "🏛️",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Types of ISAs Explained",
        content: "There are four main types:\n\n💷 CASH ISA (Savings)\nSafe, easy access\nLow risk, low returns\nGood for emergency fund\n\n📈 STOCKS & SHARES ISA (Investing)\nHigher potential returns\nHigher risk\nBest for long-term (5+ years)\n\n🏠 LIFETIME ISA (LISA)\nFor first-time home buyers\n25% government bonus\nUp to £4,000/year\nMust be under 40\n\n💰 INNOVATIVE FINANCE ISA\nPeer-to-peer lending\nHigher returns, higher risk\nLess common\n\n💡 You can open one of each type per tax year!",
        emoji: "🎯",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "The £20,000 ISA Allowance",
        content: "📅 TAX YEAR: 6 April to 5 April\n\n💰 ANNUAL LIMIT: £20,000 total across all ISAs\n\n📊 HOW IT WORKS:\nYou can split your £20k allowance\nExample: £10k Cash ISA + £10k Stocks & Shares ISA\n\n⚠️ KEY RULES:\n• One of each type (not multiple)\n• £20k is shared across all ISAs\n• Unused allowance is lost\n• No carry-over to next year\n• You can transfer between providers\n\n💡 TIP: Use it before 5 April or lose it!",
        emoji: "📅",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Lifetime ISA: The 25% Bonus",
        content: "The LISA is special - the government gives you free money!\n\n🎁 HOW IT WORKS:\n• Save up to £4,000/year\n• Government adds 25% bonus\n• Up to £1,000 free money annually\n• Paid monthly after you deposit\n\n✅ WHO IT'S FOR:\n• First-time home buyers under 40\n• Or those comfortable waiting until age 60\n• Home must cost under £450k\n\n⚠️ IMPORTANT:\n• Penalty if withdrawn early (unless for home)\n• Must have account for 12+ months\n\n💰 EXAMPLE: Save £4,000 = Get £5,000 total!",
        emoji: "🎁",
        points: 15
      },
      {
        id: "step5",
        type: "explanation",
        title: "Cash ISA vs Stocks & Shares ISA",
        content: "💷 CASH ISA:\n✅ Safe and secure\n✅ Easy access\n✅ FSCS protected\n❌ Low interest rates\n❌ Inflation risk\n💡 Use for: Emergency fund, short-term savings\n\n📈 STOCKS & SHARES ISA:\n✅ Potential for higher returns\n✅ Beat inflation long-term\n✅ Tax-free growth\n❌ Value can go down\n❌ Not guaranteed\n❌ Takes time\n💡 Use for: Long-term goals (5+ years), retirement\n\n💭 Best approach: Use both! Cash for emergencies, Stocks & Shares for growth.",
        emoji: "⚖️",
        points: 10
      }
    ],
    points: 450,
    difficultyLevel: "intermediate",
    timeEstimate: 25,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Money Basics: What is Money Really?",
    description: "Discover what money is, how it works, and why it matters in your life. Perfect for beginners starting their financial journey!",
    topic: "Money Basics",
    lessonContent: `
# Money Basics: What is Money Really?

Ever wondered what money actually is? It's more than just coins and notes - it's a tool that helps us exchange value!

## What is Money?

Money is anything that people agree has value and can be used to buy goods and services.

### The 3 Jobs of Money:

1. **Medium of Exchange** 💱
   - Used to buy and sell things
   - Instead of trading chickens for bread, we use money!

2. **Store of Value** 💰
   - Keeps its value over time
   - You can save it for later

3. **Unit of Account** 📊
   - Measures the value of things
   - Helps us compare prices

## A Brief History

- **Long ago**: People traded goods directly (barter)
- **Then**: Used shells, beads, precious metals
- **Later**: Paper money backed by gold
- **Today**: Digital money, contactless payments, crypto

## Types of Money Today

### Physical Money
- 💷 Notes (£5, £10, £20, £50)
- 🪙 Coins (1p, 2p, 5p, 10p, 20p, 50p, £1, £2)

### Digital Money
- 💳 Debit/Credit cards
- 📱 Mobile payments (Apple Pay, Google Pay)
- 💻 Online banking
- 🌐 Cryptocurrency (Bitcoin, Ethereum)

## Why Understanding Money Matters

Knowing how money works helps you:
- Make smart spending choices
- Save for things you want
- Plan for your future
- Avoid financial mistakes
- Build wealth over time
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What are the THREE main functions of money?",
          options: [
            "Buying, selling, trading",
            "Medium of exchange, store of value, unit of account",
            "Saving, spending, investing",
            "Cash, cards, crypto"
          ],
          correctAnswer: 1,
          explanation: "Money serves three key functions: medium of exchange (buying/selling), store of value (saving), and unit of account (measuring value).",
          points: 100
        },
        {
          id: "q2",
          question: "Before money existed, how did people get things they needed?",
          options: [
            "They made everything themselves",
            "They used credit cards",
            "They bartered (traded goods directly)",
            "They didn't need anything"
          ],
          correctAnswer: 2,
          explanation: "Before money, people used barter - trading goods and services directly. But this was difficult because you needed to find someone who had what you wanted AND wanted what you had!",
          points: 100
        },
        {
          id: "q3",
          question: "Which of these is NOT a form of money used today?",
          options: [
            "Contactless payment",
            "Cryptocurrency",
            "Seashells",
            "Debit cards"
          ],
          correctAnswer: 2,
          explanation: "While seashells were used as money in ancient times, they're not used as currency today. Modern money includes physical cash, cards, and digital payments.",
          points: 100
        },
        {
          id: "q4",
          question: "What does 'store of value' mean?",
          options: [
            "Money can be kept in a store",
            "Money keeps its worth over time so you can save it",
            "You can only use money in shops",
            "Money is stored in banks"
          ],
          correctAnswer: 1,
          explanation: "Money as a 'store of value' means it maintains its worth over time, allowing you to save it now and use it later. This is one of money's three main functions!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What Actually IS Money?",
        content: "Money is anything that people agree has value and can be used to buy stuff!\n\n💡 THINK ABOUT IT:\nMoney itself isn't valuable - a £20 note is just paper. But we all AGREE it's worth £20, so it works!\n\n🌍 AROUND THE WORLD:\n• UK uses Pounds (£)\n• USA uses Dollars ($)\n• Europe uses Euros (€)\n• Japan uses Yen (¥)\n\n✨ THE MAGIC: Money only works because everyone trusts and accepts it!",
        emoji: "💷",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "The 3 Superpowers of Money",
        content: "Money has THREE main jobs:\n\n1️⃣ MEDIUM OF EXCHANGE 💱\nUse it to buy things!\nNo more trading 50 chickens for a bike 🚲\n\n2️⃣ STORE OF VALUE 💰\nSave it for later\nIt keeps its worth over time\n\n3️⃣ UNIT OF ACCOUNT 📊\nMeasures how much things cost\nHelps you compare: Is £50 for trainers a good deal?\n\n💡 Without money, imagine trying to trade your homework for lunch! 😅",
        emoji: "⚡",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "From Seashells to Crypto: Money Evolution",
        content: "Money has changed A LOT over time:\n\n🦴 ANCIENT TIMES:\nShells, beads, salt (yes, salt!)\nCattle, grain\n\n🪙 METAL AGE:\nGold and silver coins\nHeavy but valuable!\n\n📜 PAPER MONEY:\nEasier to carry\nBacked by gold reserves\n\n💳 DIGITAL AGE (TODAY):\nDebit/credit cards\nContactless payments\nMobile banking\nCryptocurrency\n\n🚀 THE FUTURE:\nMaybe just your phone or even your face!",
        emoji: "🔄",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Physical vs Digital Money",
        content: "Today we use TWO main types:\n\n💷 PHYSICAL (Cash)\n✅ Everyone accepts it\n✅ No technology needed\n❌ Easy to lose\n❌ Can be stolen\n\n📱 DIGITAL (Cards, Apps)\n✅ Convenient and fast\n✅ Track your spending\n✅ Safer than cash\n❌ Needs internet/power\n❌ Not everyone accepts it\n\n💡 SMART MOVE: Use both! Carry some cash for emergencies, use digital for tracking spending.",
        emoji: "💳",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Why This Matters to YOU",
        content: "Understanding money helps you:\n\n💪 MAKE SMARTER CHOICES\nKnow when you're getting a good deal\n\n🎯 SAVE FOR GOALS\nBuy that new phone, trainers, or concert tickets!\n\n🚫 AVOID SCAMS\nSpot fake money and dodgy deals\n\n🌟 BUILD YOUR FUTURE\nStart building wealth early\n\n💡 REMEMBER: Money is a TOOL - learning to use it well now gives you superpowers for life! 🦸‍♂️",
        emoji: "🎓",
        points: 5
      }
    ],
    points: 250,
    difficultyLevel: "beginner",
    timeEstimate: 15,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Earning Your First Money",
    description: "Learn smart ways to earn money as a teen! From part-time jobs to side hustles, discover how to start building your income.",
    topic: "Earning Money",
    lessonContent: `
# Earning Your First Money

Ready to start earning? Whether it's for that new game, trainers, or saving for uni - here's how teens can make money!

## Legal Age Requirements (UK)

### Age 13-15
- Light work only (delivering papers, babysitting)
- Max 2 hours on school days
- Max 5 hours on Saturdays
- Can't work during school hours

### Age 16-17
- Can work up to 8 hours per day
- Can't work before 6am or after 10pm
- Minimum wage: £6.40 per hour (2024)

### Age 18+
- Full adult working rights
- Minimum wage: £11.44 per hour (2024)

## Ways to Earn Money as a Teen

### 1. Part-Time Jobs 💼
- Retail (shops, supermarkets)
- Hospitality (cafes, restaurants)
- Tutoring younger students
- Sports coaching or refereeing

### 2. Gig Economy 📱
- Dog walking (Rover, Tailster)
- Babysitting
- Car washing
- Lawn mowing
- Snow shoveling

### 3. Online Opportunities 💻
- Freelance graphic design
- Social media management
- YouTube or TikTok (if you build followers)
- Selling crafts on Etsy
- Online tutoring

### 4. Entrepreneurship 🚀
- Start a small business
- Sell products online
- Offer services in your neighborhood
- Create and sell digital products

## Getting Started

### Step 1: Identify Your Skills
What are you good at?
- Sports?
- Art/Design?
- Technology?
- Working with kids?
- Making things?

### Step 2: Create a CV
Even basic experience counts:
- School projects
- Volunteer work
- Hobbies and interests
- Any skills or certifications

### Step 3: Start Small
- Ask family and neighbors first
- Build up experience and reviews
- Expand to wider opportunities

### Step 4: Be Professional
- Show up on time
- Be reliable
- Communicate clearly
- Do quality work

## Important Money Skills

### Track Your Earnings
- Keep records of all income
- Understand your payslip
- Know about tax (if you earn over £12,570/year)

### Save a Portion
Follow the rule:
- 50% to spend
- 30% to save for goals
- 20% to long-term savings

### Understand Your Rights
- Minimum wage requirements
- Break times
- Safe working conditions
- Payment on time
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "At what age can you legally get a part-time job in the UK?",
          options: [
            "12 years old",
            "13 years old",
            "16 years old",
            "18 years old"
          ],
          correctAnswer: 1,
          explanation: "In the UK, you can start doing light work from age 13, though with restrictions on hours and type of work. More opportunities open up at 16 and 18.",
          points: 100
        },
        {
          id: "q2",
          question: "You're 16 and get offered a job for £5 per hour. Should you take it?",
          options: [
            "Yes, any money is good money",
            "No, the minimum wage for 16-17 year olds is £6.40",
            "Yes, if you really need the money",
            "It depends on the job"
          ],
          correctAnswer: 1,
          explanation: "No! The National Minimum Wage for 16-17 year olds is £6.40 per hour (2024). Any employer offering less is breaking the law. Know your rights!",
          points: 100
        },
        {
          id: "q3",
          question: "You earned £50 from babysitting. Using the 50/30/20 rule, how much should you save?",
          options: [
            "£10 (20%)",
            "£15 (30%)",
            "£25 (50%)",
            "All of it"
          ],
          correctAnswer: 2,
          explanation: "Following the 50/30/20 rule for teens: 50% (£25) to spend, 30% (£15) for short-term goals, 20% (£10) for long-term savings. That's £25 total saved!",
          points: 100
        },
        {
          id: "q4",
          question: "Which is the BEST first step to earning money?",
          options: [
            "Quit school to work full-time",
            "Identify your skills and start small with family/neighbors",
            "Wait until you're 18",
            "Only apply to high-paying jobs"
          ],
          correctAnswer: 1,
          explanation: "Start by identifying what you're good at, then begin with small jobs for family and neighbors to build experience and confidence. School should always come first!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Can You Even Work?",
        content: "UK Working Age Rules:\n\n👶 AGE 13-15:\n✅ Light work (papers, babysitting)\n✅ Max 2 hours on school days\n✅ Max 5 hours Saturdays\n❌ No work during school hours\n\n💪 AGE 16-17:\n✅ Part-time jobs\n✅ Up to 8 hours/day\n💰 Min wage: £6.40/hour\n❌ Not before 6am or after 10pm\n\n🎓 AGE 18+:\n✅ Full working rights\n💰 Min wage: £11.44/hour\n\n💡 School ALWAYS comes first!",
        emoji: "📅",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Easy Ways to Earn Money NOW",
        content: "🏪 PART-TIME JOBS:\n• Retail (shops)\n• Cafes/Restaurants\n• Tutoring\n• Sports coaching\n\n🐕 GIG WORK:\n• Dog walking\n• Babysitting\n• Lawn mowing\n• Car washing\n\n💻 ONLINE:\n• Freelance design\n• Social media help\n• Sell crafts (Etsy)\n• YouTube/TikTok (build followers first!)\n\n🚀 BUSINESS IDEAS:\n• Sell snacks at school\n• Tech help for elderly\n• Photography\n• Gaming coaching\n\n💡 TIP: Start with what you're ALREADY good at!",
        emoji: "💼",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "Your First CV (Even With Zero Experience!)",
        content: "Everyone starts somewhere! Include:\n\n📝 PERSONAL INFO:\nName, age, contact\n\n🎯 SKILLS:\n• Good with computers?\n• Great with kids?\n• Sporty?\n• Creative?\n\n⭐ EXPERIENCE:\n• School projects\n• Volunteer work\n• Clubs/teams\n• Hobbies\n• Helping family business\n\n💡 EXAMPLE:\n'Helped run school bake sale, raising £500'\n'Captain of football team - leadership skills'\n'Tech-savvy - helped grandparents set up phones'\n\n🎯 Everything counts!",
        emoji: "📄",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "The 50/30/20 Rule for Earnings",
        content: "When you earn money, split it smart:\n\n💸 50% SPEND (Fun Now!)\nTreats, going out, stuff you want\n\n🎯 30% SAVE (Goals)\nBigger purchase coming up\nNew phone, trainers, concert\n\n🏦 20% SAVE (Future)\nLong-term savings\nDon't touch this!\n\n💰 EXAMPLE with £100:\n• £50 to spend\n• £30 for short-term goal\n• £20 to savings account\n\n💡 This builds GREAT money habits early!",
        emoji: "💰",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Be Professional = More Money!",
        content: "Stand out and earn more:\n\n⏰ BE ON TIME\nAlways 5 mins early\n\n📱 COMMUNICATE WELL\nReply to messages quickly\nBe polite and clear\n\n💪 DO QUALITY WORK\nGo the extra mile\nPeople notice!\n\n😊 BE RELIABLE\nShow up when you say\nDon't cancel last minute\n\n⭐ RESULT:\n• Better reviews\n• More work\n• Higher pay\n• Great references\n\n💡 Reputation = Future opportunities!",
        emoji: "⭐",
        points: 5
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
    title: "Smart Spending: Wants vs Needs",
    description: "Master the art of smart spending! Learn to tell the difference between wants and needs, and make your money go further.",
    topic: "Spending",
    lessonContent: `
# Smart Spending: Wants vs Needs

The secret to having money? Knowing the difference between WANTS and NEEDS! Let's level up your spending game.

## Needs vs Wants: What's the Difference?

### NEEDS 🎯
Things you MUST have to survive and function:
- Food and water
- Shelter (home/rent)
- Basic clothing
- Education
- Healthcare
- Transportation to work/school

### WANTS 💭
Things you LIKE to have but could live without:
- Designer clothes
- Latest phone
- Gaming console
- Eating out
- Netflix/Spotify
- Expensive trainers

## The Tricky Middle Ground

Some things can be BOTH! It depends on the version:

**Food:**
- NEED: Groceries, packed lunch
- WANT: Takeaway, restaurant meals

**Phone:**
- NEED: Basic phone for calls/safety
- WANT: Latest iPhone 15 Pro Max

**Clothes:**
- NEED: School uniform, basic wardrobe
- WANT: Designer brands, excessive shopping

**Transport:**
- NEED: Bus fare to school/work
- WANT: Uber everywhere, taxi rides

## The "Wait 48 Hours" Rule

Before buying something over £20:

1. **Wait 48 hours** ⏰
2. **Ask yourself:**
   - Do I still want it?
   - Do I really need it?
   - Can I afford it?
   - Will I use it in 6 months?
3. **Still want it?** Then buy it!
4. **Changed your mind?** Save the money instead! 💰

## Smart Spending Strategies

### Strategy 1: The 30-Day List
- Keep a list of things you want
- Wait 30 days before buying
- Most items you'll forget about!

### Strategy 2: Cost Per Use
Calculate how much something costs per use:

**Example: £60 Trainers**
- Wear 3x per week for 1 year = 156 uses
- Cost per use = £60 ÷ 156 = £0.38 per wear ✅ Good deal!

**Example: £80 Concert Outfit**
- Wear once = 1 use
- Cost per use = £80 ÷ 1 = £80 per wear ❌ Expensive!

### Strategy 3: Opportunity Cost
"If I buy this, what am I giving up?"

Buy £50 trainers NOW → Can't afford cinema with friends this month

Save £50 trainers money → Can do 5 fun activities with friends!

### Strategy 4: The Comparison Shop
- Never buy immediately
- Check at least 3 shops/websites
- Use price comparison sites
- Look for student discounts
- Wait for sales

## Peer Pressure & Spending

Everyone feels pressure to "keep up" with friends. Here's the truth:

❌ **The Trap:**
"Everyone has it, so I need it too!"

✅ **The Reality:**
- People are too busy worrying about themselves
- True friends don't care what you wear/own
- Social media isn't real life
- Debt is WAY worse than "missing out"

## Make Your Money Go Further

### Smart Shopping Hacks:
1. **Student Discounts** - Always ask! (10-20% off)
2. **Buy Second-Hand** - Depop, Vinted, eBay (save 50-80%)
3. **Use Cashback Apps** - Get money back on purchases
4. **Buy Generic Brands** - Often same quality, half the price
5. **Share Subscriptions** - Split Netflix, Spotify with family
6. **Free Alternatives** - YouTube vs paid streaming, etc.

## The Reality Check Questions

Before ANY purchase, ask:

1. ✅ Can I afford this WITHOUT borrowing?
2. ✅ Have I compared prices?
3. ✅ Will I still want this in a month?
4. ✅ Do I need it or just want it?
5. ✅ Is this the best use of my money right now?

If you answer NO to any → DON'T BUY IT YET!
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "Which of these is a NEED, not a want?",
          options: [
            "Designer trainers for school",
            "Basic school uniform",
            "The latest iPhone",
            "Takeaway pizza every week"
          ],
          correctAnswer: 1,
          explanation: "A basic school uniform is a NEED - you must have it for school. The designer trainers, latest iPhone, and regular takeaways are WANTS - nice to have, but not essential.",
          points: 100
        },
        {
          id: "q2",
          question: "You see £80 trainers you love. What should you do FIRST?",
          options: [
            "Buy them immediately before they sell out",
            "Borrow money from friends to buy them",
            "Wait 48 hours and ask the 5 reality check questions",
            "Put them on a credit card"
          ],
          correctAnswer: 2,
          explanation: "Always wait and think before big purchases! Use the 48-hour rule and ask yourself the reality check questions. This prevents impulse buying and regret.",
          points: 100
        },
        {
          id: "q3",
          question: "You buy a £120 jacket and wear it once before getting bored. What's the cost per use?",
          options: [
            "£12",
            "£60",
            "£120",
            "£240"
          ],
          correctAnswer: 2,
          explanation: "Cost per use = Total cost ÷ Number of uses = £120 ÷ 1 = £120 per wear! This shows it was an expensive purchase. Items you use often have better value.",
          points: 100
        },
        {
          id: "q4",
          question: "What's 'opportunity cost'?",
          options: [
            "The price of something on sale",
            "What you give up when you buy something",
            "How much money you have",
            "The cost of a business opportunity"
          ],
          correctAnswer: 1,
          explanation: "Opportunity cost is what you give up to get something else. If you spend £50 on trainers, you've given up the opportunity to spend that £50 on something else!",
          points: 100
        },
        {
          id: "q5",
          question: "Your friends all have expensive phones. Yours is older but works fine. What's the smartest choice?",
          options: [
            "Borrow money to buy a new phone to fit in",
            "Keep your phone and save the money instead",
            "Buy a new phone on payment plan",
            "Feel bad about your phone"
          ],
          correctAnswer: 1,
          explanation: "Keep your working phone! Real friends don't care what phone you have. Saving that money builds your financial future. Don't let peer pressure control your spending!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Needs vs Wants: The KEY Difference",
        content: "🎯 NEEDS (Must Have):\n✅ Food & water\n✅ Shelter/home\n✅ Basic clothes\n✅ Education\n✅ Healthcare\n✅ Transport to school/work\n\n💭 WANTS (Nice to Have):\n❌ Designer clothes\n❌ Latest phone\n❌ Gaming console\n❌ Takeaways\n❌ Streaming services\n❌ Concert tickets\n\n💡 TRICK QUESTION:\n'But I NEED those trainers!'\nNo, you WANT them. You need SHOES, but probably not THOSE specific trainers!\n\n🎯 Test: Can you survive without it? Then it's a WANT!",
        emoji: "🤔",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "The Tricky Middle Ground",
        content: "Some things can be BOTH!\n\n📱 PHONE:\nNEED: Basic phone for safety/contact\nWANT: iPhone 15 Pro Max\n\n🍕 FOOD:\nNEED: Groceries, packed lunch\nWANT: Deliveroo, restaurants\n\n👟 CLOTHES:\nNEED: Basic wardrobe\nWANT: Designer brands\n\n🚌 TRANSPORT:\nNEED: Bus to school\nWANT: Uber everywhere\n\n💡 SMART MOVE: Meet your needs affordably, then use leftover money for wants!",
        emoji: "⚖️",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "The 48-Hour Rule (Stop Impulse Buying!)",
        content: "Before buying ANYTHING over £20:\n\n⏰ STEP 1: WAIT 48 HOURS\nDon't buy immediately!\n\n🤔 STEP 2: ASK YOURSELF:\n✅ Do I still want it?\n✅ Do I really need it?\n✅ Can I afford it?\n✅ Will I use it in 6 months?\n✅ Is this the best use of my money?\n\n💰 STEP 3: DECIDE\nStill want it? Go ahead!\nChanged your mind? Save the money! 🎉\n\n💡 RESULT: Studies show 80% of people DON'T buy after waiting! That's savings! 💰",
        emoji: "⏳",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Cost Per Use: The Value Calculator",
        content: "Is it REALLY worth it?\n\n💡 FORMULA:\nCost Per Use = Price ÷ How often you'll use it\n\n✅ GOOD DEAL:\n£60 trainers ÷ 150 wears = £0.40 per use\n£30 reusable water bottle ÷ 500 uses = £0.06 per use\n\n❌ BAD DEAL:\n£80 concert outfit ÷ 1 wear = £80 per use\n£100 trendy jacket ÷ 3 wears = £33 per use\n\n🎯 THE RULE:\nLower cost per use = Better value!\nBuy things you'll use A LOT!",
        emoji: "🧮",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Beating Peer Pressure",
        content: "Real talk about fitting in:\n\n❌ THE TRAP:\n'Everyone has it, so I need it!'\n'People will judge me'\n'I'll miss out!'\n\n✅ THE TRUTH:\n• Most people are too busy worrying about themselves\n• Real friends don't care what you own\n• Social media is FAKE - filters and borrowed stuff!\n• Going into debt is WAY worse than 'missing out'\n• Being smart with money = True flex 💪\n\n💡 REMEMBER:\nRich people stay rich by NOT wasting money on stuff to impress people they don't even like!\n\n🎯 Future you will thank present you for being smart!",
        emoji: "💪",
        points: 5
      }
    ],
    points: 350,
    difficultyLevel: "beginner",
    timeEstimate: 25,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Understanding Bank Accounts for Teens",
    description: "Get started with banking! Learn about current accounts, savings accounts, and how to manage your money like a pro.",
    topic: "Banking",
    lessonContent: `
# Understanding Bank Accounts for Teens

Your first bank account is a big step! Let's learn how to choose the right one and use it wisely.

## Types of Bank Accounts

### 1. Children's Savings Account (Under 16)
- Parents/guardians manage it
- Usually better interest rates
- Limited access
- No debit card (usually)
- Great for learning to save!

### 2. Teen Current Account (11-17)
- Your own debit card 💳
- Online/mobile banking
- Contactless payments
- Manage your own money
- Parent can monitor

### 3. Student Account (18+)
- For university students
- Often comes with perks (railcard, overdraft)
- Better features
- More responsibility

## What is a Current Account?

Think of it as your main money hub:

**Money IN:**
- Wages from part-time job
- Birthday money
- Pocket money
- Gifts

**Money OUT:**
- Shopping
- Bills
- ATM withdrawals
- Online purchases

**Key Features:**
- Debit card for spending
- Mobile app to check balance
- Direct debits (automatic payments)
- Standing orders (regular transfers)

## What is a Savings Account?

Money you DON'T touch - it grows over time!

**Benefits:**
- Earns interest (bank pays you!)
- Separate from spending money
- Helps reach goals
- Builds good habits

**Example:**
Save £50/month at 3% interest = £600+ after 1 year!

## Choosing Your First Bank Account

### What to Look For:

1. **No Monthly Fees** ✅
   Most teen accounts are free!

2. **Good Mobile App** 📱
   Easy to check balance and transactions

3. **Fee-Free ATM Withdrawals** 💰
   No charges for taking out cash

4. **Parental Monitoring** 👀
   Some let parents see transactions (for safety)

5. **Budgeting Tools** 📊
   Apps that help track spending

### Popular Teen Banks (UK):
- **Barclays** - From age 11, great app
- **HSBC** - From age 11, no fees
- **NatWest** - From age 11, Rooster Money app
- **Santander** - From age 11, good online banking
- **Starling/Monzo** - From age 16, modern app-based

## How to Open an Account

**You'll Need:**
1. Proof of identity (passport, birth certificate)
2. Proof of address (utility bill, council tax)
3. Parent/guardian (if under 18)
4. Initial deposit (usually £1-£10)

**Steps:**
1. Choose a bank
2. Book appointment or apply online
3. Bring required documents
4. Sign paperwork (parent too if under 18)
5. Wait for debit card (5-10 days)
6. Activate card and set up app

## Staying Safe with Your Account

### Protect Your Money:

**Never Share:**
- PIN number (not even with best friends!)
- Online banking password
- Card details (unless buying from trusted site)
- Security questions answers

**Watch Out For:**
- Phishing emails/texts pretending to be your bank
- Too-good-to-be-true offers
- Requests for your password
- Suspicious transactions

**Smart Habits:**
- Check balance daily on app
- Review transactions weekly
- Set up transaction alerts
- Use secure Wi-Fi for banking
- Report lost cards IMMEDIATELY

## Managing Your Account Like a Pro

### Weekly Money Routine:

**Monday:** Check balance
**Wednesday:** Review weekend spending
**Friday:** Check wages are in (if you work)
**Sunday:** Plan next week's spending

### Smart Tips:

1. **Keep a Buffer** 💰
   Always keep £20-50 "emergency" money

2. **Use App Notifications** 🔔
   Get alerts for every transaction

3. **Name Your Savings** 🎯
   "New Phone Fund" is more motivating than "Savings"

4. **Set Spending Limits** 🚦
   Many apps let you set daily/weekly limits

5. **Move Money to Savings First** 💪
   Transfer savings as soon as money comes in

## Understanding Your Balance

**Three Types:**

1. **Current Balance**
   What's in your account RIGHT NOW

2. **Available Balance**
   What you can actually spend (excludes pending transactions)

3. **Pending Transactions**
   Payments being processed

**Example:**
- Current: £100
- Pending payment to Amazon: £20
- Available to spend: £80

## Common Mistakes to Avoid

❌ **Losing Track of Spending**
→ Check app daily!

❌ **Sharing PIN**
→ Keep it secret, even from friends!

❌ **Ignoring Bank Notifications**
→ They're trying to help you!

❌ **Mixing Spending and Savings**
→ Keep in separate accounts!

❌ **Not Reporting Problems**
→ Contact bank immediately if something's wrong!

## Building Good Banking Habits

✅ Check balance before buying
✅ Save receipts (physical or photos)
✅ Review statements monthly
✅ Keep card safe
✅ Set savings goals
✅ Track your spending
✅ Ask questions if unsure
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "At what age can you get your own teen current account with a debit card in the UK?",
          options: [
            "9 years old",
            "11 years old",
            "16 years old",
            "18 years old"
          ],
          correctAnswer: 1,
          explanation: "Most UK banks offer teen current accounts from age 11, complete with your own debit card and mobile banking app. This is a great age to start learning money management!",
          points: 100
        },
        {
          id: "q2",
          question: "What's the difference between a current account and a savings account?",
          options: [
            "They're exactly the same",
            "Current account is for daily spending, savings account earns interest",
            "Savings accounts have debit cards, current accounts don't",
            "Current accounts earn more interest"
          ],
          correctAnswer: 1,
          explanation: "Current accounts are for everyday spending (with a debit card), while savings accounts are for money you don't touch - they earn interest to help your money grow!",
          points: 100
        },
        {
          id: "q3",
          question: "Your friend asks for your PIN so they can grab cash for you while you're in class. What should you do?",
          options: [
            "Share it - they're your best friend",
            "Write it down for them",
            "Never share your PIN with anyone, even friends",
            "Share it just this once"
          ],
          correctAnswer: 2,
          explanation: "NEVER share your PIN with anyone, not even your best friend! If someone knows your PIN and steals your card, the bank might not refund stolen money because you shared your security details.",
          points: 100
        },
        {
          id: "q4",
          question: "You have £100 current balance, but £30 is pending to Netflix. How much can you actually spend?",
          options: [
            "£100",
            "£130",
            "£70",
            "£30"
          ],
          correctAnswer: 2,
          explanation: "Available balance = Current balance - Pending transactions = £100 - £30 = £70. The £30 to Netflix is still processing but will definitely come out, so you can only spend £70!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What Even IS a Bank Account?",
        content: "Think of it as your personal money locker! 🏦\n\n💰 CURRENT ACCOUNT:\n• For everyday spending\n• Comes with debit card\n• Mobile app access\n• Money in and out frequently\n\n🏆 SAVINGS ACCOUNT:\n• For money you DON'T touch\n• Earns interest (free money!)\n• Helps you reach goals\n• Money mostly stays in\n\n💡 SMART MOVE: Have BOTH!\nCurrent for spending, Savings for goals",
        emoji: "🏦",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Teen Accounts: Your Options",
        content: "🎯 AGE 11-17:\nTeen Current Account\n• Your own debit card 💳\n• Mobile banking app\n• Contactless payments\n• Parents can monitor\n• NO overdraft (can't go negative)\n\n📚 AGE 18+ (Student):\nStudent Account\n• All the above PLUS:\n• Overdraft (emergency borrowing)\n• Better perks\n• Railcard discounts\n\n💡 TOP BANKS FOR TEENS:\nBarclays, HSBC, NatWest, Santander, Starling, Monzo",
        emoji: "🎯",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "How to Open Your First Account",
        content: "SUPER EASY! Here's how:\n\n📝 YOU'LL NEED:\n✅ ID (passport/birth certificate)\n✅ Proof of address\n✅ Parent/guardian (if under 18)\n✅ £1-£10 to start\n\n🚀 STEPS:\n1️⃣ Choose a bank (compare apps!)\n2️⃣ Apply online or in branch\n3️⃣ Bring documents\n4️⃣ Sign up (10 mins)\n5️⃣ Wait for card (5-10 days)\n6️⃣ Activate and start using!\n\n💡 Most banks let you apply online from home!",
        emoji: "📱",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Safety First: Protecting Your Money",
        content: "🔒 NEVER SHARE:\n❌ PIN number\n❌ Password\n❌ Full card number\n❌ Security answers\n\n⚠️ WATCH OUT FOR:\n• Fake bank emails (phishing)\n• 'Too good to be true' offers\n• People asking for your details\n• Weird transactions\n\n✅ DO THIS:\n• Check balance daily\n• Set up transaction alerts\n• Use strong passwords\n• Report lost cards INSTANTLY\n• Keep card in safe place\n\n💡 Your bank will NEVER ask for your PIN!",
        emoji: "🔐",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Pro Tips: Banking Like a Boss",
        content: "🎯 DAILY HABITS:\n• Check balance every morning\n• Review all transactions\n• Know what you can spend\n\n💪 WEEKLY ROUTINE:\n• Review weekend spending\n• Check wages arrived (if working)\n• Move money to savings\n\n📊 MONTHLY WINS:\n• Review full statement\n• Check for weird charges\n• Celebrate savings growth!\n\n💡 PRO TIP:\nSet up automatic transfer to savings!\n£20/week = £1,040/year you never 'missed'! 🎉",
        emoji: "💪",
        points: 5
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
    title: "Debit Cards vs Credit Cards: What Teens Need to Know",
    description: "Understand the difference between debit and credit cards. Learn how they work and which is right for you as a teen.",
    topic: "Banking",
    lessonContent: `
# Debit Cards vs Credit Cards: What Teens Need to Know

Cards, cards everywhere! But they're NOT all the same. Let's break down the difference and keep you safe!

## What is a Debit Card?

A debit card is linked directly to YOUR money in YOUR bank account.

### How It Works:
1. You swipe/tap your card
2. Money comes OUT of your account immediately
3. You can only spend what you HAVE

**Think of it as:** Digital cash! 💰

### Example:
- You have £50 in your account
- You buy trainers for £40
- Now you have £10 left
- Simple!

### Debit Card Features:
✅ Spend your own money
✅ Can't go into debt (usually)
✅ Available from age 11
✅ Free to use in UK
✅ Contactless payments
✅ Use online and in shops
✅ Withdraw cash from ATMs

### Debit Card Limits:
- Can't spend more than you have
- Daily withdrawal limits (£250-500)
- Some shops have minimum spend (£5)
- Foreign transactions may have fees

## What is a Credit Card?

A credit card is borrowed money from the bank that you MUST pay back.

### How It Works:
1. You swipe/tap card
2. Bank pays the shop
3. You owe the bank that money
4. You must repay (usually monthly)

**Think of it as:** Borrowing from the bank! 💳

### Example:
- Bank gives you £1,000 credit limit
- You spend £200 on clothes
- End of month: You owe bank £200
- If you don't pay: You owe £200 PLUS interest!

### Credit Card Features:
⚠️ Borrowing money, not spending yours
⚠️ Must be 18+ in UK
⚠️ Monthly repayments required
⚠️ Interest charged if not paid in full
⚠️ Can get into serious debt
⚠️ Credit score affected
✅ Can build good credit if used wisely

## The KEY Differences

| Feature | Debit Card | Credit Card |
|---------|-----------|-------------|
| **Your Money?** | Yes ✅ | No, borrowed ❌ |
| **Age** | 11+ | 18+ |
| **Debt Risk** | Low | High |
| **Interest** | None | 20-40% if not paid |
| **Spending Limit** | Your balance | Credit limit |
| **Build Credit Score** | No | Yes |

## Why Teens Should Stick with Debit Cards

### 1. No Debt Risk ✅
You literally CAN'T spend money you don't have!

### 2. Learn Money Management 📚
See your balance decrease in real-time

### 3. No Interest Charges 💰
Your £10 stays £10

### 4. Age Appropriate 🎯
Designed for teens learning money skills

### 5. Parent Peace of Mind 😌
They can monitor without worry

## When Are Credit Cards Useful? (18+)

Credit cards aren't evil - they're just powerful tools that require responsibility.

### Good Uses:
✅ Emergency fund backup
✅ Building credit score
✅ Purchase protection
✅ Cashback/rewards (if paid off monthly)
✅ Safer for online shopping

### Bad Uses:
❌ Buying things you can't afford
❌ Just the "minimum payment"
❌ Cash withdrawals (huge fees!)
❌ Treating it like free money

## The Credit Card Trap (What NOT to Do!)

**The Scenario:**
1. Get credit card with £1,000 limit
2. Buy new phone for £800
3. Can't afford to pay it back
4. Pay minimum (£25/month)
5. Interest keeps adding up
6. 3 years later: Still owe £600!
7. That £800 phone actually cost £1,500! 😱

**The Problem:**
- 25% interest rate = £200 extra per year
- Minimum payments barely cover interest
- Debt grows and grows
- Credit score destroyed
- Takes YEARS to pay off

## Prepaid Cards: The Middle Ground

Perfect for teens who want practice!

### How They Work:
1. Load money onto card
2. Spend only what you loaded
3. Can't go negative
4. Works like debit card

### Popular Options:
- **GoHenry** (6-18 years)
- **Osper** (8-18 years)
- **Revolut Junior** (6-17 years)

### Benefits:
✅ Parents can monitor
✅ Set spending limits
✅ Educational tools
✅ Safe online shopping
✅ No overdraft possible

## Card Safety Tips

### Protecting Your Card:

1. **PIN Security** 🔒
   - Never share with ANYONE
   - Don't write it down
   - Memorize it!

2. **Online Shopping** 🛒
   - Only use on secure sites (https://)
   - Check website is legitimate
   - Save confirmation emails

3. **Contactless Limits** 📲
   - Currently £100 per transaction
   - Set lower limits on app
   - Monitor transactions

4. **Lost or Stolen** 🚨
   - Report to bank IMMEDIATELY
   - Freeze card on app
   - They'll send new one (5 days)

5. **Check Statements** 📊
   - Review every transaction
   - Report unknown charges
   - Keep receipts

## Smart Card Habits

**Before Using Your Card:**
✅ Check your balance
✅ Know exactly how much you're spending
✅ Ask: Do I really need this?
✅ Make sure it's not a scam site
✅ Have a backup plan if declined

**After Using Your Card:**
✅ Check transaction appeared correctly
✅ Keep receipt (photo is fine)
✅ Update your mental balance
✅ Log it in budgeting app

## The Bottom Line for Teens

**Right Now (Under 18):**
- Stick with debit cards
- Learn to manage your own money
- Build good spending habits
- No debt = No stress

**When You're 18+:**
- Consider credit card for emergencies only
- Pay off IN FULL every month
- Never buy what you can't afford
- Use for credit score building

**Remember:** Rich people use credit cards wisely. Broke people use credit cards to buy things they can't afford!
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What's the main difference between a debit card and a credit card?",
          options: [
            "Debit cards are blue, credit cards are black",
            "Debit card uses YOUR money, credit card is BORROWED money",
            "Credit cards are safer",
            "They're basically the same thing"
          ],
          correctAnswer: 1,
          explanation: "Debit cards spend YOUR money from YOUR account. Credit cards borrow money from the bank that you must pay back later. This is the critical difference!",
          points: 100
        },
        {
          id: "q2",
          question: "You have £30 in your account and try to buy a £50 game with your debit card. What happens?",
          options: [
            "Purchase goes through and you owe £20",
            "Purchase is declined - you don't have enough",
            "Bank lends you the £20",
            "You pay later"
          ],
          correctAnswer: 1,
          explanation: "Your debit card purchase will be DECLINED because you only have £30. You can't spend money you don't have with a debit card (unless you have an overdraft).",
          points: 100
        },
        {
          id: "q3",
          question: "A credit card has 25% interest. You owe £100 and only pay the £5 minimum. What happens?",
          options: [
            "You paid £5, so now you owe £95",
            "The debt keeps growing because of interest charges",
            "The bank forgives the rest",
            "You're all paid up"
          ],
          correctAnswer: 1,
          explanation: "The debt GROWS! The £95 remaining gets charged 25% interest (about £2/month), so even though you paid £5, you barely made a dent. This is the credit card trap!",
          points: 100
        },
        {
          id: "q4",
          question: "What's the minimum age for a credit card in the UK?",
          options: [
            "16 years old",
            "17 years old",
            "18 years old",
            "21 years old"
          ],
          correctAnswer: 2,
          explanation: "You must be 18+ to get a credit card in the UK. Debit cards are available from age 11. This is because credit cards involve borrowing money, which is a legal contract.",
          points: 100
        },
        {
          id: "q5",
          question: "Which card should most teens use?",
          options: [
            "Credit card - build credit early",
            "Both - use both equally",
            "Debit card - spend your own money with no debt",
            "Neither - only use cash"
          ],
          correctAnswer: 2,
          explanation: "Teens should use DEBIT cards! They help you learn money management without the risk of debt. Credit cards should wait until you're 18+ and have strong money habits.",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Debit Card: Your Money",
        content: "💳 DEBIT CARD = YOUR MONEY\n\nHow it works:\n1️⃣ You have £50 in account\n2️⃣ Buy something for £20\n3️⃣ Now you have £30\n4️⃣ Simple!\n\n✅ PROS:\n• Can't go into debt\n• No interest charges\n• Available age 11+\n• Learn real money management\n• Parents can monitor\n\n❌ CONS:\n• Can only spend what you have\n• No credit score building\n\n💡 THINK: Digital version of cash in your wallet!",
        emoji: "💳",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Credit Card: Borrowed Money",
        content: "💳 CREDIT CARD = BANK'S MONEY (YOU MUST PAY BACK!)\n\nHow it works:\n1️⃣ Bank gives you £1,000 limit\n2️⃣ You spend £200\n3️⃣ Bank pays the shop\n4️⃣ You owe bank £200\n5️⃣ Must pay back (+ interest if late!)\n\n⚠️ THE DANGER:\n• Must be 18+\n• Can go into debt\n• 25-40% interest if not paid\n• Destroys credit score if misused\n• Takes YEARS to escape debt\n\n💡 THINK: Like borrowing from a loan shark (but legal)!",
        emoji: "⚠️",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "The Credit Card TRAP",
        content: "😱 REAL SCENARIO:\n\n📱 Buy iPhone for £800 on credit\n💰 Can't afford to pay it back\n📉 Pay minimum £25/month\n📈 25% interest keeps adding\n⏰ 3 years later: STILL owe £600\n💸 That phone actually cost £1,500!\n\n🎯 THE PROBLEM:\nMinimum payments barely cover interest!\n\n✅ THE RULE:\nNEVER buy on credit what you can't afford to pay off IMMEDIATELY!\n\n💡 This is how people get trapped in debt for years!",
        emoji: "🚨",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Why Teens Should Use Debit Cards",
        content: "🎯 STICK WITH DEBIT UNTIL 18+ (AT LEAST!)\n\n✅ REASONS:\n1. No debt risk - can't spend what you don't have\n2. Learn REAL money management\n3. See balance drop in real-time\n4. No interest charges\n5. Build good habits early\n6. Parents can help monitor\n\n💡 WHEN TO GET CREDIT (18+):\n• Only for emergencies\n• Building credit score\n• Pay off EVERY month\n• Never carry a balance\n\n🎯 REMEMBER: Just because you CAN borrow doesn't mean you SHOULD!",
        emoji: "✅",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Card Safety: Protect Yourself",
        content: "🔒 SAFETY RULES:\n\n🚫 NEVER SHARE:\n• Your PIN\n• Full card number\n• Security code (CVV)\n• Passwords\n\n✅ ALWAYS DO:\n• Check balance before spending\n• Review transactions daily\n• Report lost cards INSTANTLY\n• Use secure websites (https://)\n• Keep receipts\n• Set up transaction alerts\n\n⚠️ WATCH FOR:\n• Phishing emails\n• Fake websites\n• Shoulder surfing (people watching you type PIN)\n• Unknown transactions\n\n💡 Your bank will NEVER ask for your PIN or password!",
        emoji: "🔐",
        points: 5
      }
    ],
    points: 350,
    difficultyLevel: "beginner",
    timeEstimate: 25,
    prerequisites: ["Understanding Bank Accounts for Teens"],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Online Shopping Safety & Smart Buying",
    description: "Master safe online shopping! Learn to spot scams, protect your money, and get the best deals when shopping online.",
    topic: "Digital Safety",
    lessonContent: `
# Online Shopping Safety & Smart Buying

Shopping online is awesome - but scammers are everywhere! Let's keep you safe and help you get the best deals.

## Why Online Shopping is Risky

### The Problem:
- Can't see/touch products
- Easy to create fake websites
- Stolen card details
- Items never arrive
- Fake reviews
- Hidden fees

### The Good News:
With the right knowledge, you can shop safely and smartly!

## Rule #1: Check the Website is REAL

### Signs of a Legit Website:

✅ **HTTPS:// and Padlock** 🔒
- Look for padlock in address bar
- URL starts with "https://" not "http://"
- This means encrypted and secure

✅ **Proper Domain Name**
- Nike.com ✅
- Nike-sales-uk.xyz ❌
- Official-adidas-store.ru ❌

✅ **Professional Design**
- No spelling mistakes
- Working links
- Real contact info
- Proper terms & conditions

✅ **Reviews Outside Their Site**
- Check Trustpilot
- Google the company name + "scam"
- Look on Reddit

### Red Flags (DANGER!)

🚩 Prices too good to be true (iPhone for £50)
🚩 Spelling mistakes everywhere
🚩 Only accepts bank transfer/crypto
🚩 No contact information
🚩 Pressures you to buy NOW
🚩 Website is brand new
🚩 No return policy

## Rule #2: Protect Your Payment Info

### SAFE Payment Methods:

✅ **Debit/Credit Card** (with protection)
- Section 75 protection over £100
- Chargeback rights
- Fraud protection

✅ **PayPal**
- Don't share card details with seller
- Buyer protection
- Dispute resolution

✅ **Apple Pay / Google Pay**
- Doesn't share card details
- Extra security layer

### UNSAFE Payment Methods:

❌ **Bank Transfer**
- No protection
- Can't get money back
- Scammer's favorite!

❌ **Crypto/Bitcoin**
- Irreversible
- No protection
- Common in scams

❌ **Gift Cards**
- Can't trace
- No refunds
- HUGE red flag!

## Rule #3: Spot Fake Deals

### Too Good to Be True = Usually Is!

**Example Scams:**
- "iPhone 15 Pro - £50!" (Real price £1,000+)
- "Designer trainers - £20!" (Real price £150+)
- "Limited time: 99% off!" (Pressure tactics)

### How to Check if Deal is Real:

1. **Google the Product** 📱
   Compare prices on 3+ legit sites

2. **Check Price History** 📊
   Use CamelCamelCamel for Amazon

3. **Read Reviews** ⭐
   Especially 1-star and 3-star reviews

4. **Reverse Image Search** 🔍
   See if product photo is stolen

## Rule #4: Avoid Fake Reviews

### Spotting Fake Reviews:

🚩 **All 5-star reviews**
Real products have mix of ratings

🚩 **Generic comments**
"Great product!" "Amazing!" "Best purchase!"

🚩 **All posted same day**
Suspicious timing

🚩 **Perfect grammar/copied text**
Often translated or copy-pasted

🚩 **Over-the-top praise**
Sounds like an ad

### Finding REAL Reviews:

✅ Check multiple sites
✅ Look for detailed, specific feedback
✅ Read 3-star reviews (most honest)
✅ Check video reviews on YouTube
✅ Ask on Reddit/forums

## Rule #5: Shop Smart - Get Best Deals

### Price Comparison:

1. **Never Buy from First Site** 🛑
   Always check 3+ places

2. **Use Comparison Sites** 💻
   - Google Shopping
   - PriceRunner
   - Idealo

3. **Check Amazon vs Others** 📦
   Amazon isn't always cheapest!

4. **Look for Discount Codes** 🎟️
   - Honey extension
   - VoucherCodes
   - Student Beans (student discount)

### Timing Your Purchases:

**Best Times to Buy:**
- 🎁 Black Friday (November)
- 📦 Cyber Monday
- 🎊 Boxing Day
- 📚 Back to School (August)
- 🌸 Spring Sales (March/April)

**Worst Times:**
- Right before Christmas (prices highest)
- When you "need" something urgently

## Rule #6: Know Your Rights

### In the UK, You Have:

✅ **14-Day Cooling Off Period**
Return most online purchases within 14 days (no reason needed)

✅ **Items Must Match Description**
If they don't, you can return

✅ **Refund if Faulty**
Up to 30 days for full refund

✅ **Delivery Times**
If late, you can cancel

### How to Return:

1. Contact seller within 14 days
2. Send item back (usually within 14 more days)
3. Get refund within 14 days of them receiving it

**Note:** Exceptions - personalized items, underwear, perishables

## Common Online Scams

### 1. Fake Website Scams
Copy of real site, steals your card details

**How to Avoid:**
- Check URL carefully
- Type address yourself, don't click links
- Look for https:// and padlock

### 2. Too-Good-To-Be-True Prices
Looks like amazing deal, you never receive item

**How to Avoid:**
- If price seems impossible, it is
- Check seller reviews
- Use PayPal for protection

### 3. Phishing Emails
"Your order has a problem, click here"

**How to Avoid:**
- Don't click links in emails
- Go direct to website
- Check sender email address carefully

### 4. Fake Tracking Numbers
Shows "delivered" but you never got it

**How to Avoid:**
- Check tracking on official courier site
- Save delivery photos
- Report to bank/PayPal

## Safe Shopping Checklist

Before clicking "Buy Now", check:

✅ Is the website secure (https://)?
✅ Do other people recommend this site?
✅ Is the price realistic?
✅ Can I return it if needed?
✅ Am I using a safe payment method?
✅ Have I compared prices?
✅ Do I actually need this?
✅ Can I afford it without borrowing?

**All YES?** → Safe to proceed!
**Any NO?** → Wait and research more!

## Smart Shopping Habits

1. **Make a List** 📝
   Don't browse randomly - know what you need

2. **Sleep On It** 😴
   Wait 24 hours for purchases over £20

3. **Save Items for Later** 💾
   Add to wishlist, see if you still want it next week

4. **Set a Budget** 💰
   Decide max spend before shopping

5. **Unsubscribe from Temptation** 📧
   Too many marketing emails = too much spending

6. **Use Incognito Mode** 🕵️
   Prices sometimes increase based on cookies

## What to Do if Scammed

**Immediate Actions:**

1. **Contact Your Bank** 🏦
   Report fraud, freeze card

2. **Contact the Seller** 📧
   Try to resolve (unlikely with scammers)

3. **Report to PayPal** 💳
   If you paid via PayPal

4. **Report to Action Fraud** 👮
   UK's national fraud reporting center

5. **Change Passwords** 🔒
   Especially if you used same password elsewhere

6. **Learn and Move On** 💪
   Don't be embarrassed - it happens to everyone!
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "You find an iPhone 15 Pro for £50 online. What should you do?",
          options: [
            "Buy it immediately before it sells out!",
            "It's definitely a scam - the real price is £1,000+",
            "Share it with all your friends",
            "Put your card details in quickly"
          ],
          correctAnswer: 1,
          explanation: "This is 100% a scam! iPhone 15 Pro costs £1,000+. If a price seems too good to be true, it always is. You'll lose your money and never receive the phone.",
          points: 100
        },
        {
          id: "q2",
          question: "What does 'https://' and a padlock mean on a website?",
          options: [
            "The website is definitely not a scam",
            "The connection is encrypted and more secure",
            "You'll definitely get your order",
            "The prices are locked in"
          ],
          correctAnswer: 1,
          explanation: "HTTPS and the padlock mean the connection is encrypted (secure), but it doesn't guarantee the site isn't a scam. Scammers can have HTTPS too! Always check other factors.",
          points: 100
        },
        {
          id: "q3",
          question: "Which payment method is SAFEST for online shopping?",
          options: [
            "Bank transfer",
            "Bitcoin/cryptocurrency",
            "Gift cards",
            "PayPal or debit/credit card"
          ],
          correctAnswer: 3,
          explanation: "PayPal or debit/credit cards offer buyer protection and fraud protection. You can dispute charges and get your money back. Bank transfer, crypto, and gift cards offer NO protection!",
          points: 100
        },
        {
          id: "q4",
          question: "You bought trainers online but they don't fit. How long do you have to return them in the UK?",
          options: [
            "24 hours",
            "7 days",
            "14 days",
            "30 days"
          ],
          correctAnswer: 2,
          explanation: "In the UK, you have a 14-day cooling-off period for online purchases. You can return most items within 14 days for ANY reason (even just changing your mind)!",
          points: 100
        },
        {
          id: "q5",
          question: "A seller only accepts bank transfer as payment. What does this tell you?",
          options: [
            "They're trying to save on fees",
            "It's probably a scam - no buyer protection with transfers",
            "It's the safest payment method",
            "It's normal"
          ],
          correctAnswer: 1,
          explanation: "HUGE RED FLAG! 🚩 Legitimate businesses accept card/PayPal. Scammers love bank transfers because you can't reverse them and have zero protection. Never do it!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Is This Website REAL?",
        content: "🔍 CHECK BEFORE YOU BUY:\n\n✅ GOOD SIGNS:\n• https:// and 🔒 padlock\n• Professional design\n• Real contact info\n• Proper domain (Nike.com not Nike-sale.xyz)\n• Reviews on Trustpilot\n\n🚩 RED FLAGS:\n• http:// (no 's')\n• Spelling mistakes\n• Weird domain name\n• Prices WAY too good\n• No contact info\n• Pressures you to buy NOW\n\n💡 RULE: If something feels off, it probably is!",
        emoji: "🔍",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Safe Payment Methods",
        content: "💳 SAFE PAYMENTS:\n\n✅ DEBIT/CREDIT CARD:\n• Fraud protection\n• Can dispute charges\n• Can do chargeback\n\n✅ PAYPAL:\n• Don't share card with seller\n• Buyer protection\n• Dispute resolution\n\n❌ NEVER USE:\n• Bank transfer (can't reverse!)\n• Cryptocurrency (irreversible!)\n• Gift cards (untraceable!)\n• Cash in mail (!)\n\n💡 If they ONLY accept unsafe methods = 🚩 SCAM!",
        emoji: "💳",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "Spotting Too-Good-To-Be-True Scams",
        content: "🎯 SCAM EXAMPLES:\n\n❌ 'iPhone 15 Pro - £50!'\nReal price: £1,000+\n\n❌ 'Designer trainers - £20!'\nReal price: £150+\n\n❌ '99% OFF - Buy NOW!'\nPressure tactics\n\n✅ HOW TO CHECK:\n1. Google the product\n2. Compare 3+ legit sites\n3. Check review sites\n4. Reverse image search\n\n💡 RULE: If price is unbelievably low, you'll get nothing or a fake!",
        emoji: "🚨",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Getting the BEST Deals (Legally!)",
        content: "💰 PRICE COMPARISON STRATEGY:\n\n1️⃣ NEVER buy from first site\nAlways check 3+ places\n\n2️⃣ USE COMPARISON TOOLS:\n• Google Shopping\n• PriceRunner\n• Honey extension\n\n3️⃣ FIND DISCOUNT CODES:\n• VoucherCodes\n• Student Beans (student discount)\n• Retailer newsletters\n\n4️⃣ BEST TIMES TO BUY:\n🎁 Black Friday\n📦 Cyber Monday\n🎊 Boxing Day\n\n💡 PRO TIP: Add to basket and wait - they often send you a discount code!",
        emoji: "💰",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "What To Do If You Get Scammed",
        content: "😱 GOT SCAMMED? ACT FAST:\n\n1️⃣ CONTACT YOUR BANK\nReport fraud\nFreeze card\nRequest chargeback\n\n2️⃣ CONTACT PAYPAL\nOpen dispute\nBuyer protection\n\n3️⃣ REPORT TO ACTION FRAUD\nUK national fraud center\nHelps catch scammers\n\n4️⃣ CHANGE PASSWORDS\nEspecially if you reused them\n\n5️⃣ LEARN & MOVE ON\nDon't be embarrassed\nHappens to everyone\nYou're now wiser!\n\n💡 Speed is EVERYTHING - report within 24 hours!",
        emoji: "🆘",
        points: 5
      }
    ],
    points: 350,
    difficultyLevel: "beginner",
    timeEstimate: 25,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Setting Financial Goals That Actually Work",
    description: "Learn how to set and achieve your money goals! From saving for trainers to planning for university, make your dreams happen.",
    topic: "Goal Setting",
    lessonContent: `
# Setting Financial Goals That Actually Work

Want that new phone? Dream holiday? University fund? Let's turn those dreams into reality with SMART goal setting!

## Why Financial Goals Matter

### Without Goals:
- Money disappears on random stuff
- Never save enough for big purchases
- Feel broke all the time
- No direction or purpose

### With Goals:
- Know exactly what you're saving for
- Stay motivated to save
- Make better spending choices
- Actually achieve what you want!

## The SMART Goal Framework

Make goals that actually work!

### S - Specific
Don't say: "I want to save money"
DO say: "I want to save £500 for new trainers"

### M - Measurable
Track your progress!
"I've saved £250 so far - halfway there!"

### A - Achievable
Be realistic!
❌ Save £10,000 in 1 month (impossible)
✅ Save £100 per month (doable!)

### R - Relevant
Does it matter to YOU?
Not your parents' goals - YOUR goals!

### T - Time-Bound
Set a deadline!
"Save £500 by December 1st"

## Types of Financial Goals

### Short-Term Goals (1-6 months)
- New trainers (£100)
- Concert tickets (£60)
- New game (£50)
- Birthday gift for friend (£30)

**How to save:**
- Set aside £20-50 per week
- Skip a few takeaways
- Do extra chores for money

### Medium-Term Goals (6 months - 2 years)
- New phone (£500-£1,000)
- Laptop for uni (£600)
- Driving lessons (£1,000-£1,500)
- School trip abroad (£800)

**How to save:**
- Save £50-100 per month
- Part-time job income
- Birthday/Christmas money
- Side hustles

### Long-Term Goals (2+ years)
- University costs (£10,000+)
- Car (£5,000+)
- Gap year travel (£3,000+)
- First home deposit (future)

**How to save:**
- Start early!
- Use savings accounts with interest
- Invest (when 18+)
- Consistent monthly savings

## The Goal-Setting Process

### Step 1: Dream Big
List EVERYTHING you want:
- New phone
- Concert tickets
- University fund
- Holiday
- New clothes

### Step 2: Prioritize
Rank them 1-10
What matters MOST to you?

### Step 3: Make Them SMART
Pick top 3 and make them specific:

❌ "Get a phone"
✅ "Save £800 for iPhone 15 by June 1st"

### Step 4: Calculate What You Need
Monthly savings needed:

Want £600 laptop in 6 months?
£600 ÷ 6 = £100 per month

Want £1,200 in 1 year?
£1,200 ÷ 12 = £100 per month

### Step 5: Track Progress
- Use app or notebook
- Check weekly
- Celebrate milestones!

## Creating Your Savings Plan

### Example Goal: £500 Trainers in 5 Months

**Monthly breakdown:**
£500 ÷ 5 = £100 per month

**Weekly breakdown:**
£100 ÷ 4 = £25 per week

**Where to find £25/week:**
- Part-time job: £40/week → Save £25
- Pocket money: £15/week → Save £15
- Extra chores: £10/week
- Skip takeaway: £5/week saved
- Walk instead of bus: £5/week saved

**TOTAL: £25/week = £100/month = £500 in 5 months!** ✅

## Multiple Goals Strategy

Don't just have ONE goal!

### The 3-Bucket System:

**Bucket 1: Emergency (20%)**
For unexpected stuff
£100/month → £20 here

**Bucket 2: Short-Term Goal (50%)**
New trainers
£100/month → £50 here

**Bucket 3: Long-Term Goal (30%)**
University fund
£100/month → £30 here

## Staying Motivated

### 1. Visualize Your Goal 📸
- Photo of the item on your wall
- Set as phone wallpaper
- Vision board

### 2. Track Progress Visually 📊
- Color in a chart
- Use savings tracker app
- Cross off milestones

### 3. Celebrate Milestones 🎉
Every £100 saved = Treat yourself (small!)
25% done = Movie night
50% done = Favorite meal
75% done = Day out with friends
100% done = BUY THE THING!

### 4. Share Your Goal 📢
Tell friends/family
They'll help keep you accountable!

### 5. Remember WHY 💭
When tempted to spend:
"Do I want this NOW or my goal MORE?"

## Common Goal-Setting Mistakes

### Mistake 1: Goals Too Big
❌ Save £5,000 in 3 months while earning £50/month
✅ Save £500 in 6 months - achievable!

### Mistake 2: No Deadline
❌ "Someday I'll save for a laptop"
✅ "Save £600 for laptop by December"

### Mistake 3: Not Tracking Progress
❌ Hope you're saving enough
✅ Check balance weekly

### Mistake 4: Giving Up Too Soon
❌ Miss one week, quit entirely
✅ Miss one week, get back on track!

### Mistake 5: No Written Plan
❌ Keep goals in your head
✅ Write them down!

## Adjusting Goals

Life changes! It's OK to adjust:

### When to Revise:

**Income Changes:**
Lost job → Smaller goal or longer timeline
Got raise → Bigger goal or faster timeline

**Priorities Shift:**
Wanted trainers, now need laptop
→ Switch goals!

**Emergency Happens:**
Needed to use savings
→ Restart with new timeline

**Hit Goal Early:**
🎉 Celebrate!
→ Set new goal!

## Real Teen Goal Examples

### Example 1: Concert Tickets

**Goal:** £180 for concert in 3 months
**Income:** £60/month pocket money
**Plan:**
- Save £60/month = £180 in 3 months ✅
- Cut spending on snacks
- Bring lunch from home

**Result:** Hit goal with 2 weeks to spare!

### Example 2: New Phone

**Goal:** £800 iPhone in 8 months
**Income:** £400/month part-time job
**Plan:**
- Save £100/month
- Keep £300 for spending/savings
**Result:** Bought phone + £50 extra saved!

### Example 3: University Fund

**Goal:** £5,000 in 3 years
**Income:** Various sources
**Plan:**
- £140/month for 36 months
- Part-time job: £100/month
- Birthday/Christmas: £500/year = £40/month
**Result:** On track with £2,000 after year 1!

## Taking Action TODAY

### Your 5-Minute Goal-Setting Challenge:

1. **Write down 3 things you want to buy/save for**

2. **Pick ONE to start with**

3. **Make it SMART:**
   - Specific: What exactly?
   - Measurable: How much?
   - Achievable: Can you realistically save this?
   - Relevant: Do YOU want it?
   - Time-Bound: By when?

4. **Calculate monthly/weekly amount needed**

5. **Start saving THIS WEEK!**

## Remember:

💪 **Start Small** - Even £5/week builds up!
🎯 **Be Specific** - Vague goals don't work
📊 **Track Progress** - What gets measured gets done
🎉 **Celebrate Wins** - Acknowledge progress
🔄 **Adjust if Needed** - Life happens!

**The best time to start was yesterday. The second best time is NOW!**
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What does the 'S' in SMART goals stand for?",
          options: [
            "Savings",
            "Specific",
            "Simple",
            "Super"
          ],
          correctAnswer: 1,
          explanation: "S = Specific! Your goal should be clear and specific. Instead of 'save money', say 'save £500 for new trainers'. Specific goals are much more likely to be achieved!",
          points: 100
        },
        {
          id: "q2",
          question: "You want to save £600 in 6 months. How much do you need to save per month?",
          options: [
            "£50",
            "£60",
            "£100",
            "£200"
          ],
          correctAnswer: 2,
          explanation: "£600 ÷ 6 months = £100 per month. Breaking down big goals into monthly or weekly amounts makes them feel much more achievable!",
          points: 100
        },
        {
          id: "q3",
          question: "Which is a SMART goal?",
          options: [
            "I want to save some money",
            "I'll save money for something nice",
            "Save £400 for a laptop by December 1st",
            "Get rich"
          ],
          correctAnswer: 2,
          explanation: "'Save £400 for a laptop by December 1st' is SMART - it's Specific (laptop), Measurable (£400), Achievable (realistic), Relevant (you need it), and Time-bound (December 1st)!",
          points: 100
        },
        {
          id: "q4",
          question: "You're saving for trainers but an emergency happens and you need the money. What should you do?",
          options: [
            "Give up on the goal forever",
            "Feel like a failure",
            "Adjust your timeline and start again",
            "Go into debt to keep the goal"
          ],
          correctAnswer: 2,
          explanation: "Life happens! Adjust your timeline and restart. Emergencies are why we save. The important thing is to keep going, not to be perfect. Flexibility is key!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Why Goals = Money Success",
        content: "🎯 WITHOUT GOALS:\n• Money vanishes on random stuff\n• Never save for big purchases\n• Always feel broke\n• No direction\n\n✅ WITH GOALS:\n• Know what you're saving for\n• Stay motivated\n• Make better choices\n• Actually GET what you want!\n\n💡 REAL TALK:\nGoal: £500 for trainers by June\nVs.\nNo Goal: 'Where did all my money go?'\n\n🚀 Goals give your money a JOB!",
        emoji: "🎯",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "SMART Goals: The Secret Formula",
        content: "Make goals that ACTUALLY work!\n\nS - SPECIFIC 🎯\n❌ 'Save money'\n✅ 'Save £500 for trainers'\n\nM - MEASURABLE 📊\n'I've saved £250 - halfway!'\n\nA - ACHIEVABLE ✅\n❌ £10,000 in 1 month\n✅ £100 per month\n\nR - RELEVANT 💭\nYOUR goals, not parents'!\n\nT - TIME-BOUND ⏰\n'By December 1st'\n\n💡 EXAMPLE:\n'Save £800 for iPhone 15 by June 1st, 2025' = PERFECT!",
        emoji: "✨",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "Breaking Down Big Goals",
        content: "£600 feels HUGE. £25/week? Easy!\n\n🎯 EXAMPLE: £600 Laptop\n\n📅 IN 6 MONTHS:\n£600 ÷ 6 = £100/month\n\n📅 PER WEEK:\n£100 ÷ 4 = £25/week\n\n💰 WHERE TO FIND £25:\n• Part-time job: £40/week → Save £25\n• Skip 2 takeaways: £10 saved\n• Walk instead of bus: £5 saved\n• Extra chores: £10\n\n✅ TOTAL: £25/week = £600 in 6 months!\n\n💡 Small steps = BIG results!",
        emoji: "📊",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "The 3-Bucket Strategy",
        content: "Don't have just ONE goal!\n\n💼 BUCKET 1: EMERGENCY (20%)\nUnexpected stuff\nKeeps you safe\n\n🎯 BUCKET 2: SHORT-TERM (50%)\nThings you want soon\nTrainers, concert, phone case\n\n🏆 BUCKET 3: LONG-TERM (30%)\nBig future stuff\nUni, car, gap year\n\n💰 EXAMPLE with £100:\n• £20 → Emergency\n• £50 → Trainers (short)\n• £30 → Uni fund (long)\n\n💡 This way you're ALWAYS making progress on everything!",
        emoji: "🗂️",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Staying Motivated",
        content: "How to NOT give up:\n\n📸 VISUALIZE IT:\n• Photo on your wall\n• Phone wallpaper\n• Vision board\n\n📊 TRACK PROGRESS:\n• Color in a chart\n• Use savings app\n• Cross off milestones\n\n🎉 CELEBRATE WINS:\n25% done = Movie night\n50% done = Treat yourself\n75% done = Day with friends\n100% done = BUY IT! 🎉\n\n💭 ASK YOURSELF:\n'Do I want this NOW or my goal MORE?'\n\n💪 Future you will thank present you!",
        emoji: "🔥",
        points: 5
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
    title: "Mobile Banking Apps: Your Money in Your Pocket",
    description: "Master mobile banking! Learn how to use banking apps safely, track spending, and manage your money on the go.",
    topic: "Digital Banking",
    lessonContent: `
# Mobile Banking Apps: Your Money in Your Pocket

Your bank in your phone! Let's learn how to use banking apps like a pro and stay safe while doing it.

## What is Mobile Banking?

Mobile banking lets you manage your money using an app on your phone!

### What You Can Do:

✅ **Check Balance** - Instantly see how much you have
✅ **View Transactions** - See every purchase
✅ **Transfer Money** - Send to friends/family
✅ **Pay Bills** - Set up payments
✅ **Deposit Checks** - Take photo to deposit (some banks)
✅ **Lock/Unlock Card** - If lost, freeze it instantly
✅ **Set Budgets** - Track spending by category
✅ **Get Alerts** - Notification for every transaction

All from your phone! 📱

## Best Banking Apps for Teens (UK)

### Traditional Banks:

**Barclays Mobile Banking**
- Age: 11+
- Features: Spending tracker, budgeting tools
- Great for: First-time bankers

**HSBC Mobile Banking**
- Age: 11+
- Features: Connected Money (tracks all accounts)
- Great for: Simple, straightforward banking

**NatWest Mobile Banking**
- Age: 11+
- Features: Rooster Money integration
- Great for: Learning money management

### Modern App-Based Banks:

**Starling Bank**
- Age: 16+
- Features: Instant notifications, spending insights
- Great for: Tech-savvy teens

**Monzo**
- Age: 16+
- Features: Pots (savings goals), instant budgeting
- Great for: Visual money management

**Revolut**
- Age: 6+ (Junior account)
- Features: Multi-currency, financial education
- Great for: Travelers, learning

## Setting Up Your Banking App

### Step 1: Download
- Go to App Store (iPhone) or Google Play (Android)
- Search for your bank's official app
- Check it's the REAL app (verified developer)
- Download and install

### Step 2: Register
- Enter your account details
- Create username and password
- Set up biometric login (fingerprint/Face ID)
- Verify your identity

### Step 3: Enable Security Features
- Turn on biometric login
- Set up transaction notifications
- Enable card lock feature
- Create strong password

### Step 4: Explore Features
- Check your balance
- Review recent transactions
- Set up budgeting tools
- Customize alerts

## Key Features to Use

### 1. Balance Check 💰
Check BEFORE you buy!

**Morning Routine:**
- Open app
- Check balance
- Know what you can spend today

### 2. Transaction History 📊
See every purchase:
- Where you spent
- How much
- When
- What category

**Weekly Review:**
Look for:
- Unexpected charges
- Subscription you forgot
- Places you overspend

### 3. Instant Notifications 🔔
Get alert for EVERY transaction!

**Benefits:**
- Spot fraud immediately
- Stay aware of spending
- Never forget what you bought

**Set up alerts for:**
- Any transaction over £0
- Balance below £20
- Direct debits
- Failed payments

### 4. Spending Insights 📈
Many apps categorize spending:
- 🍕 Food & Dining
- 🚌 Transport
- 🎮 Entertainment
- 👕 Shopping

**Use this to:**
- See where money goes
- Find areas to cut back
- Set category budgets

### 5. Savings Pots/Goals 🎯
Create separate "pots" for goals:

**Example:**
- "New Phone" pot: £350/£800
- "Concert" pot: £120/£180
- "Emergency" pot: £75/£200

Move money to pots as you save!

### 6. Freeze Card 🔒
Lost your card? Freeze it INSTANTLY!

**Benefits:**
- No one can use it
- Unfreeze if you find it
- Order new one if lost for good

### 7. Peer-to-Peer Payments 💸
Send money to friends instantly!

**Popular options:**
- Bank transfer (free)
- PayPal
- Revolut
- Monzo
- Pingit

**Split bills easily:**
Dinner was £60 for 3 people?
Each person pays £20 instantly!

## Budgeting Within Apps

### Monzo Example:

**1. Set Monthly Budget:**
"I have £400 to spend this month"

**2. App Calculates Daily:**
"You have £13.33 to spend today"

**3. Updates in Real-Time:**
Spend £5 → "You have £8.33 left today"

**4. Carries Over:**
Didn't spend yesterday? Add to today!

### Creating Category Budgets:

- 🍕 Food: £100/month
- 🚌 Transport: £40/month
- 🎮 Entertainment: £60/month
- 👕 Shopping: £80/month

App warns when you're close to limit!

## Staying Safe with Mobile Banking

### Security Essentials:

**1. Strong Password** 🔒
- 12+ characters
- Mix of letters, numbers, symbols
- NOT your birthday or name
- Different from other passwords

**2. Biometric Login** 👆
- Fingerprint
- Face ID
- Faster and safer than typing password

**3. Never Share** 🚫
- Don't share login details
- Not even with best friends
- Bank will NEVER ask for password

**4. Secure Phone** 📱
- Phone passcode enabled
- Auto-lock after 30 seconds
- Keep software updated

**5. Public Wi-Fi Warning** ⚠️
- Avoid banking on public Wi-Fi
- Use mobile data instead
- Or use VPN if you must

**6. Check Transactions Daily** 📊
- Spot fraud early
- Report unknown charges
- Keep your money safe

## Red Flags & Scams

### Watch Out For:

🚩 **Phishing Texts**
"Your account is locked, click here"
→ Never click! Call bank directly

🚩 **Fake Login Pages**
Look exactly like real app
→ Always use official app, not links

🚩 **"Too Good to Be True" Offers**
"Get £100 free, just enter your details"
→ Scam! Banks don't work like this

🚩 **Urgent Pressure**
"Act now or your account closes!"
→ Fake! Banks give proper notice

### If Something Seems Off:

1. ❌ DON'T click any links
2. ❌ DON'T enter your details
3. ✅ DO close the message
4. ✅ DO open your banking app directly
5. ✅ DO call your bank if concerned

## Top Tips for Mobile Banking

### Daily Habits:

**Morning:**
- Check balance
- Review yesterday's transactions
- Know your spending power

**After Purchases:**
- Check transaction appeared
- Correct amount?
- Correct merchant?

**Evening:**
- Quick balance check
- Any unexpected transactions?

### Weekly Routine:

**Sunday Planning:**
- Review last week's spending
- Check upcoming bills
- Plan next week's budget
- Move money to savings pots

### Monthly Tasks:

**End of Month:**
- Review full month
- Check all subscriptions still needed
- Celebrate if under budget!
- Set next month's budget

## Common Mistakes to Avoid

❌ **Not Checking Daily**
→ Miss fraud or overspending

❌ **Ignoring Notifications**
→ They're trying to help you!

❌ **Using Same Password Everywhere**
→ One hack = all accounts at risk

❌ **Banking on Public Wi-Fi**
→ Easy to intercept data

❌ **Sharing Login with Friends**
→ Against bank rules, not safe

❌ **Not Setting Up Alerts**
→ Miss important information

## Advanced Features

### Once You're Comfortable:

**1. Bill Payments** 💳
Set up direct debits for:
- Phone bill
- Subscriptions
- Regular payments

**2. Standing Orders** 🔄
Automatic transfers:
- To savings every month
- To friend for shared costs
- To family member

**3. Round-Up Savings** 💰
Buy coffee for £2.70?
App rounds to £3.00
Saves £0.30 automatically!

**4. Spending Analysis** 📊
Deep dive into habits:
- Where you overspend
- Patterns over time
- Compare month-to-month

## Getting Help

### If You Need Support:

**In-App Help:**
- Most apps have chat support
- Quick answers
- Available 24/7

**Phone Support:**
- Call your bank
- Keep number saved
- Explain the issue

**Parent/Guardian:**
- They can help
- Especially for bigger issues
- Learn together!

**Bank Branch:**
- Visit in person
- Bring ID
- They'll walk you through

## Your Action Plan

**This Week:**

1. ✅ Download your bank's app
2. ✅ Set up biometric login
3. ✅ Enable transaction notifications
4. ✅ Check balance daily
5. ✅ Review all transactions

**This Month:**

1. ✅ Set up a savings pot/goal
2. ✅ Try the budgeting feature
3. ✅ Review spending by category
4. ✅ Set up at least one direct debit

**Remember:** Your phone is powerful - use it to build wealth, not just spend! 💪
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "What's the FIRST thing you should do when you set up a banking app?",
          options: [
            "Share it with all your friends",
            "Enable biometric login and transaction notifications",
            "Transfer all your money out",
            "Delete your account"
          ],
          correctAnswer: 1,
          explanation: "Always set up security FIRST! Enable biometric login (fingerprint/Face ID) and turn on transaction notifications. This keeps your money safe and helps you track spending.",
          points: 100
        },
        {
          id: "q2",
          question: "You get a text saying 'Your bank account is locked, click here to unlock'. What should you do?",
          options: [
            "Click the link immediately",
            "Enter your password to unlock it",
            "Delete the message and open your banking app directly",
            "Send them your card details"
          ],
          correctAnswer: 2,
          explanation: "This is a phishing scam! NEVER click links in texts/emails. Delete it and open your banking app directly. If there's a real problem, you'll see it in the app.",
          points: 100
        },
        {
          id: "q3",
          question: "How often should you check your banking app?",
          options: [
            "Once a year",
            "Only when you need to buy something",
            "Daily - quick balance and transaction check",
            "Never - it's scary"
          ],
          correctAnswer: 2,
          explanation: "Check DAILY! A quick morning check of your balance and transactions helps you stay in control, spot fraud early, and avoid overspending. Takes 30 seconds!",
          points: 100
        },
        {
          id: "q4",
          question: "You're at a coffee shop using public Wi-Fi. Should you check your bank balance?",
          options: [
            "Yes, it's fine",
            "No - use mobile data instead for banking",
            "Yes, but only if you need to",
            "Yes, public Wi-Fi is safer"
          ],
          correctAnswer: 1,
          explanation: "NEVER use public Wi-Fi for banking! Hackers can intercept your data. Always use your mobile data for banking, or wait until you're on a secure network.",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "What Can Banking Apps DO?",
        content: "Your bank in your pocket! 📱\n\n✅ INSTANT ACCESS:\n• Check balance (know what you can spend)\n• See all transactions\n• Transfer money to friends\n• Pay bills\n• Lock card if lost\n• Set budgets\n• Get spending insights\n\n⚡ ALL IN SECONDS!\n\n💡 BEST APPS FOR TEENS:\n• Barclays (age 11+)\n• Starling (age 16+)\n• Monzo (age 16+)\n• Revolut Junior (age 6+)\n\n🎯 Pick one with great features AND good security!",
        emoji: "📱",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "Security First: Stay SAFE",
        content: "🔒 SECURITY ESSENTIALS:\n\n1️⃣ STRONG PASSWORD:\n• 12+ characters\n• Mix letters, numbers, symbols\n• NOT your birthday!\n\n2️⃣ BIOMETRIC LOGIN:\n• Fingerprint or Face ID\n• Faster + safer\n\n3️⃣ TRANSACTION ALERTS:\n• Know EVERY purchase\n• Spot fraud instantly\n\n4️⃣ NEVER SHARE:\n• Not your login\n• Not your password\n• Not even with friends!\n\n⚠️ PUBLIC WI-FI = DANGER:\nUse mobile data for banking!\n\n💡 Your bank will NEVER ask for your password!",
        emoji: "🔐",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "Daily Habits of Money Winners",
        content: "Make these a HABIT:\n\n🌅 MORNING (30 seconds):\n• Open app\n• Check balance\n• Review yesterday's transactions\n• Know your spending power\n\n💳 AFTER BUYING:\n• Check transaction appeared\n• Correct amount?\n• Right merchant?\n\n🌙 EVENING (30 seconds):\n• Quick balance check\n• Any weird transactions?\n\n📊 WEEKLY (Sunday):\n• Review full week\n• Plan next week\n• Move money to savings pots\n\n💡 2 minutes per day = TOTAL control of your money!",
        emoji: "⏰",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Budgeting Features = Superpowers",
        content: "Apps make budgeting EASY!\n\n🎯 SET MONTHLY BUDGET:\n'I have £400 to spend'\n\n📊 APP CALCULATES DAILY:\n'You have £13.33 to spend today'\n\n💸 UPDATES LIVE:\nSpend £5 → 'You have £8.33 left today'\n\n📂 CATEGORY BUDGETS:\n• 🍕 Food: £100/month\n• 🚌 Transport: £40/month\n• 🎮 Fun: £60/month\n\n⚠️ WARNING ALERTS:\n'You've spent 80% of your food budget!'\n\n💡 Like having a financial coach in your pocket!",
        emoji: "💪",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Spotting Scams & Phishing",
        content: "🚨 COMMON SCAMS:\n\n❌ 'Your account is locked!'\nClick here to unlock'\n→ FAKE! Open app directly\n\n❌ 'Confirm your password'\nReply to this text'\n→ SCAM! Banks never ask\n\n❌ 'Get £100 free!'\nJust enter your details'\n→ TRAP! Too good to be true\n\n✅ IF WORRIED:\n1. DON'T click links\n2. DON'T reply\n3. Close message\n4. Open banking app directly\n5. Call bank if needed\n\n💡 REMEMBER: Real banks use IN-APP messages, not random texts!",
        emoji: "🚨",
        points: 5
      }
    ],
    points: 300,
    difficultyLevel: "beginner",
    timeEstimate: 20,
    prerequisites: ["Understanding Bank Accounts for Teens"],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Saving for Your First Big Goal",
    description: "Turn your savings dreams into reality! Learn practical strategies to save for your first major purchase and celebrate success.",
    topic: "Practical Savings",
    lessonContent: `
# Saving for Your First Big Goal

Ready to buy that phone, laptop, or concert tickets? Let's make it happen with a proven savings plan!

## Choosing Your First Goal

### Pick Something That EXCITES You!

Not what your parents want - what YOU want!

**Good First Goals:**
- £200-£600 range
- Something you'll use often
- Makes you excited to save
- Achievable in 3-6 months

**Examples:**
- New phone: £400-£800
- Laptop: £500-£800
- Concert + merch: £150-£250
- New trainers + clothes: £200-£300
- Gaming console: £300-£500

### The Goal-Setting Formula

**1. What exactly do you want?**
"iPhone 15" not just "a phone"

**2. How much does it cost?**
Research the REAL price (inc. tax!)

**3. When do you want it?**
Set a realistic deadline

**4. How will you save?**
Where's the money coming from?

## Creating Your Savings Plan

### Example: £600 Laptop in 6 Months

**Step 1: Calculate Monthly Amount**
£600 ÷ 6 months = £100/month

**Step 2: Break Down Weekly**
£100 ÷ 4 weeks = £25/week

**Step 3: Daily Breakdown**
£25 ÷ 7 days = £3.57/day

**Step 4: Find the Money**

Where to get £25/week:

**Income Sources:**
- Part-time job: £40/week → Save £25
- Pocket money: £15/week
- Birthday/Christmas money
- Extra chores: £10/week
- Selling old stuff

**Cost-Cutting:**
- Pack lunch instead of buying: Save £15/week
- Walk instead of bus: Save £5/week
- Skip 2 takeaway coffees: Save £5/week
- Stream instead of cinema: Save £10/week

**TOTAL FOUND: £25/week!** ✅

## The Savings Account Strategy

### Where to Keep Your Savings:

**Option 1: Separate Savings Account**
✅ Out of sight, out of mind
✅ Earns interest
✅ Less tempting to spend
❌ Takes a day to access

**Best for:** Long-term goals (6+ months)

**Option 2: Savings "Pot" in Main Account**
✅ Easy to access
✅ Can see progress daily
✅ Many apps have this feature
❌ More tempting to dip into

**Best for:** Short-term goals (1-6 months)

**Option 3: Physical Piggy Bank**
✅ Satisfying to add cash
✅ Visual progress
❌ Doesn't earn interest
❌ Easy to break into

**Best for:** Very short-term goals (weeks)

### Choosing the Best Account:

**High-Interest Savings:**
- 3-5% interest
- Money grows while you save!
- Example: Save £50/month for 12 months at 4% = £612 (£12 free!)

**Teen-Friendly Options:**
- Barclays Savings
- HSBC MySavings
- NatWest Savings
- Starling Savings Spaces
- Monzo Pots

## Automation: Set It and Forget It

### The Power of Automatic Transfers

**How it Works:**
1. Set up standing order
2. Money automatically moves on payday
3. You never "see" it to spend it
4. Savings grow without thinking!

**Example:**
Every 1st of month:
£100 automatically moves from current → savings

**Result:**
After 6 months: £600 saved! You barely noticed!

### The "Pay Yourself First" Method

**Traditional (Fails):**
1. Get paid £100
2. Spend on stuff
3. Save whatever's left (usually £0!)

**Pay Yourself First (Works!):**
1. Get paid £100
2. IMMEDIATELY transfer £25 to savings
3. Spend the remaining £75

**Why This Works:**
- Prioritizes savings
- Can't spend what you don't have
- Builds habit

## Tracking Progress

### Visual Tracking Methods

**1. Savings Thermometer** 🌡️
- Draw thermometer on paper
- Color in as you save
- Satisfying to see it rise!

**2. Savings Chain** 📅
- Mark calendar each day you save
- Don't break the chain!
- Visual motivation

**3. App Tracking** 📱
- Most banking apps show progress
- Set goal and watch percentage grow
- Some apps gamify it!

**4. Spreadsheet** 📊
- Track every deposit
- See exactly how much closer
- Calculate estimated finish date

### Celebrating Milestones

**Don't wait until the END to celebrate!**

**25% Progress (£150):**
- Treat yourself to movie night
- Tell friends/family your progress

**50% Progress (£300):**
- Halfway party!
- Your favorite meal
- Buy ONE small thing

**75% Progress (£450):**
- Almost there photo shoot
- Day out with friends
- Share on social media

**100% Progress (£600):**
- BUY THE THING! 🎉
- Celebrate properly
- Take photos
- Set NEW goal!

## Dealing with Temptations

### When You Want to Spend the Savings

**The 24-Hour Rule:**
1. Want to raid savings for something?
2. Wait 24 hours
3. Still want to? Wait another 24 hours
4. Usually the urge passes!

**The Comparison Trick:**
Ask yourself:
"Do I want THIS now, or my [goal] MORE?"

Example:
"Do I want this £50 game now, or my £600 laptop MORE?"

**Usually the answer is: THE GOAL!**

### Emergency Exceptions

**OK to use savings for:**
- Genuine emergency (broken phone you need for school)
- Safety issue
- Urgent need

**NOT OK to use for:**
- "But everyone's going to the concert!"
- "I really want this new game"
- "Just this once..."

**If you DO need to use it:**
1. Don't beat yourself up
2. Adjust your timeline
3. Start saving again immediately

## Accelerating Your Savings

### How to Save FASTER

**1. Increase Income** 💰
- Ask for raise/more hours
- Take on extra chores
- Start small side hustle
- Sell unused stuff

**2. Reduce Spending** 💸
- Track where money goes
- Cut one unnecessary expense
- Pack lunch for a week
- Use free alternatives

**3. One-Time Boosts** 🎁
- Birthday money → straight to savings
- Christmas money → add to goal
- Gift money → top up fund
- Tax refund → boost savings

**4. Challenge Yourself** 🎯
- No-spend days (save money not spent)
- Round-up challenge (round purchases up, save difference)
- Spare change challenge (save all coins)

## Real Success Stories

### Story 1: Emma's £500 Phone

**Goal:** New iPhone in 5 months
**Income:** £80/month pocket money
**Plan:**
- Save £100/month
- Added birthday money (£150)
- Sold old phone (£100)
- Cut back on takeaways

**Result:**
Hit goal in 4 months! Had £550 total!

### Story 2: Jake's £300 Console

**Goal:** PlayStation 5 in 6 months
**Income:** £120/month part-time job
**Plan:**
- Save £50/month from job
- Mowed neighbors' lawns (£20/month)
- Christmas money (£100)

**Result:**
Bought console + 2 games! (£400 total)

### Story 3: Mia's £800 Laptop

**Goal:** MacBook for university in 12 months
**Income:** Various sources
**Plan:**
- Part-time job: £50/month
- Freelance design: £30/month
- Birthday/Christmas: £200/year
- Sold clothes online: £15/month

**Result:**
Saved £950! Got laptop + case + software!

## Your Action Plan

### Week 1: Planning
1. Choose your goal (specific item)
2. Research exact cost
3. Set deadline
4. Calculate monthly/weekly amounts

### Week 2: Setup
1. Open savings account or pot
2. Set up automatic transfer
3. Create visual tracker
4. Tell someone your goal (accountability)

### Week 3-onwards: Saving!
1. Transfer money immediately when paid
2. Track every deposit
3. Check progress weekly
4. Celebrate milestones
5. Stay focused on goal

### Monthly Review:
- Am I on track?
- Need to adjust timeline?
- Found extra money?
- Still want this goal?

## Common Mistakes & Solutions

**Mistake 1: Goal Too Ambitious**
Problem: Want £2,000 but earn £50/month
Solution: Start smaller or extend timeline

**Mistake 2: No Automatic Transfer**
Problem: Forget to save, spend it all
Solution: Set up standing order TODAY

**Mistake 3: Not Tracking Progress**
Problem: Feel like you're getting nowhere
Solution: Visual tracker, check weekly

**Mistake 4: Raiding Savings Too Often**
Problem: Keep "borrowing" from savings
Solution: Separate account that's harder to access

**Mistake 5: Giving Up After Setback**
Problem: Used £50, gave up entirely
Solution: Adjust timeline, keep going!

## Final Tips for Success

1. **Start TODAY** - Not Monday, not next month, TODAY
2. **Automate Everything** - Remove willpower from equation
3. **Make it Visual** - See your progress growing
4. **Tell People** - Accountability helps
5. **Celebrate Wins** - Acknowledge progress
6. **Be Flexible** - Life happens, adjust as needed
7. **Stay Focused** - Remember WHY you're saving

**Remember: Every pound saved is a pound closer to your goal!**

You've got this! 💪🎯💰
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "You want to save £600 in 6 months. What's the best savings strategy?",
          options: [
            "Hope to save whatever's left at month end",
            "Set up automatic £100 transfer on payday to savings",
            "Keep it all in spending account for easy access",
            "Wait to save until you have extra money"
          ],
          correctAnswer: 1,
          explanation: "Automatic transfers work best! Set up £100 to move to savings automatically each month. 'Pay yourself first' - you can't spend what you don't see. This is how successful savers do it!",
          points: 100
        },
        {
          id: "q2",
          question: "What's a realistic first savings goal for a teen?",
          options: [
            "£10,000 for a car in 3 months",
            "£500 for a phone in 6 months",
            "£50,000 for university in 1 year",
            "£100,000 for a house next month"
          ],
          correctAnswer: 1,
          explanation: "£500 in 6 months is realistic and achievable! That's about £20/week. Start with achievable goals to build confidence and habits. You can tackle bigger goals later!",
          points: 100
        },
        {
          id: "q3",
          question: "You're halfway to your £400 goal. A friend invites you to an expensive concert that would cost £100 from your savings. What should you do?",
          options: [
            "Use the savings - you'll save it back later",
            "Use the comparison trick: 'Do I want this now or my goal MORE?'",
            "Borrow from someone else instead",
            "Go anyway and worry later"
          ],
          correctAnswer: 1,
          explanation: "Use the comparison trick! Ask: 'Do I want this £100 concert now, or my £400 goal MORE?' Usually, the goal wins. Find a cheaper alternative to hang with friends instead!",
          points: 100
        },
        {
          id: "q4",
          question: "What's the 'pay yourself first' method?",
          options: [
            "Spend on yourself first, save what's left",
            "Pay for everything you want first",
            "Move money to savings IMMEDIATELY when paid, spend what's left",
            "Pay bills first, then save"
          ],
          correctAnswer: 2,
          explanation: "Pay yourself first means moving money to savings IMMEDIATELY when you get paid, BEFORE spending on anything else. This ensures savings happen and builds wealth!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "Choosing Your First Goal",
        content: "Pick something that EXCITES you!\n\n✅ GOOD FIRST GOALS:\n• £200-£600 range\n• Something you'll actually use\n• Gets you excited to save\n• Achievable in 3-6 months\n\n💡 EXAMPLES:\n• Phone: £400-£800\n• Laptop: £500-£800\n• Concert + merch: £150\n• Trainers + clothes: £250\n• Gaming console: £400\n\n🎯 MAKE IT SPECIFIC:\n❌ 'A phone'\n✅ 'iPhone 15 Pro - £800'\n\n📅 SET DEADLINE:\n'By June 1st, 2025'\n\n💪 You can do this!",
        emoji: "🎯",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "The Savings Math Made Easy",
        content: "Break it DOWN!\n\n📊 EXAMPLE: £600 Laptop in 6 months\n\n💰 MONTHLY:\n£600 ÷ 6 = £100/month\n\n📅 WEEKLY:\n£100 ÷ 4 = £25/week\n\n☀️ DAILY:\n£25 ÷ 7 = £3.57/day\n\n🎯 WHERE TO FIND £25/WEEK:\n• Part-time job: £40 → Save £25\n• Pack lunch: Save £15\n• Walk vs bus: Save £5\n• Skip takeaway coffee: Save £5\n\n✅ TOTAL: £25/week = £600 in 6 months!\n\n💡 Small amounts add up FAST!",
        emoji: "🧮",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "Pay Yourself FIRST",
        content: "The #1 savings secret!\n\n❌ OLD WAY (Fails):\n1. Get paid £100\n2. Spend on stuff\n3. Save what's left = £0\n\n✅ NEW WAY (Works!):\n1. Get paid £100\n2. IMMEDIATELY save £25\n3. Spend remaining £75\n\n🤖 AUTOMATE IT:\nSet up standing order\n£25 moves to savings automatically\nYou never see it = don't miss it!\n\n📈 AFTER 6 MONTHS:\nAutomatic £25/week = £600 saved!\nYou barely noticed!\n\n💡 This is how rich people save!",
        emoji: "💰",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Tracking & Celebrating Progress",
        content: "Make saving FUN!\n\n📊 TRACK PROGRESS:\n• Banking app goal tracker\n• Color in thermometer chart\n• Mark calendar daily\n• Spreadsheet\n\n🎉 CELEBRATE MILESTONES:\n\n25% (£150):\nMovie night! 🎬\n\n50% (£300):\nHalfway party! 🎉\nFavorite meal\n\n75% (£450):\nAlmost there!\nDay with friends\n\n100% (£600):\nBUY IT! 🎁\nCelebrate BIG\nSet new goal\n\n💡 Celebrating keeps you motivated!",
        emoji: "📈",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Dealing with Temptation",
        content: "When you want to spend your savings:\n\n🤔 THE COMPARISON TRICK:\n'Do I want THIS now, or my [GOAL] more?'\n\nExample:\n£50 game NOW\nvs.\n£600 laptop SOON\n\n🎯 Usually the GOAL wins!\n\n⏰ 24-HOUR RULE:\n1. Want to raid savings?\n2. Wait 24 hours\n3. Still want to?\n4. Wait another 24 hours\n5. Urge usually passes!\n\n✅ OK TO USE FOR:\n• Real emergency\n• Safety issue\n\n❌ NOT OK FOR:\n• 'Everyone's going!'\n• 'Just this once'\n• Impulse wants\n\n💪 Stay strong!",
        emoji: "💪",
        points: 5
      }
    ],
    points: 300,
    difficultyLevel: "beginner",
    timeEstimate: 20,
    prerequisites: ["Smart Spending: Wants vs Needs"],
    isActive: true,
    createdBy: "system"
  },
  {
    title: "Subscriptions & Recurring Payments: Take Control!",
    description: "Stop wasting money on forgotten subscriptions! Learn to manage Netflix, Spotify, and all your monthly payments like a boss.",
    topic: "Money Management",
    lessonContent: `
# Subscriptions & Recurring Payments: Take Control!

Netflix. Spotify. Gaming passes. Before you know it, you're spending £100/month on subscriptions you barely use! Let's fix that.

## What Are Subscriptions?

Subscriptions are services you pay for regularly (usually monthly or yearly).

### Common Teen Subscriptions:

**Entertainment:**
- Netflix: £10.99/month
- Spotify: £10.99/month (free version available!)
- YouTube Premium: £11.99/month
- Disney+: £7.99/month
- Apple Music: £10.99/month

**Gaming:**
- PlayStation Plus: £6.99/month
- Xbox Game Pass: £10.99/month
- Nintendo Switch Online: £3.49/month
- Fortnite Battle Pass: £7.99/season

**Apps & Services:**
- iCloud storage: £0.99-£8.99/month
- VPN services: £5-10/month
- Cloud gaming: £8.99/month
- Language apps: £6.99/month

**Add it all up:**
Just 5 subscriptions = £50-70/month = £600-840/year! 😱

## The Subscription Trap

### How Companies Hook You:

**1. Free Trials**
"Try free for 7 days!"
→ You forget to cancel
→ Charged automatically

**2. Low Monthly Prices**
"Only £9.99/month!"
→ Seems cheap
→ Adds up to £120/year!

**3. Auto-Renewal**
Automatically charges your card
→ You forget you have it
→ Keep paying even if not using

**4. Hard to Cancel**
Easy to sign up (1 click)
→ Hard to cancel (10 steps, buried in settings)
→ You give up and keep paying

### The Real Cost:

**Example:**
- Netflix: £11/month × 12 = £132/year
- Spotify: £11/month × 12 = £132/year
- Game Pass: £11/month × 12 = £132/year
- YouTube Premium: £12/month × 12 = £144/year

**Total: £44/month = £528/year!**

That's enough for a new phone or laptop! 📱💻

## Audit Your Subscriptions

### Step 1: Find ALL Your Subscriptions

**Check:**
- Bank statements (last 3 months)
- Email (search "subscription", "membership", "trial")
- Card statements
- App Store / Google Play subscriptions
- Phone bill (added services?)

**Make a list:**
- Service name
- Cost per month
- When it renews
- How often you use it

### Step 2: Calculate Total Cost

Add up EVERYTHING:
£___ per month = £___ per year

Shocking, right? 💰

### Step 3: Rate Each One

For EACH subscription, ask:

✅ **Do I use it weekly?**
Keep it!

⚠️ **Do I use it monthly?**
Questionable - could you live without it?

❌ **Haven't used it in 3+ months?**
CANCEL IT NOW!

## The Subscription Decision Framework

### KEEP if:
✅ Use it 3+ times per week
✅ Genuinely improves your life
✅ Cheaper than alternatives
✅ Can afford it comfortably

**Example:** Spotify if you listen to music daily

### MAYBE KEEP if:
⚠️ Use it 1-2 times per week
⚠️ Could use free alternative
⚠️ Share with family (split cost)
⚠️ Seasonal use

**Example:** Netflix (could share with family)

### CANCEL if:
❌ Haven't used in 2+ months
❌ Forgot you had it
❌ Free alternative exists
❌ Only used for one thing that's finished

**Example:** Disney+ after watching one show

## Smart Subscription Strategies

### Strategy 1: The Rotation Method

Don't have ALL services at once!

**Month 1-3:** Netflix
Watch everything you want

**Month 4-6:** Disney+
Catch up on new shows

**Month 7-9:** Back to Netflix
New content has arrived!

**Savings:** Instead of £33/month for all three, pay £11/month for one!

### Strategy 2: Use Free Versions

Many services have free tiers:

**Free Alternatives:**
- Spotify Free (with ads) vs Premium
- YouTube (with ads) vs Premium
- BBC iPlayer (free!) vs Netflix
- Twitch (free) vs paid streaming

**Savings:** £10-30/month!

### Strategy 3: Family Sharing

Split the cost!

**Examples:**
- Netflix: £15.99/month ÷ 4 people = £4/person
- Spotify Family: £16.99/month ÷ 6 people = £2.83/person
- YouTube Family: £17.99/month ÷ 6 people = £3/person

**Savings:** 50-75% off!

### Strategy 4: Annual Billing (If You're Sure)

Pay yearly for discount:

**Monthly vs Annual:**
- £10/month = £120/year
- £100/year (save £20!)

**BUT ONLY IF:**
- You're 100% sure you'll use it
- You can afford upfront cost
- Service has been around awhile

### Strategy 5: Student Discounts

If you're in school/uni, get discounts!

**Student Deals:**
- Spotify + Hulu: £5.99/month (instead of £20+)
- Apple Music: £5.99/month (50% off)
- Amazon Prime Student: £4.49/month (50% off)
- YouTube Premium Student: £6.99/month

**How to Get Them:**
- Student Beans website
- UNiDAYS app
- Show student ID
- Use school email

## How to Cancel Subscriptions

### iPhone/iPad:

1. Settings → Your Name
2. Subscriptions
3. Select subscription
4. Cancel Subscription
5. Confirm

### Android:

1. Google Play Store
2. Menu → Subscriptions
3. Select subscription
4. Cancel Subscription
5. Confirm

### Websites:

Each site is different, but usually:
1. Account Settings
2. Billing or Subscriptions
3. Manage/Cancel
4. Confirm (might ask why - just click through)

**Pro Tip:** Google "[service name] cancel subscription" for exact steps!

## Preventing Future Subscription Traps

### Rule 1: Calendar Reminders

**For Free Trials:**
- Set reminder 2 days before trial ends
- Cancel if you don't want to continue
- You can usually still use until trial expires

### Rule 2: Use Virtual Cards

Some banking apps let you create temporary card numbers!

**Benefits:**
- Set spending limit
- Auto-decline after first charge
- Can't be charged repeatedly

**Best For:** Free trials you might forget!

### Rule 3: Monthly Review

**First Sunday of Month:**
- Review ALL subscriptions
- Check what you actually used
- Cancel what you didn't
- Calculate total spending

**Takes 10 minutes, saves hundreds!**

### Rule 4: "One In, One Out" Rule

Want new subscription?
Must cancel an old one first!

**Example:**
Want YouTube Premium?
Cancel Spotify or Netflix first!

**Keeps total spending stable!**

## Real Teen Examples

### Before Audit:

**Jake, 16:**
- Netflix: £11/month
- Spotify: £11/month
- Game Pass: £11/month
- PS Plus: £7/month
- VPN: £6/month
- YouTube Premium: £12/month

**Total: £58/month = £696/year!**

### After Audit:

**What Jake Did:**
- Kept Game Pass (uses daily)
- Switched to Spotify Free (ads okay)
- Cancelled Netflix (uses Disney+ with family instead)
- Cancelled PS Plus (not playing online)
- Cancelled VPN (wasn't using)
- Cancelled YouTube (uses with ads fine)

**New Total: £11/month = £132/year**

**Savings: £564/year!** 
(Enough for new console! 🎮)

## The Subscription Tracker

### Create Your Own:

**Spreadsheet or Notes:**

| Service | Cost/Month | Used This Month? | Keep/Cancel |
|---------|-----------|------------------|-------------|
| Netflix | £11 | Yes (10 times) | KEEP |
| Spotify | £11 | No | CANCEL → Use Free |
| Game Pass | £11 | Yes (daily) | KEEP |
| PS Plus | £7 | No | CANCEL |

**Monthly Action:**
- Update "Used This Month"
- Cancel anything unused
- Calculate new total

## Warning Signs

**You're in trouble if:**

🚩 You don't know all your subscriptions
🚩 Surprised by charges on statement
🚩 Haven't used service in 2+ months
🚩 Subscriptions = 20%+ of income
🚩 Can't afford to cancel (need the money)

**Solution:** Audit NOW and cancel ruthlessly!

## The Challenge: 30-Day Subscription Detox

**Week 1:** Find and list ALL subscriptions
**Week 2:** Calculate total cost (prepare to be shocked!)
**Week 3:** Cancel everything you haven't used in 2 months
**Week 4:** Try living without for a month

**Result:** Most people realize they don't miss them!

**Typical Savings:** £30-50/month = £360-600/year!

## Your Action Plan

**TODAY:**

1. ✅ Check bank/card statements
2. ✅ List ALL subscriptions
3. ✅ Calculate monthly total
4. ✅ Be horrified at the number! 😱

**THIS WEEK:**

1. ✅ Cancel anything unused in 3+ months
2. ✅ Set calendar reminders for trials
3. ✅ Look for free alternatives
4. ✅ Ask family about sharing plans

**THIS MONTH:**

1. ✅ Track usage of remaining subscriptions
2. ✅ Apply for student discounts
3. ✅ Set up monthly review routine
4. ✅ Put savings toward a goal!

## Remember:

💰 **Every £10/month subscription = £120/year**
🔄 **Review monthly or waste money**
📱 **Free versions exist for almost everything**
👨‍👩‍👧‍👦 **Family plans = massive savings**
🎯 **Cancel ruthlessly - you can always resubscribe**

**The goal isn't zero subscriptions - it's INTENTIONAL subscriptions you actually use and value!**

Take control of your subscriptions today! 💪
    `,
    activityType: "quiz",
    activityData: {
      questions: [
        {
          id: "q1",
          question: "You have Netflix (£11), Spotify (£11), and Game Pass (£11). How much are you spending per year on just these three?",
          options: [
            "£33 per year",
            "£132 per year",
            "£264 per year",
            "£396 per year"
          ],
          correctAnswer: 3,
          explanation: "£11 × 3 = £33/month. £33 × 12 months = £396/year! That's almost enough for a new phone! Small monthly costs add up FAST over a year.",
          points: 100
        },
        {
          id: "q2",
          question: "You signed up for a 'free 7-day trial' but forgot to cancel. What happens?",
          options: [
            "Nothing, trials are always free",
            "They email you first before charging",
            "You get automatically charged the full monthly price",
            "You get one more warning"
          ],
          correctAnswer: 2,
          explanation: "After the trial ends, you automatically get charged the full price! Always set a calendar reminder 2 days before trial ends to cancel if you don't want to continue.",
          points: 100
        },
        {
          id: "q3",
          question: "What's the best strategy if you want both Netflix and Disney+ but can't afford both?",
          options: [
            "Get both and go into debt",
            "Give up watching everything",
            "Use the rotation method - alternate months with each service",
            "Pirate the content illegally"
          ],
          correctAnswer: 2,
          explanation: "The rotation method! Subscribe to Netflix for 3 months, watch everything, cancel. Then subscribe to Disney+ for 3 months. You save 50% and still get to watch everything!",
          points: 100
        },
        {
          id: "q4",
          question: "You haven't used a subscription in 3 months but might use it someday. What should you do?",
          options: [
            "Keep it just in case",
            "Cancel it now - you can always resubscribe later if needed",
            "Reduce to a cheaper plan",
            "Share it with friends"
          ],
          correctAnswer: 1,
          explanation: "CANCEL IT! If you haven't used it in 3 months, you won't miss it. You can always resubscribe later if you actually need it. Stop wasting money on 'maybes'!",
          points: 100
        },
        {
          id: "q5",
          question: "What's a smart way to save money on Spotify?",
          options: [
            "Use Spotify Free with ads instead of Premium",
            "Get Spotify Family plan and split with friends/family",
            "Use student discount if eligible",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "All three work! Spotify Free is completely free with ads. Family plans (£16.99 for 6 people = £2.83 each) split costs. Student discount is £5.99/month. Choose what works for you!",
          points: 100
        }
      ]
    },
    learningSteps: [
      {
        id: "step1",
        type: "explanation",
        title: "The Shocking Truth About Subscriptions",
        content: "💰 REALITY CHECK:\n\nJust 5 common subscriptions:\n• Netflix: £11/month\n• Spotify: £11/month\n• Game Pass: £11/month\n• PS Plus: £7/month\n• YouTube: £12/month\n\n📊 TOTAL:\n£52/month = £624/YEAR! 😱\n\n🎯 THAT COULD BUY:\n• New iPhone\n• Gaming console + games\n• Driving lessons\n• Holiday with friends\n\n💡 Small monthly costs = HUGE yearly spending!\n\nTime to take control!",
        emoji: "💸",
        points: 10
      },
      {
        id: "step2",
        type: "explanation",
        title: "How Companies Trap You",
        content: "🪤 THE 4 TRAPS:\n\n1️⃣ FREE TRIALS:\n'Try free for 7 days!'\n→ You forget to cancel\n→ Auto-charged!\n\n2️⃣ 'ONLY' £9.99/month:\nSeems cheap\n→ £120/year!\n→ Not so cheap!\n\n3️⃣ AUTO-RENEWAL:\nQuietly charges card\n→ You forget you have it\n→ Keep paying forever\n\n4️⃣ HARD TO CANCEL:\nSign up: 1 click ✅\nCancel: 10 steps, hidden settings ❌\n\n🎯 SOLUTION: Set calendar reminders, review monthly, cancel ruthlessly!",
        emoji: "🪤",
        points: 15
      },
      {
        id: "step3",
        type: "explanation",
        title: "The Subscription Audit",
        content: "🔍 FIND THEM ALL:\n\n✅ Check bank statements (last 3 months)\n✅ Search email for 'subscription'\n✅ App Store / Google Play subscriptions\n✅ Ask yourself: What do I pay monthly?\n\n📝 LIST EVERYTHING:\n• Service name\n• Cost/month\n• When used last\n\n💰 CALCULATE TOTAL:\nPrepare to be SHOCKED!\n\n🎯 DECISION TIME:\n✅ Used weekly? KEEP\n⚠️ Used monthly? MAYBE\n❌ Not used 3+ months? CANCEL NOW!\n\n💡 Most people cancel 50-70% of subscriptions after an audit!",
        emoji: "🔍",
        points: 10
      },
      {
        id: "step4",
        type: "explanation",
        title: "Smart Strategies to Save £££",
        content: "💡 STRATEGY #1: ROTATION\nDon't have ALL services!\nMonth 1-3: Netflix\nMonth 4-6: Disney+\nSave 50-70%!\n\n💡 STRATEGY #2: FREE VERSIONS\nSpotify Free vs Premium\nYouTube vs YouTube Premium\nSave £10-30/month!\n\n💡 STRATEGY #3: FAMILY SHARING\nNetflix: £16 ÷ 4 = £4 each\nSpotify Family: £17 ÷ 6 = £2.83 each\nSave 50-75%!\n\n💡 STRATEGY #4: STUDENT DISCOUNTS\nSpotify: £5.99 (50% off)\nApple Music: £5.99 (50% off)\nCheck Student Beans!\n\n🎯 PICK ONE and start saving TODAY!",
        emoji: "💡",
        points: 10
      },
      {
        id: "step5",
        type: "explanation",
        title: "Monthly Review Routine",
        content: "🗓️ FIRST SUNDAY EACH MONTH:\n\n1️⃣ CHECK STATEMENTS:\nWhat subscriptions charged?\n\n2️⃣ ASK YOURSELF:\nDid I use it this month?\n\n3️⃣ CANCEL RUTHLESSLY:\nNot used = CANCEL\n\n4️⃣ CALCULATE SAVINGS:\nHow much did you save?\n\n5️⃣ PUT SAVINGS TO WORK:\nToward a goal!\n\n⏰ TAKES: 10 minutes\n💰 SAVES: £30-50/month = £360-600/year!\n\n💡 SET PHONE REMINDER RIGHT NOW for first Sunday next month!",
        emoji: "📅",
        points: 5
      }
    ],
    points: 350,
    difficultyLevel: "beginner",
    timeEstimate: 20,
    prerequisites: [],
    isActive: true,
    createdBy: "system"
  }
];

async function seedModules() {
  try {
    console.log('🌱 Starting to seed learning modules...');

    // Connect to MongoDB using the URI from .env or fallback to local
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/valuto'); // Use MONGO_URI from .env if available
    console.log('✅ Connected to MongoDB');

    // Clear existing modules (optional - comment out if you want to keep existing)
    await LearningModule.deleteMany({});
    console.log('🗑️  Cleared existing modules');

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
