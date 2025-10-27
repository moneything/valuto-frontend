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
