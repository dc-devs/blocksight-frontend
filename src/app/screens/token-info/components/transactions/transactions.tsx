import { useEffect } from 'react';
import Transaction from './transaction';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTransactions,
	selectTransactions,
	selectTransactionsStatus,
	// selectTransactionsError,
} from '../../../../../redux/slices/transactions-slice';
import TokenBalance from '../../../../../interfaces/token-balance-interface';
import { selectMetaMaskWallet } from '../../../../../redux/slices/metamask-slice';

const useStyles = makeStyles()((theme) => ({
	transactionsContainer: {
		marginTop: '20px',
		borderRadius: '10px',
		padding: theme.spacing(2),
	},
	transactionsHeader: {
		fontSize: '1.2rem',
	},
}));

interface Props {
	tokenBalance: TokenBalance;
}

const Transactions = ({ tokenBalance }: Props) => {
	const { classes } = useStyles();
	const dispatch = useDispatch();
	const { selectedAddress } = useSelector(selectMetaMaskWallet);
	const transactions = useSelector(selectTransactions);
	const transactionsStatus = useSelector(selectTransactionsStatus);
	// const transactionsError = useSelector(selectTransactionsError);
	const { symbol } = tokenBalance;

	useEffect(() => {
		if (selectedAddress && transactionsStatus === 'idle') {
			dispatch(
				fetchTransactions({ address: selectedAddress, filter: symbol })
			);
		}
	}, [transactionsStatus, selectedAddress, dispatch, symbol]);

	const transactionComponents =
		transactions?.supportedTransactions?.map((transaction, index) => {
			return <Transaction key={index} transaction={transaction} />;
		}) || [];

	return (
		<Paper elevation={0} className={classes.transactionsContainer}>
			<Typography className={classes.transactionsHeader}>
				Transactions
			</Typography>
			<div> {transactionComponents} </div>
		</Paper>
	);
};

export default Transactions;
