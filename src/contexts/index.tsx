import React from "react";
const LibraryContext = React.createContext(null);

function LibraryProvider({ children: any }) {
	const initialState = {
		authors: [],
		books: [],
		delete: (id: number) => {},
		add: () => {},
		edit: (id: number) => {},
	};
	return <LibraryContext.Provider value={initialState}>{children}</LibraryContext.Provider>;
}
