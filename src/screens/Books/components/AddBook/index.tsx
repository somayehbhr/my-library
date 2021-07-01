// Hooks
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
// Common components
import { Button } from "../../../../components/Button";
import { constants } from "../../../../store/Books/book.reducer";
import { StateNetwork } from "../../../../types/store.type";
import { IBookEntity } from "../../index";

interface IDetailEntity {
	selectedRow: any;
	bookInfo: any;
}

export const AddBook = (props: IDetailEntity) => {
	const dispatch = useDispatch();
	const editMode = useSelector((state: any) => state.books.isEdit);
	const authors = useSelector((state: any) => state.authors.list);
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
			const errors: Record<string, any> = {};

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
				errors.author_id = "Please choose an author";
			}
			return errors;
		},
		onSubmit: (values) => {
			editMode ? editBook() : addBook();
		},
	});
	function handleAddBook(add: any) {
		dispatch({
			type: constants.ADD,
			payload: add,
		});
	}
	function addMode() {
		dispatch({
			type: constants.IS_EDIT,
			payload: false,
		});
	}
	function addBook() {
		handleAddBook({
			title: formik.values.title,
			rate: formik.values.rate,
			release_date: formik.values.release_date,
			category: formik.values.category,
			price: formik.values.price,
			author_id: Number(formik.values.author_id),
		});
		clearBookInfo();
	}

	function handleEditBook(editedBook: any) {
		dispatch({
			type: constants.EDIT,
			payload: {
				id: props.selectedRow.id,
				title: editedBook.title,
				rate: editedBook.rate,
				release_date: editedBook.release_date,
				category: editedBook.category,
				author_id: editedBook.author_id,
			},
		});
	}

	function clearBookInfo() {
		formik.setFieldValue("title", "");
		formik.setFieldValue("rate", "");
		formik.setFieldValue("release_date", "");
		formik.setFieldValue("category", "");
		formik.setFieldValue("price", "");
		formik.setFieldValue("author_id", -1);
	}
	function editBook() {
		handleEditBook({
			title: formik.values.title,
			rate: formik.values.rate,
			release_date: formik.values.release_date,
			category: formik.values.category,
			price: formik.values.price,
			author_id: Number(formik.values.author_id),
		});
		addMode();
		clearBookInfo();
	}
	function changeTitle(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("title", event.target.value);
	}
	function changeCategory(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("category", event.target.value);
	}
	function changeRate(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		if (value === "" || (Number(value) && Number(value) <= 10)) {
			formik.setFieldValue("rate", Number(value).toFixed(1));
		}
	}
	function changeReleaseDate(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		if (value === "" || Object.keys(value).length <= 10) {
			formik.setFieldValue("release_date", event.target.value);
		}
	}
	function changePrice(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("price", event.target.value);
	}
	function changeAuthor(event: ChangeEvent<HTMLSelectElement>) {
		formik.setFieldValue("author_id", event.target.value);
	}
	useEffect(() => {
		if (props.bookInfo) {
			setBookInfo(props.bookInfo);
			console.log("bookInfo", props.bookInfo);
			const value = props.bookInfo?.release_date?.split("/").reverse() ?? [];
			const [year, month, day] = value;
			const date = `${year}-${month?.length === 2 ? month : `0${month}`}-${
				day?.length === 2 ? day : `0${day}`
			}`;
			formik.setValues({ ...props.bookInfo, release_date: date });
		}
	}, [props.bookInfo]);

	return (
		<div className="container addSection bg-light">
			<form onSubmit={formik.handleSubmit} noValidate>
				<div className="row">
					<div className="col-md-4">
						<label>Title</label>
						<input
							type="text"
							name="title"
							className="form-control"
							placeholder="Title"
							id="autoSizingInput"
							value={formik.values?.title}
							onChange={changeTitle}
						/>
						<p className="error">{formik.errors.title || null}</p>
					</div>
					<div className="col-md-4">
						<label>Release date</label>
						<input
							type="date"
							name="releaseDate"
							className="form-control"
							id="autoSizingInput"
							placeholder="mm/dd/yyyy"
							value={formik.values?.release_date}
							onChange={changeReleaseDate}
						/>
						<p className="error">{formik.errors.release_date || null}</p>
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
							value={formik.values?.rate}
							onChange={changeRate}
						/>
						<p className="error">{formik.errors.rate || null}</p>
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
							value={formik.values?.category}
							onChange={changeCategory}
						/>
						<p className="error">{formik.errors.category || null}</p>
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
							value={formik.values?.price}
							onChange={changePrice}
						/>
						<p className="error">{formik.errors.price || null}</p>
					</div>
					<div className="col-md-4">
						<label>Authors</label>
						<select
							defaultValue={-1}
							name="authors"
							className="form-select"
							id="autoSizingSelect"
							value={formik.values?.author_id}
							onChange={changeAuthor}
						>
							<option value={-1}>Choose</option>
							{authors.map((row: any) => (
								<option key={row.id} value={row.id}>
									{row.fullName}
								</option>
							))}
						</select>
						<p className="error">{formik.errors.author_id || null}</p>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<Button
							disabled={!!Object.keys(formik.errors).length}
							text={editMode ? "Update" : "Add"}
							className={editMode ? "primary" : "success"}
							type="submit"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
