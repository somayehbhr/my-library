// Hooks
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
// Common components
import { Button } from "../../../../components/Button";
import { constants } from "../../../../store/Authors/author.reducer";

interface IDetailEntity {
	selectedRow: any;
	authorInfo: any;
}
export const AddAuthor = (props: IDetailEntity) => {
	const [fullName, setFullName] = useState("");
	const isEditModeEnabled = props.authorInfo?.hasOwnProperty("fullName");
	const dispatch = useDispatch();
	const [firstSubmited, setFirstSubmited] = useState(false);
	const formik = useFormik({
		initialValues: {
			fullName: "",
		},
		validateOnChange: true,
		validateOnMount: true,
		validate: (values) => {
			const errors: Partial<typeof values> = {};
			setFirstSubmited(true);

			if (!values.fullName) {
				errors.fullName = "Please enter full name";
			}
			return errors;
		},
		onSubmit: (values) => {
			isEditModeEnabled ? editAuthor() : addAuthor();
		},
	});

	function handleAddAuthor(add: any) {
		dispatch({
			type: constants.ADD,
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
			type: constants.EDIT,
			payload: {
				id: props.selectedRow.id,
				data: editedBook.fullName,
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
							value={formik.values.fullName}
							onChange={formik.handleChange}
						/>
						{formik.errors.fullName || null}
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-3">
						<Button
							disabled={!!Object.keys(formik.errors).length}
							text={isEditModeEnabled ? "Update" : "Add"}
							className={isEditModeEnabled ? "primary" : "success"}
							type="submit"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
