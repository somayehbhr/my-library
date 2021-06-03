import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item">
					<NavLink
						className="nav-link"
						activeClassName="active"
						id="books-tab"
						data-toggle="tab"
						to="/books"
						role="tab"
						aria-controls="books"
						aria-selected="true"
					>
						Books
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						className="nav-link"
						activeClassName="active"
						id="authors-tab"
						data-toggle="tab"
						to="/authors"
						role="tab"
						aria-controls="authors"
						aria-selected="false"
					>
						Authors
					</NavLink>
				</li>
			</ul>
		</>
	);
};

export default Navbar;
