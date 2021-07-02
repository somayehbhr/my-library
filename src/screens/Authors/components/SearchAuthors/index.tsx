import * as React from "react";
// Common components
import { Button } from "../../../../components/Button";
import { SearchIcon } from "../../../../components/Svg/SearchIcon";
// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
// Constants
import { constants } from "../../../../store/Authors/author.reducer";
// Types
import { FC } from "react";

/**
 * This component due to search in the whole data in table
 * @constructor
 */
export const SearchAuthors: FC = () => {
	// Hooks
	const dispatch = useDispatch();

	const [searchItem, setSearchItem] = useState("");

	/**
	 * Send action and payload to reducer for search item in the table when the input has data
	 * and also when can see all data when search input is empty
	 * @param e
	 */
	function search(e: any) {
		e.preventDefault();
		if (searchItem.length) {
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

	return (
		<div className="container addSection search">
			<form>
				<div className="row">
					<div className="col-12">
						<h2>Search author</h2>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="text"
								className="form-control"
								id="autoSizingInput"
								value={searchItem}
								onChange={(event) => setSearchItem(event.target.value)}
							/>
						</span>
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
