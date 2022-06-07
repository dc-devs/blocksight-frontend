import { gql } from '@apollo/client';

const SIGN_OUT = gql`
	mutation Mutation($userId: Float!) {
		logOut(userId: $userId) {
			userId
			isAuthenticated
		}
	}
`;

export default SIGN_OUT;
