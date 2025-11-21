import {
  Wallet,
  TrendingUp,
  CreditCard,
  Landmark,
  PiggyBank,
  Info,
} from "lucide-react";

export const CATEGORY_META: Record<
  string,
  {
    label: string;
    description: string;
    color: string;
    icon: any;
  }
> = {
  "Money Basics": {
    label: "Money Basics",
    description: "Learn the foundations of how money works.",
    color: "bg-amber-500",
    icon: Info,
  },
  Budgeting: {
    label: "Budgeting",
    description: "Master the skill of planning and controlling your money.",
    color: "bg-blue-500",
    icon: Wallet,
  },
  Savings: {
    label: "Savings",
    description: "Build financial security through smart saving habits.",
    color: "bg-teal-500",
    icon: PiggyBank,
  },
  "Debt Management": {
    label: "Debt Management",
    description: "Learn how loans, student debt, and repayments work.",
    color: "bg-red-500",
    icon: Landmark,
  },
  Credit: {
    label: "Credit",
    description: "Understand credit scores, reports, and responsible use.",
    color: "bg-purple-500",
    icon: CreditCard,
  },
  Investing: {
    label: "Investing",
    description: "Grow your wealth through long-term investing.",
    color: "bg-green-500",
    icon: TrendingUp,
  },
};
