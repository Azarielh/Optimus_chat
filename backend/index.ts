import { serve } from "bun";
import homepage from "../frontend/index.html";

type WebSocketData = {
  createdAt: number;
  uuid: string;
}

type ServerWebSocket = Bun.ServerWebSocket<WebSocketData>;

// Message WebSocket = on recoit des données peu importe 
// Chat Message = un message de chat, on peut le publier sur un channel

// https://bun.sh/docs/bundler/fullstack
const server = serve({
  development: true,

  routes: {
    "/": homepage,
    "/_ws": (req, res) => {
      // Meta-data
      const data: WebSocketData = {
        createdAt: Date.now(),
        uuid: crypto.randomUUID(),
      };

      // Handle WebSocket connections
      if (server.upgrade(req, {data})) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    }
  },

  websocket: { 
    message(ws: ServerWebSocket, message) {
      console.log('WebSocket message received:', ws.data.uuid, message);
      const msg_content = JSON.parse(message.toString()).data.content;
      // Echo the message back to the client
      server.publish('main', `Client ${ws} says: ${msg_content}`);
    }, // a message is received
    open(ws: ServerWebSocket) {
      console.log('WebSocket opened:', ws.data.uuid);
      ws.subscribe('main'); // subscribe to a channel
      ws.send('Welcome to the WebSocket server!'); // send a welcome message
    }, // a socket is opened
    close(ws: ServerWebSocket, code, message) {}, // a socket is closed
  }
});

console.log(`Listening on ${server.url}`);