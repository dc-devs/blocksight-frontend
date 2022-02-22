import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { useSelector, useDispatch } from 'react-redux';
import { selectMetaMaskWallet } from '../../../redux/slices/metamask-slice';
import Header from './components/header';
import Tokenomics from './components/tokenomics';
import Transactions from './components/transactions';
import {
	fetchTokenBalances,
	selectTokenBalances,
	selectTokenBalancesStatus,
	// selectTokenBalancesError,
} from '../../../redux/slices/token-balances-slice';

interface Params {
	[key: string]: string;
}

const useStyles = makeStyles()((theme) => ({
	screenContainer: {
		height: '100vh',
		padding: theme.spacing(3),
	},
}));

const TokenInfo = () => {
	const params = useParams();
	const { classes } = useStyles();
	const dispatch = useDispatch();
	const { symbol } = params as Params;
	const { selectedAddress } = useSelector(selectMetaMaskWallet);
	const tokenBalances = useSelector(selectTokenBalances);
	const tokenBalancesStatus = useSelector(selectTokenBalancesStatus);
	// const tokenBalancesError = useSelector(selectTokenBalancesError);
	let tokeHeaderComponent = <></>;
	let tokenomicsComponent = <></>;
	let transactionsComponent = <></>;

	// GET Token Balances
	useEffect(() => {
		if (selectedAddress && tokenBalancesStatus === 'idle') {
			dispatch(
				fetchTokenBalances({ address: selectedAddress, filter: symbol })
			);
		}
	}, [tokenBalancesStatus, selectedAddress, dispatch, symbol]);

	if (tokenBalances.balances) {
		const tokenBalance = tokenBalances.balances[0];
		tokeHeaderComponent = <Header tokenBalance={tokenBalance} />;
		tokenomicsComponent = <Tokenomics tokenBalance={tokenBalance} />;
		transactionsComponent = <Transactions tokenBalance={tokenBalance} />;
	}

	return (
		<div className={classes.screenContainer}>
			{tokeHeaderComponent}
			{tokenomicsComponent}
			{transactionsComponent}
		</div>
	);
};

export default TokenInfo;
