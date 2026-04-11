import { Achievement, CareerPath, Decision, LifeEvent } from "@/components/build-your-life/types";

export const CAREER_OPTIONS: {
  path: CareerPath;
  icon: string;
  title: string;
  description: string;
  salary: number;
  debt: number;
  growth: string;
}[] = [
  {
    path: "university",
    icon: "🎓",
    title: "University",
    description: "Get a degree and enter the job market with higher earning potential",
    salary: 25000,
    debt: 45000,
    growth: "High long-term",
  },
  {
    path: "apprenticeship",
    icon: "🛠",
    title: "Apprenticeship",
    description: "Earn while you learn a skilled trade with no debt",
    salary: 18000,
    debt: 0,
    growth: "Steady",
  },
  {
    path: "entry-level",
    icon: "💼",
    title: "Entry-Level Job",
    description: "Start working immediately and climb the career ladder",
    salary: 20000,
    debt: 0,
    growth: "Moderate",
  },
  {
    path: "business",
    icon: "🚀",
    title: "Start a Business",
    description: "High risk, high reward. Build something of your own",
    salary: 12000,
    debt: 10000,
    growth: "Explosive potential",
  },
];

export const HOUSING_DECISIONS: Decision = {
  id: "housing",
  category: "Housing",
  icon: "🏠",
  title: "Where Will You Live?",
  description: "Your housing choice affects your monthly costs and lifestyle.",
  options: [
    {
      label: "Live with Parents",
      icon: "🏡",
      description: "Save money but less independence",
      effects: { monthlyExpenses: -400, happiness: -5, stress: -5, housing: "parents" },
      lesson: "Living at home can supercharge your savings in your early years.",
    },
    {
      label: "House Share",
      icon: "👥",
      description: "Affordable with social benefits",
      effects: { monthlyExpenses: 500, happiness: 5, stress: 5, housing: "houseshare" },
      lesson: "Sharing costs is a smart way to balance lifestyle and savings.",
    },
    {
      label: "Rent Apartment",
      icon: "🏢",
      description: "Full independence at higher cost",
      effects: { monthlyExpenses: 900, happiness: 10, stress: 10, housing: "renting" },
      lesson: "Renting gives freedom but can slow wealth building.",
    },
    {
      label: "Buy Property",
      icon: "🏘",
      description: "Build equity but take on a mortgage",
      effects: { monthlyExpenses: 1100, happiness: 15, stress: 20, debt: 200000, housing: "owner" },
      lesson: "Property can build wealth long-term, but a mortgage is a huge commitment.",
    },
  ],
};

export const LIFESTYLE_DECISIONS: Decision = {
  id: "lifestyle",
  category: "Lifestyle",
  icon: "🚗",
  title: "How Will You Spend?",
  description: "Your spending habits shape your financial future.",
  options: [
    {
      label: "Frugal",
      icon: "🌱",
      description: "Minimal spending, maximum saving",
      effects: { monthlyExpenses: -200, happiness: -10, stress: -10, lifestyle: "frugal" },
      lesson: "Living below your means is the foundation of wealth building.",
      traitBonus: "careful-saver",
    },
    {
      label: "Balanced",
      icon: "⚖️",
      description: "Enjoy life while being sensible",
      effects: { monthlyExpenses: 200, happiness: 5, stress: 0, lifestyle: "balanced" },
      lesson: "Balance is key: enjoy today while planning for tomorrow.",
    },
    {
      label: "Luxury",
      icon: "💎",
      description: "Live large, worry later",
      effects: { monthlyExpenses: 800, happiness: 20, stress: 15, lifestyle: "luxury" },
      lesson: "Lifestyle inflation can reduce long-term wealth significantly.",
      traitBonus: "big-spender",
    },
  ],
};

export const INVESTING_DECISIONS: Decision = {
  id: "investing",
  category: "Investing",
  icon: "📈",
  title: "What Will You Do With Your Money?",
  description: "Investing decisions compound over decades.",
  options: [
    {
      label: "Index Funds",
      icon: "📊",
      description: "Diversified, steady growth",
      effects: { investments: 3000, happiness: 5, stress: 5 },
      lesson: "Index funds historically return 7-10% per year on average.",
      traitBonus: "strategic-thinker",
    },
    {
      label: "Buy Property",
      icon: "🏠",
      description: "Invest in bricks and mortar",
      effects: { investments: 5000, stress: 15, debt: 150000 },
      lesson: "Property can be a great investment but comes with costs and risks.",
    },
    {
      label: "Crypto & High Risk",
      icon: "🪙",
      description: "High volatility, high potential",
      effects: { investments: 2000, stress: 25, happiness: 10 },
      lesson: "High-risk investments can multiply or destroy your money.",
      traitBonus: "risk-taker",
    },
    {
      label: "Keep in Savings",
      icon: "🏦",
      description: "Safe but slow growth",
      effects: { savings: 2000, happiness: 0, stress: -5 },
      lesson: "Cash savings lose value over time due to inflation.",
      traitBonus: "careful-saver",
    },
  ],
};

export const SOCIAL_PRESSURE_DECISION: Decision = {
  id: "social-pressure",
  category: "Social Pressure",
  icon: "📱",
  title: "Social Media Temptation",
  description: "Your friends are posting about luxury holidays and new cars. The pressure is real.",
  options: [
    {
      label: "Keep Up",
      icon: "🛍",
      description: "Buy what your friends have",
      effects: { monthlyExpenses: 600, happiness: 15, stress: 20, socialPressure: 20 },
      lesson: "Keeping up with others is one of the biggest threats to financial health.",
      traitBonus: "big-spender",
    },
    {
      label: "Stay Disciplined",
      icon: "🧘",
      description: "Focus on your own goals",
      effects: { happiness: -5, stress: -10, socialPressure: -10 },
      lesson: "Financial discipline means ignoring what others spend and focusing on your goals.",
      traitBonus: "careful-saver",
    },
    {
      label: "Find Free Alternatives",
      icon: "🎯",
      description: "Have fun without breaking the bank",
      effects: { happiness: 10, stress: -5, socialPressure: -5 },
      lesson: "You do not need to spend money to have amazing experiences.",
      traitBonus: "strategic-thinker",
    },
  ],
};

export const RELATIONSHIP_DECISION: Decision = {
  id: "relationship",
  category: "Relationships",
  icon: "💕",
  title: "Relationship & Finances",
  description: "Your relationship status affects your financial planning.",
  options: [
    {
      label: "Stay Single",
      icon: "🦋",
      description: "Full financial independence",
      effects: { happiness: 5, stress: -5 },
      lesson: "Being single means full control over your finances.",
    },
    {
      label: "Move In Together",
      icon: "🏠",
      description: "Share costs with a partner",
      effects: { monthlyExpenses: -300, happiness: 15, stress: 5, partnerIncome: 20000 },
      lesson: "Sharing expenses with a partner can significantly boost savings.",
    },
    {
      label: "Get Married",
      icon: "💍",
      description: "Legal and financial partnership",
      effects: { monthlyExpenses: -200, happiness: 20, stress: 10, debt: 5000, partnerIncome: 25000 },
      lesson: "Marriage brings financial benefits and responsibilities. Plan together.",
    },
  ],
};

export const DECISIONS_BY_AGE: { minAge: number; decision: Decision }[] = [
  { minAge: 19, decision: LIFESTYLE_DECISIONS },
  { minAge: 20, decision: INVESTING_DECISIONS },
  { minAge: 21, decision: SOCIAL_PRESSURE_DECISION },
  { minAge: 22, decision: { ...HOUSING_DECISIONS, id: "housing-2", title: "Time to Rethink Housing?" } },
  { minAge: 24, decision: { ...INVESTING_DECISIONS, id: "investing-2", title: "Investment Strategy Update" } },
  { minAge: 25, decision: RELATIONSHIP_DECISION },
  { minAge: 26, decision: { ...LIFESTYLE_DECISIONS, id: "lifestyle-2", title: "Your Lifestyle is Evolving" } },
  {
    minAge: 28,
    decision: {
      id: "career-move",
      category: "Career",
      icon: "💼",
      title: "Career Crossroads",
      description: "A major career opportunity appears.",
      options: [
        {
          label: "Take Promotion",
          icon: "📈",
          description: "More money, more stress",
          effects: { salary: 15000, stress: 20, happiness: 10 },
          lesson: "Higher income often comes with higher demands.",
        },
        {
          label: "Side Hustle",
          icon: "🔥",
          description: "Build extra income streams",
          effects: { salary: 5000, stress: 15, happiness: 5 },
          lesson: "Multiple income streams provide financial security.",
          traitBonus: "entrepreneurial",
        },
        {
          label: "Stay Put",
          icon: "😌",
          description: "Keep things stable",
          effects: { happiness: 5, stress: -10 },
          lesson: "Stability has value, but growth requires change.",
        },
      ],
    },
  },
  {
    minAge: 30,
    decision: {
      ...SOCIAL_PRESSURE_DECISION,
      id: "social-pressure-2",
      title: "Lifestyle Pressure at 30",
      description: "Everyone your age seems to own a house and have their life together.",
    },
  },
  { minAge: 32, decision: { ...INVESTING_DECISIONS, id: "investing-3", title: "Mid-Career Investment Review" } },
  { minAge: 35, decision: { ...RELATIONSHIP_DECISION, id: "relationship-2", title: "Family & Financial Future" } },
  {
    minAge: 38,
    decision: {
      id: "family",
      category: "Family",
      icon: "👨‍👩‍👧",
      title: "Family Planning",
      description: "Life-changing family decisions ahead.",
      options: [
        {
          label: "Have Children",
          icon: "👶",
          description: "Joy and responsibility",
          effects: { monthlyExpenses: 800, happiness: 25, stress: 25 },
          lesson: "Children are rewarding but financially demanding. Plan ahead.",
        },
        {
          label: "Stay Child-Free",
          icon: "✈️",
          description: "Freedom and flexibility",
          effects: { happiness: 10, stress: -10, savings: 500 },
          lesson: "Different life paths suit different people. There is no wrong answer.",
        },
      ],
    },
  },
  {
    minAge: 42,
    decision: {
      ...SOCIAL_PRESSURE_DECISION,
      id: "social-pressure-3",
      title: "Mid-Life Comparison",
      description: "You see friends buying second homes and luxury cars. How do you respond?",
    },
  },
  { minAge: 45, decision: { ...INVESTING_DECISIONS, id: "investing-4", title: "Pre-Retirement Planning" } },
  {
    minAge: 55,
    decision: {
      id: "retirement",
      category: "Retirement",
      icon: "🏖",
      title: "Retirement Strategy",
      description: "How will you spend your golden years?",
      options: [
        {
          label: "Early Retirement",
          icon: "🌴",
          description: "Stop working at 55",
          effects: { salary: -30000, happiness: 30, stress: -30 },
          lesson: "Early retirement requires significant savings, but freedom is priceless.",
        },
        {
          label: "Semi-Retire",
          icon: "⏳",
          description: "Work part-time",
          effects: { salary: -15000, happiness: 20, stress: -20 },
          lesson: "Part-time work can keep you active and supplement income.",
        },
        {
          label: "Keep Working",
          icon: "💪",
          description: "Continue full-time",
          effects: { happiness: -5, stress: 10 },
          lesson: "Working longer builds more wealth but watch your wellbeing.",
        },
      ],
    },
  },
];

export const LIFE_EVENTS: LifeEvent[] = [
  {
    title: "Economic Recession",
    icon: "📉",
    description: "A global recession hits. Markets crash 30%.",
    effects: { investments: -5000, stress: 20, happiness: -15 },
    lesson: "Recessions are temporary. Those who stay invested often recover strongest.",
  },
  {
    title: "Surprise Promotion!",
    icon: "🎉",
    description: "Your hard work pays off with a major promotion.",
    effects: { salary: 8000, happiness: 20, stress: 5 },
    lesson: "Consistency and skill development lead to career growth.",
  },
  {
    title: "Job Loss",
    icon: "😰",
    description: "Your company downsizes and you lose your position.",
    effects: { salary: -10000, happiness: -25, stress: 30 },
    lesson: "An emergency fund protects you during unexpected job loss.",
  },
  {
    title: "Medical Emergency",
    icon: "🏥",
    description: "An unexpected health issue costs you GBP 5,000.",
    effects: { savings: -5000, happiness: -15, stress: 25 },
    lesson: "Health emergencies can devastate finances without an emergency fund.",
  },
  {
    title: "Housing Market Boom",
    icon: "🏠",
    description: "Property values surge 20%.",
    effects: { netWorth: 40000, happiness: 15 },
    lesson: "Property owners benefit from market booms, but it works both ways.",
  },
  {
    title: "Business Opportunity",
    icon: "💡",
    description: "A lucrative business opportunity appears.",
    effects: { salary: 12000, stress: 15, happiness: 10 },
    lesson: "Spotting opportunities and taking calculated risks can accelerate wealth.",
    traitTrigger: "entrepreneurial",
  },
  {
    title: "Stock Market Crash",
    icon: "💥",
    description: "Markets drop 40% in a single month.",
    effects: { investments: -8000, happiness: -20, stress: 30 },
    lesson: "Market crashes test your resolve. Panic selling locks in losses.",
  },
  {
    title: "Inheritance",
    icon: "💰",
    description: "A relative leaves you GBP 15,000.",
    effects: { savings: 15000, happiness: 10 },
    lesson: "Windfall money should be split: save some, invest some, enjoy some.",
  },
  {
    title: "Tax Refund",
    icon: "🧾",
    description: "You receive a GBP 2,000 tax refund.",
    effects: { savings: 2000, happiness: 5 },
    lesson: "Unexpected income is a great opportunity to boost your savings.",
  },
  {
    title: "Crypto Craze",
    icon: "🪙",
    description: "Everyone is talking about crypto. FOMO is real.",
    effects: { savings: -2000, investments: 1000, stress: 15 },
    lesson: "Investing based on hype can increase risk. Do your research first.",
    traitTrigger: "risk-taker",
  },
  {
    title: "Friend's Luxury Holiday",
    icon: "✈️",
    description: "Your best friend posts an amazing holiday. You feel the urge to book one too.",
    effects: { savings: -3000, happiness: 15, stress: 10, socialPressure: 15 },
    lesson: "Social comparison is a thief of financial joy. Travel smart, not expensive.",
  },
  {
    title: "Viral Side Hustle",
    icon: "📱",
    description: "A trending side hustle catches your eye. Everyone seems to be doing it.",
    effects: { salary: 3000, stress: 10, happiness: 5 },
    lesson: "Not every trend is right for you. Evaluate opportunities based on your skills.",
    traitTrigger: "entrepreneurial",
  },
  {
    title: "Got Scammed",
    icon: "🚨",
    description: "You fell for a too-good-to-be-true investment scheme.",
    effects: { savings: -4000, happiness: -20, stress: 25 },
    lesson: "If it sounds too good to be true, it probably is. Always verify before investing.",
  },
  {
    title: "Partner Got a Raise",
    icon: "💕",
    description: "Your partner received a significant pay rise.",
    effects: { happiness: 15, stress: -10, savings: 3000 },
    lesson: "Dual income households can accelerate wealth building significantly.",
  },
  {
    title: "Interest Rate Hike",
    icon: "📊",
    description: "The Bank of England raises interest rates by 2%.",
    effects: { stress: 15, happiness: -10 },
    lesson: "Rising interest rates affect mortgages, savings, and borrowing costs.",
  },
];

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, "unlockedAt">[] & {
  check?: (state: any) => boolean;
}[] = [
  { id: "first-investment", title: "First Investment", icon: "📈", description: "Made your first investment", check: (s) => s.investments > 0 },
  { id: "emergency-fund", title: "Emergency Fund", icon: "🛡", description: "Built GBP 5,000 in savings", check: (s) => s.savings >= 5000 },
  { id: "50k-networth", title: "Wealth Builder", icon: "💎", description: "Reached GBP 50,000 net worth", check: (s) => s.netWorth >= 50000 },
  { id: "100k-networth", title: "GBP100K Club", icon: "🏆", description: "Reached GBP 100,000 net worth", check: (s) => s.netWorth >= 100000 },
  { id: "debt-free", title: "Debt Free", icon: "🎊", description: "Paid off all debt", check: (s) => s.debt <= 0 && s.history.length > 2 },
  { id: "high-happiness", title: "Living the Dream", icon: "😊", description: "Reached 90+ happiness", check: (s) => s.happiness >= 90 },
  { id: "investor-decade", title: "Decade Investor", icon: "🥇", description: "Invested for 10+ years", check: (s) => s.history.filter((h: any) => h.investments > 0).length >= 10 },
  { id: "social-resister", title: "Pressure Proof", icon: "🧘", description: "Kept social pressure below 20", check: (s) => s.socialPressure <= 20 && s.age >= 30 },
  { id: "partnered-up", title: "Power Couple", icon: "💕", description: "Built wealth together with a partner", check: (s) => s.partnerIncome > 0 && s.netWorth >= 50000 },
  { id: "millionaire", title: "Millionaire", icon: "👑", description: "Reached GBP 1,000,000 net worth", check: (s) => s.netWorth >= 1000000 },
];
