import { Button } from "../../../../components/Button";

interface IAuthorEntity {
	index: number;
	fullName: string;
	numOfBooks: number;
	delete: (id: any) => void;
}
export const Author = (props: IAuthorEntity) => {
	return (
		<tr>
			<td scope="col">{props.index + 1}</td>
			<td scope="col">{props.fullName}</td>
			<td scope="col">{props.numOfBooks}</td>
			<td>
				<Button onClick={props.delete} text="Delete" className="danger" />
			</td>
		</tr>
	);
};
