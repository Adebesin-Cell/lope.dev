import uuid from "react-uuid";
import NavButton from "../navButtons/NavButton";
import {
  WorkWrapper,
  WorkContainer,
  WorkHeading,
  WorkContainerHalf,
  WorkList,
} from "./Work.style";
import Project from "../Project/Project";

// 1c65d0a73b207b36b0f4b8558bad903287335f35e41a3de81191009281e4c54d2e3223d6c25bff8b2c097b751deb3c3dda5518b929f0669653816e579d861f2d1f8c020886635d306196a68c4864927075e6a305479ec34a8976de176d88d9646bea626325090272280b69f1ddf60d9e1b2e306b7bfdb821e58fe41dd795f9a7

const Work = function (props) {
  const FeaturedProjects = [
    {
      id: uuid(),
      title: "UniAbuja",
      description: "University Of Abuja website.",
      isPrivate: true,
      liveLink: "https://www.uniabuja.edu.ng/",
      github: "",
      stack: "Laravel + Scss + PHP",
    },
    {
      id: uuid(),
      title: "PIC",
      description: "Poly International College website.",
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
      description: "Zealarax Technologies landing page.",
      isPrivate: true,
      liveLink: "http://zealarax-web.herokuapp.com/",
      github: "",
      stack: "Laravel + Animate CSS + SCSS + PHP",
    },
    {
      id: uuid(),
      title: "Lope.dev",
      description: "My portfolio webpage.",
      isPrivate: false,
      liveLink: "https://lope-dev-cell.vercel.app/",
      github: "https://github.com/Adebesin-Cell/lope.dev",
      stack: "React + Strapi",
    },
  ];

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
          {projects.map((project, i) => (
            <Project
              className='card'
              key={project.id}
              id={project.id}
              index={i}
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
      <NavButton
        prev={{ url: "/", text: "Home" }}
        next={{ url: "/resume", text: "Resume" }}
      />
    </WorkWrapper>
  );
};

export default Work;
