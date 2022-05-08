interface Price {
	number: number;
	formatted: string;
}

interface TotalValue {
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
	totalValue: TotalValue;
}

export default TokenBalance;
