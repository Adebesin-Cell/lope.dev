import React from 'react';
import { ResumeContainer } from '../styles/Resume.style';
import ResumeTemplate from '../components/resume/ResumeTemplate';
import NavButton from '../components/navButtons/NavButton';
import Helmet from 'react-helmet';

const Resume = function () {
  return (
    <React.Fragment>
      <Helmet>
        <title> Resume | Lope - Adebesin Tolulope </title>
      </Helmet>
      <ResumeContainer title='Resume'>
        <ResumeTemplate />
      </ResumeContainer>
      <NavButton
        prev={{ url: '/work', text: 'Work' }}
        next={{ url: '/contact', text: 'Contact' }}
      />
    </React.Fragment>
  );
};

export default Resume;
