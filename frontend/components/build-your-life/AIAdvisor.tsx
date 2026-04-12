"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import { GameState } from "@/components/build-your-life/types";

interface Props {
  state: GameState;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What should I do next?",
  "Why did my wealth drop?",
  "Should I invest or save?",
  "What is compound interest?",
];

export default function AIAdvisor({ state }: Props) {
  const { getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const buildContext = () =>
    `Player is age ${state.age}. Career: ${state.careerTitle}. Net worth: GBP${state.netWorth.toLocaleString()}. Salary: GBP${state.salary.toLocaleString()}. Savings: GBP${state.savings.toLocaleString()}. Investments: GBP${state.investments.toLocaleString()}. Debt: GBP${state.debt.toLocaleString()}. Housing: ${state.housing}. Lifestyle: ${state.lifestyle}. Happiness: ${state.happiness}%. Stress: ${state.stress}%. Traits: ${state.traits.join(", ")}. Relationship: ${state.relationshipStatus}. Social pressure: ${state.socialPressure}%.`;

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const token = await getToken({ template: "default" });
      if (!token) {
        throw new Error("Please sign in to use Valuto AI.");
      }

      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${apiBaseUrl}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: `Build Your Life simulator context: ${buildContext()}\n\nStudent question: ${text}`,
          history: nextMessages.slice(-8).map((message) => ({
            role: message.role,
            text: message.content,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "I could not generate a reply right now.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.data?.message || "I could not generate a response. Try again." },
      ]);
    } catch (error: any) {
      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: error?.message || "Sorry, I am having trouble connecting right now." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((previous) => !previous)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-2xl text-[#03110b] shadow-[0_0_22px_rgba(16,185,129,0.24)]"
      >
        {isOpen ? "✕" : "🤖"}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 overflow-hidden rounded-2xl border border-white/8 bg-[rgba(27,31,39,0.98)] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:w-96"
          >
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-3 text-[#03110b]">
              <div className="flex items-center gap-3">
                <span className="text-xl">🤖</span>
                <div>
                  <div className="font-display text-sm font-bold">Valuto AI</div>
                  <div className="text-xs text-[#143126]">Financial advisor</div>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="h-64 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="mb-4 text-sm text-[#94a8a0]">Ask me anything about your financial life.</p>
                  <div className="space-y-2">
                    {QUICK_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        onClick={() => send(question)}
                        className="block w-full rounded-lg border border-white/8 bg-[#1B1F27] px-3 py-2 text-left text-xs text-white transition-colors hover:border-emerald-400/30"
                      >
                        💬 {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b]"
                        : "border border-white/8 bg-[#1B1F27] text-white"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_li]:my-1">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="rounded-xl border border-white/8 bg-[#1B1F27] px-4 py-2">
                    <motion.div
                      className="flex gap-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    </motion.div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/8 p-3">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask Valuto AI..."
                  className="flex-1 rounded-lg border border-white/8 bg-[#1B1F27] px-3 py-2 text-sm text-white outline-none placeholder:text-[#7d9188] focus:border-emerald-400/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 px-3 py-2 text-[#03110b] disabled:opacity-50"
                >
                  ↑
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
