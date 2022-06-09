import { useSelector } from 'react-redux';
import { connectMetaMaskWallet } from '../untils';
import { useAppDispatch } from '../../../../hooks';
import ConnectWalletBase from '../ConnectWalletBase';
import { selectIsMetaMaskInstalled } from '../../../../redux/slices/metamaskInstalledSlice';

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
	const dispatch = useAppDispatch();
	const isWalletInstalled = useSelector(selectIsMetaMaskInstalled);
	const displayWalletInstallUrl = !isWalletInstalled;

	const connectWallet = connectMetaMaskWallet({
		dispatch,
		isWalletInstalled,
	});

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
