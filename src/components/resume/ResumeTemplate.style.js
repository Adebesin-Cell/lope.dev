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
    text-align: left;
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
    text-align: left;
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
    font-size: calc(var(--size-s) + 2px);
    font-weight: var(--weight-xsm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.resumeTitle};
`;

export const ResumeSummary = styledComponents.p`
    padding-top: var(--span-m);
    padding-bottom: calc(var(--span-xs) + 5px);
    font-family: var(--Inter);
    font-size: calc(var(--size-s));
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.workHeading};
`;

export const ResumeDivider = styledComponents.div`
    display: flex;
    margin: calc(var(--span-xs) + 5px) 0;
    align-items: center;
    gap: 5px;
`;

export const ResumeDividerTitle = styledComponents.h3`
    font-family: var(--Inter);
    font-size: calc(var(--size-s) + 1px);
    font-weight: var(--weight-lg);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.resumeDivider};
`;

export const ResumeDividerLine = styledComponents.span`
    height: 1px;
    flex-grow: 1;
    background: ${({ theme }) => theme.resumeUnderline};
`;

export const ResumeSkills = styledComponents.p`
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.workHeading};
`;

export const ResumeExperienceContainer = styledComponents.div`
    display: grid;
    gap: var(--span-xs);
`;

export const ResumeExperience = styledComponents.ul`
    list-style-type: none;
`;

export const ResumeProjects = styledComponents.p`
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.workHeading};

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.active};
    }
`;
