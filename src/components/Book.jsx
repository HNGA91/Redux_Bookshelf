const Book = ({ title, author, onDelete }) => {
	return (
		<li className="list-group-item d-flex align-items-center gap-3">
			<span className="flex-fill text-start">
				<strong>Titre :</strong> {title}
			</span>
			<span className="flex-fill text-start">
				<strong>Auteur :</strong> {author}
			</span>
			<button type="button" className="btn btn-danger btn-sm" onClick={onDelete} aria-label={`Supprimer ${title}`}>
				x
			</button>
		</li>
	);
};

export default Book;
