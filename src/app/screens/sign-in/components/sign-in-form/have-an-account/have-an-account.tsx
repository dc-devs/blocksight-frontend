import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as ReactLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	linkNavigateContainer: {
		marginTop: theme.spacing(6),
	},
	haveAccountContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.spacing(6),
	},
	haveAccounLink: {
		marginLeft: '10px',
	},
}));

interface Props {
	isSignUpForm?: boolean;
}

const HaveAnAccount = ({ isSignUpForm }: Props) => {
	const classes = useStyles();
	const link = isSignUpForm ? '/sign-in' : '/sign-up';
	const text = isSignUpForm
		? 'Already have an account?'
		: "Don't have an account?";
	const linkText = isSignUpForm ? 'Sign In' : 'Sign Up';

	return (
		<div className={classes.linkNavigateContainer}>
			<Divider />
			<div className={classes.haveAccountContainer}>
				<Typography>{text}</Typography>
				<Link
					to={link}
					color="primary"
					underline="none"
					component={ReactLink}
					className={classes.haveAccounLink}
				>
					<Typography>{linkText}</Typography>
				</Link>
			</div>
		</div>
	);
};

export default HaveAnAccount;
