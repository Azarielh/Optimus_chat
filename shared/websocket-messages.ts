export type WebSocketPayload<T extends string, D> = {
	type: T;
	data: D;
}

export function isWebSocketPayload<T extends string, D>(payload: any, type: T): payload is WebSocketPayload<T, D> {
	return payload && payload.type === type && typeof payload.data === 'object';
}

export type ChatMessagePayload = WebSocketPayload<'chat_message', {
	channel: string;
	content: string;
	user: string;
	date: Date;
}>;


export type SubscribeChannelPayload = WebSocketPayload<'subscribe_channel', {
	channel: string;
}>;

export type WebSocketMessagePayload = ChatMessagePayload | SubscribeChannelPayload
