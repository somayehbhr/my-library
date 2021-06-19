import data from "../../../../data/info.json";
import { Button } from "../../../../components/Button";
import { useState } from "react";
import * as React from "react";
import { IBookEntity } from "../../index";

interface Props {
	onSetList: (list: IBookEntity[]) => void;
	list: IBookEntity[];
}

export const SearchBooks:React.FC<Props> = (props) =>{
	const [titleSearch, setTitleSearch] = useState("");
	const [releaseDateSearch, setReleaseDateSearch] = useState("");
	const [rateSearch, setRateSearch] = useState("");
	const [categorySearch, setCategorySearch] = useState("");
	const [authorSearch, setAuthorSearch] = useState(-1);
	function search() {
		let result = props.list.filter((s) => {
			return (s.title.includes(titleSearch) && s.release_date.includes(releaseDateSearch) && s.rate.toString().includes(rateSearch) && s.category.includes(categorySearch) || (authorSearch && s.author_id === authorSearch) )
		});
		props.onSetList(result);
	}
	return(
		<div className="container addSection bg-light">
			<form>
				<div className="row">
					<div className="col-md-4">
						<label htmlFor="inputEmail4">Title</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="Title"
							value={titleSearch}
							onChange={(event) => setTitleSearch(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Release date</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="dd/mm/yyyy"
							value={releaseDateSearch}
							onChange={(event) => setReleaseDateSearch(event.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Rate</label>
						<input
							type="number"
							className="form-control"
							id="autoSizingInput"
							placeholder="Rate"
							value={rateSearch}
							onChange={(event) => setRateSearch(event.target.value)}
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
							value={categorySearch}
							onChange={(event) => setCategorySearch(event.target.value)}
						/>
					</div>

					<div className="col-md-4">
						<label htmlFor="inputPassword4">Authors</label>
						<select
							defaultValue={-1}
							className="form-select"
							id="autoSizingSelect"
							value={authorSearch}
							onChange={(event) => setAuthorSearch(Number(event.target.value))}
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
						<Button text={"Search"} onClick={search} className={"success"} />
					</div>
				</div>
			</form>
		</div>
	)
}
