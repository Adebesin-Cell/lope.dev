import * as Icon from "react-feather";
import uuid from "react-uuid";
import resume from "../../assets/images/avatar.jpg";
import { Link } from "react-router-dom";
import {
  ResumeBody,
  ResumeHeader,
  ResumeHeading,
  ResumeActions,
  ResumeActionButton,
  ResumeTitle,
  ResumeSummary,
  ResumeDivider,
  ResumeDividerTitle,
  ResumeDividerLine,
  ResumeSkills,
  ResumeExperienceContainer,
  ResumeExperience,
  ResumeProjects,
  ResumeExperienceTitle,
  ResumeExperienceDate,
  ResumeExperienceDescription,
  ResumeExperienceAchievements,
  ResumeExperienceItem,
} from "./ResumeTemplate.style";

const resumeObj = {
  coreSkills: [
    "HTML/CSS/SCSS",
    "JavaScript[ES6+]",
    "React JS",
    "Styled Components",
    "Tailwind CSS",
    "Bootstrap",
    "Firebase",
    "Strapi",
  ],

  familiarSkills: [
    "PHP",
    "Node JS",
    "GraphQL",
    "GSAP",
    "Figma",
    "Adobe XD",
    "Python",
  ],

  experience: [
    {
      id: uuid(),
      company: "Zealarax Technologies",
      position: "Frontend Developer [Intern]",
      startDate: "January 2021",
      endDate: "January 2022",
      description:
        " I contributed in developing user interfaces for quite a number of products while learning new skills.",
      achievements: [
        "I learnt basic and mid-level frontend skills with the Zealarax Team.",
        "Collaborated with Laravel and PHP developers to build a software used by over 3000 university students.",
        "Worked with Laravel developers to build a web application for a high school.",
        "Built basic web components using SCSS.",
      ],
    },
  ],

  onTheJob: ["Version Control", "CI/CD", "Best Practices"],
};

const ResumeTemplate = function () {
  return (
    <ResumeBody>
      <ResumeHeader>
        <ResumeHeading>Adebesin Tolulope</ResumeHeading>
        <ResumeActions>
          <ResumeActionButton
            href='https://www.linkedin.com/in/adebesin-tolulope-2429b621a/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='icon'>
              <Icon.Linkedin />
            </span>
            <span>Linked In</span>
          </ResumeActionButton>
          <ResumeActionButton
            download={true}
            href={resume}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='icon'>
              <Icon.Download />
            </span>
            <span>Download</span>
          </ResumeActionButton>
        </ResumeActions>
      </ResumeHeader>
      <ResumeTitle>Frontend Developer</ResumeTitle>
      <ResumeSummary>
        I'm a frontend web developer, passionate about solving problems with my
        skills and converting ideas from pixels to products. User experiance is
        the focus when developing products using the best web tools,
        technologies and languages.
      </ResumeSummary>
      <ResumeDivider>
        <ResumeDividerTitle>Core Technologies</ResumeDividerTitle>
        <ResumeDividerLine></ResumeDividerLine>
      </ResumeDivider>
      <ResumeSkills>{resumeObj.coreSkills.join(", ")}.</ResumeSkills>
      <ResumeDivider>
        <ResumeDividerTitle>Familiar With</ResumeDividerTitle>
        <ResumeDividerLine></ResumeDividerLine>
      </ResumeDivider>
      <ResumeSkills>{resumeObj.familiarSkills.join(", ")}.</ResumeSkills>
      <ResumeDivider>
        <ResumeDividerTitle>On The Job</ResumeDividerTitle>
        <ResumeDividerLine></ResumeDividerLine>
      </ResumeDivider>
      <ResumeSkills>{resumeObj.onTheJob.join(", ")}.</ResumeSkills>
      <ResumeDivider>
        <ResumeDividerTitle>Work Experience</ResumeDividerTitle>
        <ResumeDividerLine></ResumeDividerLine>
      </ResumeDivider>
      <ResumeExperienceContainer>
        {resumeObj.experience.map((experience, index) => (
          <ResumeExperience key={experience.id} id={experience.id}>
            <ResumeExperienceTitle>
              {experience.company} - {experience.position}
            </ResumeExperienceTitle>
            <ResumeExperienceDate>
              {experience.startDate} -{" "}
              {experience.endDate === null ? "Present" : experience.endDate}
            </ResumeExperienceDate>
            <ResumeExperienceDescription>
              {experience.description}
            </ResumeExperienceDescription>
            {experience.achievements.map((achievement) => (
              <ResumeExperienceAchievements key={experience.id}>
                <ResumeExperienceItem>
                  <span className='icon'>■</span>
                  <span>{achievement}</span>
                </ResumeExperienceItem>
              </ResumeExperienceAchievements>
            ))}
          </ResumeExperience>
        ))}
      </ResumeExperienceContainer>
      <ResumeDivider>
        <ResumeDividerTitle>Projects</ResumeDividerTitle>
        <ResumeDividerLine></ResumeDividerLine>
      </ResumeDivider>
      <ResumeProjects>
        <p>
          Links to my works can be found on{" "}
          <Link to='/work'>Lope.cell.vercel.app/work</Link> and more details can
          be provided upon request
        </p>
      </ResumeProjects>
    </ResumeBody>
  );
};

export default ResumeTemplate;
