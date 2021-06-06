import Header from "../../components/Header";
import React from "react";
import data from "../../data/info.json";
import Button from "../../components/Button";
import { IBookEntity } from "../Books";

export interface IAuthorEntity {
	id: number;
	fullName: string;
}

const headerList = ["fullName", "number Of Books", "action"];
const books = data.books;
const Authors = () => {
	const [list, setList] = React.useState<Array<IAuthorEntity>>(data.authors);
	React.useEffect(() => {
		const localList = getLocalList();
		if (Array.isArray(localList) && localList.length) {
			setList(localList);
		} else {
			setList(data.authors);
		}
	}, []);

	React.useEffect(() => {
		setLocalList(list);
	}, [list]);

	function setLocalList(list: IAuthorEntity[]) {
		window.localStorage.setItem("authors", JSON.stringify(list));
	}

	function getLocalList() {
		try {
			return JSON.parse(window.localStorage.getItem("authors") as string);
		} catch (e) {
			return [];
		}
	}

	function calculateNumOfBooks(id: number) {
		return books.filter((item) => item.author_id === id).length;
	}
	function handleDeleteAuthor(id: number) {
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
						<label htmlFor="inputEmail4">Full name</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Full name"
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Number Of Books</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Number Of Books"
						/>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<button type="button" className="btn btn-success">
							Add
						</button>
					</div>
				</div>
			</form>
			<br />
			<table className="table">
				<Header list={headerList} />
				<tbody>
					{list.map((row, index) => (
						<tr key={index}>
							<td scope="col">{index + 1}</td>
							<td scope="col">{row.fullName}</td>
							<td scope="col">{calculateNumOfBooks(row.id)}</td>
							<td>
								<Button onClick={handleDeleteAuthor(row.id)} text="Delete" danger />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
export default Authors;
