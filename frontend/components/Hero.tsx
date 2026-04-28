"use client";

import Image from "next/image";
import Button from "@/components/theme/Button";
import { BookOpen, Calculator, ChevronDown, Flame, Gamepad2, MessageCircle, Newspaper, Sparkles, Target, TrendingUp, Trophy } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Hero() {
  const features = [
    { icon: BookOpen, title: "Interactive Learning", desc: "Super cool modules that actually make finance fun — not boring textbook stuff." },
    { icon: Calculator, title: "Investment Calculator", desc: "State-of-the-art tools to plan your financial future." },
    { icon: TrendingUp, title: "Investment Simulator", desc: "Learn investing without risking real money." },
    { icon: Gamepad2, title: "Trivia Games", desc: "Test your money knowledge and challenge your mates." },
    { icon: Trophy, title: "Leaderboards", desc: "Compete with friends and climb the ranks." },
    { icon: Flame, title: "Daily and Weekly Challenges", desc: "Build real money habits through quick daily tasks and longer weekly goals." },
    { icon: Newspaper, title: "Financial News", desc: "All the news that impacts your future — explained simply." },
    { icon: Target, title: "Progress Tracking", desc: "See how far you've come and what's next." },
  ];

  const spicyFeatures = [
    {
      icon: Sparkles,
      title: '"Future You" Simulator',
      desc: "See how your money grows over time with interactive sliders for savings, investing, inflation, and compound interest.",
    },
    {
      icon: Flame,
      title: "Streaks + Achievements",
      desc: "Daily streaks, milestones, badges, and rewards to keep you coming back.",
    },
    {
      icon: MessageCircle,
      title: "Ask Valuto AI",
      desc: "A friendly helper that explains money simply. No judgement. No jargon.",
    },
  ];
  
  
  return (
    <>
    <section id="home" className="relative overflow-hidden section-dark text-white mt-[3.9rem] border-t-2 border-b-2 border-emerald-400/20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16)_0%,rgba(5,11,20,0.9)_52%,rgba(5,11,20,1)_100%)]" />
            <div className="absolute -right-24 top-1/2 h-[540px] w-[540px] -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
          </div>
      
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-8 lg:px-10 relative z-10 min-h-[88vh] flex items-center py-16 mb-12">
            <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full">
              <div className="animate-in fade-in slide-in-from-left-6 duration-700">
                <p className="text-valuto-green-500 font-semibold text-sm mb-7 tracking-wide uppercase">
                  The future of money education
                </p>
      
                <h1 className="text-6xl text-white leading-[0.98] tracking-[-0.02em] max-w-[27rem]">
                  Money should be taught.{" "}
                  <span className="gradient-text">
                    So we built Valuto.
                  </span>
                </h1>
      
                <p className="mt-8 text-xl text-slate-400 max-w-[42rem] leading-relaxed">
                  A modern, gamified finance platform built for young people, giving them the skills schools do not teach.
                </p>
      
                <div className="mt-8 flex ">
                  <SignedOut>
                    <a href="/auth" className="w-[-webkit-fill-available]">
                      <Button size="lg" className="text-base px-8 w-[-webkit-fill-available] text-white bg-green-500">
                        Start for £1/month
                      </Button>
                    </a>
                  </SignedOut>
                  
                  
                  <SignedIn>
                    <a href="/dashboard" className="w-[-webkit-fill-available]">
                      <Button
                        size="lg"
                        className="text-base px-8 bg-green-700 text-white  border border-valuto-green-300 w-[-webkit-fill-available]"
                      >
                        Go to Valuto
                      </Button>
                    </a>
                  </SignedIn>
                </div>
      
                <p className="mt-6 text-slate-400 text-md">Join the next generation of money-smart teens</p>
              </div>
      
              <div className="block animate-in fade-in slide-in-from-right-6 duration-700 delay-100">
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
      
          <ChevronDown size={40} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 text-3xl transition-transform group-open:rotate-180" />
          
        </section>

        {/* What you can do */}
          <section id="features" className="py-24 section-light pb-16">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-16">
                <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wide">Everything in one place</p>
                <h2 className="text-3xl font-display font-bold">What you can do inside Valuto</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">This app has everything you need to become money-smart.</p>
              </AnimatedSection>
              <div className="grid grid-cols-4 gap-6">
                {features.map((f, i) => (
                  <AnimatedSection key={f.title} delay={i * 0.05}>
                    <div className="feature-card h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <f.icon className="text-primary" size={24} />
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <div className="min-w-[-webkit-fill-available] flex items-center m-3 justify-center mt-8">
                <a href="/features">
                <Button variant="secondary" className="border-black !text-black">Learn More</Button>
                </a>
              </div>
            </div>
          </section>

      {/* Next-level features */}
        <section id="next-level-features" className="py-24 section-dark">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wide">🔥 Next-level features</p>
              <h2 className="text-4xl font-display font-bold text-hero-foreground">Built different</h2>
            </AnimatedSection>
            <div className="grid grid-cols-3 gap-8">
              {spicyFeatures.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 0.1}>
                  <div className="bg-hero/50 border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <f.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-3 text-hero-foreground">{f.title}</h3>
                    <p className="text-hero-muted leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
