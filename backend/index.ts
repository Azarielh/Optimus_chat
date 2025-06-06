import { serve } from "bun";
import homepage from "../frontend/index.html";
import { ws_message_handler } from "./ws_message_handler.ts";
import { terminate_client } from "./close_Management/terminate_client.ts";


export type WebSocketData = {
  createdAt: number;
  uuid: string;
}

export type ServerWebSocket = Bun.ServerWebSocket<WebSocketData>;

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
    message: ws_message_handler,
    open(ws: ServerWebSocket) {
      	console.log('WebSocket opened:', ws.data.uuid);
      	ws.subscribe('main'); // subscribe to a channel
    }, // a socket is opened
    close(ws: ServerWebSocket, code, message) {
	// Kill all the client connections
		terminate_client(ws);
	}, // a socket is closed
  }
});

console.log(`Listening on ${server.url}`);