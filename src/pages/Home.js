import Work from "../components/work/Work";
import { HomeWrapper } from "../styles/Home.style";

const Home = function () {
  return (
    <HomeWrapper active='work' title='Home'>
      <Work />
    </HomeWrapper>
  );
};

export default Home;
