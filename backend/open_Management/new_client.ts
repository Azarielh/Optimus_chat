import type { ServerWebSocket } from "..";
import { ChannelManager } from "../class_Management/channelManager";


export function ws_arrival_handler(ws: ServerWebSocket) {
    const Manager_chan = ChannelManager.getInstance();

    Manager_chan.subscribe('main', ws.data.uuid, ws);
}