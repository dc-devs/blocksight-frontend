interface Price {
	number: number;
	formatted: string;
}

interface Value {
	number: number;
	formatted: string;
}

interface TokenBalance {
	name: string;
	symbol: string;
	logoUrl: string;
	contractAddress: string;
	balance: string;
	price: Price;
	totalValue: Value;
}

export default TokenBalance;
