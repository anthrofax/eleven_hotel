"use client";

import React from "react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

type ThemeContextType = {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  setDarkTheme: () => null,
});

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const themeFromStorage: boolean =
    typeof localStorage !== "undefined" && localStorage.getItem("hotel-theme")
      ? JSON.parse(localStorage.getItem("hotel-theme")!)
      : false;

  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(function () {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:bg-black dark:text-white text-[#1E1E1E]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) alert("Anda menggunakan context di luar jangkauan");

  return context;
}

export { ThemeContextProvider, useThemeContext };
