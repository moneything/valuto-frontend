"use client";

import { useState } from 'react';
import { LightBulbIcon } from '@/components/icons';
import { Message, MessageContent, MessageBubble } from '@/components/ai/message';
import { Response } from '@/components/ai/response';
import { Conversation, ConversationContent } from '@/components/ai/conversation';
import { PromptInput } from '@/components/ai/prompt-input';
import { Loader } from '@/components/ai/loader';
import { Suggestions } from '@/components/ai/suggestions';

interface ChatMessage {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi there! I'm **Valuto AI**, your friendly financial assistant! 💰✨\n\nI'm here to help you with any questions about:\n- 💵 Budgeting and money management\n- 📈 Investing and stocks\n- 💳 Debt and credit\n- 🏦 Saving and emergency funds\n- 🎯 Financial planning\n\nWhat would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    "How do I start budgeting?",
    "Tips for investing as a beginner",
    "How to build an emergency fund?",
    "What is compound interest?",
  ];

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Fun and informative responses based on common financial questions (with markdown formatting)
    if (input.includes('budget') || input.includes('money management')) {
      return "Great question! 💡 **Budgeting** is like having a roadmap for your money!\n\nTry the **50/30/20 rule**:\n- 50% for **needs** (rent, food, bills)\n- 30% for **wants** (fun stuff!)\n- 20% for **savings and investing**\n\nStart by tracking your expenses for a month - you might be surprised where your money goes! 🎯";
    }
    
    if (input.includes('invest') || input.includes('stock') || input.includes('investment')) {
      return "**Investing** is like planting seeds for your future! 🌱\n\nStart with **index funds** or **ETFs** - they're like buying a little bit of many companies at once.\n\n**Remember:** Time is your best friend in investing! Even $50/month can grow to thousands over time thanks to *compound interest*. The key is to start early and stay consistent! 📈";
    }
    
    if (input.includes('debt') || input.includes('credit card') || input.includes('loan')) {
      return "Debt can feel overwhelming, but you've got this! 💪\n\nTry these methods:\n\n**Debt Avalanche:** Pay minimums on all debts, then put extra money toward the highest interest rate debt first.\n\n**Debt Snowball:** Pay off the smallest debt first for quick wins!\n\nEither way, the key is to stop adding new debt while you pay off the old stuff. 🎯";
    }
    
    if (input.includes('saving') || input.includes('emergency fund')) {
      return "**Emergency funds** are your financial safety net! 🛡️\n\nAim for **3-6 months of expenses** in a high-yield savings account.\n\nStart small - even $500 can help with unexpected expenses! Set up automatic transfers so you don't have to think about it.\n\n*Remember:* It's not about being perfect, it's about being consistent! 💰";
    }
    
    if (input.includes('retirement') || input.includes('401k') || input.includes('ira')) {
      return "**Retirement planning** is like building a bridge to your future! 🌉\n\nIf your employer offers a 401(k) match, that's **FREE MONEY** - don't leave it on the table!\n\n**General rule:** Save 10-15% of your income.\n\nStart with whatever you can afford and increase it over time. Time is your biggest advantage, so start early! ⏰";
    }
    
    if (input.includes('crypto') || input.includes('bitcoin') || input.includes('cryptocurrency')) {
      return "**Crypto** is exciting but risky! ⚡\n\nThink of it as the wild west of investing.\n\nIf you're curious:\n- Start with a small amount (no more than 5-10% of your portfolio)\n- Only invest what you can afford to lose completely\n- Do your research\n- Understand the risks\n- Never invest based on FOMO! 🚀";
    }
    
    if (input.includes('compound') && input.includes('interest')) {
      return "**Compound interest** is the eighth wonder of the world! 🌟\n\nIt's when you earn interest on your interest. Here's how it works:\n\nYear 1: $1,000 @ 10% = $1,100\nYear 2: $1,100 @ 10% = $1,210\nYear 3: $1,210 @ 10% = $1,331\n\nYou're earning interest on the original amount PLUS all previous interest! Over time, this *snowballs* into serious wealth. 📈";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hey there! 👋 I'm so excited to help you with your **financial journey**!\n\nWhether you're just starting out or looking to level up your money game, I'm here to make finance *fun and accessible*.\n\nWhat's on your mind today? 💭";
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return "I'm your **personal finance cheerleader**! 🎉\n\nI can help with:\n- 💵 Budgeting\n- 📈 Investing basics\n- 💳 Debt payoff strategies\n- 🏦 Saving tips\n- 🎯 Retirement planning\n- And making money topics *fun and easy* to understand!\n\nJust ask me anything - no question is too basic or too complex! I love talking about money! 💬";
    }
    
    // Default response for other questions
    return "That's a great question! 🤔\n\nWhile I'd love to give you specific advice, remember that everyone's financial situation is **unique**.\n\nI'd suggest talking to a qualified financial advisor for personalized guidance. In the meantime, I can help you understand general financial concepts and strategies!\n\nWhat else would you like to explore? 💡";
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
      <Conversation className="relative z-10 max-w-4xl mx-auto px-6">
        <ConversationContent>
          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent className={message.role === 'user' ? 'ml-16' : 'mr-16'}>
                <MessageBubble variant={message.role === 'user' ? 'user' : 'assistant'}>
                  {message.role === 'user' ? (
                    <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                  ) : (
                    <Response>{message.text}</Response>
                  )}
                  
                  {/* Timestamp */}
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </MessageBubble>
              </MessageContent>
            </Message>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <Message from="assistant">
              <MessageContent className="mr-16">
                <Loader />
              </MessageContent>
            </Message>
          )}
        </ConversationContent>

        {/* Suggestions */}
        {showSuggestions && messages.length === 1 && !isLoading && (
          <Suggestions 
            suggestions={suggestions} 
            onSelect={handleSuggestionSelect}
            className="mb-2"
          />
        )}

        {/* Input Area */}
        <div className="mb-4">
          <PromptInput
            value={inputText}
            onChange={setInputText}
            onSend={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </Conversation>

      {/* Custom Styles */}
      <style jsx global>{`
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
      `}</style>
    </div>
  );
}
