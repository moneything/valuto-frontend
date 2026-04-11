export type GamePhase = "start" | "playing" | "event" | "summary";

export type PersonalityTrait =
  | "risk-taker"
  | "careful-saver"
  | "entrepreneurial"
  | "big-spender"
  | "strategic-thinker";

export type CareerPath = "university" | "apprenticeship" | "entry-level" | "business";

export type LivingSituation = "parents" | "renting-friends" | "independent";

export type StartingFinances = "modest" | "comfortable" | "debt-risk";

export type HousingStatus = "parents" | "houseshare" | "renting" | "owner";

export type LifestyleStatus = "frugal" | "balanced" | "luxury";

export type RelationshipStatus = "single" | "partnered" | "married";

export interface AvatarConfig {
  skinTone: number;
  hairStyle: number;
  hairColor: number;
  faceShape: number;
  eyeColor: number;
  glasses: boolean;
  outfit: number;
}

export interface DecisionEffects {
  salary?: number;
  savings?: number;
  investments?: number;
  monthlyExpenses?: number;
  happiness?: number;
  stress?: number;
  debt?: number;
  housing?: HousingStatus;
  lifestyle?: LifestyleStatus;
  partnerIncome?: number;
  netWorth?: number;
  socialPressure?: number;
}

export interface DecisionOption {
  label: string;
  icon: string;
  description: string;
  effects: DecisionEffects;
  lesson?: string;
  traitBonus?: PersonalityTrait;
}

export interface Decision {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
  options: DecisionOption[];
}

export interface LifeEvent {
  title: string;
  icon: string;
  description: string;
  effects: DecisionEffects;
  lesson: string;
  traitTrigger?: PersonalityTrait;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlockedAt: number;
}

export interface YearSnapshot {
  age: number;
  netWorth: number;
  salary: number;
  savings: number;
  investments: number;
  happiness: number;
  stress: number;
  event?: string;
}

export interface PlayerSetup {
  avatar: AvatarConfig;
  traits: PersonalityTrait[];
  career: CareerPath;
  livingSituation: LivingSituation;
  startingFinances: StartingFinances;
}

export interface GameState {
  phase: GamePhase;
  age: number;
  year: number;
  netWorth: number;
  salary: number;
  savings: number;
  investments: number;
  monthlyExpenses: number;
  happiness: number;
  stress: number;
  debt: number;
  career: CareerPath | null;
  careerTitle: string;
  housing: HousingStatus;
  lifestyle: LifestyleStatus;
  history: YearSnapshot[];
  achievements: Achievement[];
  currentDecision: Decision | null;
  currentEvent: LifeEvent | null;
  lesson: string | null;
  traits: PersonalityTrait[];
  avatar: AvatarConfig | null;
  livingSituation: LivingSituation | null;
  startingFinances: StartingFinances | null;
  relationshipStatus: RelationshipStatus;
  partnerIncome: number;
  socialPressure: number;
  lifeScore: number;
}
