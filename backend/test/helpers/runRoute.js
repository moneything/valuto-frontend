const runHandler = (handler, req, res) =>
  new Promise((resolve, reject) => {
    let settled = false;
    Promise.resolve(handler(req, res, (err) => {
      settled = true;
      if (err) reject(err);
      else resolve();
    }))
      .then(() => {
        if (!settled) resolve();
      })
      .catch(reject);
  });

const getRouteHandlers = (router, path, method) => {
  const layer = router.stack.find(
    (entry) => entry.route && entry.route.path === path && entry.route.methods[method]
  );

  if (!layer) {
    throw new Error(`Route ${method.toUpperCase()} ${path} not found`);
  }

  return layer.route.stack.map((entry) => entry.handle);
};

const runRouteHandlers = async (handlers, req, res) => {
  for (const handler of handlers) {
    await runHandler(handler, req, res);
    if (res.statusCode >= 400 && res.body) {
      break;
    }
  }
};

module.exports = {
  getRouteHandlers,
  runRouteHandlers,
};
