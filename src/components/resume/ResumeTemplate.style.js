import styledComponents from "styled-components";

export const ResumeBody = styledComponents.div`
    display: flex;
    flex-direction: column;
`;

export const ResumeHeader = styledComponents.div`
    display: flex;
    justify-content: space-between;
`;

export const ResumeHeading = styledComponents.h1`
    font-family: var(--Inter);
    font-size: calc(var(--size-l) + 3px);
    font-weight: var(--weight-lg);
    line-height: 38px;
    color: ${({ theme }) => theme.text};
`;
