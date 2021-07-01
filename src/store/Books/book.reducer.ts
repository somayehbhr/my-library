// Redux
import { Reducer } from "redux";
// Dummy data
import data from "../../data/info.json";

export interface BookEntity {
	id: number;
	title: string;
	release_date: string;
	category: string;
	rate: number;
	author_id?: number;
	price: string;
}

export interface BookState {
	list: Array<BookEntity>;
	readOnlyList: Array<BookEntity>;
	currentId: number;
	isEdit: boolean;
}

const initialState: BookState = {
	list: data.books,
	readOnlyList: data.books,
	currentId: 0,
	isEdit: false,
};
export const constants = {
	DELETE: "BOOKS/DELETE",
	ADD: "BOOKS/ADD",
	EDIT: "BOOKS/EDIT",
	SEARCH: "BOOKS/SEARCH",
	CLEAR_SEARCH: "BOOKS/CLEAR_SEARCH",
	IS_EDIT: "BOOKS/ISEDIT",
};
export const bookReducer: Reducer<BookState> = (state = initialState, action) => {
	switch (action.type) {
		case constants.DELETE: {
			const newList = state.readOnlyList.filter((row) => {
				return row.id !== action.payload;
			});
			return { ...state, list: newList, readOnlyList: newList };
		}
		case constants.ADD: {
			const id = Math.floor(Math.random() * 100);
			const newBook = { id, ...action.payload };
			return {
				...state,
				list: [...state.list, newBook],
				readOnlyList: [...state.list, newBook],
			};
		}
		case constants.EDIT: {
			const id = Math.floor(Math.random() * 100);
			const newBook = { id, ...action.payload };
			return {
				...state,
				list: [...state.list, newBook],
				readOnlyList: [...state.list, newBook],
			};
		}
		case constants.IS_EDIT: {
			return {
				...state,
				isEdit: action.payload,
			};
		}
		case constants.SEARCH: {
			const filteredSearchValues = Object.entries(action.payload).filter(
				(item: any) => item[1] !== -1 || item[1] !== "",
			);
			const $filteredBooks = state.readOnlyList.filter((s) => {
				const { title, release_date, rate, category, author_id } = action.payload;
				return (
					s.author_id === author_id ||
					(s.title.includes(title) &&
						s.release_date.includes(release_date) &&
						s.rate.toString().includes(rate) &&
						s.category.includes(category))
				);
			});
			return {
				...state,
				list: $filteredBooks,
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
