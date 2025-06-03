import { Channel } from "./channel.ts";

class ChannelManager {
    private channels: Map<string, Channel> = new Map();

    isNew(name: string): Channel {
        if(!this.channels.has(name))
            this.channels.set(name, new Channel(name));
        return this.channels.get(name)!;
    }


}