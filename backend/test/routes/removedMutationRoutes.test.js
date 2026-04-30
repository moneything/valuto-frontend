const test = require('node:test');
const assert = require('node:assert/strict');

function hasRoute(router, path, method) {
  return router.stack.some(
    (entry) => entry.route && entry.route.path === path && entry.route.methods[method]
  );
}

test('news creation routes are not mounted', () => {
  delete require.cache[require.resolve('../../src/routes/newsRoutes')];
  const router = require('../../src/routes/newsRoutes');

  assert.equal(hasRoute(router, '/news', 'get'), true);
  assert.equal(hasRoute(router, '/events', 'get'), true);
  assert.equal(hasRoute(router, '/news', 'post'), false);
  assert.equal(hasRoute(router, '/events', 'post'), false);
});

test('category mutation routes are not mounted', () => {
  delete require.cache[require.resolve('../../src/routes/categoryRoutes')];
  const router = require('../../src/routes/categoryRoutes');

  assert.equal(hasRoute(router, '/', 'get'), true);
  assert.equal(hasRoute(router, '/:id', 'get'), true);
  assert.equal(hasRoute(router, '/', 'post'), false);
  assert.equal(hasRoute(router, '/:id', 'put'), false);
  assert.equal(hasRoute(router, '/:id', 'delete'), false);
});

test('learning module mutation routes are not mounted', () => {
  delete require.cache[require.resolve('../../src/routes/learningRoutes')];
  const router = require('../../src/routes/learningRoutes');

  assert.equal(hasRoute(router, '/modules', 'get'), true);
  assert.equal(hasRoute(router, '/modules/:id', 'get'), true);
  assert.equal(hasRoute(router, '/modules', 'post'), false);
  assert.equal(hasRoute(router, '/modules/:id', 'put'), false);
  assert.equal(hasRoute(router, '/modules/:id', 'delete'), false);
});
