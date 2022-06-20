import IUser from './IUser';
import IWallet from './IWallet';

interface IAuthentication {
	user?: IUser;
	wallet?: IWallet;
	isAuthenticated: boolean;
}

export default IAuthentication;
