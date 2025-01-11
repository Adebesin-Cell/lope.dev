import React from "react";
import * as Icon from "react-feather";
import Card from "../UI/Card";
import {
	OSCardContent,
	OSCardDescription,
	OSCardHeader,
	OSCardTitle,
	OSContributionContent,
	OSContributionDescription,
	OSContributionIcon,
	OSContributionItem,
	OSContributionList,
	OSContributionTitle,
	ShowMoreButton,
} from "./OpenSourceCard.style";
import { OSCardWrapper } from "./OpenSourceCard.style";

const OpenSourceCard = ({ theme }) => {
	const DEFAULT_VISIBLE_ITEMS = 10;

	const contributions = [
		{
			url: "https://github.com/PorePranav/CampusUnify/pull/40",
			title: "CampusUnify PR #40",
			description: "Visit link to see more",
		},
		{
			url: "https://github.com/magiclabs/wagmi-magic-connector/pull/16",
			title: "Wagmi Magic Connector PR #16",
			description: "Visit link to see more",
		},
		{
			url: "https://github.com/PorePranav/CampusUnify/pull/17",
			title: "CampusUnify PR #17",
			description: "Visit link to see more",
		},
		{
			url: "https://github.com/Royal-lobster/Syncia/issues/98",
			title: "Syncia Issue #98",
			description: "Visit link to see more",
		},
		{
			url: "https://github.com/chakra-ui/zag/pull/2108",
			title: "Zag PR #2108",
			description: "Visit link to see more",
		},
	];

	const [showAll, setShowAll] = React.useState(false);
	const displayedContributions = showAll
		? contributions
		: contributions.slice(0, DEFAULT_VISIBLE_ITEMS);

	return (
		<OSCardWrapper>
			<Card cardTheme={theme}>
				<OSCardHeader>
					<OSCardContent>
						<OSCardTitle>Open Source Contributions</OSCardTitle>
						<OSCardDescription>
							Actively contributing to open source projects and improving with
							every PR
						</OSCardDescription>
					</OSCardContent>
				</OSCardHeader>

				<OSContributionList>
					{displayedContributions.map((contribution) => (
						<OSContributionItem
							key={contribution.url}
							href={contribution.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<OSContributionIcon>
								<Icon.GitPullRequest size={20} />
							</OSContributionIcon>
							<OSContributionContent>
								<OSContributionTitle>{contribution.title}</OSContributionTitle>
								<OSContributionDescription>
									{contribution.description}
								</OSContributionDescription>
							</OSContributionContent>
						</OSContributionItem>
					))}
				</OSContributionList>
				{contributions.length > DEFAULT_VISIBLE_ITEMS && (
					<ShowMoreButton onClick={() => setShowAll(!showAll)}>
						{showAll
							? "Show Less"
							: `Show ${contributions.length - DEFAULT_VISIBLE_ITEMS} More`}
					</ShowMoreButton>
				)}
			</Card>
		</OSCardWrapper>
	);
};
export default OpenSourceCard;
