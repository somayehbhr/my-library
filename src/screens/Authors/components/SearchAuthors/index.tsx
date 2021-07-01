import * as React from "react";
// Common components
import { Button } from "../../../../components/Button";
// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

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
		<div className="container addSection bg-light">
			<form>
				<div className="row">
					<div className="col-md-4">
						<label htmlFor="inputEmail4">Full name</label>
						<input
							type="text"
							className="form-control"
							id="autoSizingInput"
							value={searchItem}
							onChange={(event) => setSearchItem(event.target.value)}
						/>
					</div>
					<div className="col-md-3 authorButton">
						<Button text={"Search"} onClick={search} className={"success"} />
					</div>
				</div>
			</form>
		</div>
	);
};
