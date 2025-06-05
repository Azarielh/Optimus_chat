import { Channel } from "./channel.ts";
import * as typo from "../shared/websocket-messages.ts"
import { type ServerWebSocket } from "./index.ts"

export class ChannelManager {
    public channels: Map<string, Channel> = new Map();

    private static instance: ChannelManager;
    
    static getInstance() {
        if (!ChannelManager.instance)
            ChannelManager.instance = new ChannelManager();
        return ChannelManager.instance;
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
        if(!ws)
            return ;
        const chan   = this.channels.get(channel);

        if (chan)
            chan.join(ws, user);
    }

    sendo(data: typo.ChatMessagePayload['data'], channel: string) {
        this.channels.get(channel)!.publish(data);
    }
}