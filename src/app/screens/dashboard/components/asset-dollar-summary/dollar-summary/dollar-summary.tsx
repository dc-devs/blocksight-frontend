import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { themeColors } from '../../../../../../theme/colors';
import { Triangle } from 'react-feather';

const { green, red, coinbaseBorderColor } = themeColors;

const useStyles = makeStyles()((theme) => ({
	valuationContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		jsutifyContent: 'center',
		height: '120px',
		borderRadius: '10px',
		minWidth: '250px',
		padding: theme.spacing(2),
		borderBottom: `1px solid ${coinbaseBorderColor}`,
	},
	valuationHeaderContainer: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
	},
	valuationValueContainer: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		'flex-grow': '1',
		position: 'relative',
	},
	valuationValueContainerDown: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		'flex-grow': '1',
		position: 'relative',
		'& $valuationValue': {
			color: red,
		},
	},
	valuationHeader: {
		fontSize: '1.2rem',
	},
	valuationValue: {
		fontSize: '1.5rem',
		'font-weight': '500',
		color: green,
	},
	deltaContainer: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		position: 'absolute',
		bottom: '0px',
		right: '0px',
	},
	deltaArrow: {
		color: green,
		marginRight: '5px',
		width: '15%',
		fill: green,
	},
	deltaValue: {
		color: green,
		fontSize: '.9rem',
	},
	deltaContainerDown: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		position: 'absolute',
		bottom: '0px',
		right: '0px',
		'& $deltaArrow': {
			color: red,
			fill: red,
			transform: 'rotate(180deg)',
		},
		'& $deltaValue': {
			color: red,
		},
	},
}));

interface Props {
	title: string;
	amount: string;
	deltaValue?: string;
	deltaValuePositive?: boolean;
}

const DollarSummary = ({
	title,
	amount,
	deltaValue,
	deltaValuePositive = true,
}: Props) => {
	const { classes } = useStyles();

	const deltaValueComponent = deltaValue ? (
		<div
			className={
				deltaValuePositive
					? classes.deltaContainer
					: classes.deltaContainerDown
			}
		>
			<Triangle className={classes.deltaArrow} />
			<div className={classes.deltaValue}>{deltaValue}</div>
		</div>
	) : (
		''
	);

	return (
		<Paper elevation={2} className={classes.valuationContainer}>
			<div className={classes.valuationHeaderContainer}>
				<Typography className={classes.valuationHeader}>
					{title}
				</Typography>
			</div>
			<div
				className={
					deltaValuePositive
						? classes.valuationValueContainer
						: classes.valuationValueContainerDown
				}
			>
				<Typography className={classes.valuationValue}>
					{amount}
				</Typography>
				{deltaValueComponent}
			</div>
		</Paper>
	);
};

export default DollarSummary;
