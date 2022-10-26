// import { useContext } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
// import { IAuth } from '../../../../interfaces';
import Typography from '@mui/material/Typography';
// import { AuthContext } from '../../../../contexts';
import { Link as ReactLink } from 'react-router-dom';
import {
	BarChart,
	Octagon,
	Repeat,
	Search,
	DollarSign,
	Box,
} from 'react-feather';
// BsBox;
// FiLayers - Exchange?
import { HiChevronDoubleUp } from 'react-icons/hi';
import { IoWalletOutline } from 'react-icons/io5';
import { AiOutlineBlock } from 'react-icons/ai';

import AccountDropdown from '../../../screens/Dashboard/components/AccountDropdown';

const drawerWidth = 240;

// LEFT OFF
// Need to create a flexbox with fixed width for the icons in the sidebar
// So that icons and words align
// Queue up the collapsable side bar
// Update weird layout that is currently set..

const useStyles = makeStyles()((theme) => ({
	sidebar: {
		width: drawerWidth,
		height: '100vh',
	},
	logoContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: theme.spacing(2),
	},
	logoContainerLogo: {
		marginRight: theme.spacing(1),
	},
	logoContainerText: {
		textAlign: 'center',
		fontSize: '2rem',
		fontWeight: '300',
	},
	sidebarContent: {
		padding: theme.spacing(3),
		height: '100%',
	},
	sidebarLinksContainer: {
		marginTop: '50px',
	},
	sidebarLinkContainer: {
		display: 'flex',
		alignContent: 'center',
		cursor: 'pointer',
		marginTop: '20px',
	},
	sidebarLinkLogoContainer: {
		display: 'flex',
		justifyContent: 'center',
		justifyItems: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginRight: '10px',
		color: theme.palette.primary.main,
		height: '24px',
		width: '24px',
	},
	sidebarLinkLogo: {
		height: '21px',
		width: '21px',
		color: theme.palette.primary.main,
	},
	sidebarLinkText: {
		fontSize: '1.2rem',
		color: theme.palette.primary.main,
	},
}));

interface Props {
	logoText: string;
}

const PermanentDrawer = ({ logoText }: Props) => {
	const { classes } = useStyles();

	return (
		<Paper elevation={2} square={true} className={classes.sidebar}>
			<div className={classes.sidebarContent}>
				<div className={classes.logoContainer}>
					<Box
						height={25}
						width={25}
						className={classes.logoContainerLogo}
					/>
					<Typography className={classes.logoContainerText}>
						{logoText}
					</Typography>
				</div>
				<AccountDropdown />
				<div className={classes.sidebarLinksContainer}>
					<Link
						to="/dashboard"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<div className={classes.sidebarLinkLogoContainer}>
							<BarChart
								height={21}
								width={21}
								className={classes.sidebarLinkLogo}
							/>
						</div>
						<Typography className={classes.sidebarLinkText}>
							Dashboard
						</Typography>
					</Link>

					<Link
						to="/exchanges"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<div className={classes.sidebarLinkLogoContainer}>
							<AiOutlineBlock
								height={21}
								width={21}
								className={classes.sidebarLinkLogo}
							/>
						</div>
						<Typography className={classes.sidebarLinkText}>
							Exchanges
						</Typography>
					</Link>

					<Link
						to="/token"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<div className={classes.sidebarLinkLogoContainer}>
							<IoWalletOutline
								height={21}
								width={21}
								className={classes.sidebarLinkLogo}
							/>
						</div>
						<Typography className={classes.sidebarLinkText}>
							Wallets
						</Typography>
					</Link>

					<Link
						to="/token"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<div className={classes.sidebarLinkLogoContainer}>
							<DollarSign
								height={21}
								width={21}
								className={classes.sidebarLinkLogo}
							/>
						</div>
						<Typography className={classes.sidebarLinkText}>
							Tokens
						</Typography>
					</Link>
					<Link
						to="/"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<div className={classes.sidebarLinkLogoContainer}>
							<Repeat
								height={21}
								width={21}
								className={classes.sidebarLinkLogo}
							/>
						</div>
						<Typography className={classes.sidebarLinkText}>
							Transactions
						</Typography>
					</Link>
					<Link
						to="/"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<div className={classes.sidebarLinkLogoContainer}>
							<Search
								height={21}
								width={21}
								className={classes.sidebarLinkLogo}
							/>
						</div>
						<Typography className={classes.sidebarLinkText}>
							Wallet Mapper
						</Typography>
					</Link>
				</div>
			</div>
		</Paper>
	);
};

export default PermanentDrawer;
