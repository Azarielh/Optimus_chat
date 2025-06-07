export type WebSocketPayload<T extends string, D extends Record<string, any>> = {
	type: T;
	data: D;
}

export function isWebSocketPayload(payload: any): payload is WebSocketPayload<string, Record<string, any>> {
	return payload && typeof payload.type === 'string' && typeof payload.data === 'object';
}

export type ChatMessagePayload = WebSocketPayload<'chat_message', {
	channel: string;
	content: string;
	user: string;
	date: string;
}>;

export function isChatMessagePayload(payload: WebSocketPayload<string, any>): payload is ChatMessagePayload {
	return ('channel' in payload.data) && typeof payload.data.channel === 'string' &&
		('content' in payload.data) && typeof payload.data.content === 'string' &&
		('user' in payload.data) && typeof payload.data.user === 'string' &&
		('date' in payload.data) && typeof payload.data.date === 'string';
}

export type SubscribeChannelPayload = WebSocketPayload<'subscribe_channel', {
	channel: string;
}>;

export function isSubscribeChannelPayload(payload: WebSocketPayload<string, any>): payload is SubscribeChannelPayload {
	return ('channel' in payload.data) && typeof payload.data.channel === 'string';
}

export type UsersListPayload = WebSocketPayload<'Users_list', {
	channel: string;
	users: string[];
}>;

export function isUsersListPayload(payload: WebSocketPayload<string, any>): payload is UsersListPayload {
	return ('channel' in payload.data) && typeof payload.data.channel === 'string' &&
		('users' in payload.data)  && Array.isArray(payload.data.users)
}

export type UnsubscribeChannelPayload = WebSocketPayload<'unsubscribe_channel', {
	channel: string;
}>;

export function isUnsubscribeChannelPayload(payload: WebSocketPayload<string, any>): payload is UnsubscribeChannelPayload {
	return ('channel' in payload.data) && typeof payload.data.channel === 'string';
}

export type WebSocketMessagePayload = ChatMessagePayload | SubscribeChannelPayload | UsersListPayload | UnsubscribeChannelPayload;
