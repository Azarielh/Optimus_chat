import { serve } from "bun";
import homepage from "../frontend/index.html";
import { isChatMessagePayload, isSubscribeChannelPayload, isWebSocketPayload, type ChatMessagePayload } from "../shared/websocket-messages";
import { Channel } from "./channel.ts";
import { ChannelManager } from "./channelManager.ts";


export type WebSocketData = {
  createdAt: number;
  uuid: string;
}

export type ServerWebSocket = Bun.ServerWebSocket<WebSocketData>;

// Initialize Channel Manager
const ChannelList = new ChannelManager;

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
		const registered_channel = ChannelList.channels.get(payload.data.channel);
		const working_channel = payload.data.channel;
		
		// if (!registered_channel) {
		// 	console.error(`Channel '${registered_channel}' is undefined.`);
		// 	return;
		// }
      if (!isWebSocketPayload(payload)) {
        console.error('Invalid WebSocket payload:', payload);
        return;
      }

      const type = payload.type;
      
      console.log('WebSocket message received:', ws.data.uuid, message);

      // Define action
    //   switch(type) {
    //     case 'chat_message':
    //       if (!isChatMessagePayload(payload)) {
    //         console.error('Invalid chat message payload:', payload);
    //         return;
    //       }
    //       console.log('Chat message received:', payload.data);
    //       send_msg(working_channel, payload.data.content, ws.data.uuid);
    //       break;

    //     case 'subscribe_channel':
    //     // TODO: 
    //     // - Checker si la payload est valide
    //     if (!isSubscribeChannelPayload(payload)) {
    //       console.error('Invalid Channel payload : ' , payload);
    //       return;
    //     }

	// 	// Create new channel if this one doesn't
    //     if (ChannelList.isNew(working_channel, ws.data.uuid, ws))
    //     	send_msg(working_channel, "This is a very welcoming message", 'System');
		
	// 	console.log (ChannelList.channels);
	// 	registered_channel.join(working_channel, ws.data.uuid);
    //     // - Envoyer un payload 'subscribe_channel' en réponse à ce client (pour confirmer l'abonnement)

    //       // - Ajouter le channel à la liste des channels
    //       ws.subscribe(working_channel);
    //       send_msg(working_channel, `${ws.data.uuid} à rejoint le channel`, 'System');

    //       break;
    //   }
    }, // a message is received
    open(ws: ServerWebSocket) {
      console.log('WebSocket opened:', ws.data.uuid);
      send_msg('main', "This is a very welcoming message", 'System');
      ws.subscribe('main'); // subscribe to a channel
    }, // a socket is opened
    close(ws: ServerWebSocket, code, message) {}, // a socket is closed
  }
});

console.log(`Listening on ${server.url}`);

function send_msg(channel: string, content: string, user: string) {

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