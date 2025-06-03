import { useContext } from "react";
import { ChatContext } from "../contexts/chat-context";
import { JoinChannelButton } from "./join-channel-button";
import { GiChatBubble } from "react-icons/gi";

function SidebarHeader() {
	return (
		<div className="h-11 flex items-center justify-center">
			<h1 className="font-bold">
				<GiChatBubble className="inline-block mr-2 text-primary" />
				Optimus Chat
			</h1>
		</div>
	);
}

function ChannelListItem({ channelId }: { channelId: string }) {
	const chatContext = useContext(ChatContext);

	const onClick = () => {
		chatContext.setCurrentChannel(channelId);
	}

	return (
		<li className="menu-item">
			<button onClick={onClick} className="flex items-center gap-1">
				<span className="text-base-content/40">#</span>
				<span>{channelId}</span>
			</button>
		</li>
	);
}

function ChannelList() {
	const chatContext = useContext(ChatContext);

	const channels = Array.from(chatContext.channels.values())

	return (
		<ul className="menu w-full flex-1">
			{channels.map(channel => (
				<ChannelListItem key={channel.id} channelId={channel.id} />
			))}
		</ul>
	);
}

export function Sidebar() {
	return (
		<div className="w-56 flex flex-col bg-base-200">
			<SidebarHeader />
			<div className="flex-1 flex flex-col p-4">
				<ChannelList />
				<JoinChannelButton />
			</div>
		</div>
	);
}