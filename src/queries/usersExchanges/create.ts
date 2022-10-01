import { gql } from '@apollo/client';

const CREATE = gql`
	mutation Mutation($createUsersExchangesInput: CreateUsersExchangesInput!) {
		createUsersExchanges(
			createUsersExchangesInput: $createUsersExchangesInput
		) {
			id
			userId
			exchangeId
			apiKey
			apiSecret
			apiPassphrase
			apiNickname
			createdAt
			updatedAt
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
		}
	}
`;

export default CREATE;
