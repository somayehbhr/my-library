import data from "../../data/info.json";
import React from "react";
import { DeleteBooks } from "../DeleteBooks";

interface IBooksRow {
	id: number;
	topic: string;
	release_date: string;
	rate: number;
	author: string;
	price: string;
}

export const Books = () => {
	const [list, setList] = React.useState<typeof data>(data);
	function handleDeletePerson(id: number) {
		const newList = list.filter((row) => row.id !== id);
		setList(newList);
	}
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">topic</th>
						<th scope="col">release_date</th>
						<th scope="col">rate</th>
						<th scope="col">author</th>
						<th scope="col">price</th>
						<th scope="col">action</th>
					</tr>
				</thead>
				<tbody>
					{list.map(
						(row: IBooksRow, index: number): React.ReactNode => (
							<tr key={row.id}>
								<td>{index + 1}</td>
								<td>{row.topic}</td>
								<td>{row.release_date}</td>
								<td>{row.rate}</td>
								<td>{row.author}</td>
								<td>{row.price}</td>
								<td>
									<td>
										<DeleteBooks
											onClick={() => handleDeletePerson(row.id)}
											text="Delete"
										/>
									</td>
								</td>
							</tr>
						),
					)}
				</tbody>
			</table>
		</div>
	);
};
