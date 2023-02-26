import styledComponents from 'styled-components';

export const CardContainer = styledComponents.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    backface-visibility: hidden;
    height: 100%;

`;

export const ProjectDetails = styledComponents.div`
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
`;

export const ProjectHeading = styledComponents.h1`
    font-family: var(--Inter);
    font-size: var(--size-l);
    font-weight: var(--weight-lg);
    line-height: 30px;
    color: ${({ theme }) => theme.cardHeader};
    backface-visibility: hidden;

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-m) + 4px);
        line-height: 24px;
    }
`;

export const ProjectStack = styledComponents.p`
    margin-top: var(--span-xs);
    text-transform: uppercase;
    font-family: var(--Inter);
    font-size: 10px;
    font-weight: var(--weight-md);
    line-height: 16px;
    color: ${({ theme }) => theme.cardStack};
    backface-visibility: hidden;
`;

export const ProjectDescription = styledComponents.p`
    margin-top: calc(var(--span-xs) + 2px);
    margin-bottom: calc(var(--span-xs) + 2px);
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-sm);
    line-height: 21px;
    color: ${({ theme }) => theme.cardDescription};
    min-height: ${({ className }) => (className ? '90px' : 'auto')};
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;

    @media only screen and (max-width: 990px) {
        min-height: 72px;
    }

    @media only screen and (max-width: 600px) {
        font-size: var(--size-xs);
        line-height: 18px;
    }
`;

export const CardFooter = styledComponents.div`
    display: flex;
    gap: var(--span-s);

    &.footer {
        @media only screen and (max-width: 990px) {
            margin-top: 0 !important;
        }
    }
`;

export const CardLink = styledComponents.a`
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--Inter);
    font-size: var(--size-xs);
    font-weight: var(--weight-xsm);
    line-height: 21px;
    color: ${({ theme }) => theme.cardStack};
    text-decoration: none;
    transition: all 300ms;


    &:hover {
        color: ${({ theme }) => theme.active};
    }

    &:hover span.icon {
        color: ${({ theme }) => theme.active};
    }

    span.icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.workHeading};
        width: 14px;
        height: 14px;
        transition: all 300ms;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;
