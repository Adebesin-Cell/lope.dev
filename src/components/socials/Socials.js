import * as Icon from "react-feather";
import IQWikiLogo from "../../assets/IQWikiLogo";
import {
	SocialIcon,
	SocialsContainer,
	SocialsCredit,
	SocialsIcons,
} from "./Socials.style";

const Socials = () => {
	return (
		<SocialsContainer>
			<SocialsIcons>
				<SocialIcon
					href="https://www.linkedin.com/in/adebesin-tolulope/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon.Linkedin aria-label="LinkedIn" />
				</SocialIcon>
				<SocialIcon
					href="https://github.com/Adebesin-Cell"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true" aria-label="GitHub">
						<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
					</svg>
				</SocialIcon>
				<SocialIcon
					href="https://iamlope.medium.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 30 30"
						width="30px"
						height="30px"
						aria-label="Medium"
					>
						<title>Medium</title>
						<path d="M8.5 7A8.5 8.5 0 108.5 24 8.5 8.5 0 108.5 7zM22 8A4 7.5 0 1022 23 4 7.5 0 1022 8zM28.5 9A1.5 6.5 0 1028.5 22 1.5 6.5 0 1028.5 9z" />
					</svg>
				</SocialIcon>
				<SocialIcon
					href="https://iq.wiki/wiki/adebesin-tolulope/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IQWikiLogo aria-label="IQ Wiki" />
				</SocialIcon>
			</SocialsIcons>
			<SocialsCredit>
				<span>Inspired By </span>
				<a
					href="https://dribbble.com/NicolasMzrd"
					target="_blank"
					rel="noopener noreferrer"
				>
					Nicolas Meuzard
				</a>
			</SocialsCredit>
		</SocialsContainer>
	);
};
export default Socials;
