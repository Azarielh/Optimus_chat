import { serve } from "bun";
import homepage from "../frontend/index.html";
import { isChatMessagePayload, isWebSocketPayload, type ChatMessagePayload } from "../shared/websocket-messages";

type WebSocketData = {
  createdAt: number;
  uuid: string;
}

type ServerWebSocket = Bun.ServerWebSocket<WebSocketData>;

// Message WebSocket = on recoit des données peu importe 
// Chat Message = un message de chat, on peut le publier sur un channel

// https://bun.sh/docs/bundler/fullstack
const server = serve({
  development: process.env.NODE_ENV !== "production",

  routes: {
    "/": homepage,
    "/_ws": (req) => {
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

      const payload = JSON.parse(message.toString());

      if (!isWebSocketPayload(payload)) {
        console.error('Invalid WebSocket payload:', payload);
        return;
      }

      const type = payload.type;
      
      console.log('WebSocket message received:', ws.data.uuid, message);
      // Define action
      switch(type) {
        case 'chat_message':
          if (!isChatMessagePayload(payload)) {
            console.error('Invalid chat message payload:', payload);
            return;
          }
          console.log('Chat message received:', payload.data);
          msg_to_front(payload.data.channel, payload.data.content, ws.data.uuid);
          break;
        case 'subscribe_channel':

        // TODO: 
        // - Checker si la payload est valide
        
        // - Ajouter le channel à la liste des channels
        // - Envoyer un payload 'subscribe_channel' en réponse à ce client (pour confirmer l'abonnement)
        // - Envoyer un message de bienvenue

          msg_to_front(payload.data.channel, "This is a very welcoming message", 'System');
          ws.subscribe(payload.data.channel);
          break;
      }
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

function msg_to_front(channel: string, content: string, user: string) {

  const message: ChatMessagePayload = {
    type: 'chat_message',
    data: {
      channel: channel,
      content: content,
      date: new Date().toISOString(),
      user: user,
    },
  };

  server.publish(channel, JSON.stringify(message));
}