import { Link } from "react-router-dom";
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
    animation: fadeIn 300ms linear 1;

    @keyframes fadeIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @media only screen and (max-width: 990px) {
        display: flex;
    }
`;

export const MenuNav = styledComponents.nav`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 990px) {
        padding: calc(var(--span-2xl) + var(--span-2xl)) var(--span-l);
        padding-bottom: calc(var(--span-2xl) + var(--span-s));
    }

    @media only screen and (max-width: 768px) {
        padding: calc(var(--span-2xl) + var(--span-xl)) var(--span-m);
        padding-bottom: calc(var(--span-2xl) + var(--span-xs));
    }

    @media only screen and (max-width: 600px) {
        padding: calc(var(--span-2xl) + var(--span-s)) var(--span-s);
        padding-bottom: calc(var(--span-2xl));
    }
`;

export const MenuNavList = styledComponents.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const MenuNavItem = styledComponents.li`
    margin: calc(var(--span-xs) + 5px) 0;
    display: flex;
    justify-content: center;
`;

export const MenuNavLink = styledComponents(Link)`
    text-decoration: none;
    font-family: var(--Inter);
    font-size: calc(var(--size-m) + 4px);
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: center;
    color: ${({ theme }) => theme.workHeading};

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-m) + 2px);
        line-height: 21px;
    }
`;

export const MenuSocials = styledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MenuSocialsHeading = styledComponents.h1`
    margin: var(--span-s) 0;
    font-family: var(--Inter);
    font-size: calc(var(--size-m) + 2px);
    font-weight: var(--weight-lg);
    line-height: 23px;
    text-align: center;
    color: ${({ theme }) => theme.active};
    text-transform: capitalize;
`;

export const MenuSocialsList = styledComponents.div`
    display: flex;
    gap: calc(var(--span-s));
    margin-top: var(--span-s);
    margin-left: 7.5px;
    margin-right: 7.5px;

    a {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${({ theme }) => theme.active};
            
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }

    a span.icon--fill {
        svg {
            fill: ${({ theme }) => theme.active};
        }
    }
`;
