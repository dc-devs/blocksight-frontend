import IUser from './IUser';
import IExchange from './IExchange';

interface IFiatTransfer {
	id: number;
	userId: number;
	exchangeId: number;
	exchange?: IExchange;
	user: IUser;
	type: string;
	amount: string;
	currency: string;
	timestamp: Date;
	transferData: string;
	createdAt: Date;
	updatedAt: Date;
}

export default IFiatTransfer;
