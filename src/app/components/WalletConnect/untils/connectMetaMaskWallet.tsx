import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import { SyntheticEvent } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { updateMetaMaskWallet } from '../../../../redux/slices/metamaskSlice';
import { updateIsMetaMaskConnected } from '../../../../redux/slices/metamaskConnectedSlice';

interface IProps {
	dispatch: CallableFunction;
	isWalletInstalled: boolean;
}

const message = {
	domain: {
		chainId: 1,
		name: 'BlockSight',
		verifyingContract: 'https://blocksight.fi',
		salt: uuidv4(),
		version: '1',
	},
	message: {
		'Sign': `Hello from BlockSight! Sign this message to prove you have access to this wallet and we’ll log you in. This won't cost you any Ether.
		`,
	},
	// Refers to the keys of the *types* object below.
	primaryType: 'Message',
	types: {
		// TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
		EIP712Domain: [
			{ name: 'name', type: 'string' },
			{ name: 'version', type: 'string' },
			{ name: 'chainId', type: 'uint256' },
			{ name: 'verifyingContract', type: 'address' },
		],
		// Refer to PrimaryType
		Message: [{ name: 'Sign', type: 'string' }],
	},
};

const connectMetaMaskWallet = ({ dispatch, isWalletInstalled }: IProps) => {
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
					method: 'eth_requestAccounts',
				});

				dispatch(
					updateMetaMaskWallet({
						selectedAddress: provider.selectedAddress,
					})
				);

				dispatch(updateIsMetaMaskConnected(true));

				const { selectedAddress } = provider;
				const messageString = JSON.stringify(message);

				const signature = await provider.request({
					method: 'eth_signTypedData_v4',
					params: [selectedAddress, messageString],
				});

				const variables = {
					signature,
					message: messageString,
					address: selectedAddress,
				};

				console.log(variables);
			}
		}
	};
};

export default connectMetaMaskWallet;
