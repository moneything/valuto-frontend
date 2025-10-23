"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/shadcn-io/animated-beam";

export default function ImpactStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);
  const stat4Ref = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: "10,000+",
      label: "Students Reached",
      description: "Young people learning money skills",
      ref: stat1Ref,
    },
    {
      value: "95%",
      label: "Student Engagement",
      description: "Active participation in workshops",
      ref: stat2Ref,
    },
    {
      value: "£500+",
      label: "Per Workshop",
      description: "Invested in prizes and rewards",
      ref: stat3Ref,
    },
    {
      value: "85%",
      label: "Confidence Boost",
      description: "Report feeling more confident with money",
      ref: stat4Ref,
    },
  ];

  return (
    <section id="impact" className="section-padding bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Impact by Numbers</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Real results from our mission to empower young people with financial knowledge
          </p>
        </div>

        <div ref={containerRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              ref={stat.ref}
              className="relative z-10 bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3 leading-tight">{stat.value}</div>
              <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-white">{stat.label}</div>
              <div className="text-xs sm:text-sm text-valuto-green-100 leading-relaxed">{stat.description}</div>
            </div>
          ))}

          {/* Animated Beams connecting the stats in a flowing pattern */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stat1Ref}
            toRef={stat2Ref}
            curvature={-60}
            duration={3}
            pathColor="#86efac"
            pathWidth={3}
            pathOpacity={0.4}
            gradientStartColor="#22c55e"
            gradientStopColor="#86efac"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stat2Ref}
            toRef={stat3Ref}
            curvature={60}
            duration={3.5}
            delay={0.3}
            pathColor="#86efac"
            pathWidth={3}
            pathOpacity={0.4}
            gradientStartColor="#22c55e"
            gradientStopColor="#86efac"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stat3Ref}
            toRef={stat4Ref}
            curvature={-60}
            duration={3.2}
            delay={0.6}
            pathColor="#86efac"
            pathWidth={3}
            pathOpacity={0.4}
            gradientStartColor="#22c55e"
            gradientStopColor="#86efac"
          />
          {/* Add a reverse beam for visual interest */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stat4Ref}
            toRef={stat1Ref}
            curvature={0}
            duration={5}
            delay={1}
            reverse={true}
            pathColor="#86efac"
            pathWidth={2}
            pathOpacity={0.2}
            gradientStartColor="#22c55e"
            gradientStopColor="#86efac"
          />
        </div>
      </div>
    </section>
  );
}

