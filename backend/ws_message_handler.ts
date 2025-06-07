import { isChatMessagePayload, isSubscribeChannelPayload, isWebSocketPayload, type ChatMessagePayload, type SubscribeChannelPayload } from "../shared/websocket-messages.ts";
import { ChannelManager } from "./class_Management/channelManager.ts";
import { channel_subscribe, channel_unsuscribe, isUserSuscribed } from "./action_Handlers/channel_subscribe_handler.ts";
import { user_msg } from "./action_Handlers/message_handler.ts";
import type { ServerWebSocket } from "./index.ts";

/**
 * @brief Init the ChannelManager, checks the data_type and call the functions accordingly.
 * @param ws 
 * @param message 
 * @returns 
 */
export function ws_message_handler(ws: ServerWebSocket, message: string | Buffer<ArrayBufferLike>) {

//_____________________  Initialize Channel Manager  __________________

    const Manager_Chan = ChannelManager.getInstance();
    const payload = JSON.parse(message.toString());

//_____________________  Parsing  / Checking  _________________________


// Check is payload ( what we recieve from front is valid)
    if (!isWebSocketPayload(payload)) {
      console.error('Invalid WebSocket payload:', payload);
      return;
    }
// Setup general const for following action
    const this_chan = payload.data.channel;
    const user = ws.data.uuid;
    const type = payload.type;

//_____________________  Distribution  _________________________


// Send message to corresponding channel
    if (type == 'chat_message' && isChatMessagePayload(payload)) {
        console.log(type, ` : ${user} send a message`);
        const msg  = payload.data.content;

        user_msg(this_chan, msg, user);
    }
// Subscribe a user to the requested channel | create it if new
    else if (type == 'subscribe_channel' && isSubscribeChannelPayload(payload) 
                && !isUserSuscribed(this_chan, user)) {
        console.log(type, ` : ${user} join ${this_chan}`);
        channel_subscribe(this_chan, user, ws);
    }
// Unsuscribe a user
    else if (type == 'subscribe_channel' && isSubscribeChannelPayload(payload)
                && isUserSuscribed(this_chan, user)) {
        console.log('unsuscribe user');
        channel_unsuscribe(this_chan, user, ws);
    }
}
