import { Reducer } from "redux";
import data from "../../data/info.json";

export interface AuthorEntity {
	id: number;
	fullName: string;
}
export interface AuthorState {
	list: Array<AuthorEntity>;
	readOnlyList: Array<AuthorEntity>;
	currentId: number;
}

const initialState: AuthorState = {
	list: data.authors,
	readOnlyList: data.authors,
	currentId: 0,
};
export const constants = {
	DELETE: "AUTHORS/DELETE",
	ADD: "AUTHORS/ADD",
	EDIT: "AUTHORS/EDIT",
	SEARCH: "AUTHORS/SEARCH",
	CLEAR_SEARCH: "AUTHORS/CLEAR_SEARCH",
};
export const authorReducer: Reducer<AuthorState> = (state = initialState, action) => {
	switch (action.type) {
		case constants.DELETE: {
			const newList = state.readOnlyList.filter((row) => {
				return row.id !== action.payload;
			});
			return { ...state, list: newList, readOnlyList: newList };
		}
		case constants.ADD: {
			const id = Math.floor(Math.random() * 100);
			const newAuthor = { id, ...action.payload };
			return {
				...state,
				list: [...state.list, newAuthor],
				readOnlyList: [...state.list, newAuthor],
			};
		}
		case constants.EDIT: {
			let $authors = [...state.list].map((author) => {
				if (author.id === action.payload.id) {
					author.fullName = action.payload.data;
				}

				return author;
			});

			return { ...state, list: $authors };
		}
		case constants.SEARCH: {
			const $filteredAuthors = state.readOnlyList.filter((s) => {
				return s.fullName.toLowerCase().includes(action.payload);
			});
			return {
				...state,
				list: $filteredAuthors,
			};
		}
		case constants.CLEAR_SEARCH: {
			return {
				...state,
				list: state.readOnlyList,
			};
		}
		default:
			return state;
	}
};
