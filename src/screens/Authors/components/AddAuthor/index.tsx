// Hooks
import { useState, useEffect } from "react";
// Common components
import { Button } from "../../../../components/Button";
// Json
import data from "../../../../data/info.json";

interface IDetailEntity {
	// id: number;
	onAddClick: any;
	// onEditClick: any;
	// bookInfo: any;
}
export const AddAuthor = (props: IDetailEntity) => {
	const [fullName, setFullName] = useState("");
	function addAuthor() {
		props.onAddClick({ fullName: fullName });
	}
	return (
		<form>
			<div className="row">
				<div className="col-md-4">
					<label htmlFor="inputEmail4">Full name</label>
					<input
						type="text"
						className="form-control"
						id="autoSizingInput"
						placeholder="Full name"
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-3">
					<Button onClick={addAuthor} text="Add" className="success" />
				</div>
			</div>
		</form>
	);
};
