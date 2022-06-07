import { gql } from '@apollo/client';

const CURRENT_USER = gql`
	query Query {
		currentUser {
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

export default CURRENT_USER;
