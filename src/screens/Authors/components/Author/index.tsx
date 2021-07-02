import * as React from "react";
// Common components
import { Button } from "../../../../components/Button";
import { EditIcon } from "../../../../components/Svg/EditIcon";
import { DeleteIcon } from "../../../../components/Svg/DeleteIcon";
// Hooks
import { useDispatch } from "react-redux";
// Constants
import { constants } from "../../../../store/Authors/author.reducer";

interface IAuthorEntity {
	id: number;
	index: number;
	fullName: string;
	numOfBooks: number;
	edit: any;
}

/**
 * This component due to show data in each row and also add and edit action
 * @param props
 * @constructor
 */
export const Author = (props: IAuthorEntity) => {
	// Hooks
	const dispatch = useDispatch();

	/**
	 * Send action and payload to reducer to delete a row from table
	 * @param id
	 */
	function deleteAuthor(id: number) {
		dispatch({
			type: constants.DELETE,
			payload: id,
		});
	}
	return (
		<tr>
			<td scope="col">{props.index + 1}</td>
			<td scope="col">{props.fullName}</td>
			<td scope="col">{props.numOfBooks}</td>
			<td>
				<Button
					onClick={() => deleteAuthor(props.id)}
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
