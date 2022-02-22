import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { textColors } from '../../../../../theme/colors';
import TokenBalance from '../../../../../interfaces/token-balance-interface';

const { coinbaseTableHeaderText } = textColors;

const useStyles = makeStyles()((theme) => ({
	tokenHeaderContainer: {
		display: 'flex',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'start',
	},
	tokenTitle: {
		marginLeft: '20px',
		fontSize: '2.5rem',
	},
	tokenSymbol: {
		marginLeft: '20px',
		fontSize: '2.5rem',
		color: coinbaseTableHeaderText,
	},
	tokenLogo: {},
	image: {
		width: '46px',
		height: '46px',
		borderRadius: '50%',
		boxShadow: theme.shadows[2],
	},
}));

interface Props {
	tokenBalance: TokenBalance;
}

const TokenHeader = ({ tokenBalance }: Props) => {
	const { logoUrl, name, symbol } = tokenBalance;
	const tokenSymbol = symbol.toUpperCase();
	const { classes } = useStyles();

	return (
		<div className={classes.tokenHeaderContainer}>
			<div className={classes.tokenLogo}>
				<img alt="" src={logoUrl} className={classes.image} />
			</div>
			<div>
				<Typography className={classes.tokenTitle}>
					{name}
					<span className={classes.tokenSymbol}>{tokenSymbol}</span>
				</Typography>
			</div>
		</div>
	);
};

export default TokenHeader;
