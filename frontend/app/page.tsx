"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyWeExist from "@/components/WhyWeExist";
import WhatPeopleSay from "@/components/WhatWeDo";
import Footer from "@/components/Footer";
import AuroraShaders from "@/components/ui/shadcn-io/aurora-shaders";
import SimplePricing from "@/components/SimplePricing";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <AuroraShaders
          speed={0.8}
          intensity={1.2}
          vibrancy={1.1}
          frequency={1.0}
          stretch={1.5}
        />
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 pointer-events-none"></div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <WhyWeExist />
        <WhatPeopleSay />
        <SimplePricing />
        <FrequentlyAskedQuestions />
        <Footer />
      </div>
    </main>
  );
}

