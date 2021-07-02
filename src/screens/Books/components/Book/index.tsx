import * as React from "react";
// Common components
import { Button } from "../../../../components/Button";
import { EditIcon } from "../../../../components/Svg/EditIcon";
import { DeleteIcon } from "../../../../components/Svg/DeleteIcon";
// Hooks
import { useDispatch } from "react-redux";
// Constants
import { constants } from "../../../../store/Books/book.reducer";

interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id?: number;
	price: string;
	index: number;
	edit: any;
	author?: string;
}

/**
 * This component due to show data in each row and also add and edit action
 * @param props
 * @constructor
 */
export const Book = (props: IBookEntity) => {
	// Hooks
	const dispatch = useDispatch();

	/**
	 * Send action and payload to reducer to delete a row from table
	 * @param id
	 */
	function deleteBook(id: number) {
		dispatch({
			type: constants.DELETE,
			payload: id,
		});
	}
	return (
		<tr>
			<td>{props.index + 1}</td>
			<td>{props.title}</td>
			<td>{props.release_date}</td>
			<td>{props.rate}</td>
			<td>{props.author}</td>
			<td>{props.category}</td>
			<td>{props.price}</td>
			<td>
				<Button
					onClick={() => deleteBook(props.id)}
					text={
						<>
							<DeleteIcon />
						</>
					}
					className="danger"
				/>
				<Button
					onClick={() => props.edit()}
					text={
						<>
							<EditIcon />
						</>
					}
					className="primary"
				/>
			</td>
		</tr>
	);
};
