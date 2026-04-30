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

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
  };
}

// Fetch financial news
export async function fetchFinancialNews(token: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/news`, {
      headers: authHeaders(token),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to fetch financial news');
    }

    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching financial news:', error);
    throw error;
  }
}

// Fetch networking events
export async function fetchNetworkingEvents(token: string): Promise<EventItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/events`, {
      headers: authHeaders(token),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to fetch networking events');
    }

    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching networking events:', error);
    throw error;
  }
}

// Fetch both news and events
export async function fetchNewsAndEvents(token: string, params?: { newsLimit?: number; eventsLimit?: number }): Promise<NewsAndEvents> {
  try {
    const query = new URLSearchParams();
    if (params?.newsLimit) query.append('newsLimit', params.newsLimit.toString());
    if (params?.eventsLimit) query.append('eventsLimit', params.eventsLimit.toString());

    const response = await fetch(`${API_BASE_URL}/api/news/all${query.toString() ? `?${query.toString()}` : ''}`, {
      headers: authHeaders(token),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to fetch news and events');
    }

    return data.success ? data.data : { news: [], events: [] };
  } catch (error) {
    console.error('Error fetching news and events:', error);
    throw error;
  }
}
