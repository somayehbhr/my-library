import React from "react";
import { connect } from "react-redux";
import Screens from "./screens";
import { AuthorEntity, AuthorState } from "./store/Authors/author.reducer";
import { Dispatch } from "redux";
import { StateNetwork } from "./types/store.type";

interface AppProps {
	currentId: number;
	list: AuthorEntity[];
	addAuthor(author: AuthorEntity): void;
	updateCurrentId(id: number): void;
}

const App: React.FC<AppProps> = (props) => {
	function handleAddNewAuthor() {
		props.addAuthor({
			id: 1,
			fullName: "Somayeh Bahiraei",
		});
	}
	console.count("rerender");
	return (
		<div className="App">
			<button onClick={() => props.updateCurrentId(3)}>Update current id</button>
			<button onClick={handleAddNewAuthor}>Add New Author</button>
			{JSON.stringify(props.list, null, 2)}
			{/*<Screens />*/}
		</div>
	);
};

function mapStateToProps(state: StateNetwork) {
	console.log(state);
	return {
		list: state.authors.list,
		currentId: state.authors.currentId,
	};
}
function mapDispatchToProps(dispatch: Dispatch) {
	return {
		addAuthor(author: AuthorEntity) {
			dispatch({
				type: "ADD_AUTHOR",
				payload: author,
			});
		},
		updateCurrentId(id: number) {
			dispatch({
				type: "UPDATE_CURRENT_ID",
				payload: id,
			});
		},
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
