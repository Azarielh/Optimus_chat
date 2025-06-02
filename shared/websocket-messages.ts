export type WebSocketPayload<T extends string, D extends Record<string, any>> = {
	type: T;
	data: D;
}

export function isWebSocketPayload<T extends string, D extends Record<string, any>>(payload: any, type: T): payload is WebSocketPayload<T, D> {
	return payload && payload.type === type && typeof payload.data === 'object';
}

export type ChatMessagePayload = WebSocketPayload<'chat_message', {
	channel: string;
	content: string;
	user: string;
	date: Date;
}>;

export function isChatMessagePayload(payload: WebSocketPayload<string, any>): payload is ChatMessagePayload {
	return ('channel' in payload.data) && typeof payload.data.channel === 'string' &&
		('content' in payload.data) && typeof payload.data.content === 'string' &&
		('user' in payload.data) && typeof payload.data.user === 'string' &&
		('date' in payload.data) && payload.data.date instanceof Date;
}

export type SubscribeChannelPayload = WebSocketPayload<'subscribe_channel', {
	channel: string;
}>;

export function isSubscribeChannelPayload(payload: WebSocketPayload<string, any>): payload is SubscribeChannelPayload {
	return ('channel' in payload.data) && typeof payload.data.channel === 'string';
}

export type WebSocketMessagePayload = ChatMessagePayload | SubscribeChannelPayload
