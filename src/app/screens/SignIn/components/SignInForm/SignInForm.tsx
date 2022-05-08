import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from 'tss-react/mui';
import SignInOptions from './SignInOptions';
import HaveAnAccount from './HaveAnAccount';
import emailRegex from '../../../../../constants/emailRegex';
import PasswordConfirmation from './PasswordConfirmation';

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

const SignInForm = ({
	watch,
	errors,
	register,
	onSubmit,
	handleSubmit,
	isSignUpForm = false,
	submitButtonText,
}: Props) => {
	const { classes } = useStyles();
	console.log(errors);
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
				{errors.email && errors.email.type === 'required' && (
					<div className={classes.errorContainer}>
						Email is required
					</div>
				)}
				{errors.email && errors.email.type === 'pattern' && (
					<div className={classes.errorContainer}>
						Must be an email
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
				{errors.password && errors.password.type === 'required' && (
					<div className={classes.errorContainer}>
						Password is required
					</div>
				)}
				{errors.password && errors.password.type === 'minLength' && (
					<div className={classes.errorContainer}>
						Must be minmum 8 characters
					</div>
				)}
				{isSignUpForm && (
					<PasswordConfirmation
						watch={watch}
						errors={errors}
						register={register}
						errorContainerClass={classes.errorContainer}
					/>
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

export default SignInForm;
