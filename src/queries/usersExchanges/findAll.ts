import { gql } from '@apollo/client';

const FIND_ALL = gql`
	query Query($findAllUsersExchangesInput: FindAllUsersExchangesInput!) {
		findAllUsersExchanges(
			findAllUsersExchangesInput: $findAllUsersExchangesInput
		) {
			id
			userId
			exchangeId
			apiKey
			apiSecret
			apiPassphrase
			apiNickname
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
				role
				email
				primaryWalletAddress
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;

export default FIND_ALL;
