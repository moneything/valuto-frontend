"use client";

import { useRouter } from 'next/navigation';
import { TrendingUpIcon } from '@/components/icons';

export default function InvestmentSimulationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center text-valuto-green-600 hover:text-valuto-green-700 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 shadow-lg">
              <TrendingUpIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Investment Simulation</h1>
              <p className="text-gray-600 mt-1">Learn investing through interactive simulations</p>
            </div>
          </div>
        </div>

        {/* Content Area - Empty for now */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-valuto-green-100 mb-6">
              <TrendingUpIcon className="w-12 h-12 text-valuto-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              This page is ready for your content. Start building your investment simulation experience here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

