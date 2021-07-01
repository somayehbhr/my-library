// Hooks
import { useState } from "react";
import { useSelector } from "react-redux";
// Common components
import { Header } from "../../components/Header";
import { AddAuthor } from "./components/AddAuthor";
import { Author } from "./components/Author";
import { SearchAuthors } from "./components/SearchAuthors";
// Types
import { StateNetwork } from "../../types/store.type";
import { IBookEntity } from "../Books";

export interface IAuthorEntity {
	id: number;
	fullName: string;
}

const headerList = ["fullName", "number Of Books", "action"];
export const Authors = () => {
	const authors = useSelector<StateNetwork, Array<IAuthorEntity>>((state) => state.authors.list);
	const books = useSelector<StateNetwork, Array<IBookEntity>>((state) => state.books.list);
	const [selectedRow, setSelectedRow] = useState<IAuthorEntity>({} as IAuthorEntity);

	function sendAuthorInfo(id: number) {
		setSelectedRow(authors.find((item) => item.id === id)!);
	}

	function calculateNumOfBooks(id: number) {
		return books.filter((item) => item.author_id === id).length;
	}

	return (
		<>
			<AddAuthor authorInfo={selectedRow} selectedRow={selectedRow} />
			<SearchAuthors />
			<div className="container">
				{authors.length ? (
					<div className="table-responsive">
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
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="alert alert-danger" role="alert">
						There is no result to show!
					</div>
				)}
			</div>
		</>
	);
};
