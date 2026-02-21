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

test('updateCategory updates fields and persists category', async () => {
  const category = {
    id: 'core',
    title: 'Old',
    saveCalled: false,
    save: async function save() {
      this.saveCalled = true;
    },
  };

  const { updateCategory } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': {
      findOne: async () => category,
    },
  });

  const req = { params: { id: 'core' }, body: { title: 'New Title' } };
  const res = createMockRes();

  await updateCategory(req, res, () => {});

  assert.equal(category.title, 'New Title');
  assert.equal(category.saveCalled, true);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.match(res.body.message, /Category updated/);
});

test('deleteCategory soft-deletes by setting isActive false', async () => {
  const category = {
    id: 'core',
    isActive: true,
    saveCalled: false,
    save: async function save() {
      this.saveCalled = true;
    },
  };

  const { deleteCategory } = loadWithMocks('../../src/controllers/categoryController', {
    '../models/Category': {
      findOne: async () => category,
    },
  });

  const req = { params: { id: 'core' } };
  const res = createMockRes();

  await deleteCategory(req, res, () => {});

  assert.equal(category.isActive, false);
  assert.equal(category.saveCalled, true);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
});

