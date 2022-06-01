import ErrorPage from "../components/error/Error";
import Helmet from "react-helmet";

const NotFoundPage = function (props) {
  return (
    <>
      <Helmet>
        <title> 404 | Lope - Adebesin Tolulope</title>
      </Helmet>
      <ErrorPage theme={props.theme} />
    </>
  );
};

export default NotFoundPage;
