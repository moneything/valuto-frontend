"use client";

import { Company } from "../logic/gameLogic";
import { FiInfo } from "react-icons/fi";
import {
  getRiskColor,
  getRiskExplanation,
  getRiskIcon,
} from "../logic/riskHelpers";
import "../investment.css";

export default function RiskRow({ company }: { company: Company }) {
  return (
    <div className="flex items-center justify-between mt-3">
      <p className="font-medium text-[#d7d7db]">Risk:</p>

      <div className="relative group inline-flex items-center cursor-pointer">
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold border flex items-center gap-2 ${getRiskColor(
            company.riskLevel
          )}`}
        >
          {getRiskIcon(company.riskLevel)}
          <span className="capitalize">{company.riskLevel}</span>
          <FiInfo className="w-4 h-4 opacity-90" />
        </span>

        <div className="absolute top-full right-0 z-20 mt-2 w-64 scale-95 rounded-xl border border-white/10 bg-[#232324] p-4 text-sm text-[#d7d7db] opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-all duration-200 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100">
          {getRiskExplanation(company.riskLevel)}
        </div>
      </div>
    </div>
  );
}
