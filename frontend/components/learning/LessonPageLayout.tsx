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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Back button at the top */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-green-700 text-white font-extrabold  border-2 border-green-700 p-2 rounded-xl mb-4"
        >
          ← {backLabel}
        </button>

        {/* Compact header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-blue-500 flex items-center justify-center">
            {icon}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

            {subtitle && (
              <p className="text-gray-600 text-sm mt-1 max-w-xl">
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
