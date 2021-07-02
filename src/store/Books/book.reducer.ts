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
	IS_EDIT: "BOOKS/IS_EDIT",
};
export const bookReducer: Reducer<BookState> = (state = initialState, action) => {
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
			const newBook = { id, ...action.payload };
			return {
				...state,
				list: [...state.list, newBook],
				readOnlyList: [...state.list, newBook],
			};
		}
		/**
		 * Edit each row
		 */
		case constants.EDIT: {
			let $books = [...state.list].map((book) => {
				if (book.id === action.payload.id) {
					book.title = action.payload.title;
					book.rate = action.payload.rate;
					book.price = action.payload.price;
					book.release_date = action.payload.release_date;
					book.category = action.payload.category;
					book.author_id = action.payload.author_id;
				}
				return book;
			});

			return { ...state, list: $books };
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
		/**
		 * Search an item in table
		 */
		case constants.SEARCH: {
			const $filteredBooks = state.readOnlyList.filter((item) => {
				const { title, release_date, rate, category, author_id } = action.payload;
				return (
					item.author_id === author_id ||
					(item.title.toLowerCase().includes(title) &&
						item.release_date.includes(release_date) &&
						item.rate.toString().includes(rate) &&
						item.category.toLowerCase().includes(category))
				);
			});
			return {
				...state,
				list: $filteredBooks,
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
		default:
			return state;
	}
};
