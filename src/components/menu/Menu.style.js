import styledComponents from "styled-components";

export const MenuContainer = styledComponents.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.btn_bg};

    @media only screen and (max-width: 990px) {
        display: flex;
    }
`;

export const MenuNav = styledComponents.nav`
    width: 100%;

    @media only screen and (max-width: 990px) {
        padding: calc(var(--span-2xl) + var(--span-s)) var(--span-l);
        padding-bottom: calc(var(--span-2xl));
    }

    @media only screen and (max-width: 768px) {
        padding: calc(var(--span-2xl) + var(--span-s)) var(--span-m);
        padding-bottom: calc(var(--span-2xl));
    }

    @media only screen and (max-width: 600px) {
        padding: calc(var(--span-2xl) + var(--span-s)) var(--span-s);
        padding-bottom: calc(var(--span-2xl));
    }
`;
