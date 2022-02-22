import Paper from '@mui/material/Paper';
import AccountDropdown from '../../../screens/dashboard/components/account-dropdown';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { BarChart } from 'react-feather';
// import { BarChart, Octagon, Repeat, Search } from 'react-feather';
import { Link as ReactLink } from 'react-router-dom';
import Link from '@mui/material/Link';

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
		'font-weight': '300',
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

					{/* <Link
						to="/token"
						color="primary"
						underline="none"
						component={ReactLink}
						className={classes.sidebarLinkContainer}
					>
						<Octagon className={classes.sidebarLinkLogo} />
						<Typography className={classes.sidebarLinkText}>
							Tokens
						</Typography>
					</Link> */}
					{/* <Link
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
					</Link> */}
				</div>
			</div>
		</Paper>
	);
};

export default PermanentDrawer;
