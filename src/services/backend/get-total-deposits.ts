import axios from 'axios';
import environment from '../../constants/environment';
import TokenDepositsResponse from '../../interfaces/total-deposits-response-interface';

const { NODE_ENV } = process.env;
const { serverBaseUrl } = environment[NODE_ENV];

interface AxiosResponse {
	data: TokenDepositsResponse;
}

const getTotalDeposits = async (): Promise<TokenDepositsResponse> => {
	const url = `${serverBaseUrl}/total-fiat-deposits`;
	const response: AxiosResponse = await axios.get(url);
	const { data } = response;

	return data;
};

export default getTotalDeposits;
