import Exchange from '../Exchange';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { IUser, IUsersExchanges } from '../../../../interfaces';

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

interface IProps {
	user: IUser | undefined;
	exchanges: IUsersExchanges[];
}

const ImportedExchanges = ({ user, exchanges }: IProps) => {
	const { classes } = useStyles();

	const importedExchanges = exchanges.filter(
		(usersExchanges: IUsersExchanges) => {
			return usersExchanges.userId === (user && user?.id);
		}
	);

	const exchangeComponents = importedExchanges.map(
		(usersExchange: IUsersExchanges) => {
			const { exchange } = usersExchange;

			return (
				<div className={classes.exchangeContainer}>
					<Exchange key={exchange.id} exchange={exchange} />
				</div>
			);
		}
	);
	const userHasImportedExchanges = importedExchanges.length > 0;

	return (
		<>
			<div className={classes.importedExchangesContainer}>
				<Typography className={classes.importedExchangesTypography}>
					{!userHasImportedExchanges ? 'No ' : ''}
					Imported Exchanges
					{!userHasImportedExchanges ? '...' : ''}
				</Typography>
			</div>
			<div className={classes.exchangesContainer}>
				{exchangeComponents}
			</div>
		</>
	);
};

export default ImportedExchanges;
