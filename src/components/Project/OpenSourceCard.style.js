import styled from "styled-components";

export const OSCardWrapper = styled.div`
  margin-top: 2rem;
`;

export const OSCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const OSCardContent = styled.div`
  margin-top: 1rem;
`;

export const OSCardTitle = styled.h3`
  font-family: var(--Inter);
    font-size: var(--size-l);
    font-weight: var(--weight-lg);
    line-height: 30px;
    color: ${({ theme }) => theme.cardHeader};
    backface-visibility: hidden;
    transition: color 0.2s ease;

    @media only screen and (max-width: 600px) {
        font-size: calc(var(--size-m) + 4px);
        line-height: 24px;
    }
`;

export const OSCardDescription = styled.p`
  margin-top: calc(var(--span-xs) + 2px);
    margin-bottom: calc(var(--span-xs) + 2px);
    font-family: var(--Inter);
    font-size: var(--size-s);
    font-weight: var(--weight-sm);
    line-height: 21px;
    color: ${({ theme }) => theme.cardDescription};
    min-height: ${({ className }) => (className ? "90px" : "auto")};
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;

    @media only screen and (max-width: 990px) {
        min-height: 72px;
    }

    @media only screen and (max-width: 600px) {
        font-size: var(--size-xs);
        line-height: 18px;
        min-height: 40px;
    }
`;

export const OSContributionList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--Inter);
  color: ${({ theme }) => theme.cardHeader};
`;

export const OSContributionItem = styled.a`
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  text-decoration: none;
  font-family: var(--Inter);

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
    
    ${() => OSContributionTitle} {
      text-decoration: underline;
    }
  }
`;

export const OSContributionIcon = styled.span`
  margin-right: 0.75rem;
  color: #22c55e;
  flex-shrink: 0;
`;

export const OSContributionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OSContributionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.cardHeader};
  font-family: var(--Inter);
`;

export const OSContributionDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.cardDescription};
  font-family: var(--Inter);
`;

export const ShowMoreButton = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.cardHeader};
	cursor: pointer;
	padding: 10px;
	width: 100%;
	text-align: center;
`;
