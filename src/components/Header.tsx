import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const moonImg = `/images/moon-${darkMode ? "dark" : "light"}.png`;
  return (
    <header className="primary-header bg-white bx-s">
      <div className="primary-header-container container flex">
        <Link className="primary-header__title-container" to="/">
          <h1 className="primary-header__title fs-800 fw-800 txt-dark">
            Where in the world?
          </h1>
        </Link>
        <div
          className="change-mode-container flex"
          onClick={() => toggleDarkMode()}
        >
          <img className="moon-icon" src={moonImg} />
          <p className="fs-600 fw-600">Dark Mode</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
