//Json
import data from "../../data/info.json";
// Common components
import { Header } from "../../components/Header";
//Local components
import { Book } from "./components/Book";
import { AddAndEditBook } from "./components/AddAndEditBook";
//Hooks
import { useState } from "react";
import { SearchBooks } from "./components/SearchBooks";
import { useDispatch, useSelector } from "react-redux";
// Types
import { StateNetwork } from "../../types/store.type";
import { FC } from "react";
// Constants
import { constants } from "../../store/Books/book.reducer";

export interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id?: number;
	price: string;
}
/**
 * This array will send to the header component to render the title of each column in the table
 */
const headerList = ["Title", "Release date", "Rate", "Author", "Category", "Price($)", "Action"];
/**
 * This is the main component of authors and contains local components such as search, add and edit, delete
 * @constructor
 */
export const Books: FC = () => {
	// Hooks
	const dispatch = useDispatch();
	// Store connector
	const books = useSelector<StateNetwork, Array<IBookEntity>>((state) => state.books.list);

	const [selectedRow, setSelectedRow] = useState<any>();

	/**
	 * Sending data from each row to add form and change button of add form
	 * @param id
	 */
	function sendBookInfo(id: number) {
		setSelectedRow(books.find((item) => item.id === id));
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
	 * Show author name by id that we have in authors list
	 * @param id
	 */
	function getAuthor(id?: number) {
		return data.authors.find((item) => item.id === id)?.fullName;
	}
	return (
		<>
			<AddAndEditBook bookInfo={selectedRow} selectedRow={selectedRow} />
			<SearchBooks />
			<div className="container">
				{books.length ? (
					<div className="table-responsive">
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
