import { Company } from "../logic/gameLogic";

export const companies: Company[] = [
  {
    id: "apple",
    name: "Apple",
    sector: "Technology",
    riskLevel: "low",
    currentPrice: 150,
    logo: "/companies/apple.png",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    sector: "Technology",
    riskLevel: "low",
    currentPrice: 280,
    logo: "/companies/microsoft.png",
  },
  {
    id: "netflix",
    name: "Netflix",
    sector: "Entertainment",
    riskLevel: "high",
    currentPrice: 380,
    logo: "/companies/netflix.png",
  },
  {
    id: "nike",
    name: "Nike",
    sector: "Retail",
    riskLevel: "medium",
    currentPrice: 95,
    logo: "/companies/nike.png",
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    sector: "Food",
    riskLevel: "medium",
    currentPrice: 250,
    logo: "/companies/mcdonalds.png",
  },
];
