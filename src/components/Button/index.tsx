import { FC, MouseEventHandler } from "react";

interface DeleteBooksProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	text: string;
	danger?: boolean;
	className?: string;
}
export const Button: FC<DeleteBooksProps> = (props) => {
	return (
		<button
			type="button"
			className={`btn ${props.danger && "btn-danger"} btn-${props.className}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
};
