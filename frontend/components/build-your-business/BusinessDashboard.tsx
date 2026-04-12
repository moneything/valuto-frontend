"use client";

import { Area, AreaChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { BUSINESS_LESSONS } from "@/components/build-your-business/data";
import { Card } from "@/components/build-your-business/ui";

export default function BusinessDashboard() {
  const { state } = useGame();
  const { metrics, metricsHistory } = state;

  const chartData = metricsHistory.map((item, index) => ({
    week: index + 1,
    revenue: item.weeklyRevenue,
    profit: item.weeklyRevenue - item.weeklyCosts,
    customers: item.customers,
  }));

  const statCards = [
    { label: "Total Revenue", value: `£${metrics.revenue.toLocaleString()}`, color: "text-emerald-300", icon: "💰" },
    { label: "Total Profit", value: `£${metrics.profit.toLocaleString()}`, color: metrics.profit >= 0 ? "text-emerald-300" : "text-rose-300", icon: "📈" },
    { label: "Cash Balance", value: `£${metrics.cash.toLocaleString()}`, color: metrics.cash >= 0 ? "text-white" : "text-rose-300", icon: "🏦" },
    { label: "Customers", value: metrics.customers.toString(), color: "text-white", icon: "👥" },
    { label: "Valuation", value: `£${metrics.valuation.toLocaleString()}`, color: "text-amber-300", icon: "💎" },
    { label: "Employees", value: state.employees.length.toString(), color: "text-white", icon: "🧑‍💼" },
  ];

  const bars = [
    { label: "Reputation", value: metrics.reputation, color: "bg-gradient-to-r from-emerald-400 to-emerald-500" },
    { label: "Satisfaction", value: metrics.satisfaction, color: "bg-gradient-to-r from-emerald-400 to-emerald-500" },
    { label: "Stress", value: metrics.stress, color: "bg-gradient-to-r from-amber-300 to-amber-400" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm">{card.icon}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#94a8a0]">{card.label}</span>
              </div>
              <span className={`font-display text-lg font-bold ${card.color}`}>{card.value}</span>
            </Card>
          </motion.div>
        ))}
      </div>

      {chartData.length > 1 ? (
        <Card>
          <h3 className="mb-3 font-display text-sm font-semibold text-white">Weekly Performance</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="businessRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 72%, 46%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152, 72%, 46%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(160, 8%, 60%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(160, 8%, 60%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(224, 18%, 18%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "11px" }}
                  labelStyle={{ color: "white" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(152, 72%, 46%)" fill="url(#businessRevGrad)" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="hsl(44, 92%, 55%)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 text-[10px] text-[#94a8a0]">
            <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-3 rounded bg-emerald-400" /> Revenue</span>
            <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-3 rounded bg-amber-300" /> Profit</span>
          </div>
        </Card>
      ) : null}

      <Card className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-[#94a8a0]">{bar.label}</span>
              <span className="font-display font-semibold text-white">{bar.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${bar.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${bar.value}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </Card>

      {state.lessons.length > 0 ? (
        <Card className="space-y-2">
          <h3 className="font-display text-sm font-semibold text-white">Lessons Learned</h3>
          {state.lessons.slice(-3).map((lesson, index) => (
            <div key={index} className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
              <p className="text-xs text-emerald-300">{BUSINESS_LESSONS[lesson] || lesson}</p>
            </div>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
