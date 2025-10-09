"use client";

export default function CompanyCarousel() {
  // Placeholder company names - these can be replaced with actual partner logos
  const companies = [
    "Barclays",
    "HSBC",
    "Lloyds Banking Group",
    "NatWest",
    "Santander UK",
    "Nationwide",
    "Metro Bank",
    "Monzo",
    "Revolut",
    "Starling Bank",
  ];

  return (
    <section className="bg-white/60 backdrop-blur-sm py-8 sm:py-12 border-y border-gray-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 sm:mb-8">
          Trusted by Leading Financial Institutions
        </h3>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {companies.map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center"
              >
                <div className="text-gray-400 text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                  {company}
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center"
              >
                <div className="text-gray-400 text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}

