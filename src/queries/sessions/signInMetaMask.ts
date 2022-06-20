import { gql } from '@apollo/client';

const SIGN_IN_METAMASK = gql`
	mutation Mutation($signInMetaMaskInput: SignInMetaMaskInput!) {
		signInMetaMask(signInMetaMaskInput: $signInMetaMaskInput) {
			user {
				id
				email
				role
				primaryWalletAddress
			}
			isAuthenticated
		}
	}
`;

export default SIGN_IN_METAMASK;
