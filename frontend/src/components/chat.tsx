import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../contexts/chat-context";
import type { ChatMessagePayload } from "../../../shared/websocket-messages";
import { FaPaperPlane, FaUsers, FaUsersSlash } from "react-icons/fa";
import { FaCirclePlus, FaFaceSmileWink } from "react-icons/fa6";
import { UserListPanel } from "./user-list";
import { UserAvatar } from "./user-avatar";
import { useLocalStorage } from "usehooks-ts";

function ToggleUserListButton() {
	const [userListOpen, setUserListOpen] = useLocalStorage<boolean>("chat:user-list:open", true);

	return (
		<div className="tooltip tooltip-left" data-tip={userListOpen ? "Hide user list" : "Show user list"}>
			<button className="btn btn-ghost btn-square" onClick={() => setUserListOpen(!userListOpen)}>
				{userListOpen ? <FaUsersSlash className="text-xl" /> : <FaUsers className="text-xl" />}
			</button>
		</div>
	);
}

function ChatHeader(props: { channelId: string }) {

	return (
		<div className="h-11 w-full p-2 border-b border-base-300 flex items-center justify-between">
			<h2 className="text-lg font-semibold">#{props.channelId}</h2>
			<div className="flex items-center gap-2">
				<ToggleUserListButton />
			</div>
		</div>
	);
}

function MessageBubble(props: { message: ChatMessagePayload['data'] }) {
	const date = new Date(props.message.date);

	return (
		<li className="chat chat-start">
			<div className="chat-image">
				<UserAvatar user={props.message.user} />
			</div>

			<div className="chat-header">
				{props.message.user}
				<time className="text-xs opacity-50"> {date.toLocaleTimeString('fr-FR')} </time>
			</div>
			<div className="chat-bubble">{props.message.content}</div>
		</li>
	);
}

function MessageList() {
	const chatContext = useContext(ChatContext);

	const messages = chatContext.channels.get(chatContext.currentChannel)?.messages || [];

	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	return (
		<ul id="messages" className="space-y-4">
			{messages.map((message, index) => (
				<MessageBubble key={index} message={message} />
			))}
			<div ref={messagesEndRef} />
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
			<label className="btn btn-square btn-ghost cursor-pointer">
				<FaCirclePlus />
				<input type="file" className="hidden" />
			</label>
			<input type="text" ref={inputRef} className="input input-bordered flex-1" placeholder="Type your message here..." required />
			<button type="button" className="btn btn-square btn-ghost">
				<FaFaceSmileWink />
			</button>
			<button type="submit" className="btn btn-primary btn-square">
				<FaPaperPlane />
			</button>
		</form>
	);
}

export function Chat() {
	const chatContext = useContext(ChatContext);

	const [userListOpen] = useLocalStorage<boolean>("chat:user-list:open", true);

	return (
		<>
			<div className="flex-1 flex flex-col h-full">
				<ChatHeader channelId={chatContext.currentChannel} />
				<div className="flex-1 p-4 overflow-y-auto">
					<MessageList />
				</div>
				<div className="p-4 border-t border-base-300">
					<ChatInput />
				</div>
			</div>
			<UserListPanel isOpen={userListOpen} />
		</>
	);
}