// Hooks
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
// Common components
import { Button } from "../../../../components/Button";
import { constants } from "../../../../store/Authors/author.reducer";
import { EditIcon } from "../../../../components/Svg/EditIcon";
import { AddIcon } from "../../../../components/Svg/AddIcon";

interface IDetailEntity {
	selectedRow: any;
	authorInfo: any;
}

export const AddAuthor = (props: IDetailEntity) => {
	const dispatch = useDispatch();
	const editMode = useSelector((state: any) => state.authors.isEdit);
	const [fullName, setFullName] = useState("");
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
			editMode ? editAuthor() : addAuthor();
			console.log(editMode);
		},
	});

	function handleAddAuthor(add: any) {
		dispatch({
			type: constants.ADD,
			payload: add,
		});
	}
	function addMode() {
		dispatch({
			type: constants.IS_EDIT,
			payload: false,
		});
	}
	function addAuthor() {
		handleAddAuthor({ fullName: formik.values.fullName });
		clearAuthorInfo();
	}
	function clearAuthorInfo() {
		formik.setFieldValue("fullName", "");
	}
	useEffect(() => {
		if (props.authorInfo) {
			setFullName(props.authorInfo);
			formik.setValues({ ...props.authorInfo });
		}
	}, [props.authorInfo]);

	function handleEditAuthor(editedAuthor: any) {
		dispatch({
			type: constants.EDIT,
			payload: {
				id: props.selectedRow.id,
				data: editedAuthor.fullName,
			},
		});
	}

	function editAuthor() {
		handleEditAuthor({ fullName: formik.values.fullName });
		console.log(formik.values.fullName);
		addMode();
		clearAuthorInfo();
	}
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
