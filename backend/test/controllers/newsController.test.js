const test = require('node:test');
const assert = require('node:assert/strict');

const { loadWithMocks } = require('../helpers/loadWithMocks');

const createMockRes = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
});

test('getNews fetches financial news with minimum per-category limit 5', async () => {
  let receivedLimit = null;
  const newsItems = [{ headline: 'A' }, { headline: 'B' }];

  const { getNews } = loadWithMocks('../../src/controllers/newsController', {
    '../models/News': {},
    '../models/Event': {},
    '../services/newsFeedService': {
      fetchFinancialNews: async (limit) => {
        receivedLimit = limit;
        return newsItems;
      },
    },
  });

  const req = { query: { limit: '2' } };
  const res = createMockRes();

  await getNews(req, res, () => {});

  assert.equal(receivedLimit, 5);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.count, 2);
});

test('getEvents applies category filter and formats event dates to ISO', async () => {
  let receivedFilter = null;
  const sampleDate = new Date('2026-03-01T12:00:00.000Z');
  const rows = [{ title: 'Workshop', eventDate: sampleDate, createdAt: sampleDate, updatedAt: sampleDate }];

  const { getEvents } = loadWithMocks('../../src/controllers/newsController', {
    '../models/News': {},
    '../models/Event': {
      find: (filter) => {
        receivedFilter = filter;
        return {
          sort: () => ({
            limit: () => ({
              lean: async () => rows,
            }),
          }),
        };
      },
    },
    '../services/newsFeedService': { fetchFinancialNews: async () => [] },
  });

  const req = { query: { limit: '10', category: 'Workshop' } };
  const res = createMockRes();

  await getEvents(req, res, () => {});

  assert.deepEqual(receivedFilter, { isActive: true, category: 'Workshop' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data[0].date, sampleDate.toISOString());
  assert.equal(res.body.data[0].eventDate, sampleDate.toISOString());
});

test('getNewsAndEvents returns combined payload with news and formatted events', async () => {
  const sampleDate = new Date('2026-04-01T10:00:00.000Z');
  const newsItems = [{ headline: 'Economy update' }];
  const events = [{ title: 'Meetup', eventDate: sampleDate, createdAt: sampleDate, updatedAt: sampleDate }];

  const { getNewsAndEvents } = loadWithMocks('../../src/controllers/newsController', {
    '../models/News': {},
    '../models/Event': {
      find: () => ({
        sort: () => ({
          limit: () => ({
            lean: async () => events,
          }),
        }),
      }),
    },
    '../services/newsFeedService': {
      fetchFinancialNews: async () => newsItems,
    },
  });

  const req = { query: { newsLimit: '6', eventsLimit: '3' } };
  const res = createMockRes();

  await getNewsAndEvents(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.deepEqual(res.body.data.news, newsItems);
  assert.equal(res.body.data.events[0].eventDate, sampleDate.toISOString());
});

test('createNews is disabled for all users', async () => {
  const { createNews } = loadWithMocks('../../src/controllers/newsController', {
    '../models/News': {},
    '../models/Event': {},
    '../services/newsFeedService': { fetchFinancialNews: async () => [] },
  });

  const req = { body: { title: 'New post' } };
  const res = createMockRes();
  let captured = null;

  await createNews(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /News creation is disabled/);
});

test('createEvent is disabled for all users', async () => {
  const { createEvent } = loadWithMocks('../../src/controllers/newsController', {
    '../models/News': {},
    '../models/Event': {},
    '../services/newsFeedService': { fetchFinancialNews: async () => [] },
  });

  const req = { body: { title: 'New event' } };
  const res = createMockRes();
  let captured = null;

  await createEvent(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Event creation is disabled/);
});
