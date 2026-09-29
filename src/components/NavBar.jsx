import { NavLink } from "react-router";

//Fonction appelée par NavLink, qui lui fournit isActive
const linkClass = ({ isActive }) => `btn btn-light btn-sm ${isActive ? "active" : ""}`;

const NavBar = () => {
	return (
		<header>
			<nav className="navbar bg-secondary px-3" data-bs-theme="dark">
				<span className="navbar-brand">BOOKS</span>

				<div className="btn-group">
					<NavLink to="/" className={linkClass}>
						Accueil
					</NavLink>
					<NavLink to="/search" className={linkClass}>
						Rechercher
					</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
