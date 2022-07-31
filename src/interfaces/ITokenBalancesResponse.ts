import INetwork from './INetwork';
import ITokenBalance from './ITokenBalance';

interface IValue {
	value: string;
	formatted: string;
}

interface ITokenData {
	totalValue: IValue;
	balances: ITokenBalance[];
}

interface ITokenBalancesResponse {
	totalValue: IValue;
	networks: INetwork[];
	tokens: ITokenData;
	nfts: ITokenData;
	hidden: ITokenData;
	scam: ITokenData;
}

export default ITokenBalancesResponse;
