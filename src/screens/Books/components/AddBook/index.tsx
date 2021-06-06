import React, { useState, useEffect } from "react";
import Button from "../../../../components/Button";
import data from "../../../../data/info.json";

interface Iprops {
	id: number;
	add: any;
	edit: any;
}
const AddBook = (props: Iprops) => {
	const [title, setTitle] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [rate, setRate] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [author, setAuthor] = useState(-1);

	useEffect(() => {
		setTitle(props.edit?.title);
		setReleaseDate(props.edit?.release_date);
		setRate(props.edit?.rate);
		setCategory(props.edit?.category);
		setPrice(props.edit?.price);
		setAuthor(props.edit?.author_id);
	}, [props.edit]);

	function addBook() {
		props.add({
			id: props.id,
			title: title,
			rate: rate,
			release_date: releaseDate,
			category: category,
			price: price,
			author_id: author,
		});
		setTitle("");
		setReleaseDate("");
		setRate("");
		setCategory("");
		setPrice("");
		setAuthor(-1);
	}

	return (
		<>
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
							// onChange={(event) => selectHandler(event)}
							value={author}
							onChange={(event) => setAuthor(Number(event.target.value))}
						>
							<option value={-1}>Choose</option>
							{data.authors.map((row) => (
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
							onClick={addBook}
							text={props.edit ? "Edit" : "Add"}
							className={props.edit ? "primary" : "success"}
						/>
					</div>
				</div>
			</form>
		</>
	);
};
export default AddBook;
