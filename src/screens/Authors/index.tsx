// Hooks
import { useEffect, useState } from "react";
// Dummy data
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
import { AddAuthor } from "./components/AddAuthor";
import { Author } from "./components/Author";
import { SearchAuthors } from "./components/SearchAuthors";
import { IBookEntity } from "../Books";
import { useDispatch, useSelector } from "react-redux";

export interface IAuthorEntity {
	id: number;
	fullName: string;
}

const headerList = ["fullName", "number Of Books", "action"];
const books = data.books;
export const Authors = () => {
	const authors = useSelector((state: any) => state.authors.list);
	const [list, setList] = useState<Array<IAuthorEntity>>(data.authors);
	const [selectedRow, setSelectedRow] = useState<IAuthorEntity>({} as IAuthorEntity);
	const [filterList, setFilterList] = useState<Array<IAuthorEntity>>([]);

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
		console.log("here");
		console.log("LIST", list);
		console.log("ID", id);
		setSelectedRow(list.find((item) => item.id === id)!);
		console.log("a", list.find((item) => item.id === id)!);
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
	function onListChange(newList: IAuthorEntity[]) {
		setFilterList(newList);
	}

	return (
		<>
			<AddAuthor authorInfo={selectedRow} selectedRow={selectedRow} />
			<SearchAuthors list={list} onSetList={onListChange} />
			<div className="container">
				<table className="table">
					<Header list={headerList} />
					<tbody>
						{filterList.length === 0
							? authors.map((row: any, index: number) => {
									console.log("ROW", row);
									return (
										<Author
											index={index}
											id={row.id}
											fullName={row.fullName}
											numOfBooks={calculateNumOfBooks(row.id)}
											delete={handleDeleteAuthor(row.id)}
											edit={() => sendAuthorInfo(row.id)}
										/>
									);
							  })
							: filterList.map((row, index) => (
									<Author
										id={row.id}
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
