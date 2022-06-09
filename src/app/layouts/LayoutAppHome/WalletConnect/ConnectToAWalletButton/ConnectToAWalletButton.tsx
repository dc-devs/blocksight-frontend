import { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalWalletConnect from '../ConnectToAWalletModal';
import { selectIsMetaMaskConnected } from '../../../../../redux/slices/metamaskConnectedSlice';

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
	const isWalletConnected = useSelector(selectIsMetaMaskConnected);

	const toggleModal = () => {
		if (open) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	};

	const isOpen = isWalletConnected ? false : open;

	return (
		<>
			<Button
				className={classes.buttonRoot}
				disableRipple={true}
				onClick={toggleModal}
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
