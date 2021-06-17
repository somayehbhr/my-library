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
					<form className="form-inline">
						<div className="input-group">
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
								Search
							</button>
						</div>
					</form>
				</nav>
			</div>
		</>
	);
};
