"use client";

import { useState, useRef, useEffect } from 'react';
import { LightBulbIcon, PaperAirplaneIcon } from '@/components/icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Valuto AI, your friendly financial assistant! 💰✨ I'm here to help you with any questions about money, investing, budgeting, or personal finance. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Fun and informative responses based on common financial questions
    if (input.includes('budget') || input.includes('money management')) {
      return "Great question! 💡 Budgeting is like having a roadmap for your money! Try the 50/30/20 rule: 50% for needs (rent, food, bills), 30% for wants (fun stuff!), and 20% for savings and investing. Start by tracking your expenses for a month - you might be surprised where your money goes! 🎯";
    }
    
    if (input.includes('invest') || input.includes('stock') || input.includes('investment')) {
      return "Investing is like planting seeds for your future! 🌱 Start with index funds or ETFs - they're like buying a little bit of many companies at once. Remember: time is your best friend in investing! Even $50/month can grow to thousands over time thanks to compound interest. The key is to start early and stay consistent! 📈";
    }
    
    if (input.includes('debt') || input.includes('credit card') || input.includes('loan')) {
      return "Debt can feel overwhelming, but you've got this! 💪 The debt avalanche method works great: pay minimums on all debts, then put extra money toward the highest interest rate debt first. Or try the snowball method: pay off the smallest debt first for quick wins! Either way, the key is to stop adding new debt while you pay off the old stuff. 🎯";
    }
    
    if (input.includes('saving') || input.includes('emergency fund')) {
      return "Emergency funds are your financial safety net! 🛡️ Aim for 3-6 months of expenses in a high-yield savings account. Start small - even $500 can help with unexpected car repairs! Set up automatic transfers so you don't have to think about it. Remember: it's not about being perfect, it's about being consistent! 💰";
    }
    
    if (input.includes('retirement') || input.includes('401k') || input.includes('ira')) {
      return "Retirement planning is like building a bridge to your future! 🌉 If your employer offers a 401(k) match, that's FREE MONEY - don't leave it on the table! The general rule: save 10-15% of your income. Start with whatever you can afford and increase it over time. Time is your biggest advantage, so start early! ⏰";
    }
    
    if (input.includes('crypto') || input.includes('bitcoin') || input.includes('cryptocurrency')) {
      return "Crypto is exciting but risky! ⚡ Think of it as the wild west of investing. If you're curious, start with a small amount (no more than 5-10% of your portfolio) and only invest what you can afford to lose completely. Do your research, understand the risks, and never invest based on FOMO! 🚀";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hey there! 👋 I'm so excited to help you with your financial journey! Whether you're just starting out or looking to level up your money game, I'm here to make finance fun and accessible. What's on your mind today? 💭";
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return "I'm your personal finance cheerleader! 🎉 I can help with budgeting, investing basics, debt payoff strategies, saving tips, retirement planning, and making money topics fun and easy to understand. Just ask me anything - no question is too basic or too complex! I love talking about money! 💬";
    }
    
    // Default response for other questions
    return "That's a great question! 🤔 While I'd love to give you specific advice, remember that everyone's financial situation is unique. I'd suggest talking to a qualified financial advisor for personalized guidance. In the meantime, I can help you understand general financial concepts and strategies! What else would you like to explore? 💡";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen animate-gradient relative overflow-hidden flex flex-col">
      {/* Decorative elements - matching landing page */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-valuto-green-200/30 shadow-sm flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 rounded-2xl flex items-center justify-center shadow-lg green-glow">
              <LightBulbIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold green-text-gradient">
                Valuto AI
              </h1>
              <p className="text-xs text-valuto-green-600 font-medium">Your friendly financial assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 scrollbar-hide">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`max-w-[80%] ${message.isUser ? 'ml-16' : 'mr-16'}`}>
                {/* Message Bubble */}
                <div
                  className={`relative px-5 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                    message.isUser
                      ? 'bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 text-white green-glow'
                      : 'bg-white/70 text-gray-900 border border-valuto-green-200/50 green-card-hover'
                  }`}
                >
                  <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                  
                  {/* Timestamp */}
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="mr-16 max-w-[80%]">
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-valuto-green-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-valuto-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-valuto-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Valuto AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/60 backdrop-blur-xl border border-valuto-green-200/50 rounded-2xl p-3 shadow-xl flex-shrink-0 mb-4 green-card-hover">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about money, investing, or personal finance..."
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-valuto-green-200/50 rounded-xl focus:ring-2 focus:ring-valuto-green-500/50 focus:border-valuto-green-500/50 outline-none resize-none transition-all duration-200 placeholder-valuto-green-500 text-gray-900 font-medium text-sm"
                disabled={isLoading}
                rows={1}
                style={{ minHeight: '44px', maxHeight: '100px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 100) + 'px';
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="w-11 h-11 bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 hover:from-valuto-green-600 hover:to-valuto-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed green-glow"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
