import React from "react";
import { HeaderWrapper, MenuIcon, MenuIconLine } from "./Header.style";
import Menu from "../menu/Menu";
import Logo from "../UI/Logo";

const Header = function () {
  return (
    <React.Fragment>
      <HeaderWrapper>
        <Logo></Logo>
        <MenuIcon>
          <MenuIconLine isLarge={true}></MenuIconLine>
          <MenuIconLine></MenuIconLine>
        </MenuIcon>
      </HeaderWrapper>
      <Menu></Menu>
    </React.Fragment>
  );
};

export default Header;
