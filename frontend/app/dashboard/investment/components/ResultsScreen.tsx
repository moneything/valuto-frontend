"use client";

import Image from "next/image";
import { RoundResult } from "../logic/gameLogic";
import { companies } from "../data/companies";
import "../investment.css";

interface Props {
  result: RoundResult;
  onContinue: () => void;
}

export default function ResultsScreen({ result, onContinue }: Props) {
  const { round, startingBalance, endingBalance, investments, insights } = result;

  const profitLoss = endingBalance - startingBalance;
  const percentageChange = ((profitLoss / startingBalance) * 100).toFixed(1);
  const isProfit = profitLoss > 0;

  // Helper to get logo and sector info from company data
  const getCompanyData = (id: string) =>
    companies.find((c) => c.id === id) || {
      logo: "/placeholder.png",
      sector: "",
      riskLevel: "",
    };

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,hsl(0_0%_7%),hsl(0_0%_9%),hsl(152_20%_8%))] px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 🔹 Round Summary Banner */}
        <div
          className={`rounded-2xl p-8 shadow-sm border text-center transition ${
            isProfit
              ? "border-green-500/20 bg-green-500/10"
              : "border-red-500/20 bg-red-500/10"
          }`}
        >
          <div className="text-4xl mb-2">📊</div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Round {round} Complete!
          </h2>

          <div className="mb-4 flex items-center justify-center gap-8 text-[#d7d7db]">
            <div>
              <p className="text-sm">Starting Balance</p>
              <p className="text-lg font-semibold text-white">
                £{startingBalance.toFixed(2)}
              </p>
            </div>
            <div className="text-2xl">↔️</div>
            <div>
              <p className="text-sm">Ending Balance</p>
              <p
                className={`font-semibold text-lg ${
                  isProfit ? "text-green-300" : "text-red-300"
                }`}
              >
                £{endingBalance.toFixed(2)}
              </p>
            </div>
          </div>

          <div
            className={`inline-block px-5 py-2 rounded-full font-semibold text-white ${
              isProfit ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isProfit ? `+${percentageChange}% Gain` : `${percentageChange}% Loss`}
          </div>
        </div>

        {/* 💹 Investments List */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
            🏆 Your Investments
          </h3>

          <div className="space-y-4">
            {investments.map((inv) => {
              const changePercent = (
                ((inv.finalValue - inv.invested) / inv.invested) *
                100
              ).toFixed(1);

              const positive = parseFloat(changePercent) >= 0;
              const companyInfo = getCompanyData(inv.companyId);

              return (
                <div
                  key={inv.companyId}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#232324]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex items-start gap-3">
                    <Image
                      src={companyInfo.logo}
                      alt={inv.companyName}
                      width={40}
                      height={40}
                      className="rounded-md object-contain"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {inv.companyName}
                      </p>
                      <p className="text-sm text-[#9a9a9d]">
                        {inv.priceChange > 20
                          ? `Major positive news boosted ${inv.companyName}'s stock price significantly.`
                          : inv.priceChange > 0
                          ? `Good news helped ${inv.companyName} grow steadily.`
                          : inv.priceChange > -20
                          ? `Some challenges caused ${inv.companyName} to dip slightly.`
                          : `Negative developments hit ${inv.companyName} hard this period.`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-[#9a9a9d]">
                      Invested:{" "}
                      <span className="font-medium text-white">
                        £{inv.invested.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm text-[#9a9a9d]">
                      Final Value:{" "}
                      <span className="font-medium text-white">
                        £{inv.finalValue.toFixed(2)}
                      </span>
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                        positive
                          ? "border border-green-500/20 bg-green-500/10 text-green-300"
                          : "border border-red-500/20 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {positive ? `+${changePercent}%` : `${changePercent}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 💡 Insights */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
            💡 What You Learned
          </h3>

          <div className="space-y-2 rounded-xl border border-green-500/20 bg-green-500/10 p-5">
            {insights.length > 0 ? (
              insights.map((text, idx) => (
                <p key={idx} className="text-sm text-[#d7d7db]">
                  {text}
                </p>
              ))
            ) : (
              <p className="text-sm text-[#9a9a9d]">
                No new insights this round — try diversifying next time!
              </p>
            )}
          </div>
        </div>

        {/* ▶️ Continue Button */}
        <div className="text-center pt-4">
          <button
            onClick={onContinue}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            ▶ Play Another Round
          </button>
        </div>
      </div>
    </div>
  );
}
