import React from "react";
import Screens from "./screens";
import { AuthorEntity, AuthorState } from "./store/Authors/author.reducer";
import { StateNetwork } from "./types/store.type";
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "./store/index.store";

const App: React.FC = () => {
	const authors = useSelector<StateNetwork, AuthorState>((state) => state.authors);
	console.log("authors", authors)
	const dispatch = useDispatch();
	console.count("rerender");

	function addAuthor(author: AuthorEntity) {
		dispatch({
			type: "AUTHORS/ADD",
			payload: author,
		});
	}

	function updateCurrentId(id: number) {
		dispatch({
			type: "UPDATE_CURRENT_ID",
			payload: id,
		});
	}


	return (
		<div className="App">
			<Screens />
		</div>
	);
};

export default App;
