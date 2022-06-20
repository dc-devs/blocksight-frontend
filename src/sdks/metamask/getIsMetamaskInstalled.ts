import detectEthereumProvider from '@metamask/detect-provider';

const getIsMetaMaskInstalled = async () => {
	let isInstalled = false;

	const provider: any = await detectEthereumProvider({
		silent: true,
		mustBeMetaMask: true,
	});

	if (provider) {
		isInstalled = true;
	}

	return isInstalled;
};

export default getIsMetaMaskInstalled;
