import { gql } from '@apollo/client';

const FIND_ALL_FIAT_TRANSFERS = gql`
	query Query($findAllFiatTransfersInput: FindAllFiatTransfersInput!) {
		findAllFiatTransfers(
			findAllFiatTransfersInput: $findAllFiatTransfersInput
		) {
			id
			exchange {
				id
				name
				websiteUrl
				logoUrl
				companyLogoUrl
				hasApi
				hasCsv
				createdAt
				updatedAt
			}
			user {
				id
				email
				primaryWalletAddress
				role
				createdAt
				updatedAt
			}
			type
			amount
			currency
			timestamp
			transferData
			exchangeId
			userId
			createdAt
			updatedAt
		}
	}
`;

export default FIND_ALL_FIAT_TRANSFERS;
