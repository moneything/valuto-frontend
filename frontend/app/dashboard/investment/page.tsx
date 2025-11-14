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
import { FiShield, FiTrendingUp } from "react-icons/fi";

export default function InvestmentPage() {
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-green-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Investment Simulation</h1>
        <p className="text-gray-600 max-w-lg text-center mb-6">
          Learn investing by simulating market changes over time. Allocate funds, manage risk, and track performance.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Start Game
        </button>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
             <FiTrendingUp className="w-6 h-6" /> Investment Round {round}
          </h1>
          <p className="text-gray-600">Choose your investments wisely!</p>
        </div>

        {/* Balance Summary */}
        <div className="bg-white shadow-sm rounded-xl p-6 flex flex-wrap justify-between items-center mb-10 border border-green-100">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Total Balance</span>
            <span className="text-lg font-semibold text-green-700">
              £{balance.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Invested</span>
            <span className="text-lg font-semibold text-green-700">
              £{totalInvested.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Available</span>
            <span className="text-lg font-semibold text-green-700">
              £{availableBalance.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAdvance}
            disabled={totalInvested === 0}
            className={`mt-4 sm:mt-0 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
              totalInvested === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
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
