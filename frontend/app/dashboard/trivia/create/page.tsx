"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

export default function CreateTriviaPage() {
  const router = useRouter();
  const [gameTitle, setGameTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0, timeLimit: 30 }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: 0, timeLimit: 30 }
    ]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would save to backend
    const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`Game created with code: ${gameCode}`);
    router.push('/dashboard/trivia');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Create Trivia Game ✨
        </h1>
        <p className="text-lg text-gray-600">
          Build an engaging Kahoot-style game for your students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Game Title */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Game Title *
          </label>
          <input
            type="text"
            required
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
            placeholder="e.g., Introduction to Investing"
          />
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Question {qIndex + 1}
              </h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question *
              </label>
              <textarea
                required
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            {/* Answer Options */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Answer Options *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="relative">
                    <input
                      type="text"
                      required
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none ${
                        q.correctAnswer === oIndex
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 focus:border-valuto-green-600'
                      }`}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        q.correctAnswer === oIndex
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                      title="Mark as correct answer"
                    >
                      {q.correctAnswer === oIndex ? '✓' : '○'}
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click the circle to mark the correct answer
              </p>
            </div>

            {/* Time Limit */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time Limit: {q.timeLimit} seconds
              </label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={q.timeLimit}
                onChange={(e) => updateQuestion(qIndex, 'timeLimit', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 text-gray-600 hover:border-valuto-green-600 hover:text-valuto-green-600 transition-colors font-semibold"
        >
          + Add Another Question
        </button>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-valuto-green-600 to-valuto-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
          >
            Create Game 🎮
          </button>
        </div>
      </form>
    </div>
  );
}


