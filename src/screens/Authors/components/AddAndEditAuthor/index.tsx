// Hooks
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
// Common components
import { Button } from "../../../../components/Button";
import { EditIcon } from "../../../../components/Svg/EditIcon";
import { AddIcon } from "../../../../components/Svg/AddIcon";
// Constants
import { constants } from "../../../../store/Authors/author.reducer";

interface IDetailEntity {
	selectedRow: any;
	authorInfo: any;
}

/**
 * This component due to handling add and delete action
 * @param props
 * @constructor
 */
export const AddAndEditAuthor = (props: IDetailEntity) => {
	// Hooks
	const dispatch = useDispatch();
	// Store connector
	const editMode = useSelector((state: any) => state.authors.isEdit);
	const [fullName, setFullName] = useState("");
	/**
	 * Validating form by formik
	 */
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
		onSubmit: () => {
			editMode ? editAuthor() : addAuthor();
		},
	});

	/**
	 * Send action and payload to the reducer to add something on table
	 * @param add
	 */
	function handleAddAuthor(add: any) {
		dispatch({
			type: constants.ADD,
			payload: add,
		});
	}

	/**
	 * Set edit mode false it means that update button change into add again
	 */
	function addMode() {
		dispatch({
			type: constants.IS_EDIT,
			payload: false,
		});
	}

	/**
	 * Add new data and clear the state
	 */
	function addAuthor() {
		handleAddAuthor({ fullName: formik.values.fullName });
		clearAuthorInfo();
	}

	/**
	 * Clear state
	 */
	function clearAuthorInfo() {
		formik.setFieldValue("fullName", "");
	}

	/**
	 * Use to set state edit button in the table is clicked
	 */
	useEffect(() => {
		if (props.authorInfo) {
			setFullName(props.authorInfo);
			formik.setValues({ ...props.authorInfo });
		}
	}, [props.authorInfo]);

	/**
	 * Send action and payload to the reducer to edit something on table
	 * @param editedAuthor
	 */
	function handleEditAuthor(editedAuthor: any) {
		dispatch({
			type: constants.EDIT,
			payload: {
				id: props.selectedRow.id,
				data: editedAuthor.fullName,
			},
		});
	}

	/**
	 * Edit data and clear the state
	 */
	function editAuthor() {
		handleEditAuthor({ fullName: formik.values.fullName });
		addMode();
		clearAuthorInfo();
	}

	/**
	 * Set value for full name input
	 * @param event
	 */
	function changeFullName(event: ChangeEvent<HTMLInputElement>) {
		formik.setFieldValue("fullName", event.target.value);
	}
	return (
		<div className="container addSection">
			<form onSubmit={formik.handleSubmit} noValidate>
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
								onChange={changeFullName}
							/>
						</span>
						<p className="error">{formik.errors.fullName || null}</p>
					</div>

					<div className="col-md-4 col-12">
						<Button
							disabled={!!Object.keys(formik.errors).length}
							className={editMode ? "primary" : "success"}
							type="submit"
							text={
								editMode ? (
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
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
