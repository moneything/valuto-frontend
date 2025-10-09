export default function WhatWeDo() {
  const steps = [
    {
      number: "01",
      title: "Schools Book Valuto",
      description: "We arrange a full-day workshop at your school or college, tailored to your year group's needs.",
    },
    {
      number: "02",
      title: "Interactive Workshop Day",
      description: "Our young team delivers 6 hours of engaging, practical money education with £500+ in prizes to keep everyone motivated.",
    },
    {
      number: "03",
      title: "Year-Round Platform Access",
      description: "Students continue learning through our gamified platform with quizzes, tools, and events throughout the year.",
    },
    {
      number: "04",
      title: "Real-World Skills",
      description: "Students go from 'no idea about money' to confidently handling pay cheques, avoiding debt, and building their future.",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative px-4 sm:px-0">
              <div className="text-5xl sm:text-6xl font-bold text-valuto-green-100 mb-3 sm:mb-4">{step.number}</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-valuto-green-300 text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Financial Planning Image Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-valuto-green-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-valuto-green-600/10 to-valuto-green-400/10"></div>
                  <img 
                    src="/study2.png" 
                    alt="Student learning budgeting and financial planning" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-valuto-green-50">
                  <div className="inline-block px-4 py-2 bg-valuto-green-100 text-valuto-green-700 rounded-full text-xs sm:text-sm font-semibold mb-4 w-fit">
                    Real-World Skills
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Practical Money Management
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    Students learn hands-on budgeting, saving, and investing through interactive tools and real-life scenarios. Our platform makes financial literacy engaging and accessible.
                  </p>
                  <div className="flex items-center space-x-2 text-valuto-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base font-semibold">Interactive budgeting tools included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="bg-valuto-green-600 text-white rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image */}
            <div className="order-2 lg:order-1 flex items-center justify-center p-8 lg:p-12">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/10 rounded-2xl transform -rotate-3"></div>
                <img 
                  src="/study1.png" 
                  alt="Financial growth and investment" 
                  className="relative rounded-2xl shadow-2xl border-4 border-white/20 w-full"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Promise</h2>
              <p className="text-lg md:text-xl mb-8 text-valuto-green-50">
                Valuto gives students the confidence to:
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-10">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-valuto-green-200 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base md:text-lg">{outcome}</span>
                  </div>
                ))}
              </div>

              <div>
                <button className="bg-white text-valuto-green-600 hover:bg-gray-50 font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 shadow-lg text-base md:text-lg w-full sm:w-auto">
                  Book Your Workshop Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

