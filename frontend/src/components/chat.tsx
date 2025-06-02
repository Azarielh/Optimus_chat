export function Chat() {
	return (
		<div className="flex-1 flex flex-col h-full">
			<div className="w-full p-2 border-b border-base-300">
				<h2 className="text-lg font-semibold">#main</h2>
			</div>
			<div className="flex-1 p-4">
				<ul id="messages" className="space-y-4">
				</ul>
			</div>
			<div className="p-4 border-t border-base-300">
				<form id="chat_form" className="flex gap-2">
					<input type="text" id="chat_input" className="input input-bordered flex-1" placeholder="Type your message here..." required />
					<button type="submit" className="btn btn-primary">Send</button>
				</form>
			</div>
		</div>
	);
}