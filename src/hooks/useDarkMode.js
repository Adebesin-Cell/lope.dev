import { useState, useEffect } from "react";

const useDarkMode = function () {
  const [theme, setTheme] = useState("dark");

  const setMode = function (mode) {
    localStorage.setItem("displayTheme", mode);
    setTheme(mode);
  };

  const themeToggler = function () {
    theme === "dark" ? setMode("light") : setMode("dark");
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("displayTheme");
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, themeToggler];
};

export default useDarkMode;
