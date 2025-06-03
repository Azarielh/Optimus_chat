import type { ServerWebSocket } from "bun";
import type { ChatMessagePayload } from "../shared/websocket-messages";

class Channel {

    users: Map<string, ServerWebSocket> = new Map();

    messages: ChatMessagePayload['data'][] = [];

    join(ws: ServerWebSocket) {
        this.users.set('system', ws)
    }
    
    constructor(public name: string) {}

}