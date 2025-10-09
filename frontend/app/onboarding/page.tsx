"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import { UserProfile } from '@/lib/localStorage';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const { updateProfile } = useUserProfile();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    role: 'student' as 'student' | 'teacher',
    age: '',
    school: '',
    grade: '',
    subject: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      userId: user?.id || '',
      name: formData.name,
      email: formData.email,
      role: formData.role,
      age: formData.age ? parseInt(formData.age) : undefined,
      school: formData.school,
      grade: formData.role === 'student' ? formData.grade : undefined,
      subject: formData.role === 'teacher' ? formData.subject : undefined,
      completedOnboarding: true,
      createdAt: new Date().toISOString()
    };

    updateProfile(profile);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-valuto-green-600">Valuto</span>
          </h1>
          <p className="text-gray-600">Let's set up your profile to get started</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`flex-1 h-2 rounded-full mx-1 transition-colors ${
                  num <= step ? 'bg-valuto-green-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  min="11"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none transition-colors"
                  placeholder="Enter your age"
                />
              </div>
            </div>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">I am a...</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    formData.role === 'student'
                      ? 'border-valuto-green-600 bg-valuto-green-50'
                      : 'border-gray-200 hover:border-valuto-green-300'
                  }`}
                >
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Student</h3>
                  <p className="text-sm text-gray-600">
                    Learn about money and play educational games
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'teacher' })}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    formData.role === 'teacher'
                      ? 'border-valuto-green-600 bg-valuto-green-50'
                      : 'border-gray-200 hover:border-valuto-green-300'
                  }`}
                >
                  <div className="text-4xl mb-3">👨‍🏫</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Teacher</h3>
                  <p className="text-sm text-gray-600">
                    Create games and teach financial literacy
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Additional Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Almost Done!</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School/Institution
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none transition-colors"
                  placeholder="Enter your school name"
                />
              </div>

              {formData.role === 'student' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grade/Year
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none transition-colors"
                  >
                    <option value="">Select your grade</option>
                    <option value="Year 7">Year 7</option>
                    <option value="Year 8">Year 8</option>
                    <option value="Year 9">Year 9</option>
                    <option value="Year 10">Year 10</option>
                    <option value="Year 11">Year 11</option>
                    <option value="Year 12">Year 12</option>
                    <option value="Year 13">Year 13</option>
                  </select>
                </div>
              )}

              {formData.role === 'teacher' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none transition-colors"
                    placeholder="e.g., Mathematics, Economics"
                  />
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Complete Setup
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}


