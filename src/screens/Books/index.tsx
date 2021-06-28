//Json
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
//Local components
import { Book } from "./components/Book";
import { AddBook } from "./components/AddBook";
//Hooks
import { useState } from "react";
import { SearchBooks } from "./components/SearchBooks";
import { useSelector } from "react-redux";
// Types
import { StateNetwork } from "../../types/store.type";

export interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id?: number;
	price: string;
}

const headerList = ["title", "release_date", "rate", "author", "category", "price", "action"];

export const Books = () => {
	const books = useSelector<StateNetwork, Array<IBookEntity>>((state) => state.books.list);
	const [selectedRow, setSelectedRow] = useState<any>();
	function sendBookInfo(id: number) {
		setSelectedRow(books.find((item) => item.id === id));
	}
	function getAuthor(id?: number) {
		return data.authors.find((item) => item.id === id)?.fullName;
	}
	return (
		<>
			<AddBook bookInfo={selectedRow} selectedRow={selectedRow} />
			<SearchBooks />
			<div className="container">
				{books.length ? (
					<table className="table">
						<Header list={headerList} />
						<tbody>
							{books.map((row, index) => (
								<Book
									key={row.id}
									{...row}
									{...{ index }}
									author={getAuthor(row.author_id)}
									edit={() => sendBookInfo(row.id)}
								/>
							))}
						</tbody>
					</table>
				) : (
					<div className="alert alert-danger" role="alert">
						There is no result to show!
					</div>
				)}
			</div>
		</>
	);
};
