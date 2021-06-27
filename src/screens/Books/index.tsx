//Json
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
//Local components
import { Book } from "./components/Book";
import { AddBook } from "./components/AddBook";
//Hooks
import { ReactNode, useEffect, useState } from "react";
import { IAuthorEntity } from "../Authors";
import { SearchBooks } from "./components/SearchBooks";
import { useSelector } from "react-redux";
import { StateNetwork } from "../../types/store.type";
import { Author } from "../Authors/components/Author";

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
	const [list, setList] = useState<Array<IBookEntity>>(data.books);
	const [selectedRow, setSelectedRow] = useState<any>();
	const [filterList, setFilterList] = useState<Array<IBookEntity>>([])

	function sendBookInfo(id: number) {

		setSelectedRow(books.find((item) => item.id === id));
	}
	function handleEditBook(editedBook: any) {
		let tempBooks = [...list];
		let index = tempBooks.indexOf(selectedRow);
		tempBooks.splice(index, 1);
		setList([editedBook, ...tempBooks]);
		setSelectedRow(null);
	}
	function getAuthor(id?: number) {
		return data.authors.find((item) => item.id === id)?.fullName;
	}

	function handleAddBook(add: IBookEntity) {
		const id = Math.floor(Math.random() * 1000) + 1;
		const newBook = { ...add, id };
		setList([...list, newBook]);
	}
	function onListChange(newList: IBookEntity[]) {
		setFilterList(newList);
	}

	return (
		<>
			<AddBook bookInfo={selectedRow} selectedRow={selectedRow} />
            {/*<SearchBooks onSetList={onListChange} list={list}/>*/}
			<div className="container">
				{
						books.length ? (
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
								))
								}
								</tbody>
							</table>
						) : <div className="alert alert-danger" role="alert">
							There is no result to show!
						</div>
					}
			</div>
		</>
	);
};
