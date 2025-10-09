export default function ImpactStats() {
  const stats = [
    {
      value: "10,000+",
      label: "Students Reached",
      description: "Young people learning money skills",
    },
    {
      value: "95%",
      label: "Student Engagement",
      description: "Active participation in workshops",
    },
    {
      value: "£500+",
      label: "Per Workshop",
      description: "Invested in prizes and rewards",
    },
    {
      value: "85%",
      label: "Confidence Boost",
      description: "Report feeling more confident with money",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3 leading-tight">{stat.value}</div>
              <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-white">{stat.label}</div>
              <div className="text-xs sm:text-sm text-valuto-green-100 leading-relaxed">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

