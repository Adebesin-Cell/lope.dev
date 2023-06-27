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
      stack: 'Next.js + Chakra UI + RTK + Wagmi + IPFS'
    },
   {
      id: uuid(),
      title: 'IQ GPT',
      description:
        'IQ GPT is an AI-powered search engine that retrieves the latest crypto and blockchain insights from IQ Wiki, AP News, Flywheel, Coingecko, Blockchair and Coinness.',
      isPrivate: false,
      liveLink: 'https://iqgpt.com/',
      github: 'https://github.com/EveripediaNetwork/iq-search',
      stack: 'Next.js + Zod + Chakra UI + OpenAI'
    },
    {
      id: uuid(),
      title: 'IQ Oraqles',
      description:
        'IQ OraQles formerly Everipedia OraQles is a service that allows verified first parties to bring real-world information on-chain.',
      isPrivate: false,
      liveLink: 'https://oraqles.com/',
      github: 'https://github.com/EveripediaNetwork/oraqles-ui/',
      stack: 'Next.js + Chakra UI + Wagmi'
    },
   
  ];

  const projects = [
    {
      id: uuid(),
      title: 'Crypto Pulse',
      description:
        'AI-generated news on tokens for the latest updates and health of the crypto world.',
      isPrivate: false,
      liveLink: 'https://cryptopulse.vercel.app/',
      github: 'https://github.com/Royal-lobster/Crypto-Pulse',
      stack:
        'ZOD + T3 Stack - (Next.js,Tailwind CSS, trpc, prisma), React Query + Banana'
    },
    {
      id: uuid(),
      title: 'UniAbuja',
      description:
        'Discover the University of Abuja: Nigerian excellence in education, research, and innovation, at your fingertips.',
      isPrivate: true,
      liveLink: 'https://www.uniabuja.edu.ng/',
      github: '',
      stack: 'Laravel + Scss + PHP'
    },

    {
      id: uuid(),
      title: 'Space Tourism',
      description:
        'A futuristic and immersive interface for space tourism, featuring stunning graphics, virtual tours, and interactive guides.',
      isPrivate: false,
      liveLink: 'https://space-tour.vercel.app',
      github: 'https://github.com/Adebesin-Cell/space-tourism',
      stack: 'React + SCSS'
    },
    {
      id: uuid(),
      title: 'Whatsapp Web UI',
      description:
        'A fresh and modern user interface for seamless messaging and communication, now with enhanced functionality.',
      isPrivate: false,
      liveLink: 'https://whatsapp-web-nu.vercel.app',
      github: 'https://github.com/Adebesin-Cell/whatsapp-web',
      stack: 'React + Firebase + SCSS'
    },
    {
      id: uuid(),
      title: 'Lope.dev',
      description:
        'Explore the digital world through the lens of a passionate software developer. Discover my projects, skills, and experiences',
      isPrivate: false,
      liveLink: 'https://lope-dev-cell.vercel.app/',
      github: 'https://github.com/Adebesin-Cell/lope.dev',
      stack: 'React + Helmet + Styled Components'
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
            theme={props.theme}
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
              theme={props.theme}
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
