"use client";

import React, { useCallback, useState, useEffect } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNewsAndEvents, NewsItem, EventItem } from '@/lib/api/news';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';

interface NewsAndEventsProps {
  className?: string;
}

export default function NewsAndEvents({ className }: NewsAndEventsProps) {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newsLimit, setNewsLimit] = useState<number>(5);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const categories = [
    'All',
    'Bills',
    'Benefits',
    'Jobs',
    'Savings',
    'Investing',
    'Property',
    'Scams'
  ];

  const loadData = useCallback(async (limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken({ template: "default" });
      if (!token) throw new Error('Authentication token missing');

      const data = await fetchNewsAndEvents(token, { newsLimit: limit });
      setNews(data.news);
      setEvents(data.events);
      setNewsLimit(limit);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to load news and events');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    loadData(5);
  }, [loadData]);

  const formatTime = (timeString: string) => {
    if (timeString === 'Recently' || timeString === 'TBA') return timeString;
    
    try {
      const date = new Date(timeString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 48) return 'Yesterday';
      return date.toLocaleDateString();
    } catch {
      return timeString;
    }
  };

  const formatEventDate = (dateString: string) => {
    if (dateString === 'TBA') return 'TBA';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const categoryStyle = (category: string) => {
    switch (category) {
      case 'Bills':
        return { border: 'border-emerald-500/30', accent: 'text-emerald-300', pill: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300' };
      case 'Benefits':
        return { border: 'border-pink-500/30', accent: 'text-pink-300', pill: 'border border-pink-500/20 bg-pink-500/10 text-pink-300' };
      case 'Jobs':
        return { border: 'border-amber-500/30', accent: 'text-amber-300', pill: 'border border-amber-500/20 bg-amber-500/10 text-amber-300' };
      case 'Savings':
        return { border: 'border-teal-500/30', accent: 'text-teal-300', pill: 'border border-teal-500/20 bg-teal-500/10 text-teal-300' };
      case 'Investing':
        return { border: 'border-blue-500/30', accent: 'text-blue-300', pill: 'border border-blue-500/20 bg-blue-500/10 text-blue-300' };
      case 'Property':
        return { border: 'border-purple-500/30', accent: 'text-purple-300', pill: 'border border-purple-500/20 bg-purple-500/10 text-purple-300' };
      case 'Scams':
        return { border: 'border-red-500/30', accent: 'text-red-300', pill: 'border border-red-500/20 bg-red-500/10 text-red-300' };
      default:
        return { border: 'border-white/10', accent: 'text-[#d7d7db]', pill: 'border border-white/10 bg-white/[0.05] text-[#d7d7db]' };
    }
  };

  const renderNewsItem = (item: NewsItem, index: number) => {
    const style = categoryStyle(item.category);

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group"
      >
        <Card className={cn(
          "h-full cursor-pointer rounded-2xl border bg-white/[0.03] p-5 transition-all duration-200 hover:bg-white/[0.05]",
          style.border,
          "flex flex-col"
        )}>
          <div className="flex items-center justify-between mb-3">
            <span className={cn("px-3 py-1 rounded-full text-sm font-semibold", style.pill)}>
              {item.category || 'All'}
            </span>
            <span className="text-sm text-[#9a9a9d] flex-shrink-0">
              {formatTime(item.time)}
            </span>
          </div>

          <h4 className="mb-3 text-lg font-semibold leading-snug text-white">
            {item.title}
          </h4>

          <p className="mb-4 text-sm leading-relaxed text-[#d7d7db]">
            {item.summary}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-sm font-medium flex items-center gap-1", style.accent, "hover:underline")}
              onClick={(e) => e.stopPropagation()}
            >
              {item.source} ↗
            </a>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#e5e5e7] hover:bg-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              Read more
            </a>
          </div>
        </Card>
      </motion.div>
    );
  };

  const renderEventItem = (item: EventItem, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="cursor-pointer border-l-4 border-l-green-500/80 bg-white/[0.03] p-4 transition-all duration-200 hover:bg-white/[0.05]">
        <div className="flex justify-between items-start mb-2">
          <h4 className="line-clamp-2 font-semibold text-white transition-colors group-hover:text-green-300">
            {item.title}
          </h4>
          <span className="ml-2 flex-shrink-0 text-sm text-[#9a9a9d]">
            {formatEventDate(item.date)}
          </span>
        </div>
        <div className="mb-3 flex items-center gap-4 text-sm text-[#9a9a9d]">
          <span className="flex items-center gap-1">
            📍 {item.location}
          </span>
          <span className="flex items-center gap-1">
            💰 {item.price}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-green-300">
            {item.source}
          </span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-green-300 hover:text-green-200"
            onClick={(e) => e.stopPropagation()}
          >
            View event →
          </a>
        </div>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
          <p className="text-[#9a9a9d]">Loading latest news and events...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="text-center">
          <div className="text-4xl mb-4">📰</div>
          <h3 className="mb-2 text-lg font-semibold text-white">Unable to Load News & Events</h3>
          <p className="mb-4 text-[#9a9a9d]">{error}</p>
          <Button onClick={() => loadData(newsLimit)} variant="outline">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">📰</div>
          <div>
            <h2 className="text-2xl font-bold text-white">News & Events</h2>
            <p className="text-sm text-[#9a9a9d]">
              Latest financial news & UK networking events
            </p>
          </div>
        </div>
        <Button
          onClick={() => loadData(newsLimit)}
          variant="outline"
          size="sm"
          className="text-sm"
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('news')}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            activeTab === 'news'
              ? "border border-blue-500/20 bg-blue-500/10 text-blue-300"
              : "border border-white/10 text-[#9a9a9d] hover:bg-white/[0.05] hover:text-white"
          )}
        >
          📈 Financial News ({news.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            activeTab === 'events'
              ? "border border-green-500/20 bg-green-500/10 text-green-300"
              : "border border-white/10 text-[#9a9a9d] hover:bg-white/[0.05] hover:text-white"
          )}
        >
          🎯 Networking Events ({events.length})
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'news' ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  const count = category === 'All'
                    ? news.length
                    : news.filter((n) => n.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        isActive
                          ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                          : "border-white/10 text-[#9a9a9d] hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
              {news.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-[#9a9a9d]">No financial news available at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {news
                    .filter((item) => activeCategory === 'All' || item.category === activeCategory)
                    .map((item, index) => renderNewsItem(item, index))}
                </div>
              )}
              {news.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => loadData(newsLimit + 5)}
                    variant="outline"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'See 5 more'}
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-[#9a9a9d]">No networking events available at the moment.</p>
                </div>
              ) : (
                events.map((item, index) => renderEventItem(item, index))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {lastUpdated && (
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-center text-sm text-[#9a9a9d]">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      )}
    </Card>
  );
}
