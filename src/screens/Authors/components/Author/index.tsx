import { Button } from "../../../../components/Button";

interface IAuthorEntity {
	index: number;
	fullName: string;
	numOfBooks: number;
	delete: any;
	edit: any;
}

export const Author = (props: IAuthorEntity) => {
	return (
		<tr>
			<td scope="col">{props.index + 1}</td>
			<td scope="col">{props.fullName}</td>
			<td scope="col">{props.numOfBooks}</td>
			<td>
				<Button onClick={() => props.delete()} text="Delete" className="danger" />
				<Button onClick={() => props.edit()} text="Edit" className="primary" />
			</td>
		</tr>
	);
};
