import styledComponents from "styled-components";

export const CardWrapper = styledComponents.div`
    background: ${({ theme }) => theme.card};
    padding: var(--span-l);
    transition: all 300ms;
    cursor: default;
    backface-visibility: hidden;

    @media only screen and (max-width: 1140px) {
        padding-left: var(--span-m);
    }

    &.card--pad {
        transform: translateY(24px);

        @media only screen and (max-width: 990px) {
            transform: translateY(0);
        }
    }

    &:hover {
        backface-visibility: hidden;
        transform: scale(1.1);

        @media only screen and (max-width: 990px) {
            transform: scale(1);
        }
    }
`;
