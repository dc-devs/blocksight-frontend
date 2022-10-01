import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { Status } from '../../../redux/enums';
import { useAppDispatch } from '../../../hooks';
import AssetSummary from './components/AssetSummary';
import AssetDollarSummary from './components/AssetDollarSummary';
import { selectMetaMaskProvider } from '../../../redux/slices/metamaskSlice';
import {
	fetchTokenBalances,
	selectTokenBalances,
	selectTokenBalancesStatus,
} from '../../../redux/slices/tokenBalancesSlice';

const useStyles = makeStyles()((theme) => ({
	pageContainer: {
		height: '100vh',
		padding: theme.spacing(3),
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.spacing(2),
	},
	headerText: {
		fontSize: '2rem',
	},
	dashboardDataContainer: {
		flexGrow: '1',
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
		height: '100vh',
	},
}));

const DashBoard = () => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	const { selectedAddress } = useSelector(selectMetaMaskProvider);

	const tokenBalances = useSelector(selectTokenBalances);
	const tokenBalancesStatus = useSelector(selectTokenBalancesStatus);
	// const tokenBalancesError = useSelector(selectTokenBalancesError);

	// GET Token Balances
	useEffect(() => {
		if (selectedAddress && tokenBalancesStatus === Status.Idle) {
			dispatch(fetchTokenBalances({ address: selectedAddress }));
		}
	}, [tokenBalancesStatus, selectedAddress, dispatch]);

	const { totalValue, networks, tokens, nfts, hidden, scam } = tokenBalances;

	return (
		<div className={classes.pageContainer}>
			<div className={classes.dashboardDataContainer}>
				<AssetDollarSummary totalValue={totalValue} />
				<AssetSummary
					networks={networks}
					totalValue={totalValue?.formatted}
					tokenBalances={tokenBalances?.tokens?.balances}
				/>
			</div>
		</div>
	);
};

export default DashBoard;
