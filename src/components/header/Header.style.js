import styledComponents from "styled-components";

export const HeaderWrapper = styledComponents.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--span-m);
    align-items: center;
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
`;

export const MenuIconLine = styledComponents.div`
    height: 1px;
    width: ${({ isLarge }) => (isLarge ? "40px" : "25px")};
    background: ${({ theme }) => theme.active};
`;
