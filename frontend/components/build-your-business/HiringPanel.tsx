"use client";

import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { AVAILABLE_EMPLOYEES } from "@/components/build-your-business/data";
import { Card, GameButton } from "@/components/build-your-business/ui";

export default function HiringPanel() {
  const { state, hireEmployee, fireEmployee } = useGame();

  const available = AVAILABLE_EMPLOYEES.filter((employee) => !state.employees.find((current) => current.id === employee.id));
  const totalPayroll = state.employees.reduce((sum, employee) => sum + employee.cost, 0);

  return (
    <div className="space-y-4">
      {state.employees.length > 0 ? (
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-white">Your Team</h3>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-[#94a8a0]">£{totalPayroll}/wk payroll</span>
          </div>
          {state.employees.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between rounded-lg bg-white/[0.04] p-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{employee.avatar}</span>
                <div>
                  <span className="font-display text-sm font-medium text-white">{employee.name}</span>
                  <p className="text-[10px] text-[#94a8a0]">{employee.role} • {employee.experience}</p>
                </div>
              </div>
              <button
                onClick={() => fireEmployee(employee.id)}
                className="rounded bg-rose-300/10 px-2 py-1 text-[10px] font-medium text-rose-300"
              >
                Remove
              </button>
            </div>
          ))}
        </Card>
      ) : null}

      <Card className="space-y-3">
        <h3 className="font-display text-sm font-semibold text-white">Available Candidates</h3>
        {available.length === 0 ? (
          <p className="py-4 text-center text-xs text-[#94a8a0]">No more candidates available right now.</p>
        ) : (
          available.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg bg-white/[0.04] p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{employee.avatar}</span>
                  <div>
                    <span className="font-display text-sm font-medium text-white">{employee.name}</span>
                    <p className="text-[10px] text-[#94a8a0]">{employee.role}</p>
                  </div>
                </div>
                <span className="font-display text-xs font-bold text-amber-300">£{employee.cost}/wk</span>
              </div>
              <div className="mb-3 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <span className="text-[10px] text-[#94a8a0]">Productivity</span>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: `${employee.productivity}%` }} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-[#94a8a0]">Creativity</span>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-400" style={{ width: `${employee.creativity}%` }} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-[#94a8a0]">Experience</span>
                  <p className="mt-1 text-[10px] text-white capitalize">{employee.experience}</p>
                </div>
              </div>
              <GameButton className="py-2 text-xs" onClick={() => hireEmployee(employee)}>
                Hire {employee.name}
              </GameButton>
            </motion.div>
          ))
        )}
      </Card>
    </div>
  );
}
