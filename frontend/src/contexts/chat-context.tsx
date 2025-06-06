import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { isChatMessagePayload, isUsersListPayload, isWebSocketPayload, type ChatMessagePayload } from '../../../shared/websocket-messages';


export type ChatContextChannel = {
	id: string;
	users: string[];
	messages: ChatMessagePayload['data'][];
}

export type ChatContextType = {
	currentChannel: string;
	channels: Map<string, ChatContextChannel>;
	subscribeChannel: (channel: string) => void;
	unsubscribeChannel: (channel: string) => void;
	sendMessage: (channel: string, content: string) => void;
	setCurrentChannel: (channel: string) => void;
}

export const ChatContext = createContext<ChatContextType>({
	currentChannel: 'main',
	channels: new Map<string, ChatContextChannel>(),
	subscribeChannel: (channel: string) => {
		console.warn(`subscribeChannel not implemented: ${channel}`);
	},
	unsubscribeChannel: (channel: string) => {
		console.warn(`unsubscribeChannel not implemented: ${channel}`);
	},
	sendMessage: (channel: string, content: string) => {
		console.warn(`sendMessage not implemented: ${channel}, content: ${content}`);
	},
	setCurrentChannel: (channel: string) => {
		console.warn(`setCurrentChannel not implemented: ${channel}`);
	}
});

export const ChatContextProvider = (props: { children: React.ReactNode }) => {
	const [currentChannel, setCurrentChannel] = useState<string>('main');

	const [channels, setChannels] = useState<Map<string, ChatContextChannel>>(
		() => new Map([[
			'main',
			{ id: 'main', messages: [], users: [] }
		]])
	);
	const wsRef = useRef<WebSocket | null>(null);

	// Helper to update channel messages
	const addMessageToChannel = useCallback((channelId: string, message: ChatMessagePayload) => {
		setChannels(prev => {
			const newMap = new Map(prev);
			const channel = newMap.get(channelId) || { id: channelId, messages: [], users: [] };
			channel.messages = [...channel.messages, message.data];
			newMap.set(channelId, channel);
			return newMap;
		});
	}, []);

	const setUsersInChannel = useCallback((channelId: string, users: string[]) => {
		setChannels(prev => {
			const newMap = new Map(prev);
			const channel = newMap.get(channelId) || { id: channelId, messages: [], users: [] };
			channel.users = users;
			newMap.set(channelId, channel);
			return newMap;
		});
	}, []);

	// WebSocket setup
	useEffect(() => {
		const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
		const ws = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/_ws`);
		wsRef.current = ws;

		ws.onmessage = (event) => {
			try {
				const payload = JSON.parse(event.data);
				if (!isWebSocketPayload(payload))
					return;

				if (isChatMessagePayload(payload)) {
					addMessageToChannel(payload.data.channel, payload);
					return;
				}

				if (isUsersListPayload(payload)) {
					setUsersInChannel(payload.data.channel, payload.data.users);
					return;
				}

				console.warn('🤕 Received unknown WebSocket message:', payload);
			} catch (e) {
				console.error('💥 Error parsing WebSocket message:', e);
			}
		};
		ws.onopen = () => {
			// Auto-subscribe to main channel
			subscribeChannel('main');
		};
		ws.onclose = () => {
			// Optionally handle reconnect
		};
		return () => {
			ws.close();
		};
	}, [addMessageToChannel]);

	// Send a message to a channel
	const sendMessage = useCallback((channel: string, content: string) => {
		if (!content || content.trim() === '') {
			console.warn('Cannot send empty message.');
			return;
		}

		if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
			console.warn('WebSocket is not open. Cannot send message.');
			return;
		}

		const message: ChatMessagePayload = {
			type: 'chat_message',
			data: {
				channel,
				content,
				user: '',
				date: new Date().toISOString()
			}
		};

		wsRef.current.send(JSON.stringify(message));

	}, []);

	// Subscribe to a channel
	const subscribeChannel = useCallback((channel: string) => {
		if (!channels.has(channel)) {
			setChannels(prev => {
				const newMap = new Map(prev);
				newMap.set(channel, { id: channel, messages: [], users: [] });
				return newMap;
			});
		}

		if (!channel || channel.trim() === '') {
			console.warn('Cannot subscribe to an empty channel name.');
			return;
		}

		if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
			console.warn('WebSocket is not open. Cannot subscribe to channel.');
			return;
		}

		wsRef.current.send(JSON.stringify({
			type: 'subscribe_channel',
			data: { channel }
		}));

		setCurrentChannel(channel);
	}, [channels]);

	// Unsubscribe (client-side only)
	const unsubscribeChannel = useCallback((channel: string) => {
		setChannels(prev => {
			const newMap = new Map(prev);
			newMap.delete(channel);
			return newMap;
		});
		if (currentChannel === channel) {
			setCurrentChannel('main');
		}
	}, [currentChannel]);

	const value: ChatContextType = {
		currentChannel,
		channels,
		subscribeChannel,
		unsubscribeChannel,
		sendMessage,
		setCurrentChannel
	};

	return (
		<ChatContext.Provider value={value}>
			{props.children}
		</ChatContext.Provider>
	);
};