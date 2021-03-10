const messagingApi = require("./messaging_api");

const TOPIC_ID = process.env.TOPIC_ID;

function displayMessage(message) {
  console.log(`> ${message.name}: ${message.text}`);
}

function streamMessages() {
  const messagingSocket = messagingApi.subscribe(TOPIC_ID);

  messagingSocket.on("message", (data) => {
    const message = JSON.parse(data);
    displayMessage(message);
  });
}

streamMessages();
