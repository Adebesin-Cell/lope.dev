import styledComponents from "styled-components";

export const HeaderWrapper = styledComponents.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--span-s);
    align-items: center;
    position: relative;
    z-index: 5;
`;

export const MenuIcon = styledComponents.button`
    outline: none;
    border: none;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    gap: var(--span-xs);
    cursor: pointer;

    &.opened {
        min-height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &.opened .line {
        width: 25px !important;
        transition: all 300ms linear !important;
    }

    &.opened .line--large {
        transform: rotate(45deg) translateY(7px) !important;
        position: relative !important;
        top: 1px !important;
        transition: transform 300ms linear !important;
    }

    &.opened .line--small {
        transform: rotate(-45deg) translateY(-7px) !important;
        transition: transform 300ms linear !important;
    }
`;

export const MenuIconLine = styledComponents.span`
    height: 1px;
    width: ${({ isLarge }) => (isLarge ? "40px" : "25px")};
    background: ${({ theme }) => theme.active};
    transition: all 300ms linear;
`;
