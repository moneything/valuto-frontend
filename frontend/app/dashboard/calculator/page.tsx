"use client";

import { useState } from 'react';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import { CalculatorIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CalculatorPage() {
  const [initialAmount, setInitialAmount] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('10');
  
  const calculateInvestment = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(interestRate) / 100 || 0;
    const time = parseInt(years) || 0;
    
    // Compound interest calculation
    const monthlyRate = rate / 12;
    const months = time * 12;
    
    // Future value of initial investment
    const futureValueInitial = initial * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions
    const futureValueMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalValue = futureValueInitial + futureValueMonthly;
    const totalContributed = initial + (monthly * months);
    const totalInterest = totalValue - totalContributed;
    
    return {
      totalValue,
      totalContributed,
      totalInterest
    };
  };

  const result = calculateInvestment();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <PageLayout
      title="Investment Calculator"
      subtitle="See how your money can grow over time with compound interest"
      icon={<CalculatorIcon className="w-16 h-16 text-valuto-green-600" />}
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card padding="lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Investment Details</h2>
          
          <div className="space-y-6">
            {/* Initial Amount */}
            <div className="space-y-2">
              <Label className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Initial Investment</span>
                <span className="text-valuto-green-600">{formatCurrency(parseFloat(initialAmount) || 0)}</span>
              </Label>
              <input
                type="range"
                min="0"
                max="50000"
                step="100"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                placeholder="Initial amount"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <Label className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Monthly Contribution</span>
                <span className="text-valuto-green-600">{formatCurrency(parseFloat(monthlyContribution) || 0)}</span>
              </Label>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                placeholder="Monthly contribution"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Expected Annual Return</span>
                <span className="text-valuto-green-600">{interestRate}%</span>
              </Label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                placeholder="Interest rate %"
                step="0.1"
              />
            </div>

            {/* Time Period */}
            <div className="space-y-2">
              <Label className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Time Period</span>
                <span className="text-valuto-green-600">{years} years</span>
              </Label>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                placeholder="Number of years"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-valuto-green-50 rounded-lg border border-valuto-green-200">
            <div className="flex items-start space-x-2">
              <span className="text-xl">💡</span>
              <div>
                <p className="text-sm font-semibold text-valuto-green-900 mb-1">
                  Historical Average Returns
                </p>
                <p className="text-xs text-valuto-green-700">
                  The stock market historically returns about 7-10% annually over the long term. Remember, past performance doesn't guarantee future results!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Total Value Card */}
          <Card className="bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 text-white border-0">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Total Value After {years} Years</h3>
            <p className="text-5xl font-bold mb-4 font-numbers">{formatCurrency(result.totalValue)}</p>
            <div className="pt-4 border-t border-valuto-green-500">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-75 mb-1">Total Contributed</p>
                  <p className="text-xl font-bold font-numbers">{formatCurrency(result.totalContributed)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75 mb-1">Total Interest</p>
                  <p className="text-xl font-bold font-numbers">{formatCurrency(result.totalInterest)}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-600">Your Money</p>
                <span className="text-2xl">💵</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 font-numbers">{formatCurrency(result.totalContributed)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {((result.totalContributed / result.totalValue) * 100).toFixed(1)}% of total
              </p>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-600">Interest Earned</p>
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-2xl font-bold text-valuto-green-600 font-numbers">{formatCurrency(result.totalInterest)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {((result.totalInterest / result.totalValue) * 100).toFixed(1)}% of total
              </p>
            </Card>
          </div>

          {/* Achievement */}
          {result.totalValue > 50000 && (
            <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <h4 className="font-bold text-lg">Achievement Unlocked!</h4>
                  <p className="text-sm opacity-90">Future Millionaire - On track to £50K+</p>
                </div>
              </div>
            </Card>
          )}

          {/* Educational Content */}
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-3">🎓 Understanding Compound Interest</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Compound interest means earning interest on your interest! The earlier you start investing, 
              the more time your money has to grow exponentially.
            </p>
            <div className="bg-valuto-green-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-valuto-green-900 mb-2">The Power of Time</p>
              <p className="text-xs text-valuto-green-700">
                If you started with £{initialAmount} and added £{monthlyContribution}/month at {interestRate}% 
                for {years} years, you'd earn £{formatCurrency(result.totalInterest).replace('£', '')} in interest alone!
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* CSS for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </PageLayout>
  );
}

