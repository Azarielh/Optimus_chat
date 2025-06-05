import type { ChatMessagePayload, UsersListPayload} from "../shared/websocket-messages";
import type { ServerWebSocket } from "./index.ts";

export class Channel {

    users: Map<string, ServerWebSocket> = new Map();
    messages: ChatMessagePayload['data'][] = [];

    join(ws: ServerWebSocket, user: string) {
        if (!this.users.has('Optimus Prime'))
            this.users.set('Optimus_Prime', ws);
        if (!this.users.has(user))
            this.users.set(user, ws);
        else
            ws.send(`This ${user} already exist`);
    }

    quit(user: string) {
        this.users.delete(user);
    }

    publish (data: ChatMessagePayload['data']) {

        const payload: ChatMessagePayload = {
            type: 'chat_message',
            data
        };

        const payloadStr = JSON.stringify(payload);

        this.users.forEach((ws) => {
            ws.send(payloadStr);
        })
    }

    give_list(ws: ServerWebSocket) {
        const payload = {
            type:   'Users_list',
            channel: this.name,
            users:  Array.from(this.users.keys()),
        };
        const payloadStr = JSON.stringify(payload);
        ws.send(payloadStr);
        console.log('give_list :',  payloadStr);

    }

    constructor(public name: string) {}

}