import { LogoBox } from "./Logo.style";
import { Link } from "react-router-dom";

const Logo = function () {
  return (
    <LogoBox>
      <Link to='/'>Lope.</Link>
    </LogoBox>
  );
};

export default Logo;
