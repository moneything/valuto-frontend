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
  const [bondPrice, setBondPrice] = useState(Number(activity.data.defaultPrice ?? 0));
  const [bondPayment, setBondPayment] = useState(Number(activity.data.defaultPayment ?? 0));
  const [yieldValue, setYieldValue] = useState(0);
  const [shares, setShares] = useState(100);
  const [sharePrice, setSharePrice] = useState(Number(activity.data.currentPrice ?? 0));
  const [buyers, setBuyers] = useState(50);
  const [sellers, setSellers] = useState(50);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const renderCalculator = () => {
    const calculateYield = () => {
      const result = (bondPayment / bondPrice) * 100;
      setYieldValue(result);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d7db]">
              Bond Price ($)
            </label>
              <input
                type="number"
                value={bondPrice}
                onChange={(e) => setBondPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white focus:border-valuto-green-500 focus:ring-2 focus:ring-valuto-green-500"
              />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d7db]">
              Annual Payment ($)
            </label>
              <input
                type="number"
                value={bondPayment}
                onChange={(e) => setBondPayment(Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white focus:border-valuto-green-500 focus:ring-2 focus:ring-valuto-green-500"
              />
          </div>
        </div>

        <Button onClick={calculateYield} className="w-full">
          Calculate Yield
        </Button>

        {yieldValue > 0 && (
          <div className="rounded-lg border border-valuto-green-400/30 bg-valuto-green-500/10 p-4">
            <h4 className="mb-2 font-semibold text-green-300">Result:</h4>
            <p className="text-2xl font-bold text-valuto-green-700">
              {yieldValue.toFixed(2)}%
            </p>
            <p className="mt-2 text-sm text-green-200">
              This means you earn {yieldValue.toFixed(2)}% per year on your investment!
            </p>
          </div>
        )}

        <div className="rounded-lg bg-white/[0.04] p-4">
          <h4 className="mb-3 font-semibold text-white">Try these examples:</h4>
          <div className="space-y-2">
            {activity.data.examples.map((example: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setBondPrice(example.price);
                  setBondPayment(example.payment);
                  setYieldValue(example.yield);
                }}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-3 text-left text-[#e5e5e7] transition-colors hover:border-valuto-green-300 hover:bg-white/[0.08]"
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
      const ownership = (shares / activity.data.totalShares) * 100;
      const totalCost = shares * sharePrice;

      return (
        <div className="space-y-6">
          <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-4">
            <h4 className="mb-2 font-semibold text-blue-300">{activity.data.companyName}</h4>
            <p className="text-sm text-blue-200">
              Total shares outstanding: {activity.data.totalShares.toLocaleString()}
            </p>
            <p className="text-sm text-blue-200">
              Current price per share: ${sharePrice}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d7d7db]">
                Number of shares to buy
              </label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white focus:border-valuto-green-500 focus:ring-2 focus:ring-valuto-green-500"
                min="1"
                max={activity.data.totalShares}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d7d7db]">
                Price per share ($)
              </label>
              <input
                type="number"
                value={sharePrice}
                onChange={(e) => setSharePrice(Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white focus:border-valuto-green-500 focus:ring-2 focus:ring-valuto-green-500"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div className="rounded-lg border border-valuto-green-400/30 bg-valuto-green-500/10 p-6">
            <h4 className="mb-4 font-semibold text-green-300">Your Investment Summary:</h4>
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
      const priceChange = ((buyers - sellers) / 100) * 5; // Price change based on difference
      const newPrice = Math.max(activity.data.priceRange[0], Math.min(activity.data.priceRange[1], activity.data.initialPrice + priceChange));

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d7d7db]">
                Number of Buyers: {buyers}
              </label>
              <input
                type="range"
                min="0"
                max={activity.data.maxBuyers}
                value={buyers}
                onChange={(e) => setBuyers(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-valuto-green-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d7d7db]">
                Number of Sellers: {sellers}
              </label>
              <input
                type="range"
                min="0"
                max={activity.data.maxSellers}
                value={sellers}
                onChange={(e) => setSellers(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-valuto-green-500"
              />
            </div>
          </div>

          <div className="rounded-lg border border-valuto-green-400/30 bg-valuto-green-500/10 p-6">
            <h4 className="mb-4 font-semibold text-green-300">Market Impact:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">${newPrice.toFixed(2)}</p>
                <p className="text-sm text-valuto-green-600">Stock Price</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                </p>
                <p className="text-sm text-[#9a9a9d]">Price Change</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-valuto-green-700">{buyers - sellers}</p>
                <p className="text-sm text-valuto-green-600">Net Demand</p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-[#d7d7db]">
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
            <p className="text-[#9a9a9d]">Interactive activity coming soon!</p>
          </div>
        );
    }
  };

  return (
    <Card className="mb-6">
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-bold text-white">{activity.title}</h3>
        <p className="mb-4 text-[#d7d7db]">{activity.description}</p>
        <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-4">
          <p className="text-sm text-blue-200">
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
