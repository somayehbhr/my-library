// Hooks
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
// Common components
import { Button } from "../../../../components/Button";

interface IDetailEntity {
	selectedRow: any;
	bookInfo: any;
}

export const AddBook = (props: IDetailEntity) => {
	const dispatch = useDispatch();
	const authors = useSelector((state: any) => state.authors.list);
	const isEditModeEnabled = props.bookInfo?.hasOwnProperty("title");
	const [bookInfo, setBookInfo] = useState({
		title: "",
		release_date: "",
		rate: "",
		category: "",
		price: "",
		author_id: -1,
	});

	function handleAddBook(add: any) {
		dispatch({
			type: "BOOKS/ADD",
			payload: add,
		});
	}

	function addBook() {
		handleAddBook({
			title: bookInfo.title,
			rate: bookInfo.rate,
			release_date: bookInfo.release_date,
			category: bookInfo.category,
			price: bookInfo.price,
			author_id: bookInfo.author_id,
		});
		clearBookInfo();
	}

	function handleEditBook(editedBook: any) {
		dispatch({
			type: "BOOKS/EDIT",
			payload: {
				id: props.selectedRow.id,
				title: editedBook.title,
				rate: editedBook.rate,
				release_date: editedBook.release_date,
				category: editedBook.price,
				author_id: editedBook.author_id,
			},
		});
	}

	function clearBookInfo() {
		setBookInfo({
			title: "",
			release_date: "",
			rate: "",
			category: "",
			price: "",
			author_id: -1,
		});
	}
	function editBook() {
		handleEditBook({
			title: bookInfo.title,
			rate: bookInfo.rate,
			release_date: bookInfo.release_date,
			category: bookInfo.category,
			price: bookInfo.price,
			author_id: bookInfo.author_id,
		});
		clearBookInfo();
	}

	function changeTitle(event: ChangeEvent<HTMLInputElement>) {
		setBookInfo({ ...bookInfo, title: event.target.value });
	}
	function changeRate(event: ChangeEvent<HTMLInputElement>) {
		setBookInfo({ ...bookInfo, rate: event.target.value });
	}
	function changeReleaseDate(event: ChangeEvent<HTMLInputElement>) {
		setBookInfo({ ...bookInfo, release_date: event.target.value });
	}
	function changeCategory(event: ChangeEvent<HTMLInputElement>) {
		setBookInfo({ ...bookInfo, category: event.target.value });
	}
	function changePrice(event: ChangeEvent<HTMLInputElement>) {
		setBookInfo({ ...bookInfo, price: event.target.value });
	}
	function changeAuthor(event: ChangeEvent<HTMLSelectElement>) {
		setBookInfo({ ...bookInfo, author_id: Number(event.target.value) });
	}

	useEffect(() => {
		setBookInfo(props.bookInfo);
	}, [props.bookInfo]);

	return (
		<div className="container addSection bg-light">
			<form>
				<div className="row">
					<div className="col-md-4">
						<label>Title</label>
						<input
							type="text"
							required
							className="form-control"
							placeholder="Title"
							id="autoSizingInput"
							value={bookInfo?.title}
							onChange={changeTitle}
						/>
					</div>
					<div className="col-md-4">
						<label>Release date</label>
						<input
							type="date"
							required
							className="form-control"
							id="autoSizingInput"
							placeholder="dd/mm/yyyy"
							value={bookInfo?.release_date}
							onChange={changeReleaseDate}
						/>
					</div>
					<div className="col-md-4">
						<label>Rate</label>
						<input
							type="number"
							required
							min="0.0"
							max="10.0"
							step="0.1"
							className="form-control"
							id="autoSizingInput"
							placeholder="Rate"
							value={bookInfo?.rate}
							onChange={changeRate}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<label>Category</label>
						<input
							required
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Category"
							value={bookInfo?.category}
							onChange={changeCategory}
						/>
					</div>
					<div className="col-md-4">
						<label>Price</label>
						<input
							required
							type="number"
							min="0"
							className="form-control"
							id="autoSizingInput"
							placeholder="Price"
							value={bookInfo?.price}
							onChange={changePrice}
						/>
					</div>
					<div className="col-md-4">
						<label>Authors</label>
						<select
							required
							defaultValue={-1}
							className="form-select"
							id="autoSizingSelect"
							value={bookInfo?.author_id}
							onChange={changeAuthor}
						>
							<option value={-1}>Choose</option>
							{authors.map((row: any) => (
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
							onClick={isEditModeEnabled ? editBook : addBook}
							text={isEditModeEnabled ? "Submit" : "Add"}
							className={isEditModeEnabled ? "primary" : "success"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
