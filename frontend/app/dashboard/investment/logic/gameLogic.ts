export type RiskLevel = "low" | "medium" | "high";

export interface Company {
  id: string;
  name: string;
  sector: string;
  riskLevel: RiskLevel;
  currentPrice: number;
  logo: string;
}

export interface InvestmentResult {
  companyId: string;
  companyName: string;
  invested: number;
  finalValue: number;
  priceChange: number;
  riskLevel: RiskLevel;
}

export interface RoundResult {
  round: number;
  startingBalance: number;
  endingBalance: number;
  investments: InvestmentResult[];
  insights: string[];
}

export function simulateStockChange(riskLevel: RiskLevel): number {
  const ranges: Record<RiskLevel, [number, number]> = {
    low: [-10, 15],
    medium: [-20, 30],
    high: [-40, 50],
  };
  const [min, max] = ranges[riskLevel];
  const change = Math.random() * (max - min) + min;
  return Math.round(change * 10) / 10;
}

export function getNewsExplanation(company: string, change: number): string {
  if (change > 20) return `Major positive news boosted ${company}'s stock price significantly.`;
  if (change > 0) return `Good news helped ${company} grow steadily.`;
  if (change > -20) return `${company} faced some challenges this round.`;
  return `${company} suffered major setbacks affecting performance.`;
}

export function generateInsights(
  investments: InvestmentResult[],
  uninvested: number,
  startingBalance: number
): string[] {
  const insights: string[] = [];

  if (investments.length >= 3)
    insights.push("Great job diversifying! Investing in multiple companies helps reduce risk.");
  else if (investments.length === 1)
    insights.push("You put all your money into one company — consider diversifying next time.");

  if (uninvested > startingBalance * 0.5)
    insights.push("You kept over half your balance uninvested — cash doesn’t grow while idle.");

  const highRisk = investments.filter((i) => i.riskLevel === "high");
  const profit = investments.some((i) => i.finalValue > i.invested);
  const loss = investments.some((i) => i.finalValue < i.invested);

  if (highRisk.length && profit)
    insights.push("High-risk investments performed well this round — but remain cautious.");
  if (highRisk.length && loss)
    insights.push("High-risk stocks dropped this round — balance them with safer picks.");

  return insights;
}
