import data from "../../data/info.json";
import React from "react";
import Book from "./components/Book";
import Header from "../../components/Header";
import AddBook from "./components/AddBook";

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

const Books = () => {
	const [list, setList] = React.useState<Array<IBookEntity>>(data.books);
	const [edit, setEdit] = React.useState<any>();

	React.useEffect(() => {
		const localList = getLocalList();

		if (Array.isArray(localList) && localList.length) {
			setList(localList);
		} else {
			setList(data.books);
		}
	}, []);

	React.useEffect(() => {
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
		setEdit(list.find((item) => item.id === id));
	}
	function handleEditBook(id: number) {}
	function getAuthor(id?: number) {
		return data.authors.find((item) => item.id === id)?.fullName;
	}

	function addBook(add: IBookEntity) {
		const id = Math.floor(Math.random() * 1000) + 1;
		const newBook = { ...add, id };
		setList([...list, newBook]);
	}

	return (
		<>
			<AddBook id={list.length} add={addBook} edit={edit} />

			<table className="table">
				<Header list={headerList} />
				<tbody>
					{list.map(
						(row: IBookEntity, index: number): React.ReactNode => (
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
		</>
	);
};
export default Books;
