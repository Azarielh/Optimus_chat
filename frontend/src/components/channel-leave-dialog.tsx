import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from "@headlessui/react";

type ChannelLeaveDialogProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onLeaveChannel: () => void;
	channelId: string;
};

export function ChannelLeaveDialog({ isOpen, setIsOpen, onLeaveChannel, channelId }: ChannelLeaveDialogProps) {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onLeaveChannel();
	}

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<DialogPanel className="modal-box opacity-100">
					<div className="flex items-center justify-between">
						<DialogTitle className="font-bold">Leave Channel</DialogTitle>
						<Button className="btn btn-ghost btn-sm" onClick={() => setIsOpen(false)}>
							X
						</Button>
					</div>

					<Description className={"mt-6"}>Do you wish to leave the channel <span className="font-semibold">{channelId}</span> ?</Description>

					<form
						onSubmit={onSubmit}
					>
						<div className="modal-action mt-4 flex gap-2">
							<Button type="button" className="btn" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" className="btn btn-error">
								Leave
							</Button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
}