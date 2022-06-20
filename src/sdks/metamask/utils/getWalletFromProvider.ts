import { IProvider } from '../interfaces';
import { IWallet } from '../../../interfaces';

const getWalletFromProvider = (provider: IProvider): IWallet => {
	const { chainId: rawChainId = '', selectedAddress = '' } = provider;
	const chainId = rawChainId?.substring(2, 3);

	return { chainId, selectedAddress };
};

export default getWalletFromProvider;
