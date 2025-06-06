import type { ChatMessagePayload, SubscribeChannelPayload} from "../shared/websocket-messages.ts"
import { ChannelManager } from "./channelManager.ts";
import type { ServerWebSocket } from "./index.ts";
import { Optimus_msg } from "./new_message_handler.ts";

export function channel_subscribe(channel: string, user: string, ws: ServerWebSocket): void {
    const Manager_Chan = ChannelManager.getInstance();

    Manager_Chan.subscribe(channel, user, ws)
    Optimus_msg(channel, user, `Optimus Prime is very pleased to finally see your arrival sir ${user}`);
}

export function channel_unsuscribe(channel: string, user: string, ws: ServerWebSocket): void {
    const Manager_chan = ChannelManager.getInstance();

    Manager_chan.unsuscribe(channel, user, ws);
    Optimus_msg(channel, user, `Optimus is furious ! ${user} left this channel ! Let his soul rot in the seventh hell`);
}

export function isUserSuscribed(channel: string, user: string): boolean {
    const Manager_Chan = ChannelManager.getInstance();

    return (!Manager_Chan.channels.get(channel)?.users.get(user));
}
