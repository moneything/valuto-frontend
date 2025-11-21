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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 🔹 Round Summary Banner */}
        <div
          className={`rounded-2xl p-8 shadow-sm border text-center transition ${
            isProfit
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="text-4xl mb-2">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Round {round} Complete!
          </h2>

          <div className="flex justify-center items-center gap-8 text-gray-700 mb-4">
            <div>
              <p className="text-sm">Starting Balance</p>
              <p className="font-semibold text-lg text-gray-800">
                £{startingBalance.toFixed(2)}
              </p>
            </div>
            <div className="text-2xl">↔️</div>
            <div>
              <p className="text-sm">Ending Balance</p>
              <p
                className={`font-semibold text-lg ${
                  isProfit ? "text-green-600" : "text-red-600"
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
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
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
                  className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-gray-100 p-5"
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
                      <p className="font-semibold text-lg text-gray-900">
                        {inv.companyName}
                      </p>
                      <p className="text-gray-500 text-sm">
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
                    <p className="text-sm text-gray-500">
                      Invested:{" "}
                      <span className="font-medium text-gray-800">
                        £{inv.invested.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Final Value:{" "}
                      <span className="font-medium text-gray-800">
                        £{inv.finalValue.toFixed(2)}
                      </span>
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                        positive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
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
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
            💡 What You Learned
          </h3>

          <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-2">
            {insights.length > 0 ? (
              insights.map((text, idx) => (
                <p key={idx} className="text-gray-700 text-sm">
                  {text}
                </p>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
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
