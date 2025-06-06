import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import { useRef } from "react";

type ChannelJoinDialogProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onJoinChannel: (channelName: string) => void;
};

export function ChannelJoinDialog({ isOpen, setIsOpen, onJoinChannel }: ChannelJoinDialogProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputRef.current)
			return;

		const channelName = inputRef.current.value.trim();

		if (channelName)
			onJoinChannel(channelName);
	}

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<DialogPanel className="modal-box opacity-100">
					<div className="flex items-center justify-between">
						<DialogTitle className="font-bold">Join Channel</DialogTitle>
						<Button className="btn btn-ghost btn-sm" onClick={() => setIsOpen(false)}>
							X
						</Button>
					</div>

					<Description className={"mt-6"}>Enter the name of the channel you wish to join. If it doesn't exist, it will be created.</Description>

					<form
						onSubmit={onSubmit}
					>
						<Input
							type="text"
							placeholder="Channel Name"
							className="input w-full mt-4"
							ref={inputRef}
							autoFocus
							required
						/>
						<div className="modal-action mt-4 flex gap-2">
							<Button type="button" className="btn" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" className="btn btn-primary">
								Join
							</Button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
}