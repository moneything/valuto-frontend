"use client";

import { useState } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { InteractiveActivity as InteractiveActivityType } from '@/lib/mockData';

interface InteractiveActivityProps {
  activity: InteractiveActivityType;
  onComplete: () => void;
}

export default function InteractiveActivity({ activity, onComplete }: InteractiveActivityProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const renderCalculator = () => {
    const [price, setPrice] = useState(activity.data.defaultPrice);
    const [payment, setPayment] = useState(activity.data.defaultPayment);
    const [yieldValue, setYieldValue] = useState(0);

    const calculateYield = () => {
      const result = (payment / price) * 100;
      setYieldValue(result);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bond Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valuto-green-500 focus:border-valuto-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Payment ($)
            </label>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valuto-green-500 focus:border-valuto-green-500"
            />
          </div>
        </div>

        <Button onClick={calculateYield} className="w-full">
          Calculate Yield
        </Button>

        {yieldValue > 0 && (
          <div className="bg-valuto-green-50 border border-valuto-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-valuto-green-900 mb-2">Result:</h4>
            <p className="text-2xl font-bold text-valuto-green-700">
              {yieldValue.toFixed(2)}%
            </p>
            <p className="text-sm text-valuto-green-600 mt-2">
              This means you earn {yieldValue.toFixed(2)}% per year on your investment!
            </p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Try these examples:</h4>
          <div className="space-y-2">
            {activity.data.examples.map((example: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setPrice(example.price);
                  setPayment(example.payment);
                  setYieldValue(example.yield);
                }}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-valuto-green-300 hover:bg-valuto-green-50 transition-colors"
              >
                <span className="font-medium">${example.price} bond, ${example.payment}/year = {example.yield}% yield</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSimulation = () => {
    if (activity.type === 'simulation' && activity.data.companyName) {
      // Ownership calculator
      const [shares, setShares] = useState(100);
      const [price, setPrice] = useState(activity.data.currentPrice);
      const ownership = (shares / activity.data.totalShares) * 100;
      const totalCost = shares * price;

      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">{activity.data.companyName}</h4>
            <p className="text-sm text-blue-700">
              Total shares outstanding: {activity.data.totalShares.toLocaleString()}
            </p>
            <p className="text-sm text-blue-700">
              Current price per share: ${price}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of shares to buy
              </label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valuto-green-500 focus:border-valuto-green-500"
                min="1"
                max={activity.data.totalShares}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per share ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valuto-green-500 focus:border-valuto-green-500"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div className="bg-valuto-green-50 border border-valuto-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-valuto-green-900 mb-4">Your Investment Summary:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">{ownership.toFixed(4)}%</p>
                <p className="text-sm text-valuto-green-600">Ownership</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">${totalCost.toLocaleString()}</p>
                <p className="text-sm text-valuto-green-600">Total Cost</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">{shares.toLocaleString()}</p>
                <p className="text-sm text-valuto-green-600">Shares</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Supply & Demand simulator
      const [buyers, setBuyers] = useState(50);
      const [sellers, setSellers] = useState(50);
      const priceChange = ((buyers - sellers) / 100) * 5; // Price change based on difference
      const newPrice = Math.max(activity.data.priceRange[0], Math.min(activity.data.priceRange[1], activity.data.initialPrice + priceChange));

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Buyers: {buyers}
              </label>
              <input
                type="range"
                min="0"
                max={activity.data.maxBuyers}
                value={buyers}
                onChange={(e) => setBuyers(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Sellers: {sellers}
              </label>
              <input
                type="range"
                min="0"
                max={activity.data.maxSellers}
                value={sellers}
                onChange={(e) => setSellers(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-valuto-green-50 border border-valuto-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-valuto-green-900 mb-4">Market Impact:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">${newPrice.toFixed(2)}</p>
                <p className="text-sm text-valuto-green-600">Stock Price</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Price Change</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">{buyers - sellers}</p>
                <p className="text-sm text-valuto-green-600">Net Demand</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              {buyers > sellers 
                ? "More buyers than sellers = Price goes UP! 📈" 
                : buyers < sellers 
                ? "More sellers than buyers = Price goes DOWN! 📉"
                : "Equal buyers and sellers = Price stays the same 📊"
              }
            </p>
          </div>
        </div>
      );
    }
  };

  const renderActivity = () => {
    switch (activity.type) {
      case 'calculator':
        return renderCalculator();
      case 'simulation':
        return renderSimulation();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Interactive activity coming soon!</p>
          </div>
        );
    }
  };

  return (
    <Card className="mb-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
        <p className="text-gray-600 mb-4">{activity.description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> {activity.instructions}
          </p>
        </div>
      </div>

      {renderActivity()}

      {!isCompleted && (
        <div className="mt-6 text-center">
          <Button onClick={handleComplete} size="lg">
            Complete Activity
          </Button>
        </div>
      )}

      {isCompleted && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <p className="font-semibold text-green-900">Great job! You've completed the activity.</p>
          <p className="text-sm text-green-700 mt-1">Now you're ready for the quiz!</p>
        </div>
      )}
    </Card>
  );
}
