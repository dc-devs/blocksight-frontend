import { apolloClient } from '../apollo';
import headers from '../../constants/headers';
import { TOKEN_BALANCES } from '../../queries/tokenBalances';
import TokenBalancesResponse from '../../interfaces/tokenBalancesResponseInterface';
import GetTokenBalancesProps from '../../interfaces/getTokenBalancePropsInterface';

const getTokenBalances = async ({
	address,
	filter = '',
}: GetTokenBalancesProps): Promise<TokenBalancesResponse> => {
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

	return getTokenBalances;
};

export default getTokenBalances;
