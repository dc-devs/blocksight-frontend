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
	Server,
} from 'react-feather';
import { HiChevronDoubleUp } from 'react-icons/hi';
import { BiWallet } from 'react-icons/bi';
import { BsWallet2 } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';

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
	logo: {
		marginTop: theme.spacing(2),
	},
	sidebarContent: {
		padding: theme.spacing(3),
		height: '100vh',
	},
	logoText: {
		textAlign: 'center',
		fontSize: '2rem',
		fontWeight: '300',
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
	sidebarLinkLogo: {
		marginRight: '10px',
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
				<div className={classes.logo}>
					<Typography className={classes.logoText}>
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
						<BarChart className={classes.sidebarLinkLogo} />
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
						<div>
							<HiChevronDoubleUp
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
						<div>
							<IoWalletOutline
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
						<DollarSign className={classes.sidebarLinkLogo} />
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
						<Repeat className={classes.sidebarLinkLogo} />
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
						<Search className={classes.sidebarLinkLogo} />
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
