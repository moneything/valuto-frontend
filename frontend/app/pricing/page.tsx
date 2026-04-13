"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/theme/Button";
import {ChevronDown } from "lucide-react";


export default function Features() {
  const included = [
    "All interactive learning modules",
    "Investment simulator",
    "Investment calculator",
    "Trivia games & daily and weekly challenges",
    "Leaderboards",
    "\"Future You\" simulator",
    "Ask Valuto AI",
    "Financial news feed",
    "Progress tracking",
    "Achievements, badges & rewards",
    "Completion milestones",
    "All future updates",
  ];
  
  const faqs = [
    { q: "Is there a free trial?", a: "We keep things simple — £1/month with no contracts. Cancel anytime." },
    { q: "Are there any hidden costs?", a: "None. £1/month gets you everything. No upsells, no premium tiers." },
    { q: "Can I cancel anytime?", a: "Absolutely. No lock-in, no cancellation fees. We want you here because you love it." },
    { q: "Is it safe for my child?", a: "Yes. No real money is ever used. All content is age-appropriate and designed for 11–18 year olds." },
    { q: "Can schools get bulk access?", a: "Yes! Contact us for school and partnership pricing." },
  ];
  return (
    <>
    <Header />

    <section className="section-dark py-32">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-md mb-4 uppercase tracking-wide">Pricing</p>
            <h1 className="text-5xl font-display font-bold text-hero-foreground mb-4">
              One plan. <span className="gradient-text">Everything included.</span>
            </h1>
            <p className="text-hero-muted text-lg">Less than a chocolate bar per month.</p>
          </AnimatedSection>
        </div>
      </section>
    
      <section className="py-24 section-light">
        <div className="container mx-auto px-4 max-w-lg">
          <AnimatedSection>
            <div className="card-elevated p-10">
              <div className="text-center mb-8">
                <span className="text-6xl font-display font-bold gradient-text">£1</span>
                <span className="text-muted-foreground text-lg">/month</span>
                <p className="text-muted-foreground text-md mt-2">No contracts. Cancel anytime.</p>
              </div>
              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-md">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="lg">Start for £1/month</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    
      {/* FAQ */}
      <section className="py-24 section-dark">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-hero-foreground">FAQ</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group bg-hero/50 border border-primary/10 rounded-xl p-6 cursor-pointer">
                  <summary className="font-display font-semibold text-hero-foreground list-none flex justify-between items-center">
                    {faq.q}
                    <ChevronDown size={20} className="text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-hero-muted leading-relaxed text-md">{faq.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    <Footer />
    </>
  );
}
