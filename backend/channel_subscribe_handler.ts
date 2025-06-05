import type { ChatMessagePayload } from "../shared/websocket-messages.ts"
import { ChannelManager } from "./channelManager.ts";
import type { ServerWebSocket } from "./index.ts";
import { welcome_msg } from "./new_message_handler.ts";

export function channel_subscribe(channel: string, user: string, ws:ServerWebSocket) {
    const Manager_Chan = ChannelManager.getInstance();

    Manager_Chan.subscribe(channel, user, ws)
    welcome_msg(channel, user);
}