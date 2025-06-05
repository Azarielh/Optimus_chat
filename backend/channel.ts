import type { ChatMessagePayload } from "../shared/websocket-messages";
import type { ServerWebSocket } from "./index.ts";

export class Channel {

    users: Map<string, ServerWebSocket> = new Map();

    messages: ChatMessagePayload['data'][] = [];

    join(ws: ServerWebSocket, user: string) {
        this.users.set(user, ws);
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

    constructor(public name: string) {}

}