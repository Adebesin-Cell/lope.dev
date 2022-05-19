import styledComponents from "styled-components";

export const WorkBox = styledComponents.div`
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 990px) {
        margin: 0 var(--span-xs);
    }
`;
