// Types
import { FC, MouseEventHandler } from "react";

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	type?: "submit" | "reset" | "button";
	text?: any;
	className?: string;
	disabled?: boolean;
}

/**
 * This component used for all types of buttons in the whole project
 * @param props
 * @constructor
 */
export const Button: FC<Props> = (props) => {
	return (
		<button
			disabled={props.disabled}
			type={props.type}
			className={`btn btn-${props.className}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
};
