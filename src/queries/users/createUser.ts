import { gql } from '@apollo/client';

const CREATE_USER = gql`
	mutation Mutation($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			id
			email
			role
			createdAt
			updatedAt
		}
	}
`;

export default CREATE_USER;
