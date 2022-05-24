import {
  ErrorContainer,
  ErrorHeading,
  ErrorParagraph,
  ErrorLink,
} from "./Error.style";

const ErrorPage = function (props) {
  return (
    <ErrorContainer>
      <ErrorHeading>404</ErrorHeading>
      <ErrorParagraph>Seems like you got lost.</ErrorParagraph>
      <ErrorLink to='/' mytheme={props.theme}>
        Home
      </ErrorLink>
    </ErrorContainer>
  );
};

export default ErrorPage;
