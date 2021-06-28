import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "./index.reducers";

const customMiddleware = (store: any) => (dispatch: any) => async (action: any) => {
	setTimeout(() => {
		const { computedStates } = store.getState();
		const convertToString = JSON.stringify(computedStates[computedStates.length - 1].state);
		window.localStorage.setItem("persistRedux", convertToString);
	}, 0);

	dispatch(action);
};
export const appStore = createStore(
	reducers,
	JSON.parse(window.localStorage.getItem("persistRedux")!) || {},
	// @ts-ignore
	compose(window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(customMiddleware)),
);
