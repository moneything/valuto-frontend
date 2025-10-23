"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';

interface ScenarioChoice {
  id: string;
  text: string;
  consequences: any;
  points: number;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: ScenarioChoice[];
  correctChoice: string;
  explanation: string;
}

interface ScenarioActivityProps {
  scenarios: Scenario[];
  onComplete: (results: any[]) => void;
  onProgress?: (currentScenario: number, totalScenarios: number) => void;
}

export default function ScenarioActivity({ scenarios, onComplete, onProgress }: ScenarioActivityProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [scenarioStartTime, setScenarioStartTime] = useState(Date.now());
  const [results, setResults] = useState<any[]>([]);

  const currentScenario = scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenarios.length - 1;

  useEffect(() => {
    setScenarioStartTime(Date.now());
  }, [currentScenarioIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChoiceSelect = (choiceId: string) => {
    if (showResult) return;
    
    const newChoices = [...selectedChoices];
    newChoices[currentScenarioIndex] = choiceId;
    setSelectedChoices(newChoices);
  };

  const handleSubmitChoice = () => {
    if (!selectedChoices[currentScenarioIndex]) return;

    const choiceTime = Math.floor((Date.now() - scenarioStartTime) / 1000);
    const selectedChoice = currentScenario.choices.find(c => c.id === selectedChoices[currentScenarioIndex]);
    const isOptimal = selectedChoices[currentScenarioIndex] === currentScenario.correctChoice;
    const pointsEarned = selectedChoice?.points || 0;

    const result = {
      scenarioId: currentScenario.id,
      selectedChoice: selectedChoices[currentScenarioIndex],
      isOptimal,
      pointsEarned,
      consequences: selectedChoice?.consequences || {},
      timeSpent: choiceTime
    };

    const newResults = [...results, result];
    setResults(newResults);
    setShowResult(true);

    if (onProgress) {
      onProgress(currentScenarioIndex + 1, scenarios.length);
    }
  };

  const handleNextScenario = () => {
    if (isLastScenario) {
      // Include the current scenario's result in the completion data
      const finalResults = [...results];
      if (results.length === currentScenarioIndex) {
        // If we haven't added the current scenario result yet, add it
        const scenarioTime = Math.floor((Date.now() - scenarioStartTime) / 1000);
        const selectedChoice = selectedChoices[currentScenarioIndex];
        const choice = currentScenario.choices.find(c => c.id === selectedChoice);
        const isCorrect = selectedChoice === currentScenario.correctChoice;
        const pointsEarned = choice ? choice.points : 0;

        finalResults.push({
          scenarioId: currentScenario.id,
          selectedChoice,
          isCorrect,
          pointsEarned,
          timeSpent: scenarioTime,
          timestamp: new Date().toISOString()
        });
      }
      onComplete(finalResults);
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
      setShowResult(false);
    }
  };

  const getChoiceButtonClass = (choiceId: string) => {
    if (!showResult) {
      return selectedChoices[currentScenarioIndex] === choiceId
        ? 'border-valuto-green-600 bg-valuto-green-50 text-valuto-green-900'
        : 'border-gray-200 hover:border-valuto-green-300 hover:bg-valuto-green-50';
    }

    const isCorrect = choiceId === currentScenario.correctChoice;
    const wasSelected = choiceId === selectedChoices[currentScenarioIndex];

    if (isCorrect) {
      return 'border-green-500 bg-green-50 text-green-900';
    } else if (wasSelected && !isCorrect) {
      return 'border-red-500 bg-red-50 text-red-900';
    } else {
      return 'border-gray-200 bg-gray-50 text-gray-500';
    }
  };

  const getChoiceIcon = (choiceId: string) => {
    if (!showResult) return null;

    const isCorrect = choiceId === currentScenario.correctChoice;
    const wasSelected = choiceId === selectedChoices[currentScenarioIndex];

    if (isCorrect) {
      return '✅';
    } else if (wasSelected && !isCorrect) {
      return '❌';
    }
    return null;
  };

  const renderConsequences = (consequences: any) => {
    if (!consequences || Object.keys(consequences).length === 0) return null;

    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Consequences:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {Object.entries(consequences).map(([key, value]) => (
            <li key={key}>
              <span className="font-medium capitalize">{key.replace('_', ' ')}:</span> {String(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className="bg-valuto-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%` }}
        />
      </div>

      {/* Scenario Counter */}
      <div className="text-center text-sm text-gray-600">
        Scenario {currentScenarioIndex + 1} of {scenarios.length}
      </div>

      {/* Scenario Content */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {currentScenario.title}
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-gray-800 leading-relaxed">
            {currentScenario.description}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-3 mb-6">
          {currentScenario.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${getChoiceButtonClass(choice.id)}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 text-lg">
                  {getChoiceIcon(choice.id)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{choice.text}</p>
                  {showResult && choice.id === selectedChoices[currentScenarioIndex] && 
                   renderConsequences(choice.consequences)}
                </div>
                <div className="text-sm text-gray-500">
                  +{choice.points} pts
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Submit/Next Button */}
        {!showResult ? (
          <Button
            onClick={handleSubmitChoice}
            disabled={!selectedChoices[currentScenarioIndex]}
            className="w-full"
          >
            Submit Choice
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Result Feedback */}
            <div className={`p-4 rounded-lg ${
              results[results.length - 1]?.isOptimal 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-2xl ${
                  results[results.length - 1]?.isOptimal ? 'text-green-600' : 'text-red-600'
                }`}>
                  {results[results.length - 1]?.isOptimal ? '✅' : '❌'}
                </span>
                <span className={`font-semibold ${
                  results[results.length - 1]?.isOptimal ? 'text-green-900' : 'text-red-900'
                }`}>
                  {results[results.length - 1]?.isOptimal ? 'Great choice!' : 'Not the best option'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                {currentScenario.explanation}
              </p>
              <p className="text-sm font-medium">
                +{results[results.length - 1]?.pointsEarned || 0} points
              </p>
            </div>

            <Button onClick={handleNextScenario} className="w-full">
              {isLastScenario ? 'Complete Scenarios' : 'Next Scenario'}
            </Button>
          </div>
        )}
      </Card>

      {/* Timer */}
      <div className="text-center text-sm text-gray-500">
        Time spent: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}
