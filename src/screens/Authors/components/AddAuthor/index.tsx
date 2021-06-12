// Hooks
import { useState, useEffect } from "react";
// Common components
import { Button } from "../../../../components/Button";
// Json
import data from "../../../../data/info.json";

interface IDetailEntity {
	// id: number;
	onAddClick: any;
	onEditClick: any;
	authorInfo: any;
}
export const AddAuthor = (props: IDetailEntity) => {
	const [fullName, setFullName] = useState("");
	function addAuthor() {
		props.onAddClick({ fullName: fullName });
		setFullName("");
	}
	useEffect(() => {
		setFullName(props.authorInfo?.fullName);
	}, [props.authorInfo]);
	function editAuthor() {
		props.onEditClick({ fullName: fullName });
		setFullName("");
	}
	return (
		<div className="container">
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
				<br />
				<div className="row">
					<div className="col-md-3">
						<Button
							onClick={props.authorInfo ? editAuthor : addAuthor}
							text={props.authorInfo ? "Edit" : "Add"}
							className={props.authorInfo ? "primary" : "success"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
