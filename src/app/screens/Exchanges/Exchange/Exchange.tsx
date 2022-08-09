import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { IExchange } from '../../../../interfaces';

const useStyles = makeStyles()((theme) => ({
	exchangeContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		alignContent: 'center',
		alignItems: 'center',
		height: '58px',
		width: '100%',
		padding: `${theme.spacing(1)}`,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'rgba(17, 51, 83, 0.04)',
		},
	},
	noBorderRadius: {
		borderRadius: 0,
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

interface IProps {
	elevation?: number;
	exchange: IExchange;
	noBorderRadius?: boolean;
}

const Exchange = ({
	exchange,
	elevation = 1,
	noBorderRadius = false,
}: IProps) => {
	let additionalContainerClasses = '';
	const { classes } = useStyles();

	if (noBorderRadius) {
		additionalContainerClasses += ` ${classes.noBorderRadius}`;
	}

	return (
		<Paper
			className={`${classes.exchangeContainer} ${additionalContainerClasses}`}
			elevation={elevation}
		>
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
};

export default Exchange;
