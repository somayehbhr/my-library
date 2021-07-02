// Hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Common components
import { Header } from "../../components/Header";
import { AddAndEditAuthor } from "./components/AddAndEditAuthor";
import { Author } from "./components/Author";
import { SearchAuthors } from "./components/SearchAuthors";
// Types
import { StateNetwork } from "../../types/store.type";
import { IBookEntity } from "../Books";
import { FC } from "react";
// Constants
import { constants } from "../../store/Authors/author.reducer";

export interface IAuthorEntity {
	id: number;
	fullName: string;
}

/**
 * This array will send to the header component to render the title of each column in the table
 */
const headerList = ["Full name", "Number of books", "Action"];
/**
 * This is the main component of authors and contains local components such as search, add and edit, delete
 * @constructor
 */
export const Authors: FC = () => {
	// Hooks
	const dispatch = useDispatch();
	// Store connector
	const authors = useSelector<StateNetwork, Array<IAuthorEntity>>((state) => state.authors.list);
	const books = useSelector<StateNetwork, Array<IBookEntity>>((state) => state.books.list);

	const [selectedRow, setSelectedRow] = useState<IAuthorEntity>({} as IAuthorEntity);

	/**
	 * Sending data from each row to add form and change button of add form
	 * @param id
	 */
	function sendAuthorInfo(id: number) {
		setSelectedRow(authors.find((item) => item.id === id)!);
		editMode();
		window.scrollTo(0, 0);
	}

	/**
	 * Set edit mode true to allow update row
	 */
	function editMode() {
		dispatch({
			type: constants.IS_EDIT,
			payload: true,
		});
	}

	/**
	 * Calculate the number of books that receive from the list of books and show them in the author's table
	 * @param id
	 */
	function calculateNumOfBooks(id: number) {
		return books.filter((item) => item.author_id === id).length;
	}

	return (
		<>
			<AddAndEditAuthor authorInfo={selectedRow} selectedRow={selectedRow} />
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
