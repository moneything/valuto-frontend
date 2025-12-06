const BBC_FEED_URL = 'https://feeds.bbci.co.uk/news/business/rss.xml';
const FT_FEED_URL = 'https://www.ft.com/companies?format=rss';

// Simple in-memory cache to reduce external calls
let cachedNews = {
  items: [],
  fetchedAt: 0,
};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const stripCdata = (value = '') =>
  value.replace(/<!\[CDATA\[|\]\]>/g, '').trim();

const stripHtml = (value = '') =>
  stripCdata(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getTagValue = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? stripCdata(match[1]) : '';
};

const parseRssItems = (xml) => {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    items.push({
      title: getTagValue(itemXml, 'title'),
      link: getTagValue(itemXml, 'link'),
      description: getTagValue(itemXml, 'description'),
      pubDate: getTagValue(itemXml, 'pubDate'),
      category: getTagValue(itemXml, 'category'),
    });
  }

  return items;
};

const normalizeItem = (item, source) => {
  const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();
  const summary = stripHtml(item.description).slice(0, 220);

  return {
    id: item.link || `${source}-${publishedAt.getTime()}`,
    title: item.title || 'Untitled',
    summary,
    link: item.link || '#',
    time: publishedAt.toISOString(),
    source,
    category: item.category || 'Markets',
  };
};

const fetchFeed = async (url, source) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${source} feed`);
  }
  const xml = await response.text();
  const items = parseRssItems(xml);
  return items.map((item) => normalizeItem(item, source));
};

const fetchFinancialNews = async (limit = 10) => {
  const now = Date.now();
  if (cachedNews.items.length && now - cachedNews.fetchedAt < CACHE_TTL) {
    return cachedNews.items.slice(0, limit);
  }

  try {
    const [bbcNews, ftNews] = await Promise.all([
      fetchFeed(BBC_FEED_URL, 'BBC News'),
      fetchFeed(FT_FEED_URL, 'Financial Times'),
    ]);

    const combined = [...bbcNews, ...ftNews].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    cachedNews = {
      items: combined,
      fetchedAt: now,
    };

    return combined.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch external news feeds', error);
    // Return stale cache if available, otherwise empty list
    return cachedNews.items.slice(0, limit);
  }
};

module.exports = {
  fetchFinancialNews,
};
