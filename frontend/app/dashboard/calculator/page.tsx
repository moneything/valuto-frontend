// frontend/app/dashboard/calculator/page.tsx (or your current path)
// "use client" must be at top for hooks.
"use client";

import { useMemo, useState } from "react";
import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";
import Button from "@/components/theme/Button";
import { CalculatorIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TabKey = "compound" | "retirement" | "goal";

export default function InvestmentCalculatorPage() {
  // -------------------- UI State --------------------
  const [activeTab, setActiveTab] = useState<TabKey>("compound");
  const [tip, setTip] = useState<string | null>(null);

  // -------------------- Inputs ----------------------
  // Compound Interest
  const [compound, setCompound] = useState({
    principal: 1000,
    monthlyContribution: 100,
    annualRate: 7,
    years: 10,
  });

  // Retirement
  const [retirement, setRetirement] = useState({
    currentAge: 18,
    retirementAge: 65,
    currentSavings: 0,
    monthlyContribution: 200,
    expectedReturn: 7,
    inflationRate: 3,
  });

  // Goal
  const [goal, setGoal] = useState({
    targetAmount: 10000,
    timeframe: 5,
    expectedReturn: 7,
    initialAmount: 500,
  });

  // -------------------- Calculations ----------------
  const compoundResults = useMemo(() => {
    const { principal, monthlyContribution, annualRate, years } = compound;
    const r = (annualRate / 100) / 12;
    const n = Math.max(0, years) * 12;

    const principalFV = principal * Math.pow(1 + r, n);
    const contributionsFV = r === 0
      ? monthlyContribution * n
      : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    const totalValue = principalFV + contributionsFV;
    const totalContributions = principal + monthlyContribution * n;
    const totalGrowth = Math.max(0, totalValue - totalContributions);
    const growthPct = totalContributions > 0 ? Math.round((totalGrowth / totalContributions) * 100) : 0;

    return {
      totalValue: Math.round(totalValue),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      growthPct,
      barPct: totalValue > 0 ? (totalContributions / totalValue) * 100 : 0,
    };
  }, [compound]);

  const retirementResults = useMemo(() => {
    const {
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      inflationRate,
    } = retirement;

    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const r = (expectedReturn / 100) / 12;
    const n = yearsToRetirement * 12;

    const currentSavingsFV = currentSavings * Math.pow(1 + r, n);
    const contributionsFV = r === 0
      ? monthlyContribution * n
      : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    const totalFund = currentSavingsFV + contributionsFV;
    const monthlyIncome = (totalFund * 0.04) / 12;
    const realValue = totalFund / Math.pow(1 + inflationRate / 100, yearsToRetirement);

    return {
      totalFund: Math.round(totalFund),
      monthlyIncome: Math.round(monthlyIncome),
      realValue: Math.round(realValue),
      yearsToRetirement,
    };
  }, [retirement]);

  const goalResults = useMemo(() => {
    const { targetAmount, timeframe, expectedReturn, initialAmount } = goal;
    const r = (expectedReturn / 100) / 12;
    const n = Math.max(0, timeframe) * 12;

    const factor = Math.pow(1 + r, n);
    const initialAmountFV = initialAmount * factor;
    const remaining = Math.max(0, targetAmount - initialAmountFV);

    const monthlyPayment = r === 0
      ? remaining / n
      : remaining / ((factor - 1) / r);

    const totalContributions = initialAmount + (monthlyPayment * n);
    return {
      monthlyPayment: Math.round(Math.max(0, monthlyPayment || 0)),
      totalContributions: Math.round(Math.max(0, totalContributions)),
      interestEarned: Math.round(Math.max(0, targetAmount - totalContributions)),
    };
  }, [goal]);

  // -------------------- Tips ------------------------
  const tips: Record<TabKey, string[]> = {
    compound: [
      "Start early—time in the market is your biggest ally.",
      "Increase your monthly contribution by 1–2% each year.",
      "Stay the course; avoid panic selling during dips.",
      "Use tax-advantaged accounts (e.g. ISA) when possible.",
    ],
    retirement: [
      "Aim to cover 70–80% of pre-retirement income.",
      "The 4% rule: withdraw ~4% yearly to help preserve capital.",
      "Inflation matters—plan with 2–3% per year.",
      "Consistency beats intensity—invest every month.",
    ],
    goal: [
      "Set SMART goals: specific, measurable, achievable, relevant, time-bound.",
      "Automate transfers so saving happens on autopilot.",
      "Review & adjust annually as circumstances change.",
      "Break big goals into milestones to stay motivated.",
    ],
  };

  const handleGetTip = () => {
    const arr = tips[activeTab];
    const random = arr[Math.floor(Math.random() * arr.length)];
    setTip(random);
    // Hide after a while
    setTimeout(() => setTip(null), 5000);
  };

  // -------------------- Helpers ---------------------
  const fmtGBP = (v: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(isFinite(v) ? v : 0);

  const inputClassName =
    "border-white/10 bg-white/[0.04] text-white placeholder:text-[#6f6f73] focus-visible:ring-valuto-green-600 focus-visible:ring-offset-0";

  const labelClassName = "text-[#d7d7db]";

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm font-semibold text-[#d7d7db]">
      {children}
    </span>
  );

  const TabButton = ({ value, label, icon }: { value: TabKey; label: string; icon: React.ReactNode }) => {
    const active = activeTab === value;
    return (
      <button
        onClick={() => setActiveTab(value)}
        className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition
          ${active ? "border-valuto-green-500/30 bg-valuto-green-500/10 text-valuto-green-300 shadow-[0_0_25px_rgba(34,197,94,0.10)]" : "border-white/10 bg-white/[0.03] text-[#d7d7db] hover:bg-white/[0.06]"}`}
      >
        {icon}
        {label}
      </button>
    );
  };

  // -------------------- UI --------------------------
  return (
    <PageLayout
      title="Investment Calculator"
      subtitle="Plan your financial future with smart calculations"
      icon={<CalculatorIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Header banner with Get Tip */}
      <Card className="mb-6 border border-valuto-green-500/20 bg-gradient-to-r from-[#163126] to-[#1d3a2d] text-white shadow-[0_0_30px_rgba(34,197,94,0.10)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Investment Calculator</h1>
            <p className="text-white/80">Plan your financial future with smart calculations</p>
          </div>
          <Button onClick={handleGetTip} variant="secondary" className="bg-white/15 hover:bg-white/25 text-white">
            💡 Get Tip
          </Button>
        </div>
        {tip && (
          <div className="mt-4 rounded-lg bg-white/10 px-4 py-3 text-sm">
            {tip}
          </div>
        )}
      </Card>

      {/* How to Use */}
      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-emerald-400 text-xl">📖</span>
          <h2 className="text-xl font-semibold">How to Use This Calculator Properly</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 font-bold">1</div>
            <div>
              <div className="font-medium text-sm">Be Realistic</div>
              <p className="text-sm text-[#9a9a9d]">
                Use conservative returns (5–8% for stocks, 2–4% for bonds). Markets fluctuate—don’t assume constant high returns.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 font-bold">2</div>
            <div>
              <div className="font-medium text-sm">Account for Inflation</div>
              <p className="text-sm text-[#9a9a9d]">
                £1 today won’t buy the same in 20 years. Factor in ~2–3% annual inflation.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 font-bold">3</div>
            <div>
              <div className="font-medium text-sm">Start Small</div>
              <p className="text-sm text-[#9a9a9d]">
                Even £10–50/month compounds into meaningful wealth over time.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <TabButton value="compound" label="Compound Interest" icon={<span>📈</span>} />
          <TabButton value="retirement" label="Retirement" icon={<span>🐷</span>} />
          <TabButton value="goal" label="Savings Goal" icon={<span>🎯</span>} />
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "compound" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Inputs */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">💲</span>
              <h3 className="text-lg font-bold">Investment Details</h3>
            </div>
            <p className="text-sm text-[#9a9a9d] mb-4">
              Enter your investment parameters to see how compound interest works
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className={labelClassName}>Initial Investment (£)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={compound.principal}
                  onChange={(e) => setCompound({ ...compound, principal: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Monthly Contribution (£)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={compound.monthlyContribution}
                  onChange={(e) => setCompound({ ...compound, monthlyContribution: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Annual Return (%)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  step="0.1"
                  value={compound.annualRate}
                  onChange={(e) => setCompound({ ...compound, annualRate: Number(e.target.value) })}
                />
                <p className="text-sm text-[#6f6f73]">
                  Historical stock market average: 7–10%. Be conservative with estimates.
                </p>
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Investment Period (Years)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={compound.years}
                  onChange={(e) => setCompound({ ...compound, years: Number(e.target.value) })}
                />
              </div>
            </div>
          </Card>

          {/* Right: Results */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">📊</span>
              <h3 className="text-lg font-bold">Results</h3>
            </div>
            <p className="text-sm text-[#9a9a9d] mb-4">See how your money grows over time</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-300">{fmtGBP(compoundResults.totalValue)}</div>
                <div className="text-sm text-[#d7d7db] mt-1">Final Value</div>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-300">{fmtGBP(compoundResults.totalGrowth)}</div>
                <div className="text-sm text-[#d7d7db] mt-1">Interest Earned</div>
              </div>
            </div>

            {/* Progress (Your money vs interest) */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-sm text-[#d7d7db]">
                <span>Your Contributions: {fmtGBP(compoundResults.totalContributions)}</span>
                <span>Growth: {compoundResults.growthPct}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-emerald-600"
                  style={{ width: `${Math.min(100, Math.max(0, compoundResults.barPct))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#6f6f73]">
                <span>Your Money</span>
                <span>Interest Earned</span>
              </div>
            </div>

            {/* Inline “alert” */}
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-white/[0.04] p-3 text-sm text-[#d7d7db]">
              <span className="mt-0.5">✅</span>
              <p>
                Your money would grow by <strong>{fmtGBP(compoundResults.totalGrowth)}</strong> through compound
                interest — that’s <strong>{compoundResults.growthPct}%</strong> growth on your contributions!
              </p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "retirement" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400">📆</span>
              <h3 className="text-lg font-bold">Retirement Planning</h3>
            </div>
            <p className="text-sm text-[#9a9a9d] mb-4">Plan for a comfortable retirement starting today</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={labelClassName}>Current Age</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={retirement.currentAge}
                  onChange={(e) => setRetirement({ ...retirement, currentAge: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Retirement Age</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={retirement.retirementAge}
                  onChange={(e) => setRetirement({ ...retirement, retirementAge: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label className={labelClassName}>Current Savings (£)</Label>
              <Input
                className={inputClassName}
                type="number"
                value={retirement.currentSavings}
                onChange={(e) => setRetirement({ ...retirement, currentSavings: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label className={labelClassName}>Monthly Contribution (£)</Label>
              <Input
                className={inputClassName}
                type="number"
                value={retirement.monthlyContribution}
                onChange={(e) => setRetirement({ ...retirement, monthlyContribution: Number(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label className={labelClassName}>Expected Return (%)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  step="0.1"
                  value={retirement.expectedReturn}
                  onChange={(e) => setRetirement({ ...retirement, expectedReturn: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Inflation Rate (%)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  step="0.1"
                  value={retirement.inflationRate}
                  onChange={(e) => setRetirement({ ...retirement, inflationRate: Number(e.target.value) })}
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400">🐷</span>
              <h3 className="text-lg font-bold">Retirement Projections</h3>
            </div>
            <p className="text-sm text-[#9a9a9d] mb-4">Your estimated retirement fund and income</p>

            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-5 text-center">
              <div className="text-3xl font-bold text-amber-300">{fmtGBP(retirementResults.totalFund)}</div>
              <div className="text-sm text-[#d7d7db]">Total Retirement Fund</div>
              <div className="text-[11px] text-[#6f6f73] mt-1">
                In {retirementResults.yearsToRetirement} years
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                <div className="text-xl font-bold text-emerald-300">{fmtGBP(retirementResults.monthlyIncome)}</div>
                <div className="text-sm text-[#d7d7db]">Monthly Income</div>
                <div className="text-[11px] text-[#6f6f73]">(4% rule)</div>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4 text-center">
                <div className="text-xl font-bold text-blue-300">{fmtGBP(retirementResults.realValue)}</div>
                <div className="text-sm text-[#d7d7db]">Today's Value</div>
                <div className="text-[11px] text-[#6f6f73]">(inflation-adjusted)</div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-500/20 bg-white/[0.04] p-3 text-sm text-[#d7d7db]">
              <span className="mt-0.5">ℹ️</span>
              <p>
                Based on the 4% rule, you could withdraw <strong>{fmtGBP(retirementResults.monthlyIncome)}</strong> per
                month in retirement while helping to preserve your capital.
              </p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "goal" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-violet-400">🎯</span>
              <h3 className="text-lg font-bold">Savings Goal</h3>
            </div>
            <p className="text-sm text-[#9a9a9d] mb-4">Calculate how much to save monthly for your goal</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className={labelClassName}>Target Amount (£)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={goal.targetAmount}
                  onChange={(e) => setGoal({ ...goal, targetAmount: Number(e.target.value) })}
                />
                <p className="text-sm text-[#6f6f73]">e.g. £5,000 emergency fund, £20,000 house deposit</p>
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Timeframe (Years)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={goal.timeframe}
                  onChange={(e) => setGoal({ ...goal, timeframe: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Expected Return (%)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  step="0.1"
                  value={goal.expectedReturn}
                  onChange={(e) => setGoal({ ...goal, expectedReturn: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClassName}>Starting Amount (£)</Label>
                <Input
                  className={inputClassName}
                  type="number"
                  value={goal.initialAmount}
                  onChange={(e) => setGoal({ ...goal, initialAmount: Number(e.target.value) })}
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-violet-400">➡️</span>
              <h3 className="text-lg font-bold">Monthly Savings Required</h3>
            </div>
            <p className="text-sm text-[#9a9a9d] mb-4">Here's what you need to save each month</p>

            <div className="rounded-lg border border-violet-500/20 bg-violet-500/10 p-5 text-center">
              <div className="text-3xl font-bold text-violet-300">{fmtGBP(goalResults.monthlyPayment)}</div>
              <div className="text-sm text-[#d7d7db]">Per Month</div>
              <div className="text-[11px] text-[#6f6f73] mt-1">For {goal.timeframe} years</div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <span className="text-sm text-[#d7d7db]">Total Contributions</span>
                <span className="font-medium text-white">{fmtGBP(goalResults.totalContributions)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                <span className="text-sm text-[#d7d7db]">Interest Earned</span>
                <span className="font-medium text-emerald-300">{fmtGBP(goalResults.interestEarned)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
                <span className="text-sm font-medium text-[#d7d7db]">Final Amount</span>
                <span className="font-bold text-blue-300">{fmtGBP(goal.targetAmount)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-lg border border-violet-500/20 bg-white/[0.04] p-3 text-sm text-[#d7d7db]">
              <span className="mt-0.5">✅</span>
              <p>
                By saving <strong>{fmtGBP(goalResults.monthlyPayment)}</strong> monthly for {goal.timeframe} years,
                you'll reach <strong>{fmtGBP(goal.targetAmount)}</strong> with{" "}
                <strong>{fmtGBP(goalResults.interestEarned)}</strong> in interest!
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Historical Averages */}
      <Card className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-emerald-400">📈</span>
          <h3 className="text-lg font-bold">Historical Average Returns Reference</h3>
        </div>
        <p className="text-sm text-[#9a9a9d] mb-4">
          Use these long-term averages as guidance (past performance doesn’t guarantee future results).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RefCard title="S&P 500 (US Stocks)" tag="High Risk" value="~10%" tone="emerald">
            Historical average since 1926 (incl. dividends). High volatility but strong long-term growth.
          </RefCard>
          <RefCard title="FTSE 100 (UK Stocks)" tag="High Risk" value="~7–8%" tone="emerald">
            Historical average including dividends. UK’s largest 100 companies by market cap.
          </RefCard>
          <RefCard title="Global Index Funds" tag="Medium-High Risk" value="~7–9%" tone="emerald">
            Diversified across global markets. More stable than single-country investing.
          </RefCard>
          <RefCard title="UK Government Bonds" tag="Low Risk" value="~2–4%" tone="amber">
            Lower returns but more stable. Useful for conservative portfolios & emergencies.
          </RefCard>
          <RefCard title="High-Yield Savings" tag="Very Low Risk" value="~1–3%" tone="blue">
            Rates vary. FSCS protected up to £85k. Great for emergency funds.
          </RefCard>
          <RefCard title="Property (REITs)" tag="Medium Risk" value="~6–8%" tone="primary">
            Real-estate exposure without direct ownership.
          </RefCard>
        </div>

        <div className="mt-4 rounded-lg border border-amber-500/20 bg-white/[0.04] p-3 text-sm text-[#d7d7db]">
          <span className="mr-2">⚠️</span>
          <span>
            These are long-term averages (10+ years). Short-term returns vary. Consider using conservative estimates (5–7%) for planning.
          </span>
        </div>

        {/* Portfolio Allocation Examples */}
        <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <span>💡</span> Smart Portfolio Allocation Examples
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <AllocCard
              title="Conservative (Age 50+)"
              lines={["• 60% Bonds/Cash: ~3%", "• 40% Stocks: ~8%"]}
              overall="≈ 5.2% overall"
            />
            <AllocCard
              title="Balanced (Age 30–50)"
              lines={["• 40% Bonds/Cash: ~3%", "• 60% Stocks: ~8%"]}
              overall="≈ 6.0% overall"
            />
            <AllocCard
              title="Aggressive (Age 18–30)"
              lines={["• 20% Bonds/Cash: ~3%", "• 80% Stocks: ~8%"]}
              overall="≈ 7.0% overall"
            />
          </div>
        </div>
      </Card>

      {/* Key Principles */}
      <Card className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-emerald-400">🔑</span>
          <h3 className="text-lg font-bold">Key Investment Principles</h3>
        </div>
        <p className="text-sm text-[#9a9a9d] mb-4">Essential rules for successful long-term investing</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PrincipleCard title="Time in Market">
            Staying invested long-term beats timing the market. Through ups and downs, patience typically wins.
          </PrincipleCard>
          <PrincipleCard title="Diversification">
            Don’t put all eggs in one basket. Spread across assets, sectors, and regions to reduce risk.
          </PrincipleCard>
          <PrincipleCard title="Dollar-Cost Averaging">
            Invest the same amount regularly regardless of market conditions to reduce volatility impact.
          </PrincipleCard>
          <PrincipleCard title="Understand Risk">
            Higher potential returns come with higher risk. Don’t invest money you’ll need within 5 years.
          </PrincipleCard>
        </div>
      </Card>
    </PageLayout>
  );
}

/* ---------- Small presentational helpers (keep all in this file) ---------- */
function RefCard({
  title,
  tag,
  value,
  tone = "emerald",
  children,
}: {
  title: string;
  tag: string;
  value: string;
  tone?: "emerald" | "amber" | "blue" | "primary";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, string> = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    blue: "text-blue-300",
    primary: "text-valuto-green-300",
  };
  return (
    <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{title}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold text-[#d7d7db]">
          {tag}
        </span>
      </div>
      <div className={`text-2xl font-bold ${toneMap[tone]}`}>{value}</div>
      <p className="text-sm text-[#9a9a9d]">{children}</p>
    </div>
  );
}

function AllocCard({ title, lines, overall }: { title: string; lines: string[]; overall: string }) {
  return (
    <div className="space-y-1 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[#d7d7db]">
      <div className="font-medium text-white">{title}</div>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      <div className="font-semibold text-valuto-green-300">{overall}</div>
    </div>
  );
}

function PrincipleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2">
        <span className="text-valuto-green-300">•</span>
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <p className="text-sm text-[#9a9a9d]">{children}</p>
    </div>
  );
}
