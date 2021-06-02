import Header from "../../components/Header";
import React from "react";

const headerList = ["fullName", "number Of Books"];
const AuthorsList = () => {
	return (
		<table>
			<Header list={headerList} />
		</table>
	);
};
export default AuthorsList;
