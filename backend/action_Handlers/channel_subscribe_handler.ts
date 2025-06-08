import { ChannelManager } from "../class_Management/channelManager.ts";
import type { ServerWebSocket } from "../index.ts";
import { Optimus_msg } from "./message_handler.ts";

/**
 * @brief This will suscribe the given user to the given channel using the ChannelManager's .suscribe method.
 * @param channel 
 * @param user 
 * @param ws 
 */
export function channel_subscribe(channel: string, user: string, ws: ServerWebSocket): void {
    const Manager_Chan = ChannelManager.getInstance();

    Manager_Chan.subscribe(channel, user, ws)
    Optimus_msg(channel, user, `Optimus Prime is very pleased to finally see your arrival sir `);
}

/**
 * @brief This will unsuscribe the given user from the given channel using the ChannelManager's .unsuscribe  method
 * @param channel 
 * @param user 
 * @param ws 
 */
export function channel_unsuscribe(channel: string, user: string, ws: ServerWebSocket): void {
    const Manager_chan = ChannelManager.getInstance();

    Manager_chan.unsuscribe(channel, user, ws);
    Optimus_msg(channel, user, `Optimus is furious ! ${user} left this channel ! Let his soul rot in the seventh hell`);
}

/**
 * @brief This is a boolean function. It runs through suscribed user in the given channel to checks if the given user has already suscribe.
 * @param channel 
 * @param user 
 * @returns
 */
export function isUserSuscribed(channel: string, user: string): boolean {
    const Manager_Chan = ChannelManager.getInstance();

    return (!Manager_Chan.channels.get(channel)?.users.get(user));
}
