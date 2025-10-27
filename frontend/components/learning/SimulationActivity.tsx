"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';

interface SimulationData {
  type: string;
  initialData: any;
  rules: any;
  scenarios: any[];
}

interface SimulationActivityProps {
  simulation: SimulationData;
  onComplete: (result: any) => void;
  onProgress?: (progress: number) => void;
}

export default function SimulationActivity({ simulation, onComplete, onProgress }: SimulationActivityProps) {
  // Handle both old simulation format (with scenarios) and new budget simulator format
  const scenariosCount = simulation.scenarios ? simulation.scenarios.length : 1;
  const simulationType = simulation.type || 'budget';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<any[]>([]);
  const [currentData, setCurrentData] = useState(simulation.initialData || {});
  const [showResult, setShowResult] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChoice = (choice: any) => {
    if (isCompleted) return;

    const newChoices = [...userChoices, choice];
    setUserChoices(newChoices);

    // Apply choice to current data
    const updatedData = applyChoice(currentData, choice);
    setCurrentData(updatedData);

    // Check if simulation is complete
    if (currentStep >= scenariosCount - 1) {
      completeSimulation(newChoices);
    } else {
      setCurrentStep(prev => prev + 1);
      if (onProgress) {
        onProgress((currentStep + 1) / scenariosCount);
      }
    }
  };

  const applyChoice = (data: any, choice: any) => {
    // This would be customized based on simulation type
    switch (simulation.type) {
      case 'budget':
        return {
          ...data,
          [choice.category]: (data[choice.category] || 0) + choice.amount,
          remaining: data.remaining - choice.amount
        };
      case 'investment':
        return {
          ...data,
          portfolio: {
            ...data.portfolio,
            [choice.asset]: (data.portfolio[choice.asset] || 0) + choice.amount
          },
          cash: data.cash - choice.amount
        };
      default:
        return { ...data, ...choice };
    }
  };

  const completeSimulation = (choices: any[]) => {
    const result = calculateSimulationResult(choices);
    setShowResult(true);
    setIsCompleted(true);
    onComplete(result);
  };

  const calculateSimulationResult = (choices: any[]) => {
    let score = 0;
    let efficiency = 0;

    switch (simulation.type) {
      case 'budget':
        const remaining = currentData.remaining;
        const targetRemaining = simulation.rules.targetRemaining || 200;
        
        // Score based on how close to target
        const remainingScore = Math.max(0, 100 - Math.abs(remaining - targetRemaining) * 2);
        score = remainingScore;
        efficiency = Math.min(100, (remaining / targetRemaining) * 100);
        break;
      
      case 'investment':
        // Score based on diversification and risk management
        const portfolio = currentData.portfolio;
        const totalInvested = Object.values(portfolio).reduce((sum: number, val: any) => sum + val, 0);
        const diversificationScore = calculateDiversificationScore(portfolio);
        score = diversificationScore;
        efficiency = (totalInvested / currentData.initialCash) * 100;
        break;
      
      default:
        score = 50; // Default score
        efficiency = 75;
    }

    return {
      finalScore: Math.round(score),
      choices,
      outcomes: currentData,
      efficiency: Math.round(efficiency),
      timeSpent: Math.floor(timeSpent)
    };
  };

  const calculateDiversificationScore = (portfolio: any) => {
    const values = Object.values(portfolio) as number[];
    const total = values.reduce((sum, val) => sum + val, 0);
    
    if (total === 0) return 0;
    
    // Calculate variance (lower is better for diversification)
    const mean = total / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    
    // Convert to score (0-100)
    return Math.max(0, 100 - (variance / mean) * 10);
  };

  const renderBudgetSimulation = () => {
    // Handle both old format (with scenarios) and new format (with categories)
    const scenario = simulation.scenarios?.[currentStep];
    const categories = simulation.categories || (scenario ? ['rent', 'food', 'transport', 'entertainment', 'savings', 'emergency'] : []);
    const monthlyIncome = simulation.monthlyIncome || currentData.remaining || 2000;
    const targetRatios = simulation.targetRatios || { needs: 50, wants: 30, savings: 20 };
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {simulation.title || scenario?.title || 'Budget Allocation Simulator'}
          </h3>
          <p className="text-gray-600 mb-4">
            {simulation.description || scenario?.description || 'Allocate your monthly income across different categories'}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Monthly Income:</strong> £{monthlyIncome.toLocaleString()}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Target:</strong> {targetRatios.needs}% Needs, {targetRatios.wants}% Wants, {targetRatios.savings}% Savings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category: any) => (
            <div key={category.name || category} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {category.name || category}
                <span className="text-xs text-gray-500 ml-2">({category.type || 'expense'})</span>
              </label>
              <input
                type="number"
                min={category.min || 0}
                max={category.max || monthlyIncome}
                step="10"
                defaultValue={category.suggested || 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valuto-green-500 focus:border-valuto-green-500"
                placeholder={`£${category.suggested || 0}`}
                onChange={(e) => {
                  const amount = parseInt(e.target.value) || 0;
                  handleChoice({
                    category: category.name || category,
                    amount,
                    type: category.type,
                    step: currentStep
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInvestmentSimulation = () => {
    const scenario = simulation.scenarios[currentStep];
    const assets = ['stocks', 'bonds', 'real_estate', 'commodities', 'cash'];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {scenario.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {scenario.description}
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Available cash:</strong> £{currentData.cash}
            </p>
            <p className="text-sm text-green-800">
              <strong>Goal:</strong> Diversify your portfolio
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {assets.map(asset => (
            <div key={asset} className="flex items-center gap-4">
              <label className="flex-1 text-sm font-medium text-gray-700 capitalize">
                {asset.replace('_', ' ')}
              </label>
              <input
                type="number"
                min="0"
                max={currentData.cash}
                step="100"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valuto-green-500 focus:border-valuto-green-500"
                placeholder="£0"
                onChange={(e) => {
                  const amount = parseInt(e.target.value) || 0;
                  if (amount <= currentData.cash) {
                    handleChoice({
                      asset,
                      amount,
                      step: currentStep
                    });
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const result = calculateSimulationResult(userChoices);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {result.efficiency >= 80 ? '🎉' : result.efficiency >= 60 ? '👍' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Simulation Complete!
          </h3>
          <p className="text-gray-600">
            {result.efficiency >= 80 
              ? 'Excellent work! You made great financial decisions.'
              : result.efficiency >= 60 
              ? 'Good job! You made solid choices with room for improvement.'
              : 'Keep learning! Review the concepts and try again.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-valuto-green-600 mb-1">
              {result.finalScore}
            </div>
            <div className="text-sm text-gray-600">Final Score</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {result.efficiency}%
            </div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600">Time Spent</div>
          </Card>
        </div>

        <Button onClick={() => onComplete(result)} className="w-full">
          Continue Learning
        </Button>
      </div>
    );
  };

  if (isCompleted) {
    return renderResult();
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className="bg-valuto-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / scenariosCount) * 100}%` }}
        />
      </div>

      {/* Step Counter */}
      {scenariosCount > 1 && (
        <div className="text-center text-sm text-gray-600">
          Step {currentStep + 1} of {scenariosCount}
        </div>
      )}

      {/* Simulation Content */}
      <Card className="p-8">
        {simulationType === 'budget' && renderBudgetSimulation()}
        {simulationType === 'investment' && renderInvestmentSimulation()}
      </Card>

      {/* Timer */}
      <div className="text-center text-sm text-gray-500">
        Time spent: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}
