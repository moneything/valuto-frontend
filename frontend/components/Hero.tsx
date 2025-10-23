"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/shadcn-io/animated-beam";
import { Announcement, AnnouncementBadge } from "@/components/ui/announcement";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

export default function Hero() {
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

  const partnerLogos = [
    "💼 Schools", "🏦 Banks", "📊 Finance Edu", "🎓 Universities", 
    "💰 Investment Firms", "📚 EdTech", "🌟 Startups", "🏢 Corporations"
  ];

  return (
    <section className="relative bg-white/40 backdrop-blur-sm overflow-hidden">
      {/* Announcement Bar */}
      <div className="relative z-20 pt-4 flex justify-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <Announcement href="#workshops">
          <AnnouncementBadge variant="success">NEW</AnnouncementBadge>
          <span>🎉 Full-day workshops now available for ages 11-18</span>
          <span className="ml-1">→</span>
        </Announcement>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center mb-8 md:mb-12">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-4 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Teaching Money Skills
              <br />
              <span className="text-valuto-green-600 inline-block mt-1">
                Before It's Too <em className="italic font-light">Late</em>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Valuto is a new way to teach money skills to young people aged 11–18. 
              We help every student feel confident with money before they leave education.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center">
              <button className="btn-primary w-full sm:w-auto text-sm sm:text-base group">
                Book a Workshop
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button className="btn-secondary w-full sm:w-auto text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="flex justify-center lg:justify-end mt-6 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Main Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6 duration-300"></div>
                <div className="relative">
                  <Image 
                    src="/study.png" 
                    alt="Students learning financial skills" 
                    width={600}
                    height={400}
                    className="relative rounded-2xl shadow-2xl border-4 border-white w-full transform transition-transform group-hover:scale-[1.02] duration-300"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row with Animated Beams */}
        <div ref={statsContainerRef} className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 lg:px-0">
          <div 
            ref={stat1Ref}
            className="relative z-10 bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl sm:text-3xl font-bold mb-1">11-18</div>
            <div className="font-medium text-sm text-valuto-green-50">Age Range</div>
          </div>
          <div 
            ref={stat2Ref}
            className="relative z-10 bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl sm:text-3xl font-bold mb-1">£500+</div>
            <div className="font-medium text-sm text-valuto-green-50">Prize Investment</div>
          </div>
          <div 
            ref={stat3Ref}
            className="relative z-10 bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl sm:text-3xl font-bold mb-1">Full Day</div>
            <div className="font-medium text-sm text-valuto-green-50">Workshops</div>
          </div>

          {/* Animated Beams connecting the stats */}
          <AnimatedBeam
            containerRef={statsContainerRef}
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
            containerRef={statsContainerRef}
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
          {/* Add a reverse beam for circular flow */}
          <AnimatedBeam
            containerRef={statsContainerRef}
            fromRef={stat3Ref}
            toRef={stat1Ref}
            curvature={0}
            duration={5}
            delay={0.8}
            reverse={true}
            pathColor="#86efac"
            pathWidth={2}
            pathOpacity={0.2}
            gradientStartColor="#22c55e"
            gradientStopColor="#86efac"
          />
        </div>
      </div>

      {/* Trusted By Marquee - Full Width */}
      <div className="mt-10 md:mt-14 w-full">
        <p className="text-center text-sm font-semibold text-gray-500 mb-4">
          TRUSTED BY LEADING ORGANIZATIONS
        </p>
        <Marquee duration={25} pauseOnHover className="py-2">
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-6 py-2 bg-white/70 backdrop-blur-sm rounded-lg border border-valuto-green-100 shadow-sm hover:shadow-md transition-shadow mx-2"
            >
              <span className="text-base font-semibold text-gray-700 whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

