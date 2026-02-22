"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import WhatWeDo from "@/components/WhatWeDo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <ImpactStats />
        <WhatMakesUsDifferent />
        <WhatWeDo />
        <Footer />
      </div>
    </main>
  );
}

