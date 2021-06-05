import data from "../../data/info.json";
import React from "react";
import Book from "./components/Book";
import Header from "../../components/Header";

export interface IBookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id: number;
	price: string;
}

const headerList = ["title", "release_date", "rate", "author", "category", "price", "action"];
const Books = () => {
	const [list, setList] = React.useState<Array<IBookEntity>>(data.books);
	function handleDeleteBook(id: number) {
		return function () {
			const newList = list.filter((row) => row.id !== id);
			setList(newList);
		};
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
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Release date</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Release date"
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Rate</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Rate"
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
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Price</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Price"
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Authors</label>
						<select className="form-select" id="autoSizingSelect">
							<option selected>Choose</option>
							<option value="1">Marleah Coundley</option>
							<option value="2">Boonie Browne</option>
							<option value="3">Alyssa Mcimmie</option>
							<option value="4">Storm Mityushin</option>
							<option value="5">Maressa Tamas</option>
						</select>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<button type="button" className="btn btn-primary">
							Add
						</button>
					</div>
				</div>
			</form>
			<br />
			<table className="table">
				<Header list={headerList} />
				<tbody>
					{list.map(
						(row: IBookEntity, index: number): React.ReactNode => (
							<Book
								key={row.id}
								{...row}
								{...{ index }}
								delete={handleDeleteBook(row.id)}
							/>
						),
					)}
				</tbody>
			</table>
		</>
	);
};
export default Books;
