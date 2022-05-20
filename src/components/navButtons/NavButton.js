import {
  NavButtonContainer,
  NavButtonWrapper,
  NavLink,
} from "./NavButton.style";

const NavButton = function (props) {
  return (
    <NavButtonContainer>
      <NavButtonWrapper>
        <NavLink myTheme={props.theme} to={props.prev.url}>
          {props.prev.text}
        </NavLink>
        <NavLink to={props.next.url}>{props.next.text}</NavLink>
      </NavButtonWrapper>
    </NavButtonContainer>
  );
};

export default NavButton;
