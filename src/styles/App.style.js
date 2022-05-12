import styledComponents from "styled-components";

export const AppContainer = styledComponents.div`
    display: grid;
    grid-template-columns: 47% 1fr;
`;

export const AppSidebar = styledComponents.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

export const AppView = styledComponents.div`
    padding: 10% 15% 10% 5%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    // &::-webkit-scrollbar-thumb {
    //     background: ${({ theme }) => theme.scrollbar};
    // }

    // &::-webkit-scrollbar-track {
    //     background: ${({ theme }) => theme.scrollbar_track};
    // }
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
    font-size: var(--size-xl);
    font-weight: var(--weight-xlg);
    line-height: 36px;
    text-align: left;
    color: ${({ theme }) => theme.text};
`;

export const AppSidebarSpan = styledComponents.span`
    display: block;
`;
