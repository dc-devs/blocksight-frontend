import { gql } from '@apollo/client';

const FIND_ALL = gql`
	query Query($findAllExchangesInput: FindAllExchangesInput!) {
		findAllExchanges(findAllExchangesInput: $findAllExchangesInput) {
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
	}
`;

export default FIND_ALL;
