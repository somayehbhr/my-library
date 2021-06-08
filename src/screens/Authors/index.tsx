//Hooks
import { useEffect, useState } from "react";
//Json
import data from "../../data/info.json";
//Common components
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
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

	function getLocalList() {
		try {
			return JSON.parse(window.localStorage.getItem("authors") as string);
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
	return (
		<>
			<AddAuthor onAddClick={handleAddAuthor} />
			<br />
			<table className="table">
				<Header list={headerList} />
				<tbody>
					{list.map((row, index) => (
						<Author
							index={index}
							fullName={row.fullName}
							numOfBooks={calculateNumOfBooks(row.id)}
							delete={handleDeleteAuthor(row.id)}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};
