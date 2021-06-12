//Common components
import { Navbar } from "../components/Navbar";
//Routers
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//Screens
import { Books } from "./Books";
import { Authors } from "./Authors";
import { createContext, useContext } from "react";

const CountContext = createContext({ count: 0 });
export default () => {
	const x = useContext(CountContext);
	console.log(x);
	return (
		<Router>
			<Navbar />
			<Redirect from="/" to="/books" exact />
			<Route path="/books" component={Books} />
			<Route path="/authors" component={Authors} />
		</Router>
	);
};
