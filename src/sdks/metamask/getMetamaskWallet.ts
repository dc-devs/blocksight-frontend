import MetaMaskMethod from './enums/MetaMaskMethod';
import detectEthereumProvider from '@metamask/detect-provider';

const getMetaMaskWallet = async () => {
	const provider: any = await detectEthereumProvider({
		silent: true,
		mustBeMetaMask: true,
	});

	if (provider && provider.selectedAddress) {
		await provider.request({
			method: MetaMaskMethod.REQUEST_ACCOUNTS,
		});
	}

	return { selectedAddress: provider.selectedAddress };
};

export default getMetaMaskWallet;
