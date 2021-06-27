import { AuthorState } from "../store/Authors/author.reducer";
import { BookState } from "../store/Authors/book.reducer";

export interface StateNetwork {
	authors: AuthorState;
	books: BookState;
}
