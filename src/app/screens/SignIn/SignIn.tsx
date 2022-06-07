import { useState } from 'react';
import Logo from '../../icons/Logo';
import { useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import headers from '../../../constants/headers';
import { SIGN_IN } from '../../../queries/sessions';
import SignInForm from '../../components/SessionForm';
import { defaultErrorState } from '../../components/SessionForm/constants';
import { setAuthentication } from '../../../redux/slices/authenticationSlice';
import {
	FormErrorType,
	FormErrorMessage,
} from '../../components/SessionForm/enums';

const useStyles = makeStyles()((theme) => ({
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
	const navigate = useNavigate();
	const { classes } = useStyles();
	const appDispatch = useAppDispatch();

	const [backendErrors, setErrors] = useState(defaultErrorState);

	const [signInUser] = useMutation(SIGN_IN, {
		onError: async (apolloError) => {
			// signOut();
			const errror = apolloError.graphQLErrors[0];
			const errorMessage = errror?.message;

			if (errorMessage === FormErrorType.UNAUTHORIZED) {
				setErrors({
					email: {
						type: FormErrorType.UNAUTHORIZED,
						message: FormErrorMessage.INCORRECT_EMAIL_PASSWORD,
					},
				});
			}
		},
		onCompleted: (data) => {
			const authentication = data.login;

			setErrors(defaultErrorState);
			appDispatch(setAuthentication(authentication));
			navigate(`/dashboard`, { replace: true });
		},
	});

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const formErrors = backendErrors.email.type ? backendErrors : errors;

	const onSubmit = async (userData: any) => {
		const { email, password } = userData;

		try {
			signInUser({
				variables: {
					sessionInput: {
						email,
						password,
					},
				},
				context: {
					headers,
				},
			});
		} catch (e) {}
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
						errors={formErrors}
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
