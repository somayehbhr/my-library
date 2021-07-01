// Hooks
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
// Common components
import { Button } from "../../../../components/Button";
import { AddIcon } from "../../../../components/svg/AddIcon";
import { EditIcon } from "../../../../components/svg/EditIcon";

interface IDetailEntity {
	selectedRow: any;
	authorInfo: any;
}

export const AddAuthor = (props: IDetailEntity) => {
	const [fullName, setFullName] = useState("");
	const isEditModeEnabled = props.authorInfo?.hasOwnProperty("fullName");
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			fullName: "",
		},
		validateOnChange: true,
		validateOnMount: true,
		validate: (values) => {
			const errors: Record<string, any> = {};

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
			type: "AUTHORS/ADD",
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
			type: "AUTHORS/EDIT",
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
		<div className="container addSection">
			<form>
				<div className="row">
					<div className="col-12">
						<h2>Add author</h2>
					</div>
					<div className="col-md-4">
						<span>
							<input
								type="text"
								name="fullName"
								className="form-control"
								id="autoSizingInput"
								placeholder="Full name"
								value={formik.values.fullName}
								onChange={formik.handleChange}
							/>
						</span>
						<p className="error">{formik.errors.fullName || null}</p>
					</div>

					<div className="col-md-4 col-12">
						<Button
							disabled={!!Object.keys(formik.errors).length}
							text={
								isEditModeEnabled ? (
									<>
										<EditIcon />
										Update
									</>
								) : (
									<>
										<AddIcon />
										Add
									</>
								)
							}
							className={isEditModeEnabled ? "primary" : "success"}
							type="submit"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
