"use client";

import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[rgba(27,31,39,0.96)] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GameButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-3 font-display text-sm font-bold text-[#08110d] shadow-[0_0_24px_rgba(16,185,129,0.26)] transition disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GoldButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full rounded-xl bg-gradient-to-r from-amber-300 to-amber-400 px-4 py-3 font-display text-sm font-bold text-[#1f1403] shadow-[0_0_20px_rgba(245,158,11,0.2)] transition disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
