// Request Reception
import { isChatMessagePayload, isSubscribeChannelPayload, isWebSocketPayload, type ChatMessagePayload } from "../shared/websocket-messages.ts";
import { ChannelManager } from "./channelManager.ts";
import type { ServerWebSocket } from "./index.ts";

export function ws_message_handler(ws: ServerWebSocket, message: string | Buffer<ArrayBufferLike>) {
// Initialize Channel Manager
    const Manager_Chan = ChannelManager.getInstance();
    Manager_Chan.isNew('main', 'Assacar', ws);
    Manager_Chan.sendo({
        channel: 'main',
        content: 'blabla',
        date: new Date().toISOString(),
        user: 'Asaccar'
    }, 'main');
    const payload = JSON.parse(message.toString());
	
    if (!isWebSocketPayload(payload)) {
      console.error('Invalid WebSocket payload:', payload);
      return;
    }
    const type = payload.type;

    if (type == 'chat_message') {
        console.log(type);
    }
    else if (type == 'subscribe_channel') {
        console.log(type);
    }
      //console.log('WebSocket message received:', ws.data.uuid, message);

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
}
// Parsing  / CHecking
// Distribution

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