import styledComponents from "styled-components";

export const CardContainer = styledComponents.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    backface-visibility: hidden;
`;

export const ProjectDetails = styledComponents.div`
    display: block;
    backface-visibility: hidden;

`;

export const ProjectHeading = styledComponents.h1`
    font-family: var(--Inter);
    font-size: var(--size-l);
    font-weight: var(--weight-lg);
    line-height: 30px;
    color: ${({ theme }) => theme.cardHeader};
    backface-visibility: hidden;

`;

export const ProjectStack = styledComponents.p`
    margin-top: var(--span-xs);
    text-transform: uppercase;
    font-family: var(--Inter);
    font-size: 10px;
    font-weight: var(--weight-md);
    line-height: 16px;
    color: ${({ theme }) => theme.cardStack};
    backface-visibility: hidden;

`;
