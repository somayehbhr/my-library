import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { appStore } from "./store/index.store";


ReactDOM.render(
	<React.StrictMode>
		<Provider store={appStore}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

reportWebVitals();
