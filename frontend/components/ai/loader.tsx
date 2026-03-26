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
        "rounded-2xl border border-white/10 bg-[#232324]/95 px-5 py-3 shadow-lg backdrop-blur-sm",
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
        <span className="text-sm font-medium text-[#9a9a9d]">{text}</span>
      </div>
    </div>
  );
}
