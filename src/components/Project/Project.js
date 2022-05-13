import Card from "../UI/Card";
import { ProjectHeading } from "./Project.style";

const Project = function (props) {
  return (
    <Card className={props.className}>
      <ProjectHeading>{props.title}</ProjectHeading>
    </Card>
  );
};

export default Project;
