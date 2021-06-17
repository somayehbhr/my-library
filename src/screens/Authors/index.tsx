// Hooks
import { useEffect, useState } from "react";
// Dummy data
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
import { AddAuthor } from "./components/AddAuthor";
import { Author } from "./components/Author";

export interface IAuthorEntity {
	id: number;
	fullName: string;
}

const headerList = ["fullName", "number Of Books", "action"];
const books = data.books;
export const Authors = () => {
	const [list, setList] = useState<Array<IAuthorEntity>>(data.authors);
	const [selectedRow, setSelectedRow] = useState<IAuthorEntity>({} as IAuthorEntity);
	const [searchItem, setSearchItem] = useState("");

	useEffect(() => {
		const localList = getLocalList();
		if (Array.isArray(localList) && localList.length) {
			setList(localList);
		} else {
			setList(data.authors);
		}
	}, []);

	useEffect(() => {
		setLocalList(list);
	}, [list]);

	function setLocalList(list: IAuthorEntity[]) {
		window.localStorage.setItem("authors", JSON.stringify(list));
	}
	function sendAuthorInfo(id: number) {
		setSelectedRow(list.find((item) => item.id === id)!);
	}
	function getLocalList() {
		try {
			return JSON.parse(window.localStorage.getItem("authors")!);
		} catch (e) {
			return [];
		}
	}

	function calculateNumOfBooks(id: number) {
		return books.filter((item) => item.author_id === id).length;
	}
	function handleDeleteAuthor(id: number) {
		return function () {
			const newList = list.filter((row) => row.id !== id);
			setList(newList);
		};
	}
	function handleAddAuthor(add: any) {
		const id = Math.floor(Math.random() * 100);
		const newAuthor = { id, ...add };
		setList([...list, newAuthor]);
	}
	function handleEditAuthor(editedBook: any) {
		let tempBooks = [...list];
		let index = tempBooks.indexOf(selectedRow);
		tempBooks.splice(index, 1);
		setList([editedBook, ...tempBooks]);
		setSelectedRow({} as IAuthorEntity);
	}
	// @ts-ignore
	function search() {
		let result = list.filter((s) => {
			return s.fullName.includes(searchItem);
		});

		setList(result);
		return result;
	}

	return (
		<>
			<form className="form-inline">
				<div className="input-group">
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
						value={searchItem}
						onChange={(event) => setSearchItem(event.target.value)}
					/>
					<button
						type="button"
						className="btn btn-outline-success my-2 my-sm-0"
						onClick={search}
					>
						Search
					</button>
				</div>
			</form>
			<AddAuthor
				onAddClick={handleAddAuthor}
				authorInfo={selectedRow}
				onEditClick={handleEditAuthor}
			/>
			<div className="container">
				<table className="table">
					<Header list={headerList} />
					<tbody>
						{list.map((row, index) => (
							<Author
								index={index}
								fullName={row.fullName}
								numOfBooks={calculateNumOfBooks(row.id)}
								delete={handleDeleteAuthor(row.id)}
								edit={() => sendAuthorInfo(row.id)}
							/>
						))}
					</tbody>
				</table>
				{list.length == 0 && (
					<div className="alert alert-danger" role="alert">
						There is no result to show!
					</div>
				)}
			</div>
		</>
	);
};
