import {
  BaseContainer,
  BaseIntro,
  BaseIntroImageContainer,
  BaseIntroImage,
  BaseIntroHeading,
  BaseIntroParagraph,
  BaseIntroParagraphHighlight,
  BaseIntroLink,
} from "./Base.style";
import avatar from "../../assets/images/avatar.jpg";
import * as Icon from "react-feather";

const Base = function () {
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
          <button>
            <span>Explore</span>{" "}
            <span className='icon'>{<Icon.ChevronRight />}</span>
          </button>
        </BaseIntroLink>
      </BaseIntro>
    </BaseContainer>
  );
};

export default Base;
