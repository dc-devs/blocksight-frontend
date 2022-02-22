import { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import AssetSummary from './components/asset-summary';
import { useSelector, useDispatch } from 'react-redux';
import filterTokenBalances from '../../../utils/filter-token-balances';
import AssetDollarSummary from './components/asset-dollar-summary';
import { selectMetaMaskWallet } from '../../../redux/slices/metamask-slice';
import {
	fetchTokenBalances,
	selectTokenBalances,
	selectTokenBalancesStatus,
	// selectTokenBalancesError,
} from '../../../redux/slices/token-balances-slice';

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
		'flex-grow': '1',
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
		height: '100vh',
	},
}));

const DashBoard = () => {
	const { classes } = useStyles();
	const dispatch = useDispatch();
	const { selectedAddress } = useSelector(selectMetaMaskWallet);

	const tokenBalances = useSelector(selectTokenBalances);
	const tokenBalancesStatus = useSelector(selectTokenBalancesStatus);
	// const tokenBalancesError = useSelector(selectTokenBalancesError);

	// GET Token Balances
	useEffect(() => {
		if (selectedAddress && tokenBalancesStatus === 'idle') {
			dispatch(fetchTokenBalances({ address: selectedAddress }));
		}
	}, [tokenBalancesStatus, selectedAddress, dispatch]);

	const { totalValue, balances } = tokenBalances;

	const filteredTokenBalances = filterTokenBalances({
		balances,
		filterZeros: true,
	});

	return (
		<div className={classes.pageContainer}>
			<div className={classes.dashboardDataContainer}>
				<AssetDollarSummary totalValue={totalValue} />
				<AssetSummary
					totalValue={totalValue?.formatted}
					tokenBalances={filteredTokenBalances}
				/>
			</div>
		</div>
	);
};

export default DashBoard;
