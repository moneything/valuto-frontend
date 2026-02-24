"use client";

import AnimatedSection from "./AnimatedSection";
import { Star } from "lucide-react";

export default function WhatPeopleSay() {
  const testimonials = [
      { name: "Amara, 16", role: "Student", text: "Valuto made me actually understand how investing works. I wish we had this in school!" },
      { name: "David R.", role: "Parent", text: "My daughter talks about compound interest at dinner now. Worth every penny of that £1." },
      { name: "Ms. Patel", role: "Teacher", text: "I recommend Valuto to all my students. It fills a massive gap in the curriculum." },
    ];
    
  return (
    <section id="what-people-say" className="py-24 section-dark">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wide">⭐ What people say</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-hero-foreground">Loved by students, parents & teachers</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="bg-hero/50 border border-primary/10 rounded-2xl p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-hero-muted leading-relaxed mb-6">"{t.text}"</p>
                  <div>
                    <p className="font-display font-semibold text-hero-foreground">{t.name}</p>
                    <p className="text-primary text-sm">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
  );
}

