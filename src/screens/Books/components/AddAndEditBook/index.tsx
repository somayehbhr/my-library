// Hooks
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
// Common components
import { Button } from "../../../../components/Button";
import { AddIcon } from "../../../../components/Svg/AddIcon";
import { EditIcon } from "../../../../components/Svg/EditIcon";
// Constants
import { constants } from "../../../../store/Books/book.reducer";

interface IDetailEntity {
	selectedRow: any;
	bookInfo: any;
}

/**
 * This component due to handling add and delete action
 * @param props
 * @constructor
 */
export const AddAndEditBook = (props: IDetailEntity) => {
	// Hooks
	const dispatch = useDispatch();
	// Store connector
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
	/**
	 * Validating form by formik
	 */
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
		onSubmit: () => {
			editMode ? editBook() : addBook();
		},
	});

	/**
	 *  Send action and payload to the reducer to add something on table
	 * @param add
	 */
	function handleAddBook(add: any) {
		dispatch({
			type: constants.ADD,
			payload: add,
		});
	}

	/**
	 * Set edit mode false it means that update button change into add again
	 */
	function addMode() {
		dispatch({
			type: constants.IS_EDIT,
			payload: false,
		});
	}
	/**
	 * Add new data and clear the state
	 */
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

	/**
	 * Send action and payload to the reducer to edit something on table
	 * @param editedBook
	 */
	function handleEditBook(editedBook: any) {
		dispatch({
			type: constants.EDIT,
			payload: {
				id: props.selectedRow.id,
				title: editedBook.title,
				rate: editedBook.rate,
				price: editedBook.price,
				release_date: editedBook.release_date,
				category: editedBook.category,
				author_id: editedBook.author_id,
			},
		});
	}
	/**
	 * Clear state
	 */
	function clearBookInfo() {
		formik.setFieldValue("title", "");
		formik.setFieldValue("rate", "");
		formik.setFieldValue("release_date", "");
		formik.setFieldValue("category", "");
		formik.setFieldValue("price", "");
		formik.setFieldValue("author_id", -1);
	}

	/**
	 * Edit data and clear the state
	 */
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

	/**
	 * Set value for title input
	 * @param event
	 */
	function changeTitle(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("title", event.target.value);
	}

	/**
	 * Set value for category input
	 * @param event
	 */
	function changeCategory(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("category", event.target.value);
	}

	/**
	 * Set value for rate input
	 * @param event
	 */
	function changeRate(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		if (value === "" || (Number(value) && Number(value) <= 10)) {
			formik.setFieldValue("rate", Number(value).toFixed(1));
		}
	}

	/**
	 * Set value for release date input
	 * @param event
	 */
	function changeReleaseDate(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		if (value === "" || Object.keys(value).length <= 10) {
			formik.setFieldValue("release_date", event.target.value);
		}
	}

	/**
	 * Set value for price input
	 * @param event
	 */
	function changePrice(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("price", event.target.value);
	}

	/**
	 * Set value for author select box
	 * @param event
	 */
	function changeAuthor(event: ChangeEvent<HTMLSelectElement>) {
		formik.setFieldValue("author_id", event.target.value);
	}
	/**
	 * Use to set state edit button in the table is clicked
	 */
	useEffect(() => {
		if (props.bookInfo) {
			setBookInfo(props.bookInfo);
			formik.setValues({ ...props.bookInfo });
		}
	}, [props.bookInfo]);

	return (
		<div className="container addSection">
			<form onSubmit={formik.handleSubmit} noValidate>
				<div className="row">
					<div className="col-12">
						<h2>Add book</h2>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="text"
								name="title"
								className="form-control"
								placeholder="Title"
								id="autoSizingInput"
								value={formik.values?.title}
								onChange={changeTitle}
							/>
						</span>
						<p className="error">{formik.errors.title || null}</p>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="date"
								name="releaseDate"
								className="form-control"
								id="autoSizingInput"
								placeholder="Release Date"
								value={formik.values?.release_date}
								onChange={changeReleaseDate}
							/>
						</span>
						<p className="error">{formik.errors.release_date || null}</p>
					</div>
					<div className="col-md-4">
						<span>
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
						</span>
						<p className="error">{formik.errors.rate || null}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<span>
							<input
								type="text"
								name="category"
								className="form-control"
								id="autoSizingInput"
								placeholder="Category"
								value={formik.values?.category}
								onChange={changeCategory}
							/>
						</span>
						<p className="error">{formik.errors.category || null}</p>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="number"
								name="price"
								min="0"
								className="form-control"
								id="autoSizingInput"
								placeholder="Price($)"
								value={formik.values?.price}
								onChange={changePrice}
							/>
						</span>
						<p className="error">{formik.errors.price || null}</p>
					</div>
					<div className="col-md-4">
						<select
							defaultValue={-1}
							name="authors"
							className="form-select"
							id="autoSizingSelect"
							value={formik.values?.author_id}
							onChange={changeAuthor}
						>
							<option value={-1}>Authors</option>
							{authors.map((row: any) => (
								<option key={row.id} value={row.id}>
									{row.fullName}
								</option>
							))}
						</select>
						<p className="error">{formik.errors.author_id || null}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-md-4 col-12">
						<Button
							disabled={!!Object.keys(formik.errors).length}
							className={editMode ? "primary" : "success"}
							type="submit"
							text={
								editMode ? (
									<>
										<EditIcon />
										Update
									</>
								) : (
									<>
										<AddIcon />
										Add
									</>
								)
							}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
