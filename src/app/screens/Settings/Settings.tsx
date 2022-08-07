import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UPDATE_USER } from '../../../queries/users';
import emailRegex from '../../../constants/emailRegex';
import { selectAuthentication } from '../../../redux/slices/authenticationSlice';

interface ErrorAttributes {
	type: string;
	message: string;
}

interface ErrorProps {
	email: ErrorAttributes;
}

const useStyles = makeStyles()((theme) => ({
	pageContainer: {
		height: '100vh',
		padding: theme.spacing(3),
	},
	updateContainer: {
		width: '30%',
	},
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
}));

const Settings = () => {
	const { classes } = useStyles();
	const authentication = useSelector(selectAuthentication);
	const { user, wallet } = authentication;

	const defaultErrorState = {
		email: {
			type: '',
			message: '',
		},
	};
	const [backendErrors, setErrors] = useState(defaultErrorState);

	const [updateUser] = useMutation(UPDATE_USER, {
		onError: (error) => {
			const errors = error.graphQLErrors[0].extensions
				.errors as ErrorProps;

			if (errors.email) {
				setErrors(errors as ErrorProps);
			}
		},
		onCompleted: (data) => {
			console.log('User Updated!!', data);
			setErrors(defaultErrorState);
		},
	});

	const onSubmit = async (updateUserInput: any) => {
		updateUser({
			variables: {
				id: user?.id,
				updateUserInput,
			},
		});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const formErrors = backendErrors.email.type ? backendErrors : errors;

	return (
		<div className={classes.pageContainer}>
			<div>
				<Typography>Chain Id: {wallet?.chainId}</Typography>
			</div>
			<div>
				<Typography>User Id: {user?.id}</Typography>
			</div>
			<div>
				<Typography>
					Primary Wallet Address: {user?.primaryWalletAddress}
				</Typography>
			</div>
			<div>
				<Typography>Email: {user?.email}</Typography>
			</div>
			<div className={classes.updateContainer}>
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
						error={!!formErrors.email}
						{...register('email', {
							required: true,
							pattern: emailRegex,
						})}
					/>

					{formErrors.email &&
						formErrors.email.type === 'required' && (
							<div className={classes.errorContainer}>
								Email is required
							</div>
						)}

					{formErrors.email &&
						formErrors.email.type === 'pattern' && (
							<div className={classes.errorContainer}>
								Must be an email
							</div>
						)}

					{formErrors.email &&
						formErrors.email.type === 'BAD_USER_INPUT' && (
							<div className={classes.errorContainer}>
								{`${formErrors.email.message}`}
							</div>
						)}
					<Button
						type="submit"
						color="primary"
						variant="contained"
						className={classes.submitButton}
					>
						Update
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Settings;
