import { LogoBox } from "./Logo.style";
import { Link } from "react-router-dom";

const Logo = function (props) {
  return (
    <LogoBox>
      <Link to='/' onClick={props.onClick}>
        Lope.
      </Link>
    </LogoBox>
  );
};

export default Logo;
