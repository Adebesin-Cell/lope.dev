import styledComponents from "styled-components";

export const SuccessContainer = styledComponents.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.body};
    display: flex;
    align-items: center;
    justify-content: center;
    display: ${({ display }) => (display ? display : "none")};

    &.hidden {
        display: none;
    }
`;

export const SuccessBody = styledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SuccessIcon = styledComponents.div`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({ theme }) => theme.success};
    color: ${({ theme }) => theme.formButtonTxt};

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const SuccessHeading = styledComponents.h3`
    margin-top: var(--span-xs);
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-lg);
    line-height: 20px;
    color: ${({ theme }) => theme.active};
    text-align: center;
`;

export const SuccessParagraph = styledComponents.p`
    margin-top: var(--span-xs);
    font-family: var(--Inter);
    font-size: var(--size-xs);
    font-weight: var(--weight-sm);
    line-height: 16px;
    color: ${({ theme }) => theme.active};
    text-align: center;
`;

export const SuccessLink = styledComponents.button`
    cursor: pointer;
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
