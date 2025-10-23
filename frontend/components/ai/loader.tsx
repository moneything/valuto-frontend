"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function Loader({ className, text = "Valuto AI is thinking...", ...props }: LoaderProps) {
  return (
    <div
      className={cn(
        "bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3 shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-valuto-green-500 rounded-full animate-bounce" />
          <div 
            className="w-1.5 h-1.5 bg-valuto-green-500 rounded-full animate-bounce" 
            style={{ animationDelay: "0.1s" }} 
          />
          <div 
            className="w-1.5 h-1.5 bg-valuto-green-500 rounded-full animate-bounce" 
            style={{ animationDelay: "0.2s" }} 
          />
        </div>
        <span className="text-xs text-gray-600 font-medium">{text}</span>
      </div>
    </div>
  );
}

