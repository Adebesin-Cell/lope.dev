import styledComponents from "styled-components";

export const Button = styledComponents.button`
    background: transparent;
    border: none;
    outlne: none;
    cursor: pointer;
`;

export const ThemeButton = styledComponents(Button)`
    background: ${({ theme }) => theme.btn_bg};
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1));
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transition: all 300ms;
    color: ${({ theme }) => theme.text};

    svg {
        width: 16px;
        height: 16px;
    }

`;
