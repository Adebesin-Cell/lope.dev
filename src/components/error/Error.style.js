import { Link } from "react-router-dom";
import styledComponents from "styled-components";

export const ErrorContainer = styledComponents.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.body};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ErrorHeading = styledComponents.h1`
    font-family: var(--Inter);
    font-size: calc(var(--size-2xl) * 2);
    font-weight: var(--weight-xlg);
    font-style: italic;
    line-height: 96px;
    text-align: center;
    color: ${({ theme }) => theme.active};

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-2xl) * 1.2);
        line-height: 60px;
    }
`;

export const ErrorParagraph = styledComponents.p`
    padding-top: calc(var(--span-xs) + 5px);
    font-family: var(--Inter);
    font-size: calc(var(--size-m) + 2px);
    font-weight: var(--weight-md);
    font-style: normal;
    line-height: 23px;
    text-align: center;
    color: ${({ theme }) => theme.paragraph};

    @media only screen and (max-width: 600px) {
        padding-top: var(--span-xs);
        font-size: var(--size-s);
        line-height: 20px;
    }
`;

export const ErrorLink = styledComponents(Link)`
    width: 15%;
    margin-top: var(--span-m);
    text-decoration: none;
    display: flex;
    padding: calc(var(--span-xs) + 2px) var(--span-l);
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.active};
    background: ${({ theme }) => theme.btn_bg};
    font-family: var(--Inter);
    font-size: calc(var(--size-xs) + 1px);
    font-weight: var(--weight-sm);
    line-height: 18px;
    border: 1px solid transparent;
    transition: border 300ms;
    outline: none;
    filter: ${({ mytheme }) =>
      mytheme === "dark"
        ? "none"
        : "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1))"};

    &:hover, &:focus {
        border: 1px solid ${({ theme }) => theme.btn_border};
        background: ${({ theme }) => theme.btn_bg};
    }

    @media only screen and (max-width: 768px) {
        width: 20%;
    }

    @media only screen and (max-width: 600px) {
        width: 45%;
    }
`;
