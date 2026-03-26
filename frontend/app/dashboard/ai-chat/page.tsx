"use client";

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
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
  const { getToken } = useAuth();
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

    try {
      const token = await getToken({ template: 'default' });
      if (!token) {
        throw new Error('Please sign in to use Valuto AI.');
      }
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const history = messages.slice(-10).map((message) => ({
        role: message.role,
        text: message.text,
      }));

      const response = await fetch(`${apiBaseUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        const errorMessage =
          data?.message ||
          (response.status === 429
            ? 'Daily limit reached. Try again tomorrow.'
            : 'Something went wrong. Please try again.');
        throw new Error(errorMessage);
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.data?.message || 'Sorry, I could not generate a response.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: error?.message || 'Unable to reach Valuto AI right now.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden animate-gradient text-white">
      {/* Decorative elements - matching landing page */}
      <div className="absolute right-0 top-0 h-72 w-72 -translate-y-12 translate-x-12 rounded-full bg-valuto-green-400/10 blur-3xl animate-blob"></div>
      <div className="absolute left-0 top-1/3 h-96 w-96 -translate-x-12 translate-y-12 rounded-full bg-emerald-300/10 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 h-80 w-80 translate-y-12 rounded-full bg-cyan-300/5 blur-3xl animate-blob animation-delay-4000"></div>

      {/* Header */}
      <div className="relative z-10 flex-shrink-0 border-b border-white/10 bg-[#1b1b1d]/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 shadow-lg green-glow">
              <LightBulbIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold green-text-gradient">
                Valuto AI
              </h1>
              <p className="text-sm font-medium text-valuto-green-300">Your friendly financial assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container - Fixed height to fit viewport */}
      <div className="flex-1 flex flex-col min-h-0">
        <Conversation className="relative z-10 max-w-4xl mx-auto px-6 flex-1 flex flex-col min-h-0">
          <ConversationContent className="flex-1 min-h-0">
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
                    <p className={`text-sm mt-2 ${
                      message.role === 'user' ? 'text-green-100/90' : 'text-[#9a9a9d]'
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
              className="mb-2 flex-shrink-0"
            />
          )}

          {/* Input Area - Fixed at bottom */}
          <div className="flex-shrink-0 mb-4">
            <PromptInput
              value={inputText}
              onChange={setInputText}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </Conversation>
      </div>

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
