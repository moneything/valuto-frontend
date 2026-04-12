"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { Card, GameButton } from "@/components/build-your-business/ui";

export default function Stage3Pricing() {
  const { state, setPricing, setStage } = useGame();
  const idea = state.selectedIdea!;

  const suggestedPrice = Math.round(idea.startingCost * 0.05 + 10);
  const suggestedCost = Math.round(suggestedPrice * 0.4);

  const [price, setPrice] = useState(state.pricePoint || suggestedPrice);
  const [cost, setCost] = useState(state.productionCost || suggestedCost);

  const margin = useMemo(() => (price > 0 ? ((price - cost) / price) * 100 : 0), [price, cost]);
  const breakEvenCustomers = useMemo(() => (price > cost ? Math.ceil(idea.startingCost / (price - cost)) : Infinity), [price, cost, idea]);
  const weeklyProjection = useMemo(() => Math.round((price - cost) * (idea.marketDemand / 10)), [price, cost, idea]);

  const handleContinue = () => {
    setPricing(price, cost);
    setStage(4);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2 text-center">
        <span className="text-3xl">💷</span>
        <h2 className="font-display text-2xl font-bold text-white">Pricing & Costs</h2>
        <p className="text-sm text-[#94a8a0]">Small pricing decisions make huge differences to your profit.</p>
      </div>

      <Card className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="font-display text-sm font-medium text-white">Product Price</label>
            <span className="font-display text-lg font-bold text-emerald-300">£{price}</span>
          </div>
          <input type="range" min={1} max={100} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400" />
          <div className="mt-1 flex justify-between text-[10px] text-[#94a8a0]">
            <span>£1 (Budget)</span>
            <span>£100 (Premium)</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="font-display text-sm font-medium text-white">Production Cost</label>
            <span className="font-display text-lg font-bold text-amber-300">£{cost}</span>
          </div>
          <input type="range" min={0} max={80} value={cost} onChange={(e) => setCost(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400" />
          <div className="mt-1 flex justify-between text-[10px] text-[#94a8a0]">
            <span>£0 (Digital/Free)</span>
            <span>£80 (Premium Materials)</span>
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="font-display text-sm font-semibold text-white">Revenue Projections</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-white/[0.04] p-3 text-center">
            <span className={`font-display text-lg font-bold ${margin > 30 ? "text-emerald-300" : margin > 10 ? "text-amber-300" : "text-rose-300"}`}>
              {margin.toFixed(0)}%
            </span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Profit Margin</p>
          </div>
          <div className="rounded-lg bg-white/[0.04] p-3 text-center">
            <span className="font-display text-lg font-bold text-white">{breakEvenCustomers === Infinity ? "∞" : breakEvenCustomers}</span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Break-even Sales</p>
          </div>
          <div className="rounded-lg bg-white/[0.04] p-3 text-center">
            <span className={`font-display text-lg font-bold ${weeklyProjection > 0 ? "text-emerald-300" : "text-rose-300"}`}>£{weeklyProjection}</span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Weekly Profit Est.</p>
          </div>
          <div className="rounded-lg bg-white/[0.04] p-3 text-center">
            <span className="font-display text-lg font-bold text-white">£{price - cost}</span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Profit Per Sale</p>
          </div>
        </div>

        {margin < 15 ? (
          <div className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-3">
            <p className="text-xs font-medium text-rose-300">Low margins make scaling difficult. Consider raising your price or reducing costs.</p>
          </div>
        ) : null}
        {margin > 60 ? (
          <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
            <p className="text-xs font-medium text-emerald-300">Excellent margins. High margins give you room to invest in marketing and growth.</p>
          </div>
        ) : null}
        {price > cost && breakEvenCustomers < 50 ? (
          <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
            <p className="text-xs font-medium text-emerald-300">Quick break-even point. You will recover your startup costs within {breakEvenCustomers} sales.</p>
          </div>
        ) : null}
      </Card>

      <GameButton onClick={handleContinue} disabled={price <= cost}>
        {price <= cost ? "Price must be higher than cost" : "Build Your Business"}
      </GameButton>
    </motion.div>
  );
}
