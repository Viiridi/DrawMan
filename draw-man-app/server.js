// server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messages = [];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection event
wss.on('connection', (ws) => {
  // Send existing messages to the newly connected client
  messages.forEach(message => ws.send(message));

  // Message event
  ws.on('message', (message) => {
    // Broadcast message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString()); // Ensure message is sent as string
      }
    });

    // Store message
    messages.push(message.toString()); // Ensure message is stored as string
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
