import { useCallback, useContext, useRef } from "react";
import { ChatContext } from "../contexts/chat-context";
import type { ChatMessagePayload } from "../../../shared/websocket-messages";

function ChatHeader(props: { channelId: string }) {
	return (
		<div className="w-full p-2 border-b border-base-300">
			<h2 className="text-lg font-semibold">#{props.channelId}</h2>
		</div>
	);
}

function MessageBubble(props: { message: ChatMessagePayload['data'] }) {
	const date = new Date(props.message.date);

	return (
		<li className="flex items-start gap-2">

			<div className="flex-1">
				<div className="font-semibold">{props.message.user}</div>
				<div>{props.message.content}</div>
			</div>
			<div className="text-xs text-gray-500">
				{date.toLocaleDateString()} {date.toLocaleTimeString()}
			</div>
		</li>
	);
}

function MessageList() {
	const chatContext = useContext(ChatContext);

	const messages = chatContext.channels.get(chatContext.currentChannel)?.messages || [];

	return (
		<ul id="messages" className="space-y-4">
			{messages.map((message, index) => (
				<MessageBubble key={index} message={message} />
			))}
		</ul>
	);
}


function ChatInput() {
	const chatContext = useContext(ChatContext);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!inputRef.current) return;

		chatContext.sendMessage(chatContext.currentChannel, inputRef.current.value);
		inputRef.current.value = "";
	}, [chatContext]);

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<input type="text" ref={inputRef} className="input input-bordered flex-1" placeholder="Type your message here..." required />
			<button type="submit" className="btn btn-primary">Send</button>
		</form>
	);
}

export function Chat() {
	const chatContext = useContext(ChatContext);

	return (
		<div className="flex-1 flex flex-col h-full">
			<ChatHeader channelId={chatContext.currentChannel} />
			<div className="flex-1 p-4">
				<MessageList />
			</div>
			<div className="p-4 border-t border-base-300">
				<ChatInput />
			</div>
		</div>
	);
}