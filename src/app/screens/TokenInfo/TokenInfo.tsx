import { useEffect } from 'react';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import Tokenomics from './components/Tokenomics';
import Transactions from './components/Transactions';
import { selectMetaMaskWallet } from '../../../redux/slices/metamaskSlice';
import {
	fetchTokenBalances,
	selectTokenBalances,
	selectTokenBalancesStatus,
	// selectTokenBalancesError,
} from '../../../redux/slices/tokenBalancesSlice';

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
	const appDispatch = useAppDispatch();
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
			appDispatch(
				fetchTokenBalances({ address: selectedAddress, filter: symbol })
			);
		}
	}, [tokenBalancesStatus, selectedAddress, appDispatch, symbol]);

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
