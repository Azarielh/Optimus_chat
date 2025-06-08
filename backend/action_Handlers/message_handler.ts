import type { Url } from "url";
import type { ChatMessagePayload } from "../../shared/websocket-messages.ts"
import { ChannelManager } from "../class_Management/channelManager.ts";

export function user_msg(channel: string, content: string, user: string) {

    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
      channel: channel,
      user: user,
      content: content,
      attachment: [],
      date: new Date().toISOString(),
  };
    console.log(message);
    Manager_Chan.sendo(message);
}


export function user_img_msg(channel: string, content: string, user: string, file: string[]) {

    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
      channel: channel,
      user: user,
      content: content,
      attachment: file,
      date: new Date().toISOString(),
  };
    console.log(message);
    Manager_Chan.sendo(message);
}

export function Optimus_msg(channel: string, user: string, msg: string) {
    console.log('optimus_msg here');
    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
        channel: channel,
        user: 'Optimus Prime',
        content: msg + `${user}.`,
        attachment: [],
        date: new Date().toISOString(),

  };
    console.log(message);
    Manager_Chan.sendo(message)
}