import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import HaveAnAccount from './HaveAnAccount';
import SignInOptions from './SessionOptions';
import TextField from '@mui/material/TextField';
import FormErrorType from './enums/FormErrorType';
import emailRegex from '../../../constants/emailRegex';
import FormErrorMessage from './enums/FormErrorMessage';

const useStyles = makeStyles()((theme) => ({
	form: {
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column',
		'& .MuiTextField-root': {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
	},
	submitButton: {
		marginTop: '30px',
		width: '100%',
		margin: theme.spacing(1),
	},
	errorContainer: {
		textAlign: 'left',
		marginLeft: theme.spacing(1),
		color: theme.palette.error.main,
	},
	rememberMeContainer: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		left: '-9px',
	},
	rememberMeText: {
		color: theme.palette.primary.main,
	},
}));

interface Props {
	watch: any;
	errors: any;
	onSubmit: any;
	register: any;
	handleSubmit: any;
	isSignUpForm?: boolean;
	submitButtonText: string;
}

const SessionForm = ({
	watch,
	errors,
	register,
	onSubmit,
	handleSubmit,
	isSignUpForm = false,
	submitButtonText,
}: Props) => {
	const { classes } = useStyles();
	return (
		<>
			<form
				className={classes.form}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField
					fullWidth={true}
					autoComplete="on"
					id="email"
					label="email"
					name="email"
					error={!!errors.email}
					{...register('email', {
						required: true,
						pattern: emailRegex,
					})}
				/>

				{errors.email &&
					errors.email.type === FormErrorType.REQUIRED && (
						<div className={classes.errorContainer}>
							{FormErrorMessage.EMAIL_REQUIRED}
						</div>
					)}

				{errors.email &&
					errors.email.type === FormErrorType.REQUIRED && (
						<div className={classes.errorContainer}>
							{FormErrorMessage.MUST_BE_EMAIL}
						</div>
					)}

				{errors.email &&
					errors.email.type === FormErrorType.BAD_USER_INPUT && (
						<div className={classes.errorContainer}>
							{`${errors.email.message}`}
						</div>
					)}

				{errors.email &&
					errors.email.type === FormErrorType.UNAUTHORIZED && (
						<div className={classes.errorContainer}>
							{FormErrorMessage.INCORRECT_EMAIL_PASSWORD}
						</div>
					)}

				<TextField
					fullWidth
					autoComplete="off"
					type="password"
					id="password"
					label="password"
					name="password"
					error={!!errors.password}
					{...register('password', {
						required: true,
						minLength: 8,
					})}
				/>
				{errors.password &&
					errors.password.type === FormErrorType.REQUIRED && (
						<div className={classes.errorContainer}>
							Password is required
						</div>
					)}
				{errors.password &&
					errors.password.type === FormErrorType.MIN_LENGTH && (
						<div className={classes.errorContainer}>
							Must be minmum 8 characters
						</div>
					)}

				{!isSignUpForm && <SignInOptions />}

				<Button
					type="submit"
					color="primary"
					variant="contained"
					className={classes.submitButton}
				>
					{submitButtonText}
				</Button>
			</form>
			<HaveAnAccount isSignUpForm={isSignUpForm} />
		</>
	);
};

export default SessionForm;
