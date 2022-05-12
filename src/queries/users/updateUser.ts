import { gql } from '@apollo/client';

const UPDATE_USER = gql`
	mutation Mutation($id: Int!, $updateUserInput: UpdateUserInput!) {
		updateUser(id: $id, updateUserInput: $updateUserInput) {
			id
			email
			role
			createdAt
			updatedAt
		}
	}
`;

export default UPDATE_USER;
