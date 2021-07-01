// Common components
import { Button } from "../../../../components/Button";
// Hooks
import { useDispatch } from "react-redux";

interface IAuthorEntity {
	id: number;
	index: number;
	fullName: string;
	numOfBooks: number;
	edit: any;
}

export const Author = (props: IAuthorEntity) => {
	const dispatch = useDispatch();
	function deleteAuthor(id: number) {
		dispatch({
			type: "AUTHORS/DELETE",
			payload: id,
		});
	}
	return (
		<tr>
			<td scope="col">{props.index + 1}</td>
			<td scope="col">{props.fullName}</td>
			<td scope="col">{props.numOfBooks}</td>
			<td>
				<Button onClick={() => deleteAuthor(props.id)} text="Delete" className="danger" />
				<Button onClick={() => props.edit()} text="Edit" className="primary" />
			</td>
		</tr>
	);
};
