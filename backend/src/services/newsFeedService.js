const BBC_FEED_URL = 'https://feeds.bbci.co.uk/news/business/rss.xml';
const FT_FEED_URL = 'https://www.ft.com/companies?format=rss';
const GUARDIAN_FEED_URL = 'https://www.theguardian.com/uk/business/rss';
const SKY_FEED_URL = 'https://feeds.skynews.com/feeds/rss/business.xml';
const CNBC_FEED_URL = 'https://www.cnbc.com/id/10001147/device/rss/rss.html';
const ECONOMIST_FEED_URL = 'https://www.economist.com/business/rss.xml';

const CATEGORIES = [
  'Bills',
  'Benefits',
  'Jobs',
  'Savings',
  'Investing',
  'Property',
  'Scams',
];

// Simple in-memory cache to reduce external calls
let cachedNews = {
  items: [],
  fetchedAt: 0,
};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const stripCdata = (value = '') =>
  value.replace(/<!\[CDATA\[|\]\]>/g, '').trim();

const decodeHtml = (value = '') => {
  const named = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    pound: '£',
    euro: '€',
    yen: '¥',
    hellip: '…',
    laquo: '«',
    raquo: '»',
    ldquo: '“',
    rdquo: '”',
    lsquo: '‘',
    rsquo: '’',
    ndash: '–',
    mdash: '—',
    copy: '©',
    reg: '®',
    trade: '™',
    sect: '§',
    bull: '•',
    middot: '·',
    prime: '′',
    Prime: '″',
    deg: '°',
    plusmn: '±',
  };

  return value
    .replace(/&([a-zA-Z]+);/g, (_, name) => {
      const key = name.toLowerCase();
      return named[key] ?? `&${name};`;
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      const code = parseInt(hex, 16);
      return Number.isNaN(code) ? '' : String.fromCharCode(code);
    })
    .replace(/&#(\d+);/g, (_, num) => {
      const code = parseInt(num, 10);
      return Number.isNaN(code) ? '' : String.fromCharCode(code);
    })
    .replace(/&amp;/gi, '&');
};

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
  const decodedTitle = decodeHtml(item.title || '');
  const decodedDescription = decodeHtml(item.description || '');
  const cleanDescription = stripHtml(decodedDescription);
  const sentences = cleanDescription.split(/(?<=[.!?])\s+/).filter(Boolean);

  const mapCategory = (raw = '') => {
    const value = raw.toLowerCase();
    if (value.includes('bill')) return 'Bills';
    if (value.includes('benefit')) return 'Benefits';
    if (value.includes('job') || value.includes('employment') || value.includes('hiring')) return 'Jobs';
    if (value.includes('saving') || value.includes('budget')) return 'Savings';
    if (value.includes('invest') || value.includes('market') || value.includes('stock')) return 'Investing';
    if (value.includes('property') || value.includes('housing') || value.includes('mortgage')) return 'Property';
    if (value.includes('scam') || value.includes('fraud') || value.includes('cyber')) return 'Scams';
    return '';
  };

  const category =
    mapCategory(item.category) ||
    mapCategory(decodedTitle) ||
    mapCategory(cleanDescription) ||
    'All';

  const keywordScore = (text) => {
    const lower = text.toLowerCase();
    let score = 0;
    const generalKeywords = ['%','percent','rate','price','loan','interest','inflation','budget','rise','fall','increase','decrease','saving','invest','market','bank','fraud','scam','warning','grant'];
    const categoryKeywords = {
      Bills: ['bill','energy','utility','tariff'],
      Benefits: ['benefit','allowance','support','payment'],
      Jobs: ['job','employment','hiring','wage','salary'],
      Savings: ['saving','budget','deposit','account'],
      Investing: ['invest','market','stocks','fund','bond'],
      Property: ['property','mortgage','rent','housing'],
      Scams: ['scam','fraud','phishing','warning'],
    };

    generalKeywords.forEach((k) => {
      if (lower.includes(k)) score += 2;
    });
    (categoryKeywords[category] || []).forEach((k) => {
      if (lower.includes(k)) score += 3;
    });
    if (/[£$€]\s*\d|\d+%/.test(text)) score += 3;

    const words = text.split(/\s+/).length;
    if (words >= 10 && words <= 35) score += 2;
    if (words > 50) score -= 1;

    return score;
  };

  const scored = sentences.map((s, idx) => ({
    text: s.trim(),
    idx,
    score: keywordScore(s) + (idx === 0 ? 1 : 0),
  }));

  const top = scored
    .sort((a, b) => b.score - a.score || a.idx - b.idx)
    .slice(0, 2)
    .sort((a, b) => a.idx - b.idx)
    .map((s) => s.text);

  const summarySource = top.length ? top.join(' ') : cleanDescription;
  const summary = summarySource.slice(0, 260);

  return {
    id: item.link || `${source}-${publishedAt.getTime()}`,
    title: decodedTitle || 'Untitled',
    summary,
    link: item.link || '#',
    time: publishedAt.toISOString(),
    source,
    category,
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

const ensureCategoryCoverage = (items, perCategory) => {
  // Keep all real items, add fallbacks only when a category has fewer than perCategory
  let result = [...items];

  CATEGORIES.forEach((category) => {
    const existing = result.filter((item) => item.category === category);
    const seenSources = new Set(existing.map((i) => i.source));
    let needed = perCategory - existing.length;
    if (needed <= 0) return;

    const additions = [];

    // Prefer unique sources from other categories
    for (const item of items) {
      if (needed === 0) break;
      if (item.category === category) continue;
      if (seenSources.has(item.source)) continue;
      additions.push({ ...item, id: `${item.id}-${category}-${additions.length}`, category });
      seenSources.add(item.source);
      needed -= 1;
    }

    // If still short, allow repeats of sources from other categories
    if (needed > 0) {
      for (const item of items) {
        if (needed === 0) break;
        if (item.category === category) continue;
        additions.push({ ...item, id: `${item.id}-${category}-${additions.length}`, category });
        needed -= 1;
      }
    }

    result.push(...additions);
  });

  // Resort everything by recency
  result = result.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  // Deduplicate identical ids that may have slipped in
  const seen = new Set();
  return result.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const fetchFinancialNews = async (perCategory = 5) => {
  const now = Date.now();
  if (cachedNews.items.length && now - cachedNews.fetchedAt < CACHE_TTL) {
    return ensureCategoryCoverage(cachedNews.items, perCategory);
  }

  try {
    const [bbcNews, ftNews, guardianNews, skyNews, cnbcNews, economistNews] = await Promise.all([
      fetchFeed(BBC_FEED_URL, 'BBC News'),
      fetchFeed(FT_FEED_URL, 'Financial Times'),
      fetchFeed(GUARDIAN_FEED_URL, 'The Guardian'),
      fetchFeed(SKY_FEED_URL, 'Sky News'),
      fetchFeed(CNBC_FEED_URL, 'CNBC'),
      fetchFeed(ECONOMIST_FEED_URL, 'The Economist'),
    ]);

    const combined = [
      ...bbcNews,
      ...ftNews,
      ...guardianNews,
      ...skyNews,
      ...cnbcNews,
      ...economistNews,
    ].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentCombined = combined.filter((item) => {
      const ts = new Date(item.time).getTime();
      return !Number.isNaN(ts) && ts >= cutoff;
    });

    cachedNews = {
      items: recentCombined,
      fetchedAt: now,
    };

    return ensureCategoryCoverage(recentCombined, perCategory);
  } catch (error) {
    console.error('Failed to fetch external news feeds', error);
    // Return stale cache if available, otherwise empty list
    return ensureCategoryCoverage(cachedNews.items, perCategory);
  }
};

module.exports = {
  fetchFinancialNews,
};
