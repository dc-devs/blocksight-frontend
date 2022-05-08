import Paper from '@mui/material/Paper';
import { ArrowRight, Repeat } from 'react-feather';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import shortenWalletAddress from '../../../../../../utils/shortenWalletAddress';
import TransactionInterface from '../../../../../../interfaces/transactionInterface';
import { themeColors } from '../../../../../../theme/colors';

const { coinbaseBorderColor } = themeColors;

const useStyles = makeStyles()((theme) => ({
	transactionContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		borderRadius: '0',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		borderBottom: `1px solid ${coinbaseBorderColor}`,
		'&:first-child': {
			borderTop: `1px solid ${coinbaseBorderColor}`,
		},
	},
	typeContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		width: '130px',
	},
	typeLogo: {
		width: '17px',
	},
	type: {
		marginLeft: '15px',
		fontSize: '1.3rem',
	},
	fromWalletContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '15px',
		padding: '5px 15px',
	},
	fromWalletImageContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '10px',
	},
	fromWalletImage: {
		width: '20px',
		height: '20px',
	},
	walletAddressName: {
		marginLeft: '10px',
	},
	arrowRight: {
		marginLeft: '15px',
	},
}));

interface Props {
	transaction: TransactionInterface;
}

const Transaction = ({ transaction }: Props) => {
	const { classes } = useStyles();
	const { type, fromWallet, fromAddress, exchange, inputToken, outputToken } =
		transaction;
	const shortFromAddress = shortenWalletAddress(fromAddress);
	const { logoUrl: fromWalletLogoUrl } = fromWallet;
	const { name: exchangeName, logoUrl: exchangeLogoUrl } = exchange;
	const { symbol: inputTokenSymbol, logoUrl: inputTokenLogoUrl } = inputToken;
	const { symbol: outputTokenSymbol, logoUrl: outputTokenLogoUrl } =
		outputToken;

	return (
		<Paper elevation={0} className={classes.transactionContainer}>
			<div className={classes.typeContainer}>
				<Repeat />
				<Typography className={classes.type}>{type}</Typography>
			</div>
			<Paper elevation={0} className={classes.fromWalletContainer}>
				<Typography className={classes.walletAddressName}>
					From:
				</Typography>
				<img
					src={fromWalletLogoUrl}
					alt=""
					className={classes.fromWalletImage}
				/>
				<Typography className={classes.walletAddressName}>
					{shortFromAddress}
				</Typography>
			</Paper>
			<ArrowRight className={classes.arrowRight} />
			<Paper elevation={0} className={classes.fromWalletContainer}>
				<img
					src={exchangeLogoUrl}
					alt=""
					className={classes.fromWalletImage}
				/>
				<Typography className={classes.walletAddressName}>
					To: {exchangeName}
				</Typography>
			</Paper>
			<ArrowRight className={classes.arrowRight} />
			<Paper elevation={0} className={classes.fromWalletContainer}>
				<img
					src={inputTokenLogoUrl.small}
					alt=""
					className={classes.fromWalletImage}
				/>
				<Typography className={classes.walletAddressName}>
					{inputTokenSymbol.toUpperCase()}: 10 ($100)
				</Typography>
			</Paper>
			<ArrowRight className={classes.arrowRight} />
			<Paper elevation={0} className={classes.fromWalletContainer}>
				<img
					src={outputTokenLogoUrl.small}
					alt=""
					className={classes.fromWalletImage}
				/>
				<Typography className={classes.walletAddressName}>
					{outputTokenSymbol.toUpperCase()}: 10 ($100)
				</Typography>
			</Paper>
		</Paper>
	);
};

export default Transaction;
