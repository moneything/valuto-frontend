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

test('getCategories returns ordered active categories', async () => {
  const categories = [{ id: 'core' }, { id: 'investing' }];
  const CategoryMock = {
    find: (query) => ({
      sort: async (sortObj) => {
        assert.deepEqual(query, { isActive: true });
        assert.deepEqual(sortObj, { order: 1 });
        return categories;
      },
    }),
  };

  const { getCategories } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': CategoryMock,
  });

  const req = {};
  const res = createMockRes();

  await getCategories(req, res, () => {});

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.count, 2);
  assert.deepEqual(res.body.data, categories);
});

test('getCategory returns 404 for unknown id', async () => {
  const { getCategory } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': { findOne: async () => null },
  });

  const req = { params: { id: 'missing' } };
  const res = createMockRes();
  let captured = null;

  await getCategory(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 404);
  assert.match(captured.message, /Category not found/);
});

test('createCategory is disabled for all users', async () => {
  const { createCategory } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': {},
  });

  const req = { body: { id: 'core', title: 'Core' } };
  const res = createMockRes();
  let captured = null;

  await createCategory(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Category creation is disabled/);
});

test('updateCategory is disabled for all users', async () => {
  const { updateCategory } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': {},
  });

  const req = { params: { id: 'core' }, body: { title: 'New Title' } };
  const res = createMockRes();
  let captured = null;

  await updateCategory(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Category updates are disabled/);
});

test('deleteCategory is disabled for all users', async () => {
  const { deleteCategory } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': {},
  });

  const req = { params: { id: 'core' } };
  const res = createMockRes();
  let captured = null;

  await deleteCategory(req, res, (err) => {
    captured = err;
  });

  assert.ok(captured);
  assert.equal(captured.statusCode, 403);
  assert.match(captured.message, /Category deletion is disabled/);
});
