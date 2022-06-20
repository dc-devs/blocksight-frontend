import { ethers } from 'ethers';
import { IProvider } from '../interfaces';
import MetaMaskMethod from '../enums/MetaMaskMethod';

const requestAccounts = async (
	ethereumProvider: IProvider
): Promise<IProvider> => {
	const { provider } = new ethers.providers.Web3Provider(ethereumProvider);

	if (provider.request) {
		await provider.request({
			method: MetaMaskMethod.REQUEST_ACCOUNTS,
		});
	}

	return provider;
};

export default requestAccounts;
