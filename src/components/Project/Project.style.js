import styledComponents from "styled-components";

export const ProjectHeading = styledComponents.h1`
    font-family: var(--Inter);
    font-size: var(--size-l);
    font-weight: var(--weight-lg);
    line-height: 30px;
    color: ${({ theme }) => theme.cardHeader};
`;
