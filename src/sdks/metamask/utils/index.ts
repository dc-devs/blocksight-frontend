import getProvider from './getProvider';
import requestAccounts from './requestAccounts';
import requestSignature from './requestSignature';
import getWalletFromProvider from './getWalletFromProvider';
import checkIsMetaMaskConnected from './checkIsMetaMaskConnected';

const waitUntilMetaMaskConnected = checkIsMetaMaskConnected;

export {
	getProvider,
	requestAccounts,
	requestSignature,
	getWalletFromProvider,
	checkIsMetaMaskConnected,
	waitUntilMetaMaskConnected,
};
