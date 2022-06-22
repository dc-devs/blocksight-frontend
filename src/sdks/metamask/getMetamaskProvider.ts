import { IProvider } from './interfaces';
import {
	getProvider,
	waitUntilMetaMaskConnected,
} from './utils';

const getMetaMaskProvider = async (): Promise<IProvider> => {
	const provider = await getProvider();
	
	await waitUntilMetaMaskConnected();

	return provider;
};

export default getMetaMaskProvider;
