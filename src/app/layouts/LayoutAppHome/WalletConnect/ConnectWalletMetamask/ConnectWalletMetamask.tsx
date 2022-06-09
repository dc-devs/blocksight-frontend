import { ethers } from 'ethers';
import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ConnectWalletBase from '../ConnectWalletBase';
import detectEthereumProvider from '@metamask/detect-provider';
import { updateMetaMaskWallet } from '../../../../../redux/slices/metamaskSlice';
import { selectIsMetaMaskInstalled } from '../../../../../redux/slices/metamaskInstalledSlice';
import { updateIsMetaMaskConnected } from '../../../../../redux/slices/metamaskConnectedSlice';

interface Props {
	imgSrc: string;
	walletName: string;
	walletInstallUrl: string;
	walletInstruction: string;
}

const ConnectWalletMetaMask = ({
	imgSrc,
	walletName,
	walletInstallUrl,
	walletInstruction,
}: Props) => {
	const dispatch = useDispatch();
	const isWalletInstalled = useSelector(selectIsMetaMaskInstalled);
	const displayWalletInstallUrl = !isWalletInstalled;
	console.log('connectWallet - isWalletInstalled', isWalletInstalled);

	const connectWallet = async (event: SyntheticEvent) => {
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

	return (
		<ConnectWalletBase
			imgSrc={imgSrc}
			walletName={walletName}
			connectWallet={connectWallet}
			walletInstallUrl={walletInstallUrl}
			walletInstruction={walletInstruction}
			displayWalletInstallUrl={displayWalletInstallUrl}
		/>
	);
};

export default ConnectWalletMetaMask;
