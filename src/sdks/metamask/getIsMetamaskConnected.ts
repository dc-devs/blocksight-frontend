import { checkIsMetaMaskConnected } from './utils';

const getIsMetaMaskConnected = async () => {
	const isMetaMaskConnected = await checkIsMetaMaskConnected();

	return isMetaMaskConnected;
};

export default getIsMetaMaskConnected;
