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
    line-height: 33px;
    color: ${({ theme }) => theme.text};
`;

export const ResumeActions = styledComponents.div`
    display: flex;
    gap: var(--span-s);
`;

export const ResumeActionButton = styledComponents.a`
    display: flex;
    gap: 3px;
    font-family: var(--Inter);
    font-size: calc(var(--size-xs));
    font-weight: var(--weight-sm);
    line-height: 15px;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    align-self: start;

    span.icon {
        color: ${({ theme }) => theme.inactive};
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

export const ResumeTitle = styledComponents.p`
    margin-top: var(--span-xs);
    font-family: var(--Inter);
    font-size: calc(var(--size-s));
    font-weight: var(--weight-sm);
    line-height: 23px;
    color: ${({ theme }) => theme.resumeTitle};
`;
