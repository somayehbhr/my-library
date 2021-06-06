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
	const [authors, setAuthors] = React.useState(data.authors);
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
	function getAuthor(id?: number) {
		return authors.find((item) => item.id === id)?.fullName;
	}

	function addBook(add: any) {
		console.log(add);
		// let author_id = add.find((item) => item.fullName === add.id)?.id;

		// setList([...list, add, { author_id }]);
	}

	return (
		<>
			<AddBook id={list.length} add={addBook} />

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
							/>
						),
					)}
				</tbody>
			</table>
		</>
	);
};
export default Books;
