import Paper from '@mui/material/Paper';
import ImportedExchangeHeader from './ImportedExchangeHeader';
import { useState, SyntheticEvent } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { makeStyles } from 'tss-react/mui';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import { IUser, IExchange } from '../../../../interfaces';
import { CREATE_USERS_EXCHANGES } from '../../../../queries/usersExchanges';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// LEFT OFF:
// Add Accordian
// Add this module to load on imported exchanges
// Add Delete Button (ensure Deletion's cascade)

const useStyles = makeStyles()((theme) => ({
	importExchangeDataContainer: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'start',
		marginTop: '100px',
	},
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

const ImportedExchange = ({ user, exchange }: IProps) => {
	const { classes } = useStyles();
	const [expanded, setExpanded] = useState<string | false>(false);
	const handleAccordianChange =
		(panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

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
		<Paper className={classes.importExchangeDataContainer}>
			<Accordion
				expanded={expanded === 'panel1'}
				onChange={handleAccordianChange('panel1')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<ImportedExchangeHeader
						exchange={exchange}
						noBorderRadius={true}
					/>
				</AccordionSummary>
				<AccordionDetails>
					<div className={classes.importExchangeDataContentContainer}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<div
									className={
										classes.importExchangeDataFormContainer
									}
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
			</Accordion>
		</Paper>
	);
};

export default ImportedExchange;
