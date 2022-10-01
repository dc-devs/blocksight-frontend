interface ICreateUsersExchangesInput {
	userId: number;
	apiKey: string;
	apiSecret: string;
	exchangeId: number;
	apiNickname?: string;
	apiPassphrase: string;
}

export default ICreateUsersExchangesInput;
