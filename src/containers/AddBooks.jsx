import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { addBook, deleteBook, deleteAllBooks } from "../redux/actions/actionAddBooks";  
import Book from "../components/Book";  

const initialData = { title: "", author: "" }; //valeurs de départ, réutilisées pour vider le formulaire

const AddBooks = () => {
	const [newData, setNewData] = useState(initialData);
    const dispatch = useDispatch();  
    const libraryData = useSelector((state) => state.library);
    const [listRef] = useAutoAnimate();  

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newData.title.trim() || !newData.author.trim()) return; //ignore les champs vides
		dispatch(addBook(newData));
		setNewData(initialData);
	};

    const displayData =
		libraryData.length > 0 ? (
			<>
				<ul ref={listRef} className="list-group mb-3">
					{libraryData.map((book) => (
						<Book key={book.id} title={book.title} author={book.author} onDelete={() => dispatch(deleteBook(book.id))} />
					))}
				</ul>
				<button type="button" className="btn btn-danger" onClick={() => dispatch(deleteAllBooks())}>
					Effacer tous les livres
				</button>
			</>
		) : (
			<p>Aucune data à afficher</p>
		);

	return (
		<main>
			<section className="bg-body-secondary py-5 text-center">
				<div className="container">
					<h1 className="display-4">BOOKS</h1>
					<p className="mb-4">Ajouter un livre à votre bibliothèque</p>
					<form onSubmit={handleSubmit}>
						<div className="row justify-content-center g-2">
							<div className="col-12 col-md-auto">
								<input
									type="text"
									className="form-control"
									placeholder="Titre"
									value={newData.title}
									onChange={(e) => setNewData({ ...newData, title: e.target.value })}
								/>
							</div>
							<div className="col-12 col-md-auto">
								<input
									type="text"
									className="form-control"
									placeholder="Auteur"
									value={newData.author}
									onChange={(e) => setNewData({ ...newData, author: e.target.value })}
								/>
							</div>
							<div className="col-12 col-md-auto">
								<button type="submit" className="btn btn-outline-secondary">
									Ajouter un livre
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>

			<section className="container py-4 text-center">
				<div className="row justify-content-center">
					<div className="col-12 col-md-10 col-lg-6">
						{displayData}
					</div>
				</div>
			</section>
		</main>
	);
};

export default AddBooks;
