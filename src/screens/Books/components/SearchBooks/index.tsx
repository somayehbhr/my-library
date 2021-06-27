import data from "../../../../data/info.json";
import { Button } from "../../../../components/Button";
import { ChangeEvent, useState } from "react";
import * as React from "react";
import { IBookEntity } from "../../index";
import { useDispatch } from "react-redux";

interface Props {
	onSetList: (list: IBookEntity[]) => void;
	list: IBookEntity[];
}

export const SearchBooks:React.FC<Props> = (props) =>{
	const [searchItem, setSearchItem] = useState({title: "", release_date: "", rate: "", category: "", author_id: -1})
	const dispatch = useDispatch()
	function search() {
		const values = Object.values((searchItem));
		const filterSearchValues = values.filter((item: any) => item !== "" && item !== -1);
		const isEmptySearch = !filterSearchValues?.length;
		if (!isEmptySearch ) {


			dispatch({
				type: "BOOKS/SEARCH",
				payload: searchItem,
			});
		} else {
			dispatch({
				type: "BOOKS/CLEAR_SEARCH",
			});
		}
	}
	function searchTitle(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({...searchItem, title: event.target.value})
	}
	function searchReleaseDate(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({...searchItem, title: event.target.value})
	}
	function searchRate(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({...searchItem, title: event.target.value})
	}
	function searchCategory(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({...searchItem, title: event.target.value})
	}
	function searchAuthor(event: ChangeEvent<HTMLSelectElement>) {
		setSearchItem({...searchItem, author_id: Number(event.target.value)})
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
							value={searchItem?.title}
							onChange={searchTitle}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Release date</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							placeholder="dd/mm/yyyy"
							value={searchItem?.release_date}
							onChange={searchReleaseDate}
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="inputPassword4">Rate</label>
						<input
							type="number"
							className="form-control"
							id="autoSizingInput"
							placeholder="Rate"
							value={searchItem?.rate}
							onChange={searchRate}
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
							value={searchItem?.category}
							onChange={searchCategory}
						/>
					</div>

					<div className="col-md-4">
						<label htmlFor="inputPassword4">Authors</label>
						<select
							defaultValue={-1}
							className="form-select"
							id="autoSizingSelect"
							value={searchItem?.author_id}
							onChange={searchAuthor}
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
