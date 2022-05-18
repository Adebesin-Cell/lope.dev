import styledComponents from "styled-components";

export const LogoBox = styledComponents.div`
    display: flex;

    a {
        display: inline-block;
        text-decoration: none;
        font-family: var(--Inter);
        font-size: calc(var(--size-l) + 3px);
        font-weight: var(--weight-xlg);
        line-height: 30px;
        text-align: left;
        color: ${({ theme }) => theme.text};
    }
`;
