import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router';
import { SIGN_OUT } from '../../queries/sessions';
import { apolloClient } from '../../services/apollo';
import { revokeAuthentication } from '../../redux/slices/authenticationSlice';

interface IProps {
	userId: number;
	dispatch: Dispatch;
	navigate: NavigateFunction;
}

const signOut = async ({ userId, dispatch, navigate }: IProps) => {
	await apolloClient.mutate({
		mutation: SIGN_OUT,
		variables: {
			userId: userId,
		},
	});

	dispatch(revokeAuthentication());

	navigate('/', { replace: true });
};

export default signOut;
