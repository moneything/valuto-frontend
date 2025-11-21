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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-2xl shadow-xl border border-gray-200 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full border border-green-300 text-green-600 hover:bg-green-50 transition"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-3">
          <Image src={company.logo} alt={company.name} width={40} height={40} />
          <h2 className="text-2xl font-semibold">{company.name} News</h2>
        </div>

        <p className="text-gray-500 mb-5">Latest headlines for this company</p>

        <div className="space-y-3">
          {[
            `${company.name} announces new product launch`,
            `${company.name} sees strong quarterly growth`,
            `Supply chain challenges impact ${company.name}`,
          ].map((headline, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <FiExternalLink className="text-green-600 w-5 h-5" />
                <span className="text-gray-800">{headline}</span>
              </div>
              <FiInfo className="text-gray-400 w-5 h-5" />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
