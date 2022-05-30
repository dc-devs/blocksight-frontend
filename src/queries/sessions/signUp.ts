import { gql } from '@apollo/client';

const SIGN_UP = gql`
	mutation Mutation($createUserInput: CreateUserInput!) {
		signUp(createUserInput: $createUserInput) {
			user {
				id
				email
				role
				createdAt
				updatedAt
			}
		}
	}
`;

export default SIGN_UP;
