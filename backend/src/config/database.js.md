# 📘 **README — MongoDB Connection Module (`database.js`)**

This module provides a **production-ready MongoDB connection handler** using Mongoose.
It includes:

* Safe connection initialization
* Graceful shutdown support (SIGINT, SIGTERM, SIGQUIT)
* Connection pooling and timeout configuration
* Simple helpers for connection state and manual disconnects

Designed to work in **Express apps**, **Docker**, **Kubernetes**, **Railway**, **Heroku**, and other cloud environments.

---

# 🚀 Features

### ✔️ Production-safe connection handling

No `process.exit()` calls inside the module — callers decide how to handle failures.

### ✔️ Graceful shutdown

Closes database connections cleanly when receiving:

* `SIGINT` (Ctrl+C)
* `SIGTERM` (Docker/Kubernetes stop)
* `SIGQUIT`

### ✔️ Configurable connection pool

Tuned defaults:

* `maxPoolSize: 10`
* `minPoolSize: 2`

### ✔️ Timeouts & reliability options

* `serverSelectionTimeoutMS: 5000`
* `socketTimeoutMS: 45000`
* `retryWrites: true`

### ✔️ Helpful utilities

* `isDatabaseConnected()`
* `disconnectDatabase()`
* `setupGracefulShutdown()`

---

# 📦 Installation

```bash
npm install mongoose
```

Place `database.js` in your project (e.g., `/config/database.js`).

---

# 🔧 Environment Variables

Set the following in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

This module only reads `MONGODB_URI`.

---

# 🧩 Usage

## 1. **Import the module**

```js
const {
  connectDatabase,
  setupGracefulShutdown
} = require('./database');
```

---

## 2. **Call `connectDatabase()` before starting your server**

Example with Express:

```js
const express = require('express');
const app = express();

(async () => {
  try {
    await connectDatabase();
    setupGracefulShutdown();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Server failed to start due to database connection error.');
    process.exit(1);
  }
})();
```

---

# 🛑 Graceful Shutdown

In production (Docker, Kubernetes, PM2, systemd), services send shutdown signals.
This module cleans up database connections automatically:

```js
setupGracefulShutdown();
```

It listens for:

* `SIGINT`
* `SIGTERM`
* `SIGQUIT`

When triggered, it:

1. Closes the Mongoose connection
2. Logs a shutdown message
3. Exits safely

---

# 🧪 Checking Connection State

```js
const { isDatabaseConnected } = require('./database');

if (isDatabaseConnected()) {
  console.log('MongoDB is connected');
}
```

---

# 🔌 Manual Disconnect

Useful for testing or job runners:

```js
const { disconnectDatabase } = require('./database');

await disconnectDatabase();
```

---

# 📁 File Structure Example

```
project/
│
├── config/
│   └── database.js
├── server.js
├── package.json
└── .env
```

---

# 🛠️ Error Handling

`connectDatabase()` throws an error if the connection fails:

```js
try {
  await connectDatabase();
} catch (err) {
  console.error('Database connection failed', err);
  process.exit(1);
}
```

No hidden exits — the caller is always in control.

---

# 📄 License

This module is free to use and modify in personal or commercial projects.

---
