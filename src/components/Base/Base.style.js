import styledComponents from "styled-components";
import { Link } from "react-router-dom";

export const BaseContainer = styledComponents.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
`;

export const BaseIntro = styledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BaseIntroImageContainer = styledComponents.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const BaseIntroImage = styledComponents.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;

    @media only screen and (max-width: 600px) {
        width: 64px;
        height: 64px;
    }
`;

export const BaseIntroHeading = styledComponents.h1`
    margin-top: var(--span-s);
    font-family: var(--Inter);
    font-size: calc(var(--size-xl));
    font-weight: var(--weight-md);
    line-height: 38px;
    text-align: left;
    color: ${({ theme }) => theme.active};
    text-align: center;

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-l));
        line-height: 27px;
    }

    span {
        display: block;
        font-size: var(--size-m);
        font-weight: var(--weight-md);
        line-height: 23px;

        @media only screen and (max-width: 600px) {
            font-size: var(--size-xs);
            line-height: 16px;
        }
    }
    
`;

export const BaseIntroParagraph = styledComponents.p`
    padding-top: var(--span-xs);
    color: ${({ theme }) => theme.paragraph};
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-sm);
    line-height: 25px;
    text-align: center;

    @media only screen and (max-width: 990px) {
        padding-right: calc(var(--span-2xl) + var(--span-s));
        padding-left: calc(var(--span-2xl) + var(--span-s));
    }

    @media only screen and (max-width: 600px) {
        padding-right: 0;
        padding-left: 0;
    }
`;

export const BaseIntroParagraphHighlight = styledComponents.span`
    @keyframes flash {
        0% {
            color: #777778;
        }

        20% {
            color: #cecece;
        }

        30% {
            color: #ffffff;
        }

        40% {
            color: #b4b4b4;
        }

        45% {
            color: #777778;
        }

        100% {
            color: #fff;
        }
    }

    animation: 5s ease-in-out 0s 1 flash;
    font-weight: var(--weight-md);
    color: ${({ theme }) => theme.highlight};
`;

export const BaseIntroLink = styledComponents(Link)`
    margin-top: var(--span-m);
    text-decoration: none;

    

    & button {
        display: flex;
        padding: calc(var(--span-xs) + 5px) var(--span-m);
        align-items: center;
        gap: var(--span-xs);
        color: ${({ theme }) => theme.active};
        background: ${({ theme }) => theme.btn_bg};
        font-family: var(--Inter);
        font-size: var(--size-m);
        font-weight: var(--weight-sm);
        line-height: 21px;
        border: 1px solid transparent;
        transition: all 300ms;
        outline: none;

        &:hover, &:focus {
            border: 1px solid ${({ theme }) => theme.btn_border};
            background: ${({ theme }) => theme.btn_bg};
        }
    }


    span.icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const BaseIntroButton = styledComponents.button`
    filter: ${({ mytheme }) =>
      mytheme === "dark"
        ? "none"
        : "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1))"};
`;

// & svg {
//     ${(props) => props.current && 'transform: scale(1.1)'};
//   }

//   & span {
//     color: ${(props) =>
//       props.current ? props.theme.text : props.theme.inactive};
//   }
