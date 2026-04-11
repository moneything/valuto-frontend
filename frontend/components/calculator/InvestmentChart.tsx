"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface InvestmentChartProps {
  monthlyInvestment: number;
  initialInvestment: number;
  annualReturn: number;
  years: number;
  inflationOn: boolean;
  advancedMode: boolean;
  volatility: number;
}

export default function InvestmentChart({
  monthlyInvestment,
  initialInvestment,
  annualReturn,
  years,
  inflationOn,
  advancedMode,
  volatility,
}: InvestmentChartProps) {
  const data = useMemo(() => {
    const points: Array<{
      year: number;
      invested: number;
      value: number;
      inflationAdjusted: number;
    }> = [];

    let seed = 42;
    const seededRandom = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    let currentValue = initialInvestment;
    const inflationRate = 0.03;

    for (let year = 0; year <= years; year += 1) {
      const totalInvested = initialInvestment + monthlyInvestment * 12 * year;

      if (year > 0) {
        let effectiveReturn = annualReturn / 100;

        if (advancedMode && volatility > 0) {
          const noise = (seededRandom() - 0.5) * 2 * (volatility / 100) * 0.5;
          effectiveReturn += noise;
        }

        for (let month = 0; month < 12; month += 1) {
          currentValue = currentValue * (1 + effectiveReturn / 12) + monthlyInvestment;
        }
      }

      const inflationFactor = Math.pow(1 - inflationRate, year);

      points.push({
        year,
        invested: Math.round(totalInvested),
        value: Math.round(currentValue),
        inflationAdjusted: Math.round(currentValue * inflationFactor),
      });
    }

    return points;
  }, [monthlyInvestment, initialInvestment, annualReturn, years, advancedMode, volatility]);

  const formatCurrency = (input: number) => {
    if (input >= 1000000) return `£${(input / 1000000).toFixed(1)}M`;
    if (input >= 1000) return `£${(input / 1000).toFixed(0)}k`;
    return `£${input}`;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: number;
  }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-lg border border-white/10 bg-[#101816]/95 p-3 text-sm backdrop-blur-xl">
        <p className="font-semibold text-white">Year {label}</p>
        <p className="text-[#36d67d]">Value: {formatCurrency(payload[0]?.value || 0)}</p>
        <p className="text-[#8b9791]">Invested: {formatCurrency(payload[1]?.value || 0)}</p>
        {inflationOn && payload[2] ? (
          <p className="text-[#f0b342]">Inflation-adj: {formatCurrency(payload[2]?.value || 0)}</p>
        ) : null}
      </div>
    );
  };

  return (
    <motion.div
      className="relative h-[300px] w-full sm:h-[400px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, hsl(152 75% 48% / 0.3), transparent 70%)",
        }}
      />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(152, 75%, 48%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(152, 75%, 48%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(220, 15%, 40%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(220, 15%, 40%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="inflationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(42, 90%, 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(42, 90%, 55%)" stopOpacity={0} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
            tickFormatter={(value) => `${value}y`}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
            tickFormatter={formatCurrency}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(152, 75%, 48%)"
            strokeWidth={2.5}
            fill="url(#valueGradient)"
            filter="url(#glow)"
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="invested"
            stroke="hsl(220, 15%, 35%)"
            strokeWidth={1.5}
            fill="url(#investedGradient)"
            strokeDasharray="4 4"
            animationDuration={800}
          />
          {inflationOn ? (
            <Area
              type="monotone"
              dataKey="inflationAdjusted"
              stroke="hsl(42, 90%, 55%)"
              strokeWidth={1.5}
              fill="url(#inflationGradient)"
              strokeDasharray="6 3"
              animationDuration={800}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
