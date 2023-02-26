import uuid from 'react-uuid';
import NavButton from '../navButtons/NavButton';
import {
  WorkWrapper,
  WorkContainer,
  WorkHeading,
  WorkContainerHalf,
  WorkList
} from './Work.style';
import Project from '../Project/Project';

const Work = function (props) {
  const FeaturedProjects = [
    {
      id: uuid(),
      title: 'IQ.WIKI',
      description:
        "IQ.wiki is the world's largest blockchain and cryptocurrency encyclopedia with thousands of wikis on all topics and branches of knowledge in the crypto space.",
      isPrivate: false,
      liveLink: 'https://iq.wiki',
      github: 'https://github.com/EveripediaNetwork/ep-ui',
      stack: 'Next Js + Chakra UI + RTK + Wagmi + IPFS'
    },
    {
      id: uuid(),
      title: 'UniAbuja',
      description: 'University Of Abuja website.',
      isPrivate: true,
      liveLink: 'https://www.uniabuja.edu.ng/',
      github: '',
      stack: 'Laravel + Scss + PHP'
    }
  ];

  const projects = [
    {
      id: uuid(),
      title: 'IQ Oraqles',
      description:
        'IQ.wiki OraQles formerly Everipedia OraQles is a service that allows verified first parties to bring real-world information on-chain.',
      isPrivate: true,
      liveLink: 'https://oraqles.com/',
      github: 'https://github.com/EveripediaNetwork/oraqles-ui/',
      stack: 'Next Js + Chakra UI + Wagmi'
    },
    {
      id: uuid(),
      title: 'Lope.dev',
      description: 'My portfolio webpage.',
      isPrivate: false,
      liveLink: 'https://lope-dev-cell.vercel.app/',
      github: 'https://github.com/Adebesin-Cell/lope.dev',
      stack: 'React + Strapi'
    },
    {
      id: uuid(),
      title: 'Whatsapp Web UI',
      description:
        'A redesign for WhatsApp Web could involve a variety of changes to improve the user experience and overall aesthetic of the platform',
      isPrivate: false,
      liveLink: 'https://whatsapp-web-nu.vercel.app',
      github: 'https://github.com/Adebesin-Cell/whatsapp-web',
      stack: 'React + Firebase + SCSS'
    },
    {
      id: uuid(),
      title: 'Space Tourism',
      description: 'Space Tour UI from Frontend Mentors',
      isPrivate: false,
      liveLink: 'https://space-tour.vercel.app',
      github: 'https://github.com/Adebesin-Cell/space-tourism',
      stack: 'React + SCSS'
    },
    {
      id: uuid(),
      title: 'Photo Concept',
      description: 'A Photo Concept Landing Page',
      isPrivate: false,
      liveLink: 'https://photo-concept.vercel.app/',
      github: 'https://github.com/Adebesin-Cell/photo-concept',
      stack: 'React + SCSS'
    }
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
        prev={{ url: '/', text: 'Home' }}
        next={{ url: '/resume', text: 'Resume' }}
      />
    </WorkWrapper>
  );
};

export default Work;
