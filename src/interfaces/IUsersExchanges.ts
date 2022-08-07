import IExchange from './IExchange';

interface IUsersExchanges {
	userId: number;
	exchangeId: number;
	exchange: IExchange;
	createdAt: Date;
	updatedAt: Date;
}

export default IUsersExchanges;
