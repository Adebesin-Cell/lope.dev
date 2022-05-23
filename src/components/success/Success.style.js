import styledComponents from "styled-components";

export const SuccessContainer = styledComponents.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.body};
    display: none;
`;
