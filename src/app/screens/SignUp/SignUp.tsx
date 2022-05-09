import { useState } from 'react';
import Logo from '../../icons/Logo';
import { useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../queries/users';
import SessionForm from '../../components/SessionForm';

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

interface ErrorAttributes {
	type: string;
	message: string;
}

interface ErrorProps {
	email: ErrorAttributes;
}

const SignUp = () => {
	const { classes } = useStyles();
	const [backendErrors, setErrors] = useState({
		email: {
			type: '',
			message: '',
		},
	});

	const [createUser, { error, data }] = useMutation(CREATE_USER, {
		onError: (error) => {
			const errors = error.graphQLErrors[0].extensions
				.errors as ErrorProps;

			if (errors.email) {
				setErrors(errors as ErrorProps);
			}
		},
		onCompleted: (data) => {
			console.log('Created New User!!', data);

			setErrors({
				email: {
					type: '',
					message: '',
				},
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const formErrors = backendErrors.email.type ? backendErrors : errors;

	const onSubmit = async (userData: any) => {
		const { email, password } = userData;

		try {
			createUser({
				variables: {
					createUserInput: {
						email,
						password,
					},
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
					<SessionForm
						watch={watch}
						errors={formErrors}
						register={register}
						onSubmit={onSubmit}
						handleSubmit={handleSubmit}
						submitButtonText="Sign Up"
						isSignUpForm={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
