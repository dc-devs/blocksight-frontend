interface Token {
	symbol: string;
	name: string;
	description: string;
	logoUrl: any;
}

interface FromWallet {
	name: string;
	logoUrl: string;
}

interface Exchange {
	name: string;
	contract: string;
	conractAdress: string;
	logoUrl: string;
}

interface Transaction {
	fromAddress: string;
	fromWallet: FromWallet;
	type: string;
	exchange: Exchange;
	methodName: string;
	inputs: any;
	inputToken: Token;
	outputToken: Token;
}

export default Transaction;
