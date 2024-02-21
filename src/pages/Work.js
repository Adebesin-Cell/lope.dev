import Helmet from "react-helmet";
import Work from "../components/work/Work";
import { WorkBox } from "../styles/Work.style";

const WorkPage = (props) => (
	<WorkBox title="work">
		<Helmet>
			<title> Work | Lope - Adebesin Tolulope </title>
		</Helmet>
		<Work theme={props.theme} />
	</WorkBox>
);

export default WorkPage;
