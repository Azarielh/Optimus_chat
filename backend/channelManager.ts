import { Channel } from "./channel.ts";

export class ChannelManager {
    public channels: Map<string, Channel> = new Map();

    isNew(name: string): boolean {
        if(!this.channels.has(name)) {
            this.channels.set(name, new Channel(name));
            return (true);
        }
        return false;
    }


}