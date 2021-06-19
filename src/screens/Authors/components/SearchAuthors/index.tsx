import { Button } from "../../../../components/Button";
import * as React from "react";
import { useState } from "react";
import { IAuthorEntity } from "../../index";

interface Props {
	onSetList: (list: IAuthorEntity[]) => void;
	list: IAuthorEntity[];
}
export const SearchAuthors: React.FC<Props> = (props) => {
	const [searchItem, setSearchItem] = useState("");
	function search() {
		let result = props.list.filter((s) => {
			return s.fullName.includes(searchItem);
		});
		props.onSetList(result);
		console.log("result", result);
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
