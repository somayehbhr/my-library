import React from "react";
import BookList from "./screens/BookList"
import AuthorsList from "./screens/AuthorsList"
import Navbar from "./components/Navbar";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

export function App() {
	return (
		<div className="App">
		<Router>
			<Navbar/>
			<Route path="/books" component={BookList}/>
			<Route path="/authors" component={AuthorsList}/>
		</Router>
		</div>
	);
}
