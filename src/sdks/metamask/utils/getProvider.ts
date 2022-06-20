import detectEthereumProvider from '@metamask/detect-provider';

const getProvider = async () => {
	return await detectEthereumProvider({
		silent: false,
		mustBeMetaMask: false,
		timeout: 10000,
	});
};

export default getProvider;
