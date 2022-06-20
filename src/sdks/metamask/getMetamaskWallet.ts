import { IWallet } from '../../interfaces';
import { defaultWallet } from './constants';
import {
	getProvider,
	getWalletFromProvider,
	checkIsMetaMaskConnected,
} from './utils';

const getMetaMaskWallet = async (): Promise<IWallet> => {
	const provider: any = await getProvider();
	const isMetaMaskConnected = await checkIsMetaMaskConnected();
	let wallet: IWallet = defaultWallet;

	if (isMetaMaskConnected) {
		wallet = getWalletFromProvider(provider);
	}

	return wallet;
};

export default getMetaMaskWallet;
