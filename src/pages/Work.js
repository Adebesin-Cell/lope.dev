import { WorkBox } from "../styles/Work.style";
import Work from "../components/work/Work";
import Helmet from "react-helmet";

const WorkPage = function (props) {
  return (
    <WorkBox title='work'>
      <Helmet>
        <title> Work | Lope - Adebesin Tolulope </title>
      </Helmet>
      <Work theme={props.theme} />
    </WorkBox>
  );
};

export default WorkPage;
