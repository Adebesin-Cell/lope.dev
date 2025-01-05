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
						I'm a fullstack Engineer with 3+ years of experience in web
						development. I specialize in building
						<BaseIntroParagraphHighlight>
							{" "}
							user-friendly web solutions{" "}
						</BaseIntroParagraphHighlight>
						that drive results. Currently working with
						<BaseIntroParagraphHighlight>
							{" "}
							backend development, LLMs and blockchain technologies{" "}
						</BaseIntroParagraphHighlight>
						, including
						<BaseIntroParagraphHighlight>
							{" "}
							AI-powered applications
						</BaseIntroParagraphHighlight>
						.
					</BaseIntroParagraph>
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
