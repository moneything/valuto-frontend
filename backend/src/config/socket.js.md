# 🔌 **What this file does**

This file:

1. Creates a Socket.IO server
2. Secures it with **CORS** and **authentication middleware**
3. Handles connection, disconnection, and error logging
4. Returns the configured WebSocket server for use in your app

It's essentially the **real-time communication layer** of your backend.

---

# 📦 **Breakdown Section-by-Section**

---

# 1. **Import Socket.IO and authentication middleware**

```js
const { Server } = require('socket.io');
const socketAuthMiddleware = require('../middleware/socketAuth');
```

* `Server` is the class used to create a Socket.IO server instance.
* `socketAuthMiddleware` is your custom authentication middleware used to verify users before they are allowed to connect.

---

# 2. **Define the function that initializes Socket.IO**

```js
const initializeSocketIO = (httpServer) => {
```

Socket.IO must attach to an existing HTTP/HTTPS server (usually your Express server):

```js
const io = initializeSocketIO(server);
```

---

# 3. **Allowed CORS origins**

```js
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://valuto-frontend-test.vercel.app',
];
```

These are the frontends that are allowed to connect to your Socket.IO server.

Why is this needed?

* Browsers enforce CORS rules for WebSocket upgrades.
* Prevents unauthorized websites from connecting to your socket server.

### Optional environment-based origin

```js
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
```

This makes your CORS config flexible in production deployments.

---

# 4. **Create the Socket.IO server instance**

```js
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
```

### ⚙️ **CORS settings explained:**

* `origin` → Only these URLs can connect
* `methods` → Allowed HTTP methods
* `credentials: true` → Allows cookies, headers, tokens

---

### ⚙️ **Connection settings**

```js
pingTimeout: 60000,
pingInterval: 25000,
```

These control how Socket.IO determines whether a client is still alive.

* `pingInterval`: how often the server pings the client
* `pingTimeout`: how long the server waits for a pong before declaring disconnect

Your values make connections stable even on weak networks.

---

### ⚙️ **Transport settings**

```js
transports: ['websocket', 'polling'],
```

This defines how clients connect:

1. Try **websocket** first (fastest)
2. Fall back to **polling** if websockets fail

This maximizes compatibility.

---

# 5. **Apply authentication middleware**

```js
io.use(socketAuthMiddleware);
```

This runs **before** a client is allowed to connect.

Typically this middleware:

* Extracts access token (JWT)
* Verifies token
* Attaches authenticated user to:

  ```js
  socket.user = decodedUser
  ```

If authentication fails → connection is rejected.

---

# 6. **Handle new client connections**

```js
io.on('connection', (socket) => {
  console.log(`✅ Socket connected: ${socket.id} (User: ${socket.user.fullName})`);
```

This event runs **every time a client successfully connects**.

* `socket.id` → unique client connection ID
* `socket.user` → comes from the authentication middleware

---

# 7. **Handle disconnects**

```js
socket.on('disconnect', (reason) => {
  console.log(`❌ Socket disconnected: ${socket.id} (Reason: ${reason})`);
});
```

Socket.IO provides reasons such as:

* `"transport close"`
* `"client namespace disconnect"`
* `"ping timeout"`

Useful for debugging.

---

# 8. **Handle socket errors**

```js
socket.on('error', (error) => {
  console.error(`⚠️ Socket error (${socket.id}):`, error);
});
```

Captures any errors thrown inside event handlers or from the client.

---

# 9. **Return the configured Socket.IO instance**

```js
return io;
```

So your main server can use it:

```js
const io = initializeSocketIO(server);
```

---

# 🔥 **Summary (Quick Version)**

This module:

* Attaches Socket.IO to your HTTP server
* Restricts cross-origin WebSocket access
* Adds authentication to every socket connection
* Logs connections, disconnections, and errors
* Configures transports, ping/pong, and timeouts
* Returns the Socket.IO server instance

This is a **production-ready real-time communication layer**.

---
