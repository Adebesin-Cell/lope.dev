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


    &:hover .card {
        opacity: 0.5;
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


    &:hover .card {
        opacity: 0.5;
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
    gap: var(--span-xs);
    backface-visibility: hidden;


    &:nth-child(3) {
        margin-top: var(--span-s);
    }
`;
