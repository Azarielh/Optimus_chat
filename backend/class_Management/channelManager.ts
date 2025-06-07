import { Channel } from "./channel.ts";
import * as typo from "../../shared/websocket-messages.ts"
import { type ServerWebSocket } from "../index.ts"

export class ChannelManager {
    public channels: Map<string, Channel> = new Map();

    private static instance: ChannelManager;
    
    static getInstance() {
        if (!ChannelManager.instance)
            ChannelManager.instance = new ChannelManager('main');
        return ChannelManager.instance;
    }

    // get_channel will create channel if non existant
    get_or_build(channel: string) {
        if(!this.channels.has(channel)) {
            this.channels.set(channel, new Channel(channel));
            return (this.channels.get(channel))
        }
        return (this.channels.get(channel));
    }

    subscribe(channel: string, user: string, ws: ServerWebSocket) {
        const this_chan = this.get_or_build(channel);
        if (this_chan) {
            this_chan.join(ws, user);
            this_chan.give_list(ws);
        }
        else console.error(`Subscribe : An error occured while attempting to join this ${channel}`);
    }

    unsuscribe(channel: string, user: string, ws: ServerWebSocket) {
        const this_chan = this.get_or_build(channel);
        if (this_chan) {
            this_chan.quit(user);
            this_chan.give_list(ws);
        }
    }

    sendo(data: typo.ChatMessagePayload['data']): boolean{
        const msg = this.channels.get(data.channel)?.publish(data);

        return !!msg;
    }

    //giveChanList
    
    constructor(public name: string) {}

}