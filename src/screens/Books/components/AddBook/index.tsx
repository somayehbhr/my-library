// Hooks
import { useState, useEffect } from "react";
// Common components
import { Button } from "../../../../components/Button";
// Json
import { useDispatch, useSelector } from "react-redux";

interface IDetailEntity {
	// id: number;
	// onAddClick: any;
	// onEditClick: any;
	// bookInfo: any;
	selectedRow: any;
	bookInfo: any;
}

export const AddBook = (props: IDetailEntity) => {
	const authors = useSelector((state:any) => (state.authors.list))
	const [title, setTitle] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [rate, setRate] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [author, setAuthor] = useState(-1);
	const isEditModeEnabled = props.bookInfo?.hasOwnProperty("fullName");
	const dispatch = useDispatch();

	function handleAddBook(add: any) {
		dispatch({
			type: "BOOKS/ADD",
			payload: add,
		});
	}

	function addBook() {
		handleAddBook({ title, rate, releaseDate, category, price, author});
		setTitle("");
		setReleaseDate("");
		setRate("");
		setCategory("");
		setPrice("");
		setAuthor(-1);
	}

	function handleEditBook(editedBook: any) {
		dispatch({
			type: "BOOKS/EDIT",
			payload: {
				id: props.selectedRow.id,
				title: editedBook.title,
				rate: editedBook.rate,
				release_date: editedBook.releaseDate,
				category: editedBook.price,
				author_id: editedBook.author_id,
			},
		});
	}
	function editBook() {
		handleEditBook({ title, rate, releaseDate, category, price, author});
		setTitle("");
		setReleaseDate("");
		setRate("");
		setCategory("");
		setPrice("");
		setAuthor(-1);
	}
	return (
		<div className="container addSection bg-light">
			<form>
				<div className="row">
					<div className="col-md-4">
						<label htmlFor="inputEmail4">Title</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Title"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Release date</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="dd/mm/yyyy"
							value={releaseDate}
							onChange={(event) => setReleaseDate(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Rate</label>
						<input
							type="number"
							className="form-control"
							id="autoSizingInput"
							placeholder="Rate"
							value={rate}
							onChange={(event) => setRate(event.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Category</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Category"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Price</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Authors</label>
						<select
							defaultValue={-1}
							className="form-select"
							id="autoSizingSelect"
							value={author}
							onChange={(event) => setAuthor(Number(event.target.value))}
						>
							<option value={-1}>Choose</option>
							{authors.map((row:any) => (
								<option key={row.id} value={row.id}>
									{row.fullName}
								</option>
							))}
						</select>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<Button
							onClick={props.bookInfo ? editBook : addBook}
							text={props.bookInfo ? "Edit" : "Add"}
							className={props.bookInfo ? "primary" : "success"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
