"use client";

import NewsAndEvents from "@/components/NewsAndEvents";

export default function DashboardNewsPage() {
  return (
    <main className="relative z-20 px-4 py-10 sm:px-6 lg:pl-32 lg:pr-8">
      <div className="mx-auto max-w-7xl">
        <NewsAndEvents />
      </div>
    </main>
  );
}
