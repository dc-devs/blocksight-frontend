import { apolloClient } from '../apollo';
import headers from '../../constants/headers';
import { TOKEN_BALANCES } from '../../queries/tokenBalances';
import ITokenBalancesResponse from '../../interfaces/ITokenBalancesResponse';
import GetTokenBalancesProps from '../../interfaces/getTokenBalancePropsInterface';

const getTokenBalances = async ({
	address,
	filter = '',
}: GetTokenBalancesProps): Promise<ITokenBalancesResponse> => {
	const result = await apolloClient.mutate({
		mutation: TOKEN_BALANCES,
		variables: {
			getTokenBalancesInput: {
				address,
				filter,
			},
		},
		context: {
			headers,
		},
	});
	
	const { data } = result;
	const { getTokenBalances } = data;
	const tokenBalances: ITokenBalancesResponse = getTokenBalances;

	return tokenBalances;
};

export default getTokenBalances;
