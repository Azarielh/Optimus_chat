import type { ChatMessagePayload } from "../shared/websocket-messages.ts"
import { ChannelManager } from "./channelManager.ts";

export function user_msg(channel: string, content: string, user: string) {

    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
      channel: channel,
      content: content,
      date: new Date().toISOString(),
      user: user,
  };

    Manager_Chan.sendo(message);
}

export function Optimus_msg(channel: string, user: string, msg: string) {
   
    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
        channel: channel,
        content: msg,
        date: new Date().toISOString(),
        user: 'Optimus Prime',

  };
    Manager_Chan.sendo(message)
}