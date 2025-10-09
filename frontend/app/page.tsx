import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import WhatWeDo from "@/components/WhatWeDo";
import CompanyCarousel from "@/components/CompanyCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen animate-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      
      <Header />
      <Hero />
      <CompanyCarousel />
      <ImpactStats />
      <WhatMakesUsDifferent />
      <WhatWeDo />
      <Footer />
    </main>
  );
}

