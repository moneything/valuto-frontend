"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { YearSnapshot } from "@/components/build-your-life/types";

interface Props {
  history: YearSnapshot[];
}

export default function NetWorthChart({ history }: Props) {
  const data = history.map((item) => ({
    age: item.age,
    netWorth: item.netWorth,
    savings: item.savings,
    investments: item.investments,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="buildLifeEmerald" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(152, 85%, 45%)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(152, 85%, 45%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="buildLifeGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45, 90%, 55%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(45, 90%, 55%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="age"
          stroke="hsl(160, 8%, 52%)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(160, 8%, 52%)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(160, 24%, 8%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            color: "hsl(0, 0%, 95%)",
            fontSize: "12px",
          }}
          formatter={(value, name) => [
            `£${Number(value ?? 0).toLocaleString()}`,
            name === "netWorth" ? "Net Worth" : name === "investments" ? "Investments" : "Savings",
          ]}
        />
        <Area type="monotone" dataKey="netWorth" stroke="hsl(152, 85%, 45%)" fill="url(#buildLifeEmerald)" strokeWidth={2} />
        <Area type="monotone" dataKey="investments" stroke="hsl(45, 90%, 55%)" fill="url(#buildLifeGold)" strokeWidth={1.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
