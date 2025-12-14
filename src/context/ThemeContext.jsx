import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("demo_theme", "dark"); // custom hook
  const isLight = theme === "light";

  const value = {
    theme,
    isLight,
    toggleTheme: () => setTheme(isLight ? "dark" : "light"),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext); // useContext
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
