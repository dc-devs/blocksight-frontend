import axios from 'axios';
import environment from '../../constants/environment';
import TokenBalancesResponse from '../../interfaces/tokenBalancesResponseInterface';
import GetTokenBalancesProps from '../../interfaces/getTokenBalancePropsInterface';

const { NODE_ENV } = process.env;
const { serverBaseUrl } = environment[NODE_ENV];

interface AxiosResponse {
	data: TokenBalancesResponse;
}

const getTokenBalances = async ({
	address,
	filter = '',
}: GetTokenBalancesProps): Promise<TokenBalancesResponse> => {
	const url = `${serverBaseUrl}/tokenBalances?address=${address}&currency=usd&filter=${filter}`;
	const response: AxiosResponse = await axios.get(url);
	const { data } = response;

	return data;
};

export default getTokenBalances;
