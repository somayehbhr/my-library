//Common components
import { Navbar } from "../components/Navbar";
//Routers
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//Screens
import { Books } from "./Books";
import { Authors } from "./Authors";

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
