// Common components
import { Button } from "../../../../components/Button";
import { useDispatch } from "react-redux";

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

export const Book = (props: IBookEntity) => {
	const dispatch = useDispatch();
	function deleteBook(id:number){
		dispatch({
			type: "BOOKS/DELETE",
			payload: id
		})
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
				<Button onClick={() => deleteBook(props.id)} text="Delete" className="danger" />
				<Button onClick={() => props.edit()} text="Edit" className="primary" />
			</td>
		</tr>
	);
};
