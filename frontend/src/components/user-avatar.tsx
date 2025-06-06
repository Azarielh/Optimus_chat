
export type UserAvatarSize = "sm" | "md" | "lg" | "xl";

export type UserAvatarProps = {
	user: string;
	size?: UserAvatarSize;
};

export function UserAvatar(props: UserAvatarProps) {
	const { user, size = "md" } = props;

	const getSizeClasses = (size: UserAvatarSize) => {
		switch (size) {
			case "sm":
				return {
					container: "w-8 h-8",
					text: "text-sm"
				};
			case "md":
				return {
					container: "w-12 h-12",
					text: "text-xl"
				};
			case "lg":
				return {
					container: "w-16 h-16",
					text: "text-2xl"
				};
			case "xl":
				return {
					container: "w-20 h-20",
					text: "text-3xl"
				};
		}
	};

	const getInitials = (name: string) => {
		const names = name.split("-");
		if (names.length === 0) return "?";
		if (names.length === 1 && names[0]) return names[0][0]?.toUpperCase() ?? "?";
		const firstInitial = names[0]?.[0] ?? "";
		const lastInitial = names[names.length - 1]?.[0] ?? "";
		return (firstInitial + lastInitial).toUpperCase() || "?";
	};

	const sizeClasses = getSizeClasses(size);

	return (
		<div className="avatar avatar-placeholder">
			<div className={`bg-neutral text-neutral-content ${sizeClasses.container} rounded-full flex items-center justify-center`}>
				<span className={sizeClasses.text}>{getInitials(user)}</span>
			</div>
		</div>
	);
}