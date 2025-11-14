"use client";

import Image from "next/image";
import { Company } from "../logic/gameLogic";
import { Newspaper } from "lucide-react";

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
          <h3 className="font-semibold text-lg text-gray-900">
            {company.name}
          </h3>
          <p className="text-gray-500 text-sm">{company.sector}</p>
        </div>
      </div>

      <button
        onClick={onOpenNews}
        className="p-2 rounded-md hover:bg-green-500 transition"
      >
        <Newspaper className="w-7 h-11 text-gray-600 hover:text-white" />
      </button>
    </div>
  );
}
