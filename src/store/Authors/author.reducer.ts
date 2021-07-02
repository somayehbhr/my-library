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
	isEdit: boolean;
}

const initialState: AuthorState = {
	list: data.authors,
	readOnlyList: data.authors,
	currentId: 0,
	isEdit: false,
};
export const constants = {
	DELETE: "AUTHORS/DELETE",
	ADD: "AUTHORS/ADD",
	EDIT: "AUTHORS/EDIT",
	SEARCH: "AUTHORS/SEARCH",
	CLEAR_SEARCH: "AUTHORS/CLEAR_SEARCH",
	IS_EDIT: "AUTHORS/IS_EDIT",
};
// @ts-ignore
export const authorReducer: Reducer<AuthorState> = (state = initialState, action) => {
	switch (action.type) {
		/**
		 * Delete each row by id
		 */
		case constants.DELETE: {
			const newList = state.readOnlyList.filter((row) => {
				return row.id !== action.payload;
			});
			return { ...state, list: newList, readOnlyList: newList };
		}
		/**
		 * Add new data and allocate an unique id to each row
		 */
		case constants.ADD: {
			const id = Math.floor(Math.random() * 100);
			const newAuthor = { id, ...action.payload };
			return {
				...state,
				list: [...state.list, newAuthor],
				readOnlyList: [...state.list, newAuthor],
			};
		}
		/**
		 * Edit each row
		 */
		case constants.EDIT: {
			let $authors = [...state.list].map((author) => {
				if (author.id === action.payload.id) {
					author.fullName = action.payload.data;
				}
				return author;
			});
			return { ...state, list: $authors };
		}
		/**
		 * Search an item in table
		 */
		case constants.SEARCH: {
			const $filteredAuthors = state.readOnlyList.filter((item) => {
				return item.fullName.toLowerCase().includes(action.payload);
			});
			return {
				...state,
				list: $filteredAuthors,
			};
		}
		/**
		 * Render the main store when we fill search input by nothing
		 */
		case constants.CLEAR_SEARCH: {
			return {
				...state,
				list: state.readOnlyList,
			};
		}
		/**
		 * To change add button when edit button in row has been clicked
		 */
		case constants.IS_EDIT: {
			return {
				...state,
				isEdit: action.payload,
			};
		}
		default:
			return state;
	}
	return state;
};
