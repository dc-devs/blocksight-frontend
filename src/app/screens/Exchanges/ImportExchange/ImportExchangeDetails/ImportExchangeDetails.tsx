import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../../../../hooks';
import { useState, useEffect, useContext } from 'react';
import { IUser, IExchange } from '../../../../../interfaces';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Status, UsersExchangesType } from '../../../../../redux/enums';
import ImportExchangeContext from '../../contexts/ImportExchangeContext';
import {
	resetType,
	createUsersExchanges,
	selectUsersExchangesType,
	selectUsersExchangesStatus,
} from '../../../../../redux/slices/usersExchangesSlice';

const useStyles = makeStyles()((theme) => ({
	importExchangeDataContentContainer: {
		padding: theme.spacing(4),
	},
	importExchangeDataFormContainer: {},
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
		margin: `${theme.spacing(2)} 0 0 0`,
	},
	errorContainer: {
		textAlign: 'left',
		marginLeft: theme.spacing(1),
		color: theme.palette.error.main,
	},
}));

interface IErrorAttributes {
	type: string;
	message: string;
}

interface IErrors {
	apiKey?: string;
	apiSecret?: string;
	apiPassphrase?: string;
	uniqueUserExchange?: IErrorAttributes;
}

interface IProps {
	user: IUser | undefined;
	exchange: IExchange;
}

const ImportExchangeDetails = ({ user, exchange }: IProps) => {
	let defaultErrorState: IErrors = {};
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	const importExchangeApi = useContext(ImportExchangeContext);
	const { setSelectedExchange } = importExchangeApi;
	const usersExchangesStatus = useSelector(selectUsersExchangesStatus);
	const usersExchangesType = useSelector(selectUsersExchangesType);
	const [serverErrors, setServerErrors] = useState(defaultErrorState);

	useEffect(() => {
		if (
			usersExchangesStatus === Status.Succeeded &&
			usersExchangesType === UsersExchangesType.Fulfilled
		) {
			if (setSelectedExchange) {
				setSelectedExchange(null);
				dispatch(resetType());
			}
		}
	}, [
		dispatch,
		usersExchangesType,
		setSelectedExchange,
		usersExchangesStatus,
	]);

	const onSubmit = async (data: any) => {
		setServerErrors(defaultErrorState);

		if (user) {
			const createUsersExchangesInput = {
				userId: user.id,
				exchangeId: exchange.id,
				...data,
			};

			dispatch(createUsersExchanges({ createUsersExchangesInput }));
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm();

	const hasFormErrors =
		formErrors.apiKey || formErrors.apiSecret || formErrors.apiPassphrase;
	const hasServerErrors = serverErrors.uniqueUserExchange;

	if (hasServerErrors && hasFormErrors) {
		setServerErrors(defaultErrorState);
	}

	const errors = { ...serverErrors, ...formErrors };

	return (
		<AccordionDetails
			className={classes.importExchangeDataContentContainer}
		>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<div className={classes.importExchangeDataFormContainer}>
						<form
							className={classes.form}
							noValidate
							autoComplete="off"
							onSubmit={handleSubmit(onSubmit)}
						>
							<TextField
								fullWidth={true}
								autoComplete="off"
								id="apiKey"
								label="API Key *"
								error={!!errors.apiKey}
								{...register('apiKey', {
									required: true,
								})}
							/>

							<TextField
								fullWidth={true}
								autoComplete="off"
								id="apiSecret"
								label="API Secret *"
								error={!!errors.apiSecret}
								{...register('apiSecret', {
									required: true,
								})}
							/>

							<TextField
								fullWidth={true}
								autoComplete="off"
								id="apiPassphrase"
								label="API Passphrase *"
								error={!!errors.apiPassphrase}
								{...register('apiPassphrase', {
									required: true,
								})}
							/>

							<TextField
								fullWidth={true}
								autoComplete="off"
								id="apiNickname"
								label="API Nickname (optional)"
								{...register('apiNickname')}
							/>

							{errors.uniqueUserExchange && (
								<div className={classes.errorContainer}>
									{errors.uniqueUserExchange.message}
								</div>
							)}

							<Button
								type="submit"
								color="primary"
								variant="contained"
								className={classes.submitButton}
							>
								Import Exchange
							</Button>
						</form>
					</div>
				</Grid>
				<Grid item xs={6}>
					<div>Instructions</div>
				</Grid>
			</Grid>
		</AccordionDetails>
	);
};

export default ImportExchangeDetails;
