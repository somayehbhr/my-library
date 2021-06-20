import { Reducer } from "redux";
import data from "../../data/info.json";
import { IAuthorEntity } from "../../screens/Authors";

export interface AuthorEntity {
	id: number;
	fullName: string;
}
export interface AuthorState {
	list: Array<AuthorEntity>;
	currentId: number;
}

const initialState: AuthorState = {
	list: data.authors,
	currentId: 0,
};

export const authorReducer: Reducer<AuthorState> = (state = initialState, action) => {
	if (action.type === "DELETE_AUTHOR") {
		const newList = state.list.filter((row) => {
			return row.id !== action.payload;
		});
		return { ...state, list: newList };
	} else if (action.type === "ADD_AUTHOR") {
		const id = Math.floor(Math.random() * 100);
		const newAuthor = { id, ...action.payload };
		return {
			...state,
			list: [...state.list, newAuthor],
		};
	} else if (action.type === "EDIT_AUTHOR") {
		let tempBooks = [...state.list];
		let index = tempBooks.indexOf(action.payload.selectedRow);
		tempBooks[index] = { ...tempBooks[index], fullName: action.payload.editedBook };
		// setSelectedRow({} as IAuthorEntity);
		return { ...state, list: tempBooks };
	}

	return state;
};
