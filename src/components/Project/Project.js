import Card from "../UI/Card";
import {
  ProjectHeading,
  CardContainer,
  ProjectDetails,
  ProjectStack,
} from "./Project.style";

const Project = function (props) {
  return (
    <Card className={props.className}>
      <CardContainer>
        <ProjectDetails>
          <ProjectHeading>{props.title}</ProjectHeading>
          <ProjectStack>{props.stack}</ProjectStack>
        </ProjectDetails>
      </CardContainer>
    </Card>
  );
};

export default Project;
