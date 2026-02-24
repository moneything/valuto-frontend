"use client";

import { ChevronDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Button from "./theme/Button";
import { SignedOut } from "@clerk/nextjs";

export default function FrequentlyAskedQuestions() {
    
    const faqs = [
      { q: "Is Valuto safe for young people?", a: "Absolutely. Valuto is designed specifically for 11–18 year olds. No real money is used in simulations, and all content is age-appropriate." },
      { q: "What does £1/month include?", a: "Everything. All modules, simulators, games, AI helper, news feed, and future updates. No hidden costs." },
      { q: "Can parents track progress?", a: "Yes! Parents get visibility into their child's learning journey and achievements." },
      { q: "Is this a real investment platform?", a: "No. Valuto is an educational platform. Our simulators use virtual money to teach real skills." },
    ];
    
  return (
    <>
   <section id="faqs" className="py-24 section-dark">
       <div className="container mx-auto px-4 max-w-2xl">
         <AnimatedSection className="text-center mb-12">
           <h2 className="text-3xl font-display font-bold text-hero-foreground">Frequently Asked Questions</h2>
         </AnimatedSection>
         <div className="space-y-4">
           {faqs.map((faq, i) => (
             <AnimatedSection key={i} delay={i * 0.05}>
               <details className="group bg-hero/50 border border-primary/10 rounded-xl p-6 cursor-pointer">
                 <summary className="font-display font-semibold text-hero-foreground list-none flex justify-between items-center">
                   {faq.q}
                   <ChevronDown size={20} className="text-primary transition-transform group-open:rotate-180" />
                 </summary>
                 <p className="mt-4 text-hero-muted leading-relaxed text-sm">{faq.a}</p>
               </details>
             </AnimatedSection>
           ))}
         </div>
       </div>
     </section>
     <section className="py-24 section-light text-center">
         <div className="container mx-auto px-4">
           <AnimatedSection>
             <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Ready to get money-smart?</h2>
             <p className="text-muted-foreground mb-8 max-w-md mx-auto">Join thousands of young people building their financial future with Valuto.</p>
             <div className="flex flex-wrap justify-center gap-4">
               
               <SignedOut>
                   <a href="/auth">
                     <Button size="md" className="text-base px-8 hover:bg-emerald-500">Start for £1/month</Button>
                   </a>
                 </SignedOut>
             </div>
           </AnimatedSection>
         </div>
       </section>
       </>
  );
}

