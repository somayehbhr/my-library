import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Books from "./Books";
import Authors from "./Authors";
import React from "react";

export default () => {
	return (
		<Router>
			<Navbar />
			<Redirect from="/" to="/books" exact />
			<Route path="/books" component={Books} />
			<Route path="/authors" component={Authors} />
		</Router>
	);
};
