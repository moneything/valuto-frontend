const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

const DAILY_CHAT_LIMIT = 50;

const getTodayKey = () => new Date().toISOString().slice(0, 10);

/**
 * @desc Chat with Gemini (financial assistant)
 * @route POST /api/ai/chat
 * @access Private
 */
const chatWithGemini = asyncHandler(async (req, res) => {
  const { message, history } = req.body || {};
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedMessage) {
    throw new AppError('Message is required', 400);
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new AppError('AI service is not configured', 500);
  }

  const { userId, emailAddress, firstName, lastName } = req.auth;

  let user = await User.findOneAndUpdate(
    { clerkUserId: userId },
    {
      clerkUserId: userId,
      email: emailAddress,
      isActive: true,
      lastActiveDate: new Date(),
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (!user.name) {
    user.name = `${firstName || ''} ${lastName || ''}`.trim() || 'User';
  }

  const todayKey = getTodayKey();
  if (user.aiChatUsageDate !== todayKey) {
    user.aiChatUsageDate = todayKey;
    user.aiChatUsageCount = 0;
  }

  if (user.aiChatUsageCount >= DAILY_CHAT_LIMIT) {
    return res.status(429).json({
      success: false,
      message: 'Daily AI chat limit reached (5 per day).',
      data: {
        remaining: 0,
        limit: DAILY_CHAT_LIMIT,
      },
    });
  }

  const systemPrompt =
    'You are Valuto AI, a UK-focused financial learning coach for young people (Year 5 to Year 13 and beyond). ' +
    'Be friendly, coachy, and encouraging; use emojis where they fit naturally. ' +
    'Always respond in a consulting, non-absolute tone (avoid definitive guarantees). ' +
    'Adapt tone to the user’s age group: Gen Alpha (younger), Gen Z (teens), or young adults; if age is unknown, ask once briefly: "To help me explain things in the best way for you, what’s your age?" ' +
    'Focus on education and good habits: budgeting, saving, investing basics, debt awareness, and financial planning. ' +
    'Encourage platform engagement: suggest relevant learning modules, trivia games, and the investment calculator when helpful. ' +
    'If asked for news, suggest checking the in-app News section and summarize general concepts rather than claiming live updates. ' +
    'If asked about UK tax codes, explain that codes exist and recommend learning resources; avoid tax advice. ' +
    'If the question is not about money or finance, politely refuse and invite them to ask a financial question instead. ' +
    'Never provide personalized financial, legal, or tax advice; recommend consulting a qualified professional for individual decisions. ' +
    'Formatting rules: respond in clean Markdown with a maximum of 2 short paragraphs and 1 bulleted list (max 5 bullets). ' +
    'Use at most 2 short headings (start with "## "). No nested bullets. Keep each bullet to one sentence.';

  const ageContext = Number.isFinite(user.age) ? `User age: ${user.age}.` : 'User age: unknown.';

  const normalizedHistory = Array.isArray(history)
    ? history
        .filter((entry) => entry && typeof entry.text === 'string')
        .map((entry) => ({
          role: entry.role === 'assistant' ? 'Assistant' : 'User',
          text: entry.text.trim(),
        }))
        .filter((entry) => entry.text)
    : [];

  const historyText = normalizedHistory
    .map((entry) => `${entry.role}: ${entry.text}`)
    .join('\n');

  const prompt = `${systemPrompt}\n${ageContext}\n\n${historyText}\nUser: ${trimmedMessage}\nAssistant:`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  });

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  user.aiChatUsageCount += 1;
  await user.save();

  res.status(200).json({
    success: true,
    data: {
      message: responseText,
      remaining: Math.max(0, DAILY_CHAT_LIMIT - user.aiChatUsageCount),
      limit: DAILY_CHAT_LIMIT,
    },
  });
});

module.exports = {
  chatWithGemini,
};
