import { HeaderWrapper, MenuIcon, MenuIconLine } from "./Header.style";
import Logo from "../UI/Logo";

const Header = function () {
  return (
    <HeaderWrapper>
      <Logo></Logo>
      <MenuIcon>
        <MenuIconLine isLarge={true}></MenuIconLine>
        <MenuIconLine></MenuIconLine>
      </MenuIcon>
    </HeaderWrapper>
  );
};

export default Header;
