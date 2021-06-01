import Button from "../../../../components/Button";
import React from "react";

interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id: number;
	price: string;
	index: number;
	delete: any;
}

const Book = (props: IBookEntity) => {
	return (
		<tr>
			<td>{props.index + 1}</td>
			<td>{props.title}</td>
			<td>{props.release_date}</td>
			<td>{props.rate}</td>
			<td>{props.author_id /**TODO: get author name from author_id */}</td>
			<td>{props.category}</td>
			<td>{props.price}</td>
			<td>
				<td>
					<Button onClick={() => props.delete()} text="Delete" />
				</td>
			</td>
		</tr>
	);
};

export default Book;
