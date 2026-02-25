"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/theme/Button";
import { SignedOut } from "@clerk/nextjs";
import { Award, BookOpen, Calculator, Flame, Gamepad2, GraduationCap, MessageCircle, Newspaper, Sparkles, Target, TrendingUp, Trophy } from "lucide-react";


export default function Features() {
    const allFeatures = [
      { icon: BookOpen, title: "Interactive Learning Modules", desc: "Bite-sized, gamified lessons that make finance genuinely exciting. No lectures, no textbooks." },
      { icon: Calculator, title: "Investment Calculator", desc: "Powerful tools to model your financial future. See what saving £5/week could turn into." },
      { icon: TrendingUp, title: "Investment Simulator", desc: "Practice investing with virtual money. Learn the ropes without the risk." },
      { icon: Gamepad2, title: "Trivia Games", desc: "Challenge yourself and friends with fun money quizzes. Learn while you compete." },
      { icon: Trophy, title: "Leaderboards", desc: "Climb the ranks, beat your mates, and prove you're the money master." },
      { icon: Flame, title: "Daily Challenges", desc: "Quick daily tasks that build real financial habits over time." },
      { icon: Sparkles, title: '"Future You" Simulator', desc: "Visualise your financial future with interactive sliders for savings, investing, and compound interest." },
      { icon: MessageCircle, title: "Ask Valuto AI", desc: "Your personal finance helper. Ask anything — get simple, jargon-free answers." },
      { icon: Newspaper, title: "Financial News Feed", desc: "All the financial news that matters to you, explained in plain English." },
      { icon: Target, title: "Progress Tracking", desc: "See exactly where you are in your learning journey and what's next." },
      { icon: Award, title: "Achievements & Rewards", desc: "Earn badges, unlock milestones, and celebrate your wins." },
      { icon: GraduationCap, title: "Completion Milestones", desc: "Finish modules, earn certificates, and prove your skills." },
    ];
  return (
    <>
    <Header />
    
        <section className="section-dark py-24 lg:py-32">
            <div className="container mx-auto px-4 text-center">
              <AnimatedSection>
                <p className="text-primary font-semibold text-md mb-4 uppercase tracking-wide">Features</p>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-hero-foreground mb-4">
                  Everything you need to get <span className="gradient-text">money-smart</span>
                </h1>
                <p className="text-hero-muted max-w-2xl mx-auto text-lg">Packed with tools, games, and AI — Valuto is the most complete money education platform for young people.</p>
              </AnimatedSection>
            </div>
          </section>
        
          <section className="py-24 section-light">
            <div className="container mx-auto px-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allFeatures.map((f, i) => (
                  <AnimatedSection key={f.title} delay={i * 0.04}>
                    <div className="feature-card h-full">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                        <f.icon className="text-primary" size={28} />
                      </div>
                      <h3 className="font-display font-semibold text-xl mb-3">{f.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection className="text-center mt-16">
                
                <SignedOut>
                    <a href="/auth" className="hidden md:block">
                      <Button size="md">Start for £1/month</Button>
                    </a>
                  </SignedOut>
              </AnimatedSection>
            </div>
          </section>

              <Footer />
    </>
  );
}

