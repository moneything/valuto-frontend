"use client";

import { SignedOut } from "@clerk/nextjs";
import AnimatedSection from "./AnimatedSection";
import Button from "./theme/Button";

export default function SimplePricing() {
    
  return (
    <section id="simple-pricing" className="py-24 section-light">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-md mb-2 uppercase tracking-wide">Simple pricing</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">Only £1/month</h2>
            <p className="text-muted-foreground mb-8">Less than a chocolate bar. Everything included.</p>
            <div className="card-elevated p-8 text-left">
              <div className="text-center mb-6">
                <span className="text-5xl font-display font-bold gradient-text">£1</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 w-fit justify-self-center">
                {[
                  "All learning modules", "Investment simulator", "Investment calculator",
                  "Trivia games & challenges", "Leaderboards", "Future You simulator",
                  "Ask Valuto AI", "Financial news feed", "Achievements & badges",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-md">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-4">
                <SignedOut>
                    <a href="/auth" className="">
                      <Button size="md" className="w-[-webkit-fill-available] text-base hover:bg-emerald-500">Start for £1/month</Button>
                    </a>
                  </SignedOut>
                  <a href="/pricing" className="">
                    <Button variant="secondary" size="md" className="w-[-webkit-fill-available]">Learn More</Button>
                  </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
  );
}

