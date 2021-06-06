import React, { useState } from "react";
import Button from "../../../../components/Button";
import data from "../../../../data/info.json";
import { IAuthorEntity } from "../../../Authors";

interface Iprops {
	id: number;
	add: any;
}
const AddBook = (props: Iprops) => {
	const [title, setTitle] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [rate, setRate] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [author, setAuthor] = useState("");
	const [selectAuthor, setSelectAuthor] = React.useState<Array<IAuthorEntity>>(data.authors);

	function addBook() {
		props.add({
			id: props.id,
			title: title,
			rate: rate,
			category: category,
			price: price,
			author: author,
		});
		setTitle("");
		setReleaseDate("");
		setRate("");
		setCategory("");
		setPrice("");
		setAuthor("");
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
							placeholder="Release date"
							value={releaseDate}
							onChange={(event) => setReleaseDate(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Rate</label>
						<input
							type="text"
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
							className="form-select"
							id="autoSizingSelect"
							onChange={(event) => setAuthor(event.target.value)}
						>
							{selectAuthor.map((row) => (
								<option value={row.id}>{row.fullName}</option>
							))}
							<option selected>Choose</option>
						</select>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<Button onClick={addBook} text="Add" className="primary" />
					</div>
				</div>
			</form>
		</>
	);
};
export default AddBook;
