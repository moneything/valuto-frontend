"use client";

import AvatarPreview from "@/components/build-your-life/AvatarPreview";
import NetWorthChart from "@/components/build-your-life/NetWorthChart";
import ProgressBar from "@/components/build-your-life/ProgressBar";
import StatCard from "@/components/build-your-life/StatCard";
import { GameState } from "@/components/build-your-life/types";

interface Props {
  state: GameState;
}

const TRAIT_LABELS: Record<string, string> = {
  "risk-taker": "Risk Taker",
  "careful-saver": "Saver",
  entrepreneurial: "Entrepreneur",
  "big-spender": "Spender",
  "strategic-thinker": "Strategist",
};

export default function LifeDashboard({ state }: Props) {
  const formatMoney = (value: number) => (value < 0 ? `-£${Math.abs(value).toLocaleString()}` : `£${value.toLocaleString()}`);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-[rgba(27,31,39,0.94)] px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {state.avatar ? (
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1B1F27]">
              <AvatarPreview config={state.avatar} size={40} />
            </div>
          ) : null}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-emerald-300">{state.age}</span>
              <span className="text-sm text-[#94a8a0]">years old</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {state.traits.map((trait) => (
                <span key={trait} className="rounded-full bg-[#1B1F27] px-1.5 py-0.5 text-[10px] text-[#a6b7b0]">
                  {TRAIT_LABELS[trait] || trait}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-sm text-[#94a8a0]">
            {state.careerTitle} • {state.housing} • {state.lifestyle}
          </div>
          <div className="flex items-center justify-end gap-2 text-xs text-[#94a8a0]">
            {state.relationshipStatus !== "single" ? <span className="text-emerald-300">Relationship: {state.relationshipStatus}</span> : null}
            {state.socialPressure > 30 ? <span className="text-rose-300">Pressure: {state.socialPressure}%</span> : null}
            <span className="text-amber-300">Score: {state.lifeScore}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon="💰" label="Net Worth" value={formatMoney(state.netWorth)} color={state.netWorth >= 0 ? "emerald" : "red"} delay={0} />
        <StatCard icon="💼" label="Salary" value={formatMoney(state.salary + state.partnerIncome)} color="emerald" delay={0.05} />
        <StatCard icon="🏦" label="Savings" value={formatMoney(state.savings)} delay={0.1} />
        <StatCard icon="📈" label="Investments" value={formatMoney(state.investments)} color="gold" delay={0.15} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/8 bg-[rgba(27,31,39,0.94)] p-3 backdrop-blur-xl">
          <div className="mb-2 flex justify-between font-display text-xs uppercase tracking-wider text-[#94a8a0]">
            <span>Happiness</span>
            <span>{state.happiness}%</span>
          </div>
          <ProgressBar value={state.happiness} variant="happiness" />
        </div>
        <div className="rounded-lg border border-white/8 bg-[rgba(27,31,39,0.94)] p-3 backdrop-blur-xl">
          <div className="mb-2 flex justify-between font-display text-xs uppercase tracking-wider text-[#94a8a0]">
            <span>Stress</span>
            <span>{state.stress}%</span>
          </div>
          <ProgressBar value={state.stress} variant="stress" />
        </div>
      </div>

      {state.history.length > 1 ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(27,31,39,0.94)] p-4 backdrop-blur-xl">
          <h3 className="mb-3 font-display text-xs uppercase tracking-widest text-[#94a8a0]">Net Worth Over Time</h3>
          <NetWorthChart history={state.history} />
        </div>
      ) : null}
    </div>
  );
}
