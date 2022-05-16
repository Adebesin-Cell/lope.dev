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
    z-index: 4;
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

export const FormButton = styledComponents(Button)`
    width: 100%;
    background: ${({ theme }) => theme.formButtonBg};
    height: 55px;
    font-family: var(--Inter);
    font-size: var(--size-m);
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: center;
    color: ${({ theme }) => theme.formButtonTxt};
`;
