import axios from "axios";
import { FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_ERROR } from "../constants";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_API_URL = "https://www.googleapis.com/books/v1/volumes";

// ── Les 3 action creators classiques (retournent des objets) ──

const fetchBooksLoading = () => ({
	type: FETCH_BOOKS_LOADING,
});

const fetchBooksSuccess = (data) => ({
	type: FETCH_BOOKS_SUCCESS,
	payload: data,
});

const fetchBooksError = (error) => ({
	type: FETCH_BOOKS_ERROR,
	payload: error,
});

// ── L'action asynchrone (retourne une FONCTION, exécutée par Thunk) ──

export const fetchBooks = (title) => {
	return async (dispatch) => {
		dispatch(fetchBooksLoading());

		try {
			const response = await axios.get(GOOGLE_API_URL, {
				params: {
					q: title,
					key: GOOGLE_API_KEY,
					maxResults: 20,
				},
			});
			// "items" est absent quand Google ne trouve aucun résultat
			dispatch(fetchBooksSuccess(response.data.items ?? []));
		} catch (err) {
			// Message précis de Google s'il existe, sinon message générique d'Axios
			const message = err.response?.data?.error?.message ?? err.message;
			dispatch(fetchBooksError(message));
		}
	};
};
