import { useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../../../hooks';
import ModalWalletConnect from '../ConnectToAWalletModal';
// import { selectIsMetaMaskConnected } from '../../../../redux/slices/metamaskConnectedSlice';
import { selectIsMetaMaskInstalled } from '../../../../redux/slices/metamaskInstalledSlice';
import connectWalletMetaMask from '../../../components/WalletConnect/untils/connectMetaMaskWallet';

const useStyles = makeStyles()((theme) => ({
	buttonRoot: {
		textTransform: 'none',
		borderRadius: '10px',
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	buttonText: {
		padding: '.2rem .4rem',
	},
}));

const ConnectToAWallet = () => {
	const { classes } = useStyles();
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const isMetaMaskInstalled = useSelector(selectIsMetaMaskInstalled);

	const handleClick = () => {
		if (isMetaMaskInstalled) {
			const connectWallet = connectWalletMetaMask({
				dispatch,
				isWalletInstalled: isMetaMaskInstalled,
			});

			connectWallet();
		} else {
			if (open) {
				setOpen(false);
			} else {
				setOpen(true);
			}
		}
	};

	const isOpen = open; // update with shouldWalletModalBeClosed ? false : open;

	return (
		<>
			<Button
				className={classes.buttonRoot}
				disableRipple={true}
				onClick={handleClick}
			>
				<Typography className={classes.buttonText}>
					Connect to a wallet
				</Typography>
				<ModalWalletConnect isOpen={isOpen} />
			</Button>
		</>
	);
};

export default ConnectToAWallet;
