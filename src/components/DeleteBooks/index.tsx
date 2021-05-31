import React, { MouseEventHandler } from "react";
import data from "../../data/info.json";
interface DeleteBooksProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	text: string;
}
export const DeleteBooks: React.FC<DeleteBooksProps> = (props) => {
	return (
		<button type="button" className="btn btn-danger" onClick={props.onClick}>
			{props.text}
		</button>
	);
};
