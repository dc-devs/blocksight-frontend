import { makeStyles } from 'tss-react/mui';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from '../logo';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as ReactLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const useStyles = makeStyles()((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: 'white',
		boxShadow: 'none',
		color: '#bbb',
	},
	loginLink: {
		marginRight: '20px',
	},
	signUpButton: {
		textTransform: 'none',
	},
}));

interface Props {
	children: JSX.Element;
}

const LayoutAppHome = ({ children }: Props) => {
	const { classes } = useStyles();

	return (
		<div data-testid="layoutAppHome" className={classes.root}>
			<AppBar
				position="fixed"
				classes={{
					root: classes.appBar,
				}}
			>
				<Container>
					<Toolbar>
						<Logo />
						<Link
							to="/sign-in"
							color="primary"
							underline="none"
							component={ReactLink}
							className={classes.loginLink}
						>
							<Typography>Login</Typography>
						</Link>
						<Link to="/sign-up" component={ReactLink}>
							<Button
								color="primary"
								variant="contained"
								className={classes.signUpButton}
							>
								Sign Up
							</Button>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
			{children}
		</div>
	);
};

export default LayoutAppHome;
