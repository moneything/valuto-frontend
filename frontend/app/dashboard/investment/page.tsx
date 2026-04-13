"use client";

import { useState } from "react";
import CompanyCard from "./components/CompanyCard";
import ResultsScreen from "./components/ResultsScreen";
import TimeSimulation from "./components/TimeSimulation";
import { companies } from "./data/companies";
import {
  simulateStockChange,
  generateInsights,
  RoundResult,
  InvestmentResult,
} from "./logic/gameLogic";
import { FiTrendingUp } from "react-icons/fi";
import { useFeaturedGameMonthlyChallenge } from "@/lib/hooks/useFeaturedGameMonthlyChallenge";

export default function InvestmentPage() {
  useFeaturedGameMonthlyChallenge("monthly_investment_simulation");
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [balance, setBalance] = useState(1000);
  const [investments, setInvestments] = useState<Record<string, number>>({});
  const [results, setResults] = useState<RoundResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const totalInvested = Object.values(investments).reduce((a, b) => a + (b || 0), 0);
  const availableBalance = balance - totalInvested;

  // Handle slider investment change
  const handleInvestmentChange = (id: string, amount: number) => {
    const otherInvested = Object.entries(investments)
      .filter(([key]) => key !== id)
      .reduce((sum, [, val]) => sum + val, 0);

    const maxAllowed = Math.max(balance - otherInvested, 0);
    const finalAmount = Math.min(amount, maxAllowed);

    setInvestments((prev) => ({ ...prev, [id]: finalAmount }));
  };

  // Handle advancing 6 months
  const handleAdvance = () => {
    // 🕒 Step 1: Show time simulation loading screen
    setIsSimulating(true);

    // 🕒 Step 2: Simulate "6 months" delay before calculating results
    setTimeout(() => {
      const startingBalance = balance;

      const investmentsList = companies
        .map((c) => ({
          ...c,
          invested: investments[c.id] || 0,
          priceChange: simulateStockChange(c.riskLevel),
        }))
        .filter((i) => i.invested > 0);

      const resultsPerCompany: InvestmentResult[] = investmentsList.map((inv) => {
        const newPrice = inv.currentPrice * (1 + inv.priceChange / 100);
        const shares = inv.invested / inv.currentPrice;
        const finalValue = shares * newPrice;
        return {
          companyId: inv.id,
          companyName: inv.name,
          invested: inv.invested,
          finalValue: parseFloat(finalValue.toFixed(2)),
          priceChange: inv.priceChange,
          riskLevel: inv.riskLevel,
        };
      });

      const totalInvested = resultsPerCompany.reduce((a, b) => a + b.invested, 0);
      const totalValue = resultsPerCompany.reduce((a, b) => a + b.finalValue, 0);
      const uninvested = startingBalance - totalInvested;
      const endingBalance = parseFloat((totalValue + uninvested).toFixed(2));

      const insights = generateInsights(resultsPerCompany, uninvested, startingBalance);

      setResults((prev) => [
        ...prev,
        { round, startingBalance, endingBalance, investments: resultsPerCompany, insights },
      ]);

      setBalance(endingBalance);
      setInvestments({});
      setRound(round + 1);
      setIsSimulating(false); // hide loading screen
      setShowResults(true); // show round results
    }, 4000); // 4-second delay
  };

  // 🟢 Start screen
  if (!started)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(160deg,hsl(0_0%_7%),hsl(0_0%_9%),hsl(152_20%_8%))] px-6">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#232324]/95 p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
        <h1 className="mb-4 text-4xl font-bold text-white">Investment Simulation</h1>
        <p className="mb-6 max-w-lg text-center text-[#9a9a9d] mx-auto">
          Learn investing by simulating market changes over time. Allocate funds, manage risk, and track performance.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="rounded-md border border-green-500/20 bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Start Game
        </button>
        </div>
      </div>
    );

  // ⏰ Simulation screen
  if (isSimulating)
    return <TimeSimulation duration={4000} onComplete={() => setIsSimulating(false)} />;

  // 📊 Results screen
  if (showResults)
    return (
      <ResultsScreen
        result={results[results.length - 1]}
        onContinue={() => setShowResults(false)}
      />
    );

  // 💼 Main investment dashboard
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,hsl(0_0%_7%),hsl(0_0%_9%),hsl(152_20%_8%))] px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
             <FiTrendingUp className="w-6 h-6" /> Investment Round {round}
          </h1>
          <p className="text-[#9a9a9d]">Choose your investments wisely!</p>
        </div>

        {/* Balance Summary */}
        <div className="mb-10 flex flex-wrap items-center justify-between rounded-xl border border-green-500/20 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col">
            <span className="text-sm text-[#9a9a9d]">Total Balance</span>
            <span className="text-lg font-semibold text-green-300">
              £{balance.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#9a9a9d]">Invested</span>
            <span className="text-lg font-semibold text-green-300">
              £{totalInvested.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#9a9a9d]">Available</span>
            <span className="text-lg font-semibold text-green-300">
              £{availableBalance.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAdvance}
            disabled={totalInvested === 0}
            className={`mt-4 sm:mt-0 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
              totalInvested === 0
                ? "cursor-not-allowed border border-white/10 bg-white/5 text-[#6f6f73]"
                : "border border-green-500/20 bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Advance 6 Months →
          </button>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((c) => (
            <CompanyCard
              key={c.id}
              company={c}
              invested={investments[c.id] || 0}
              availableBalance={availableBalance}
              totalBalance={balance}
              onChange={(val) => handleInvestmentChange(c.id, val)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
