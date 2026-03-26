"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SuggestionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function Suggestions({ 
  suggestions, 
  onSelect, 
  className, 
  ...props 
}: SuggestionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 px-4 py-3",
        className
      )}
      {...props}
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className={cn(
            "rounded-full border border-white/10 bg-[#232324]/95 px-4 py-2 backdrop-blur-sm",
            "text-sm font-medium text-[#d7d7db]",
            "hover:bg-white/[0.06] hover:border-valuto-green-500/20 hover:text-white",
            "transition-all duration-200 hover:shadow-md",
            "green-card-hover"
          )}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
