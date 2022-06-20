import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks';
import ConnectWalletBase from '../ConnectWalletBase';
import { generateConnectMetaMaskWallet } from '../../../../sdks/metamask';
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
	const navigate = useNavigate();

	const connectWallet = generateConnectMetaMaskWallet({
		navigate,
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
