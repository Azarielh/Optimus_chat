import type { ServerWebSocket } from '../index.ts'
import { ChannelManager } from '../class_Management/channelManager.ts'

export function terminate_client(ws: ServerWebSocket) {
    const Manager_Chan = ChannelManager.getInstance();
    const channels = [...Manager_Chan.channels.values()];
    const allUsers = channels.flatMap(Channel => [...Channel.users.keys()]);
    console.log('terminate_client : ', allUsers);

    const client = ws.data.uuid;
    channels.forEach((this_chan) => {
        this_chan.quit(client);
    })
}