/**
 * This component used for the header of the table in the whole project
 * @param props
 * @constructor
 */
export const Header = (props: any) => {
	return (
		<thead className="headerColor">
			<tr>
				<th scope="col">#</th>

				{props.list.map((item: any): any => (
					<th key={item} scope="col">
						{item}
					</th>
				))}
			</tr>
		</thead>
	);
};
