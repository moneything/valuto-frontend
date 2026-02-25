"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/theme/Button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function Features() {
  return (
    <>
    <Header />

    {/* Hero */}
      <section className="section-dark py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-sm mb-4 uppercase tracking-wide">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-hero-foreground leading-tight mb-6">
              We noticed something{" "}
              <span className="gradient-text">shocking.</span>
            </h1>
            <p className="text-lg text-hero-muted leading-relaxed">
              Young people leave school without understanding money. And the results are real: debt, anxiety, missed opportunities — and a generation being set up to struggle financially.
            </p>
          </AnimatedSection>
        </div>
      </section>
    
      {/* The problem */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12 text-center mb-12">
              <p className="text-2xl sm:text-3xl font-display font-bold leading-snug">
                For the first time in modern history, 18–30 year olds are on track to be{" "}
                <span className="gradient-text">poorer than their parents.</span>
              </p>
              <p className="mt-4 text-lg font-semibold text-primary">That needs to change.</p>
            </div>
          </AnimatedSection>
    
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-display font-bold mb-6">Why we built Valuto</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Valuto was started by young entrepreneurs who believe money education shouldn't be boring, intimidating, full of jargon, or locked behind privilege.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We built Valuto to make it fun, simple, exciting, modern, and empowering. Because every young person deserves a fair shot at financial confidence.
            </p>
          </AnimatedSection>
    
          <AnimatedSection delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { bad: "Boring", good: "Fun" },
                { bad: "Intimidating", good: "Simple" },
                { bad: "Full of jargon", good: "Exciting" },
                { bad: "Locked behind privilege", good: "Empowering" },
              ].map((pair) => (
                <div key={pair.bad} className="flex items-center gap-4 p-4 rounded-xl bg-muted">
                  <span className="text-destructive line-through text-sm">{pair.bad}</span>
                  <span className="text-primary">→</span>
                  <span className="font-semibold text-sm">{pair.good}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
    
          <AnimatedSection delay={0.3} className="text-center mt-16">
            <SignedOut>
                <a href="/auth" className="hidden md:block">
                  <Button size="md" className="mt-8 hover:bg-emerald-500">Join the Movement</Button>
                </a>
              </SignedOut>
                
              <SignedIn>
                <a href="/dashboard" className="hidden sm:block">
                  <Button size="md" className="mt-8 hover:bg-emerald-500">Join the Movement</Button>
                </a>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9"
                    }
                  }}
                />
              </SignedIn>
          </AnimatedSection>
        </div>
      </section>


      <Footer />
    </>
  );
}

