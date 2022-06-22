import { useEffect } from 'react';
import Transaction from './Transaction';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../../../../hooks';

import {
	fetchTransactions,
	selectTransactions,
	selectTransactionsStatus,
	// selectTransactionsError,
} from '../../../../../redux/slices/transactionsSlice';
import TokenBalance from '../../../../../interfaces/tokenBalanceInterface';
import { selectMetaMaskProvider } from '../../../../../redux/slices/metamaskSlice';

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
	const appDispatch = useAppDispatch();
	const { selectedAddress } = useSelector(selectMetaMaskProvider);
	const transactions = useSelector(selectTransactions);
	const transactionsStatus = useSelector(selectTransactionsStatus);
	// const transactionsError = useSelector(selectTransactionsError);
	const { symbol } = tokenBalance;

	useEffect(() => {
		if (selectedAddress && transactionsStatus === 'idle') {
			appDispatch(
				fetchTransactions({
					address: selectedAddress,
					filter: symbol,
				})
			);
		}
	}, [transactionsStatus, selectedAddress, appDispatch, symbol]);

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
