import { getProvider } from './utils';

const getIsMetaMaskInstalled = async () => {
	let isInstalled = false;

	const provider: any = getProvider();

	if (provider) {
		isInstalled = true;
	}

	return isInstalled;
};

export default getIsMetaMaskInstalled;
