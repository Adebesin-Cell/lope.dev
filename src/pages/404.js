import Helmet from "react-helmet";
import ErrorPage from "../components/error/Error";

const NotFoundPage = (props) => (
	<>
		<Helmet>
			<title> 404 | Lope - Adebesin Tolulope</title>
		</Helmet>
		<ErrorPage theme={props.theme} />
	</>
);

export default NotFoundPage;
