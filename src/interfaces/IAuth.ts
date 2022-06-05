import IUser from './IUser';

export interface ISignInProps {
	user: IUser;
}

interface IAuth {
	currentUser: IUser;
	isAuthorized: boolean;
	signIn({ user }: ISignInProps): void;
	signOut(): void;
}

export default IAuth;
