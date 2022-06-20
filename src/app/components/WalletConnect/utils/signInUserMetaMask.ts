import headers from '../../../../constants/headers';
import { apolloClient } from '../../../../services/apollo';
import { SIGN_IN_META_MASK } from '../../../../queries/sessions';

interface IProps {
	message: string;
	signature: string;
	selectedAddress: string;
}

const signInUserMetaMask = async ({
	message,
	signature,
	selectedAddress,
}: IProps) => {
	const result = await apolloClient.mutate({
		mutation: SIGN_IN_META_MASK,
		variables: {
			signInMetaMaskInput: {
				message,
				signature,
				address: selectedAddress,
			},
		},
		context: {
			headers,
		},
	});

	const { data } = result;
	const { signInMetaMask } = data;

	return signInMetaMask;
};

export default signInUserMetaMask;
