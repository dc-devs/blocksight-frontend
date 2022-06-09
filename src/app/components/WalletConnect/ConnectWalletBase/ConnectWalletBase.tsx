import { SyntheticEvent } from 'react';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles()((theme) => ({
	walletContainer: {
		width: '400px',
		height: '150px',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgb(255, 255, 255)',
		borderRadius: '10px',
		boxShadow: theme.shadows['3'],
		margin: theme.spacing(2),
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			boxShadow: theme.shadows['5'],
			backgroundColor: '#eceff1',
		},
	},
	walletImage: {
		width: '45px',
		height: '45px',
	},
	walletName: {
		fontSize: '1.3rem',
		fontWeight: 'bold',
		marginTop: '10px',
	},
	walletInstruction: {
		marginTop: '2px',
	},
	walletInstallLink: {
		textDecoration: 'none',
	},
}));

interface Props {
	imgSrc: string;
	walletName: string;
	connectWallet(event: SyntheticEvent): Promise<void>;
	walletInstallUrl?: string;
	walletInstruction: string;
	displayWalletInstallUrl: boolean;
}

const ConnectWalletBase = ({
	imgSrc,
	walletName,
	connectWallet,
	walletInstallUrl,
	walletInstruction,
	displayWalletInstallUrl,
}: Props) => {
	const {classes} = useStyles();

	const WalletInstallHTML = (
		<a
			href={walletInstallUrl}
			target="_blank"
			rel="noreferrer"
			className={classes.walletInstallLink}
		>
			<Typography color="primary">Click to install MetaMask</Typography>
		</a>
	);

	const WalletInstructionHTML = (
		<Typography className={classes.walletInstruction}>
			{walletInstruction}
		</Typography>
	);

	const instruction = displayWalletInstallUrl
		? WalletInstallHTML
		: WalletInstructionHTML;

	return (
		<>
			<div className={classes.walletContainer} onClick={connectWallet}>
				<img
					className={classes.walletImage}
					src={imgSrc}
					alt={walletName}
				/>

				<Typography className={classes.walletName}>
					{walletName}
				</Typography>

				{instruction}
			</div>
		</>
	);
};

export default ConnectWalletBase;
