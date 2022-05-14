import styledComponents from "styled-components";

export const ResumeContainer = styledComponents.div`
    padding: var(--span-m);
    background: ${({ theme }) => theme.resumeCard};
`;
