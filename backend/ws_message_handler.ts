// Request Reception
import { isChatMessagePayload, isSubscribeChannelPayload, isWebSocketPayload, type ChatMessagePayload } from "../shared/websocket-messages.ts";
import { channel_subscribe } from "./channel_subscribe_handler.ts";
import { ChannelManager } from "./channelManager.ts";
import type { ServerWebSocket } from "./index.ts";
import { user_msg, welcome_msg} from "./new_message_handler.ts";

export function ws_message_handler(ws: ServerWebSocket, message: string | Buffer<ArrayBufferLike>) {

// Initialize Channel Manager
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
    else if (type == 'subscribe_channel' && isSubscribeChannelPayload(payload)) {
        console.log(type, ` : ${user} join ${this_chan}`);
        channel_subscribe(this_chan, user, ws);
    }
}


