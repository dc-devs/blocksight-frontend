import { getProvider, checkIsMetaMaskConnected } from './utils';

const getIsMetaMaskConnected = async () => {
	const provider: any = await getProvider();
	const isMetaMaskConnected = await checkIsMetaMaskConnected();

	return isMetaMaskConnected;
};

export default getIsMetaMaskConnected;
