import { v4 as uuidv4 } from "uuid";
import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from "../constants";

export const addBook = (data) => ({
	type: ADD_BOOKS,
	payload: {
		id: uuidv4(),
		title: data.title,
		author: data.author,
	},
});

export const deleteBook = (id) => ({
	type: DELETE_BOOK,
	payload: id,
});

export const deleteAllBooks = () => ({
	type: DELETE_ALL_BOOKS,
});
