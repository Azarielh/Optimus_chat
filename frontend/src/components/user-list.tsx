
function UserListRow({ user }: { user: string }) {
	console.log("Rendering UserListRow with user:", user);
	return (
		<li className="btn btn-ghost w-full justify-start">
			<span className="text-base-content">{user}</span>
		</li>
	);
}

export type UserListProps = {
	users: string[];
};

export function UserList({ users }: UserListProps) {
	return (
		<div className="bg-base-200 p-4">
			<ul className="flex flex-col w-full gap-2">
				{users.map((user, index) => (
					<UserListRow key={index} user={user} />
				))}
			</ul>
		</div>
	);
}