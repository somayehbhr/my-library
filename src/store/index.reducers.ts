import { combineReducers } from "redux";
import { authorReducer } from "./Authors/author.reducer";
import { bookReducer } from "./Books/book.reducer";

export const reducers = combineReducers({
	authors: authorReducer,
	books: bookReducer,
});
