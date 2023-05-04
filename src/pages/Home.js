import Work from '../components/work/Work';
import { HomeWrapper } from '../styles/Home.style';
import Helmet from 'react-helmet';

const Home = function (props) {
  return (
    <HomeWrapper active='work' title='Home'>
      <Helmet>
        <link rel='og:image"' href='/images/og-image.png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <title> Lope - Adebesin Tolulope </title>
      </Helmet>
      <Work theme={props.theme} />
    </HomeWrapper>
  );
};

export default Home;
