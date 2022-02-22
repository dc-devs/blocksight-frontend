import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { selectMetaMaskWallet } from '../../../../../redux/slices/metamask-slice';
import { shortenWalletAddress } from '../../../../../utils';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Copy, LogOut, Settings } from 'react-feather';
// import { MouseEvent } from 'react';

const useStyles = makeStyles()((theme) => ({
	root: {
		display: 'flex',
	},
	container: {
		position: 'relative',
		width: '100%',
	},
	popperRoot: {
		width: '100%',
		transform: 'translate3d(44px, 62px, 0px)',
	},
	menuIcon: {
		marginRight: '15px',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
	accountDropdownContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.spacing(3),
		border: `1px solid #eceff1`,
		borderRadius: '10px',
		minHeight: '36px',
		width: '100%',
	},
	signedInDot: {
		height: '10px',
		width: '10px',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '50%',
	},
	walletAddress: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: '113px',
		color: theme.palette.text.primary,
		margin: '0 5px',
	},
	dropdownArrow: {
		fontSize: '1rem',
		transform: 'rotate(-90deg)',
	},
}));

const AccountDropdown = () => {
	const { classes } = useStyles();
	const { selectedAddress } = useSelector(selectMetaMaskWallet);
	const shortendWalletAddress = shortenWalletAddress(selectedAddress);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null) as any;

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	// TODO: FIX ANY
	const handleClose = (event: any) => {
		// console.log(event);
		if (
			anchorRef.current &&
			anchorRef.current.contains &&
			anchorRef.current.contains(event.target)
		) {
			return;
		}

		setOpen(false);

		return true;
	};

	// TODO: FIX ANY
	const handleListKeyDown = (event: any) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					className={classes.accountDropdownContainer}
				>
					<div className={classes.signedInDot} />
					<Typography className={classes.walletAddress}>
						{shortendWalletAddress}
					</Typography>
					<ArrowBackIosRoundedIcon
						className={classes.dropdownArrow}
					/>
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
					className={classes.popperRoot}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom'
										? 'center top'
										: 'center bottom',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem onClick={handleClose}>
											<Settings
												className={classes.menuIcon}
											/>
											<Typography>Settings</Typography>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Copy
												className={classes.menuIcon}
											/>
											<Typography>
												Copy Address
											</Typography>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<LogOut
												className={classes.menuIcon}
											/>
											<Typography>Sign Out</Typography>
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
};

export default AccountDropdown;
