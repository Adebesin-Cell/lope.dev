import {
  WorkWrapper,
  WorkContainer,
  WorkHeading,
  WorkContainerHalf,
  WorkList,
} from "./Work.style";
import Project from "../Project/Project";

const Work = function (props) {
  const FeaturedProjects = [];
  const projects = [];

  return (
    <WorkWrapper>
      <WorkContainer>
        <WorkHeading>Featured</WorkHeading>
        <Project className='card' title='Falsehoods'></Project>
        <Project className='card' title='Demon Inject'></Project>
        <Project className='card' title='Invoice Generator'></Project>
        <Project className='card' title='Uniabuja'></Project>
      </WorkContainer>
      <WorkContainerHalf>
        <WorkHeading className='span--2'>other</WorkHeading>
        <WorkList>
          <Project className='card' title='Falsehoods'></Project>
          <Project className='card' title='Demon Inject'></Project>
        </WorkList>
        <WorkList>
          <Project className='card' title='Invoice Generator'></Project>
          <Project className='card' title='Uniabuja'></Project>
        </WorkList>
      </WorkContainerHalf>
    </WorkWrapper>
  );
};

export default Work;
