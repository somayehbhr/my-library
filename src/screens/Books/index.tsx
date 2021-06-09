//Json
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
//Local components
import { Book } from "./components/Book";
import { AddBook } from "./components/AddBook";
//Hooks
import { ReactNode, useEffect, useState } from "react";

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
	const [list, setList] = useState<Array<IBookEntity>>(data.books);
	const [selectedRow, setSelectedRow] = useState<any>();

	useEffect(() => {
		const localList = getLocalList();

		if (Array.isArray(localList) && localList.length) {
			setList(localList);
		} else {
			setList(data.books);
		}
	}, []);

	useEffect(() => {
		setLocalList(list);
	}, [list]);

	function setLocalList(list: IBookEntity[]) {
		window.localStorage.setItem("books", JSON.stringify(list));
	}

	function getLocalList() {
		try {
			return JSON.parse(window.localStorage.getItem("books") as string);
		} catch (e) {
			return [];
		}
	}
	function handleDeleteBook(id: number) {
		return function () {
			const newList = list.filter((row) => row.id !== id);
			setList(newList);
		};
	}
	function sendBookInfo(id: number) {
		setSelectedRow(list.find((item) => item.id === id));
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

	return (
		<>
			<AddBook
				id={list.length}
				onAddClick={handleAddBook}
				bookInfo={selectedRow}
				onEditClick={handleEditBook}
			/>

			<div className="container">
				<table className="table">
					<Header list={headerList} />
					<tbody>
						{list.map(
							(row: IBookEntity, index: number): ReactNode => (
								<Book
									key={row.id}
									{...row}
									{...{ index }}
									author={getAuthor(row.author_id)}
									delete={handleDeleteBook(row.id)}
									edit={() => sendBookInfo(row.id)}
								/>
							),
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};
