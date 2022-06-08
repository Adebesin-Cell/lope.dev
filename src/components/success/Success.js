import {
  SuccessContainer,
  SuccessBody,
  SuccessIcon,
  SuccessHeading,
  SuccessParagraph,
  SuccessLink,
} from "./Success.style";
import * as Icon from "react-feather";

const Success = function (props) {
  return (
    <SuccessContainer
      className={props.modalIsHidden ? "hidden" : ""}
      display={props.display}
    >
      <SuccessBody>
        <SuccessIcon>
          <Icon.Check />
        </SuccessIcon>
        <SuccessHeading>Your message has been sent.</SuccessHeading>
        <SuccessParagraph>
          Thanks for reaching out. I'll reply the mail within 24 hours.
        </SuccessParagraph>
        <SuccessLink onClick={props.hideModal}>Thanks</SuccessLink>
      </SuccessBody>
    </SuccessContainer>
  );
};

export default Success;
