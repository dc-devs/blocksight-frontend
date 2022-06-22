import { SyntheticEvent } from 'react';
import generateMessage from './generateMessage';
import signInUserMetaMask from './signInUserMetaMask';
import { updateMetaMaskProvider } from '../../../../redux/slices/metamaskSlice';
import { setAuthentication } from '../../../../redux/slices/authenticationSlice';
import { updateIsMetaMaskConnected } from '../../../../redux/slices/metamaskConnectedSlice';

import {
	getProvider,
	requestAccounts,
	requestSignature,
	getWalletFromProvider,
} from '../../../../sdks/metamask/utils';

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
			let provider = await getProvider();

			if (provider) {
				provider = await requestAccounts(provider);

				const wallet = getWalletFromProvider(provider);
				const { selectedAddress } = wallet;

				if (selectedAddress) {
					dispatch(updateIsMetaMaskConnected(true));
					dispatch(updateMetaMaskProvider(provider));

					const { message } = generateMessage();

					const { signature } = await requestSignature({
						message,
						provider,
						selectedAddress,
					});

					if (signature) {
						let authentication = await signInUserMetaMask({
							message,
							signature,
							selectedAddress,
						});

						authentication = {
							wallet,
							...authentication,
						};

						dispatch(setAuthentication(authentication));
						navigate(`/dashboard`, { replace: true });
					}
				}
			}
		}
	};
};

export default connectMetaMaskWallet;
