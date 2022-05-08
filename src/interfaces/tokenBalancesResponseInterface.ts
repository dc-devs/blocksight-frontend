import TokenBalance from './tokenBalanceInterface';

interface TotalValue {
	string: string;
	formatted: string;
}

interface TokenBalancesResponse {
	totalValue: TotalValue;
	balances: TokenBalance[];
}

export default TokenBalancesResponse;
