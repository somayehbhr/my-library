// Hooks
import { useState, useEffect } from "react";
// Common components
import { Button } from "../../../../components/Button";
// Json
import data from "../../../../data/info.json";
import { useDispatch } from "react-redux";

interface IDetailEntity {
	// id: number;
	selectedRow: any;
	authorInfo: any;
}
export const AddAuthor = (props: IDetailEntity) => {
	const [fullName, setFullName] = useState("");
	const isEditModeEnabled = props.authorInfo?.hasOwnProperty("fullName");
	const dispatch = useDispatch();

	function handleAddAuthor(add: any) {
		dispatch({
			type: "ADD_AUTHOR",
			payload: add,
		});
	}
	function addAuthor() {
		handleAddAuthor({ fullName });
		setFullName("");
	}
	useEffect(() => {
		setFullName(props.authorInfo?.fullName);
	}, [props.authorInfo]);

	function handleEditAuthor(editedBook: any) {
		dispatch({
			type: "EDIT_AUTHOR",
			payload: {
				selectedRow: props.selectedRow,
				editedBook,
			},
		});
	}
	function editAuthor() {
		handleEditAuthor({ fullName });
		setFullName("");
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
							text={isEditModeEnabled ? "Edit" : "Add"}
							onClick={isEditModeEnabled ? editAuthor : addAuthor}
							className={isEditModeEnabled ? "primary" : "success"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
