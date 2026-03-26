"use client";

import { Company } from "./../logic/gameLogic";
import "../investment.css";

export default function InvestSection({
  company,
  invested,
  totalBalance,
  onChange,
  isMax,
}: {
  company: Company;
  invested: number;
  totalBalance: number;
  onChange: (amount: number) => void;
  isMax: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-[#d7d7db]">Invest:</p>
        <p className={`font-semibold ${isMax ? "text-blue-300" : "text-green-300"}`}>
          £{invested.toFixed(2)}
        </p>
      </div>

      <div className="pt-3">
        <input
          type="range"
          min={0}
          max={totalBalance}
          value={invested}
          step={5}
          onChange={(e) => onChange(Number(e.target.value))}
          className="investment-slider"
          style={
            {
              "--fill-percent": `${(invested / totalBalance) * 100}%`,
              "--fill-color": isMax ? "#3B82F6" : "#16A34A",
              "width": "-webkit-fill-available",
            } as React.CSSProperties
          }
        />

        <p className="mt-1 text-center text-sm text-[#9a9a9d]">
          {invested > 0
            ? `≈ ${(invested / company.currentPrice).toFixed(2)} shares`
            : "Slide to invest"}
        </p>
      </div>
    </div>
  );
}
