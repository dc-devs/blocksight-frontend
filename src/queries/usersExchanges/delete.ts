import { gql } from '@apollo/client';

const DELETE = gql`
	mutation Mutation($deleteUsersExchangesId: Int!) {
		deleteUsersExchanges(id: $deleteUsersExchangesId) {
			id
			user {
				id
			}
			exchange {
				id
				name
			}
			apiNickname
			createdAt
			updatedAt
		}
	}
`;

export default DELETE;
