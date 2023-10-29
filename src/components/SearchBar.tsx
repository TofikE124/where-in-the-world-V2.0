import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

interface Props {
  search: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ search, handleChange }: Props) => {
  const { darkMode } = useContext(ThemeContext);
  const searchIcon = `/images/search-${darkMode ? "dark" : "light"}.svg`;

  return (
    <div className="home-search-bar-container bx-s flex bg-white br">
      <img className="home-search-icon" src={searchIcon} />
      <input
        onChange={handleChange}
        value={search}
        className="home-search-bar fs-500 fw-400 bg-white txt-pure-black"
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchBar;
