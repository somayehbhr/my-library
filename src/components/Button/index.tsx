import { FC, MouseEventHandler } from "react";

interface DeleteBooksProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	text: string;
	className?: string;
}
export const Button: FC<DeleteBooksProps> = (props) => {
	return (
		<button
			type="button"
			className={`btn btn-outline-${props.className}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
};
