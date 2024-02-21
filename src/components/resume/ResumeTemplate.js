import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import resume from "../../assets/resume.pdf";
import {
	ResumeActionButton,
	ResumeActions,
	ResumeBody,
	ResumeDivider,
	ResumeDividerLine,
	ResumeDividerTitle,
	ResumeExperience,
	ResumeExperienceAchievements,
	ResumeExperienceContainer,
	ResumeExperienceDate,
	ResumeExperienceDescription,
	ResumeExperienceItem,
	ResumeExperienceTitle,
	ResumeHeader,
	ResumeHeading,
	ResumeProjects,
	ResumeSkills,
	ResumeSummary,
	ResumeTitle,
} from "./ResumeTemplate.style";

const resumeObj = {
	coreSkills: [
		"Next.js",
		"TRPC",
		"React.js",
		"Tailwind CSS",
		"Chakra UI",
		"Firebase",
		"Github",
		"Javascript",
		"CSS/SCSS",
		"HTML",
	],

	familiarSkills: [
		"RTK",
		"React Query",
		"Rainbow Toolkit",
		"Figma",
		"Adobe XD",
		"NPM",
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
				"Gained foundational and intermediate frontend development skills while working with the Zealarax Team.",
				"Collaborated with Laravel and PHP developers to revamp a website that is being utilized by over 3000 university students. (University of Abuja)",
				"Teamed up with Laravel developers to build a web application specifically designed for a high school environment. (Poly International College)",
				"Developed basic web components using SCSS, enhancing the user interface and experience.",
				"Actively involved in the testing and debugging bugs during the revamp of the Univeristy of Abuja site.",
			],
		},
		{
			id: uuid(),
			company: "IQ.Wiki - Braindao - Everipedia",
			position: "Junior Frontend Engineer",
			startDate: "September 2022",
			endDate: "",
			description: "",
			achievements: [],
		},
	],

	onTheJob: ["Version Control", "CI/CD", "Best Practices", "SEO"],
};

const ResumeTemplate = () => (
	<ResumeBody>
		<ResumeHeader>
			<ResumeHeading>Adebesin Tolulope</ResumeHeading>
			<ResumeActions>
				<ResumeActionButton
					href="https://www.linkedin.com/in/adebesin-tolulope"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="icon">
						<Icon.Linkedin />
					</span>
					<span>LinkedIn</span>
				</ResumeActionButton>
				<ResumeActionButton
					download={true}
					href={resume}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="icon">
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
			the focus when developing products using the best web tools, technologies
			and languages.
		</ResumeSummary>
		<ResumeDivider>
			<ResumeDividerTitle>Core Technologies</ResumeDividerTitle>
			<ResumeDividerLine />
		</ResumeDivider>
		<ResumeSkills>{resumeObj.coreSkills.join(", ")}.</ResumeSkills>
		<ResumeDivider>
			<ResumeDividerTitle>Familiar With</ResumeDividerTitle>
			<ResumeDividerLine />
		</ResumeDivider>
		<ResumeSkills>{resumeObj.familiarSkills.join(", ")}.</ResumeSkills>
		<ResumeDivider>
			<ResumeDividerTitle>On The Job</ResumeDividerTitle>
			<ResumeDividerLine />
		</ResumeDivider>
		<ResumeSkills>{resumeObj.onTheJob.join(", ")}.</ResumeSkills>
		<ResumeDivider>
			<ResumeDividerTitle>Work Experience</ResumeDividerTitle>
			<ResumeDividerLine />
		</ResumeDivider>
		<ResumeExperienceContainer>
			{resumeObj.experience.map((experience, index) => (
				<ResumeExperience key={experience.id} id={experience.id}>
					<ResumeExperienceTitle>
						{experience.company} - {experience.position}
					</ResumeExperienceTitle>
					<ResumeExperienceDate>
						{experience.startDate} -{" "}
						{!experience.endDate ? "Present" : experience.endDate}
					</ResumeExperienceDate>
					<ResumeExperienceDescription>
						{experience.description}
					</ResumeExperienceDescription>
					{experience.achievements.map((achievement, index) => (
						<ResumeExperienceAchievements key={`${experience.id}__`}>
							<ResumeExperienceItem>
								<span className="icon">■</span>
								<span>{achievement}</span>
							</ResumeExperienceItem>
						</ResumeExperienceAchievements>
					))}
				</ResumeExperience>
			))}
		</ResumeExperienceContainer>
		<ResumeDivider>
			<ResumeDividerTitle>Projects</ResumeDividerTitle>
			<ResumeDividerLine />
		</ResumeDivider>
		<ResumeProjects>
			<span>
				Links to my works can be found on{" "}
				<Link to="/work">Lope.cell.vercel.app/work</Link> and more details can
				be provided upon request
			</span>
		</ResumeProjects>
	</ResumeBody>
);

export default ResumeTemplate;
