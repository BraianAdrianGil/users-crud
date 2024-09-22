import { useState, useEffect } from "react";
import useFormContext from "../../hooks/useFormContext.jsx";
import "./Header.css";

const Header = () => {
	const [isSticky, setIsSticky] = useState(false);
	const { handleShowForm } = useFormContext();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className={`${isSticky && "sticky"} header`}>
			<nav className="header__nav">
				<h1 className="nav__h1">Usuarios</h1>
				<button className="nav__button" type="button" onClick={handleShowForm}>
					<span> + </span> Crear nuevo usuario
				</button>
			</nav>
		</header>
	);
};

export default Header;
