const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server});

// This function broadcasts data to all clients connected to server
function broadcast(data) {
  for(let client of wss.clients) {
    client.send(data);
  }
  console.log("data sent to clients!");
}

// This function checks number of users connected to server and passes noOfClients to broadcast function
function numberOfClients() {
  let noOfClients = wss.clients.size;
  broadcast(JSON.stringify({type:"clientCount", number: noOfClients}));
}


wss.on('connection', (ws) => {
  console.log('Client connected');
  numberOfClients();

  // Each message recieved will given a random id
  ws.on('message', function incoming(message) {
    let messageRecieved = JSON.parse(message);
    switch (messageRecieved.type) {
      case "incomingNotification":
      case "incomingMessage":
        messageRecieved.id = uuidv4();
        broadcast(JSON.stringify(messageRecieved));
        break;
      default:
        throw new Error("Unknown event type " + message.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    numberOfClients();
  });
});
