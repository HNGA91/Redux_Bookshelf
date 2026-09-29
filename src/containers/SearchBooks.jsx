import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { toast } from "react-toastify";     
import { fetchBooks } from "../redux/actions/actionFetchBooks"; 
import { addBook } from "../redux/actions/actionAddBooks";
import SearchResult from "../components/SearchResult"; 

const SearchBooks = () => {
	const [title, setTitle] = useState("");
	const [openId, setOpenId] = useState(null);
	const dispatch = useDispatch();
	const { isLoading, fetchedBooks, error } = useSelector((state) => state.search);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return; //Pas de recherche vide
		setOpenId(null);
		dispatch(fetchBooks(title));
	};

	//Ouvre, ou le referme s'il était déjà ouvert
	const handleToggle = (id) => {
		setOpenId(openId === id ? null : id); 
	};

	//Enregistre un livre Google dans la bibliothèque
	const handleSave = ({ title, authors }) => {
		dispatch(
			addBook({
				title, 
				author: authors?.join(", ") ?? "Auteur inconnu",
			}),
		); 
		toast.info("Livre enregistré"); 
	};

	//Choisit quoi afficher selon l'état de la requête
	const renderResults = () => {
		if (isLoading) {
			return (
				<div className="d-flex justify-content-center">
					<div className="spinner-border text-secondary" role="status">
						<span className="visually-hidden">Chargement...</span>
					</div>
				</div>
			);
		}

		if (error) {
			return <div className="alert alert-danger">{error}</div>;
		}

		return (
			<ul className="list-unstyled">
				{fetchedBooks.map((book) => (
					<SearchResult
						key={book.id}
						volumeInfo={book.volumeInfo}
						isOpen={openId === book.id}
						onToggle={() => handleToggle(book.id)}
						onSave={() => handleSave(book.volumeInfo)}
					/>
				))}
			</ul>
		);
	};

	return (
		<main>
			<section className="bg-body-secondary py-5 text-center">
				<div className="container">
					<h1 className="display-4">BOOKS</h1>
					<p className="mb-4">Indiquez le sujet du livre à rechercher sur Google API</p>

					<form onSubmit={handleSubmit}>
						<div className="row justify-content-center g-2">
							<div className="col-12 col-md-auto">
								<input
									type="text"
									className="form-control"
									placeholder="Quoi rechercher ?"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className="col-12 col-md-auto">
								<button type="submit" className="btn btn-outline-secondary">
									Rechercher
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>

			<section className="container py-4">
				<div className="row justify-content-center">
					<div className="col-12 col-md-10 col-lg-6">{renderResults()} </div>
				</div>
			</section>
		</main>
	);
};

export default SearchBooks;
