import { gql } from '@apollo/client';

const CURRENT_USER = gql`
	query Query {
		currentUser {
			id
			email
			role
			createdAt
			updatedAt
		}
	}
`;

export default CURRENT_USER;
