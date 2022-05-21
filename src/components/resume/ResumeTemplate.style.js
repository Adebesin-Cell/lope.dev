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

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-m) + 6px);
        line-height: 28px;
    }
`;

export const ResumeActions = styledComponents.div`
    display: flex;
    gap: var(--span-s);

    @media only screen and (max-width: 1140px) {
        gap: var(--span-xs);
    }

    @media only screen and (max-width: 990px) {
        gap: var(--span-s);
    }

    @media only screen and (max-width: 600px) {
        gap: var(--span-xs);
    }
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

    @media only screen and (max-width: 1140px) {
        font-size: calc(var(--size-xs) - 2px);
        line-height: 15px;
        gap: 2px;
    }


    span {
        @media only screen and (max-width: 990px) {
            display: none;
        }
    }

    span.icon {
        color: ${({ theme }) => theme.inactive};
        display: flex;
        align-items: center;
        justify-content: center;

        @media only screen and (max-width: 1140px) {
            display: flex;
        }

        @media only screen and (max-width: 990px) {
            color: ${({ theme }) => theme.active};
        }

        svg {
            width: 14px;
            height: 14px;

            @media only screen and (max-width: 1140px) {
                width: 12px;
                height: 12px;
            }

            @media only screen and (max-width: 990px) {
                width: 24px;
                height: 24px;
            }

            @media only screen and (max-width: 600px) {
                width: 18px;
                height: 18px;
            }
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

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-s));
        line-height: 23px;
    }
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

    @media only screen and (max-width: 600px) {
        padding-top: calc(var(--span-xs) + 5px);
    }
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
    gap: var(--span-s);
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

    @media only screen and (max-width: 600px) {
        padding-bottom: var(--span-s);
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.active};
    }
`;

export const ResumeExperienceTitle = styledComponents.h1`
    margin-top: 4px;
    margin-bottom: 4px;
    font-family: var(--Inter);
    font-size: calc(var(--size-m) );
    font-weight: var(--weight-xsm);
    font-style: italic;
    line-height: 25px;
    text-align: left;
    color: ${({ theme }) => theme.active};
`;

export const ResumeExperienceDate = styledComponents.p`
    margin-top: var(--span-xs);
    margin-bottom: calc(var(--span-xs) + 5px);
    text-transform: uppercase;
    font-family: var(--Inter);
    font-size: calc(var(--size-xs) - 1px);
    font-weight: var(--weight-xsm);
    line-height: 16px;
    text-align: left;
    color: ${({ theme }) => theme.workHeading};
`;

export const ResumeExperienceDescription = styledComponents.p`
    font-family: var(--Inter);
    font-size: calc(var(--size-s));
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.workHeading};
`;

export const ResumeExperienceAchievements = styledComponents.ul`
    margin-top: var(--span-xs);
    list-style-type: none;
`;

export const ResumeExperienceItem = styledComponents.li`
    display: flex;
    gap: var(--span-xs);
    font-family: var(--Inter);
    font-size: calc(var(--size-s));
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.workHeading};
    margin: 4px 0;

    span.icon {
        line-height: 24px;
        vertical-align: middle;
    }
`;
