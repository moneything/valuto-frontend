const Icon = ({ type }: { type: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    users: (
      <svg className="w-12 h-12 text-valuto-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    academic: (
      <svg className="w-12 h-12 text-valuto-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gamepad: (
      <svg className="w-12 h-12 text-valuto-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    trophy: (
      <svg className="w-12 h-12 text-valuto-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-12 h-12 text-valuto-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    calendar: (
      <svg className="w-12 h-12 text-valuto-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function WhatMakesUsDifferent() {
  const features = [
    {
      title: "Youth-Led Team",
      description: "Created by people who remember what it's like to be 16 and unsure about money. We're under 20 and building the education we wish we had.",
      icon: "users",
    },
    {
      title: "Live Interactive Workshops",
      description: "Full-day engaging sessions hosted directly in schools. Not static booklets or quick assemblies—real, practical learning that sticks.",
      icon: "academic",
    },
    {
      title: "Gamified Platform",
      description: "Year-round access to quizzes, budgeting tools, investing simulators, and leaderboards that keep students engaged long after the workshop.",
      icon: "gamepad",
    },
    {
      title: "Real Prizes, Real Impact",
      description: "Minimum £500 invested per year group during a single workshop day. A level of reward never seen before in UK financial education.",
      icon: "trophy",
    },
    {
      title: "Topics Students Care About",
      description: "Side hustles, first jobs, credit scores, renting, investing early—real-world money skills they'll actually use.",
      icon: "lightbulb",
    },
    {
      title: "Year-Round Support",
      description: "Students get platform access for the whole year, building skills continuously with events featuring entrepreneurs and young professionals.",
      icon: "calendar",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            What Makes Valuto Different
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            There's nothing else like Valuto in the UK. We combine live energy, 
            gamified learning, and real investment in young people's futures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-valuto-green-50 to-white p-6 sm:p-8 rounded-xl border border-valuto-green-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-valuto-green-600 mb-4">
                <Icon type={feature.icon} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

