"use client";

import Image from "next/image";
import { Company } from "../logic/gameLogic";
import { Newspaper } from "lucide-react";
import "../investment.css";

export default function Header({
  company,
  onOpenNews,
}: {
  company: Company;
  onOpenNews: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <Image
          src={company.logo}
          alt={company.name}
          width={40}
          height={40}
          className="rounded-md object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">
            {company.name}
          </h3>
          <p className="text-sm text-[#9a9a9d]">{company.sector}</p>
        </div>
      </div>

      <button
        onClick={onOpenNews}
        className="rounded-md p-2 transition hover:bg-white/10"
      >
        <Newspaper className="h-11 w-7 text-[#9a9a9d] hover:text-white" />
      </button>
    </div>
  );
}
