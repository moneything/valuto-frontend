const startTestServer = async (app) => {
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  const request = async (path, options = {}) => {
    return fetch(`${baseUrl}${path}`, options);
  };

  const close = async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  };

  return { request, close };
};

module.exports = { startTestServer };

