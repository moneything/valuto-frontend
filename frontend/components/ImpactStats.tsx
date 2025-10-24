"use client";

import { AppleCardsCarousel, type Card } from "@/components/ui/apple-cards-carousel";

export default function ImpactStats() {
  const impactCards: Card[] = [
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&crop=center",
      title: "10,000+",
      category: "Students Reached",
      description: "Young people learning money skills",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">10,000+ Students Reached</h3>
          <p className="text-gray-600">
            We've successfully reached over 10,000 young people across the UK, 
            helping them develop essential money management skills that will last a lifetime.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Schools</h4>
              <p className="text-sm text-green-700">500+ educational institutions</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Workshops</h4>
              <p className="text-sm text-blue-700">1,000+ sessions delivered</p>
            </div>
          </div>
        </div>
      )
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
      title: "95%",
      category: "Student Engagement",
      description: "Active participation in workshops",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">95% Student Engagement</h3>
          <p className="text-gray-600">
            Our interactive approach and gamified learning methods result in 95% 
            active participation rates, keeping students engaged throughout the entire workshop.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Interactive learning modules</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Gamified activities and challenges</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Real-world case studies</span>
            </div>
          </div>
        </div>
      )
    },
    {
      src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&crop=center",
      title: "£500+",
      category: "Per Workshop",
      description: "Invested in prizes and rewards",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">£500+ Per Workshop Investment</h3>
          <p className="text-gray-600">
            We invest over £500 per workshop in prizes, rewards, and learning materials 
            to ensure students have a truly engaging and valuable experience.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Individual Prizes</h4>
              <p className="text-sm text-yellow-700">Up to £100 per student</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Learning Materials</h4>
              <p className="text-sm text-purple-700">Workbooks and resources</p>
            </div>
          </div>
        </div>
      )
    },
    {
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop&crop=center",
      title: "85%",
      category: "Confidence Boost",
      description: "Report feeling more confident with money",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">85% Confidence Boost</h3>
          <p className="text-gray-600">
            85% of students report feeling significantly more confident with money 
            after completing our workshops, with measurable improvements in their financial knowledge.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Pre and post-workshop assessments</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Student feedback surveys</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Follow-up progress tracking</span>
            </div>
          </div>
        </div>
      )
    }
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

        <AppleCardsCarousel 
          items={impactCards}
          className="max-w-7xl mx-auto"
        />
      </div>
    </section>
  );
}

