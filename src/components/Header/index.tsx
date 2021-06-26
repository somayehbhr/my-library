export const Header = (props: any) => {
	return (
		<thead>
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
