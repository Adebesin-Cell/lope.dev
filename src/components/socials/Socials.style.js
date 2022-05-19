import styledComponents from "styled-components";

export const SocialsContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SocialsIcons = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SocialIcon = styledComponents.a`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.active};
    padding: var(--span-xs) var(--span-s);

    span {
        svg {
            fill: none;
        }
    }

    svg {
        width: 20px;
        height: 20px;
        fill: ${({ theme }) => theme.active};
    }
`;

export const SocialsCredit = styledComponents.p`
    font-family: var(--Inter);
    font-size: var(--size-xs);
    font-weight: var(--weight-sm);
    line-height: 18px;
    color: ${({ theme }) => theme.inactive};
    opacity: 0.75;

    a {
        text-transform: capitalize;
        color: ${({ theme }) => theme.active};
        text-decoration: none;
        font-weight: var(--weight-lg);
        transition: all 300ms;

        &:hover {
            text-decoration: underline;
            opacity: 1 !important;
        }
    }
`;
