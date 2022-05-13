import { CardWrapper } from "./Card.style";

const Card = function (props) {
  return (
    <CardWrapper className={props.className}>{props.children}</CardWrapper>
  );
};

export default Card;
