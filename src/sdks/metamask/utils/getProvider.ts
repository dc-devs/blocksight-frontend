import { IProvider } from '../interfaces';
import detectEthereumProvider from '@metamask/detect-provider';

const getProvider = async (): Promise<IProvider> => {
	return (await detectEthereumProvider({
		silent: false,
		mustBeMetaMask: false,
		timeout: 10000,
	})) as IProvider;
};

export default getProvider;
