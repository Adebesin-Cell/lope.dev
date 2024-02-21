import React from "react";
import Helmet from "react-helmet";
import NavButton from "../components/navButtons/NavButton";
import ResumeTemplate from "../components/resume/ResumeTemplate";
import { ResumeContainer } from "../styles/Resume.style";

const Resume = () => (
	<React.Fragment>
		<Helmet>
			<title> Resume | Lope - Adebesin Tolulope </title>
		</Helmet>
		<ResumeContainer title="Resume">
			<ResumeTemplate />
		</ResumeContainer>
		<NavButton
			prev={{ url: "/work", text: "Work" }}
			next={{ url: "/contact", text: "Contact" }}
		/>
	</React.Fragment>
);

export default Resume;
