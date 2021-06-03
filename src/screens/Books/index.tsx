import data from "../../data/info.json";
import React from "react";
import Book from "./components/Book";
import Header from "../../components/Header";

export interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id: number;
	price: string;
}

const headerList = ["title", "release_date", "rate", "author", "category", "price", "action"];
const Books = () => {
	const [list, setList] = React.useState<Array<IBookEntity>>(data.books);
	function handleDeleteBook(id: number) {
		return function () {
			const newList = list.filter((row) => row.id !== id);
			setList(newList);
		};
	}
	return (
		<div>
			<table className="table">
				<Header list={headerList} />
				<tbody>
					{list.map(
						(row: IBookEntity, index: number): React.ReactNode => (
							<Book
								key={row.id}
								{...row}
								{...{ index }}
								delete={handleDeleteBook(row.id)}
							/>
						),
					)}
				</tbody>
			</table>
		</div>
	);
};
export default Books;
