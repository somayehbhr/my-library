import { Reducer } from "redux";

export interface AuthorEntity {
	id: number;
	fullName: string;
}
export interface AuthorState {
	list: Array<AuthorEntity>;
	currentId: number;
}

const initialState: AuthorState = {
	list: [{ id: 0, fullName: "Ali" }],
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
	}

	return state;
};
