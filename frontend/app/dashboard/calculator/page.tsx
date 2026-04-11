"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Settings2, TrendingUp, Zap } from "lucide-react";
import ControlSlider from "@/components/calculator/ControlSlider";
import EducationalPanel from "@/components/calculator/EducationalPanel";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import ParticleBackground from "@/components/calculator/ParticleBackground";
import ResultsPanel from "@/components/calculator/ResultsPanel";

export default function InvestmentCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(200);
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(20);
  const [inflationOn, setInflationOn] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [volatility, setVolatility] = useState(0);

  const results = useMemo(() => {
    const totalInvested = initialInvestment + monthlyInvestment * 12 * years;
    let currentValue = initialInvestment;
    const monthlyRate = annualReturn / 100 / 12;

    for (let month = 0; month < years * 12; month += 1) {
      currentValue = currentValue * (1 + monthlyRate) + monthlyInvestment;
    }

    const totalValue = Math.round(currentValue);
    const totalGrowth = totalValue - totalInvested;
    const simpleGrowth = totalInvested * (annualReturn / 100) * years;
    const compoundingGain = Math.round(totalGrowth - simpleGrowth);
    const inflationAdjusted = inflationOn
      ? Math.round(totalValue * Math.pow(0.97, years))
      : null;

    return { totalInvested, totalValue, totalGrowth, compoundingGain, inflationAdjusted };
  }, [monthlyInvestment, initialInvestment, annualReturn, years, inflationOn]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07110d] text-white">
      <ParticleBackground />

      <div
        className="fixed right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(152 75% 48%), transparent)" }}
      />
      <div
        className="fixed bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(42 90% 55%), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-4 py-8 sm:py-16">
        <motion.header
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#36d67d] sm:text-sm">
            <Zap className="h-4 w-4" />
            Valuto Investment Calculator
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
            Watch Your Money <span className="text-[#36d67d] drop-shadow-[0_0_18px_rgba(54,214,125,0.35)]">Grow.</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-[#9ca8a2]">
            See what smart investing can do over time.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[28px] border border-white/10 bg-[#0f1613]/80 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6"
        >
          <InvestmentChart
            monthlyInvestment={monthlyInvestment}
            initialInvestment={initialInvestment}
            annualReturn={annualReturn}
            years={years}
            inflationOn={inflationOn}
            advancedMode={advancedMode}
            volatility={volatility}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ResultsPanel {...results} />
        </motion.section>

        <motion.section
          className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#36d67d]" />
              <h2 className="text-lg font-semibold text-white">Controls</h2>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setInflationOn(!inflationOn)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  inflationOn
                    ? "border-[#f0b342]/40 text-[#f0b342] shadow-[0_0_24px_rgba(240,179,66,0.14)]"
                    : "border-white/10 text-[#8b9791] hover:text-white"
                }`}
              >
                {inflationOn ? "Inflation ON" : "Inflation OFF"}
              </button>

              <button
                onClick={() => setAdvancedMode(!advancedMode)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  advancedMode
                    ? "border-[#36d67d]/40 text-[#36d67d] shadow-[0_0_24px_rgba(54,214,125,0.14)]"
                    : "border-white/10 text-[#8b9791] hover:text-white"
                }`}
              >
                <Settings2 className="h-3.5 w-3.5" />
                Advanced
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ControlSlider
              label="Monthly Investment"
              value={monthlyInvestment}
              min={25}
              max={5000}
              step={25}
              prefix="£"
              onChange={setMonthlyInvestment}
            />
            <ControlSlider
              label="Initial Investment"
              value={initialInvestment}
              min={0}
              max={100000}
              step={500}
              prefix="£"
              onChange={setInitialInvestment}
            />
            <ControlSlider
              label="Annual Return"
              value={annualReturn}
              min={1}
              max={20}
              step={0.5}
              suffix="%"
              onChange={setAnnualReturn}
            />
            <ControlSlider
              label="Time Horizon"
              value={years}
              min={1}
              max={50}
              step={1}
              suffix=" yrs"
              onChange={setYears}
            />
          </div>

          {advancedMode ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 border-t border-white/10 pt-4"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8b9791]">
                Advanced Settings
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <ControlSlider
                  label="Market Volatility"
                  value={volatility}
                  min={0}
                  max={50}
                  step={5}
                  suffix="%"
                  onChange={setVolatility}
                />
              </div>
            </motion.div>
          ) : null}
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-[28px] border border-white/10 bg-[#0f1613]/70 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <EducationalPanel />
        </motion.section>

        <motion.footer
          className="py-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-[#8b9791]">
            Powered by <span className="font-semibold text-[#36d67d]">Valuto</span>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
