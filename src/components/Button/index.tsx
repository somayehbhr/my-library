import { FC, MouseEventHandler } from "react";

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	type?: "submit" | "reset" | "button";
	text: string;
	className?: string;
	disabled?: boolean;
}
export const Button: FC<Props> = (props) => {
	return (
		<button
			disabled={props.disabled}
			type={props.type}
			className={`btn btn-outline-${props.className}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
};
