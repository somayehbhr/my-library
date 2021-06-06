import Button from "../../../../components/Button";
import React from "react";

interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id?: number;
	price: string;
	index: number;
	delete: any;
	edit: any;
	author?: string;
}

const Book = (props: IBookEntity) => {
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
				<Button onClick={() => props.delete()} text="Delete" danger />
				<Button onClick={() => props.edit()} text="Edit" className="primary " />
			</td>
		</tr>
	);
};

export default Book;
