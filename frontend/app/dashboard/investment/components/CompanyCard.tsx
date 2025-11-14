"use client";

import { useState } from "react";
import { Company } from "../logic/gameLogic";
import Header from "./Header";
import PriceRow from "./PriceRow";
import RiskRow from "./RiskRow";
import InvestSection from "./InvestSection";
import NewsModal from "./NewsModal";

interface Props {
  company: Company;
  invested: number;
  availableBalance: number;
  totalBalance: number;
  onChange: (amount: number) => void;
}

export default function CompanyCard({
  company,
  invested,
  availableBalance,
  totalBalance,
  onChange,
}: Props) {
  const [showNews, setShowNews] = useState(false);
  const isMax = availableBalance === 0 || invested >= totalBalance;

  return (
    <>
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition">

        <Header company={company} onOpenNews={() => setShowNews(true)} />

        <PriceRow company={company} />

        <RiskRow company={company} />

        <div className="border-t border-gray-200 my-4" />

        <InvestSection
          company={company}
          invested={invested}
          totalBalance={totalBalance}
          onChange={onChange}
          isMax={isMax}
        />

      </div>

      {showNews && (
        <NewsModal company={company} onClose={() => setShowNews(false)} />
      )}
    </>
  );
}
