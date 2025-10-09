"use client";

export default function ChallengesPage() {
  const challenges = [
    { title: "Daily Trivia", description: "Play one trivia game today", reward: 50, completed: true },
    { title: "Learning Streak", description: "Complete 3 lessons this week", reward: 200, completed: false },
    { title: "Calculator Expert", description: "Use the calculator 5 times", reward: 100, completed: false },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Daily Challenges 🎯
        </h1>
        <p className="text-lg text-gray-600">
          Complete challenges to earn bonus points
        </p>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 ${
              challenge.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{challenge.title}</h3>
                <p className="text-gray-600">{challenge.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-valuto-green-600">+{challenge.reward}</div>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
            {challenge.completed && (
              <div className="mt-4 text-green-600 font-semibold flex items-center gap-2">
                <span>✓</span>
                <span>Completed!</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


