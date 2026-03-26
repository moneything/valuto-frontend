"use client";

import NewsAndEvents from "@/components/NewsAndEvents";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <NewsAndEvents />
      </div>
    </main>
  );
}
