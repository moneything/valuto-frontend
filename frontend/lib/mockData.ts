// Mock data for development

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  timeLimit: number;
}

export interface TriviaGame {
  id: string;
  code: string;
  title: string;
  createdBy: string;
  questions: TriviaQuestion[];
  status: 'active' | 'ended';
  participants: number;
}

export interface LearningQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningLesson {
  id: string;
  title: string;
  content: string;
  quiz: LearningQuiz;
}

export interface LearningContent {
  introduction: string;
  lessons: LearningLesson[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  completed: boolean;
  content?: LearningContent;
}

// Sample trivia games
export const mockTriviaGames: TriviaGame[] = [
  {
    id: '1',
    code: 'ABC123',
    title: 'Introduction to Investing',
    createdBy: 'Mr. Smith',
    questions: [
      {
        id: 'q1',
        question: 'What is a stock?',
        options: [
          'A loan to a company',
          'Ownership in a company',
          'A type of bond',
          'A savings account'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q2',
        question: 'What does ROI stand for?',
        options: [
          'Rate of Investment',
          'Return on Investment',
          'Risk of Investment',
          'Record of Income'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      }
    ],
    status: 'active',
    participants: 12
  },
  {
    id: '2',
    code: 'XYZ789',
    title: 'Understanding Budgets',
    createdBy: 'Ms. Johnson',
    questions: [
      {
        id: 'q1',
        question: 'What is the 50/30/20 rule?',
        options: [
          '50% needs, 30% wants, 20% savings',
          '50% savings, 30% needs, 20% wants',
          '50% wants, 30% savings, 20% needs',
          '50% taxes, 30% bills, 20% fun'
        ],
        correctAnswer: 0,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q2',
        question: 'What should you do first when creating a budget?',
        options: [
          'Set up automatic payments',
          'Track your income and expenses',
          'Open a savings account',
          'Cut all entertainment spending'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q3',
        question: 'What is an emergency fund for?',
        options: [
          'Vacation money',
          'Unexpected expenses like car repairs',
          'Investment money',
          'Gift money'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      }
    ],
    status: 'active',
    participants: 8
  },
  {
    id: '3',
    code: 'CRYPTO101',
    title: 'Cryptocurrency Quiz',
    createdBy: 'Mr. Digital',
    questions: [
      {
        id: 'q1',
        question: 'What was the first cryptocurrency?',
        options: [
          'Ethereum',
          'Bitcoin',
          'Litecoin',
          'Dogecoin'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q2',
        question: 'What is blockchain?',
        options: [
          'A type of cryptocurrency',
          'A digital ledger technology',
          'A bank account',
          'A type of investment'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q3',
        question: 'What percentage of your portfolio should be in crypto?',
        options: [
          '50% or more',
          '10% or less',
          '100%',
          'It doesn\'t matter'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      }
    ],
    status: 'active',
    participants: 15
  },
  {
    id: '4',
    code: 'STOCKS2024',
    title: 'Stock Market Basics',
    createdBy: 'Prof. Market',
    questions: [
      {
        id: 'q1',
        question: 'What does "buy low, sell high" mean?',
        options: [
          'Always buy the cheapest stocks',
          'Buy stocks when prices are low, sell when high',
          'Only buy stocks on sale',
          'Buy stocks and never sell them'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q2',
        question: 'What is diversification?',
        options: [
          'Buying only one stock',
          'Spreading investments across different assets',
          'Buying the most expensive stocks',
          'Selling all your investments'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      },
      {
        id: 'q3',
        question: 'What is a dividend?',
        options: [
          'A type of stock',
          'A payment companies make to shareholders',
          'A tax on investments',
          'A fee for buying stocks'
        ],
        correctAnswer: 1,
        points: 100,
        timeLimit: 30
      }
    ],
    status: 'active',
    participants: 22
  }
];

// Sample learning modules with detailed content
export const mockLearningModules: LearningModule[] = [
  {
    id: 'stocks-shares',
    title: 'Stocks & Shares',
    description: 'Learn the basics of stock market investing',
    icon: '📈',
    difficulty: 'beginner',
    duration: '15 min',
    completed: false,
    content: {
      introduction: 'Welcome to the world of stocks and shares! In this module, you\'ll learn how to buy and sell shares, understand company valuations, and make informed investment decisions.',
      lessons: [
        {
          id: 'what-are-stocks',
          title: 'What are Stocks?',
          content: 'Stocks represent ownership in a company. When you buy a share, you become a partial owner of that business. The more shares you own, the larger your ownership stake.',
          quiz: {
            question: 'What does owning a stock mean?',
            options: [
              'You lend money to the company',
              'You become a partial owner of the company',
              'You guarantee the company\'s profits',
              'You work for the company'
            ],
            correctAnswer: 1,
            explanation: 'Correct! When you buy a stock, you become a partial owner of that company. This means you have a claim on the company\'s assets and earnings.'
          }
        },
        {
          id: 'stock-market-basics',
          title: 'Stock Market Basics',
          content: 'The stock market is like a giant marketplace where people buy and sell pieces of companies. It\'s where supply meets demand, and prices are determined by how much people are willing to pay.',
          quiz: {
            question: 'If you see a stock price go from $10 to $15, what happened?',
            options: [
              'The company got 50% bigger',
              'More people wanted to buy than sell',
              'The CEO got a raise',
              'The company moved to a new building'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! When more people want to buy a stock than sell it, the price goes up. It\'s all about supply and demand!'
          }
        },
        {
          id: 'famous-investors',
          title: 'Famous Investors & Their Strategies',
          content: 'Warren Buffett, known as the "Oracle of Omaha," made billions by buying undervalued companies and holding them long-term. His strategy: "Be fearful when others are greedy, and greedy when others are fearful."',
          quiz: {
            question: 'What is Warren Buffett\'s famous investment strategy?',
            options: [
              'Buy high, sell low',
              'Buy undervalued companies and hold long-term',
              'Only invest in tech stocks',
              'Sell everything when the market drops'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Buffett\'s strategy is to find undervalued companies with strong fundamentals and hold them for the long term. Patience pays!'
          }
        },
        {
          id: 'how-stocks-work',
          title: 'How Stocks Work',
          content: 'Stock prices change based on supply and demand. When more people want to buy a stock than sell it, the price goes up. When more people want to sell than buy, the price goes down.',
          quiz: {
            question: 'What primarily determines stock prices?',
            options: [
              'The company\'s CEO salary',
              'Supply and demand in the market',
              'The weather',
              'Government regulations only'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! Stock prices are primarily determined by supply and demand. When demand exceeds supply, prices rise, and when supply exceeds demand, prices fall.'
          }
        },
        {
          id: 'types-of-stocks',
          title: 'Types of Stocks',
          content: 'There are two main types of stocks: common stocks and preferred stocks. Common stocks give you voting rights but variable dividends. Preferred stocks give you fixed dividends but usually no voting rights.',
          quiz: {
            question: 'What is the main difference between common and preferred stocks?',
            options: [
              'Common stocks are more expensive',
              'Common stocks give voting rights, preferred stocks give fixed dividends',
              'Preferred stocks are always safer',
              'There is no difference'
            ],
            correctAnswer: 1,
            explanation: 'Great! Common stocks typically give you voting rights in company decisions, while preferred stocks usually provide fixed dividends but limited or no voting rights.'
          }
        }
      ]
    }
  },
  {
    id: 'bonds-fixed-income',
    title: 'Bonds & Fixed Income',
    description: 'Understanding bonds and how they work',
    icon: '📊',
    difficulty: 'beginner',
    duration: '12 min',
    completed: false,
    content: {
      introduction: 'Bonds are like loans you give to companies or governments. In return, they promise to pay you back with interest. They\'re generally considered safer than stocks.',
      lessons: [
        {
          id: 'what-are-bonds',
          title: 'What are Bonds?',
          content: 'A bond is essentially an IOU. When you buy a bond, you\'re lending money to the issuer (company or government) for a fixed period. They promise to pay you back with interest.',
          quiz: {
            question: 'What is a bond?',
            options: [
              'A type of stock',
              'A loan you give to a company or government',
              'A savings account',
              'A type of insurance'
            ],
            correctAnswer: 1,
            explanation: 'Correct! A bond is a loan you give to a company or government. They promise to pay you back with interest over a fixed period.'
          }
        },
        {
          id: 'bond-risks',
          title: 'Bond Risks',
          content: 'While bonds are generally safer than stocks, they still have risks. The main risks are credit risk (issuer might not pay) and interest rate risk (bond values fall when rates rise).',
          quiz: {
            question: 'What is the main risk with bonds?',
            options: [
              'They always lose money',
              'Credit risk and interest rate risk',
              'They are too safe',
              'They don\'t pay interest'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! The main risks with bonds are credit risk (the issuer might not pay you back) and interest rate risk (bond values fall when interest rates rise).'
          }
        },
        {
          id: 'bond-types',
          title: 'Types of Bonds',
          content: 'There are many types of bonds! Government bonds (like US Treasuries) are super safe but pay less. Corporate bonds pay more but have more risk. Municipal bonds offer tax benefits.',
          quiz: {
            question: 'Which type of bond is generally the safest?',
            options: [
              'Corporate bonds from Apple',
              'Government bonds (Treasuries)',
              'Municipal bonds',
              'Junk bonds'
            ],
            correctAnswer: 1,
            explanation: 'Government bonds (like US Treasuries) are considered the safest because they\'re backed by the full faith and credit of the government!'
          }
        },
        {
          id: 'bond-yields',
          title: 'Understanding Bond Yields',
          content: 'Bond yield is like the "interest rate" you earn. If you buy a $1000 bond that pays $50 per year, your yield is 5%. Higher yields usually mean higher risk!',
          quiz: {
            question: 'If a $1000 bond pays you $30 per year, what\'s the yield?',
            options: [
              '3%',
              '30%',
              '$30',
              'It depends on the bond price'
            ],
            correctAnswer: 0,
            explanation: 'Correct! $30 ÷ $1000 = 0.03 = 3%. The yield is the annual payment divided by the bond\'s face value!'
          }
        }
      ]
    }
  },
  {
    id: 'etfs-index-funds',
    title: 'ETFs & Index Funds',
    description: 'Diversified investing made simple',
    icon: '📋',
    difficulty: 'intermediate',
    duration: '18 min',
    completed: true,
    content: {
      introduction: 'ETFs and index funds make it easy to invest in many companies at once. They\'re like buying a basket of stocks instead of individual shares.',
      lessons: [
        {
          id: 'what-are-etfs',
          title: 'What are ETFs?',
          content: 'ETFs (Exchange-Traded Funds) are investment funds that trade on stock exchanges. They hold a collection of assets like stocks, bonds, or commodities.',
          quiz: {
            question: 'What does ETF stand for?',
            options: [
              'Electronic Trading Fund',
              'Exchange-Traded Fund',
              'Easy Trading Fund',
              'Equity Trading Fund'
            ],
            correctAnswer: 1,
            explanation: 'Correct! ETF stands for Exchange-Traded Fund. These funds trade on stock exchanges and hold a collection of assets.'
          }
        },
        {
          id: 'etf-vs-mutual-funds',
          title: 'ETFs vs Mutual Funds',
          content: 'ETFs trade like stocks throughout the day, while mutual funds only trade once at the end of the day. ETFs usually have lower fees and are more tax-efficient!',
          quiz: {
            question: 'What\'s the main advantage of ETFs over mutual funds?',
            options: [
              'They only trade once per day',
              'Lower fees and more tax-efficient',
              'They require more money to start',
              'They are riskier'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! ETFs typically have lower expense ratios and are more tax-efficient because of how they\'re structured. Plus, you can trade them anytime!'
          }
        },
        {
          id: 'popular-etfs',
          title: 'Popular ETFs You Should Know',
          content: 'SPY tracks the S&P 500 (500 biggest US companies), QQQ follows the NASDAQ (tech-heavy), and VTI covers the entire US stock market. These are great for beginners!',
          quiz: {
            question: 'Which ETF tracks the S&P 500?',
            options: [
              'QQQ',
              'VTI',
              'SPY',
              'ARKK'
            ],
            correctAnswer: 2,
            explanation: 'Correct! SPY (SPDR S&P 500 ETF) tracks the S&P 500 index, which includes 500 of the largest US companies. It\'s one of the most popular ETFs!'
          }
        }
      ]
    }
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'How to protect your investments',
    icon: '🛡️',
    difficulty: 'intermediate',
    duration: '20 min',
    completed: false,
    content: {
      introduction: 'Risk management is about protecting your investments from potential losses. The key is diversification - don\'t put all your eggs in one basket.',
      lessons: [
        {
          id: 'diversification',
          title: 'Diversification',
          content: 'Diversification means spreading your investments across different assets, sectors, and geographic regions. This reduces risk because if one investment fails, others may still succeed.',
          quiz: {
            question: 'What is the main benefit of diversification?',
            options: [
              'It guarantees higher returns',
              'It reduces risk by spreading investments',
              'It makes investing easier',
              'It eliminates all risk'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! Diversification reduces risk by spreading your investments across different assets, sectors, and regions. If one investment fails, others may still succeed.'
          }
        },
        {
          id: 'risk-tolerance',
          title: 'Understanding Your Risk Tolerance',
          content: 'Risk tolerance is how much risk you can handle emotionally and financially. Young people can usually take more risk because they have time to recover. Older people often prefer safer investments.',
          quiz: {
            question: 'A 25-year-old should generally have what type of portfolio?',
            options: [
              '100% bonds (very safe)',
              'Mostly stocks with some bonds',
              'Only cash savings',
              'All cryptocurrency'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Young people can afford to take more risk because they have decades to recover from market downturns. A mix of stocks and bonds is usually appropriate!'
          }
        },
        {
          id: 'emergency-fund',
          title: 'The Emergency Fund Rule',
          content: 'Before investing, build an emergency fund with 3-6 months of expenses in a savings account. This prevents you from having to sell investments during emergencies when prices might be low.',
          quiz: {
            question: 'How much should you keep in your emergency fund?',
            options: [
              '1 month of expenses',
              '3-6 months of expenses',
              '1 year of expenses',
              'All your money'
            ],
            correctAnswer: 1,
            explanation: 'Perfect! 3-6 months of expenses in an emergency fund gives you a safety net without keeping too much money out of investments that could grow over time.'
          }
        }
      ]
    }
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    description: 'The power of time and money',
    icon: '⏰',
    difficulty: 'beginner',
    duration: '10 min',
    completed: true,
    content: {
      introduction: 'Compound interest is often called the "eighth wonder of the world." It\'s when you earn interest on your interest, creating exponential growth over time.',
      lessons: [
        {
          id: 'how-compound-works',
          title: 'How Compound Interest Works',
          content: 'Compound interest means earning interest on both your original investment and any previously earned interest. The longer you invest, the more powerful it becomes.',
          quiz: {
            question: 'What is compound interest?',
            options: [
              'Interest on your original investment only',
              'Interest earned on interest',
              'A type of loan',
              'A government program'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Compound interest is earning interest on your interest. This creates exponential growth over time, making it incredibly powerful for long-term investing.'
          }
        },
        {
          id: 'time-value-of-money',
          title: 'The Time Value of Money',
          content: 'Time is money! If you invest $1000 at 7% annually, in 10 years you\'ll have $1,967. In 20 years, you\'ll have $3,870. In 30 years, you\'ll have $7,612! Time is your best friend in investing.',
          quiz: {
            question: 'If you invest $1000 at 7% for 30 years, approximately how much will you have?',
            options: [
              '$2,100',
              '$3,100',
              '$7,600',
              '$10,000'
            ],
            correctAnswer: 2,
            explanation: 'Amazing! $1000 at 7% for 30 years becomes about $7,600. That\'s the power of compound interest over time!'
          }
        },
        {
          id: 'start-early',
          title: 'Why Starting Early Matters',
          content: 'Starting early is HUGE! If you invest $200/month starting at age 25, you\'ll have $1.2 million by age 65. If you wait until 35, you\'ll only have $600,000. That 10-year delay costs you $600,000!',
          quiz: {
            question: 'If you start investing at 25 vs 35, how much more could you have by 65?',
            options: [
              'About the same amount',
              'About 50% more',
              'About double the amount',
              'It doesn\'t matter when you start'
            ],
            correctAnswer: 2,
            explanation: 'Correct! Starting 10 years earlier can roughly double your final amount due to compound interest. Time is the most powerful factor in investing!'
          }
        }
      ]
    }
  },
  {
    id: 'portfolio-diversification',
    title: 'Portfolio Diversification',
    description: 'Spreading risk across investments',
    icon: '🎯',
    difficulty: 'advanced',
    duration: '25 min',
    completed: false,
    content: {
      introduction: 'Portfolio diversification is the practice of spreading your investments across different asset classes to reduce overall risk while maintaining potential for returns.',
      lessons: [
        {
          id: 'asset-allocation',
          title: 'Asset Allocation',
          content: 'Asset allocation is the process of dividing your investment portfolio among different asset categories, such as stocks, bonds, and cash equivalents.',
          quiz: {
            question: 'What is asset allocation?',
            options: [
              'Buying only one type of investment',
              'Dividing your portfolio among different asset categories',
              'Selling all your investments',
              'A type of insurance'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! Asset allocation is dividing your investment portfolio among different asset categories like stocks, bonds, and cash equivalents to balance risk and return.'
          }
        },
        {
          id: 'rebalancing',
          title: 'Portfolio Rebalancing',
          content: 'Rebalancing means adjusting your portfolio back to your target allocation. If stocks do well and grow to 80% of your portfolio (when you wanted 70%), you sell some stocks and buy bonds to get back to 70/30.',
          quiz: {
            question: 'When should you rebalance your portfolio?',
            options: [
              'Never, set it and forget it',
              'When your allocation drifts from your target',
              'Only when you lose money',
              'Every single day'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Rebalance when your actual allocation drifts significantly from your target. This keeps your risk level where you want it!'
          }
        },
        {
          id: 'age-based-allocation',
          title: 'The "100 Minus Age" Rule',
          content: 'A simple rule: subtract your age from 100 to get your stock percentage. A 25-year-old should have 75% stocks, 25% bonds. A 60-year-old should have 40% stocks, 60% bonds. Adjust based on your risk tolerance!',
          quiz: {
            question: 'According to the "100 minus age" rule, how much should a 30-year-old have in stocks?',
            options: [
              '30%',
              '70%',
              '100%',
              '50%'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! 100 - 30 = 70% in stocks. This rule helps younger people take more risk (more stocks) and older people be more conservative (more bonds).'
          }
        }
      ]
    }
  },
  {
    id: 'cryptocurrency-basics',
    title: 'Cryptocurrency Basics',
    description: 'Understanding digital money and blockchain technology',
    icon: '₿',
    difficulty: 'intermediate',
    duration: '20 min',
    completed: false,
    content: {
      introduction: 'Cryptocurrency is digital money that uses cryptography for security. Bitcoin was the first, but there are now thousands of cryptocurrencies. It\'s exciting but also very risky!',
      lessons: [
        {
          id: 'what-is-crypto',
          title: 'What is Cryptocurrency?',
          content: 'Cryptocurrency is digital money that exists only online. Unlike dollars in your bank account, crypto isn\'t controlled by any government or bank. It uses blockchain technology to keep track of transactions.',
          quiz: {
            question: 'What makes cryptocurrency different from regular money?',
            options: [
              'It\'s only used online',
              'It\'s not controlled by governments or banks',
              'It\'s always worth more',
              'It can only be used for illegal activities'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Cryptocurrency is decentralized, meaning no single authority controls it. This is both its biggest advantage and biggest risk!'
          }
        },
        {
          id: 'blockchain-technology',
          title: 'How Blockchain Works',
          content: 'Blockchain is like a digital ledger that everyone can see but no one can change. When you send Bitcoin, the transaction gets recorded in a "block" that\'s added to the "chain." It\'s transparent and secure!',
          quiz: {
            question: 'What is blockchain?',
            options: [
              'A type of cryptocurrency',
              'A digital ledger that records transactions',
              'A bank account',
              'A type of investment'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! Blockchain is the technology that makes cryptocurrency work. It\'s a transparent, secure way to record transactions without needing a central authority.'
          }
        },
        {
          id: 'crypto-risks',
          title: 'The Risks of Crypto',
          content: 'Crypto is VERY risky! Prices can swing wildly - Bitcoin has dropped 80% in a year before. It\'s also not regulated like stocks, so you have less protection. Only invest what you can afford to lose!',
          quiz: {
            question: 'What percentage of your portfolio should be in cryptocurrency?',
            options: [
              '50% or more',
              '10% or less',
              '100% - go all in!',
              'It doesn\'t matter'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Most financial experts recommend keeping crypto to 10% or less of your portfolio because it\'s so volatile and risky. Never invest more than you can afford to lose!'
          }
        }
      ]
    }
  },
  {
    id: 'real-estate-investing',
    title: 'Real Estate Investing',
    description: 'Building wealth through property investment',
    icon: '🏠',
    difficulty: 'intermediate',
    duration: '22 min',
    completed: false,
    content: {
      introduction: 'Real estate investing can be a great way to build wealth! You can buy rental properties, invest in REITs, or even flip houses. But it requires more money upfront and more work than stocks.',
      lessons: [
        {
          id: 'rental-properties',
          title: 'Rental Properties',
          content: 'Rental properties can provide steady income and tax benefits. You collect rent each month, and the property might appreciate in value. But you also have to deal with tenants, maintenance, and repairs!',
          quiz: {
            question: 'What is the main advantage of rental properties?',
            options: [
              'They never lose value',
              'Steady rental income and potential appreciation',
              'No maintenance required',
              'Guaranteed 20% returns'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Rental properties can provide steady monthly income from rent and may appreciate in value over time. But they also come with responsibilities and risks!'
          }
        },
        {
          id: 'reits',
          title: 'REITs - Real Estate Without the Hassle',
          content: 'REITs (Real Estate Investment Trusts) let you invest in real estate without buying property. They trade like stocks and pay dividends. You get real estate exposure without dealing with tenants!',
          quiz: {
            question: 'What is a REIT?',
            options: [
              'A type of house',
              'A way to invest in real estate without buying property',
              'A real estate agent',
              'A type of mortgage'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! REITs let you invest in real estate through the stock market. You get exposure to real estate without the hassle of managing properties yourself!'
          }
        },
        {
          id: 'real-estate-math',
          title: 'The 1% Rule',
          content: 'The 1% rule says monthly rent should be at least 1% of the property\'s purchase price. If a house costs $200,000, you should get at least $2,000/month in rent. This helps ensure positive cash flow!',
          quiz: {
            question: 'If a house costs $300,000, what should the monthly rent be according to the 1% rule?',
            options: [
              '$1,000',
              '$2,000',
              '$3,000',
              '$4,000'
            ],
            correctAnswer: 2,
            explanation: 'Correct! $300,000 × 1% = $3,000/month. The 1% rule helps investors quickly evaluate if a rental property will be profitable!'
          }
        }
      ]
    }
  },
  {
    id: 'retirement-planning',
    title: 'Retirement Planning',
    description: 'Building your nest egg for the future',
    icon: '🏖️',
    difficulty: 'beginner',
    duration: '18 min',
    completed: false,
    content: {
      introduction: 'Retirement planning isn\'t just for old people! The earlier you start, the easier it is. We\'ll cover 401(k)s, IRAs, and how much you need to save to retire comfortably.',
      lessons: [
        {
          id: 'retirement-accounts',
          title: '401(k) and IRA Basics',
          content: 'A 401(k) is a retirement account through your employer. They often match your contributions - that\'s free money! An IRA is an Individual Retirement Account you open yourself. Both offer tax advantages.',
          quiz: {
            question: 'What is the main advantage of a 401(k)?',
            options: [
              'You can withdraw money anytime',
              'Employer matching contributions',
              'No taxes ever',
              'Guaranteed returns'
            ],
            correctAnswer: 1,
            explanation: 'Correct! Many employers match your 401(k) contributions up to a certain percentage. If they match 3%, and you contribute 3%, you\'re getting 6% total - that\'s free money!'
          }
        },
        {
          id: 'how-much-to-save',
          title: 'How Much Do You Need to Retire?',
          content: 'The "4% rule" says you can withdraw 4% of your retirement savings each year. So if you need $40,000/year in retirement, you need $1 million saved. Start with 10-15% of your income!',
          quiz: {
            question: 'If you need $50,000 per year in retirement, how much should you have saved?',
            options: [
              '$200,000',
              '$500,000',
              '$1,250,000',
              '$2,000,000'
            ],
            correctAnswer: 2,
            explanation: 'Correct! $50,000 ÷ 0.04 = $1,250,000. The 4% rule helps you figure out how much you need to save for retirement!'
          }
        },
        {
          id: 'retirement-math',
          title: 'The Power of Starting Early',
          content: 'Starting early is HUGE for retirement! If you save $200/month starting at 25, you\'ll have $1.2 million at 65. If you wait until 45, you\'d need to save $1,000/month to get the same result!',
          quiz: {
            question: 'Why is starting retirement savings early so important?',
            options: [
              'You earn more money when you\'re young',
              'Compound interest has more time to work',
              'Retirement accounts have higher limits for young people',
              'It doesn\'t matter when you start'
            ],
            correctAnswer: 1,
            explanation: 'Exactly! Compound interest needs time to work its magic. Starting early means your money has decades to grow, making retirement much easier to achieve!'
          }
        }
      ]
    }
  }
];

