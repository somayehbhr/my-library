import React, { MouseEventHandler } from "react";

interface DeleteBooksProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	text: string;
	danger?: boolean;
}
const Button: React.FC<DeleteBooksProps> = (props) => {
	return (
		<button
			type="button"
			className={`btn ${props.danger && "btn-danger"}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
};

export default Button;
