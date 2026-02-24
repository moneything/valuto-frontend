"use client";

import AnimatedSection from "./AnimatedSection";
import Button from "./theme/Button";

export default function SimplePricing() {
    
  return (
    <section id="simple-pricing" className="py-24 section-light">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wide">Simple pricing</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">Only £1/month</h2>
            <p className="text-muted-foreground mb-8">Less than a chocolate bar. Everything included.</p>
            <div className="card-elevated p-8 text-left">
              <div className="text-center mb-6">
                <span className="text-5xl font-display font-bold gradient-text">£1</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "All learning modules", "Investment simulator", "Investment calculator",
                  "Trivia games & challenges", "Leaderboards", "Future You simulator",
                  "Ask Valuto AI", "Financial news feed", "Achievements & badges",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full hover:bg-emerald-500" size="md">Start for £1/month</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
  );
}

