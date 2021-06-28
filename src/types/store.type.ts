import { AuthorState } from "../store/Authors/author.reducer";
import { BookState } from "../store/Books/book.reducer";

export interface StateNetwork {
	authors: AuthorState;
	books: BookState;
}
