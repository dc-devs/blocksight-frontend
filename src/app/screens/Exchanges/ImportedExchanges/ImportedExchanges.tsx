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

	const exchangeComponents = exchanges.map(
		(usersExchange: IUsersExchanges) => {
			const { exchange } = usersExchange;

			return (
				<div className={classes.exchangeContainer}>
					<Exchange key={exchange.id} exchange={exchange} />
				</div>
			);
		}
	);

	return (
		<>
			<div className={classes.importedExchangesContainer}>
				<Typography className={classes.importedExchangesTypography}>
					Integrated Exchanges
				</Typography>
			</div>
			<div className={classes.exchangesContainer}>
				{exchangeComponents}
			</div>
		</>
	);
};

export default ImportedExchanges;
