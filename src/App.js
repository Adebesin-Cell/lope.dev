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
  AppSidebarParagraph,
  AppSidebarHighlight,
  AppSidebarWrapper,
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
              <AppSidebarWrapper>
                <AppSidebarHeading>
                  <AppSidebarSpan>Hello, I'm</AppSidebarSpan>
                  <AppSidebarSpan>Adebesin Tolulope</AppSidebarSpan>
                </AppSidebarHeading>
                <AppSidebarParagraph>
                  Lorem ipsum dolor sit amet,{" "}
                  <AppSidebarHighlight>
                    consectetur adipisicing elit.
                  </AppSidebarHighlight>
                  Reiciendis non{" "}
                  <AppSidebarHighlight>
                    consectetur adipisicing elit.
                  </AppSidebarHighlight>{" "}
                  Exercitationem blanditiis neque similique{" "}
                  <AppSidebarHighlight>
                    consectetur adipisicing elit.
                  </AppSidebarHighlight>{" "}
                  delectus porro autem.
                </AppSidebarParagraph>
              </AppSidebarWrapper>
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
