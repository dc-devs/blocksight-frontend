import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries/sessions';
import IAuth, { ISignInProps } from '../interfaces/IAuth';

const useAuth = (): IAuth => {
	const [currentUser, setCurrentUser] = useState({});
	const [isAuthorized, setIsAuthorized] = useState(false);

	useQuery(CURRENT_USER, {
		onError: () => {
			setIsAuthorized(false);
			setCurrentUser({});
		},
		onCompleted: (data) => {
			const { currentUser } = data;

			setIsAuthorized(true);
			setCurrentUser(currentUser);
		},
	});

	return {
		currentUser,
		isAuthorized,
		signIn: ({ user }: ISignInProps) => {
			setCurrentUser(user);
			setIsAuthorized(true);
		},
		signOut: () => {
			setCurrentUser({});
			setIsAuthorized(false);
		},
	};
};

export default useAuth;
