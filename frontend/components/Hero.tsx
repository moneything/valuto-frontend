"use client";

import Image from "next/image";
import Button from "@/components/theme/Button";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#050b14] text-white mt-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16)_0%,rgba(5,11,20,0.9)_52%,rgba(5,11,20,1)_100%)]" />
        <div className="absolute -right-24 top-1/2 h-[540px] w-[540px] -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-8 lg:px-10 relative z-10 min-h-[88vh] flex items-center py-16">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full">
          <div className="animate-in fade-in slide-in-from-left-6 duration-700">
            <p className="text-valuto-green-500 font-semibold text-sm mb-7 tracking-wide uppercase">
              The future of money education
            </p>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[0.98] tracking-[-0.02em]">
              Money should be taught.{" "}
              <span className="text-valuto-green-400">
                So we built Valuto.
              </span>
            </h1>

            <p className="mt-8 text-2xl text-slate-400 max-w-[42rem] leading-relaxed">
              A modern, gamified finance platform built for young people, giving them the skills schools do not teach.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="text-base px-8">
                Start for £1/month
              </Button>
              <Button
                size="lg"
                className="text-base px-8 bg-white text-valuto-green-600 hover:bg-gray-100 border border-valuto-green-300"
              >
                Go to Valuto
              </Button>
            </div>

            <p className="mt-6 text-slate-400 text-base sm:text-lg">Join the next generation of money-smart teens 🚀</p>
          </div>

          <div className="hidden lg:block animate-in fade-in slide-in-from-right-6 duration-700 delay-100">
            <div className="relative rounded-[28px] border border-emerald-400/20 bg-[#070d1c]/90 p-2 shadow-[0_0_120px_rgba(16,185,129,0.35)]">
              <Image
                src="/study2.png"
                alt="Valuto platform"
                width={1400}
                height={880}
                className="relative rounded-3xl shadow-2xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 text-3xl">⌄</div>
    </section>
  );
}
