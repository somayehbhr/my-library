import { combineReducers } from "redux";
import { authorReducer } from "./Authors/author.reducer";

export const reducers = combineReducers({
	authors: authorReducer,
});
