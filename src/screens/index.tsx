// Common components
import { Navbar } from "../components/Navbar";
// Routers
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// Screens
import { Books } from "./Books";
import { Authors } from "./Authors";

export default () => {
	return (
		<Router basename={process.env.NODE_ENV === "production" ? window.location.pathname : "/"}>
			<Navbar />
			<Switch>
				<Redirect from="/" to="/books" exact strict />
				<Route path="/books" component={Books} />
				<Route path="/authors" component={Authors} />
			</Switch>
		</Router>
	);
};
