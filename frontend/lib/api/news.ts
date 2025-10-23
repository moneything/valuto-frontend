const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  time: string;
  source: string;
  category: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  link: string;
  source: string;
  category: string;
}

export interface NewsAndEvents {
  news: NewsItem[];
  events: EventItem[];
}

// Fetch financial news
export async function fetchFinancialNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch financial news');
    }
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching financial news:', error);
    return [];
  }
}

// Fetch networking events
export async function fetchNetworkingEvents(): Promise<EventItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch networking events');
    }
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching networking events:', error);
    return [];
  }
}

// Fetch both news and events
export async function fetchNewsAndEvents(): Promise<NewsAndEvents> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch news and events');
    }
    const data = await response.json();
    return data.success ? data.data : { news: [], events: [] };
  } catch (error) {
    console.error('Error fetching news and events:', error);
    return { news: [], events: [] };
  }
}
