// Hooks
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
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
	const [firstSubmited, setFirstSubmited] = useState(false);
	const [bookInfo, setBookInfo] = useState({
		title: "",
		release_date: "",
		rate: "",
		category: "",
		price: "",
		author_id: -1,
	});
	const formik = useFormik({
		initialValues: {
			title: "",
			release_date: "",
			rate: "",
			category: "",
			price: "",
			author_id: -1,
		},
		validateOnChange: true,
		validateOnMount: true,
		validate: (values) => {
			const errors: Partial<typeof values> = {};
			setFirstSubmited(true);

			if (!values.title) {
				errors.title = "Please enter title";
			}
			if (!values.rate) {
				errors.rate = "Please enter rate";
			}
			if (!values.release_date) {
				errors.release_date = "Please enter date";
			}
			if (!values.category) {
				errors.category = "Please enter category";
			}
			if (!values.price) {
				errors.price = "Please enter price";
			}
			if (values.author_id === -1) {
				// errors.author_id = "Please choose an author";
			}
			return errors;
		},
		onSubmit: (values) => {
			isEditModeEnabled ? editBook() : addBook();
		},
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

	function changeRate(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		if (value === "" || (Number(value) && Number(value) <= 10)) {
			// setBookInfo({ ...bookInfo, rate: event.target.value });
			formik.setFieldValue("rate", Number(value).toFixed(1));
		}
	}
	function changeReleaseDate(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		if (value === "" || Object.keys(value).length <= 10) {
			setBookInfo({ ...bookInfo, release_date: event.target.value });
		}
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
			<form onSubmit={formik.handleSubmit}>
				<div className="row">
					<div className="col-md-4">
						<label>Title</label>
						<input
							type="text"
							name="title"
							className="form-control"
							placeholder="Title"
							id="autoSizingInput"
							value={formik.values.title}
							onChange={formik.handleChange}
						/>
						{formik.errors.title || null}
					</div>
					<div className="col-md-4">
						<label>Release date</label>
						<input
							type="date"
							name="releaseDate"
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
							name="rate"
							min={0}
							max={10}
							step={0.1}
							className="form-control"
							id="autoSizingInput"
							placeholder="Rate"
							value={formik.values.rate}
							onChange={changeRate}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<label>Category</label>
						<input
							type="text"
							name="category"
							className="form-control"
							id="autoSizingInput"
							placeholder="Category"
							value={formik.values.category}
							onChange={formik.handleChange}
						/>
					</div>
					<div className="col-md-4">
						<label>Price</label>
						<input
							type="number"
							name="price"
							min="0"
							className="form-control"
							id="autoSizingInput"
							placeholder="Price"
							value={formik.values.price}
							onChange={formik.handleChange}
						/>
					</div>
					<div className="col-md-4">
						<label>Authors</label>
						<select
							defaultValue={-1}
							name="authors"
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
							disabled={!!Object.keys(formik.errors).length}
							text={isEditModeEnabled ? "Update" : "Add"}
							className={isEditModeEnabled ? "primary" : "success"}
							type="submit"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
