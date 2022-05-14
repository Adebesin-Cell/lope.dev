import * as Icon from "react-feather";

import {
  ResumeBody,
  ResumeHeader,
  ResumeHeading,
  ResumeActions,
  ResumeActionButton,
  ResumeTitle,
} from "./ResumeTemplate.style";

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
            href=''
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
    </ResumeBody>
  );
};

export default ResumeTemplate;
