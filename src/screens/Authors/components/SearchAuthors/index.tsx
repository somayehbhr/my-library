import * as React from "react";
// Common components
import { Button } from "../../../../components/Button";
// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { constants } from "../../../../store/Authors/author.reducer";

export const SearchAuthors: React.FC = () => {
	const dispatch = useDispatch();
	const [searchItem, setSearchItem] = useState("");

	function search() {
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
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<Button text={"Search"} onClick={search} className={"success"} />
					</div>
				</div>
			</form>
		</div>
	);
};
