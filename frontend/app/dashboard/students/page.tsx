"use client";

export default function StudentsPage() {
  const students = [
    { name: "John Smith", grade: "Year 10", gamesPlayed: 8, avgScore: 85, points: 1200 },
    { name: "Emily Brown", grade: "Year 10", gamesPlayed: 12, avgScore: 92, points: 1850 },
    { name: "Alex Johnson", grade: "Year 11", gamesPlayed: 6, avgScore: 78, points: 950 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Student Progress 📊
        </h1>
        <p className="text-lg text-gray-600">
          Monitor your students' learning journey
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Games</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Avg Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{student.name}</td>
                <td className="px-6 py-4 text-gray-600">{student.grade}</td>
                <td className="px-6 py-4 text-gray-600">{student.gamesPlayed}</td>
                <td className="px-6 py-4 text-gray-600">{student.avgScore}%</td>
                <td className="px-6 py-4 text-valuto-green-600 font-semibold">{student.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


