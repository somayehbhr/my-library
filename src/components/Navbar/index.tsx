// React router
import { NavLink } from "react-router-dom";
// Types
import { FC } from "react";

/**
 * This component used for the main navbar that exists in project
 * @constructor
 */
export const Navbar: FC = () => {
	return (
		<>
			<nav className="navBar">
				<div className="container">
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
				</div>
			</nav>
		</>
	);
};
