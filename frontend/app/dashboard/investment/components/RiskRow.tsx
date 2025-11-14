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
      <p className="text-gray-700 font-medium">Risk:</p>

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

        <div className="absolute top-full right-0 mt-2 w-64 p-4 rounded-xl border border-gray-200 shadow-md bg-white text-gray-700 text-sm opacity-0 scale-95 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 z-20">
          {getRiskExplanation(company.riskLevel)}
        </div>
      </div>
    </div>
  );
}
