"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNewsAndEvents, NewsItem, EventItem } from '@/lib/api/news';
import { cn } from '@/lib/utils';

interface NewsAndEventsProps {
  className?: string;
}

export default function NewsAndEvents({ className }: NewsAndEventsProps) {
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (limit = newsLimit) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNewsAndEvents({ newsLimit: limit });
      setNews(data.news);
      setEvents(data.events);
      setNewsLimit(limit);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to load news and events');
    } finally {
      setLoading(false);
    }
  };

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
        return { border: 'border-l-emerald-500 border-r-emerald-500 border-t-emerald-500 border-b-emerald-500', accent: 'text-emerald-600', pill: 'bg-emerald-100 text-emerald-700' };
      case 'Benefits':
        return { border: 'border-l-pink-500 border-r-pink-500 border-t-pink-500 border-b-pink-500', accent: 'text-pink-600', pill: 'bg-pink-100 text-pink-700' };
      case 'Jobs':
        return { border: 'border-l-amber-500 border-r-amber-500 border-t-amber-500 border-b-amber-500', accent: 'text-amber-600', pill: 'bg-amber-100 text-amber-700' };
      case 'Savings':
        return { border: 'border-l-teal-500 border-r-teal-500 border-t-teal-500 border-b-teal-500', accent: 'text-teal-600', pill: 'bg-teal-100 text-teal-700' };
      case 'Investing':
        return { border: 'border-l-blue-500 border-r-blue-500 border-t-blue-500 border-b-blue-500', accent: 'text-blue-600', pill: 'bg-blue-100 text-blue-700' };
      case 'Property':
        return { border: 'border-l-purple-500 border-r-purple-500 border-t-purple-500 border-b-purple-500', accent: 'text-purple-600', pill: 'bg-purple-100 text-purple-700' };
      case 'Scams':
        return { border: 'border-l-red-500 border-r-red-500 border-t-red-500 border-b-red-500', accent: 'text-red-600', pill: 'bg-red-100 text-red-700' };
      default:
        return { border: 'border-l-gray-400 border-r-gray-400 border-t-gray-400 border-b-gray-400', accent: 'text-gray-700', pill: 'bg-gray-100 text-gray-700' };
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
          "p-5 hover:shadow-lg transition-all duration-200 cursor-pointer border rounded-2xl",
          style.border,
          "h-full flex flex-col"
        )}>
          <div className="flex items-center justify-between mb-3">
            <span className={cn("px-3 py-1 rounded-full text-sm font-semibold", style.pill)}>
              {item.category || 'All'}
            </span>
            <span className="text-sm text-gray-500 flex-shrink-0">
              {formatTime(item.time)}
            </span>
          </div>

          <h4 className="font-semibold text-gray-900 text-lg mb-3 leading-snug">
            {item.title}
          </h4>

          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {item.summary}
          </p>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
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
              className="text-sm px-4 py-2 rounded-lg bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200"
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
      <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-green-500">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
            {item.title}
          </h4>
          <span className="text-sm text-gray-500 ml-2 flex-shrink-0">
            {formatEventDate(item.date)}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            📍 {item.location}
          </span>
          <span className="flex items-center gap-1">
            💰 {item.price}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-600 font-medium">
            {item.source}
          </span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
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
          <p className="text-gray-600">Loading latest news and events...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="text-center">
          <div className="text-4xl mb-4">📰</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load News & Events</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadData} variant="outline">
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
            <h2 className="text-2xl font-bold text-gray-900">News & Events</h2>
            <p className="text-sm text-gray-600">
              Latest financial news & UK networking events
            </p>
          </div>
        </div>
        <Button
          onClick={loadData}
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
            "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
            activeTab === 'news'
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          📈 Financial News ({news.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
            activeTab === 'events'
              ? "bg-green-100 text-green-700 border border-green-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                        "px-3 py-1.5 rounded-full border text-sm transition-colors",
                        isActive
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-gray-600 border-gray-200 hover:bg-gray-100"
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
                  <p className="text-gray-600">No financial news available at the moment.</p>
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
                  <p className="text-gray-600">No networking events available at the moment.</p>
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
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      )}
    </Card>
  );
}
