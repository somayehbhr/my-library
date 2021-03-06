// Dummy data
import data from "../../../../data/info.json";
// Common components
import { Button } from "../../../../components/Button";
import { SearchIcon } from "../../../../components/Svg/SearchIcon";
// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
// Constants
import { constants } from "../../../../store/Books/book.reducer";
// Types
import { ChangeEvent, FC } from "react";

/**
 * This component due to search in the whole data in table
 * @constructor
 */
export const SearchBooks: FC = () => {
	const [searchItem, setSearchItem] = useState({
		title: "",
		release_date: "",
		rate: "",
		category: "",
		author_id: -1,
	});
	// Hooks
	const dispatch = useDispatch();

	/**
	 * Send action and payload to reducer for search item in the table when the input has data
	 * and also when can see all data when search input is empty
	 * @param e
	 */
	function search(e: any) {
		e.preventDefault();

		const values = Object.values(searchItem);
		const filterSearchValues = values.filter((item: any) => item !== "" && item !== -1);
		const isEmptySearch = !filterSearchValues?.length;
		if (!isEmptySearch) {
			dispatch({
				type: constants.SEARCH,
				payload: searchItem,
			});
		} else {
			dispatch({
				type: constants.CLEAR_SEARCH,
			});
		}
	}

	/**
	 * Set value for title input
	 * @param event
	 */
	function searchTitle(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({ ...searchItem, title: event.target.value });
	}

	/**
	 * Set value for release date input
	 * @param event
	 */
	function searchReleaseDate(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({ ...searchItem, release_date: event.target.value });
	}

	/**
	 * Set value for rate input
	 * @param event
	 */
	function searchRate(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({ ...searchItem, rate: event.target.value });
	}

	/**
	 * Set value for category input
	 * @param event
	 */
	function searchCategory(event: ChangeEvent<HTMLInputElement>) {
		setSearchItem({ ...searchItem, category: event.target.value });
	}

	/**
	 * Set value for author select box
	 * @param event
	 */
	function searchAuthor(event: ChangeEvent<HTMLSelectElement>) {
		setSearchItem({ ...searchItem, author_id: Number(event.target.value) });
	}

	return (
		<div className="container addSection search">
			<form>
				<div className="row">
					<div className="col-12">
						<h2>Search book</h2>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="text"
								className="form-control"
								id="autoSizingInput"
								placeholder="Title"
								value={searchItem?.title}
								onChange={searchTitle}
							/>
						</span>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="text"
								className="form-control"
								id="autoSizingInput"
								placeholder="Release date"
								value={searchItem?.release_date}
								onChange={searchReleaseDate}
							/>
						</span>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="number"
								className="form-control"
								id="autoSizingInput"
								placeholder="Rate"
								value={searchItem?.rate}
								onChange={searchRate}
							/>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<span>
							<input
								type="text"
								className="form-control"
								id="autoSizingInput"
								placeholder="Category"
								value={searchItem?.category}
								onChange={searchCategory}
							/>
						</span>
					</div>

					<div className="col-md-4">
						<select
							defaultValue={-1}
							className="form-select"
							id="autoSizingSelect"
							value={searchItem?.author_id}
							onChange={searchAuthor}
						>
							<option value={-1}>Authors</option>
							{data.authors.map((row) => (
								<option key={row.id} value={row.id}>
									{row.fullName}
								</option>
							))}
						</select>
					</div>
					<div className="col-md-4 col-12">
						<Button
							text={
								<>
									<SearchIcon />
									Search
								</>
							}
							onClick={search}
							className={"success"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
