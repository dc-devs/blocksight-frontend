import { gql } from '@apollo/client';

const FIND_ALL = gql`
	query Query($findAllUsersExchangesInput: FindAllUsersExchangesInput!) {
		findAllUsersExchanges(
			findAllUsersExchangesInput: $findAllUsersExchangesInput
		) {
			id
			userId
			exchangeId
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
			createdAt
			updatedAt
		}
	}
`;

export default FIND_ALL;
