import styledComponents from "styled-components";

export const WorkWrapper = styledComponents.div`
    display: grid;
    grid-template-columns: 1fr;
`;

export const WorkContainer = styledComponents.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--span-xs);
    margin-bottom: var(--span-xl);
    backface-visibility: hidden;

    @media only screen and (max-width: 990px) {
        gap: var(--span-xl);
    }

    @media only screen and (max-width: 600px) {
        gap: var(--span-m);
    }

    & p.paragraph {
        height: auto;
        min-height: auto;

        @media only screen and (max-width: 990px) {
            min-height: 72px ;
        }
    }


    &:hover .card {
        opacity: 0.5;

        @media only screen and (max-width: 990px) {
            opacity: 1;
        }
    }

    .card:hover {
        opacity: 1;
    }
`;

export const WorkContainerHalf = styledComponents.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: var(--span-xs);
    backface-visibility: hidden;

    @media only screen and (max-width: 990px) {
        grid-template-columns: repeat(1, 1fr);
        gap: var(--span-xl);
    }


    @media only screen and (max-width: 600px) {
        gap: var(--span-m);
    }

    & div.footer {
        margin-top: calc(var(--span-s) + 4px);
    }


    &:hover .card {
        opacity: 0.5;

        @media only screen and (max-width: 990px) {
            opacity: 1;
        }
    }

    .card:hover {
        opacity: 1;
    }
`;

export const WorkHeading = styledComponents.h1`
    margin: calc(var(--span-xs) + 2px) 0;
    font-family: var(--Inter);
    font-size: var(--size-xs);
    font-weight: var(--weight-xxlg);
    line-height: 16px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.workHeading};

    &.span--2 {
        grid-column: span 2;
    }
`;

export const WorkContainerHeader = styledComponents.div`
    display: block;
`;

export const WorkList = styledComponents.ul`
    list-style-type: none;
    display: grid;
    grid-column: span 2;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--span-xs);
    backface-visibility: hidden;

    @media only screen and (max-width: 990px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 30px;
    }

    &:nth-child(3) {
        margin-top: var(--span-s);
    }
`;
