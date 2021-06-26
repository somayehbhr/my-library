import { Reducer } from "redux";
import data from "../../data/info.json";
import { IAuthorEntity } from "../../screens/Authors";

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

export const authorReducer: Reducer<AuthorState> = (state = initialState, action) => {
	if (action.type === "DELETE_AUTHOR") {
		const newList = state.readOnlyList.filter((row) => {
			return row.id !== action.payload;
		});
		return { ...state, list: newList, readOnlyList: newList };
	} else if (action.type === "ADD_AUTHOR") {
		const id = Math.floor(Math.random() * 100);
		const newAuthor = { id, ...action.payload };
		return {
			...state,
			list: [...state.list, newAuthor],
			readOnlyList: [...state.list, newAuthor]
		};
	} else if (action.type === "EDIT_AUTHOR") {
		let $authors = [...state.list].map(author => {
			if(author.id === action.payload.id) {
				author.fullName = action.payload.data;
			}

			return author;
		})

		return { ...state, list: $authors };
	}else if(action.type === "AUTHORS/SEARCH") {
		const $filteredAuthors = state.readOnlyList.filter((s) => {
			return s.fullName.toLowerCase().includes(action.payload);
		})
		return {
			...state,
			list: $filteredAuthors
		}
	}else if(action.type === "AUTHORS/CLEAR_SEARCH") {
		console.log("state.readOnlyList", state.readOnlyList)
		return {
			...state,
			list: state.readOnlyList
		}
	}

	return state;
};
