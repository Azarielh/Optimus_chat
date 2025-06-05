import { Channel } from "./channel.ts";
import * as typo from "../shared/websocket-messages.ts"
import { type ServerWebSocket } from "./index.ts"

export class ChannelManager {
    public channels: Map<string, Channel> = new Map();

    private static instance: ChannelManager;
    
    static getInstance() {
        if (!ChannelManager.instance)
            ChannelManager.instance = new ChannelManager('main');
            // this.channels.set('main', new Channel('main'));
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

    isNew(name: string, user: string, ws: ServerWebSocket): boolean {
        if(!this.channels.has(name)) {
            this.channels.set(name, new Channel(name));
            this.channels.get(name)!.join(ws, user);
            return (true);
        } else {
            console.log (`>> ${name} already exist or an error occured during the attempt`)
            return false;
        }
    }

    subscribe(channel: string, user: string, ws: ServerWebSocket) {
        const this_chan = this.get_or_build(channel);
        if (this_chan)
            this_chan.join(ws, user);
        else console.error(`Subscribe : An error occured while attempting to join this ${channel}`)
    }

    sendo(data: typo.ChatMessagePayload['data']) {
        this.channels.get(data.channel)!.publish(data);
    }

    constructor(public name: string) {}

}