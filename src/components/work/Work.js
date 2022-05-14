import {
  WorkWrapper,
  WorkContainer,
  WorkHeading,
  WorkContainerHalf,
  WorkList,
} from "./Work.style";
import Project from "../Project/Project";
import uuid from "react-uuid";

const Work = function (props) {
  const FeaturedProjects = [
    {
      id: uuid(),
      title: "UniAbuja",
      description: "University Of Abuja website",
      isPrivate: true,
      liveLink: "https://www.uniabuja.edu.ng/",
      github: "",
      stack: "Laravel + Scss + PHP",
    },
    {
      id: uuid(),
      title: "PIC",
      description: "Poly International College website",
      isPrivate: true,
      liveLink: "https://www.polyinternationalcollege.com/",
      github: "",
      stack: "Laravel + CSS + Bootstrap + PHP",
    },
  ];

  const projects = [
    {
      id: uuid(),
      title: "Zealarax",
      description: "Zealarax Technologies landing page",
      isPrivate: true,
      liveLink: "http://zealarax-web.herokuapp.com/",
      github: "",
      stack: "Laravel + Animate CSS + SCSS + PHP",
    },

    {
      id: uuid(),
      title: "Recipe App",
      description: "Recipe application with recommendations and sort by filter",
      isPrivate: true,
      liveLink: "",
      github: "",
      stack: "React + Redux + Typescript",
    },
    {
      id: uuid(),
      title: "Lope.dev",
      description: "My portfolio webpage",
      isPrivate: false,
      liveLink: "https://lope-dev-cell.vercel.app/",
      github: "https://github.com/Adebesin-Cell/lope.dev",
      stack: "React + Strapi + GraphQl",
    },
    {
      id: uuid(),
      title: "Sham",
      description: "Online music streaming app",
      isPrivate: false,
      liveLink: "",
      github: "",
      stack: "React + GraphQL + Typescript",
    },
    {
      id: uuid(),
      title: "Sham",
      description: "Online music streaming app",
      isPrivate: false,
      liveLink: "",
      github: "",
      stack: "React + GraphQL + Typescript",
    },

    {
      id: uuid(),
      title: "Sham",
      description: "Online music streaming app",
      isPrivate: false,
      liveLink: "",
      github: "",
      stack: "React + GraphQL + Typescript",
    },
    {
      id: uuid(),
      title: "Sham",
      description: "Online music streaming app",
      isPrivate: false,
      liveLink: "",
      github: "",
      stack: "React + GraphQL + Typescript",
    },
    {
      id: uuid(),
      title: "Sham",
      description: "Online music streaming app",
      isPrivate: false,
      liveLink: "",
      github: "",
      stack: "React + GraphQL + Typescript",
    },
    {
      id: uuid(),
      title: "Sham",
      description: "Online music streaming app",
      isPrivate: false,
      liveLink: "",
      github: "",
      stack: "React + GraphQL + Typescript",
    },
  ];

  const breakNumber = projects.length / 2;
  const indexNumber = 0;

  return (
    <WorkWrapper>
      <WorkContainer>
        <WorkHeading>Featured</WorkHeading>
        {FeaturedProjects.map((project) => (
          <Project
            className='card'
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            isPrivate={project.isPrivate}
            github={project.github}
            live={project.liveLink}
            stack={project.stack}
          />
        ))}
      </WorkContainer>
      <WorkContainerHalf>
        <WorkHeading className='span--2'>other</WorkHeading>
        <WorkList>
          {projects.length > breakNumber
            ? projects
                .slice(indexNumber, breakNumber)
                .map((project) => (
                  <Project
                    className='card'
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    isPrivate={project.isPrivate}
                    github={project.github}
                    live={project.liveLink}
                    stack={project.stack}
                  />
                ))
            : projects.map((project) => (
                <Project
                  className='card'
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  isPrivate={project.isPrivate}
                  github={project.github}
                  live={project.liveLink}
                  stack={project.stack}
                />
              ))}
        </WorkList>
        <WorkList>
          {projects.slice(breakNumber, projects.length).map((project) => (
            <Project
              className='card'
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              isPrivate={project.isPrivate}
              github={project.github}
              live={project.liveLink}
              stack={project.stack}
            />
          ))}
        </WorkList>
      </WorkContainerHalf>
    </WorkWrapper>
  );
};

export default Work;
