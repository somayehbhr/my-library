import { Reducer } from "redux";
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
}

const initialState: BookState = {
	list: data.books,
	readOnlyList: data.books,
	currentId: 0,
};

export const bookReducer: Reducer<BookState> = (state = initialState, action) => {
	if (action.type === "BOOKS/DELETE") {
		const newList = state.readOnlyList.filter((row) => {


			return row.id !== action.payload;
		});
		return { ...state, list: newList, readOnlyList: newList };
	} else if (action.type === "BOOKS/ADD") {
		const id = Math.floor(Math.random() * 100);
		const newBook = { id, ...action.payload };
		return {
			...state,
			list: [...state.list, newBook],
			readOnlyList: [...state.list, newBook]
		};
	} else if (action.type === "BOOKS/EDIT") {
		let $books = [...state.list].map(book => {
			if(book.id === action.payload.id) {
				book.title = action.payload.title;
				book.rate = action.payload.rate;
				book.release_date = action.payload.releaseDate;
				book.category = action.payload.category;
				book.author_id = action.payload.author_id;
			}
			return book;
		})

		return { ...state, list: $books };
	}else if(action.type === "BOOKS/SEARCH") {
		const $filteredBooks = state.readOnlyList.filter((s) => {
			// return s.fullName.toLowerCase().includes(action.payload);
		})
		return {


			...state,
			list: $filteredBooks
		}
	}else if(action.type === "BOOKS/CLEAR_SEARCH") {
		console.log("state.readOnlyList", state.readOnlyList)
		return {
			...state,
			list: state.readOnlyList
		}
	}

	return state;
};
