export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Teaching Money Skills
              <br />
              <span className="text-valuto-green-600">Before It's Too <em className="italic">Late</em></span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0">
              Valuto is a new way to teach money skills to young people aged 11–18. 
              We help every student feel confident with money before they leave education.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center px-4 lg:px-0">
              <button className="btn-primary w-full sm:w-auto text-sm sm:text-base">
                Book a Workshop
              </button>
              <button className="btn-secondary w-full sm:w-auto text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-0">
              <div className="absolute inset-0 bg-valuto-green-600 rounded-2xl transform rotate-3"></div>
              <img 
                src="/study.png" 
                alt="Students learning financial skills" 
                className="relative rounded-2xl shadow-2xl border-4 border-white w-full"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 lg:px-0">
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <div className="text-valuto-green-600 text-3xl sm:text-4xl font-bold mb-2">11-18</div>
            <div className="text-gray-700 font-medium text-sm sm:text-base">Age Range</div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <div className="text-valuto-green-600 text-3xl sm:text-4xl font-bold mb-2">£500+</div>
            <div className="text-gray-700 font-medium text-sm sm:text-base">Prize Investment</div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <div className="text-valuto-green-600 text-3xl sm:text-4xl font-bold mb-2">Full Day</div>
            <div className="text-gray-700 font-medium text-sm sm:text-base">Workshops</div>
          </div>
        </div>
      </div>
    </section>
  );
}

