import * as Icon from "react-feather";
import resume from "../../assets/images/avatar.jpg";
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
    </ResumeBody>
  );
};

export default ResumeTemplate;
