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

export interface InteractiveActivity {
  type: 'calculator' | 'simulation' | 'drag-drop' | 'matching' | 'scenario' | 'chart';
  title: string;
  description: string;
  data: any; // Flexible data structure for different activity types
  instructions: string;
}

export interface LearningLesson {
  id: string;
  title: string;
  content: string;
  interactiveActivity?: InteractiveActivity;
  quiz: LearningQuiz;
}

// Old learning module interfaces removed - now using interactive learning modules system

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


