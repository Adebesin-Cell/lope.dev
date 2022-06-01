import Work from "../components/work/Work";
import { HomeWrapper } from "../styles/Home.style";
import Helmet from "react-helmet";

const Home = function () {
  return (
    <HomeWrapper active='work' title='Home'>
      <Helmet>
        <title> Lope - Adebesin Tolulope </title>
      </Helmet>
      <Work />
    </HomeWrapper>
  );
};

export default Home;
