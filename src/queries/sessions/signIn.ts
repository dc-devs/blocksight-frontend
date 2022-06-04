import { gql } from '@apollo/client';

const SIGN_IN = gql`
	mutation Mutation($sessionInput: SessionInput!) {
		login(sessionInput: $sessionInput) {
			user {
				createdAt
				updatedAt
				role
				email
				id
			}
		}
	}
`;

export default SIGN_IN;
