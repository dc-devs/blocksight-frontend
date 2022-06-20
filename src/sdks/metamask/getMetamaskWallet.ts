import {
	getProvider,
	getWalletFromProvider,
	checkIsMetaMaskConnected,
} from './utils';
import MetaMaskMethod from './enums/MetaMaskMethod';

const getMetaMaskWallet = async () => {
	let wallet;
	const provider: any = await getProvider();
	const isMetaMaskConnected = await checkIsMetaMaskConnected();

	if (isMetaMaskConnected) {
		wallet = getWalletFromProvider(provider);
	} else {
		await provider.request({
			method: MetaMaskMethod.REQUEST_ACCOUNTS,
		});

		wallet = getWalletFromProvider(provider);
	}

	return wallet;
};

export default getMetaMaskWallet;
