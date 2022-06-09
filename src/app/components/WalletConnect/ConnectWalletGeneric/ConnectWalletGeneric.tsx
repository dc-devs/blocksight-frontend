import { SyntheticEvent } from 'react';
import ConnectWalletBase from '../ConnectWalletBase';

interface Props {
	imgSrc: string;
	walletName: string;
	walletInstallUrl?: string;
	walletInstruction: string;
}

const ConnectWalletGeneric = ({
	imgSrc,
	walletName,
	walletInstallUrl,
	walletInstruction,
}: Props) => {
	const displayWalletInstallUrl = false;

	const connectWallet = async (event: SyntheticEvent) => {
		event.preventDefault();
		event.stopPropagation();
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

export default ConnectWalletGeneric;
