import type { ServerWebSocket } from "..";
import { channel_subscribe } from "../action_Handlers/channel_subscribe_handler";
import { ChannelManager } from "../class_Management/channelManager";


export function ws_arrival_handler(ws: ServerWebSocket) {
    const user = ws.data.uuid;

    channel_subscribe('main', user, ws);
}