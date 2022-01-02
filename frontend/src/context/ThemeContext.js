import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "../themes/theme-schema";

const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(themes["light"]);

  function changeTheme(newTheme) {
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} >
        <ThemeProvider theme={theme}>
          {props.children}
        </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
