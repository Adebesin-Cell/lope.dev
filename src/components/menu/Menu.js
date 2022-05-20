import {
  MenuContainer,
  MenuNav,
  MenuNavList,
  MenuNavItem,
  MenuNavLink,
  MenuSocials,
  MenuSocialsHeading,
} from "./Menu.style";

const Menu = function () {
  return (
    <MenuContainer>
      <MenuNav>
        <MenuNavList>
          <MenuNavItem>
            <MenuNavLink to='/'>Home</MenuNavLink>
          </MenuNavItem>
          <MenuNavItem>
            <MenuNavLink to='/work'>Work</MenuNavLink>
          </MenuNavItem>
          <MenuNavItem>
            <MenuNavLink to='/contact'>Contact</MenuNavLink>
          </MenuNavItem>
          <MenuNavItem>
            <MenuNavLink to='/resume'>Résumé</MenuNavLink>
          </MenuNavItem>
        </MenuNavList>
        <MenuSocials>
          <MenuSocialsHeading>Connect with me</MenuSocialsHeading>
        </MenuSocials>
      </MenuNav>
    </MenuContainer>
  );
};

export default Menu;
