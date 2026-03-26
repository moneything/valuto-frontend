"use client";

import DashboardDock from "@/components/DashboardDock";
import NewsAndEvents from "@/components/NewsAndEvents";

export default function NewsPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        backgroundColor: "hsl(0 0% 7%)",
        backgroundImage:
          "linear-gradient(160deg, hsl(0 0% 7%), hsl(0 0% 9%), hsl(152 20% 8%))",
        backgroundAttachment: "fixed",
      }}
    >
      <DashboardDock />
      <main className="relative z-20 px-4 py-10 sm:px-6 lg:pl-32 lg:pr-8">
        <div className="mx-auto max-w-7xl">
          <NewsAndEvents />
        </div>
      </main>
    </div>
  );
}
