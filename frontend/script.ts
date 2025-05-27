let ws: WebSocket | null = null;

type WebSocketMessage = {
	type: string;
	data: any;
}

type ChatMessageData = {
	channel: string;
	content: string;
}

type ChatMessageWebSocketMessage = {
	type: 'chat_message';
	data: ChatMessageData;
}

type JoinChannelWebSocketMessage = {
	type: 'subscribe_channel';
	data: {
		channel: string;
	};
}

function sendChatMessage(channel: string, content: string) {
	const message: ChatMessageWebSocketMessage = {
		type: 'chat_message',
		data: {
			channel,
			content
		}
	};

	sendWsMessage(message);
}

function onJoinChannelButtonClick() {
	const channelName = prompt("Enter channel name to join:");
	if (channelName) {
		joinChannel(channelName);
	}
}

function joinChannel(channelName: string) {
	const message: JoinChannelWebSocketMessage = {
		type: 'subscribe_channel',
		data: {
			channel: channelName
		}
	};

	sendWsMessage(message);
	console.log(`Joining channel: ${channelName}`);
}

function sendWsMessage(message: WebSocketMessage) {
	console.log(ws);
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify(message));
	} else {
		console.error('WebSocket is not open. Cannot send message.');
	}
}

document.addEventListener('DOMContentLoaded', () => {
		const form = document.getElementById('chat_form');
    const input = document.getElementById('chat_input') as HTMLInputElement;
    const messages = document.getElementById('messages');

		ws = new WebSocket('ws://localhost:3000/_ws');

		ws.onmessage = (event) => {
				console.log(event)
				const msg = event.data;
				const item = document.createElement('li');
				item.textContent = msg;
				messages?.appendChild(item);
				window.scrollTo(0, document.body.scrollHeight);
		};

		ws.onopen = () => {
				console.log('WebSocket connection opened');
		};

		ws.onclose = () => {
				console.log('WebSocket connection closed');
		};

		ws.onerror = (error) => {
				console.error('WebSocket error:', error);
		};

		form?.addEventListener('submit', (e) => {
				e.preventDefault();
				console.log('Form submitted');
				if (input?.value) {
						sendChatMessage('main', input.value);
						input.value = '';
				}
		});
});


document.addEventListener('DOMContentLoaded', () => {
	const joinButton = document.getElementById('join_channel_button');
	if (joinButton) {
		joinButton.addEventListener('click', onJoinChannelButtonClick);
	}
});