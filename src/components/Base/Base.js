import * as Icon from "react-feather";
import Helmet from "react-helmet";
import avatar from "../../assets/images/funavatar.JPG";
import {
	BaseContainer,
	BaseIntro,
	BaseIntroButton,
	BaseIntroHeading,
	BaseIntroImage,
	BaseIntroImageContainer,
	BaseIntroLink,
	BaseIntroParagraph,
	BaseIntroParagraphHighlight,
} from "./Base.style";

const Base = (props) => {
	return (
		<>
			<Helmet>
				<title> Lope - Adebesin Tolulope </title>
			</Helmet>
			<BaseContainer>
				<BaseIntro>
					<BaseIntroImageContainer>
						<BaseIntroImage src={avatar} />
					</BaseIntroImageContainer>
					<BaseIntroHeading>
						<span>Hi 👋 I'm</span> Tolulope Adebesin
					</BaseIntroHeading>
					<BaseIntroParagraph>
						I'm a full-stack engineer with 3+ years in web development, always
						exploring new technologies and innovative approaches. I've worked on
						a range of production-level projects spanning
						<BaseIntroParagraphHighlight>
							{" "}
							frontend, backend, DevOps, blockchain, and LLMs
						</BaseIntroParagraphHighlight>
						. In my free time, I read and write articles, study my school books,
						watch animes, play basketball, and enjoy reading novels—
						<BaseIntroParagraphHighlight>
							{" "}
							Not a Penny More, Not a Penny Less
						</BaseIntroParagraphHighlight>{" "}
						is still one of my favorites.
					</BaseIntroParagraph>{" "}
					<BaseIntroLink to="/work">
						<BaseIntroButton mytheme={props.theme}>
							<span>Explore</span>{" "}
							<span className="icon">{<Icon.ChevronRight />}</span>
						</BaseIntroButton>
					</BaseIntroLink>
				</BaseIntro>
			</BaseContainer>
		</>
	);
};
export default Base;
