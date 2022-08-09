import Exchange from '../Exchange';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { IUsersExchanges } from '../../../../interfaces';

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
	usersExchanges: IUsersExchanges[];
}

const ImportedExchanges = ({ usersExchanges }: IProps) => {
	const { classes } = useStyles();

	const exchangeComponents = usersExchanges.map(
		(usersExchange: IUsersExchanges) => {
			const { exchange } = usersExchange;

			return (
				<div key={exchange.id} className={classes.exchangeContainer}>
					<Exchange exchange={exchange} />
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
