import detectEthereumProvider from '@metamask/detect-provider';

const getIsMetaMaskConnected = async () => {
	let isConnected = false;

	const provider: any = await detectEthereumProvider({
		silent: true,
		mustBeMetaMask: true,
	});

	if (provider && provider.selectedAddress) {
		isConnected = true;
	}

	return isConnected;
};

export default getIsMetaMaskConnected;
