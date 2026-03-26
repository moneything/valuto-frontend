"use client";

import { useState } from "react";
import { Company } from "../logic/gameLogic";
import Header from "./Header";
import PriceRow from "./PriceRow";
import RiskRow from "./RiskRow";
import InvestSection from "./InvestSection";
import NewsModal from "./NewsModal";
import "../investment.css";

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
      <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)]">

        <Header company={company} onOpenNews={() => setShowNews(true)} />

        <PriceRow company={company} />

        <RiskRow company={company} />

        <div className="my-4 border-t border-white/10" />

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
