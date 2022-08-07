import Exchange from '../Exchange';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { IUser, IUsersExchanges } from '../../../../interfaces';

const useStyles = makeStyles()((theme) => ({
	exchangesContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	importedExchangesContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
	},
	importedExchangesTypography: {
		fontSize: '2rem',
	},
}));

interface IProps {
	user: IUser | undefined;
	exchanges: IUsersExchanges[];
}

const ImportedExchanges = ({ user, exchanges }: IProps) => {
	const { classes } = useStyles();

	const exchangeComponents = exchanges.map(
		(usersExchange: IUsersExchanges) => {
			const { exchange } = usersExchange;

			return <Exchange key={exchange.id} exchange={exchange} />;
		}
	);

	return (
		<>
			<div className={classes.importedExchangesContainer}>
				<Typography className={classes.importedExchangesTypography}>
					Imported Exchanges
				</Typography>
			</div>
			<div className={classes.exchangesContainer}>
				{exchangeComponents}
			</div>
		</>
	);
};

export default ImportedExchanges;
