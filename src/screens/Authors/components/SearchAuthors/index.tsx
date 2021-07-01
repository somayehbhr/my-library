import * as React from "react";
// Common components
import { Button } from "../../../../components/Button";
// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchIcon } from "../../../../components/svg/SearchIcon";

export const SearchAuthors: React.FC = () => {
	const dispatch = useDispatch();
	const [searchItem, setSearchItem] = useState("");

	function search() {
		if (searchItem.length) {
			dispatch({
				type: "AUTHORS/SEARCH",
				payload: searchItem,
			});
		} else {
			dispatch({
				type: "AUTHORS/CLEAR_SEARCH",
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
