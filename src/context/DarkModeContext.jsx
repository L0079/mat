import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children } = {}) {
  //  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("prefers-color-scheme: dark").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = { children: PropTypes.any };

// export default DarkModeProvider;

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(
      "DarkModeContext was used outside of DarkModeContextProvider"
    );
  return context;
}
