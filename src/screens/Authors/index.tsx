// Hooks
import { useState } from "react";
// Dummy data
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
import { AddAuthor } from "./components/AddAuthor";
import { Author } from "./components/Author";
import { SearchAuthors } from "./components/SearchAuthors";
import { useSelector } from "react-redux";
import { StateNetwork } from "../../types/store.type";

export interface IAuthorEntity {
	id: number;
	fullName: string;
}

const headerList = ["fullName", "number Of Books", "action"];
const books = data.books;
export const Authors = () => {
	const authors = useSelector<StateNetwork, Array<IAuthorEntity>>((state) => state.authors.list);
	const [list, setList] = useState<Array<IAuthorEntity>>(data.authors);
	const [selectedRow, setSelectedRow] = useState<IAuthorEntity>({} as IAuthorEntity);
	const [filterList, setFilterList] = useState<Array<IAuthorEntity>>([]);

	function sendAuthorInfo(id: number) {
		setSelectedRow(authors.find((item) => item.id === id)!);
	}

	function calculateNumOfBooks(id: number) {
		return books.filter((item) => item.author_id === id).length;
	}

	function onListChange(newList: IAuthorEntity[]) {
		setFilterList(newList);
	}

	return (
		<>
			<AddAuthor authorInfo={selectedRow} selectedRow={selectedRow} />
			<SearchAuthors list={list} onSetList={onListChange} />
			<div className="container">
				{
					authors.length ? (
						<table className="table">
							<Header list={headerList} />
							<tbody>
							{authors.map((row, index) => (
								<Author
									index={index}
									id={row.id}
									fullName={row.fullName}
									numOfBooks={calculateNumOfBooks(row.id)}
									edit={() => sendAuthorInfo(row.id)}
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
