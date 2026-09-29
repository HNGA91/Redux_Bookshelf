import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from "redux";
import { thunk } from "redux-thunk";
import reducerAddBooks from "./reducers/reducerAddBooks";
import reducerFetchBooks from "./reducers/reducerFetchBooks"; 

const rootReducer = combineReducers({
	library: reducerAddBooks,
	search: reducerFetchBooks,
});

//Combine le middleware Thunk avec l'extension Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
	localStorage.setItem("booksData", JSON.stringify(store.getState().library));
});

export default store;
