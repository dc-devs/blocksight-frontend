import { gql } from '@apollo/client';

const CREATE_USERS_EXCHANGES = gql`
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
		}
	}
`;

export default CREATE_USERS_EXCHANGES;
