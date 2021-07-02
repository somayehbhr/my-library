// Common components
import { Navbar } from "../components/Navbar";
// React routers
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// Screens
import { Books } from "./Books";
import { Authors } from "./Authors";

/**
 * This component due to show the main pages ang manage the routes
 */
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
