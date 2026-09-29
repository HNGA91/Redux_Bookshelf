import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from "../constants";

// Au démarrage, on récupère les livres déjà sauvegardés
const loadBooks = () => {
	try {
		return JSON.parse(localStorage.getItem("booksData")) ?? [];
	} catch {
		return []; // localStorage corrompu ou inaccessible
	}
};

const reducerAddBooks = (state = loadBooks(), action) => {
	switch (action.type) {
		case ADD_BOOKS:
			return [...state, action.payload]; // nouveau tableau, jamais state.push()

		case DELETE_BOOK:
			return state.filter((book) => book.id !== action.payload);

		case DELETE_ALL_BOOKS:
			return [];

		default:
			return state;
	}
};

export default reducerAddBooks;
