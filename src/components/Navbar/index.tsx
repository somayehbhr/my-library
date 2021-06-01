import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item">
					<NavLink
						className="nav-link active"
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
			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade show active"
					id="books"
					role="tabpanel"
					aria-labelledby="books-tab"
				>
					...
				</div>
				<div
					className="tab-pane fade"
					id="authors"
					role="tabpanel"
					aria-labelledby="authors-tab"
				>
					...
				</div>
			</div>
		</>
	);
};

export default Navbar;
