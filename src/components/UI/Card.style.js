import styledComponents from "styled-components";

export const CardWrapper = styledComponents.div`
    background: ${({ theme }) => theme.card};
    padding: var(--span-l);
    transition: all 300ms;
    cursor: default;
    backface-visibility: hidden;

    &:hover {
        backface-visibility: hidden;
        transform: scale(1.1);
    }
`;
