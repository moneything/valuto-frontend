"use client";

import Image from "next/image";
import { Company } from "../logic/gameLogic";
import { FiExternalLink, FiInfo } from "react-icons/fi";
import "../investment.css";

export default function NewsModal({
  company,
  onClose,
}: {
  company: Company;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-11/12 max-w-lg rounded-2xl border border-white/10 bg-[#232324] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.38)]">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-green-500/20 p-1 text-green-300 transition hover:bg-white/10"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-3">
          <Image src={company.logo} alt={company.name} width={40} height={40} />
          <h2 className="text-2xl font-semibold text-white">{company.name} News</h2>
        </div>

        <p className="mb-5 text-[#9a9a9d]">Latest headlines for this company</p>

        <div className="space-y-3">
          {[
            `${company.name} announces new product launch`,
            `${company.name} sees strong quarterly growth`,
            `Supply chain challenges impact ${company.name}`,
          ].map((headline, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-3">
                <FiExternalLink className="h-5 w-5 text-green-300" />
                <span className="text-[#e5e5e7]">{headline}</span>
              </div>
              <FiInfo className="h-5 w-5 text-[#9a9a9d]" />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
