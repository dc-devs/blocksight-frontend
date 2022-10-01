import { makeStyles } from 'tss-react/mui';
import ImportExchange from '../ImportExchange';
import Typography from '@mui/material/Typography';
import { IUsersExchange } from '../../../../interfaces';

const useStyles = makeStyles()((theme) => ({
	importedExchangesContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		marginTop: '100px',
		marginBottom: '3px',
	},
	importedExchangesTypography: {
		fontSize: '2rem',
	},
	exchangesContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	exchangeContainer: {
		margin: `${theme.spacing(1)} 0`,
	},
}));

const buildHeader = (userHasImportedExchanges: boolean) => {
	let header = '';

	if (!userHasImportedExchanges) {
		header += 'No ';
	}

	header += 'Imported Exchanges';

	if (!userHasImportedExchanges) {
		header += '...';
	}

	return header;
};

interface IProps {
	usersExchanges: IUsersExchange[];
}

// TODO: Don't return api key/secret data
const ImportedExchanges = ({ usersExchanges }: IProps) => {
	const { classes } = useStyles();

	const exchangeComponents = usersExchanges.map(
		(usersExchange: IUsersExchange, index) => {
			const { exchange, user } = usersExchange;

			return (
				<div
					key={usersExchange.id}
					className={classes.exchangeContainer}
				>
					<ImportExchange
						usersExchange={usersExchange}
						exchange={exchange}
						user={user}
					/>
				</div>
			);
		}
	);

	const userHasImportedExchanges = usersExchanges.length > 0;
	const header = buildHeader(userHasImportedExchanges);

	return (
		<>
			<div className={classes.importedExchangesContainer}>
				<Typography className={classes.importedExchangesTypography}>
					{header}
				</Typography>
			</div>
			<div className={classes.exchangesContainer}>
				{exchangeComponents}
			</div>
		</>
	);
};

export default ImportedExchanges;

// const handleUsersExchangeDeletion = async (
// 	deleteUsersExchange: CallableFunction
// ) => {
// 	const usersExchangeId = usersExchange.id;

// 	await deleteUsersExchange(usersExchangeId);
// };
