import { NavLink } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<div className="container">
				<nav className="navbar navbar-light bg-light justify-content-between">
					<ul className="nav nav-pills" role="tablist">
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
				</nav>
			</div>
		</>
	);
};
