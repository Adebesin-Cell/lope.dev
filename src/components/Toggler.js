import { func, string } from "prop-types";
import * as Icon from "react-feather";
import { ThemeButton } from "./UI/Button";

const Toggler = function (props) {
  return (
    <ThemeButton title='theme switcher' onClick={props.toggleTheme}>
      {props.theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}{" "}
    </ThemeButton>
  );
};

Toggler.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggler;
