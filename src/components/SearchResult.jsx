import { useAutoAnimate } from "@formkit/auto-animate/react";

const SearchResult = ({ volumeInfo, isOpen, onToggle, onSave }) => {
	const [detailsRef] = useAutoAnimate(); // anime l'apparition des détails

	const { title, authors, description, imageLinks, infoLink } = volumeInfo;

	// Google renvoie des images en http:// : on force https:// pour éviter
	// qu'elles soient bloquées une fois l'application en ligne
	const thumbnail = imageLinks?.thumbnail?.replace("http://", "https://");

	return (
		<li ref={detailsRef} className="card mb-2 p-3">
			<button type="button" className="btn btn-link text-decoration-none text-start p-0" onClick={onToggle} aria-expanded={isOpen}>
				{title}
			</button>

			{isOpen && (
				<div className="mt-3">
					{thumbnail && <img src={thumbnail} alt={`Couverture de ${title}`} className="mb-3" />}
					<h2 className="h5">Titre : {title}</h2>
					<p className="mb-2">
						<strong>Auteurs :</strong> {authors?.join(", ") ?? "Auteur inconnu"}
					</p>
					<p>
						<strong>Description :</strong> {description ?? "Aucune description disponible."}
					</p>

					<div className="d-flex gap-2">
						<a href={infoLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
							Plus d'infos
						</a>
						<button type="button" className="btn btn-outline-secondary" onClick={onSave}>
							Enregistrer
						</button>
					</div>
				</div>
			)}
		</li>
	);
};

export default SearchResult;