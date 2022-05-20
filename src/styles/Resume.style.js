import styledComponents from "styled-components";

export const ResumeContainer = styledComponents.div`
    padding: var(--span-m);
    background: ${({ theme }) => theme.resumeCard};

    @media only screen and (max-width: 600px) {
        padding: calc(var(--span-xs) + 5px);
    }
`;
