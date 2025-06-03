import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chat-context";
import { ChannelJoinDialog } from "./channel-join-dialog";

export function JoinChannelButton() {
	const chatContext = useContext(ChatContext);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const onJoinChannel = (channelId: string) => {
		if (channelId) {
			chatContext.subscribeChannel(channelId);
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<button className="btn btn-primary w-full" onClick={() => setIsDialogOpen(true)}>Join Channel</button>
			<ChannelJoinDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} onJoinChannel={onJoinChannel} />
		</>
	);
}