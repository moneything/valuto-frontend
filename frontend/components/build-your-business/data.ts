import {
  Achievement,
  BusinessEvent,
  BusinessIdea,
  Employee,
  MarketingChannel,
} from "@/components/build-your-business/types";

export const BUSINESS_IDEAS: BusinessIdea[] = [
  { id: "clothing", name: "Clothing Brand", icon: "👕", description: "Design and sell your own streetwear or fashion line online.", difficulty: "medium", startingCost: 500, marketDemand: 78, competition: 72, category: "Fashion" },
  { id: "online-store", name: "Online Store", icon: "🛒", description: "Curate and resell trending products through an e-commerce shop.", difficulty: "easy", startingCost: 200, marketDemand: 85, competition: 80, category: "E-Commerce" },
  { id: "tutoring", name: "Tutoring Service", icon: "📚", description: "Offer maths, science or language tutoring to younger students.", difficulty: "easy", startingCost: 50, marketDemand: 70, competition: 55, category: "Education" },
  { id: "tech-app", name: "Tech App", icon: "📱", description: "Build an app that solves a real problem for your generation.", difficulty: "hard", startingCost: 800, marketDemand: 90, competition: 65, category: "Technology" },
  { id: "food", name: "Food Business", icon: "🍰", description: "Start a baking, meal-prep or snack brand from your kitchen.", difficulty: "medium", startingCost: 300, marketDemand: 82, competition: 60, category: "Food & Drink" },
  { id: "creator", name: "Content Creator Brand", icon: "🎬", description: "Monetise your audience through merch, sponsorships and digital products.", difficulty: "medium", startingCost: 100, marketDemand: 88, competition: 75, category: "Media" },
];

export const MARKETING_CHANNELS: MarketingChannel[] = [
  { id: "tiktok", name: "TikTok Ads", icon: "🎵", costPerWeek: 80, conversionRate: 4.2, reach: 5000, description: "Short-form video ads targeting Gen Z audiences." },
  { id: "instagram", name: "Instagram Marketing", icon: "📸", costPerWeek: 60, conversionRate: 3.1, reach: 3500, description: "Stories, Reels and feed posts to build your brand." },
  { id: "influencer", name: "Influencer Partnerships", icon: "⭐", costPerWeek: 200, conversionRate: 5.5, reach: 8000, description: "Partner with creators to promote your product." },
  { id: "word-of-mouth", name: "Word of Mouth", icon: "🗣", costPerWeek: 0, conversionRate: 8.0, reach: 500, description: "Free but slow. Relies on happy customers sharing." },
  { id: "paid-ads", name: "Paid Advertising", icon: "📢", costPerWeek: 150, conversionRate: 3.8, reach: 7000, description: "Google and YouTube ads for broader reach." },
];

export const AVAILABLE_EMPLOYEES: Employee[] = [
  { id: "e1", name: "Alex Chen", role: "Marketing Assistant", productivity: 65, creativity: 80, cost: 120, experience: "junior", avatar: "👩‍💻" },
  { id: "e2", name: "Jordan Smith", role: "Operations Manager", productivity: 85, creativity: 50, cost: 200, experience: "mid", avatar: "👨‍💼" },
  { id: "e3", name: "Sam Williams", role: "Designer", productivity: 70, creativity: 95, cost: 150, experience: "mid", avatar: "🎨" },
  { id: "e4", name: "Taylor Brown", role: "Sales Rep", productivity: 90, creativity: 40, cost: 100, experience: "junior", avatar: "📞" },
  { id: "e5", name: "Morgan Davis", role: "Finance Analyst", productivity: 80, creativity: 30, cost: 250, experience: "senior", avatar: "📊" },
  { id: "e6", name: "Riley Johnson", role: "Social Media Manager", productivity: 75, creativity: 90, cost: 130, experience: "junior", avatar: "📱" },
];

export const BUSINESS_EVENTS: BusinessEvent[] = [
  {
    id: "viral",
    title: "You Went Viral!",
    description: "One of your posts just hit 500K views on TikTok. Customers are flooding in.",
    icon: "🔥",
    type: "positive",
    choices: [
      { id: "v1", text: "Capitalise immediately and launch a flash sale", effects: { revenue: 800, customers: 120, stress: 15 }, lesson: "Timing is everything. Viral moments are rare, so capitalise fast." },
      { id: "v2", text: "Stay calm and build long-term brand value", effects: { revenue: 300, customers: 60, reputation: 10 }, lesson: "Building a lasting brand beats short-term hype." },
    ],
  },
  {
    id: "supplier",
    title: "Supplier Problem",
    description: "Your main supplier just increased prices by 30%. Your margins are at risk.",
    icon: "⚠️",
    type: "negative",
    choices: [
      { id: "s1", text: "Absorb the cost and keep prices the same", effects: { profit: -200, satisfaction: 5 }, lesson: "Absorbing costs protects customers but squeezes your margins." },
      { id: "s2", text: "Find a new cheaper supplier", effects: { profit: -50, satisfaction: -5, stress: 10 }, lesson: "Switching suppliers is risky but can save money long-term." },
      { id: "s3", text: "Raise your prices slightly", effects: { profit: 50, customers: -20, satisfaction: -10 }, lesson: "Price increases can hurt customer loyalty if not handled well." },
    ],
  },
  {
    id: "competitor",
    title: "Competitor Alert",
    description: "A well-funded competitor just launched a very similar product at a lower price.",
    icon: "🏴",
    type: "negative",
    choices: [
      { id: "c1", text: "Differentiate through quality and branding", effects: { reputation: 10, customers: -15, expenses: 100 }, lesson: "Differentiation is your best defence against competitors." },
      { id: "c2", text: "Match their price", effects: { profit: -150, customers: 20 }, lesson: "Price wars erode profits. Compete on value, not only price." },
    ],
  },
  {
    id: "economic",
    title: "Economic Slowdown",
    description: "Consumer spending is dropping. People are being more careful with money.",
    icon: "📉",
    type: "negative",
    choices: [
      { id: "ec1", text: "Cut costs aggressively", effects: { expenses: -200, stress: 20, satisfaction: -10 }, lesson: "Cutting too deep can hurt quality and morale." },
      { id: "ec2", text: "Keep investing and ride it out", effects: { expenses: 100, reputation: 5, customers: -30 }, lesson: "Staying invested during downturns can pay off when recovery hits." },
    ],
  },
  {
    id: "influencer-endorsement",
    title: "Influencer Endorsement!",
    description: "A popular influencer with 2M followers just discovered your brand and loves it.",
    icon: "🌟",
    type: "positive",
    choices: [
      { id: "ie1", text: "Offer them a paid partnership", effects: { expenses: 300, customers: 200, revenue: 1000 }, lesson: "Strategic partnerships can accelerate growth." },
      { id: "ie2", text: "Send free products and hope for organic promotion", effects: { expenses: 50, customers: 80, revenue: 400 }, lesson: "Organic endorsements feel authentic but are less predictable." },
    ],
  },
  {
    id: "press",
    title: "Press Feature",
    description: "A national newspaper wants to feature your startup story.",
    icon: "📰",
    type: "positive",
    choices: [
      { id: "p1", text: "Do the interview and share your journey", effects: { reputation: 15, customers: 50, revenue: 200 }, lesson: "Media coverage builds credibility and trust." },
      { id: "p2", text: "Decline and stay focused on the business", effects: { stress: -5 }, lesson: "Sometimes focus beats publicity, but opportunities are rare." },
    ],
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "first-sale", title: "First Sale!", description: "Earned your first revenue", icon: "💰", unlocked: false, condition: (m) => m.revenue > 0 },
  { id: "thousand", title: "£1,000 Revenue", description: "Hit £1,000 total revenue", icon: "📈", unlocked: false, condition: (m) => m.revenue >= 1000 },
  { id: "profitable", title: "Profitable Business", description: "Your profit is positive", icon: "✅", unlocked: false, condition: (m) => m.profit > 0 },
  { id: "five-k", title: "£5K Revenue", description: "Reached £5,000 in revenue", icon: "🚀", unlocked: false, condition: (m) => m.revenue >= 5000 },
  { id: "ten-k", title: "£10K Revenue", description: "Reached £10,000 in revenue", icon: "💎", unlocked: false, condition: (m) => m.revenue >= 10000 },
  { id: "hundred-customers", title: "100 Customers", description: "Served 100 customers", icon: "👥", unlocked: false, condition: (m) => m.customers >= 100 },
  { id: "high-rep", title: "Trusted Brand", description: "Reputation above 80", icon: "⭐", unlocked: false, condition: (m) => m.reputation >= 80 },
  { id: "valuation-100k", title: "£100K Valuation", description: "Company valued at £100,000", icon: "🏆", unlocked: false, condition: (m) => m.valuation >= 100000 },
];

export const BUSINESS_LESSONS: Record<string, string> = {
  "low-price": "Low margins make scaling difficult. Every pound counts when you're growing.",
  "no-marketing": "Great products still need marketing. If nobody knows about you, nobody can buy.",
  overspend: "Rapid growth without financial control can cause failure. Watch your cash flow.",
  "high-stress": "Burnout is real. Even entrepreneurs need balance to make good decisions.",
  "good-reputation": "A strong reputation compounds over time. Word-of-mouth is priceless.",
  diversify: "Do not rely on one income stream. Diversification reduces risk.",
};
