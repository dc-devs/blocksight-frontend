import { gql } from '@apollo/client';

const SIGN_IN_METAMASK = gql`
	mutation Mutation($sessionInput: SessionInput!) {
		login(sessionInput: $sessionInput) {
			wallet {
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

export default SIGN_IN_METAMASK;
