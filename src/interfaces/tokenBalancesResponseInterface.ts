import TokenBalance from './tokenBalanceInterface';

interface Value {
	number: string;
	formatted: string;
}

interface TokenBalancesResponse {
	totalValue: Value;
	balances: TokenBalance[];
}

export default TokenBalancesResponse;
