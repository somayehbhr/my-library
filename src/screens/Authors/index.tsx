import Header from "../../components/Header";
import React from "react";
import data from "../../data/info.json";
import Button from "../../components/Button";

interface IAuthorEntity {
	id: number;
	fullName: string;
}

const headerList = ["fullName", "number Of Books", "action"];
const books = data.books;
const Authors = () => {
	const [list, setList] = React.useState<Array<IAuthorEntity>>(data.authors);
	function handleDeleteAuthor(id: number) {
		return function () {
			const newList = list.filter((row) => row.id !== id);
			setList(newList);
		};
	}
	function calculateNumOfBooks(id: number) {
		return books.filter((item) => item.author_id === id).length;
	}
	return (
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
	);
};
export default Authors;
