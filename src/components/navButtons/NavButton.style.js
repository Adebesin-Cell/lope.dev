import { Link } from "react-router-dom";
import styledComponents from "styled-components";

export const NavButtonContainer = styledComponents.div`
    display: none;
    justify-content: center;
    margin-top: var(--span-2xl);
    margin-bottom: var(--span-xl);

    @media only screen and (max-width: 990px) {
        display: flex;
    }
`;

export const NavButtonWrapper = styledComponents.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--span-xs);
    width: 75%;

    @media only screen and (max-width: 600px) {
        width: 85%;
    }

    a {
        text-decoration: none;
        display: flex;
        padding: calc(var(--span-xs) + 2px) var(--span-l);
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.active};
        background: ${({ theme }) => theme.btn_bg};
        font-family: var(--Inter);
        font-size: var(--size-xs);
        font-weight: var(--weight-sm);
        line-height: 18px;
        border: 1px solid transparent;
        transition: all 300ms;
        outline: none;

        &:hover, &:focus {
            border: 1px solid ${({ theme }) => theme.btn_border};
            background: ${({ theme }) => theme.btn_bg};
        }
    }
`;

export const NavLink = styledComponents(Link)`
    filter: ${({ mytheme }) =>
      mytheme === "dark"
        ? "none"
        : "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1))"};
`;
