import { Reducer } from "redux";
import data from "../../data/info.json";

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
	if (action.type === "ADD_AUTHOR") {
		return {
			...state,
			list: state.list.concat(action.payload),
		};
	} else if (action.type === "UPDATE_CURRENT_ID") {
		return {
			...state,
			currentId: action.payload,
		};
	} else if (action.type === "DELETE_AUTHOR"){
		const newList = state.list.filter((row) => {
			return row.id !== action.payload});
		return {...state,list:newList}
	}

	return state;
};
