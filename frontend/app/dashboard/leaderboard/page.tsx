"use client";

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 3850, school: "Central High", avatar: "S" },
    { rank: 2, name: "James Wilson", points: 3720, school: "West Academy", avatar: "J" },
    { rank: 3, name: "Emma Davis", points: 3650, school: "North School", avatar: "E" },
    { rank: 4, name: "Michael Brown", points: 3420, school: "East College", avatar: "M" },
    { rank: 5, name: "Olivia Taylor", points: 3200, school: "South Institute", avatar: "O" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Leaderboard 👑
        </h1>
        <p className="text-lg text-gray-600">
          See how you rank against other students
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                index < 3 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200' : 'bg-gray-50'
              }`}
            >
              <div className="text-2xl font-bold text-gray-400 w-8">{user.rank}</div>
              <div className="w-12 h-12 rounded-full bg-valuto-green-600 flex items-center justify-center text-white font-bold">
                {user.avatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.school}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-valuto-green-600">{user.points}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


