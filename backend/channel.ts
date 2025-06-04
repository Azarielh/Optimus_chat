import type { ChatMessagePayload } from "../shared/websocket-messages";
import type { ServerWebSocket } from "./index.ts";

export class Channel {

    users: Map<string, ServerWebSocket> = new Map();

    messages: ChatMessagePayload['data'][] = [];

    join(ws: ServerWebSocket, user: string) {
        this.users.set(user, ws);
    }

    constructor(public name: string) {}

}