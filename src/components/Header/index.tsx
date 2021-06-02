import React from "react";

const Header = (props: any) => {
	return (
		<thead>
			<tr>
				<th scope="col">#</th>

				{props.list.map((item: any): any => {
					return <th scope="col">{item}</th>;
				})}
			</tr>
		</thead>
	);
};
export default Header;
