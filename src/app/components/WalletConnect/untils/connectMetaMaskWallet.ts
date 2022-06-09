import { ethers } from 'ethers';
import { SyntheticEvent } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { updateMetaMaskWallet } from '../../../../redux/slices/metamaskSlice';
import { updateIsMetaMaskConnected } from '../../../../redux/slices/metamaskConnectedSlice';

interface IProps {
	dispatch: CallableFunction;
	isWalletInstalled: boolean;
}

const connectMetaMaskWallet = ({ dispatch, isWalletInstalled }: IProps) => {
	return async (event: SyntheticEvent) => {
		if (isWalletInstalled) {
			event.preventDefault();
			event.stopPropagation();
		}
		const ethereum = window.ethereum;

		if (ethereum) {
			const metaMaskProvider: any = await detectEthereumProvider({
				mustBeMetaMask: true,
				silent: true,
			});

			if (metaMaskProvider) {
				const { provider } = new ethers.providers.Web3Provider(
					ethereum
				) as any;

				await provider.request({
					method: 'eth_requestAccounts',
				});

				dispatch(
					updateMetaMaskWallet({
						selectedAddress: provider.selectedAddress,
					})
				);

				dispatch(updateIsMetaMaskConnected(true));
			}
		}
	};
};

export default connectMetaMaskWallet;
