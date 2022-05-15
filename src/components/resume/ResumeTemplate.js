import * as Icon from "react-feather";
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
      company: "Zealarax Technologies",
      position: "Frontend Developer [Intern]",
      startDate: "January 2021",
      endDate: "January 2022",
      description: "",
      achievements: [],
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
        <ResumeExperience>&nbsp;</ResumeExperience>
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
