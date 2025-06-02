
function SidebarHeader() {
	return (
		<div className="h-12 flex items-center justify-center ">
			<h1 className="text-xl font-bold">Optimus Chat</h1>
		</div>
	);
}

function ChannelList() {
	return (
		<ul className="menu w-full flex-1">
			<li>
				<a href="#" className="flex items-center gap-1">
					<span className="text-base-content/40">#</span>
					<span>main</span>
				</a>
			</li>
			<li>
				<a href="#" className="flex items-center gap-1">
					<span className="text-base-content/40">#</span>
					<span>memes</span>
				</a>
			</li>
		</ul>
	);
}

function JoinChannelButton() {
	return (
		<button className="btn btn-primary w-full" id="join_channel_button">
			Join Channel
		</button>
	);
}

export function Sidebar() {

	return (
		<div className="w-56 flex flex-col bg-base-200 p-4">
			<SidebarHeader />
			<ChannelList />
			<JoinChannelButton />
		</div>
	);
}