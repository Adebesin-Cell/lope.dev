import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        transition: all 300ms linear;
        overflow: hidden;
        
        @media only screen and (min-width: 1799px) {
            max-width: 1440px;
            position: relative;
            margin: 0 auto;
        }
    }
`;
