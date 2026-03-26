"use client";

import React from "react";
import Link from "next/link";

export default function LessonPageLayout({
  backHref = "/dashboard/learning-modules",
  backLabel = "Back to all lessons",
  icon,
  title,
  subtitle,
  badges,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badges?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,hsl(0_0%_7%),hsl(0_0%_9%),hsl(152_20%_8%))] text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Back button at the top */}
        <button
          onClick={() => window.history.back()}
          className="mb-4 flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/15 p-2 font-extrabold text-primary transition-colors hover:bg-primary/20"
        >
          ← {backLabel}
        </button>

        {/* Compact header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-blue-500 flex items-center justify-center">
            {icon}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>

            {subtitle && (
              <p className="mt-1 max-w-xl text-sm text-[#9a9a9d]">
                {subtitle}
              </p>
            )}

            {badges && (
              <div className="flex items-center gap-2 mt-2">
                {badges}
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
