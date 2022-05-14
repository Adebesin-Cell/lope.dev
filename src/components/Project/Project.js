import * as Icon from "react-feather";
import Card from "../UI/Card";
import {
  ProjectHeading,
  CardContainer,
  ProjectDetails,
  ProjectStack,
  ProjectDescription,
  CardFooter,
  CardLink,
} from "./Project.style";

const Project = function (props) {
  return (
    <Card className={props.className}>
      <CardContainer>
        <ProjectDetails>
          <ProjectHeading>{props.title}</ProjectHeading>
          <ProjectStack>{props.stack}</ProjectStack>
          <ProjectDescription>{props.description}</ProjectDescription>
        </ProjectDetails>
        <CardFooter>
          <CardLink href={props.live}>
            <span className='icon'>{<Icon.Eye />}</span>
            <span>Live</span>
          </CardLink>
          {!props.isPrivate && (
            <CardLink href={props.github}>
              <span className='icon'>{<Icon.GitMerge />}</span>
              <span>Code</span>
            </CardLink>
          )}
        </CardFooter>
      </CardContainer>
    </Card>
  );
};

export default Project;
