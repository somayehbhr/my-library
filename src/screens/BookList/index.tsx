import data from "../../data/info.json";
import React from "react";
import Button from "../../components/Button";
import Book from "./components/Book";

interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id: number;
	price: string;
}

const BookList = () => {
	const [list, setList] = React.useState<Array<IBookEntity>>(data.books);
	function handleDeletePerson(id: number) {
		return function () {
			const newList = list.filter((row) => row.id !== id);
			setList(newList);
		};
	}
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">title</th>
						<th scope="col">release_date</th>
						<th scope="col">rate</th>
						<th scope="col">author</th>
						<th scope="col">category</th>
						<th scope="col">price</th>
						<th scope="col">action</th>
					</tr>
				</thead>
				<tbody>
					{list.map(
						(row: IBookEntity, index: number): React.ReactNode => (
							<Book key={row.id} {...row} {...{ index }} delete={handleDeletePerson(row.id)} />
						),
					)}
				</tbody>
			</table>
		</div>
	);
};
export default BookList;
