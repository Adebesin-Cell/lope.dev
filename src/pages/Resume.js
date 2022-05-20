import React from "react";
import { ResumeContainer } from "../styles/Resume.style";
import ResumeTemplate from "../components/resume/ResumeTemplate";
import NavButton from "../components/navButtons/NavButton";
const Resume = function () {
  return (
    <React.Fragment>
      <ResumeContainer title='Resume'>
        <ResumeTemplate></ResumeTemplate>
      </ResumeContainer>
      <NavButton
        prev={{ url: "/work", text: "Work" }}
        next={{ url: "/contact", text: "Contact" }}
      />
    </React.Fragment>
  );
};

export default Resume;
