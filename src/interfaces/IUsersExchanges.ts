import IUser from './IUser';
import IExchange from './IExchange';

interface IUsersExchanges {
	apiKey: string;
	apiNickname: string;
	apiPassphrase: string;
	apiSecret: string;
	user: IUser;
	userId: number;
	exchangeId: number;
	exchange: IExchange;
	createdAt: Date;
	updatedAt: Date;
}

export default IUsersExchanges;
