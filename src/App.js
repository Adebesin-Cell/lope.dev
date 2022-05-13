import { Routes, Route, useLocation } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/globalStyles";
import { lightTheme, darkTheme } from "./theme/Theme";
import uuid from "react-uuid";
import * as Icon from "react-feather";
import Toggler from "./components/Toggler";
import { Home, Resume } from "./pages";

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
  AppSidebarNav,
  AppSidebarNavList,
  AppSidebarNavItem,
  AppLink,
  AppLinkUnderline,
  AppLinkName,
  AppSidebarFooter,
  AppSidebarImage,
  AppSidebarSocials,
} from "./styles/App.style";

import avatar from "./assets/images/avatar.jpg";

const NavLinks = [
  {
    id: uuid(),
    name: "work",
    link: "/",
  },

  {
    id: uuid(),
    name: "resume",
    link: "/resume",
  },

  {
    id: uuid(),
    name: "contact",
    link: "/contact",
  },
];

/**
 * @description default theme :  dark
 * @returns
 */
const App = function () {
  const [theme, themeToggler] = useDarkMode();
  const { pathname } = useLocation();

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
                  <AppSidebarSpan isSmall={true}>Hello, I'm</AppSidebarSpan>
                  <AppSidebarSpan>Adebesin Tolulope</AppSidebarSpan>
                </AppSidebarHeading>
                <AppSidebarParagraph>
                  I'm a frontend developer. I create interactive
                  <AppSidebarHighlight> experiences </AppSidebarHighlight>
                  with modern
                  <AppSidebarHighlight> web technologies. </AppSidebarHighlight>
                  I'm currently learning how to
                  <AppSidebarHighlight>
                    {" "}
                    design products
                  </AppSidebarHighlight>{" "}
                  and create beautiful web
                  <AppSidebarHighlight> animations</AppSidebarHighlight>.
                </AppSidebarParagraph>
                <AppSidebarNav>
                  <AppSidebarNavList>
                    {NavLinks.map((nav, i) => {
                      return (
                        <AppSidebarNavItem key={nav.id}>
                          <AppLink
                            to={nav.link}
                            id={nav.id}
                            active={pathname === nav.link}
                          >
                            <span>0{i}</span>
                            <AppLinkUnderline className='underline' />
                            <AppLinkName>{nav.name}</AppLinkName>
                          </AppLink>
                        </AppSidebarNavItem>
                      );
                    })}
                  </AppSidebarNavList>
                </AppSidebarNav>
              </AppSidebarWrapper>
              <AppSidebarFooter>
                <AppSidebarImage
                  src={avatar}
                  alt='Adebesin Tolulope Avatar'
                ></AppSidebarImage>
                <AppSidebarSocials>
                  <a
                    href='https://twitter.com/Emmanue21243400'
                    className='socials__link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='icon icon--lg'>{<Icon.Twitter />}</span>
                    <span className='text'>Twitter</span>
                    <span className='icon icon--sm'>
                      {<Icon.ExternalLink></Icon.ExternalLink>}
                    </span>
                  </a>
                  <a
                    href='https://github.com/Adebesin-Cell'
                    className='socials__link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='icon icon--lg'>
                      <svg
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                        class=' fill-current'
                      >
                        <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'></path>
                      </svg>
                    </span>
                    <span className='text'>GitHub</span>
                    <span className='icon icon--sm'>
                      {<Icon.ExternalLink></Icon.ExternalLink>}
                    </span>
                  </a>
                  <a
                    href='mailto:adebesintolulope80@gmail.com'
                    className='socials__link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='icon icon--lg icon--no-fill'>
                      {<Icon.AtSign />}
                    </span>
                    <span className='text'>Email</span>
                    <span className='icon icon--sm'>
                      {<Icon.ExternalLink></Icon.ExternalLink>}
                    </span>
                  </a>
                </AppSidebarSocials>
              </AppSidebarFooter>
            </AppSidebarContent>
          </AppSidebar>
          <AppView>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/resume' element={<Resume />}></Route>
            </Routes>
          </AppView>
        </AppContainer>
      </>
    </ThemeProvider>
  );
};

export default App;
