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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNewsAndEvents();
      setNews(data.news);
      setEvents(data.events);
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

  const renderNewsItem = (item: NewsItem, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {item.title}
          </h4>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {formatTime(item.time)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.summary}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-blue-600 font-medium">
            {item.source}
          </span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Read more →
          </a>
        </div>
      </Card>
    </motion.div>
  );

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
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
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
          <span className="text-xs text-green-600 font-medium">
            {item.source}
          </span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-600 hover:text-green-800 font-medium"
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
          className="text-xs"
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
              {news.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-gray-600">No financial news available at the moment.</p>
                </div>
              ) : (
                news.map((item, index) => renderNewsItem(item, index))
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
          <p className="text-xs text-gray-500 text-center">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      )}
    </Card>
  );
}
