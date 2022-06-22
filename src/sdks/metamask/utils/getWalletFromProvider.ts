import { IProvider } from '../interfaces';
import { IWallet } from '../../../interfaces';

const getWalletFromProvider = (provider: IProvider): IWallet => {
	const { chainId: rawChainId = '', selectedAddress = '' } = provider;
	const chainId = String(Number(rawChainId));

	return { chainId, selectedAddress };
};

export default getWalletFromProvider;
