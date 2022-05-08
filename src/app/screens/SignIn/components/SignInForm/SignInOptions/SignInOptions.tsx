import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { Link as ReactLink } from 'react-router-dom';

const useStyles = makeStyles()((theme) => ({
	signInOptionsContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(1),
		width: '100%',
	},
	forgetPassordLink: {
		textAlign: 'right',
	},
}));

const SignInOptions = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.signInOptionsContainer}>
			<Link
				to="/reset-password"
				color="primary"
				underline="none"
				component={ReactLink}
				className={classes.forgetPassordLink}
			>
				<Typography>Forget Password?</Typography>
			</Link>
		</div>
	);
};

export default SignInOptions;
