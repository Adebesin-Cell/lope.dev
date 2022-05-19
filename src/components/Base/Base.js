import {
  BaseContainer,
  BaseIntro,
  BaseIntroImageContainer,
  BaseIntroImage,
  BaseIntroHeading,
  BaseIntroParagraph,
  BaseIntroParagraphHighlight,
  BaseIntroLink,
  BaseIntroButton,
} from "./Base.style";
import avatar from "../../assets/images/avatar.jpg";
import * as Icon from "react-feather";

const Base = function (props) {
  console.log(props.theme);
  return (
    <BaseContainer>
      <BaseIntro>
        <BaseIntroImageContainer>
          <BaseIntroImage src={avatar}></BaseIntroImage>
        </BaseIntroImageContainer>
        <BaseIntroHeading>
          <span>Hello, I'm</span> Adebesin Tolulope
        </BaseIntroHeading>
        <BaseIntroParagraph>
          I'm a frontend developer. I create interactive
          <BaseIntroParagraphHighlight>
            {" "}
            experiences{" "}
          </BaseIntroParagraphHighlight>
          with modern
          <BaseIntroParagraphHighlight>
            {" "}
            web technologies.{" "}
          </BaseIntroParagraphHighlight>
          I'm currently learning how to
          <BaseIntroParagraphHighlight>
            {" "}
            design products
          </BaseIntroParagraphHighlight>{" "}
          and create beautiful web
          <BaseIntroParagraphHighlight> animations</BaseIntroParagraphHighlight>
          .
        </BaseIntroParagraph>
        <BaseIntroLink to='/work'>
          <BaseIntroButton mytheme={props.theme}>
            <span>Explore</span>{" "}
            <span className='icon'>{<Icon.ChevronRight />}</span>
          </BaseIntroButton>
        </BaseIntroLink>
      </BaseIntro>
    </BaseContainer>
  );
};

export default Base;
