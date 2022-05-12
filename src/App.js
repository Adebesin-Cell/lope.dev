import { Routes, Route } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/globalStyles";
import { lightTheme, darkTheme } from "./theme/Theme";
import Toggler from "./components/Toggler";
import Home from "./pages/Home";
import {
  AppContainer,
  AppView,
  AppSidebar,
  AppSidebarContent,
  AppSidebarHeading,
  AppSidebarSpan,
} from "./styles/App.style";

/**
 * @description default theme :  dark
 * @returns
 */
const App = function () {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles></GlobalStyles>
        <Toggler theme={theme} toggleTheme={themeToggler}></Toggler>
        <AppContainer>
          <AppSidebar>
            <AppSidebarContent>
              <AppSidebarHeading>
                <AppSidebarSpan>Hello, I'm</AppSidebarSpan>
                <AppSidebarSpan>Adebesin Tolulope</AppSidebarSpan>
              </AppSidebarHeading>
            </AppSidebarContent>
          </AppSidebar>
          <AppView>
            <Routes>
              <Route path='/' element={<Home />}></Route>
            </Routes>
          </AppView>
        </AppContainer>
      </>
    </ThemeProvider>
  );
};

export default App;
