"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnnouncementProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Announcement({ 
  href, 
  children, 
  className,
}: AnnouncementProps) {
  const baseClassName = cn(
    "group relative inline-flex items-center gap-2",
    "rounded-full border border-valuto-green-200 bg-white/80 backdrop-blur-sm",
    "px-3 py-1.5 text-sm font-medium text-gray-700",
    "transition-all duration-300",
    "hover:border-valuto-green-400 hover:bg-valuto-green-50 hover:shadow-md",
    href && "cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {children}
      </Link>
    );
  }

  return (
    <div className={baseClassName}>
      {children}
    </div>
  );
}

interface AnnouncementBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning";
}

export function AnnouncementBadge({ 
  variant = "default", 
  className, 
  children, 
  ...props 
}: AnnouncementBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold",
        variant === "default" && "bg-gray-100 text-gray-900",
        variant === "success" && "bg-valuto-green-100 text-valuto-green-700",
        variant === "warning" && "bg-yellow-100 text-yellow-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

