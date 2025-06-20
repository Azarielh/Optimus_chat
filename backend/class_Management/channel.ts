import type { ChatMessagePayload, UsersListPayload} from "../../shared/websocket-messages.ts";
import type { ServerWebSocket } from "../index.ts";

export class Channel {

    users: Map<string, ServerWebSocket> = new Map();
    messages: ChatMessagePayload['data'][] = [];

    join(ws: ServerWebSocket, user: string) {
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
        });
    }

    give_list(ws: ServerWebSocket): boolean {
        const payload: UsersListPayload = {
            type:   'Users_list',
            data: {
                channel: this.name,
                users: this.users.keys().toArray()
            }
        };

        payload.data.users.unshift('Optimus Prime')
        let payloadStr = JSON.stringify(payload);
        this.users.forEach((users) => {
            users.send(payloadStr);
        });
        console.log('give_list :', payloadStr);

        payload.data.users.shift()
        payloadStr = JSON.stringify(payload);

        return !!payloadStr;
    }
 
    constructor(public name: string) {}

}