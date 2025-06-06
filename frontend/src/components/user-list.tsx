import { useContext } from "react";
import { UserAvatar } from "./user-avatar";
import { ChatContext } from "../contexts/chat-context";

function UserListRow({ user }: { user: string }) {
	return (
		<li className="btn btn-ghost w-full justify-start">
			<UserAvatar size="sm" user={user} />
			<p className="truncate">{user}</p>
		</li>
	);
}

export type UserListProps = {
	users: string[];
};

function UserList({ users }: UserListProps) {
	return (
		<ul className="flex flex-col w-full gap-2">
			{users.map((user, index) => (
				<UserListRow key={index} user={user} />
			))}
		</ul>
	);
}

export type UserListPanelProps = {
	isOpen?: boolean;
};

export function UserListPanel(props: UserListPanelProps) {
	const chatContext = useContext(ChatContext);

	const currentUsers = chatContext.channels.get(chatContext.currentChannel)?.users || [];

	return (
		<div aria-expanded={props.isOpen} className="bg-base-200 p-4 w-96 overflow-y-auto aria-expanded:block hidden">
			<h2 className="text-lg font-semibold mb-4">Users - {currentUsers.length}</h2>
			<UserList users={currentUsers} />
		</div>
	);
}