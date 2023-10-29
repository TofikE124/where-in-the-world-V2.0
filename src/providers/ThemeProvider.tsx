import { ReactNode, createContext, useState } from "react";

interface ThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    const root = document.documentElement;
    if (!darkMode) {
      root.style.setProperty("--clr-dark", "#FFF");
      root.style.setProperty("--clr-pure-white", "#2B3844");
      root.style.setProperty("--clr-pure-black", "#FFF");
      root.style.setProperty("--clr-light", "#202C36");
      root.style.setProperty("--clr-grey", "#FFF");
    } else {
      root.style.setProperty("--clr-dark", "#111517");
      root.style.setProperty("--clr-pure-white", "#FFF");
      root.style.setProperty("--clr-pure-black", "#000");
      root.style.setProperty("--clr-light", "#FAFAFA");
      root.style.setProperty("--clr-grey", "#848484");
    }
    setDarkMode(!darkMode);
  }
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
