import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import { IUser, IExchange } from '../../../../../interfaces';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CREATE_USERS_EXCHANGES } from '../../../../../queries/usersExchanges';

const useStyles = makeStyles()((theme) => ({
	importExchangeDataContentContainer: {
		// display: 'flex',
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// marginTop: '100px',
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

interface ErrorAttributes {
	type: string;
	message: string;
}

interface ErrorProps {
	email: ErrorAttributes;
}

interface IProps {
	user: IUser | undefined;
	exchange: IExchange;
}

const ImportedExchangeAccordianDetails = ({ user, exchange }: IProps) => {
	const { classes } = useStyles();

	const [createUsersExchanges] = useMutation(CREATE_USERS_EXCHANGES, {
		onError: (error) => {
			const errors = error.graphQLErrors[0].extensions
				.errors as ErrorProps;

			if (errors) {
				console.error(errors);
			}
		},
		onCompleted: (data) => {
			console.log('New UsersExchanges', data);
		},
	});

	const onSubmit = async (data: any) => {
		if (user) {
			createUsersExchanges({
				variables: {
					createUsersExchangesInput: {
						userId: user.id,
						exchangeId: exchange.id,
						...data,
					},
				},
			});
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<AccordionDetails>
			<div className={classes.importExchangeDataContentContainer}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<div
							className={classes.importExchangeDataFormContainer}
						>
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
			</div>
		</AccordionDetails>
	);
};

export default ImportedExchangeAccordianDetails;
