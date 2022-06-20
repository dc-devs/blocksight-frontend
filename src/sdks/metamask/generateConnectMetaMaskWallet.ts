import { ethers } from 'ethers';
import { SyntheticEvent } from 'react';
import { WalletName } from '../../enums';
import generateMessage from './generateMessage';
import detectEthereumProvider from '@metamask/detect-provider';
import { updateMetaMaskWallet } from '../../redux/slices/metamaskSlice';
import { updateIsMetaMaskConnected } from '../../redux/slices/metamaskConnectedSlice';

import { SIGN_IN_META_MASK } from '../../queries/sessions';
import { setAuthentication } from '../../redux/slices/authenticationSlice';
import headers from '../../constants/headers';
import { apolloClient } from '../../services/apollo';
import MetaMaskMethod from './enums/MetaMaskMethod'

interface IProps {
	navigate: CallableFunction;
	dispatch: CallableFunction;
	isWalletInstalled: boolean;
}

const connectMetaMaskWallet = ({
	dispatch,
	navigate,
	isWalletInstalled,
}: IProps) => {
	return async (event?: SyntheticEvent) => {
		if (isWalletInstalled) {
			event?.preventDefault();
			event?.stopPropagation();
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
					method: MetaMaskMethod.REQUEST_ACCOUNTS,
				});

				dispatch(
					updateMetaMaskWallet({
						selectedAddress: provider.selectedAddress,
					})
				);

				dispatch(updateIsMetaMaskConnected(true));

				const { selectedAddress, chainId: rawChainId } = provider;
				const chainId = rawChainId.substring(2, 3);

				const message = generateMessage({ chainId });
				const messageString = JSON.stringify(message);

				const signature = await provider.request({
					method: MetaMaskMethod.SIGN_TYPED_DATA_V4,
					params: [selectedAddress, messageString],
				});

				const variables = {
					signInMetaMaskInput: {
						signature,
						message: messageString,
						address: selectedAddress,
					},
				};

				try {
					const result = await apolloClient.mutate({
						mutation: SIGN_IN_META_MASK,
						variables,
						context: {
							headers,
						},
					});

					const { data } = result;
					const { signInMetaMask } = data;

					const wallet = {
						chainId,
						selectedAddress,
						name: WalletName.METAMASK,
						accounts: [],
					};

					const authentication = { ...signInMetaMask, ...wallet };

					console.log(authentication);

					dispatch(setAuthentication(authentication));
					navigate(`/dashboard`, { replace: true });
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
};

export default connectMetaMaskWallet;
