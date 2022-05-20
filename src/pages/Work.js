import { WorkBox } from "../styles/Work.style";
import Work from "../components/work/Work";

const WorkPage = function (props) {
  return (
    <WorkBox title='work'>
      <Work theme={props.theme} />
    </WorkBox>
  );
};

export default WorkPage;
