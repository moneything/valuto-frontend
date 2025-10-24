/**
 * Seed News and Events
 * Populates the database with sample financial news and networking events
 */

const mongoose = require('mongoose');
require('dotenv').config();

const News = require('../models/News');
const Event = require('../models/Event');

const sampleNews = [
  {
    title: "Bank of England Holds Interest Rates Steady",
    summary: "The Bank of England has decided to maintain the base rate at current levels, citing stabilizing inflation and economic growth concerns.",
    link: "https://www.ft.com",
    source: "Financial Times",
    category: "economy",
    publishedAt: new Date()
  },
  {
    title: "Tech Stocks Rally on AI Boom",
    summary: "Major technology companies see significant gains as artificial intelligence investments continue to drive market enthusiasm.",
    link: "https://www.ft.com",
    source: "Financial Times",
    category: "stocks",
    publishedAt: new Date(Date.now() - 3600000)
  },
  {
    title: "Understanding ISAs: A Beginner's Guide",
    summary: "Learn about Individual Savings Accounts (ISAs) and how they can help you save tax-free for your future financial goals.",
    link: "https://www.moneysavingexpert.com",
    source: "Money Saving Expert",
    category: "personal-finance",
    publishedAt: new Date(Date.now() - 7200000)
  },
  {
    title: "Bitcoin Surges Past Key Resistance Level",
    summary: "Cryptocurrency markets show renewed strength as Bitcoin breaks through technical barriers, attracting institutional interest.",
    link: "https://www.coindesk.com",
    source: "CoinDesk",
    category: "crypto",
    publishedAt: new Date(Date.now() - 10800000)
  },
  {
    title: "UK Small Businesses Report Growth Optimism",
    summary: "Survey shows increased confidence among British entrepreneurs despite ongoing economic challenges and regulatory changes.",
    link: "https://www.ft.com",
    source: "Financial Times",
    category: "business",
    publishedAt: new Date(Date.now() - 14400000)
  }
];

const sampleEvents = [
  {
    title: "Young Entrepreneurs Networking Night",
    date: "Nov 15, 2025 • 6:00 PM",
    location: "London Tech Hub, Shoreditch",
    price: "Free",
    link: "https://www.eventbrite.co.uk",
    source: "Eventbrite",
    category: "networking",
    eventDate: new Date('2025-11-15T18:00:00')
  },
  {
    title: "Financial Literacy Workshop for Students",
    date: "Nov 20, 2025 • 2:00 PM",
    location: "Manchester Central Library",
    price: "£5",
    link: "https://www.eventbrite.co.uk",
    source: "Eventbrite",
    category: "workshop",
    eventDate: new Date('2025-11-20T14:00:00')
  },
  {
    title: "Investing 101: Getting Started Webinar",
    date: "Nov 18, 2025 • 7:00 PM",
    location: "Online",
    price: "Free",
    link: "https://www.eventbrite.co.uk",
    source: "Eventbrite",
    category: "webinar",
    eventDate: new Date('2025-11-18T19:00:00')
  },
  {
    title: "UK FinTech Conference 2025",
    date: "Dec 5-6, 2025",
    location: "ExCeL London",
    price: "£299 (Student: £99)",
    link: "https://www.fintechconference.co.uk",
    source: "FinTech Events",
    category: "conference",
    eventDate: new Date('2025-12-05T09:00:00')
  },
  {
    title: "Cryptocurrency & Blockchain Meetup",
    date: "Nov 22, 2025 • 6:30 PM",
    location: "Birmingham Innovation Centre",
    price: "Free",
    link: "https://www.meetup.com",
    source: "Meetup",
    category: "meetup",
    eventDate: new Date('2025-11-22T18:30:00')
  }
];

async function seedNewsAndEvents() {
  try {
    console.log('🌱 Starting to seed news and events...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/valuto');
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing)
    // await News.deleteMany({});
    // await Event.deleteMany({});
    // console.log('🗑️  Cleared existing news and events');

    // Insert sample data
    const [insertedNews, insertedEvents] = await Promise.all([
      News.insertMany(sampleNews),
      Event.insertMany(sampleEvents)
    ]);

    console.log(`✅ Successfully inserted ${insertedNews.length} news articles`);
    console.log(`✅ Successfully inserted ${insertedEvents.length} events`);

    // Display created items
    console.log('\n📰 Created News:');
    insertedNews.forEach((news, index) => {
      console.log(`${index + 1}. ${news.title} (${news.category})`);
    });

    console.log('\n📅 Created Events:');
    insertedEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} (${event.category})`);
    });

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news and events:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedNewsAndEvents();
}

module.exports = { seedNewsAndEvents, sampleNews, sampleEvents };

