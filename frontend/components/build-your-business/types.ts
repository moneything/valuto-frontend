export type GameStage = 1 | 2 | 3 | 4 | 5 | 6;

export type Difficulty = "easy" | "medium" | "hard";
export type LaunchChannel = "online-store" | "social-media" | "physical" | "service";
export type BrandStyle = "minimal" | "bold" | "luxury" | "playful";

export interface BusinessIdea {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: Difficulty;
  startingCost: number;
  marketDemand: number;
  competition: number;
  category: string;
}

export interface BusinessMetrics {
  revenue: number;
  profit: number;
  expenses: number;
  customers: number;
  reputation: number;
  stress: number;
  satisfaction: number;
  cash: number;
  valuation: number;
  weeklyRevenue: number;
  weeklyCosts: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  productivity: number;
  creativity: number;
  cost: number;
  experience: "junior" | "mid" | "senior";
  avatar: string;
}

export interface MarketingChannel {
  id: string;
  name: string;
  icon: string;
  costPerWeek: number;
  conversionRate: number;
  reach: number;
  description: string;
}

export interface EventChoice {
  id: string;
  text: string;
  effects: Partial<BusinessMetrics>;
  lesson?: string;
}

export interface BusinessEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "positive" | "negative";
  choices: EventChoice[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  condition: (metrics: BusinessMetrics) => boolean;
}

export interface GameState {
  stage: GameStage;
  week: number;
  businessName: string;
  selectedIdea: BusinessIdea | null;
  metrics: BusinessMetrics;
  employees: Employee[];
  activeMarketing: string[];
  achievements: Achievement[];
  decisions: string[];
  lessons: string[];
  launchChannel: LaunchChannel | null;
  brandStyle: BrandStyle | null;
  pricePoint: number;
  productionCost: number;
  marketingBudget: number;
  metricsHistory: BusinessMetrics[];
  eventsEncountered: string[];
  gameOver: boolean;
  showEvent: BusinessEvent | null;
}

export const STAGE_NAMES: Record<GameStage, string> = {
  1: "Idea",
  2: "Research",
  3: "Pricing",
  4: "Build",
  5: "Marketing",
  6: "Growth",
};

export const STAGE_ICONS: Record<GameStage, string> = {
  1: "💡",
  2: "🔍",
  3: "💷",
  4: "🏗",
  5: "📣",
  6: "🚀",
};
