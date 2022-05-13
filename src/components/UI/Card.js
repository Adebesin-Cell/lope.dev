import { CardWrapper } from "./Card.style";

const Card = function (props) {
  return <CardWrapper>{props.children}</CardWrapper>;
};

export default Card;
