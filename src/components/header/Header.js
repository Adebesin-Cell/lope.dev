import React, { useState } from "react";
import { HeaderWrapper, MenuIcon, MenuIconLine } from "./Header.style";
import Menu from "../menu/Menu";
import Logo from "../UI/Logo";

const Header = function () {
  const [isClosed, setIsClosed] = useState(true);

  const menuToggleHandler = function (e) {
    setIsClosed(!isClosed);
  };

  return (
    <React.Fragment>
      <HeaderWrapper>
        <Logo></Logo>
        <MenuIcon
          className={isClosed ? "" : "opened"}
          onClick={menuToggleHandler}
        >
          <MenuIconLine
            isLarge={true}
            className='line line--large'
          ></MenuIconLine>
          <MenuIconLine className='line line--small'></MenuIconLine>
        </MenuIcon>
      </HeaderWrapper>
      {!isClosed && <Menu />}
    </React.Fragment>
  );
};

export default Header;
