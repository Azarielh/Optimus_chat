import type { Url } from "url";
import type { ChatMessagePayload, Attachment} from "../../shared/websocket-messages.ts"
import { ChannelManager } from "../class_Management/channelManager.ts";

export function user_msg(channel: string, content: string, user: string) {

    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
      channel: channel,
      content: content,
      attachment: null,
      date: new Date().toISOString(),
      user: user,
  };

    Manager_Chan.sendo(message);
}


export function user_img_msg(channel: string, content: string, user: string, file: Attachment) {

    const img: Attachment = {
      type: 'image',
      url: file.url,
      name: file.name,
      size: file.size,
      mimeType: file.mimeType
    };

    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
      channel: channel,
      content: content,
      attachment: img,
      date: new Date().toISOString(),
      user: user,
  };
    console.log(message);
    Manager_Chan.sendo(message);
}

export function Optimus_msg(channel: string, user: string, msg: string) {
   
    const Manager_Chan = ChannelManager.getInstance();
    const message: ChatMessagePayload['data'] = {
        channel: channel,
        content: msg,
        attachment: null,
        date: new Date().toISOString(),
        user: 'Optimus Prime',

  };
    Manager_Chan.sendo(message)
}