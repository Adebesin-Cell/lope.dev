import styledComponents from "styled-components";
import { Link } from "react-router-dom";

export const AppContainer = styledComponents.div`
    display: grid;
    grid-template-columns: 47% 1fr;
    overflow: hidden;
    max-height: 100vh;
`;

export const AppSidebar = styledComponents.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

export const AppView = styledComponents.div`
    padding: 10% 15% 10% 5%;
    overflow-y: scroll;
    height: 100vh;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const AppSidebarContent = styledComponents.div`
    padding: 10% 5% 10% 15%;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    flex-direction: column;
`;

export const AppSidebarHeading = styledComponents.h1`
    font-family: var(--Inter);
    font-size: ${({ isSmall }) =>
      isSmall ? `var(--size-m)` : `calc(var(--size-m) * 3.5)`};
    font-weight: var(--weight-xlg);
    line-height: 64px;
    text-align: left;
    color: ${({ theme }) => theme.text};

    @media only screen and (max-width: 1140px) {
        font-size: ${({ isSmall }) =>
          isSmall ? `var(--size-m)` : `calc(var(--size-m) * 2.5)`};
        line-height: 48px;
    }
    
`;

export const AppSidebarSpan = styledComponents.span`
    font-size: ${({ isSmall }) =>
      isSmall ? `calc(var(--size-m) + 4px)` : `inherit`};
    line-height:  ${({ isSmall }) => (isSmall ? `28px` : `inherit`)};
    display: block;
`;

export const AppSidebarParagraph = styledComponents.p`
    padding-top: var(--span-s);
    color: ${({ theme }) => theme.paragraph};
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-sm);
    line-height: 28px;
    padding-right: calc(2 * var(--span-2xl));

    @media only screen and (max-width: 1140px) {
        padding-right: 0;
    }
`;

export const AppSidebarHighlight = styledComponents.span`
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

    font-weight: var(--weight-md);
    color: ${({ theme }) => theme.highlight};

    &.animate {
        animation: 5s ease-in-out 0s 1 flash;
    }
`;

export const AppSidebarWrapper = styledComponents.div`
    display: flex;
    flex-direction: column;
`;

export const AppSidebarNav = styledComponents.nav`
    margin-top: var(--span-xl);
    display: flex;
    flex-direction: column;
`;

export const AppSidebarNavList = styledComponents.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: var(--span-s);
`;

export const AppSidebarNavItem = styledComponents.li`
    width: fit-content;
    display: flex;

    &:first-child a {
        color: ${({ path, theme }) =>
          path === "/" || path === "/work" ? theme.active : theme.inactive};

          .underline {
                background: ${({ path, theme }) =>
                  path === "/" || path === "/work"
                    ? theme.active
                    : theme.inactive};
                width: ${({ path }) =>
                  path === "/" || path === "/work" ? "80px" : "40px"}
            }
    }
`;

export const AppLink = styledComponents(Link)`
    display: flex;
    align-items: center;
    gap: calc(var(--span-xs) + 5px);
    font-family: var(--Inter);
    font-size: 10px;
    font-weight: var(--weight-xlg);
    line-height: 15px;
    color: ${({ active, theme }) => (active ? theme.active : theme.inactive)};
    text-decoration: none;
    text-transform: uppercase;
    transition: all .2s ease-in-out;


    .underline {
        background: ${({ active, theme }) =>
          active ? theme.active : theme.inactive};
        width: ${({ active }) => (active ? "80px" : "40px")}
    }

    &:hover {
        color: ${({ theme }) => theme.active};

        .underline {
            background: ${({ theme }) => theme.active};
            width: 80px;
        }
    }

`;

export const AppLinkUnderline = styledComponents.span`
    height: 1px;
    width: 40px;
    transition: all .2s ease-in-out;
`;

export const AppLinkName = styledComponents.span`
    font-family: inherit;
    line-height: inherit;
`;

export const AppSidebarFooter = styledComponents.div`
    display: flex;
    gap: var(--span-s);
`;

export const AppSidebarImage = styledComponents.img`
    display: block;
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    filter: brightness(60%);
`;

export const AppSidebarSocials = styledComponents.div`
    align-self: center;
    display: flex;
    gap: calc(var(--span-s) + 5px);

    .socials__link {
        display: flex;
        align-items: center;
        font-family: var(--Inter);
        font-size: var(--size-s);
        font-weight: var(--weight-sm);
        line-height: 21px;
        color: ${({ theme }) => theme.active};
        text-decoration: none;
        gap: calc(var(--span-xs) / 2 + 3px);

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;

            &--no-fill {
                svg {
                    fill: none !important;
                }
            }

            &--lg {
                svg {
                    width: 16px;
                    height: 16px;
                    fill: ${({ theme }) => theme.active};
                }
            }

            &--sm {
                svg {
                    width: 14px;
                    height: 14px;
                    stroke-width: 3px;
                }
            }
        }
    }
`;

export const AppCredit = styledComponents.p`
    margin-top: var(--span-m);
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
        font-weight: var(--weight-sm);
        transition: all 300ms;

        &:hover {
            text-decoration: underline;
            opacity: 1 !important;
        }
    }
`;
