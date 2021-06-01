import React from "react";
import BookList from "./screens/BookList"
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

			<Navbar/>
			<BookList/>
		</div>
	);
}
