const express = require("express");
const expressWs = require("express-ws");

const app = express();
expressWs(app);

const messages = [{id: 0, text: "Welcome!", username: "Chat Room"}];
const sockets = [];

app.use(express.json());

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const message = req.body;
  messages.push(message);

  for (const socket of sockets) {
    socket.send(JSON.stringify(message));
  }
});

app.ws("/messages", (socket) => {
  sockets.push(socket);

  // if client closes the connection, remove the socket
  socket.get("close", () => {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});
