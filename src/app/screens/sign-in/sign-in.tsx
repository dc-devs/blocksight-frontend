import axios from 'axios';
import Logo from '../../icons/logo';
import { useForm } from 'react-hook-form';
import SignInForm from '../sign-in/components/sign-in-form';
import { makeStyles } from '@material-ui/core/styles';
import environment from '../../../constants/environment';
import headers from '../../../constants/headers';

const useStyles = makeStyles((theme) => ({
	pageContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100vh',
	},
	signUpWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		width: '375px',
	},
	logoContainer: {
		textAlign: 'center',
	},
	logo: {
		width: '4rem',
		height: '4rem',
	},
	signUpContainer: {
		textAlign: 'center',
		marginTop: '30px',
	},
	signUpText: {
		fontSize: '1.5rem',
	},
}));

const SignIn = () => {
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const { development } = environment;
	const { serverBaseUrl } = development;

	const onSubmit = async (data: any) => {
		console.log('Submitted!!');
		axios.post(
			`${serverBaseUrl}/sign-in`,
			{ data },
			{
				headers,
			}
		);
	};

	return (
		<div className={classes.pageContainer}>
			<div className={classes.signUpWrapper}>
				<div className={classes.logoContainer}>
					<Logo className={classes.logo} />
				</div>
				<div className={classes.signUpContainer}>
					<SignInForm
						watch={watch}
						errors={errors}
						register={register}
						onSubmit={onSubmit}
						handleSubmit={handleSubmit}
						submitButtonText="Sign In"
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
