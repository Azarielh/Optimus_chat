import { serve } from "bun";
import homepage from "../frontend/index.html";
import { ws_message_handler } from "./ws_message_handler.ts";
import { terminate_client } from "./close_Management/terminate_client.ts";
import { ws_arrival_handler } from "./open_Management/new_client.ts";


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
	open: ws_arrival_handler,		// a socket is opened
	message: ws_message_handler,	// other client interaction
    close: terminate_client,		// a socket is closed
  }
});

console.log(`Listening on ${server.url}`);