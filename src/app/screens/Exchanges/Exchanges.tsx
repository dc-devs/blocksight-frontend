import Chip from '@mui/material/Chip';
import { useQuery } from '@apollo/client';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FIND_ALL } from '../../../queries/usersExchanges';

const useStyles = makeStyles()((theme) => ({
	root: {},
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
	exchangeContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		alignContent: 'center',
		alignItems: 'center',
		height: '50px',
		padding: `${theme.spacing(1)}`,
		margin: `${theme.spacing(1)} 0`,
	},
	exchangeContainerImage: {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
	},
	exchangeImage: {
		width: '30px',
		height: '30px',
	},
	exchangeContainerItem: {
		marginRight: '10px',
	},
	exchangeName: {
		fontSize: '1.2rem',
	},
	chipTest: {
		fontSize: '.7rem',
	},
}));

const Exchanges = () => {
	const { classes } = useStyles();

	const { loading, error, data } = useQuery(FIND_ALL, {
		variables: {
			findAllUsersExchangesInput: {
				where: {
					userId: 1,
				},
			},
		},
	});

	const exchangeComponents: JSX.Element[] = [];

	if (error) {
		console.log(error);
	} else if (loading) {
		console.log(loading);
	} else {
		console.log(data);
		const { findAllUsersExchanges: usersExchanges } = data;

		usersExchanges.forEach((usersExchange: any) => {
			const { exchange } = usersExchange;
			const exchangeComponent = (
				<Paper className={classes.exchangeContainer}>
					<div
						className={`${classes.exchangeContainerItem} ${classes.exchangeContainerImage}`}
					>
						<img
							className={classes.exchangeImage}
							src={exchange.logoUrl}
							alt=""
						/>
					</div>
					<div className={classes.exchangeContainerItem}>
						<Typography className={classes.exchangeName}>
							{exchange.name}
						</Typography>
					</div>
					<div className={classes.exchangeContainerItem}>
						<Chip
							className={classes.chipTest}
							label="API"
							size="small"
							variant="outlined"
						/>
					</div>
				</Paper>
			);

			exchangeComponents.push(exchangeComponent);
		});
	}

	return (
		<>
			<Container maxWidth="xl">
				<div className={classes.importedExchangesContainer}>
					<Typography className={classes.importedExchangesTypography}>
						Imported Exchanges
					</Typography>
				</div>
				<div className={classes.exchangesContainer}>
					{exchangeComponents}
				</div>
			</Container>
		</>
	);
};

export default Exchanges;
