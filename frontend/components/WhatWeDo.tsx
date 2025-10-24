"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/shadcn-io/animated-beam";

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "Schools Book Valuto",
      description: "We arrange a full-day workshop at your school or college, tailored to your year group's needs.",
      ref: step1Ref,
    },
    {
      number: "02",
      title: "Interactive Workshop Day",
      description: "Our young team delivers 6 hours of engaging, practical money education with £500+ in prizes to keep everyone motivated.",
      ref: step2Ref,
    },
    {
      number: "03",
      title: "Year-Round Platform Access",
      description: "Students continue learning through our gamified platform with quizzes, tools, and events throughout the year.",
      ref: step3Ref,
    },
    {
      number: "04",
      title: "Real-World Skills",
      description: "Students go from 'no idea about money' to confidently handling pay cheques, avoiding debt, and building their future.",
      ref: step4Ref,
    },
  ];

  const outcomes = [
    "Avoid high-interest borrowing and unnecessary debt",
    "Budget and manage bills from day one",
    "Build a healthy credit profile early",
    "Save and invest with confidence",
    "Take control of their financial future",
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* How It Works */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">How It Works</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Simple, effective, and designed to create lasting impact
          </p>
        </div>

        <div ref={containerRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {steps.map((step, index) => (
            <div key={index} ref={step.ref} className="relative px-4 sm:px-0 z-10">
              <div className="text-5xl sm:text-6xl font-bold text-valuto-green-100 mb-3 sm:mb-4">{step.number}</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}

          {/* Animated Beams connecting the steps */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step1Ref}
            toRef={step2Ref}
            curvature={-50}
            duration={3}
            pathColor="#d1fae5"
            pathWidth={3}
            gradientStartColor="#15a34a"
            gradientStopColor="#22c55e"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step2Ref}
            toRef={step3Ref}
            curvature={50}
            duration={3.5}
            delay={0.2}
            pathColor="#d1fae5"
            pathWidth={3}
            gradientStartColor="#15a34a"
            gradientStopColor="#22c55e"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step3Ref}
            toRef={step4Ref}
            curvature={-50}
            duration={3.2}
            delay={0.4}
            pathColor="#d1fae5"
            pathWidth={3}
            gradientStartColor="#15a34a"
            gradientStopColor="#22c55e"
          />
        </div>

        {/* Financial Planning Image Section - Clean Design */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="/study2.png" 
                    alt="Student learning budgeting and financial planning" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white">
                  <div className="inline-block px-3 py-1 bg-valuto-green-50 text-valuto-green-700 rounded-md text-xs font-semibold mb-4 w-fit uppercase tracking-wide">
                    Real-World Skills
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Practical Money Management
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    Students learn hands-on budgeting, saving, and investing through interactive tools and real-life scenarios. Our platform makes financial literacy engaging and accessible.
                  </p>
                  <div className="flex items-center space-x-2 text-valuto-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base font-semibold">Interactive budgeting tools included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Promise - Clean Design */}
        <div className="bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left - Image */}
            <div className="order-2 lg:order-1 flex items-center justify-center p-8 lg:p-12 bg-valuto-green-600/50">
              <div className="relative w-full max-w-md">
                <img 
                  src="/study1.png" 
                  alt="Financial growth and investment" 
                  className="relative rounded-xl shadow-2xl border-4 border-white/20 w-full"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Promise</h2>
              <p className="text-lg mb-8 text-white/90">
                Valuto gives students the confidence to:
              </p>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base">{outcome}</span>
                  </div>
                ))}
              </div>

              <div>
                <button className="bg-white text-valuto-green-600 hover:bg-gray-50 font-bold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg text-base w-full sm:w-auto">
                  Book Your Workshop Today
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-16 sm:mt-20 md:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Access Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Affordable financial education for every student
            </p>
          </div>

          <div className="flex justify-center max-w-md mx-auto">
            {/* Student Access - Popular */}
            <div className="w-full bg-white rounded-xl border-2 border-valuto-green-600 shadow-xl hover:shadow-2xl transition-shadow relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-valuto-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Popular
                </span>
              </div>
              
              <div className="p-8 lg:p-10 text-center">
                <h3 className="font-bold text-2xl text-gray-900 mb-4">
                  Less than £1
                </h3>
                <p className="text-gray-600 mb-8">
                  Complete financial education platform
                </p>
                
                <div className="space-y-4 mb-10 text-left">
                  <div className="flex items-start gap-3 text-gray-700">
                    <svg className="h-6 w-6 text-valuto-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Interactive learning modules</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <svg className="h-6 w-6 text-valuto-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Gamified challenges & rewards</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <svg className="h-6 w-6 text-valuto-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Real-time progress tracking</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <svg className="h-6 w-6 text-valuto-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">AI-powered financial advisor</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <svg className="h-6 w-6 text-valuto-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Competition entry & prizes</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <svg className="h-6 w-6 text-valuto-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Year-round platform access</span>
                  </div>
                </div>

                <button className="w-full bg-valuto-green-600 text-white hover:bg-valuto-green-700 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Get Started Today
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

