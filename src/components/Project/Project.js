import * as Icon from "react-feather";
import Card from "../UI/Card";
import {
	CardContainer,
	CardFooter,
	CardLink,
	ProjectDescription,
	ProjectDetails,
	ProjectHeading,
	ProjectStack,
} from "./Project.style";

const Project = (props) => {
	const classes = `${props.className} ${
		props.index % 2 !== 0 && props.index ? "card--pad" : ""
	}`;

	return (
		<Card className={classes} cardTheme={props.theme}>
			<CardContainer>
				<ProjectDetails>
					<ProjectHeading>{props.title}</ProjectHeading>
					<ProjectStack>{props.stack}</ProjectStack>
					<ProjectDescription className="paragraph">
						{props.description}
					</ProjectDescription>
				</ProjectDetails>
				<CardFooter className="footer">
					<CardLink href={props.live} target="_blank" rel="noopener noreferrer">
						<span className="icon">{<Icon.Eye />}</span>
						<span>Live</span>
					</CardLink>
					{!props.isPrivate && (
						<CardLink
							href={props.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="icon">{<Icon.GitMerge />}</span>
							<span>Code</span>
						</CardLink>
					)}
				</CardFooter>
			</CardContainer>
		</Card>
	);
};
export default Project;
