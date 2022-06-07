import { gql } from '@apollo/client';

const SIGN_IN = gql`
	mutation Mutation($sessionInput: SessionInput!) {
		login(sessionInput: $sessionInput) {
			user {
				id
				email
				role
				createdAt
				updatedAt
			}
			isAuthenticated
		}
	}
`;

export default SIGN_IN;
