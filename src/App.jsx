import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify"; 
import NavBar from "./components/NavBar";
import AddBooks from "./containers/AddBooks";
import SearchBooks from "./containers/SearchBooks";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<AddBooks />} />
				<Route path="/search" element={<SearchBooks />} />
			</Routes>
			<ToastContainer position="bottom-right" autoClose={3000} /> 
		</BrowserRouter>
	);
}

export default App;
