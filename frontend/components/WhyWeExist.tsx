"use client";

import AnimatedSection from "./AnimatedSection";
import Button from "./theme/Button";
import {SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function WhyWeExist() {

  return (
    <section id="why-we-exist" className="py-24 section-light">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-md mb-2 uppercase tracking-wide">❤️ Why we exist</p>
            <h2 className="text-3xl font-display font-bold mb-6">The generation after us deserves better.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Young people are leaving school without understanding money — and it's costing them their future.
            </p>
            <p className="text-lg text-foreground font-semibold leading-relaxed mb-6">
              For the first time in modern history, 18–30 year olds are on track to be poorer than their parents.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Valuto is built to change that. One lesson, one challenge, one young person at a time.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <SignedOut>
                  <a href="/auth" className="hidden md:block">
                    <Button size="md" className="hover:bg-emerald-500 w-[-webkit-fill-available]">Join the Movement</Button>
                  </a>
                </SignedOut>
                  
                <SignedIn>
                  <a href="/dashboard" className="hidden sm:block">
                    <Button size="md" className="hover:bg-emerald-500 w-[-webkit-fill-available]">Join the Movement</Button>
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
                <a href="/about" className="">
                  <Button variant="secondary" size="md" className="w-[-webkit-fill-available]">Learn More</Button>
                </a>
            </div>
                  
          </AnimatedSection>
        </div>
      </section>
  );
}

