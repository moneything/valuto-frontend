"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface ResponseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  isStreaming?: boolean;
}

export function Response({ 
  children, 
  isStreaming = false, 
  className, 
  ...props 
}: ResponseProps) {
  return (
    <div className={cn("prose prose-sm max-w-none", className)} {...props}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="ml-2">{children}</li>,
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 bg-valuto-green-50 text-valuto-green-700 rounded text-xs font-mono">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-valuto-green-300 pl-4 italic text-gray-700">
              {children}
            </blockquote>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-1 h-4 bg-valuto-green-600 animate-pulse ml-1" />
      )}
    </div>
  );
}

